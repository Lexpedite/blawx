---
title: "Rule Block"
nav_order: 2
---
# Rule Block
![rule block]({{ site.baseurl }}/img/rule.png "Rule Block")

A rule block is one of the three main outer blocks used in Blawx: Facts, Rules,
and Questions.

A rule is used to tell Blawx what kinds of implications it can make when
trying to answer questions.

A rule has two parts: a conclusion, which is stated first, and the conditions in
which that conclusion can be reached, which is stated second.

Each part accepts a stack of statement blocks, which are treated as though they
are joined with a logical "and" when vertically stacked.

The conclusion and conditions share a variable scope, except if there are any
blocks in the conditions which create their own scope.

Variables that appear in the conclusion should usually appear in the conditions, or they will match with everything Blawx knows. The exception to
this rule is situations in which you want Blawx to be able to derive, in the
given conditions, that something is true of
everything in the database.

The order of the conditions in a rule should not make a difference in terms
of the meaning of the rule, but it can make a difference in terms of efficiency. As a general rule, it is helpful to include conditions which are
likely to exclude more items in the database higher in your conditions.

Rules can be given names, which can then be used to refer to the rules in
override statements.

Rules can contain multiple statements in their conclusions,
but it is usually best practice to limit rules to a single-statement 
conclusion where possible.

## Rules are not an If/Then Statement!

In many programming languages, there is a statement called `if/then`. It is
important to understand that Rules in Blawx are **not** an if/then statement.

Most programming languages require you to set out a list of instructions that should be followed in the order they are given.
In such a programming language, the meaning of an if/then statement is "if these things are true at this point, then next do this."

But Blawx does not ask you to give a set of sequential instructions. It allows you to specify Rules. You do
not tell Blawx in which order to use the Rules in order to find the answers you
want, it decides on its own.

So in Blawx, a Rule means "when we know or can derive that the conditions are true, we
can derive that the conclusions are also true."

Note that the conclusions of Rules can be overridden by exceptions. See the
Advanced Topics page on [Exceptions](/docs/pages/exceptions) for details.