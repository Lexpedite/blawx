# Script to Take a JSON object, convert it into a Python structure, and convert the Python structure into Flora-2 code.
# Jason Morris

import sys, json, types

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
      return "true"
    else:
      return "false"
  elif isinstance(value,(int,float)):
    return str(value)
  else:
    return str(value) + ":" + type(value).__name__

# Get the data from the command line
filename = sys.argv[1]
file = open(filename, "r")

# Convert from JSON to Python structure
dictionary = json.load(file)
#print(dictionary)
#print(dictionary['test'])

# Convert all lists to dictionaries, maybe?

# Convert the resulting Python dictionary to a list of Flora-2 Entries.
output = []
for k,v in dictionary.items():
  output.append(json2flora(k,v,root=True))    

# Output the Flora-2 Code
for o in output:
  print(o + ".\n")


