---
title: Variables
nav_order: 6
---
# Variables
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

Variables are a fundamental part of how Blawx works. You can't do anything interesting without them. But if you have experience
with other programming languages, they probably will not behave as you first expect.

Don't worry, variables in Blawx are VERY easy to understand.

## Understanding Variables in Blawx

Imagine I asked you "this species is carnivourous, it is four-legged, and it is known as man's best
friend." What would you answer?

A dog!

So what happened, there?

I gave you a list of things that was true. The list was:

* it is a species, and
* it is carnivourous, and
* it is four-legged, and
* it is known as man's best friend

I asked you to think of a specific thing that "it" might be. Or put differently,
I asked you to think of a specific thing, where if you put that thing everywhere the word "it"
appears, the four statement would be true.

**The way we are using "it" in that list is *exactly* how a Blawx variable works.**

See? Easy!

A blawx variable is just a name that you give to an unknown. When you use the same name, you
are referring to the same unknown. Just like in math.

## Variables In Action

### Single Variable

The first and most obvious place that you will use variables is in questions. The dog question above could be posed in Blawx like this:

![it query]({{ site.baseurl }}/img/it_query.png)

This example uses the word "it" as the name of the variable, but you can use anything you like.

Note that variable names should not include spaces. Blawx will not stop you from attempting to use variable names with spaces, but they are unlikely to work.

### Variables in Rule Conclusions

As a rule, do not use a variable in a rule conclusion that wasn't also used in the conditions of that rule. Otherwise, your variable will match with everything in the database, which probably isn't what you wanted.

### Copy, Don't Type

Because variables are typed, and not declared like objects or categories, there is a higher risk of typos. It is a good practice to copy and paste variable blocks whenever possible to avoid problems.

### Multiple Variables

Where Blawx gets very powerful is in its ability to match multiple variables at the same time.

For example, let's take this rule that defines the winner of a game of rock-paper-scissors:

![rock paper scissors]({{ site.baseurl }}/img/rps_winner.png)

This rule uses 5 variables in the conditions, and only 2 of them in the conclusion.

Blawx searches for a set of 5 data points that can fill in for the variables "game", "player", "other_player", "player_throw", and "other_player_throw", which will make all of those 10 statements in the condition true.

The more complicated your data structure, and the more layers of that data structure you need to navigate in order to reach a conclusion, the more variables you will need in your rules and queries.

### Sameness and Differentness

Blawx is going to automatically find data that can be put in the place of the variable everywhere it appears. So it checks to see if
the data is the same in each place the same variable is used.

You might assume that Blawx also checks to see if a *different* piece of data is used
everywhere that *different* variables are used, but this is not true.

Let's imagine we have the following ontology:

![family ontology]({{ site.baseurl }}/img/family_ontology.png)

And let's say that we have the following rule in order to calculate siblings:

![sibling broken]({{ site.baseurl }}/img/sibling_rule_broken.png)

This will incorrectly tell us that Wednesday is her own sibling. Why?

Because Blawx will see if there are values that it can put into A, B, and C, using the same values each time each variable is used, and have all of the statements in the condition be true.

So here, if A is Wednesday, and if B is Wednesday, and if C is Morticia, all three statements are true.

Therefore Wednesday (A) has a sibling Wednesday (B).

Blawx is checking to see that the A in the condition is the same as the A in the conclusion, the B in the condition is the same as in the conclusion, and the C is the same both times it appears in the condition. But is not checking to see if anything is different.

To force a check for difference, you have to be explicit, like this:

![sibling fixed]({{ site.baseurl }}/img/sibling_rule_fixed.png)

Now Wednesday has only one sibling, Pugsley, and Pugsley has only one sibling, Wednesday.

## Types of Variables

Blawx gives you three different types of variables that you can use:

### Variables

![variable]({{ site.baseurl }}/img/variable_selector.png)

A normal variable is just a name. Blawx will look for data which, if you put it in everywhere the 
variable appears, it makes the statement true. And if you used it in a question, it will tell you what that data was.

In fact, this is the only kind of variable that will cause Blawx to give you the specifics in response to a question.

### Silent Variables

![silent]({{ site.baseurl }}/img/silent_variable.png)

A "silent" variable works exactly the same as a normal variable, except that if you use it in
a question, the silent variable will not be included in the result. Which is why it's called "silent."

For example, you might want to know a person's salary. If the person has a job, and
the job has a salary, you will need to use a
variable to represent the job in your query.
If you use a silent variable, the name of the
job will not be included in the results.

![fisherman]({{ site.baseurl }}/img/fisherman_ontology.png)

![silent demo]({{ site.baseurl }}/img/silent_variable_demo.png)

This will return

```
Yes

salary: 100
```

### Unnamed Variables

![unnamed]({{ site.baseurl }}/img/unnamed_variable.png)

If you need to check that *something* can be put into a statement, but you don't need to learn what,
and you won't ever need Blawx to make sure it's the same *something* that was used elsewhere, you can use
the unnamed variable block.

Unnamed variables are also silent. If you pose a question with only silent or unnamed variables, Blawx will answer it as a yes/no question.

## Variable Scope

Two variables with the same name  refer to the same thing if they are both in the same rule. Variables in different rules can reuse the same names, and it does not affect the meaning.

This is an example of variable "scope". A variable's "scope" is the part of the code in which another variable with the same name will be matched to the same thing.

Some scopes are nested inside other scopes. If that happens, all the variables in the outside scope are also in the inside scope. But variables in the inside scope are not matched with the same variable used outside that scope.

Usually, scope is not an issue. Every rule is its own scope. Every query is its own scope.

The only blocks which create new scopes are the [aggregate block]({{ site.baseurl }}/blocks/aggregate/), the [quantifier block]({{ site.baseurl }}/blocks/quantifier/), and the [fact block]({{ site.baseurl}}/blocks/fact/).