#!/usr/bin/python3

# Imports
import cgi
import pyxf
import tempfile
import subprocess
import sys, json, types
import re

# Print Headers
print("Content-type: application/json;charset=utf-8")
print() 

# Collect "code" and "data" from environment
input = cgi.FieldStorage()
code = input.getvalue('code')
data = input.getvalue('data')


# Put the .blawx code in a temporary file
blawxfile = tempfile.NamedTemporaryFile()
blawxfile.write(code)

# Run "decode.js" on the blawx code.
floracode = subprocess.run(["npm", "/var/www/html/decode.js", blawxfile.name],
                capture_output=True).stdout

# Take the queries out of the code and save them.
# Also, think about whether or not this is necessary. Maybe not.
queries = re.findall('/^\?-.*\.$/ms',floracode)
noqueryfloracode = re.sub('/^\?-.*\.$/ms','',floracode)


# Put the remaining flora code in a temporary file
floracodefile = tempfile.NamedTemporaryFile()
floracodefile.write(noqueryfloracode)

# run json2f2 on the json code.

def json2flora(key,value,parentname="data",root=False):
  retstr = ""
  # If this is not a leaf:
  if isinstance(value, (list,dict,tuple)):
    # for each of the subvariables, json2flora it
    if isinstance(value, list):
      if root:
        retstr += parentname + "[" + key + "->\\#[list->{"
      else:
        retstr += "{"
      if len(value):
        for i, v in enumerate(value):
          if isinstance(v, (list,dict,tuple)):
            retstr += json2flora(key,v,parentname)
          else:
            retstr += jsonvalue2flora(v)
          retstr += ", "
        retstr = retstr[ :-2 ]
      if root:
        retstr += "}]]"
      else:
        retstr += "}"
    elif isinstance(value, dict):
      #retstr += "The elements of the dict are: \n\n"
      if root:
        retstr += parentname + "[" + key + "->\\#["
      else:
        retstr += "\\#["
      if len(value):
        for k, v in value.items():
          #retstr += str(k) + ": " + str(v) + "\n\n"
          retstr += k + "->"
          if isinstance(v, (list,dict,tuple)):
            retstr += json2flora(k,v,"")
          else:
            retstr += jsonvalue2flora(v)
          retstr += ", "
        retstr = retstr[ :-2 ]
      retstr += "]"
      if root:
        retstr += "]"
    elif isinstance(value, tuple):
      # Convert tuple to a list, and try again
      # I'm not sure if this is correct... need to test.
      newvalue = list(value)
      #retstr += "Converting " + str(value) + " to " + str(newvalue) + " and retrying.\n\n"
      retstr += json2flora(key,newvalue,parentname)
  else:
    if root:
      retstr += parentname + "["
    retstr += str(key) + "->" + jsonvalue2flora(value)
    if root:
      retstr += "]"
  return retstr
  
def jsonvalue2flora(value):
  if isinstance(value,str):
    if not (value[0] == "'" and value[-1] == "'"):
      return "'" + str(value) + "'"
    else:
      return str(value)
  elif isinstance(value,type(None)):
    return "\@?"
  elif isinstance(value,bool):
    if value:
      return "\\true"
    else:
      return "\\false"
  elif isinstance(value,(int,float)):
    return str(value)
  else:
    return str(value) + ":" + type(value).__name__

data_dictionary = json.loads(data)

# Convert the resulting Python dictionary to a list of Flora-2 Entries.
flora_data = []
for k,v in data_dictionary.items():
  flora_data.append(json2flora(k,v,root=True))    

# Start Flora-2
flora2prompt = 'flora2 [?][-][ ]'
flora2error = '[+][+]Error.*'
# Set Expert Mode
console = pyxf.flora2(path='/var/Flora-2/flora2/runflora', args='--noprompt', expert=True)

# Turn on Argumentation Theory
console.engine.sendline(":- use_argumentation_theory.")
return = console.engine.expect([flora2prompt, flora2error])
if return==1:
    raise Exception('Error enabling argumentation theory.')

# Set Default Opposes
console.addfacts( ['\opposes(?_x[?_y->\\true],?_x[?_y->\\false]) :- ?_x:?_T, ?_T[|?_y=>\\boolean|].'])
# Load System Modules
console.engine.sendline("['/usr/lib/cgi-bin/dateminus.flr'>>datemin].")
return = console.engine.expect([flora2prompt, flora2error])
if return==1:
    raise Exception('Error loading dateminus module.')
# Insert Facts
console.load(floracodefile.name)
# Send Query
output = console.query(queries[0])
# Send the json response
print(json.dumps(output))

# Halt Flora-2
console.engine.sendline("\halt.")
console.close()
# Delete temporary files
blawxfile.close()
floracodefile.close()

# Nice-To-Have Features:
# Ideally, there should be a debug mode that
# would include all feedback from all the steps
# in the "answers" that get returned.




