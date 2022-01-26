from django.http import Http404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import tempfile
import os
from contextlib import redirect_stderr

from swiplserver import PrologMQI

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

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def run_workspace(request,workspace):
  
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

game(testgame).
player(bob).
player(jane).
participate_in(testgame,bob).
participate_in(testgame,jane).
throw(bob,rock).
throw(jane,scissors).

"""
    query = "scasp(winner(G,P)),scasp_embed:scasp_justification(J,[]),with_output_to(string(JOut), scasp_just_human:human_justification_tree(J,[]))."
    rulefile = tempfile.NamedTemporaryFile('w',delete=False)
    rulefile.write(scasp_ruleset)
    rulefile.close()
    rulefilename = rulefile.name
  else:
    return Http404("Workspace not found")
    
  # Start the Prolog "thread"
  with PrologMQI() as swipl:
    with swipl.create_thread() as swipl_thread:

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

      transcript.write(query)
      with redirect_stderr(transcript):
        query_answer = swipl_thread.query(query)
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
