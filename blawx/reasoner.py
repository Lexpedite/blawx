from django.http import Http404, HttpResponseNotFound, HttpResponseForbidden

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, DjangoObjectPermissions, IsAuthenticatedOrReadOnly, AllowAny
import tempfile
import os
import json 
import re
from contextlib import redirect_stderr
import pyparsing as pp

from swiplserver import PrologMQI, PrologError, PrologLaunchError

from .models import Workspace, RuleDoc, BlawxTest
from .ldap import ldap_code
from .dates import scasp_dates, scasp_now
from .aggregates import scasp_aggregates

from rest_framework import permissions

class IgnorePermission(permissions.BasePermission):
    message = 'None.'

    def has_permission(self, request, view):
         return True

# New Proposed Format for JSON fact submissions, which adheres to the s(CASP) logic better,
# and allows you to specify true, false, or unknown.

# It is a dictionary with one key, "facts", which is a list of statements.
# Each statement is a dictionary that has:
# * a type key, with a value of either "true", "false", or "unknown" (text strings)
# * a category key, with a value of the name of the category, or an attribute
#   key, with the value of the attribute.
# * An object key, which gives the symbol for the object (if of type true or false), or a variable object
# * If it has an attribute key, a value key, which gives the value for the statement in text, or a variable object.
# 
# A variable object is an dictionary with only one key, "variable", and a string value for the name of the variable.
# The variable names are ignored, and serve only to determine whether the same variable is being used in both the
# object and the value key.

# {
#   facts: [
#     {
#       type: "true",
#       category: "person",
#       object: "jason"
#     },
#     {
#       type: "unknown",
#       attribute: "nice",
#       object: "jason"
#     },
#     {
#       type: "false",
#       attribute: "friend",
#       object: "jason",
#       value: {variable: "one"}
#     },
#     {
#       type: "true",
#       attribute: "likes",
#       object: {variable: "one"},
#       value: {variable: "one"}
#     }
#   ]
# }

def newer_json_2_scasp(payload,ruledoc,testname):
  output = ""

 
  # Grab the ontology for the current test.
  ontology = get_ontology_internal(ruledoc,testname)

  # For doing abducibility, we need a list of all the known objects provided
  # by the ontology and the user in each category.
  # known_objects = {}
  # for c in ontology['Categories']:
  #   known_objects[c] = []
  # for o in ontology['Objects']:
  #   known_objects[o['Category']].append(o['Object'])
  # for fact in payload['facts']:
  #   if 'category' in fact and not fact['from_ontology'] and type(fact['object']) is not dict and fact['type'] == "true": # Last excludes variables, and false
  #     known_objects[fact['category']].append(fact['object'])

  # print("Known Objects Gathered:")
  # print(known_objects)
  # Go through the statements and convert them into s(CASP)
  for fact in payload['facts']:
    if 'category' in fact:
      basic_predicate = fact['category']
      is_attribute = False
    elif 'attribute' in fact:
      is_attribute = True
      basic_predicate = fact['attribute']
      attribute_type = "object"
      for att in ontology['Attributes']:
          if basic_predicate == att['Attribute']:
            attribute_type = att['Type']
            object_type = att['Category']
            break
    truth_value = fact['type']
    statement_object = fact['object']
    if type(statement_object) is dict:
      statement_object = "X"
    if truth_value == "false":
      predicate = "-" + basic_predicate
    else:
      predicate = basic_predicate
    if truth_value != "unknown":
      if 'value' in fact:
        statement_value = fact['value']
        if type(statement_value) is dict:
          statement_value = "Y"
        # attribute_type = "object"
        # for att in ontology['Attributes']:
        #   if basic_predicate == att['Attribute']:
        #     attribute_type = att['Type']
        #     object_type = att['Category']
        #     break
        output += predicate + "(" + statement_object + "," + format_statement_value(statement_value,attribute_type) + ")"
        if statement_object == "X" or statement_value == "Y":
          output += " :- "
          if statement_object == "X":
            output += object_type + "(X)"
          if statement_object == "X" and statement_value == "Y":
            output += ", "
          if statement_value == "Y":
            output += attribute_type + "(Y)"
        output += ".\n"
      else:
        output += predicate + "(" + statement_object + ")"
        if statement_object == "X" and is_attribute:
          output += ":- " + object_type + "(X)"
        output += ".\n"
  for fact in payload['facts']:
    if 'category' in fact:
      basic_predicate = fact['category']
      is_attribute = False
    elif 'attribute' in fact:
      basic_predicate = fact['attribute']
      attribute_type = "object"
      for att in ontology['Attributes']:
          if basic_predicate == att['Attribute']:
            attribute_type = att['Type']
            object_type = att['Category']
            break
      is_attribute = True
    truth_value = fact['type']
    if fact['type'] == "unknown":
      # This statement is an abducibility:
      if 'category' in fact:
        # If it is a category, we need -category(X) :- not category(X), x \= list of known objects in the category, and the opposite.
        # We need to check to see if the variable is unground, and include the exclusions only if it is unground.
        if type(fact['object']) is dict:
          object_display = "X"
        else:
          object_display = fact['object'] 
        output += basic_predicate + "(" + object_display + ") :- not -" + basic_predicate + "(" + object_display + ")"
        if object_display == "X":
          output += object_type + "(X)"
        output += ".\n"
        output += "-" + basic_predicate + "(" + object_display + ") :- not " + basic_predicate + "(" + object_display + ")"
        if object_display == "X":
          output += object_type + "(X)"
        output += ".\n"
      if 'attribute' in fact:
        # If it is an attribute, we need attribute(X,Y) :- not -attribute(X,Y), X \= list of known objects in the category, Y \= list of known objects in target category, and the opposite.
        # Get the object type for the attribute, and get the value type if it exists.
        # for att in ontology['Attributes']:
        #   if att['Attribute'] == fact['attribute']:
        #     object_type = att['Category']
        #     value_type = att['Type']
        # We also need to know if the value_type is a category
        value_is_object = attribute_type in ontology['Categories']
        if type(fact['object']) is dict:
          object_display = "X"
        else:
          object_display = fact['object']
        if 'value' in fact and type(fact['value']) is dict:
          value_display = "Y"
        elif 'value' in fact:
          value_display = fact['value']
          # This will cause it to use the same variable name twice if both the subject and object are unground and they use the same variable name.
          if object_display == "X" and value_display == "Y":
            if fact['object']['variable'] == fact['value']['variable']:
              value_display == "X"
        if 'value' in fact: # This is the binary predicate type
          output += basic_predicate + "(" + object_display + "," + value_display + ") :- "
          if object_display == "X":
            output += object_type + "(X)"
          if object_display == "X" and (value_display == "X" or value_display == "Y"):
            output += ", "
          if value_display == "X" or value_display == "Y":
            output += attribute_type + "(" + value_display + ")"
          if object_display == "X" or (value_display == "X" or value_display == "Y"):
            output += ", "
          output += " not -" + basic_predicate + "(" + object_display + "," + value_display + ").\n"
          output += "-" + basic_predicate + "(" + object_display + "," + value_display + ") :- "
          if object_display == "X":
            output += object_type + "(X)"
          if object_display == "X" and (value_display == "X" or value_display == "Y"):
            output += ", "
          if value_display == "X" or value_display == "Y":
            output += attribute_type + "(" + value_display + ")"
          if object_display == "X" or (value_display == "X" or value_display == "Y"):
            output += ", "
          output += " not " + basic_predicate + "(" + object_display + "," + value_display + ").\n"
        else: # This is the unary predicate type.
          output += basic_predicate + "(" + object_display + ") :- "
          if object_display == "X":
            output += object_type + "(X), "
          output += "not -" + basic_predicate + "(" + object_display + ").\n"
          output += "-" + basic_predicate + "(" + object_display + ") :- "
          if object_display == "X":
            output += object_type + "(X), "
          output += "not " + basic_predicate + "(" + object_display + ").\n"
  # print(output)
  return output

