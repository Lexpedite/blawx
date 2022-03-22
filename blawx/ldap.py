ldap_code = """
#pred overrides(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) overrides the conclusion @(C2) from rule @(R2)'.
#pred opposes(C1,C2) :: 'the conclusion @(C1) conflicts with the conclusion @(C2)'.

#pred refuted_by(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) is refuted by the conclusion @(C2) from rule @(R2)'.

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