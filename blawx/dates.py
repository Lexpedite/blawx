scasp_dates = """
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
today(date(2021,12,11)).

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
gt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y #> Y2.
gt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y = Y2,
	M #> M2.
gt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y = Y2,
	M = M2,
	D #> D2.
after(date(Y,M,D),date(Y2,M2,D2)) :-
	gt(date(Y,M,D),date(Y2,M2,D2)).
lt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y #< Y2.
lt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y = Y2,
	M #< M2.
lt(date(Y,M,D),date(Y2,M2,D2)) :-
	Y = Y2,
	M = M2,
	D #< D2.
before(date(Y,M,D),date(Y2,M2,D2)) :-
	lt(date(Y,M,D),date(Y2,M2,D2)).
eq(date(Y,M,D),date(Y2,M2,D2)) :-
	Y = Y2,
	M = M2,
	D = D2.
lte(date(Y,M,D),date(Y2,M2,D2)) :-
	lt(date(Y,M,D),date(Y2,M2,D2)).
lte(date(Y,M,D),date(Y2,M2,D2)) :-
	eq(date(Y,M,D),date(Y2,M2,D2)).
gte(date(Y,M,D),date(Y2,M2,D2)) :-
	gt(date(Y,M,D),date(Y2,M2,D2)).
gte(date(Y,M,D),date(Y2,M2,D2)) :-
	eq(date(Y,M,D),date(Y2,M2,D2)).
not_before(date(Y,M,D),date(Y2,M2,D2)) :-
	gte(date(Y,M,D),date(Y2,M2,D2)).
not_after(date(Y,M,D),date(Y2,M2,D2)) :-
	lte(date(Y,M,D),date(Y2,M2,D2)).

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
"""