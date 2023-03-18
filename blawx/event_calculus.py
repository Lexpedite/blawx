ec_code="""
stoppedIn(T1, Fluent, T2) :-
    T1 #< T, T #< T2,
    terminates(Fluent, T).

%stoppedIn(T1, Fluent, T2) :-
%    T1 #< T, T #< T2,
%    releases(Fluent, T).

%% BEC2 - StartedIn(t1,f,t2)
startedIn(T1, Fluent, T2) :-
    T1 #< T, T #< T2,
    initiates(Fluent, T).

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
holdsAt(Fluent, T) :-
    T1 #< T,
    initiates(Fluent, T1),
    not stoppedIn(T1, Fluent, T).

%% BEC7 - not HoldsAt(f,t)
-holdsAt(Fluent, T) :-
    T1 #< T,
    terminates(Fluent, T1),
    not startedIn(T1, Fluent, T).

% My Special Sauce
holdsDuring(T1, Fluent, T2) :-
    initiates(Fluent,T1),
    not stoppedIn(T1,Fluent,T2),
    T2 #> T1. % Putting this at the bottom helps a lot!

-holdsDuring(T1,Fluent,T2) :-
    T1 #< T2, % Putting this at the bottom breaks it.
    -holdsAt(Fluent,T1),
    -holdsAt(Fluent,T2),
    not startedIn(T1,Fluent,T2).
"""