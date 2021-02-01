---
title: "Fact Block"
nav_order: 1
---
# Fact Block
![fact block]({{ site.baseurl }}/img/fact.png "Fact Block")

## Purpose

Facts are one of the three major outer block types in Blawx: Facts, Rules,
and Questions.

A fact block is used to specify things that are known. This is usually important
at two different stages of the encoding process. First, when creating
categories and attributes, those elements must be placed inside a fact
block. Second, when specifying facts in a particular fact scenario, those
statements are also placed in a fact block.

The fact block accepts a stack of statements.

You can add a comment to a fact block by right clicking and choosing "add comment".

Fact blocks can be collapsed by right-clicking and choosing "collapse."

There is usually no difference between using one fact block or multiple fact
blocks, so it can be helpful to divide them out into groups of facts that you
may want to be visible at the same time, such as all facts relating to a specific
category.

## Scoping

A variable's "scope" is the portion of your code in which a variable with
a certain name will be unified with other variables using the same name.

If you create two rules, both of which use a variable named 'A', there is no
relationship between objects that match with A in the first rule and objects
that match with A in the second rule, because the two rules have different scopes.

In most cases in Blawx, all blocks in a vertical stack share the same scope. That is not true of statements stacked vertically in a fact block.

A fact block gives a new scope to each first-level item. This illustration will help to demonstrate.

![scope example]({{ site.baseurl }}/img/scope_example.png)

The first-level items inside the fact block on the left are a "scope" attribute, an "and" block, and a "not" block. Each gets its own scope, so the variable A in each of those three will not match with the variable A in the others.

The scope of the variable A on the left and the scope of the variable A on the right of the above image are the same.

Variables are seldom used in fact blocks, for the same reason that variables in rule conclusions should appear in the rule conditions. A fact is like the conclusion to a rule with a condition that is always true. The variable that is not constrained by a condition will match with everything, and matching with everything is not usually what you want to do.

If for some reason you need to put things into the same scope inside a fact block, you can use the "and" block to accomplish it, as illustrated above.