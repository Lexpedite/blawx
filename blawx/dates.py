from datetime import datetime

now = datetime.now()
today = datetime(now.year,now.month,now.day)
scasp_now = "blawx_now(datetime(" + str(now.timestamp()) + ")).\n"
scasp_now += "blawx_today(date(" + str(today.timestamp()) + ")).\n"

scasp_dates = """
%:- use_module(library(scasp)).
%:- use_module(library(scasp/human)).
%:- style_check(-discontiguous).
%:- style_check(-singleton).
%:- set_prolog_flag(scasp_unknown, fail).

#pred date_add(X,Y,Z) :: 'adding @(Y) to @(X) gives @(Z)'.
#pred date_compare(X,eq,Y) :: '@(X) is the same as @(Y)'.
#pred date_compare(X,lt,Y) :: '@(X) is before @(Y)'.
#pred date_compare(X,lte,Y) :: '@(X) is on or before @(Y)'.
#pred date_compare(X,gt,Y) :: '@(X) is after @(Y)'.
#pred date_compare(X,gte,Y) :: '@(X) is on or after @(Y)'.
#pred date_compare(X,ne,Y) :: '@(X) is not the same as @(Y)'.
#pred duration_compare(X,eq,Y) :: '@(X) is the same as @(Y)'.
#pred duration_compare(X,lt,Y) :: '@(X) is larger than @(Y)'.
#pred duration_compare(X,lte,Y) :: '@(X) is larger than or the same as @(Y)'.
#pred duration_compare(X,gt,Y) :: '@(X) is less than @(Y)'.
#pred duration_compare(X,gte,Y) :: '@(X) is less than or the same as @(Y)'.
#pred duration_compare(X,ne,Y) :: '@(X) is not the same as @(Y)'.

date_add(date(X),duration(Y),datetime(Z)) :- X \= bot, Z \= eot, Z #= X + Y.
date_add(datetime(X),duration(Y),datetime(Z)) :- X \= bot, Z \= eot, Z #= X + Y.
date_add(date(X),time(Y),datetime(Z)) :- Z \= bot, Z \= eot, Z #= X + Y.
%-date_add(_,_,datetime(eot)).
%-date_add(_,_,date(eot)).
%-date_add(date(bot),_,_).
%-date_add(datetime(bot),_,_).

date_compare(time(X),eq,time(X)).
date_compare(time(X),lt,time(Y)) :- X #< Y.
date_compare(time(X),gt,time(Y)) :- X #> Y.
date_compare(time(X),lte,time(Y)) :- X #=< Y.
date_compare(time(X),gte,time(Y)) :- X #>= Y.
date_compare(time(X),ne,time(Y)) :- X \= Y.

date_compare(datetime(X),eq,datetime(X)).
date_compare(datetime(bot),gte,datetime(bot)).
date_compare(datetime(bot),lte,datetime(bot)).
date_compare(datetime(eot),gte,datetime(eot)).
date_compare(datetime(eot),lte,datetime(eot)).
date_compare(datetime(bot),lt,datetime(Y)) :- Y \= bot.
date_compare(datetime(eot),gt,datetime(Y)) :- Y \= eot.
date_compare(datetime(X),lt,datetime(Y)) :- X #< Y.
date_compare(datetime(X),gt,datetime(Y)) :- X #> Y.
date_compare(datetime(X),lte,datetime(Y)) :- X #=< Y.
date_compare(datetime(X),gte,datetime(Y)) :- X #>= Y.
date_compare(datetime(X),ne,datetime(Y)) :- X \= Y.

date_compare(date(X),eq,datetime(X)).
date_compare(date(bot),gte,datetime(bot)).
date_compare(date(eot),lte,datetime(eot)).
date_compare(date(eot),gte,datetime(eot)).
date_compare(date(bot),lte,datetime(bot)).
date_compare(date(bot),lt,datetime(Y)) :- Y \= bot.
date_compare(date(eot),gt,datetime(Y)) :- Y \= eot.
date_compare(date(X),lt,datetime(Y)) :- X #< Y.
date_compare(date(X),gt,datetime(Y)) :- X #> Y.
date_compare(date(X),lte,datetime(Y)) :- X #=< Y.
date_compare(date(X),gte,datetime(Y)) :- X #>= Y.
date_compare(date(X),ne,datetime(Y)) :- X \= Y.

date_compare(datetime(X),eq,date(X)).
date_compare(datetime(bot),gte,date(bot)).
date_compare(datetime(bot),lte,date(bot)).
date_compare(datetime(eot),gte,date(eot)).
date_compare(datetime(eot),lte,date(eot)).
date_compare(datetime(bot),lt,date(Y)) :- Y \= bot.
date_compare(datetime(eot),gt,date(Y)) :- Y \= eot.
date_compare(datetime(X),lt,date(Y)) :- X #< Y.
date_compare(datetime(X),gt,date(Y)) :- X #> Y.
date_compare(datetime(X),lte,date(Y)) :- X #=< Y.
date_compare(datetime(X),gte,date(Y)) :- X #>= Y.
date_compare(datetime(X),ne,date(Y)) :- X \= Y.

date_compare(date(X),eq,date(X)).
date_compare(date(bot),gte,date(bot)).
date_compare(date(bot),lte,date(bot)).
date_compare(date(eot),gte,date(eot)).
date_compare(date(eot),lte,date(eot)).
date_compare(date(bot),lt,date(Y)) :- Y \= bot.
date_compare(date(eot),gt,date(Y)) :- Y \= eot.
date_compare(date(X),lt,date(Y)) :- X #< Y.
date_compare(date(X),gt,date(Y)) :- X #> Y.
date_compare(date(X),lte,date(Y)) :- X #=< Y.
date_compare(date(X),gte,date(Y)) :- X #>= Y.
date_compare(date(X),ne,date(Y)) :- X \= Y.


duration_compare(duration(X),eq,duration(X)).
duration_compare(duration(X),lt,duration(Y)) :- X #< Y.
duration_compare(duration(X),gt,duration(Y)) :- X #> Y.
duration_compare(duration(X),lte,duration(Y)) :- X #=< Y.
duration_compare(duration(X),gte,duration(Y)) :- X #>= Y.
duration_compare(duration(X),ne,duration(Y)) :- X \= Y.
"""