# Proposed format for JSON submissions.
# {
#   person: {
#     members_known: false,
#     attributes_known: {
#       name: false,
#     },
#     members: {
#       jason: {
#         nerd: {
#           values_known: true,
#           values: [ true ],
#         },
#       },
#     }
#   }
# }

# Example input for Rock Paper Scissors Interview Ontology Endpoint
# { "game": {
#     "members_known": false,
#     "attributes_known": {
#       "player": false
#     }
#   },
#   "player": {
#     "members_known": false,
#     "attributes_known": {
#      "throw": false
#     }
#   }
# }

def format_statement_value(value,attribute_type):
  iso8601_date_re = r"^(\d{4})-(\d{2})-(\d{2})$"
  time_re = r"^(\d{2}):(\d{2})$"
  iso8601_datetime_re = r"^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$"
  iso8601_duration_re = r"^(-)?P(\d+Y)?(\d+M)?(\d+D)?T?(\d+H)?(\d+M)?(\d+S)?$"
  if attribute_type == "date":
    matches = re.findall(iso8601_date_re,value,re.MULTILINE)
    (year,month,day) = matches[0]
    date_format = f"date({int(year)},{int(month)},{int(day)})"
    return date_format
  if attribute_type == "time":
    matches = re.findall(time_re,value,re.MULTILINE)
    (hour,minute) = matches[0]
    time_format = f"time({int(hour)},{int(minute)},0)"
    return time_format
  if attribute_type == "datetime":
    matches = re.findall(iso8601_datetime_re,value,re.MULTILINE)
    (year,month,day,hour,minute) = matches[0]
    datetime_format = f"datetime({int(year)},{int(month)},{int(day)},{int(hour)},{int(minute)},0)"
    return datetime_format
  if attribute_type == "duration":
    matches = re.findall(iso8601_duration_re,value,re.MULTILINE)
    (sign,years,months,days,hours,minutes,seconds) = matches[0]
    if sign == "-":
      sign_value = "-1"
    else:
      sign_value = "1"
    if years == "":
      years = "0Y"
    if months == "":
      months = "0M"
    if days == "":
      days = "0D"
    if hours == "":
      hours = "0H"
    if minutes == "":
      minutes = "0M"
    if seconds == "":
      seconds = "0S"
    duration_format = f"duration({sign_value},{int(years[:-1])},{int(months[:-1])},{int(days[:-1])},{int(hours[:-1])},{int(minutes[:-1])},{int(seconds[:-1])})"
    return duration_format
  # If you get to this point, just return a string version.
  return str(value)

