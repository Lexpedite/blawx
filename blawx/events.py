ec_code = """
blawx_as_of(X,datetime(Y)) :- blawx_as_of(X,date(Y)).
blawx_during(datetime(X),Y,datetime(Z)) :- blawx_during(date(X),Y,date(Z)).
blawx_during(datetime(X),Y,datetime(Z)) :- blawx_during(date(X),Y,datetime(Z)).
blawx_during(datetime(X),Y,datetime(Z)) :- blawx_during(datetime(X),Y,date(Z)).
blawx_becomes(X,datetime(Y)) :- blawx_becomes(X,date(Y)).
"""