ec_code="""
blawx_stopped_in(T1, Fluent, T2) :-
    T1 #< T, T #< T2,
    blawx_terminates(Fluent, T).

%stoppedIn(T1, Fluent, T2) :-
%    T1 #< T, T #< T2,
%    releases(Fluent, T).

%% BEC2 - StartedIn(t1,f,t2)
blawx_started_in(T1, Fluent, T2) :-
    T1 #< T, T #< T2,
    blawx_initiates(Fluent, T).

%startedIn(T1, Fluent, T2) :-
%    T1 #< T, T #< T2,
%    releases(Fluent, T).

%% BEC3 - HoldsAt(f,t)
%holdsAt(Fluent2, T2) :-
%    initiates(Fluent1, T1),
%    trajectory(Fluent1, T1, Fluent2, T2),
%    not stoppedIn(T1, Fluent1, T2).

%% BEC4 - HoldsAt(f,t)
%holdsAt(Fluent, T) :-
%    0 #< T,
%    initiallyP(Fluent),
%    not stoppedIn(0, Fluent, T).

%% BEC5 - not HoldsAt(f,t)
%-holdsAt(Fluent, T) :-
%    0 #< T,
%    initiallyN(Fluent),
%    not startedIn(0, Fluent, T).

%% BEC6 - HoldsAt(f,t)
blawx_holds_at(Fluent, T) :-
    T1 #< T,
    blawx_initiates(Fluent, T1),
    not blawx_stopped_in(T1, Fluent, T).

%% BEC7 - not HoldsAt(f,t)
-blawx_holds_at(Fluent, T) :-
    T1 #< T,
    blawx_terminates(Fluent, T1),
    not blawx_started_in(T1, Fluent, T).

% My Special Sauce
blawx_holds_during(T1, Fluent, T2) :-
    blawx_initiates(Fluent,T1),
    not blawx_stopped_in(T1,Fluent,T2),
    T2 #> T1. % Putting this at the bottom helps a lot!

-blawx_holds_during(T1,Fluent,T2) :-
    T1 #< T2, % Putting this at the bottom breaks it.
    -blawx_holds_at(Fluent,T1),
    -blawx_holds_at(Fluent,T2),
    not blawx_started_in(T1,Fluent,T2).
"""