def new_json_2_scasp(payload,ruledoc,testname,exclude_assumptions=False):
  output = ""

  # I need to grab the ontology for the current test.
  ontology = get_ontology_internal(ruledoc,testname)

  # For Each Category
  for (category_name,category_contents) in payload.items():
    # Make category membership abducible?
    if not exclude_assumptions:
      if 'members_known' in category_contents:
        if category_contents['members_known'] == False:
          known_objects = []
          if 'members' in category_contents and len(category_contents['members']):
            for (object_name,object_attributes) in category_contents['members'].items():
              known_objects.append(object_name)
          output += "-" + category_name + "(X) :- not " + category_name + "(X)"
          for ko in known_objects:
            output += ", X \= " + ko
          output += ".\n"
          output += category_name + "(X) :- not -" + category_name + "(X)"
          for ko in known_objects:
            output += ", X \= " + ko
          output += ".\n"
          for att in ontology['Attributes']:
            if att['Category'] == category_name:
              output += "-" + att['Attribute'] + "(X,Y) :- not " + att['Attribute'] + "(X,Y)"
              for ko in known_objects:
                output += ", X \= " + ko
              output += ".\n"
              output += att['Attribute'] + "(X,Y) :- not -" + att['Attribute'] + "(X,Y)"
              for ko in known_objects:
                output += ", X \= " + ko
              output += ".\n"
    
      # For each attribute
      if 'attributes_known' in category_contents:
        for (cat_attrib_name,cat_attrib_known) in category_contents['attributes_known'].items():
          # Make attribute abducible?
          # If the attribute is not known
          if cat_attrib_known == False:
            # generate a list of objects for which the values of this attribute are known
            known_value_objects = []
            if 'members' in category_contents and len(category_contents['members']):
              for (object_name,object_attributes) in category_contents['members'].items():
                for (attribute_name,attribute_values) in object_attributes.items():
                  if attribute_name == cat_attrib_name:
                    if 'values_known' in attribute_values and attribute_values['values_known']:
                      known_value_objects.append(object_name)
            # Now generate the code to make the value abducible for objects other than the
            # ones for which it is known.
            output += "-" + cat_attrib_name + "(X,Y) :- not " + cat_attrib_name + "(X,Y)"
            for kvo in known_value_objects:
              output += ", X \= " + kvo
            output += ".\n"
            output += "" + cat_attrib_name + "(X,Y) :- not -" + cat_attrib_name + "(X,Y)"
            for kvo in known_value_objects:
              output += ", X \= " + kvo
            output += ".\n"
            
    # For each member
    if 'members' in category_contents and len(category_contents['members']):
      for (object_name,object_attributes) in category_contents['members'].items():
        # Create the Member
        output += category_name + "(" + object_name + ").\n"
        # For each property
        for (attribute_name, attribute_values) in object_attributes.items():
          # Make the partially-ground property abducible?
          # Depends on this value, AND the value for the attribute generally...
          if not exclude_assumptions:
            if 'values_known' in attribute_values:
              if attribute_values['values_known'] == False:
                output += "#abducible " + attribute_name + "(" + object_name + ",X).\n"
          # For each value
          for value in attribute_values['values']:
            # Add the attribute value
            # Here, we need to check the attribute type,
            attribute_type = ""
            for att in ontology['Attributes']:
              if category_name == att['Category'] and attribute_name == att['Attribute']:
                attribute_type = att['Type']
                break
            # and if the attribute type is date, or
            # duration, adjust the value accordingly.
            iso8601_date_re = r"^(\d{4})-(\d{2})-(\d{2})$"
            time_re = r"^(\d{2}):(\d{2})$"
            iso8601_datetime_re = r"^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$"
            iso8601_duration_re = r"^(-)?P(\d+Y)?(\d+M)?(\d+D)?T?(\d+H)?(\d+M)?(\d+S)?$"
            if attribute_type == "date":
              matches = re.findall(iso8601_date_re,value,re.MULTILINE)
              (year,month,day) = matches[0]
              date_format = f"date({int(year)},{int(month)},{int(day)})"
              value = date_format
            if attribute_type == "time":
              matches = re.findall(time_re,value,re.MULTILINE)
              (hour,minute) = matches[0]
              time_format = f"time({int(hour)},{int(minute)},0)"
              value = time_format
            if attribute_type == "datetime":
              matches = re.findall(iso8601_datetime_re,value,re.MULTILINE)
              (year,month,day,hour,minute) = matches[0]
              datetime_format = f"datetime({int(year)},{int(month)},{int(day)},{int(hour)},{int(minute)},0)"
              value = datetime_format
            if attribute_type == "duration":
              matches = re.findall(iso8601_duration_re,value,re.MULTILINE)
              (sign,years,months,days,hours,minutes,seconds) = matches[0]
              if sign == "-":
                sign_value = "-1"
              else:
                sign_value = "1"
              if years == "":
                years = "0Y"
              if months == "":
                months = "0M"
              if days == "":
                days = "0D"
              if hours == "":
                hours = "0H"
              if minutes == "":
                minutes = "0M"
              if seconds == "":
                seconds = "0S"
              duration_format = f"duration({sign_value},{int(years[:-1])},{int(months[:-1])},{int(days[:-1])},{int(hours[:-1])},{int(minutes[:-1])},{int(seconds[:-1])})"
              value = duration_format
            output += attribute_name + "(" + object_name + "," + str(value) + ").\n"
  return output

