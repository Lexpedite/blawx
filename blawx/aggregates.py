scasp_aggregates = """
count_blawx_list([],0).
count_blawx_list([_|[]],1).
count_blawx_list([_|Rest],Count) :-
    Rest \= [],
    count_blawx_list(Rest,RestCount),
    Count is RestCount + 1.
    
sum_blawx_list([],0).
sum_blawx_list([Any|[]],Any).
sum_blawx_list([First|Rest],Sum) :-
    Rest \= [],
    sum_blawx_list(Rest,RestSum),
    Sum is First + RestSum.

average_blawx_list([Any|[]],Any).
average_blawx_list(List,Average) :-
    count_blawx_list(List,Count),
    sum_blawx_list(List,Sum),
    Average is Sum / Count.

% If there is only one element, the maximum of that list is the element.
max_blawx_list([Any|[]],Any).

% If there are three elements, the maximum is either the first element, or the maximum of the remainder
max_blawx_list([First|Rest],First) :-
    max_blawx_list(Rest,RestMax),
    First #>= RestMax.
max_blawx_list([First|Rest],RestMax) :-
    max_blawx_list(Rest,RestMax),
    First #< RestMax.

min_blawx_list([Any|[]],Any).
min_blawx_list([First|Rest],First) :-
    min_blawx_list(Rest,RestMin),
    First #=< RestMin.
min_blawx_list([First|Rest],RestMin) :-
    min_blawx_list(Rest,RestMin),
    First #> RestMin.
"""