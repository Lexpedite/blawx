---
title: "Fact Block"
nav_order: 1
---
# Fact Block
![fact block]({{ site.baseurl }}/img/fact.png "Fact Block")

## Scoping

A fact block gives a new scope to each first-level item. This illustration will help to explain.

![scope example]({{ site.baseurl }}/img/scope_example.png)

The first-level items inside the fact block on the left are a "scope" attribute, an "and" block, and a "not" block. Each gets its own scope, so the variable A in each of those three will not match with the variable A in the others.

The scope of the variable A on the left and the scope of the variable A on the right are the same.

Variables are seldom used in fact blocks, for the same reason that variables in rule conclusions should appear in the rule conditions. A fact is like the conclusion to a rule with a condition that is always true. The variable that is not constrained by a condition will match with everything, and matching with everything is not usually what you want to do.

If for some reason you need to put things into the same scope inside a fact block, you can use the "and" block to accomplish it, as illustrated above.