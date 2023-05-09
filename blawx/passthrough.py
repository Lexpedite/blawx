blawx_passthrough = """
#pred blawx_diseq(X,Y) :: '@(X) is not the same object as @(Y)'.

blawx_diseq(X,Y) :- X \= Y.

#pred blawx_comparison(X,eq,Y) :: '@(X) is equal to @(Y)'.
#pred blawx_comparison(X,neq,Y) :: '@(X) is not equal to @(Y)'.
#pred blawx_comparison(X,gt,Y) :: '@(X) is greater than @(Y)'.
#pred blawx_comparison(X,gte,Y) :: '@(X) is greater than or equal to @(Y)'.
#pred blawx_comparison(X,lt,Y) :: '@(X) is less than @(Y)'.
#pred blawx_comparison(X,lte,Y) :: '@(X) is less than or equal to @(Y)'.

blawx_comparison(X,eq,Y) :- X #= Y.
blawx_comparison(X,neq,Y) :- X \= Y.
blawx_comparison(X,gt,Y) :- X #> Y.
blawx_comparison(X,gte,Y) :- X #>= Y.
blawx_comparison(X,lt,Y) :- X #< Y.
blawx_comparison(X,lte,Y) :- X #=< Y.
"""