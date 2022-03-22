ldap_code = """
#pred overrides(R1,_,R2,_) :: 'the conclusion in @(R1) overrides the conclusion in @(R2)'.
#pred opposes(C1,C2) :: 'the conclusion @(C1) conflicts with the conclusion @(C2)'.
#pred defeated_by(R,_,OR,_) :: 'the conclusion in @(R) is defeated by the conclusion in @(OR)'.
#pred refuted_by(R1,_,R2,_) :: 'the conclusion in @(R1) is refuted by the conclusion in @(R2)'.

opposes(C1,C2) :- opposes(C2,C1).

overrides(A,_,B,_) :- overrules(A,B).

refuted_by(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    according_to(Rule,Conclusion),
    according_to(Other_Rule,Other_Conclusion),
    opposes(Conclusion,Other_Conclusion),
    overrides(Other_Rule,Other_Conclusion,Rule,Conclusion).

defeated_by(R,C,OR,OC) :-
    refuted_by(R,C,OR,OC).

legally_holds(R,C) :-
    according_to(R,C),
    according_to(OR,OC),
    R \= OR,
    not defeated_by(R,C,OR,OC). 
"""