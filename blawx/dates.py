from datetime import now

scasp_now = "blawx_now(" + str(now.year) + "," + str(now.month) + "," + str(now.day) + "," + str(now.hour) + "," + str(now.minute) + "," + str(now.second) + ").\n"
scasp_now += "blawx_today(" + str(now.year) + "," + str(now.month) + "," + str(now.day) + ").\n"

scasp_dates = """
% This block is only necessary when using the file on its own, locally.
% :- use_module(library(scasp)).
% :- use_module(library(scasp/human)).
% :- style_check(-discontiguous).
% :- style_check(-singleton).
% :- set_prolog_flag(scasp_unknown, fail).

% The next line must be commented out for testing to work.
:- set_test_options([load(never)]).


#pred month(Y,1) :: 'January of @(Y)'.
#pred month(Y,2) :: 'February of @(Y)'.
#pred month(Y,3) :: 'March of @(Y)'.
#pred month(Y,4) :: 'April of @(Y)'.
#pred month(Y,5) :: 'May of @(Y)'.
#pred month(Y,6) :: 'June of @(Y)'.
#pred month(Y,7) :: 'July of @(Y)'.
#pred month(Y,8) :: 'August of @(Y)'.
#pred month(Y,9) :: 'September of @(Y)'.
#pred month(Y,10) :: 'October of @(Y)'.
#pred month(Y,11) :: 'November of @(Y)'.
#pred month(Y,12) :: 'December of @(Y)'.

#pred date(Y,12,D) :: 'December @(D), @(Y)'.
#pred date(Y,11,D) :: 'November (@D), @(Y)'.
#pred date(Y,10,D) :: 'October @(D), @(Y)'.
#pred date(Y,9,D) :: 'September @(D), @(Y)'.
#pred date(Y,8,D) :: 'August @(D), @(Y)'.
#pred date(Y,7,D) :: 'July @(D), @(Y)'.
#pred date(Y,6,D) :: 'June @(D), @(Y)'.
#pred date(Y,5,D) :: 'May @(D), @(Y)'.
#pred date(Y,4,D) :: 'April @(D), @(Y)'.
#pred date(Y,3,D) :: 'March @(D), @(Y)'.
#pred date(Y,2,D) :: 'February @(D), @(Y)'.
#pred date(Y,1,D) :: 'January @(D), @(Y)'.

#pred duration(1,Y,M) :: '@(Y) years and @(M) months forward in time'.
#pred duration(-1,Y,M) :: '@(Y) years and @(M) months backward in time'.
#pred duration(1,Y,M,D) :: '@(Y) years, @(M) months, and @(D) days forward in time'.	
#pred duration(-1,Y,M,D) :: '@(Y) years, @(M) months, and @(D) days backward in time'.

#pred month_add(month(Y1,M1),duration(1,Y2,M2),month(Y3,M3)) :: 'adding @(Y2) years and @(M2) months to month @(M1) of year @(Y1) gives month @(M3) of year @(Y3)'.
#pred month_add(month(Y1,M1),duration(-1,Y2,M2),month(Y3,M3)) :: 'subtracting @(Y2) years and @(M2) months from month @(M1) of year @(Y1) gives month @(M3) of year @(Y3)'.

% This is being set manually until I know how to get it from the OS.
%today(date(2021,12,11)).

date_diff_duration(date(Y1,M1,D1),date(Y2,M2,D2),duration(S3,Y3,M3,D3)) :-
	% Set the sign
	date_diff_duration_sign(date(Y1,M1,D1),date(Y2,M2,D2),S),
	S = 1, %This version is for when the first date is before or equal.
	% Set the number of years
	date_diff_duration_years(date(Y1,M1,D1),date(Y2,M2,D2),Y3),
	NewStartYear is Y1 + Y3,
	date_diff_duration_months(date(NewStartYear,M1,D1),date(Y2,M2,D2),M3),
	date_add(date(NewStartYear,M1,D1),duration(1,0,M3,0),date(TY,TM,TD)),
	days_between(date(TY,YM,TD),date(Y2,M2,D2),D3).

date_diff_duration(date(Y1,M1,D1),date(Y2,M2,D2),duration(S3,Y3,M3,D3)) :-
	% Set the sign
	date_diff_duration_sign(date(Y1,M1,D1),date(Y2,M2,D2),S),
	S = -1, %This version is for when the first date is before or equal.
	% Set the number of years
	date_diff_duration_years(date(Y2,M2,D2),date(Y1,M1,D1),Y3),
	NewStartYear is Y1 + Y3,
	date_diff_duration_months(date(Y2,M2,D2),date(NewStartYears,M1,D1),M3),
	date_add(date(NewStartYear,M1,D1),duration(1,0,M3,0),date(TY,TM,TD)),
	days_between(date(Y2,M2,D2),date(TY,TM,TD),D3).
	
date_diff_duration_sign(date(Y1,M1,D1),date(Y2,M2,D2),1) :-
	not_before(date(Y2,M2,D2),date(Y1,M1,D1)).

date_diff_duration_sign(date(Y1,M1,D1),date(Y2,M2,D2),-1) :-
	before(date(Y2,M2,D2),date(Y1,M1,D1)).

date_diff_duration_years(date(Y1,M1,D1),date(Y2,M2,D2),Years) :-
	% if the difference between the years is large enough to subtract
	% whole years, subtract them and start again.
	YearDiff is Y2 - Y1,
	YearDiff > 1, % e.g. if it is a date in 2000 and a date in 2002, we can eliminate all of 2001
	Remove is YearDiff - 1,
	NewYear is Y1 + Remove,
	date_diff_duration_years(date(NewYear,M1,D1),date(Y2,M2,D2),RemainderYears),
	Years is Remove + RemainderYears.

date_diff_duration_years(date(Y1,M1,D1),date(Y2,M2,D2),1) :-
	% If the difference between the years is not above 1.
	YearDiff is Y2 - Y1,
	YearDiff = 1, % it is adjacent
	% But the second date is later in the year than the first.
	not_before(date(Y2,M1,D1),date(Y2,M2,D2)).  

date_diff_duration_years(date(Y1,M1,D1),date(Y2,M2,D2),0) :-
	% If the difference between the years is not above 1.
	YearDiff is Y2 - Y1,
	YearDiff = 1, % it is adjacent
	% But the second date is not later in the year than the first.
	before(date(Y2,M1,D1),date(Y2,M2,D2)).  
	
date_diff_duration_years(date(Y1,M1,D1),date(Y2,M2,D2),0) :-
	% If the difference is zero
	Y2 = Y1.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),Months) :-
	Y1 = Y2,
	% If the difference between months is greater than 1
	MonthDiff = M2 - M1,
	MonthDiff > 1,
	Remove is MonthDiff - 1,
	NewMonths is M1 + Remove,
	date_diff_duration_months(date(Y1,NewMonth,D1),date(Y2,M2,D2),RemainderMonths),
	Months is Remove + RemainderMonths.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),Months) :-
	Y1 < Y2,
	NewM2 is M2 + 12,
	% If the difference between months is greater than 1
	MonthDiff = M2 - M1,
	MonthDiff > 1,
	Remove is MonthDiff - 1,
	NewMonths is M1 + Remove,
	date_diff_duration_months(date(Y1,NewMonth,D1),date(Y2,M2,D2),RemainderMonths),
	Months is Remove + RemainderMonths.


date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),1) :-
	Y1 = Y2,
	% If the difference is 1
	MonthDiff = M2 - M1,
	MonthDiff = 1,
	D2 >= D1.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),0) :-
	Y1 = Y2,
	% If the difference is 1, but the later day is lower
	MonthDiff = M2 - M1,
	MonthDiff = 1,
	D2 < D1.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),1) :-
	Y2 > Y1,
	NewM2 is M2 + 12,
	% If the difference is 1
	MonthDiff = NewM2 - M1,
	MonthDiff = 1,
	D2 >= D1.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),0) :-
	Y2 > Y1,
	NewM2 is M2 + 12,
	% If the difference is 1, but the later day is lower
	MonthDiff = NewM2 - M1,
	MonthDiff = 1,
	D2 < D1.

date_diff_duration_months(date(Y1,M1,D1),date(Y2,M2,D2),0) :-
	% If the difference is 0
	M2 = M1.

date_diff_duration_days(X,Y,0).

%% Note that this method treats date(2000,1,30) and date(2000,2,28) as being zero months and 28 days
%% apart.


timestamp(date(Y,M,D),TS) :-
	days_between(date(1970,1,1),date(Y,M,D),Days),
	TS is Days * 86400.

to_date(TS,date(Y,M,D)) :-
	Days is TS // 86400,
	date_add_days(date(1970,1,1),Days,date(Y,M,D)).

first_day_of(year(Y),date(Y,1,1)).
first_day_of(month(Y,M),date(Y,M,1)).
last_day_of(year(Y),date(Y,12,31)).
last_day_of(month(Y,M),date(Y,M,Max)) :-
	days_in_month(month(Y,M),Max).

first_day_of(week(Y,1),date(Y,1,1)).
last_day_of(week(Y,W),date(Y,12,31)) :-
	week_of_year(date(Y,12,31),W).

% IF we make it so that weeks can span over January 1, Y cannot appear twice in the conclusion.

first_day_of(week(Y,W),date(Y,M,D)) :-
	% Check that W is > 1
	W > 1,
	% Check that W is not too high.
	week_of_year(date(Y,12,31),LastWeek),
	W =< LastWeek,
	% Get the Sunday for the week of January 1.
	day_of_week(date(Y,1,1),Jan1DoW),
	Diff is Jan1DoW * -1,
	date_add_days(date(Y,1,1),Diff,date(StartY,StartM,StartD)),
	% Add the number of weeks, times 7. That is the  Sunday of the target week.
	NewWeek is W - 1,
	DaysToStartOfWeek is NewWeek * 7,
	date_add_days(date(StartY,StartM,StartD),DaysToStartOfWeek,date(Y,M,D)).


last_day_of(week(Y,W),date(Y,M,D)) :-
	% Check that W is > 0
	W > 0,
	% Check that W is not too high.
	week_of_year(date(Y,12,31),LastWeek),
	W < LastWeek,
	% Get the Sunday for the week of January 1.
	day_of_week(date(Y,1,1),Jan1DoW),
	Diff is Jan1DoW * -1,
	date_add_days(date(Y,1,1),Diff,date(StartY,StartM,StartD)),
	% Add the number of weeks, times 7, plus 6. That is the Saturday of the target week.
	NewWeek is W - 1,
	DaysToFirstDayOfWeek is NewWeek * 7,
	DaysToLastDayOfWeek is DaysToFirstDayOfWeek + 6,
	date_add_days(date(StartY,StartM,StartD),DaysToLastDayOfWeek,date(Y,M,D)).


week_of_year(date(Y,M,D),Week) :-
	% Find out what day of the week January 1 was.
	day_of_week(date(Y,1,1),Jan1DoW),
	% Find the date of the previous Sunday.
	% if January 1 is a Tuesday, the dow code is 2.
	% subtracting the dow code in days will give us the prior sunday.
	Diff is Jan1DoW * -1,
	date_add_days(date(Y,1,1),Diff,date(StartY,StartM,StartD)),
	% Find out what day of the week the target is
	day_of_week(date(Y,M,D),TargetDoW),
	% Get the date for the previous Sunday.
	date_add_days(date(Y,M,D),TargetDoW,date(EndY,EndM,EndD)),
	% Find the difference between the first week-start sunday and the target week-start sunday.
	days_between(date(StartY,StartM,StartD),date(EndY,EndM,EndD),Difference),
	% Divide by 7.
	WeekFromZero is Difference // 7,
	Week is WeekFromZero + 1.

% Using Gauss's Algorithm.
% Determine the day of the week for January 1 of year A.
% (1+5((A-1)%4)+4((A-1)%100)+6((A-1)%400))%7
% Modified below to remove the 1+ at the start, to generate 0=Sunday.
% Determine the month offset using the lookup table.
% For non-leap years, 0,3,3,6,1,4,6,2,5,0,3,5
% For leap years, 0,3,4,0,2,5,0,3,6,1,4,6
% The day of the week is (day of the week for January 1, + month offset + day of month) % 7

day_of_week(date(Y,M,D),DoW) :-
	dow_for_first_of_year(Y,Jan1DoW),
	month_offset(Y,M,MonthOffset),
	Total is Jan1DoW + MonthOffset + D,
	DoW is mod(Total,7).

dow_for_first_of_year(Y,DoW) :-
	PreviousYear is Y - 1,
	Modifier400 is 6 * mod(PreviousYear,400),
	Modifier100 is 4 * mod(PreviousYear,100),
	Modifier4 is 5 * mod(PreviousYear,4), % I'm removing the +1 from this, because it was throwing everythign off.
	Sum = Modifier400 + Modifier100 + Modifier4,
	DoW = mod(Sum,7).

standard_month_offset(1,0).
standard_month_offset(2,3).
standard_month_offset(3,3).
standard_month_offset(4,6).
standard_month_offset(5,1).
standard_month_offset(6,4).
standard_month_offset(7,6).
standard_month_offset(8,2).
standard_month_offset(9,5).
standard_month_offset(10,0).
standard_month_offset(11,3).
standard_month_offset(12,5).

month_offset(Y,M,Offset) :-
	leapyear(Y),
	M>2,
	standard_month_offset(M,Standard),
	Offset is Standard + 1.

month_offset(Y,M,Offset) :-
	not leapyear(Y),
	M>2,
	standard_month_offset(M,Offset).

month_offset(Y,M,Offset) :-
	M =< 2,
	standard_month_offset(M,Offset).

day_of_week_name(0,sunday).
day_of_week_name(1,monday).
day_of_week_name(2,tuesday).
day_of_week_name(3,wednesday).
day_of_week_name(4,thursday).
day_of_week_name(5,friday).
day_of_week_name(6,saturday).

date_diff(date(Y1,M1,D1),date(Y2,M2,D2),duration(1,0,0,0)) :-
	days_between(date(Y1,M1,D1),date(Y2,M2,D2),Days),
	Days = 0.

date_diff(date(Y1,M1,D1),date(Y2,M2,D2),duration(1,0,0,Days)) :-
	days_between(date(Y1,M1,D1),date(Y2,M2,D2),Days),
	Days > 0.

date_diff(date(Y1,M1,D1),date(Y2,M2,D2),duration(-1,0,0,AbsDays)) :-
	days_between(date(Y1,M1,D1),date(Y2,M2,D2),Days),
	Days < 0,
	AbsDays = Days * -1.

days_between(date(Y1,M1,D1),date(Y2,M2,D2),Days) :-
	epoch_date(date(Y1,M1,D1),Start),
	epoch_date(date(Y2,M2,D2),End),
	Days is End - Start.

days_between_datetimes(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),Days) :-
	epoch_date(date(Y1,Mo1,D1),SD),
	epoch_time(time(H1,Mi1,S1),ST),
	Start is SD + ST,
	epoch_date(date(Y2,Mo2,D2),ED),
	epoch_time(time(H2,Mi2,S2),ET),
	End is ED + ET,
	Days is Start - End.

% This is not attempting to create accurate Julian Dates
% Julian dates count up from January 1, 4713 BCE.
% We are counting up from January 1, 1 CE.
% But as long as it is consistent, it shouldn't matter.
epoch_date(date(Y,M,D),JD) :-
	% Convert to March as first month of the year
	A is (14 - M) // 12,
	Y1 is Y - A,
	M1 is ( M + ( 12 * A ) ) - 3,
	% Add one day for each day in this month
	JD1 is D,
	% Add the number of days in the year prior to this month.
	JD2 is JD1 + ((153 * M1) + 2) // 5,
	% Add 365 days for each year after zero (BCE -1)
	JD3 is JD2 + (365 * Y1),
	% Add one day for each 4-year leap year
	JD4 is JD3 + (Y1 // 4),
	% Subtract one leap day for each 100-even year.
	JD5 is JD4 - (Y1 // 100),
	% Add one leap year back in for each 400-even year.
	JD is JD5 + (Y1 // 400).

days_previous_to_epoch_month(1,0).
days_previous_to_epoch_month(2,31).
days_previous_to_epoch_month(3,61).
days_previous_to_epoch_month(4,92).
days_previous_to_epoch_month(5,122).
days_previous_to_epoch_month(6,153).
days_previous_to_epoch_month(7,184).
days_previous_to_epoch_month(8,214).
days_previous_to_epoch_month(9,245).
days_previous_to_epoch_month(10,275).
days_previous_to_epoch_month(11,306).
days_previous_to_epoch_month(12,337).

count_epoch_years(JD,0) :-
    JD < 365.

count_epoch_years(JD,Y) :-
	JD >= 365,
    Years is JD // 365,
    % Years is the number of full years that would have passed IF all the years were 365 days
    % long. In reality, many of them are longer, so the total number of years should be lower.
    Leap4 is Years // 4,
    Leap100 is Years // 100,
    Leap400 is Years // 400,
    LeapDays is (Leap4 - Leap100) + Leap400,
    % Leapdays is the number of leapdays would be included in Years years. This number should
    % be used to figure out how much to reduce the number of years.
    count_epoch_years(LeapDays,Overage),
    Y is Years - Overage.

%% Once we have recursively figured out what the right number of years actually is, we can
%% subtract the correct number of days for that number of years.
%% Note that this may result in a negative number, if the date is in the first two months of
%% the gregorian year.
reduce_epoch_years(JD,Y,R) :-
    Leap4 is Y // 4,
    Leap100 is Y // 100,
    Leap400 is Y // 400,
    LeapDays is (Leap4 - Leap100) + Leap400,
    YearDays is Y * 365,
    R is (JD - LeapDays) - YearDays.

%% Now we can assume that we have a Date, which is March 1, Year, + the remainder of days,
%% which remainder may be negative. So 2000 -59 means march 1, 2000, less 59 days.
%% we do Month and Day on it, which adds a year of days, and subtracts a year, if necessary,
%% and we have a year, and a month starting in March, and a number of days.
%% Then we convert it by adding 2 to the months, subtracting 12 and adding a year if required.


% One we have a remainder, we want to generate a day of the year
% from it, using our fancy formula.

epoch_month_and_day(Y,R,Y1,M1,D1) :-
    R > 0,
    A is R * 5,
    B is A - 2,
    C is B / 153,
    M1 is ceiling(C),
    days_previous_to_epoch_month(M1,Days),
    D1 is R - Days,
    Y = Y1.

epoch_month_and_day(Y,R,Y1,M1,D1) :-
    R =< 0,
    not leapyear(Y),
    NewR is R + 365, 
    A is NewR * 5,
    B is A - 2,
    C is B / 153,
    M1 is ceiling(C),
    days_previous_to_epoch_month(M1,Days),
    D1 is NewR - Days,
    Y1 is Y - 1.

epoch_month_and_day(Y,R,Y1,M1,D1) :-
    R =< 0,
    leapyear(Y),
    NewR is R + 366, 
    A is NewR * 5,
    B is A - 2,
    C is B / 153,
    M1 is ceiling(C),
    days_previous_to_epoch_month(M1,Days),
    D1 is NewR - Days,
    Y1 is Y - 1.

greg_date(Y,M,Y2,M2) :-
    M >= 11,
    M2 is M - 10,
    Y2 is Y + 1.

greg_date(Y,M,Y2,M2) :-
    M < 11,
    M2 is M + 2,
    Y2 = Y.

% One Predicate to Rule them All, and In the Darkness Bind Them

epoch_to_date(JD,Y,M,D) :-
    count_epoch_years(JD,Y1),
    reduce_epoch_years(JD,Y1,R),
    epoch_month_and_day(Y1,R,Y2,M2,D),
    greg_date(Y2,M2,Y,M).

% This needs to be tested and redundant versions removed.
date_add_days(date(Y,M,D),Days,date(Y2,M2,D2)) :-
	epoch_date(date(Y,M,D),ED),
	ED2 is ED + Days,
	epoch_to_date(ED2,Y2,M2,D2).

datetime_add_days(datetime(Y,Mo,D,H,Mi,S),Days,datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y,Mo,D,H,Mi,S)),
	epoch_date(date(Y,Mo,D),ED),
	epoch_time(time(H,Mi,S),ET),
	EDT is ED+ET,
	EDT2 is EDT + Days,
	epochdt_to_datetime(EDT2,datetime(Y2,Mo2,D2,H2,Mi2,S2)).

epoch_time(time(H,Mi,S),ET) :-
	valid_time(time(H,Mi,S)),
	ET is (H*3600 + Mi*60 + S)/86400.

epochdt_to_datetime(JD,datetime(Y,Mo,D,H,Mi,S)) :-
	count_epoch_years(JD,Y1),
	reduce_epoch_years(JD,Y1,R),
	epoch_month_and_day(Y1,R,Y2,M2,D),
	greg_date(Y2,M2,Y,Mo),
	time_from_epoch(JD,time(H,Mi,S)).

time_from_epoch(EDT,time(H,Mi,S)) :-
	TimeOnly is EDT - floor(EDT),
	TimeInSeconds is TimeOnly*86400,
	H is TimeInSeconds//3600,
	TimeInSecondsLessHours is TimeInSeconds - H*3600,
	Mi is TimeInSecondsLessHours//60,
	S is TimeInSecondsLessHours - Mi*60.


	

% I want to use a new version of the comparators that takes advantage of constraints.
% after(date(Y,M,D),date(Y2,M2,D2)) :-
% 	epoch_date(date(Y,M,D),E1),
% 	epoch_date(date(Y2,M2,D2),E2),
% 	E1 #> E2.
% before(date(Y,M,D),date(Y2,M2,D2)) :-
% 	epoch_date(date(Y,M,D),E1),
% 	epoch_date(date(Y2,M2,D2),E2),
% 	E1 #< E2.
% not_after(date(Y,M,D),date(Y2,M2,D2)) :-
% 	epoch_date(date(Y,M,D),E1),
% 	epoch_date(date(Y2,M2,D2),E2),
% 	E1 #>= E2.
% not_before(date(Y,M,D),date(Y2,M2,D2)) :-
% 	epoch_date(date(Y,M,D),E1),
% 	epoch_date(date(Y2,M2,D2),E2),
% 	E1 #=< E2.
% gt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y #> Y2.
% gt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y = Y2,
% 	M #> M2.
% gt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y = Y2,
% 	M = M2,
% 	D #> D2.
% after(date(Y,M,D),date(Y2,M2,D2)) :-
% 	gt(date(Y,M,D),date(Y2,M2,D2)).
% lt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y #< Y2.
% lt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y = Y2,
% 	M #< M2.
% lt(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y = Y2,
% 	M = M2,
% 	D #< D2.
% before(date(Y,M,D),date(Y2,M2,D2)) :-
% 	lt(date(Y,M,D),date(Y2,M2,D2)).
% eq(date(Y,M,D),date(Y2,M2,D2)) :-
% 	Y = Y2,
% 	M = M2,
% 	D = D2.
% lte(date(Y,M,D),date(Y2,M2,D2)) :-
% 	lt(date(Y,M,D),date(Y2,M2,D2)).
% lte(date(Y,M,D),date(Y2,M2,D2)) :-
% 	eq(date(Y,M,D),date(Y2,M2,D2)).
% gte(date(Y,M,D),date(Y2,M2,D2)) :-
% 	gt(date(Y,M,D),date(Y2,M2,D2)).
% gte(date(Y,M,D),date(Y2,M2,D2)) :-
% 	eq(date(Y,M,D),date(Y2,M2,D2)).
% not_before(date(Y,M,D),date(Y2,M2,D2)) :-
% 	gte(date(Y,M,D),date(Y2,M2,D2)).
% not_after(date(Y,M,D),date(Y2,M2,D2)) :-
% 	lte(date(Y,M,D),date(Y2,M2,D2)).

% What does it mean to add or subtract a month to January 30 or from March 30?
% January 30, plus one month, is February 28 or 29 as appropriate.
% March 30, minus one month, is February 28 or 29 as appropriate.

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)),
	S = 1, % this rule is for adding a duration to a date
	TempDaySum is D1 + D2,
	days_in_month(month(Y1,M1),AvailableDays),
	TempDaySum =< AvailableDays,
	D3T is D1 + D2,
	month_add(month(Y1,M1),duration(S,Y2a,M2a),month(Y3,M3)),
	days_in_month(month(Y3,M3),NewMonthDays),
	NewMonthDays >= D3T,
	D3 is D3T.

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)),
	S = 1, % this rule is for adding a duration to a date
	TempDaySum is D1 + D2,
	days_in_month(month(Y1,M1),AvailableDays),
	TempDaySum =< AvailableDays,
	D3T is D1 + D2,
	month_add(month(Y1,M1),duration(S,Y2a,M2a),month(Y3,M3)),
	days_in_month(month(Y3,M3),NewMonthDays),
	NewMonthDays < D3T,
	D3 is NewMonthDays.

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)),
	S = 1, % still for adding
	TempDaySum is D1 + D2,
	days_in_month(month(Y1,M1),AvailableDays),
	TempDaySum > AvailableDays, % now the sum is higher than will fit in the current month
	Difference is (AvailableDays - D1) + 1, % If I'm going to the next month, I have to add an extra day for the first of the new month.
	NewD is D2 - Difference,
	month_add(month(Y1,M1),duration(S,0,1),month(NewY,NewM)),
	date_add(date(NewY,NewM,1),duration(S,Y2a,M2a,NewD),date(Y3,M3,D3)).

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)), % This does not guarantee anything about the number of days.
	S = -1, % this rule is for subtracting  a duration to a date
	TempDayDiff is D1 - D2,
	TempDayDiff >= 1,
	D3T is D1 - D2,
	month_add(month(Y1,M1),duration(S,Y2a,M2a),month(Y3,M3)),
	days_in_month(month(Y3,M3),NewMonthDays),
	NewMonthDays < D3T,
	D3 is NewMonthDays.

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)), % This does not guarantee anything about the number of days.
	S = -1, % this rule is for subtracting  a duration to a date
	TempDayDiff is D1 - D2,
	TempDayDiff >= 1,
	D3T is D1 - D2,
	month_add(month(Y1,M1),duration(S,Y2a,M2a),month(Y3,M3)),
	days_in_month(month(Y3,M3),NewMonthDays),
	NewMonthDays >= D3T,
	D3 is D3T.

date_add(date(Y1,M1,D1),duration(S,Y2,M2,D2),date(Y3,M3,D3)) :-
	valid_duration(duration(S,Y2,M2,D2)),
	simplify_duration(duration(S,Y2,M2,D2),duration(S,Y2a,M2a,D2)),
	S = -1, % still for subtracting
	TempDaySum is D1 - D2,
	TempDaySum < 1, % now the difference in days goes into the previous month.
	NewD is D2 - D1, % Unlike in addition, this subtracts the entire month, so we don't need to add one.
	month_add(month(Y1,M1),duration(S,0,1),month(NewY,NewM)),
	days_in_month(month(NewY,NewM),AvailableDays),
	date_add(date(NewY,NewM,AvailableDays),duration(S,Y2a,M2a,NewD),date(Y3,M3,D3)).

month_add(month(Y1,M1),duration(S,Y2,M2),month(Y3,M3)) :-
	valid_duration(duration(S,Y2,M2)),
	simplify_duration(duration(S,Y2,M2),duration(S,Y2a,M2a)),
	S = 1,
	add_months_to_month(month(Y1,M1),M2a,month(TempY1,M3)),
	Y3 is Y2a + TempY1.

month_add(month(Y1,M1),duration(S,Y2,M2),month(Y3,M3)) :-
	valid_duration(duration(S,Y2,M2)),
	simplify_duration(duration(S,Y2,M2),duration(S,Y2a,M2a)),
	S = -1,
	subtract_months_from_month(month(Y1,M1),M2a,month(TempY1,M3)),
	Y3 is TempY1 - Y2a.

subtract_months_from_month(month(Y1,M1),M2,month(Y3,M3)):-
	M1 - M2 >= 1,
	Y3 is Y1,
	M3 is M1 - M2.

subtract_months_from_month(month(Y1,M1),M2,month(Y3,M3)) :-
	M1 - M2 < 1,
	Y3 is Y1 - 1,
	M3 is M1 + 12 - M2.

simplify_duration(duration(S,Y,M),duration(S,Y2,M2)) :-
	M < 13,
	Y2 is Y,
	M2 is M.

simplify_duration(duration(S,Y,M),duration(S,Y2,M2)) :-
	M > 12,
	TempY is Y + 1,
	TempM is M - 12,
	simplify_duration(duration(S,TempY,TempM),duration(S,Y2,M2)).

% Note that it is not possible to simplify the days number in a duration,
% because months do not all have the same number of days.
% As such the days element does not affect months. Hours can affect days, though.
simplify_duration(duration(S,Y,M,D),duration(S,Y2,M2,D)) :-
	M < 13,
	Y2 is Y,
	M2 is M.

simplify_duration(duration(S,Y,M,D),duration(S,Y2,M2,D)) :-
	M > 12,
	TempY is Y + 1,
	TempM is M - 12,
	simplify_duration(duration(S,TempY,TempM,D),duration(S,Y2,M2,D)).

simplify_duration(duration(S,Y,M,D,H),duration(S,Y2,M2,D2,H)) :-
	H < 24,
	simplify_duration(duration(S,Y,M,D),duration(S,Y2,M2,D2)).

simplify_duration(duration(S,Y,M,D,H),duration(S,Y2,M2,D2,H2)) :-
	H >= 24,
	TempH is H - 24,
	TempD is D + 1,
	simplify_duration(duration(S,Y,M,TempD,TempH),duration(S,Y2,M2,D2,H2)).

simplify_duration(duration(S,Y,Mo,D,H,Mi),duration(S,Y2,Mo2,D2,H2,Mi)) :-
	Mi < 60,
	simplify_duration(duration(S,Y,Mo,D,H),duration(S,Y2,Mo2,D2,H2)).

simplify_duration(duration(S,Y,Mo,D,H,Mi),duration(S,Y2,Mo2,D2,H2,Mi2)) :-
	Mi >= 60,
	TempMi is Mi - 60,
	TempH is H + 1,
	simplify_duration(duration(S,Y,Mo,D,TempH,TempMi),duration(S,Y2,Mo2,D2,H2,Mi2)).

simplify_duration(duration(S,Y,Mo,D,H,Mi,Se),duration(S,Y2,Mo2,D2,H2,Mi2,Se)) :-
	Se < 60,
	simplify_duration(duration(S,Y,Mo,D,H,Mi),duration(S,Y2,Mo2,D2,H2,Mi2)).

simplify_duration(duration(S,Y,Mo,D,H,Mi,Se),duration(S,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	Se >= 60,
	TempSe is Se - 60,
	TempMi is Mi + 1,
	simplify_duration(duration(S,Y,Mo,D,H,TempMi,TempSe),duration(S,Y2,Mo2,D2,H2,Mi2,Se2)).

valid_duration(duration(S,Y,M)) :-
	S = 1,
	Y >= 0,
	M >= 0.

valid_duration(duration(S,Y,M)) :-
	S = -1,
	Y >= 0,
	M >= 0.

valid_duration(duration(S,Y,M,D)) :-
	S = 1,
	Y >= 0,
	M >= 0,
	D >= 0.

valid_duration(duration(S,Y,M,D)) :-
	S = -1,
	Y >= 0,
	M >= 0,
	D >= 0.

valid_month(month(_,M)) :-
	M > 0,
	M < 13.

valid_date(date(Y,M,D)) :-
	YR is round(Y),
	YR = Y,
	valid_month(month(Y,M)),
	days_in_month(month(Y,M),Max),
	D =< Max.

add_months_to_month(month(Y1,M1),M2,month(Y3,M3)):-
	M1 + M2 < 13,
	M3 is M1 + M2,
	Y3 is Y1.

add_months_to_month(month(Y1,M1),M2,month(Y3,M3)):-
	M1 + M2 > 12,
	M3 is (M1 + M2) - 12,
	Y3 is Y1 + 1.

leapyear(Y) :-
	DivBy4 is mod(Y,4),
	DivBy100 is mod(Y,100),
	DivBy4 = 0,
	DivBy100 > 0.

leapyear(Y) :-
	DivBy4 is mod(Y,4),
	DivBy400 is mod(Y,400),
	DivBy4 = 0,
	DivBy400 = 0.

days_in_month(month(_,1),31).
days_in_month(month(_,3),31).
days_in_month(month(_,4),30).
days_in_month(month(_,5),31).
days_in_month(month(_,6),30).
days_in_month(month(_,7),31).
days_in_month(month(_,8),31).
days_in_month(month(_,9),30).
days_in_month(month(_,10),31).
days_in_month(month(_,11),30).
days_in_month(month(_,12),31).

days_in_month(month(Y,M),Days) :-
	M = 2,
	not leapyear(Y),
	Days = 28.

days_in_month(month(Y,M),Days) :-
	M = 2,
	leapyear(Y),
	Days = 29.

days_in_year(Y,365) :-
	not leapyear(Y).
days_in_year(Y,366) :-
	leapyear(Y).

valid_time(time(X,Y,Z)) :- 
	X >= 0,
	X =< 23,
	Xrnd is round(X),
	X = Xrnd,
	Y >= 0,
	Y =< 59,
	Yrnd is round(Y),
	Y = Yrnd,
	Z >= 0,
	Z < 60.

build_datetime(date(Y,Mo,D),time(H,Mi,S),datetime(Y,Mo,D,H,Mi,S)) :-
	valid_time(time(H,Mi,S)),
	valid_date(date(Y,Mo,D)).

eq(time(H1,M1,S1),time(H1,M1,S1)).

dt_d_t(date(Y,Mo,D),time(H,Mi,S),datetime(Y,Mo,D,H,Mi,S)) :-
	valid_date(date(Y,Mo,D)),
	valid_time(time(H,Mi,S)).

valid_datetime(datetime(Y,Mo,D,H,Mi,S)) :-
	valid_date(date(Y,Mo,D)),
	valid_time(time(H,Mi,S)).

% This is the validity code for duration/7
valid_duration(duration(-1,Y,Mo,D,H,Mi,S)) :- 
	valid_duration(duration(1,Y,Mo,D,H,Mi,S)).

valid_duration(duration(1,Y,Mo,D,H,Mi,S)) :-
	YR is round(Y),
	YR = Y,
	Y >=0,
	MoR is round(Mo),
	MoR = Mo,
	Mo >=0,
	DR is round(D),
	DR = D,
	D >=0,
	HR is round(H),
	HR = H,
	H >=0,
	MiR is round(Mi),
	MiR = Mi,
	Mi >= 0,
	S >= 0.

eq(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S3,Y3,Mo3,D3,H3,Mi3,Se3)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S3,Y3,Mo3,D3,H3,Mi3,Se3)).

% A valid simplified duration may have any number of days.
% One duration will be necessarily greater than another if
% the maximum possible number of days in the second term is lower than the minimum in the first term.
gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S1s,Y1s,Mo1s,D1s,H1s,Mi1s,Se1s)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S2s,Y2s,Mo2s,D2s,H2s,Mi2s,Se2s)),
	NewMo1 is Mo1s + (Y1s * 12),
	NewMo2 is Mo2s + (Y2s * 12),
	NewMo1 \= NewMo2, % If these numbers are the same, we should treat these as equal.
	min_days_months_with_leap(NewMo1,MinDays1),
	max_days_months_with_leap(NewMo2,MaxDays2),
	TotalDays1 is MinDays1 + D1s,
	TotalDays2 is MaxDays2 + D2s,
	TotalDays1 > TotalDays2.

% If there is no answer from the days, we will consider the hours if the days can be considered
% precisely equal, which will only be true if the maximums and minimums are the same.
% This is too strict, because it won't even be true if the year nd month values are identical.
gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S1s,Y1s,Mo1s,D1s,H1s,Mi1s,Se1s)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S2s,Y2s,Mo2s,D2s,H2s,Mi2s,Se2s)),
	NewMo1 is Mo1s + (Y1s * 12),
	NewMo2 is Mo2s + (Y2s * 12),
	NewMo1 = NewMo2,
	D1s > D2s.

gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S1s,Y1s,Mo1s,D1s,H1s,Mi1s,Se1s)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S2s,Y2s,Mo2s,D2s,H2s,Mi2s,Se2s)),
	NewMo1 is Mo1s + (Y1s * 12),
	NewMo2 is Mo2s + (Y2s * 12),
	NewMo1 = NewMo2,
	D1s = D2s,
	H1s > H2s.

gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S1s,Y1s,Mo1s,D1s,H1s,Mi1s,Se1s)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S2s,Y2s,Mo2s,D2s,H2s,Mi2s,Se2s)),
	NewMo1 is Mo1s + (Y1s * 12),
	NewMo2 is Mo2s + (Y2s * 12),
	NewMo1 = NewMo2,
	D1s = D2s,
	H1s = H2s,
	Mi1s > Mi2s.

gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	simplify_duration(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S1s,Y1s,Mo1s,D1s,H1s,Mi1s,Se1s)),
	simplify_duration(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S2s,Y2s,Mo2s,D2s,H2s,Mi2s,Se2s)),
	NewMo1 is Mo1s + (Y1s * 12),
	NewMo2 is Mo2s + (Y2s * 12),
	NewMo1 = NewMo2,
	D1s = D2s,
	H1s = H2s,
	Mi1s = Mi2s,
	Se1s > Se2s.

% One duration is less than another if the other is greater than the first.
lt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	gt(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S1,Y1,Mo1,D1,H1,Mi1,Se1)).

lte(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	gt(duration(S2,Y2,Mo2,D2,H2,Mi2,Se2),duration(S1,Y1,Mo1,D1,H1,Mi1,Se1)).

lte(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	eq(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)).

gte(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	gt(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)).

gte(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)) :-
	eq(duration(S1,Y1,Mo1,D1,H1,Mi1,Se1),duration(S2,Y2,Mo2,D2,H2,Mi2,Se2)).

date_is_datetime(date(Y,Mo,D),datetime(Y,Mo,D,0,0,0)) :-
	valid_date(date(Y,Mo,D)).

% This predicate gives the maximum number of days, not counting leap year days,
% in a given number of months. (Starting in July)
max_days_months_no_leap(0,0).
max_days_months_no_leap(1,31).
max_days_months_no_leap(2,62).
max_days_months_no_leap(3,92).
max_days_months_no_leap(4,123).
max_days_months_no_leap(5,153).
max_days_months_no_leap(6,184).
max_days_months_no_leap(7,215).
max_days_months_no_leap(8,244).
max_days_months_no_leap(9,275).
max_days_months_no_leap(10,305).
max_days_months_no_leap(11,336).

max_days_months_with_leap(0,0).

% The maximum number of days for a given number of months is whole years * 365 plus one day for the first 8 months, for a leap day,
% plus one more day for every four full years after that.
max_days_months_with_leap(Months,MaxDays) :-
	EightMonths is Months // 8,
	nonzero(EightMonths,FirstLeap), % IF there are at least 8 months, add a leap day.
	MonthsLess8 is Months - (8*FirstLeap), % If there was a first leap, subtract 8 from the number of months.
	NextLeaps is MonthsLess8 // 48, % there will be one additional leap day for each subsequent 4 year stretch.
	FullYears is Months // 12,
	MonthsRemaining is mod(Months,12),
	max_days_months_no_leap(MonthsRemaining,MaximumRemainingDays),
	Leaps is FirstLeap + NextLeaps,
	MaxDays is (FullYears * 365) + Leaps + MaximumRemainingDays.

min_days_months_no_leap(0,0).
min_days_months_no_leap(1,28).
min_days_months_no_leap(2,59).
min_days_months_no_leap(3,89).
min_days_months_no_leap(4,120).
min_days_months_no_leap(5,150).
min_days_months_no_leap(6,181).
min_days_months_no_leap(7,212).
min_days_months_no_leap(8,242).
min_days_months_no_leap(9,273).
min_days_months_no_leap(10,303).
min_days_months_no_leap(11,334).

min_days_months_with_leap(0,0).

% The minimum theoretical number of days is 365 for the first 7 years, then a leap day every 4 years
min_days_months_with_leap(Months,MinDays) :-
	FullYears is Months // 12,
	Full7Years is FullYears // 7,
	nonzero(Full7Years,FirstSeven), % If we have entered year 8, FirstLeap is 1.
	MonthsLess7Years is Months - (7*12*FirstSeven), % will subtract nothing if we didn't get to year 8.
	nonzero(MonthsLess7Years,AtLeastOneMore),
	MonthsLess7YearsLess1Month is MonthsLess7Years - 1 * AtLeastOneMore,
	NextLeaps is (MonthsLess7YearsLess1Month // 48) * (FirstSeven * AtLeastOneMore), % there will be one additional leap day for each subsequent 4 year stretch.
	MonthsRemaining is mod(Months,12),
	min_days_months_no_leap(MonthsRemaining,MinimumRemainingDays),
	Leaps is (AtLeastOneMore * FirstSeven) + NextLeaps,
	MinDays is (FullYears * 365) + Leaps + MinimumRemainingDays.

nonzero(0,0).
nonzero(X,1) :-
	X > 0.

%% New Comparitors for Datetimes
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 #> Y2.
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 = Y2,
	Mo1 #> Mo2.
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 = Y2,
	Mo1 = Mo2,
	D1 #> D2.
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 = Y2,
	Mo1 = Mo2,
	D1 = D2,
	H1 #> H2.
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 = Y2,
	Mo1 = Mo2,
	D1 = D2,
	H1 = H2,
	Mi1 #> Mi2.
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	Y1 = Y2,
	Mo1 = Mo2,
	D1 = D2,
	H1 = H2,
	Mi1 = Mi2,
	S1 #> S2.

eq(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y1,Mo1,D1,H1,Mi1,S1)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)).

lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	gt(datetime(Y2,Mo2,D2,H2,Mi2,S2),datetime(Y1,Mo1,D1,H1,Mi1,S1)).

gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y1,Mo1,D1,H1,Mi1,S1)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)).

lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y1,Mo1,D1,H1,Mi1,S1)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)).

%% Now we want people to be able to compare dates and datetimes to one another.
%% So we need date/date datetime/date, and date/datetime versions

%% date/date versions
gt(date(Y1,Mo1,D1),date(Y2,Mo2,D2)) :-
	gt(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,0,0,0)).

lt(date(Y1,Mo1,D1),date(Y2,Mo2,D2)) :-
	lt(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,0,0,0)).

eq(date(Y1,Mo1,D1),date(Y1,Mo1,D1)) :-
	eq(datetime(Y1,Mo1,D1,0,0,0),datetime(Y1,Mo1,D1,0,0,0)).

gte(date(Y1,Mo1,D1),date(Y2,Mo2,D2)) :-
	gte(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,0,0,0)).

lte(date(Y1,Mo1,D1),date(Y2,Mo2,D2)) :-
	lte(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,0,0,0)).

%% date/datetime versions
gt(date(Y1,Mo1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	gt(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

lt(date(Y1,Mo1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	lt(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

eq(date(Y1,Mo1,D1),datetime(Y1,Mo1,D1,H1,Mi1,S1)) :-
	eq(datetime(Y1,Mo1,D1,0,0,0),datetime(Y1,Mo1,D1,H1,Mi1,S1)).

gte(date(Y1,Mo1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	gte(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

lte(date(Y1,Mo1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :-
	lte(datetime(Y1,Mo1,D1,0,0,0),datetime(Y2,Mo2,D2,H2,Mi2,S2)).

%% datetime/date versions
gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,Mo2,D2)) :-
	gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,0,0,0)).

lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,Mo2,D2)) :-
	lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,0,0,0)).

eq(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y1,Mo1,D1)) :-
	eq(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y1,Mo1,D1,0,0,0)).

gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,Mo2,D2)) :-
	gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,0,0,0)).

lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,Mo2,D2)) :-
	lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,0,0,0)).

%% Add before, not before, after, and not after as synonyms, for dates and datetimes

before(date(Y1,M1,D1),date(Y2,M2,D2)) :- lt(date(Y1,M1,D1),date(Y2,M2,D2)).
not_before(date(Y1,M1,D1),date(Y2,M2,D2)) :- gte(date(Y1,M1,D1),date(Y2,M2,D2)).
after(date(Y1,M1,D1),date(Y2,M2,D2)) :- gt(date(Y1,M1,D1),date(Y2,M2,D2)).
not_after(date(Y1,M1,D1),date(Y2,M2,D2)) :- lte(date(Y1,M1,D1),date(Y2,M2,D2)).


before(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- lt(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
not_before(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- gte(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
after(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- gt(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
not_after(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- lte(date(Y1,M1,D1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).


before(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)) :- lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)).
not_before(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)) :- gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)).
after(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)) :- gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)).
not_after(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)) :- lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),date(Y2,M2,D2)).


before(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- lt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
not_before(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- gte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
after(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- gt(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).
not_after(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)) :- lte(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)).


%% DateTime Add
datetime_add(datetime(Y1,Mo1,D1,H1,Mi1,Se1),duration(Sign,Y2,Mo2,D2,H2,Mi2,Se2),datetime(Y3,Mo3,D3,H3,Mi3,Se3)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,Se1)),
	valid_duration(duration(Sign,Y2,Mo2,D2,H2,Mi2,Se2)),
	simplify_duration(duration(Sign,Y2,Mo2,D2,H2,Mi2,Se2),duration(Sign,Y2a,Mo2a,D2a,H2a,Mi2a,Se2a)),
	% Using Seconds as an example
	% Mutliply the number of seconds in Se2a by the sign, and add the result to Se1
	% If we are trying to subtract 30.5 seconds from 15 seconds, TempSe is -30 + 15 = -15.5
	TempSe is (Se2a * Sign) + Se1,
	% The number of extra minutes to add or subtract in the minutes calculation
	% ExtraMinutes is -1
	ExtraMinutes is floor(TempSe/60),
	% The seconds left after you remove the ExtraMinutes
	% Here, extra minutes is -1, left over should be 44.5, which is 60 + TempSe
	Se3 is (ExtraMinutes* -60) + TempSe,
	% Now do minutes
	TempMi is (Mi2 * Sign) + ExtraMinutes + Mi1,
	ExtraHours is floor(TempMi/60),
	Mi3 is (ExtraHours* -60) + TempMi,
	% Now do hours
	TempH is (H2 * Sign) + ExtraHours + H1,
	ExtraDays is floor(TempH/24),
	H3 is (ExtraDays* -24) + TempH,
	% Now do Days
	NewD2 is D2 + abs(ExtraDays), % The sign of extradays is already in Sign, Duration values are absolute.
	date_add(date(Y1,Mo1,D1),duration(Sign,Y2,Mo2,NewD2),date(Y3,Mo3,D3)).

%% Now I need synonyms for datetime_add using date. All durations will have time, so only a datetime is
%% A valid response, the user can convert it back to a date if they like.

datetime_add(date(Y1,Mo1,D1),duration(Sign,Y2,Mo2,D2,H2,Mi2,Se2),datetime(Y3,Mo3,D3,H3,Mi3,Se3)) :-
	datetime_add(datetime(Y1,Mo1,D1,0,0,0),duration(Sign,Y2,Mo2,D2,H2,Mi2,Se2),datetime(Y3,Mo3,D3,H3,Mi3,Se3)).

%datetime_diff_duration - accepts two datetimes and returns a duration between them.
datetime_diff_duration(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),duration(-1,Y3,Mo3,D3,H3,Mi3,S3)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	before(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	datetime_diff_duration(datetime(Y2,Mo2,D2,H2,Mi2,S2),datetime(Y1,Mo1,D1,H1,Mi1,S1),duration(1,Y3,Mo3,D3,H3,Mi3,S3)).


datetime_diff_duration(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),duration(1,Y3,Mo3,D3,H3,Mi3,S3)) :-
	valid_datetime(datetime(Y1,Mo1,D1,H1,Mi1,S1)),
	valid_datetime(datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	% I think if at this point we insist that they are in the right order, it simplifies things.
	not_before(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2)),
	datetime_diff_duration_year(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),Y3),
	NewY is (Y1-Y3),
	datetime_diff_duration_month(datetime(NewY,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),Mo3),
	NewMo is mod((Mo1+12-Mo3),12), % subtracts months, returning a number between 1 and 12, still.
	% Either the years are already the same, or Y1 was one larger than Y2 because of the difference
	% in months. At this point, Y1 should be equal to Y2.
	NewY2 is Y2,
	datetime_diff_duration_day(datetime(NewY2,NewMo,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),D3,MonthDiff,DaysInPriorMonth),
	NewD is D1 - D3 + (DaysInPriorMonth * MonthDiff), % subtracts days, counting into the prior month if necessary.
	% Either the months are already the same, or Mo1 was larger because of the difference in days.
	% Either way, Mo1 and Mo2 should now be the same.
	NewMo2 is Mo2,
	datetime_diff_duration_hour(datetime(NewY2,NewMo2,NewD,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),H3),
	NewH is mod((H1+24-H3),24),
	NewD2 is D2,
	datetime_diff_duration_minute(datetime(NewY2,NewMo2,NewD2,NewH,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),Mi3),
	NewMi is mod((Mi1+60-Mi3),60),
	NewH2 is H2,
	datetime_diff_duration_second(datetime(NewY2,NewMo2,NewD2,NewH2,NewMi,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),S3).

:- begin_tests(datetime_diff_duration).

test("Invalid date in first term fails",[fail]) :-
	scasp(datetime_diff_duration(datetime(a,b,c,d,e,f),datetime(2000,1,1,1,1,1),X),[]).

test("Invalid date in second term fails",[fail]) :-
	scasp(datetime_diff_duration(datetime(2000,1,1,1,1,1),datetime(a,b,c,d,e,f),X),[]).

test("Duration between the same date twice is zero",[true(X=duration(1,0,0,0,0,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2000,1,1,1,1,1),datetime(2000,1,1,1,1,1),X),[]).

test("Duration between midnight and noon on the same day is 12 hours.",[true(X=duration(1,0,0,0,12,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2000,1,1,12,0,0),datetime(2000,1,1,0,0,0),X),[]).

test("Duration between noon and midnight on the same day is -12 hours.",[true(X=duration(-1,0,0,0,12,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2000,1,1,0,0,0),datetime(2000,1,1,12,0,0),X),[]).

test("Duration between Feb 28 and March 1 is 1 day in non-leap year",[true(X=duration(1,0,0,1,0,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2001,3,1,0,0,0),datetime(2001,2,28,0,0,0),X),[]).

test("Duration between Feb 28 and March 1 is 2 days in leap year",[true(X=duration(1,0,0,2,0,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2000,3,1,0,0,0),datetime(2000,2,28,0,0,0),X),[]).

test("Duration from one year to the next is 1 year",[true(X=duration(1,1,0,0,0,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2001,1,1,0,0,0),datetime(2000,1,1,0,0,0),X),[]).

test("Duration from previous year to subsequent year is negative one year",[true(X=duration(-1,1,0,0,0,0,0)),nondet]) :-
	scasp(datetime_diff_duration(datetime(2000,1,1,0,0,0),datetime(2001,1,1,0,0,0),X),[]).
	
	

:- end_tests(datetime_diff_duration).

%% Calculate difference in years
% There are some edge cases around leap days, but basically,
% take the difference in actual year values, and subtract one if the second date is earlier in the year by
% comparing the dates as if they were both in a year with a leap day, like 2004.

% Y1 is always equal to or larger than Y2.
% The difference is the difference in year values, less one if the 

datetime_diff_duration_year(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),YearDiff) :-
	not_after(datetime(2004,Mo2,D2,H2,Mi2,S2),datetime(2004,Mo1,D1,H1,Mi1,S1)),
	YearDiff is Y1-Y2.

datetime_diff_duration_year(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),YearDiff) :-
	after(datetime(2004,Mo2,D2,H2,Mi2,S2),datetime(2004,Mo1,D1,H1,Mi1,S1)),
	YearDiff is (Y1-Y2)-1.

:- begin_tests(datetime_diff_duration_year).

test("There is no year difference between the same date",[true(X=0),nondet]) :-
	scasp(datetime_diff_duration_year(datetime(2000,1,1,1,1,1),datetime(2000,1,1,1,1,1),X),[]).

test("There is no year difference dates in the same year",[true(X=0),nondet]) :-
	scasp(datetime_diff_duration_year(datetime(2000,2,1,1,1,1),datetime(2000,1,1,1,1,1),X),[]).

test("There is no year difference dates in the subsequent years, less than 12 months apart",[true(X=0),nondet]) :-
	scasp(datetime_diff_duration_year(datetime(2001,2,1,1,1,1),datetime(2000,6,1,1,1,1),X),[]).

test("There are 6 years difference between Feb 1 2001 and June 1 2007",[true(X=6),nondet]) :-
	scasp(datetime_diff_duration_year(datetime(2007,6,1,1,1,1),datetime(2001,6,1,1,1,1),X),[]).

:- end_tests(datetime_diff_duration_year).

datetime_diff_duration_month(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),MonthDiff) :-
	% Y1 and Y2 are either identical, or Y1 is one larger.
	YearDiff is Y1-Y2, % If Y1 is the following year, add 12 to Mo1.
	NewMo1 is Mo1 + (YearDiff * 12),
	% Remove one if D2 > D1, and D1 is not the last day of the month
	last_day_of(month(Y1,Mo1),date(Y1,Mo1,LastDayOfMo1)),
	DaysFromD1ToLastDay is LastDayOfMo1-D1, % If this is the last day, DaysFrom will be zero.
	DifferenceInDays is D2 - D1, % If D2 is bigger, this will be greater than zero.
	%Because the date difference can never be larger than 30, adding it to 39 will return 1 if they are not zero.
	MonthsToSubtract is ((39+DifferenceInDays)//40)*((39+DaysFromD1ToLastDay)//40),
	MonthDiff is NewMo1-Mo2-MonthsToSubtract.

:- begin_tests(datetime_diff_duration_month).

test("If no year difference, the month difference between June and January is 5",[true(X=5),nondet]) :-
	scasp(datetime_diff_duration_month(datetime(2000,6,1,1,1,1),datetime(2000,1,1,1,1,1),X),[]).

test("If there is a year difference, the month difference btween January and December is 1",[true(X=1),nondet]) :-
	scasp(datetime_diff_duration_month(datetime(2001,1,1,1,1,1),datetime(2000,12,1,1,1,1),X),[]).

test("If there is a one-month difference, but the second day is larger, the month difference is 0",[true(X=0),nondet]) :-
	scasp(datetime_diff_duration_month(datetime(2000,3,1,0,0,0),datetime(2000,2,28,0,0,0),X),[]).

test("If there is a one-month difference, and the second day is smaller, the month difference in 1",[true(X=1),nondet]) :-
	scasp(datetime_diff_duration_month(datetime(2000,3,30,0,0,0),datetime(2000,2,28,0,0,0),X),[]).

:- end_tests(datetime_diff_duration_month).

datetime_diff_duration_day(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),DayDiff,MonthDiff,DaysInPriorMonth) :-
	%Mo1 will either be equal to Mo2, or Mo1 will be 1 larger.
	MonthDiff is mod((Mo1+12-Mo2),12), % If the months are different, Mo1 is bigger, MonthDiff is 1.N 
	PriorMonth is Mo1 + ((13-Mo1)//12)*12 - 1, %Get the prior month number, from 1-12
	PriorYear is Y1 - (MonthDiff * (PriorMonth // 12)),% Subtract one from the year if the months are different, and the prior month is 12.
	days_in_month(month(PriorYear,PriorMonth),DaysInPriorMonth),
	% If the first date is in the later month, add the number of days in the previous month to D1.
	NewD1 is D1 + (DaysInPriorMonth * MonthDiff),
	% Then take the difference.
	DayDiff is NewD1 - D2.

:- begin_tests(datetime_diff_duration_day).

test("Difference between 18 and 10 in same month is 8",[true(X=8),nondet]) :-
	scasp(datetime_diff_duration_day(datetime(2000,1,18,1,1,1),datetime(2000,1,10,1,1,1),X,_,_),[]).

test("Difference between March 1 and February 28 in 2004 is 2",[true(X=2),nondet]) :-
	scasp(datetime_diff_duration_day(datetime(2004,3,1,1,1,1),datetime(2004,2,28,1,1,1),X,_,_),[]).

:- end_tests(datetime_diff_duration_day).

datetime_diff_duration_hour(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),HourDiff) :-
	% At this point, either the days are identical, or D1 is one larger than D2.
	DayDiff is D1-D2,
	NewH1 is H1 + (24*DayDiff), %If D1 is on an earlier day, add 24 hours to H1
	HourDiff is NewH1 - H2. %Calculate the difference in hours.

:- begin_tests(datetime_diff_duration_hour).

test("Difference in hours between noon and 10am on the same day is 2",[true(X=2),nondet]) :-
	scasp(datetime_diff_duration_hour(datetime(2000,1,1,12,0,0),datetime(2000,1,1,10,0,0),X),[]).

test("Difference in hours between 2am and 10pm the previous day is 4",[true(X=4),nondet]) :-
	scasp(datetime_diff_duration_hour(datetime(2000,1,2,2,0,0),datetime(2000,1,1,22,0,0),X),[]).

:- end_tests(datetime_diff_duration_hour).

datetime_diff_duration_minute(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),MinDiff) :-
	HourDiff is H1-H2,
	NewMi1 is Mi1 + (60*HourDiff),
	MinDiff is NewMi1 - Mi2.

:- begin_tests(datetime_diff_duration_minute).

test("Difference between 45 minutes and 30 minutes in the same hour is 15",[true(X=15),nondet]) :-
	scasp(datetime_diff_duration_minute(datetime(2000,1,1,1,45,0),datetime(2000,1,1,1,30,0),X),[]).

test("Difference between 15 minutes and 45 minutes in the previous hour is 30",[true(X=30),nondet]) :-
	scasp(datetime_diff_duration_minute(datetime(2000,1,1,1,15,0),datetime(2000,1,1,0,45,0),X),[]).

:- end_tests(datetime_diff_duration_minute).

datetime_diff_duration_second(datetime(Y1,Mo1,D1,H1,Mi1,S1),datetime(Y2,Mo2,D2,H2,Mi2,S2),SecDiff) :-
	MinDiff is Mi1-Mi2,
	NewSe1 is S1 + (60*MinDiff),
	SecDiff is NewSe1 - S2.

:- begin_tests(datetime_diff_duration_second).

test("Difference between 45 seconds and 30 seconds in the same minute is 15",[true(X=15),nondet]) :-
	scasp(datetime_diff_duration_second(datetime(2000,1,1,1,1,45),datetime(2000,1,1,1,1,30),X),[]).

test("Difference between 15 seconds and 45 seconds in the previous minute is 30",[true(X=30),nondet]) :-
	scasp(datetime_diff_duration_second(datetime(2000,1,1,1,1,15),datetime(2000,1,1,1,0,45),X),[]).

test("Decimal values in seconds are maintained in the difference",[true(X=1.5),nondet]) :-
	scasp(datetime_diff_duration_second(datetime(2000,1,1,1,1,3.5),datetime(2000,1,1,1,1,2),X),[]).

:- end_tests(datetime_diff_duration_second).

:- begin_tests(dates).

test("add one day to january 1, 2020",[true(X=date(2020,1,2)),nondet]) :-
    scasp(date_add(date(2020,1,1),duration(1,0,0,1),X),[]).

:- end_tests(dates).

:- begin_tests(valid_times).

test("1:23:45 is a valid time",[nondet]) :-
	scasp(valid_time(time(1,23,45)),[]).

test("negative hours are invalid",[fail,nondet]) :-
	scasp(valid_time(time(-1,23,45)),[]).

test("0 hour is valid",[nondet]) :-
	scasp(valid_time(time(0,23,45)),[]).

test("24 hour is invalid",[fail,nondet]) :-
	scasp(valid_time(time(24,23,45)),[]).

test("decimal hours are invalid",[fail,nondet]) :-
	scasp(valid_time(time(2.4,23,45)),[]).

test("0 minute is valid",[nondet]) :-
	scasp(valid_time(time(1,0,45)),[]).

test("negative minute is invalid",[fail,nondet]) :-
	scasp(valid_time(time(1,-23,45)),[]).

test("60 minute is invalid",[fail,nondet]) :-
	scasp(valid_time(time(1,60,45)),[]).

test("decimal minute is invalid",[fail,nondet]) :-
	scasp(valid_time(time(1,23.4,45)),[]).

test("0 second is valid",[nondet]) :-
	scasp(valid_time(time(1,23,0)),[]).

test("negative second is invalid",[fail,nondet]) :-
	scasp(valid_time(time(1,23,-1)),[]).

test("60 second is invalid",[fail,nondet]) :-
	scasp(valid_time(time(1,23,60)),[]).

test("decimal second is valid",[nondet]) :-
	scasp(valid_time(time(1,23,56.345)),[]).

:- end_tests(valid_times).

:- begin_tests(time_comparison).

test("same times are equal",[nondet]) :-
	scasp(eq(time(1,2,3),time(1,2,3)),[]).

test("different times are not equal",[fail,nondet]) :-
	scasp(eq(time(1,2,3),time(2,3,4)),[]).

:- end_tests(time_comparison).

:- begin_tests(valid_dates).

test("negative years are valid",[nondet]) :-
	scasp(valid_date(date(-1,1,1)),[]).

test("zero year is valid",[nondet]) :-
	scasp(valid_date(date(0,1,1)),[]).

test("positive years are valid",[nondet]) :-
	scasp(valid_date(date(1,1,1)),[]).

test("february 3, 1 is a valid date",[nondet]) :-
	scasp(valid_date(date(1,2,3)),[]).

test("decimal years are invalid",[fail,nondet]) :-
	scasp(valid_date(date(1.3,1,1)),[]).

test("negative months are invalid",[fail,nondet]) :-
	scasp(valid_date(date(1,-1,1)),[]).

test("zero months are invalid",[fail,nondet]) :-
	scasp(valid_date(date(1,0,1)),[]).

test("decimal months are invalid",[fail,nondet]) :-
	scasp(valid_date(date(1,1.3,1)),[]).

test("months over 12 are invalid",[fail,nondet]) :-
	scasp(valid_date(date(2000,13,1)),[]).

test("february 29 is invalid in a non-leapyear",[fail,nondet]) :-
	scasp(valid_date(date(1999,2,29)),[]).

test("february 29 is valid in a leapyear",[nondet]) :-
	scasp(valid_date(date(2004,2,29)),[]).

test("february 30 is invalid",[fail,nondet]) :-
	scasp(valid_date(date(2004,2,30)),[]).

:- end_tests(valid_dates).

:- begin_tests(valid_datetimes).

test("valid date and valid time make valid datetime",[nondet]) :-
	scasp(
		(
			valid_date(date(2004,2,3)),
			valid_time(time(10,11,12)),
			valid_datetime(datetime(2004,2,3,10,11,12))	
		),[]).

:- end_tests(valid_datetimes).

:- begin_tests(leapyear).

test("2004 is a leapyear (divide by 4)",[nondet]) :-
	scasp(leapyear(2004),[]).

test("2003 is not a leapyear",[fail,nondet]) :-
	scasp(leapyear(2003),[]).

test("2000 is a leapyear (divide by 400)",[nondet]) :-
	scasp(leapyear(2000),[]).

test("2100 is not a leapyear (divide by 100)",[fail,nondet]) :-
	scasp(leapyear(2100),[]).

test("leapyears have 366 days",[nondet]) :-
	scasp((leapyear(2000),days_in_year(2000,366)),[]).

test("non leapyears have 365 days",[nondet]) :-
	scasp(days_in_year(1999,365),[]).

:- end_tests(leapyear).

:- begin_tests(dates_and_times).

test("date and time gives datetime",[true(X = datetime(2004,2,3,4,5,6)),nondet]) :-
	scasp(dt_d_t(date(2004,2,3),time(4,5,6),X),[]).

test("date and datetime gives time",[true(X = time(4,5,6)),nondet]) :-
	scasp(dt_d_t(date(2004,2,3),X,datetime(2004,2,3,4,5,6)),[]).

test("datetime and time gives date",[true(X = date(2004,2,3)),nondet]) :-
	scasp(dt_d_t(X,time(4,5,6),datetime(2004,2,3,4,5,6)),[]).

:- end_tests(dates_and_times).

:- begin_tests(convert_date_datetime).

test("Feb 3, 2000 as datetime is 00:00:00",[true(X=datetime(2000,2,3,0,0,0)),nondet]) :-
	scasp(date_is_datetime(date(2000,2,3),X),[]).

test("0:0:0 on Feb 3, 2000 is Feb 3, 2000",[true(X=date(2000,2,3)),nondet]) :-
	scasp(date_is_datetime(X,datetime(2000,2,3,0,0,0)),[]).

test("0:0:1 on Feb 3, 2000 is not a date",[fail,nondet]) :-
	scasp(date_is_datetime(X,datetime(2000,2,3,0,0,1)),[]).

:- end_tests(convert_date_datetime).

:- begin_tests(valid_durations).

test("sign 1 is valid",[nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,0,0,0)),[]).

test("sign -1 is valid",[nondet]) :-
	scasp(valid_duration(duration(-1,0,0,0,0,0,0)),[]).

test("sign 0 is invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(0,0,0,0,0,0,0)),[]).

test("negative years invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,-1,0,0,0,0,0)),[]).

test("negative months invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,-1,0,0,0,0)),[]).

test("negative days invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,-1,0,0,0)),[]).

test("negative hours invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,-1,0,0)),[]).

test("negative minutes invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,0,-1,0)),[]).

test("negative seconds invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,0,0,-1)),[]).

test("decimal years invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,1.2,0,0,0,0,0)),[]).

test("decimal months invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,1.3,0,0,0,0)),[]).

test("decimal days invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,1.4,0,0,0)),[]).

test("decimal hours invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,1.4,0,0)),[]).

test("decimal minutes invalid",[fail,nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,0,1.4,0)),[]).

test("decimal seconds valid",[nondet]) :-
	scasp(valid_duration(duration(1,0,0,0,0,0,1.56)),[]).

:- end_tests(valid_durations).

:- begin_tests(simplify_durations).

test("13 months is 1 year and 1 month",[true(X=duration(1,1,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,13),X),[]).

test("25 months is 2 years and 1 month",[true(X=duration(1,2,1)),nondet]) :- 
	scasp(simplify_duration(duration(1,0,25),X),[]).

test("75 days is not simplifed",[true(X=duration(1,0,0,75)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,75),X),[]).

test("25 hours is 1 day and 1 hour",[true(X=duration(1,0,0,1,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,25),X),[]).

test("49 hours is 2 days and 1 hour",[true(X=duration(1,0,0,2,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,49),X),[]).

test("61 minutes is 1 hour and 1 minute",[true(X=duration(1,0,0,0,1,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,0,61),X),[]).

test("121 minutes is 2 hours and 1 minute",[true(X=duration(1,0,0,0,2,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,0,121),X),[]).

test("61 seconds is 1 minute and 1 second",[true(X=duration(1,0,0,0,0,1,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,0,0,61),X),[]).

test("121 secionds is 2 minutes and 1 second",[true(X=duration(1,0,0,0,0,2,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,0,0,121),X),[]).

test("3601 seconds is 1 hour and 1 second",[true(X=duration(1,0,0,0,1,0,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,0,0,0,0,3601),X),[]).

test("13 months, 90061 seconds is 1 year, 1 month, 1 day, 1 hour, and 1 second.",[true(X=duration(1,1,1,1,1,1,1)),nondet]) :-
	scasp(simplify_duration(duration(1,0,13,0,0,0,90061),X),[]).

:- end_tests(simplify_durations).

:- begin_tests(max_days_months_with_leap).

test("one month is at most 31 days",[true(X = 31),nondet]) :-
	scasp(max_days_months_with_leap(1,X),[]).

test("12 months is 366",[true(X = 366),nondet]) :-
	scasp(max_days_months_with_leap(12,X),[]).

test("two years should be 366+365",[true(X = 731)],nondet) :-
	scasp(max_days_months_with_leap(24,X),[]).

test("max with and without leap should be the same for less than 8 months",[nondet]) :-
	max_days_months_with_leap(7,X),
	max_days_months_no_leap(7,X).

test("Max with should be one higher for 8 months",[nondet]) :-
	max_days_months_with_leap(8,X),
	max_days_months_no_leap(8,Y),
	X is Y + 1.

test("20 months should be 366+244=610",[true(X = 610),nondet]) :-
	scasp(max_days_months_with_leap(20,X),[]).

test("19 months should be 366+215 = 581",[true(X = 581),nondet]) :-
	scasp(max_days_months_with_leap(19,X),[]).

test("18 months should be 366+184 = 550",[true(X = 550),nondet]) :-
	scasp(max_days_months_with_leap(18,X),[]).

test("13 months should be 366+31 = 397",[true(X = 397),nondet]) :-
	scasp(max_days_months_with_leap(13,X),[]).

test("14 months should be 366+62 = 428",[true(X = 428),nondet]) :-
	scasp(max_days_months_with_leap(14,X),[]).

test("16 months should be 366+123 = 489",[true(X = 489),nondet]) :-
	scasp(max_days_months_with_leap(16,X),[]).

test("15 months should be 366+92 = 458",[true(X = 458),nondet]) :-
	scasp(max_days_months_with_leap(15,X),[]).

:- end_tests(max_days_months_with_leap).

:- begin_tests(min_days_months_with_leap).

% The first 7 years should all by 365 days long
test("Year 1 is 365",[true(X = 365),nondet]) :-
	scasp(min_days_months_with_leap(12,X),[]).

test("Year 2 is 365*2",[true(X = 730),nondet]) :-
	scasp(min_days_months_with_leap(24,X),[]).

test("Year 3 is 365*3",[true(X = 1095),nondet]) :-
	scasp(min_days_months_with_leap(36,X),[]).

test("Year 4 is 365*4",[true(X = 1460),nondet]) :-
	scasp(min_days_months_with_leap(48,X),[]).

test("Year 5 is 365*5",[true(X = 1825),nondet]) :-
	scasp(min_days_months_with_leap(60,X),[]).

test("Year 6 is 365*6",[true(X = 2190),nondet]) :-
	scasp(min_days_months_with_leap(72,X),[]).

test("Year 7 is 365*7",[true(X = 2555),nondet]) :-
	scasp(min_days_months_with_leap(84,X),[]).

test("Year 7 + 1 month is 365*7+29",[true(X = 2584),nondet]) :-
	scasp(min_days_months_with_leap(85,X),[]).

test("Year 8 is 265*7+366",[true(X = 2921),nondet]) :-
	scasp(min_days_months_with_leap(96,X),[]).

:- end_tests(min_days_months_with_leap).

:- begin_tests(duration_comparitors).

test("32 days is greater than one month",[nondet]) :-
	scasp(gt(duration(1,0,0,32,0,0,0),duration(1,0,1,0,0,0,0)),[]).

test("60 is not greater than 2 months",[fail,nondet]) :-
	scasp(gt(duration(1,0,0,60,0,0,0),duration(1,0,2,0,0,0,0)),[]).

test("2 months is not greater than 60 days",[fail,nondet]) :-
	scasp(gt(duration(1,0,2,0,0,0,0),duration(1,0,0,60,0,0,0)),[]).

test("63 days is greater than 2 months",[nondet]) :-
	scasp(gt(duration(1,0,0,63,0,0,0),duration(1,0,2,0,0,0,0)),[]).

test("even years and months are decided by days",[nondet]) :-
	scasp(gt(duration(1,1,1,3,0,0,0),duration(1,1,1,2,0,0,0)),[]).

test("even years and months will fail on days",[fail,nondet]) :-
	scasp(gt(duration(1,1,1,2,0,0,0),duration(1,1,1,3,0,0,0)),[]).

test("32 days is not less than one month",[fail,nondet]) :-
	scasp(lt(duration(1,0,0,32,0,0,0),duration(1,0,1,0,0,0,0)),[]).

test("60 is not less than 2 months",[fail,nondet]) :-
	scasp(lt(duration(1,0,0,60,0,0,0),duration(1,0,2,0,0,0,0)),[]).

test("2 months is not less than 60 days",[fail,nondet]) :-
	scasp(lt(duration(1,0,2,0,0,0,0),duration(1,0,0,60,0,0,0)),[]).

test("63 days is not less than than 2 months",[fail,nondet]) :-
	scasp(lt(duration(1,0,0,63,0,0,0),duration(1,0,2,0,0,0,0)),[]).

test("27 days is less than one month",[nondet]) :-
	scasp(lt(duration(1,0,0,27,0,0,0),duration(1,0,1,0,0,0,0)),[]).

test("24 hours is equal to one day",[nondet]) :-
	scasp(eq(duration(1,0,0,0,24,0,0),duration(1,0,0,1,0,0,0)),[]).

test("90061 seconds is equal to one day, one hour, one minute, one second",[nondet]) :-
	scasp(eq(duration(1,0,0,0,0,0,90061),duration(1,0,0,1,1,1,1)),[]).

test("24 hours is less than or equal to one day",[nondet]) :-
	scasp(lte(duration(1,0,0,0,24,0,0),duration(1,0,0,1,0,0,0)),[]).

test("24 hours is greater than or equal to one day",[nondet]) :-
	scasp(gte(duration(1,0,0,0,24,0,0),duration(1,0,0,1,0,0,0)),[]).

test("63 days is greater than or equal to 2 months",[nondet]) :-
	scasp(gte(duration(1,0,0,63,0,0,0),duration(1,0,2,0,0,0,0)),[]).

test("27 days is less than or equal to one month",[nondet]) :-
	scasp(lte(duration(1,0,0,27,0,0,0),duration(1,0,1,0,0,0,0)),[]).

:- end_tests(duration_comparitors).

:- begin_tests(datetime_comparitors).

test("the same dates are equal", [nondet]) :-
	scasp(eq(datetime(2000,1,1,4,4,4),datetime(2000,1,1,4,4,4)),[]).

test("year zero is before year 1", [nondet]) :-
	scasp(lt(datetime(0,1,1,4,4,4),datetime(1,1,1,4,4,4)),[]).

test("year -1 is before year 0", [nondet]) :-
	scasp(lt(datetime(-1,1,1,4,4,4),datetime(0,1,1,4,4,4)),[]).

test("Feb 28 is before March 1",[nondet]) :-
	scasp(gt(date(2000,3,1),date(2000,2,28)),[]).

test("year zero is before year 1", [nondet]) :-
	scasp(lt(datetime(0,1,1,4,4,4),datetime(1,1,1,4,4,4)),[]).

test("year -1 is before year 0", [nondet]) :-
	scasp(lt(datetime(-1,1,1,4,4,4),datetime(0,1,1,4,4,4)),[]).

test("Feb 28 is before March 1 with date/datetime",[nondet]) :-
	scasp(gt(date(2000,3,1),datetime(2000,2,28,1,2,3)),[]).

test("Feb 28 is not after March 1 with date/datetime",[nondet]) :-
	scasp(gte(datetime(2000,3,1,1,2,3),date(2000,2,28)),[]).

test("Jun 1 2000 is before Feb 1 2001", [nondet]) :-
	scasp(before(datetime(2000,6,1,1,1,1),datetime(2001,2,1,1,1,1)),[]).

:- end_tests(datetime_comparitors).

:- begin_tests(datetime_add).

test("January 31, 2000 plus one day is February 1, 2000",[true(X = datetime(2000,2,1,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2000,1,31),duration(1,0,0,1,0,0,0),X),[]).

test("January 31, 2001 plus one month is February 28, 2000",[true(X = datetime(2001,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2001,1,31),duration(1,0,1,0,0,0,0),X),[]).

test("January 31, 2004 plus one month is February 29, 2000",[true(X = datetime(2004,2,29,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2004,1,31),duration(1,0,1,0,0,0,0),X),[]).

test("February 29, 2004 plus one year is February 28, 2005",[true(X = datetime(2005,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2004,2,29),duration(1,1,0,0,0,0,0),X),[]).

test("February 29, 2004 plus 365 days is February 28, 2005",[true(X = datetime(2005,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2004,2,29),duration(1,0,0,365,0,0,0),X),[]).

% This returns February 28, 2004, because the day is subtracted first, giving February 28, 2005, and then the year is subtracted
% which doesn't get affected by leap days.
test("March 1, 2005 minus 1 year and 1 days is February 29, 2004",[true(X = datetime(2004,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2005,3,1),duration(-1,1,0,1,0,0,0),X),[]).

test("March 1, 2004 minus 1 days is Febraury 29, 2004",[true(X = datetime(2004,2,29,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2004,3,1),duration(-1,0,0,1,0,0,0),X),[]).

test("March 1, 2004 plus 365 days is March 1, 2005",[true(X = datetime(2005,3,1,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2004,3,1),duration(1,0,0,365,0,0,0),X),[]).

test("February 28, 2002 plus 365 days is February 28, 2003",[true(X = datetime(2003,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add(date(2002,2,28),duration(1,0,0,365,0,0,0),X),[]).

:- end_tests(datetime_add).

:- begin_tests(datetime_add_days).

test("Add 1 day to January 1, 2000 using epoch dates is January 2, 2000",[true(X=datetime(2000,1,2,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2000,1,1,0,0,0),1,X),[]).


test("January 31, 2000 plus one day is February 1, 2000 using epoch",[true(X = datetime(2000,2,1,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2000,1,31,0,0,0),1,X),[]).

test("February 29, 2004 plus 365 days is February 28, 2005 using epoch",[true(X = datetime(2005,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2004,2,29,0,0,0),365,X),[]).

test("March 1, 2004 minus 1 days is Febraury 29, 2004 using epoch",[true(X = datetime(2004,2,29,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2004,3,1,0,0,0),-1,X),[]).

test("March 1, 2004 plus 365 days is March 1, 2005 using epoch",[true(X = datetime(2005,3,1,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2004,3,1,0,0,0),365,X),[]).

test("February 28, 2002 plus 365 days is February 28, 2003 using epoch",[true(X = datetime(2003,2,28,0,0,0)),nondet]) :-
	scasp(datetime_add_days(datetime(2002,2,28,0,0,0),365,X),[]).

:- end_tests(datetime_add_days).

:- begin_tests(days_between_datetimes).

test("There is -1 day between January 1 2000 and Janaury 2, 2000 using epoch",[true(X= -1),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,0,0,0),datetime(2000,1,2,0,0,0),X),[]).

test("Invalid date in first term fails using epoch",[fail]) :-
	scasp(days_between_datetimes(datetime(a,b,c,d,e,f),datetime(2000,1,1,1,1,1),X),[]).

test("Invalid date in second term fails using epoch",[fail]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,1,1,1),datetime(a,b,c,d,e,f),X),[]).

test("Duration between the same date twice is zero using epoch",[true(X=0.0),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,1,1,1),datetime(2000,1,1,1,1,1),X),[]).

test("Duration between midnight and noon on the same day is 12 hours using epoch.",[true(X=0.5),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,12,0,0),datetime(2000,1,1,0,0,0),X),[]).

test("Duration between noon and midnight on the same day is -12 hours using epoch.",[true(X= -0.5),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,0,0,0),datetime(2000,1,1,12,0,0),X),[]).

test("Duration between Feb 28 and March 1 is 1 day in non-leap year using epoch",[true(X=1),nondet]) :-
	scasp(days_between_datetimes(datetime(2001,3,1,0,0,0),datetime(2001,2,28,0,0,0),X),[]).

test("Duration between Feb 28 and March 1 is 2 days in leap year using epoch",[true(X=2),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,3,1,0,0,0),datetime(2000,2,28,0,0,0),X),[]).

test("Duration from one year to the next is 366 days in a leapyear using epoch",[true(X=366),nondet]) :-
	scasp(days_between_datetimes(datetime(2001,1,1,0,0,0),datetime(2000,1,1,0,0,0),X),[]).

test("Duration from previous year to subsequent year is negative 366 days in leapyear using epoch",[true(X= -366),nondet]) :-
	scasp(days_between_datetimes(datetime(2000,1,1,0,0,0),datetime(2001,1,1,0,0,0),X),[]).
	

:- end_tests(days_between_datetimes).
"""