# def json_2_scasp(element,higher_order=False):
#   output = ""
#   if type(element) is dict:
#     # the keys of this dictionary are predicates
#     for (k,v) in element.items():
#       for occurrance in v:
#         output += k + "("
#         for parameter in occurrance:
#           output += json_2_scasp(parameter,True)
#           output += ","
#         output = output[:-1] + ")" #Trim trailing comma
#         if not higher_order:
#           output += ".\n"
#     return output
#   else:
#     return str(element)

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def run_test(request,ruledoc,test_name):
    # ruledoctest = RuleDoc.objects.filter(pk=ruledoc,owner=request.user)
    test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
    if request.user.has_perm('blawx.run',test):
      translated_facts = ""
      if request.data:
        translated_facts = newer_json_2_scasp(request.data,ruledoc,test_name)
        # print("Facts Generated for Run Request:\n")
        # print(translated_facts)
      wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=ruledoc))
      ruleset = ""
      # for ws in wss:
      #   ruleset += "\n\n" + ws.scasp_encoding
      # ruleset += "\n\n" + test.scasp_encoding
      unique_rules = []
      for ws in wss:
        # Go line by line through the code in each workspace. If the line is "% BLAWX CHECK DUPLICATE" then ignore that line and simplify the next line,
        ruleset += "\n\n"
        workspace_lines = ws.scasp_encoding.splitlines()
        register_duplicate = False
        for line in workspace_lines:
          if line == "% BLAWX CHECK DUPLICATES":
            register_duplicate = True
            continue
          elif register_duplicate == True:
            # and add it to a checked list if it's not already in the list.
            register_duplicate = False
            simplified_line = simplify_rule(line)
            if simplified_line not in unique_rules:
              unique_rules.append(simplified_line)
            continue
          else:
            # Otherwise, add it to the code.
            ruleset += line + "\n"

        
      # do the same thing for the test.
      ruleset += "\n\n"
      test_lines = test.scasp_encoding.splitlines()
      register_duplicate = False
      for line in test_lines:
        if line == "% BLAWX CHECK DUPLICATES":
          register_duplicate = True
          continue
        elif register_duplicate == True:
          register_duplicate = False
          simplified_line = simplify_rule(line)
          if simplified_line not in unique_rules:
            unique_rules.append(simplified_line)
          continue
        else:
          ruleset += line + "\n"

      # Now add all the checked duplicate rules.
      for ur in unique_rules:
        ruleset += ur + "\n"
      


      rulefile = tempfile.NamedTemporaryFile('w',delete=False)
      rulefile.write("""
:- use_module(library(scasp)).
:- use_module(library(scasp/human)).
:- use_module(library(scasp/output)).

:- meta_predicate
    blawxrun2(0,-).
""")

      query = "No Query Specified"
      for line in test.scasp_encoding.splitlines():
          if line.startswith("?- "):
              query = line[3:-1] # remove query prompt and period.

      rulefile.write("""
blawxrun(Query, Human) :-
    scasp(Query,[tree(Tree),source(false)]),
    ovar_analyze_term(t(Query, Tree),[name_constraints(true)]),
    with_output_to(string(Human),
              human_justification_tree(Tree,[])).
    term_attvars(Query, AttVars),
    maplist(del_attrs, AttVars).
""")
  
      rulefile.write(ldap_code + '\n\n')
      rulefile.write(scasp_dates + '\n\n')
      rulefile.write(scasp_now + '\n\n')
      rulefile.write(scasp_aggregates + '\n\n')


      rulefile.write(ruleset + '\n')
      # Ignore differences in spaces (this will cause problems when the sapces are meaningful and inside strings, e.g.)
      ruleset_lines = [line.replace(' ','') for line in ruleset.splitlines()]
      test_lines = [line.replace(' ','') for line in test.scasp_encoding.splitlines()]
      for fact in translated_facts.splitlines():
        if fact.replace(' ','') not in ruleset_lines and fact.replace(' ','') not in test_lines:
          rulefile.write(fact + '\n')
      # rulefile.write(translated_facts)
      rulefile.close()
      rulefilename = rulefile.name
      temprulefile = open(rulefilename,'r')
      print(temprulefile.read())
      temprulefile.close()

      # Start the Prolog "thread"
      try: 
        with PrologMQI() as swipl:
            with swipl.create_thread() as swipl_thread:

                transcript = tempfile.NamedTemporaryFile('w',delete=False,prefix="transcript_")
                transcript_name = transcript.name

                with redirect_stderr(transcript):
                    load_file_answer = swipl_thread.query("['" + rulefilename + "'].")
                transcript.write(str(load_file_answer) + '\n')
                if os.path.exists(rulefilename):
                    rules = open(rulefilename)
                    rulestext = rules.read()
                    transcript.write(rulestext + '\n')
                    rules.close()
                    os.remove(rulefilename)

                #transcript.write(full_query)
                with redirect_stderr(transcript):
                    # print("blawxrun(" + query + ",Human).")
                    query_answer = swipl_thread.query("blawxrun((" + query + "),Human).")
                    
                transcript.write(str(query_answer) + '\n')

                transcript.close()
                transcript = open(transcript_name,'r')
                # transcript = open("transcript",'r')
                transcript_output = transcript.read()
                transcript.close()
                os.remove(transcript_name)
      except PrologError as err:
        return Response({ "error": "There was an error while running the code.", "transcript": err.prolog() })
      except PrologLaunchError as err:
        query_answer = "Blawx could not load the reasoner."
        return Response({ "error": "Blawx could not load the reasoner." })
      # Return the results as JSON
      if query_answer == False:
        return Response({ "Answers": [], "Transcript": transcript_output })
      else:
        return Response({ "Answers": generate_answers(query_answer), "Transcript": transcript_output })
    else:
      return HttpResponseForbidden()

