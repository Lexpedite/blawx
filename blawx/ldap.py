ldap_code = """
% We need language for the applies predicate that is not related to any other predicate.
#pred blawx_applies(Y,X) :: '@(Y) applies to @(X)'.
#pred holds(user,blawx_applies,Y,Z) :: 'it is provided as a fact that @(Y) applies to @(Z)'.
#pred holds(user,-blawx_applies,Y,Z) :: 'it is provided as a fact that it is not the case that @(Y) applies to @(Z)'.
#pred holds(X,blawx_applies,Y,Z) :: 'the conclusion in @(X) that @(Y) applies to @(Z) holds'.
#pred holds(X,-blawx_applies,Y,Z) :: 'the conclusion in @(X) that it is not the case that @(Y) applies to @(Z) holds'.
#pred according_to(X,blawx_applies,Y,Z) :: 'according to @(X) @(Y) applies to @(Z)'.
#pred according_to(X,-blawx_applies,Y,Z) :: 'according to @(X) it is not the case that @(Y) applies to @(Z)'.
#pred defeated(X,blawx_applies,Y,Z) :: 'the conclusion in @(X) that @(Y) applies to @(Z) is defeated'.
#pred defeated(X,-blawx_applies,Y,Z) :: 'the conclusion in @(X) that it is not the case that @(Y) applies to @(Z) is defeated'.
-blawx_applies(X,Y) :- holds(_,-blawx_applies,X,Y).
blawx_applies(X,Y) :- holds(_,blawx_applies,X,Y).

% We presume that sections apply to things unless we have evidence they don't.
blawx_applies(X,Y) :- not -blawx_applies(X,Y).
"""