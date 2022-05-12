from django.http import Http404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import tempfile
import os
import json 
import re
from contextlib import redirect_stderr
import pyparsing as pp

from swiplserver import PrologMQI, PrologError, PrologLaunchError

from .models import Workspace, RuleDoc, BlawxTest
from .ldap import ldap_code
from .dates import scasp_dates

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

def new_json_2_scasp(payload):
  output = ""
  # For Each Category
  for (category_name,category_contents) in payload.items():
    # Make category membership abducible?
    if 'members_known' in category_contents:
      if category_contents['members_known'] == False:
        output += "#abducible " + category_name + "(X).\n"
    
    # For each attribute
    if 'attributes_known' in category_contents:
      for (cat_attrib_name,cat_attrib_known) in category_contents['attributes_known'].items():
        # Make attribute abducible?
        if cat_attrib_known == False:
          output += "#abducible " + cat_attrib_name + "(X,Y).\n"
    # For each member
    for (object_name,object_attributes) in category_contents['members'].items():
      # Create the Member
      output += category_name + "(" + object_name + ").\n"
      # For each property
      for (attribute_name, attribute_values) in object_attributes.items():
        # Make the partially-ground property abducible?
        # Depends on this value, AND the value for the attribute generally...
        if 'values_known' in attribute_values:
          if attribute_values['values_known'] == False:
            output += "#abducible " + attribute_name + "(" + object_name + ",X).\n"
        # For each value
        for value in attribute_values['values']:
          # Add the attribute value
          output += attribute_name + "(" + object_name + ", " + str(value) + ").\n"
  return output

def json_2_scasp(element,higher_order=False):
  output = ""
  if type(element) is dict:
    # the keys of this dictionary are predicates
    for (k,v) in element.items():
      for occurrance in v:
        output += k + "("
        for parameter in occurrance:
          output += json_2_scasp(parameter,True)
          output += ","
        output = output[:-1] + ")" #Trim trailing comma
        if not higher_order:
          output += ".\n"
    return output
  else:
    return str(element)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def run_query(request,workspace,query):
  
  # Collect the rules based on the ruleset specified
  if workspace == "rps":
    scasp_ruleset = """
:- use_module(library(scasp)).

#pred player(X) :: '@(X) is a player'.
#pred participate_in(Game,Player) :: '@(Player) participated in @(Game)'.
#pred winner(Game,Player) :: '@(Player) is the winner of @(Game)'.
#pred throw(Player,Sign) :: '@(Player) threw @(Sign)'.
#pred beat(Sign,OtherSign) :: '@(Sign) beats @(OtherSign)'.
#pred game(G) :: '@(G) is a game of rock-paper-scissors'.
#pred not_same_player(X,Y) :: '@(X) and @(Y) are not the same player'.

beat(rock,scissors).
beat(scissors,paper).
beat(paper,rock).

not_same_player(X,Y) :-
    X \= Y.

game_has_two_different_players(Game,Player,OtherPlayer) :-
    game(Game),
    player(Player),
    not_same_player(Player,OtherPlayer),
    player(OtherPlayer),
    participate_in(Game,Player),
    participate_in(Game,OtherPlayer).

winner(Game,Player) :-
  game_has_two_different_players(Game,Player,OtherPlayer),
  throw(Player,Sign),
  throw(OtherPlayer,OtherSign),
  beat(Sign,OtherSign).
"""
    rulefile = tempfile.NamedTemporaryFile('w',delete=False)
    rulefile.write(scasp_ruleset)
    rulefile.close()
    rulefilename = rulefile.name
  else:
    return Http404("Workspace not found")

  # Collect the query based on the query specified in the URL
  if query == "winner":
    scasp_query = "winner(G,P)"
  else:
    return Http404("Query not found")
  
  # Collect the data provided, and convert it into s(CASP) statements.
  if request.method == "GET":
    translated_facts = """
game(testgame).
player(bob).
player(jane).
participate_in(testgame,bob).
participate_in(testgame,jane).
throw(bob,rock).
throw(jane,scissors)."""

  elif request.method == "POST":
    translated_facts = json_2_scasp(request.get_json())
    
  # Start the Prolog "thread"
  with PrologMQI() as swipl:
    with swipl.create_thread() as swipl_thread:
      
      file = open(rulefilename,'a')
      
      
      file.write(translated_facts)        
        
      file.close()
      file = open(rulefilename,'r')
      transcript = open("transcript","w")
      transcript.write("Loading " + rulefilename + ", the contents of which are:\n")
      transcript.write(file.read() + '\n')
    #   print(file.read())
      file.close()
      

      with redirect_stderr(transcript):
        load_file_answer = swipl_thread.query("['" + rulefilename + "'].")
      transcript.write(str(load_file_answer) + '\n')
      if os.path.exists(rulefilename):
        os.remove(rulefilename)

      # Execute the requested query.
      transcript.write("scasp(" + scasp_query + "),scasp_embed:scasp_justification(J,[]),with_output_to(string(JOut), scasp_just_human:human_justification_tree(J,[])).\n")
      with redirect_stderr(transcript):
        query_answer = swipl_thread.query("scasp(" + scasp_query + "),scasp_embed:scasp_justification(J,[]),with_output_to(string(JOut), scasp_just_human:human_justification_tree(J,[])).")
      transcript.write(str(query_answer) + '\n')
      
      transcript.close()
      transcript = open("transcript",'r')
      transcript_output = transcript.read()
      transcript.close()
      os.remove('transcript')
      
      if type(query_answer) is not list:
        query_output = query_answer
      else:
        query_output = query_answer[0]

      # Return the results as JSON
      return Response({ "answer": query_output, "transcript": transcript_output })