def get_ontology_internal(ruledoc,test_name):
    wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=ruledoc))
    test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
    ruleset = ""
    for ws in wss:
      ruleset += "\n\n" + ws.scasp_encoding
    ruleset += "\n\n" + test.scasp_encoding
    
    rulefile = tempfile.NamedTemporaryFile('w',delete=False)
    rulefile.write("""
:- use_module(library(scasp)).
:- use_module(library(scasp/human)).
:- use_module(library(scasp/output)).
:- meta_predicate
    blawxrun2(0,-).
""")

    
    
    rulefile.write("""
blawxrun(Query, Human) :-
    scasp(Query,[tree(Tree),source(false)]),
    ovar_analyze_term(t(Query, Tree),[name_constraints(true)]),
    with_output_to(string(Human),
		           human_justification_tree(Tree,[])).
    term_attvars(Query, AttVars),
    maplist(del_attrs, AttVars).
""")

    rulefile.write(ldap_code + '\n\n')
    rulefile.write(scasp_dates + '\n\n')
    rulefile.write(scasp_now + '\n\n')
    rulefile.write(scasp_aggregates + '\n\n')


    rulefile.write(ruleset)
    rulefile.close()
    rulefilename = rulefile.name
    temprulefile = open(rulefilename,'r')
    # print(temprulefile.read())
    temprulefile.close()

    # Start the Prolog "thread"
    try: 
      with PrologMQI() as swipl:
          with swipl.create_thread() as swipl_thread:

              transcript = tempfile.NamedTemporaryFile('w',delete=False,prefix="transcript_")
              transcript_name = transcript.name

              with redirect_stderr(transcript):
                  load_file_answer = swipl_thread.query("['" + rulefilename + "'].")
              transcript.write(str(load_file_answer) + '\n')
              if os.path.exists(rulefilename):
                  rules = open(rulefilename)
                  rulestext = rules.read()
                  transcript.write(rulestext + '\n')
                  rules.close()
                  os.remove(rulefilename)

              #transcript.write(full_query)
              with redirect_stderr(transcript):
                  # print("blawxrun(blawx_category(Category),Human).")
                  category_answers = []
                  query1_answer = swipl_thread.query("blawxrun(blawx_category(Category),Human).")
                  query1_answers = generate_answers(query1_answer)
                  for cat in query1_answers:
                    # We exclude Variable names that have been specified as a category name.
                    if not re.search(r"^[A-Z_]\w*",cat['Variables']['Category']):
                      category_answers.append(cat['Variables']['Category'])
                  category_nlg = []
                  for c in category_answers:
                    try:
                      cat_nlg_query_response = swipl_thread.query("blawxrun(blawx_category_nlg(" + c + ",Prefix,Postfix),Human).")
                    except PrologError as err:
                      if err.prolog().startswith('existence_error'):
                        continue
                    cat_nlg_query_answers = generate_answers(cat_nlg_query_response)
                    for cnlga in cat_nlg_query_answers:
                      category_nlg.append({"Category": c, "Prefix": cnlga['Variables']['Prefix'], "Postfix": cnlga['Variables']['Postfix']})
                  # print("blawxrun(blawx_attribute(Category,Attribute,ValueType),Human).")
                  attribute_answers = []
                  query2_answers = []
                  try:
                    query2_answer = swipl_thread.query("blawxrun(blawx_attribute(Category,Attribute,ValueType),Human).")
                    query2_answers = generate_answers(query2_answer)
                    for att in query2_answers:
                      # This excludes declarations that make variables into attribute types.
                      if not  re.search(r"^[A-Z_]\w*",att['Variables']['ValueType']) and not re.search(r"^[A-Z_]\w*",att['Variables']['Category']) and not re.search(r"^[A-Z_]\w*",att['Variables']['Attribute']):
                        attribute_answers.append({"Category": att['Variables']['Category'], "Attribute": att['Variables']['Attribute'], "Type": att['Variables']['ValueType']})
                    transcript.write(str(query2_answer) + '\n')
                  except PrologError as err:
                      if err.prolog().startswith('existence_error'):
                        pass
                  
                  attribute_nlg = []
                  for a in attribute_answers:
                    try:
                      att_nlg_query_response = swipl_thread.query("blawxrun(blawx_attribute_nlg(" + a['Attribute'] + ",Order,Prefix,Infix,Postfix),Human).")
                    except PrologError as err:
                      if err.prolog().startswith('existence_error'):
                        continue
                    att_nlg_query_answers = generate_answers(att_nlg_query_response)
                    for anlga in att_nlg_query_answers:
                      attribute_nlg.append({"Attribute": a['Attribute'], "Order": anlga['Variables']['Order'], "Prefix": anlga['Variables']['Prefix'], "Infix": anlga['Variables']['Infix'], "Postfix": anlga['Variables']['Postfix']})

                  transcript.write(str(query1_answer) + '\n')
                  object_query_answers = []
                  for cat in query1_answers:
                    category_name = cat['Variables']['Category']
                    try:
                      cat_query_response = swipl_thread.query("blawxrun(" + category_name + "(Object),Human).")
                    except PrologError as err:
                      if err.prolog().startswith('existence_error'):
                        continue
                    transcript.write(str(cat_query_response) + '\n')
                    cat_query_answers = generate_answers(cat_query_response)
                    for answer in cat_query_answers:
                      object_name = answer['Variables']['Object']
                      # Do not add variables as objects
                      if not re.search(r"^[A-Z_]\w*",object_name):
                        object_query_answers.append({"Category": category_name, "Object": object_name})
                  value_query_answers = []
                  for att in query2_answers:
                    attribute_name = att['Variables']['Attribute']
                    try:
                      att_query_response = swipl_thread.query("blawxrun(" + attribute_name + "(Object,Value),Human).")
                    except PrologError as err:
                      if err.prolog().startswith('existence_error'):
                        continue
                    transcript.write(str(att_query_response) + '\n')
                    att_query_answers = generate_answers(att_query_response)
                    for answer in att_query_answers:
                      object_name = answer['Variables']['Object']
                      value = answer['Variables']['Value']
                      skip_value_variable_check = False
                      # Right now, this returns a variable name as a value. It's not clear if this is something that
                      # SHOULD be included in the data, and filtered out at the front end, making the API more complicated,
                      # or if it should be filtered out here, simplifying the API, but making it impossible to know that
                      # the generic statement has been made. For now, I will remove it at the API level.
                      # Note that we are excluding partially and fully unground statements.
                      # I think that converting the value to a string should work for everything, but it
                      # is added specifically to deal with numbers.
                      # I need to check and see if the thing is a date, and if it is, convert it to JSON format.
                      if type(value) == dict and 'functor' in value:
                        if value['functor'] == 'date':
                          value = f"{str(value['args'][0]):0>4}" + '-' + f"{str(value['args'][1]):0>2}" + '-' + f"{str(value['args'][2]):0>2}"
                        elif value['functor'] == 'time':
                          value = f"{str(value['args'][0]):0>2}" + ':' + f"{str(value['args'][1]):0>2}"
                        elif value['functor'] == 'datetime':
                          value = f"{str(value['args'][0]):0>4}" + '-' + f"{str(value['args'][1]):0>2}" + '-' + f"{str(value['args'][2]):0>2}" + "T" + f"{str(value['args'][3]):0>2}" + ':' + f"{str(value['args'][4]):0>2}"
                        elif value['functor'] == 'duration':
                          if value['args'][0] == -1:
                            new_value = "-P"
                          else:
                            new_value = "P"
                            skip_value_variable_check = True #It starts with a capital P, but it is not a variable.
                          if value['args'][1] != 0:
                            new_value += str(value['args'][1]) + "Y"
                          if value['args'][2] != 0:
                            new_value += str(value['args'][2]) + "M"
                          if value['args'][3] != 0 or (value['args'][1] == 0 and value['args'][2] == 0):
                            new_value += str(value['args'][3]) + "D"
                          if value['args'][4] != 0 or value['args'][5] != 0 or value['args'][6] != 0:
                            new_value += "T"
                          if value['args'][4] != 0:
                            new_value += str(value['args'][4]) + "H"
                          if value['args'][5] != 0:
                            new_value += str(value['args'][5]) + "M"
                          if value['args'][6] != 0:
                            new_value += str(value['args'][6]) + "S"
                          value = new_value
                      # matches = re.findall(r"^date\((\d{4}),(\d{2}),(\d{2})\)$", str(value), re.MULTILINE)
                      # if len(matches):
                      #   (year,month,day) = matches[0]
                      #   value = str(year) + '-' + str(month) + '-' + str(day)
                      if not re.search(r"^[A-Z_]\w*",object_name) and (skip_value_variable_check or not re.search(r"^[A-Z_]\w*",str(value))):
                        value_query_answers.append({"Attribute": attribute_name, "Object": object_name, "Value": value})

              transcript.close()
              transcript = open(transcript_name,'r')
              # transcript = open("transcript",'r')
              transcript_output = transcript.read()
              transcript.close()
              os.remove(transcript_name)
    except PrologError as err:
      return { "error": "There was an error while running the code.", "transcript": err.prolog() }
    except PrologLaunchError as err:
      return { "error": "Blawx could not load the reasoner." }
    # Return the results as JSON
    return { "Categories": category_answers, "CategoryNLG": category_nlg, "Attributes": attribute_answers, "AttributeNLG": attribute_nlg, "Objects": object_query_answers, "Values": value_query_answers, "Transcript": transcript_output }

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticatedOrReadOnly])
def get_ontology(request,ruledoc,test_name):
    ruledoctest = RuleDoc.objects.get(pk=ruledoc)
    if request.user.has_perm('blawx.view_ruledoc',ruledoctest):
      test = BlawxTest.objects.get(ruledoc=ruledoc,test_name=test_name)
      result = get_ontology_internal(ruledoc,test_name)
      if test.view == "":
        result['View'] = test.view
      else:
        result['View'] = json.loads(test.view.replace('\'','\"'))
      if test.fact_scenario == "":
        result['Facts'] = test.fact_scenario
      else:
        result['Facts'] = json.loads(test.fact_scenario.replace('\'','\"').replace("True","true").replace("False","false"))
      return Response(result)
    else:
      return HttpResponseForbidden()

