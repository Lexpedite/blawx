from swiplserver import PrologMQI
import tempfile

rules = """
:- use_module(library(scasp)).
:- use_module(library(scasp/human)).
:- use_module(library(scasp/output)).

%:- meta_predicate
%    blawxrun(0,-).

blawxrun(Query, Human) :-
    scasp(Query,[tree(Tree)]),
ovar_analyze_term(t(A, Tree)),ovar_analyze_term(t(B, Tree)),
    with_output_to(string(Human),
    human_justification_tree(Tree,[])).

%#pred overrules(R1,R2) :: 'the conclusion in @(R1) overrules the conclusion in @(R2)'.
%#pred opposes(C1,C2) :: 'the conclusion @(C1) opposes the conclusion @(C2)'.
%#pred defeated(R,_) :: 'the conclusion in @(R) is defeated'.
%#pred refuted(R,_) :: 'the conclusion in @(R) is refuted'.

refuted(R,C) :-
    opposes(C,OC),
    overrules(OR,R),
    according_to(OR,OC).

defeated(R,C) :-
    refuted(R,C).

legally_holds(R,C) :-
    according_to(R,C),
    not defeated(R,C). 






%#pred game(X) :: '@(X) is a game'.
%#pred player(X) :: '@(X) is a player'.
%#pred player(Y,X) :: '@(X) played in @(Y)'.

%#pred sign(X) :: '@(X) is a sign'.

sign(rock).

sign(paper).

sign(scissors).

beats(rock,scissors).

%#pred beats(X,Y) :: '@(X) beats @(Y)'.

beats(paper,rock).

beats(scissors,paper).

%#pred winner(X,Y) :: 'the winner of @(X) is @(Y)'.

%#pred throw(X,Y) :: '@(X) threw @(Y)'.


winner(Game,Player1) :-
player(Game,Player1),
player(Game,Player2),
throw(Player1,Throw1),
throw(Player2,Throw2),
beats(Throw1,Throw2).

#abducible player(B,A).

#abducible throw(A,B).

?- winner(A,B).
"""
rulefile = tempfile.NamedTemporaryFile('w',delete=False)
rulefile.write(rules)
rulefile.close()
rulefilename = rulefile.name
query = "blawxrun(winner(A,B),Human)."


with PrologMQI() as swipl:
    with swipl.create_thread() as swipl_thread:
        load_file_answer = swipl_thread.query("['" + rulefilename + "'].",query_timeout_seconds=1)
        query_answer = swipl_thread.query(query,query_timeout_seconds=1)

print(load_file_answer)
print(query_answer)