@api_view(['POST'])
@permission_classes([AllowAny])
def run_ruledoc(request,pk):
    translated_facts = ""
    if request.data:
      translated_facts = json_2_scasp(request.data)
    wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=pk))
    ruleset = ""
    for ws in wss:
      ruleset += ws.scasp_encoding
    query = "No Query Specified"
    for line in ruleset.splitlines():
        if line.startswith("?- "):
            query = line[3:-1] # remove query prompt and period.
    full_query = "scasp(" + query + ",[tree(Tree)]),with_output_to(string(Human), human_justification_tree(Tree,[]))."
    rulefile = tempfile.NamedTemporaryFile('w',delete=False)
    rulefile.write(":- use_module(library(scasp)).\n")
    rulefile.write(":- use_module(library(scasp/human)).\n")
    rulefile.write(translated_facts)
    rulefile.write(ruleset)
    rulefile.close()
    rulefilename = rulefile.name

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
                  os.remove(rulefilename)

              transcript.write(full_query)
              with redirect_stderr(transcript):
                  query_answer = swipl_thread.query(full_query)
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
    return Response({ "answer": json.dumps(query_answer), "transcript": transcript_output })

    
@api_view(['POST'])
@permission_classes([AllowAny])
def run_test(request,ruledoc,test_name):
    translated_facts = ""
    if request.data:
      translated_facts = new_json_2_scasp(request.data)
    wss = Workspace.objects.filter(ruledoc=RuleDoc.objects.get(pk=ruledoc))
    test = BlawxTest.objects.get(ruledoc=RuleDoc.objects.get(pk=ruledoc),test_name=test_name)
    ruleset = ""
    for ws in wss:
      ruleset += "\n\n" + ws.scasp_encoding
    ruleset += "\n\n" + test.scasp_encoding
    # print(ruleset)
    
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
    scasp(Query,[tree(Tree)]),
    ovar_analyze_term(t(Query, Tree),[name_constraints(true)]),
    with_output_to(string(Human),
		           human_justification_tree(Tree,[])).
    term_attvars(Query, AttVars),
    maplist(del_attrs, AttVars).
""")
    # For Each Variable in the query
#     for v in get_variables(query):
#       rulefile.write("ovar_analyze_term(t(" + v + ", Tree),[name_constraints(true)]),")
#     rulefile.write("""
#     with_output_to(string(Human),
#     human_justification_tree(Tree,[])).
# """)

    rulefile.write(ldap_code + '\n\n')
    rulefile.write(scasp_dates + '\n\n')


    rulefile.write(translated_facts)
    rulefile.write(ruleset)
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
                  print("blawxrun(" + query + ",Human).")
                  query_answer = swipl_thread.query("blawxrun(" + query + ",Human).")
                  
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

pp.ParserElement.set_default_whitespace_chars(' \t')
answer_line = pp.Combine(pp.OneOrMore(pp.Word(pp.printables)),adjacent=False,join_string=" ") + pp.Suppress(pp.line_end)
answer = pp.OneOrMore(pp.IndentedBlock(answer_line,recursive=True))

#TODO Check to see if answer works when there is more than one root query element

def generate_answers(answers):
  models = []
  result = []
  for a in answers:
    new_model = {}
    new_model['Variables'] = {}
    for (k,v) in a.items():
      if k == "Human":
        new_model['Tree'] = generate_list_of_lists(v[0:-5])
      else:
        new_model['Variables'][k] = v
    models.append(new_model)
    if new_model['Variables'] not in [r['Variables'] for r in result]:
      new_answer = {}
      new_answer['Variables'] = new_model['Variables']
      new_answer['Models'] = []
      new_answer['Models'].append(new_model['Tree'])
      result.append(new_answer)
    else:
      for a in result:
        if new_model['Variables'] == a['Variables']:
          a['Models'].append(new_model['Tree'])
  return result

def generate_list_of_lists(string):
  return answer.parse_string(string,parse_all=True).as_list()
  
def get_variables(query):
  return re.findall(r"[^\w]([A-Z_]\w*)",query)