def simplify_rule(rule):
  # Find all of the variables.
  variables = get_variables(rule)
  # Give each variable a replacement in the order in which they appear.
  replacements = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q']
  # Replace all instances of each variable with its replacement.
  for index, var in enumerate(variables):
    rule = rule.replace(var,replacements[index])
  return rule

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([AllowAny])
def interview(request,ruledoc,test_name):
    #print("Dealing with interview request.\n")
    test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
    if request.user.has_perm('blawx.run',test):
      #print("User has permissions.\n")
#       translated_facts = ""
#       if request.data:
#         translated_facts = new_json_2_scasp(request.data, ruledoc,test_name,True) #Generate answers ignoring assumptions in the submitted data
#       print("The raw data submitted is:")
#       print(str(request.data) + "\n")
#       print("Facts submittied are:")
#       print(str(translated_facts))
#       wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=ruledoc))
#       ruleset = ""
#       for ws in wss:
#         ruleset += "\n\n" + ws.scasp_encoding
#       ruleset += "\n\n" + test.scasp_encoding
      
#       rulefile = tempfile.NamedTemporaryFile('w',delete=False)
#       rulefile.write("""
# :- use_module(library(scasp)).
# :- use_module(library(scasp/human)).
# :- use_module(library(scasp/output)).

# :- meta_predicate
#     blawxrun2(0,-).
# """)

#       query = "No Query Specified"
#       for line in test.scasp_encoding.splitlines():
#           if line.startswith("?- "):
#               query = line[3:-1] # remove query prompt and period.

#       rulefile.write("""
# blawxrun(Query, Human) :-
#     scasp(Query,[tree(Tree)]),
#     ovar_analyze_term(t(Query, Tree),[name_constraints(true)]),
#     with_output_to(string(Human),
#               human_justification_tree(Tree,[])).
#     term_attvars(Query, AttVars),
#     maplist(del_attrs, AttVars).
# """)
  
#       rulefile.write(ldap_code + '\n\n')
#       rulefile.write(scasp_dates + '\n\n')


