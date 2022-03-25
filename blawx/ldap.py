ldap_code = """
#pred overrules(R1,R2) :: 'the conclusion in @(R1) overrules the conclusion in @(R2)'.
#pred opposes(C1,C2) :: 'the conclusion @(C1) opposes the conclusion @(C2)'.
#pred defeated(R,_) :: 'the conclusion in @(R) is defeated'.
#pred refuted(R,_) :: 'the conclusion in @(R) is refuted'.

refuted(R,C) :-
    opposes(C,OC),
    overrules(OR,R),
    according_to(OR,OC).

defeated(R,C) :-
    refuted(R,C).

legally_holds(R,C) :-
    according_to(R,C),
    not defeated(R,C). 
"""