% An implementation of Logic Programming with Defaults and Argumentation Theories

% Overrides, opposes, and according_to should be used when writing code.
% According to and legally_holds should be used when querying.
% These are the three predicates that the user should use in their code.
% they can also be customized to be displayed in a more friendly way, as can the
% other predicates. For example, to improve the display you can encode
% #pred according_to(R,flies(X)) :: 'according to rule @(R), @(X) flies'.
#pred overrides(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) overrides the conclusion @(C2) from rule @(R2)'.
#pred opposes(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) conflicts with the conclusion @(C2) from rule @(R2)'.

#pred legally_holds(Rule,may(Y,accept,Z)) :: 'it holds in accordance with {@(Rule)} that @(Y) is permitted to accept @(Z)'.
#pred legally_holds(Rule,must_not(Y,accept,Z)) :: 'it holds in accordance with {@(Rule)} that @(Y) is prohibited from accepting @(Z)'.
#pred defeated(Rule,may(Y,accept,Z)) :: 'the conclusion that @(Y) may accept @(Z) from rule {@(Rule)} is defeated'.
#pred defeated(Rule,must_not(Y,accept,Z)) :: 'the conclusion that @(Y) must not accept @(Z) from rule {@(Rule)} is defeated'.

#pred defeated_by_disqualification(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) is defeated by disqualification by the conclusion @(C2) from rule @(R2)'.
#pred defeated_by_rebuttal(R,C,OR,OC) :: 'the conclusion @(C) from rule @(R) is defeated by rebuttal by the conclusion @(OC) from rule @(R)'.
#pred defeated_by_refutation(R,C,OR,OC) :: 'the conclusion @(C) from rule @(R) is defeated by refutation by the conclusion @(OC) from rule @(R)'.

#pred rebutted_by(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) is rebutted by the conclusion @(C2) from rule @(R2)'.
#pred refuted_by(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) is refuted by the conclusion @(C2) from rule @(R2)'.
#pred compromised(Rule,Conclusion) :: 'the conclusion @(Conclusion) from rule @(Rule) is compromised'.

#pred defeated_by_closure(R1,C1,R2,C2) :: 'the conclusion @(C1) from rule @(R1) is defeated by closure by the conclusion @(C2) from rule @(R2)'.
#pred defeated_by_closure(R,C,R,C) :: 'the conclusion @(C1) from rule @(R1) is self-defeating'.

#pred disqualified(Rule,Conclusion) :: 'the conclusion @(Conclusion) from rule @(Rule) is disqualified'.

% The argumentation theory is defined below.

% Oppositions must be stated explicitly, and must be ground at evaluation time.
opposes(R1,C1,R2,C2) :- opposes(R2,C2,R1,C1).

% A rule is rebutted if it conflicts with another rule, neither is refuted, the rebutting rule is not compromised, and there is no priority between them.

rebutted_by(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    according_to(Rule,Conclusion),
    according_to(Other_Rule,Other_Conclusion),
    opposes(Rule,Conclusion,Other_Rule,Other_Conclusion),
    not refuted(Rule,Conclusion),
    not refuted(Other_Rule,Other_Conclusion),
    not compromised(Other_Rule,Other_Conclusion),
    not overrides(Rule,Conclusion,Other_Rule,Other_Conclusion),
    not overrides(Other_Rule,Other_Conclusion,Rule,Conclusion).

% A rule is refuted if there is another rule that conflicts with it and overrides it.
refuted_by(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    opposes(Rule,Conclusion,Other_Rule,Other_Conclusion),
    overrides(Other_Rule,Other_Conclusion,Rule,Conclusion),
    according_to(Rule,Conclusion),
    Rule \= Other_Rule,
    Conclusion \= Other_Conclusion,
    according_to(Other_Rule,Other_Conclusion).

% A rule is compromised if it is either refuted or defeated.

compromised(Rule,Conclusion) :-
    refuted_by(Rule,Conclusion,_,_).

%% Inserting this rule causes OLON problems.
compromised(Rule,Conclusion) :-
    defeated_by(Rule,Conclusion).

% A rule is disqualified if it defeats itself through a cycle of rebuttals or refutations (not disqualifications)

defeated_by_closure(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    unsafe_rebutted_by(Rule,Conclusion,Other_Rule,Other_Conclusion).
defeated_by_closure(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    refuted_by(Rule,Conclusion,Other_Rule,Other_Conclusion).
defeated_by_closure(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    unsafe_rebutted_by(Rule,Conclusion,Third_Rule,Third_Conclusion),
    defeated_by_closure(Third_Rule,Third_Conclusion,Other_Rule,Other_Conclusion).
defeated_by_closure(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    refuted_by(Rule,Conclusion,Third_Rule,Third_Conclusion),
    defeated_by_closure(Third_Rule,Third_Conclusion,Other_Rule,Other_Conclusion).

% Defeat by closure checks for chains of rebuttals and refutations, regardless of whether
% the defeating or rebutting rule is defeated or compromised.
unsafe_rebutted_by(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    according_to(Rule,Conclusion),
    according_to(Other_Rule,Other_Conclusion),
    opposes(Rule,Conclusion,Other_Rule,Other_Conclusion),
    not overrides(Rule,Conclusion,Other_Rule,Other_Conclusion),
    not overrides(Other_Rule,Other_Conclusion,Rule,Conclusion).


disqualified(Rule,Conclusion) :-
    defeated_by_closure(Rule,Conclusion,Rule,Conclusion).

% A rule is defeated if it is refuted or rebutted by a rule that is not compromised, or if it is disqualified.
% (A rebutting rule is already not compromsied, the requirement of non-compromise does not apply to refutation)
%#pred defeated(Rule,Conclusion) :: 'the conclusion @(Conclusion) from rule @(Rule) is defeated'.

defeated_by_disqualification(Rule,Conclusion,Rule,Conclusion) :- disqualified(Rule,Conclusion).

defeated_by_rebuttal(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    Rule \= Other_Rule,
    Conclusion \= Other_Conclusion,
    rebutted_by(Rule,Conclusion,Other_Rule,Other_Conclusion).

% The ordering of the clauses in the body seems important for whether or not an OLON situation is created.
defeated_by_refutation(Rule,Conclusion,Other_Rule,Other_Conclusion) :-
    refuted_by(Rule,Conclusion,Other_Rule,Other_Conclusion).

% A conclusion can be defeated three ways.
defeated(R,C) :-
    R \= OR,
    C \= OC,
    opposes(R,C,OR,OC),
    defeated_by_disqualification(R,C,OR,OC).
defeated(R,C) :-
    R \= OR,
    C \= OC,
    opposes(R,C,OR,OC),
    defeated_by_rebuttal(R,C,OR,OC).
defeated(R,C) :-
    R \= OR,
    C \= OC,
    opposes(R,C,OR,OC),
    defeated_by_refutation(R,C,OR,OC).

% a conclusion holds if it is found and not defeated.
%#pred legally_holds(R,C) :: 'the conclusion @(C) from rule @(R) ultimately holds'.
legally_holds(R,C) :-
    not defeated(R,C),
    according_to(R,C).