#       rulefile.write(ruleset + '\n')

      # ruleset_lines = [line.replace(' ','') for line in ruleset.splitlines()]
      # test_lines = [line.replace(' ','') for line in test.scasp_encoding.splitlines()]
      # for fact in translated_facts.splitlines():
      #   if fact.replace(' ','') not in ruleset_lines and fact.replace(' ','') not in test_lines:
      #     rulefile.write(fact + '\n')
      # # rulefile.write(translated_facts)
      # rulefile.close()
      # rulefilename = rulefile.name
      # temprulefile = open(rulefilename,'r')
      # # print(temprulefile.read())
      # temprulefile.close()

      # Start the Prolog "thread"
      # try: 
      #   with PrologMQI() as swipl:
      #       with swipl.create_thread() as swipl_thread:

      #           transcript = tempfile.NamedTemporaryFile('w',delete=False,prefix="transcript_")
      #           transcript_name = transcript.name

      #           with redirect_stderr(transcript):
      #               load_file_answer = swipl_thread.query("['" + rulefilename + "'].")
      #           print("Loading generated Prolog code: " + str(load_file_answer))
      #           transcript.write(str(load_file_answer) + '\n')
      #           if os.path.exists(rulefilename):
      #               rules = open(rulefilename)
      #               rulestext = rules.read()
      #               transcript.write(rulestext + '\n')
      #               rules.close()
      #               os.remove(rulefilename)

      #           with redirect_stderr(transcript):
      #               # print("blawxrun(" + query + ",Human).")
      #               query_answer = swipl_thread.query("blawxrun(" + query + ",Human).")
      #           print("Running query " + query + ":")
      #           print(str(query_answer))
      #           transcript.write(str(query_answer) + '\n')

      #           transcript.close()
      #           transcript = open(transcript_name,'r')
      #           transcript_output = transcript.read()
      #           transcript.close()
      #           os.remove(transcript_name)
      # except PrologError as err:
      #   return Response({ "error": "There was an error while running the code.", "transcript": err.prolog() })
      # except PrologLaunchError as err:
      #   query_answer = "Blawx could not load the reasoner."
      #   return Response({ "error": "Blawx could not load the reasoner." })
      
      # Now get the ontology information to be able to generate the relevance data
      # Effectively, we're going to start over.
      translated_facts = ""
      if request.data:
        translated_facts = newer_json_2_scasp(request.data, ruledoc, test_name) #Generate answers INCLUDING assumptions in the submitted data
      #print("Generated facts with assumptions:")
      #print(str(translated_facts) + "\n")

      wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=ruledoc))
      test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
      ruleset = ""
      unique_rules = []
      for ws in wss:
        # Go line by line through the code in each workspace. If the line is "% BLAWX CHECK DUPLICATE" then ignore that line and simplify the next line,
        ruleset += "\n\n"
        workspace_lines = ws.scasp_encoding.splitlines()
        register_duplicate = False
        for line in workspace_lines:
          if line == "% BLAWX CHECK DUPLICATES":
            register_duplicate = True
            continue
          elif register_duplicate == True:
            # and add it to a checked list if it's not already in the list.
            register_duplicate = False
            simplified_line = simplify_rule(line)
            if simplified_line not in unique_rules:
              unique_rules.append(simplified_line)
            continue
          else:
            # Otherwise, add it to the code.
            ruleset += line + "\n"

        
      # do the same thing for the test.
      ruleset += "\n\n"
      test_lines = test.scasp_encoding.splitlines()
      register_duplicate = False
      for line in test_lines:
        if line == "% BLAWX CHECK DUPLICATES":
          register_duplicate = True
          continue
        elif register_duplicate == True:
          register_duplicate = False
          simplified_line = simplify_rule(line)
          if simplified_line not in unique_rules:
            unique_rules.append(simplified_line)
          continue
        else:
          ruleset += line + "\n"

      # Now add all the checked duplicate rules.
      for ur in unique_rules:
        ruleset += ur + "\n"
      
      
      rulefile = tempfile.NamedTemporaryFile('w',delete=False)
      rulefile.write("""
:- use_module(library(scasp)).
:- use_module(library(scasp/human)).
:- use_module(library(scasp/output)).

:- meta_predicate
    blawxrun2(0,-).
""")

      query = "No Query Specified"
      for line in test.scasp_encoding.splitlines():
          if line.startswith("?- "):
              query = line[3:-1] # remove query prompt and period.

      rulefile.write("""
blawxrun(Query, Human, Tree, Model) :-
    scasp(Query,[tree(Tree),model(Model),source(false)]),
    ovar_analyze_term(t(Query, Tree),[name_constraints(true)]),
    with_output_to(string(Human),
              human_justification_tree(Tree,[])).
    term_attvars(Query, AttVars),
    maplist(del_attrs, AttVars).
""")

      rulefile.write(ldap_code + '\n\n')
      rulefile.write(scasp_dates + '\n\n')
      rulefile.write(scasp_now + '\n\n')
      rulefile.write(scasp_aggregates + '\n\n')


      rulefile.write(ruleset + '\n')

      ruleset_lines = [line.replace(' ','') for line in ruleset.splitlines()]
      test_lines = [line.replace(' ','') for line in test.scasp_encoding.splitlines()]
      for fact in translated_facts.splitlines():
        if fact.replace(' ','') not in ruleset_lines and fact.replace(' ','') not in test_lines:
          rulefile.write(fact + '\n')

      # rulefile.write(translated_facts)
      rulefile.close()
      rulefilename = rulefile.name
      temprulefile = open(rulefilename,'r')
      print(temprulefile.read())
      temprulefile.close()

      # Start the Prolog "thread"
      try: 
        with PrologMQI() as swipl:
            with swipl.create_thread() as swipl_thread:

                transcript = tempfile.NamedTemporaryFile('w',delete=False,prefix="transcript_")
                transcript_name = transcript.name

                with redirect_stderr(transcript):
                    load_file_answer = swipl_thread.query("['" + rulefilename + "'].")
                #print("Loading generated prolog file: " + str(load_file_answer) + '\n')
                transcript.write(str(load_file_answer) + '\n')
                if os.path.exists(rulefilename):
                    rules = open(rulefilename)
                    rulestext = rules.read()
                    transcript.write(rulestext + '\n')
                    rules.close()
                    os.remove(rulefilename)

                #transcript.write(full_query)
                with redirect_stderr(transcript):
                    # print("blawxrun(" + query + ",Human,Model).")
                    relevance_query_answer = swipl_thread.query("blawxrun((" + query + "),Human, Tree, Model).")
                #print("Running Relevance Query:")
                #print(str(relevance_query_answer) + "\n")
                transcript.write(str(relevance_query_answer) + '\n')

                transcript.close()
                transcript = open(transcript_name,'r')
                transcript_output = transcript.read()
                transcript.close()
                os.remove(transcript_name)
      except PrologError as err:
        return Response({ "error": "There was an error while running the code.", "transcript": err.prolog() })
      except PrologLaunchError as err:
        relevance_query_answer = "Blawx could not load the reasoner."
        return Response({ "error": "Blawx could not load the reasoner." })

      # Okay, the relevance query is running properly, and including terms in the results.
      # Now I need to generate relevant categories and relevant attributes from the contents.
      # The way to do that is to go through the terms, find the ones that have been assumed.

      # The relevant categories are the categories for which there is an assumed member of a category in the results.
      # It is assumed if it justified with a chs(category(term)) in the tree. The term can be a symbol or an atom.
      # It makes a difference. If it is a variable, then the unground term is valid. If it is a symbol, the ground
      # term is valid, but not necessarily the unground term, unless it is valid elsewhere.
      # Similarly for attributes. if there exists chs(attribute(object,value)) in the tree, then it was assumed.

      # So we could start by just pulling out anything that appears inside chs, and then processing those.
      assumptions = []
      useful_assumptions = []
      relevant_categories = []
      relevant_attributes= []
      #print("Generating Answers")
      relevance_answers_processed = generate_answers(relevance_query_answer)
      #print(str(relevance_answers_processed) + '\n')
      for a in relevance_answers_processed:
        for m in a['Models']:
          assumptions.extend(find_assumptions(m['Raw']))
      for a in assumptions:
        if a['functor'] == 'not' and a['args'][0]['functor'] == 'abducible$$':
          pass
        elif simplify_term(a) not in useful_assumptions:
          useful_assumptions.append(simplify_term(a))
      for ua in useful_assumptions:
        # if len(ua['args']) == 1:
        #   relevant_categories.append(ua['functor'])
        # else:
          relevant_attributes.append({'functor': ua['functor'], 'args': ua['args']})


      
      # Return the results as JSON
      if relevance_query_answer == False:
        return Response({ "Answers": [], "Relevant Statements": relevant_attributes, "Transcript": transcript_output })
      else:
        return Response({ "Answers": relevance_answers_processed, "Relevant Statements": relevant_attributes, "Transcript": transcript_output })
    else:
      return HttpResponseForbidden()



pp.ParserElement.set_default_whitespace_chars(' \t')
answer_line = pp.Combine(pp.OneOrMore(pp.Word(pp.printables)),adjacent=False,join_string=" ") + pp.Suppress(pp.line_end)
answer = pp.OneOrMore(pp.IndentedBlock(answer_line,recursive=True))


def simplify_term(term):
  simplified = {}
  simplified['functor'] = term['functor']
  simplified['args'] = []
  replacements = ['X','Y'] # we don't use more than two-element terms
  r = 0
  for a in term['args']:
    if type(a) == dict: # If the argument is a term, simplify it, too. Used to deal with negations, mostly.
      simplified['args'].append(simplify_term(a))
    elif a[0].isupper(): #This is a variable.
      simplified['args'].append(replacements[r])
      r += 1
    else:
      simplified['args'].append(a)
  return simplified



def generate_answers(answers):
  # If the variable 'Human' appears, it is a NLG-formatted justification.
  # If the variable 'Model' appears, it is a list of terms.
  # If the variable 'Tree' appears, in is a non-NLG-formatted justificaiton.
  # Anything else is Variables.
  if answers == False:
    return []
  models = []
  result = []
  for a in answers:
    #print(answers)
    new_model = {}
    new_model['Variables'] = {}
    new_model['Terms'] = {}
    new_model['Raw'] = {}
    new_model['Residuals'] = {}
    for (k,v) in a.items():
      if k == "Human":
          if v != '\n':
            new_model['Tree'] = generate_list_of_lists(v[0:-1])
          else:
            new_model['Tree'] = ['No explanation.']
      elif k == 'Model':
        new_model['Terms'] = v
      elif k == "Tree":
          new_model['Raw'] = v
      elif k == "$residuals":
        new_model['Residuals'] = v
      else:
        new_model['Variables'][k] = v
    models.append(new_model)
    # This is not working because of how s(CASP) is choosing variable names in the residuals.
    # The variable names are not used to distinguish answers, so I think we can move residuals
    # inside the model structure, and test variables without them, then change the scenario
    # editor code to process residuals from the model, not from the variables.
    #print("Searching for: " + str(new_model['Variables']))
    #print("Among: " + str([r['Variables'] for r in result]) + '\n')
    if new_model['Variables'] not in [r['Variables'] for r in result]:
      new_answer = {}
      new_answer['Variables'] = new_model['Variables']
      new_answer['Models'] = []
      new_answer['Models'].append({'Tree': new_model['Tree'], 'Terms': new_model['Terms'], 'Raw': new_model['Raw'], 'Residuals': new_model['Residuals']})
      result.append(new_answer)
    else:
      for a in result:
        if new_model['Variables'] == a['Variables']:
          # If this explanation is not identical to another one
          duplicate = False
          for m in a['Models']:
            if 'args' in m['Raw']:
              if json.dumps(m['Raw']['args'][1][0]) == json.dumps(new_model['Raw']['args'][1][0]):
                duplicate = True
                break
          if not duplicate:
            a['Models'].append({'Tree': new_model['Tree'], 'Terms': new_model['Terms'], 'Raw': new_model['Raw'], 'Residuals': new_model['Residuals']})
  return result

def generate_list_of_lists(string):
  return answer.parse_string(string,parse_all=True).as_list()
  
def get_variables(query):
  return re.findall(r"[^\w]([A-Z_]\w*)",query)

def find_assumptions(Tree): # Pulls the assumptions out of a Prolog-formatted explanation tree
  # print("Finding assumptions in " + str(Tree))
  assumptions = []
  # If we are on "query", which is the first argument of the root "because", return nothing.
  if Tree == "query" or Tree == "o_nmr_check":
    return []
  # If we are on a list of terms, which is the second arguemnt of the root "because", go through the list.
  elif type(Tree) == list:
    for t in Tree:
      assumptions.extend(find_assumptions(t))
    return assumptions
  # If we have received a "because" functor, add all of the assumptions in each of the reasons.
  elif Tree['functor'] == '-':
    for a in Tree['args']:
      assumptions.extend(find_assumptions(a))
    return assumptions
  # If it is a chs, the assumption is the only argument.
  elif Tree['functor'] == 'abduced' or Tree['functor'] == 'chs':
    return [Tree['args'][0]]
  # CHS does not appear as an internal term. So if this is an outside term that is not chs and not because, we can ignore its contents.
  else:
    return []

