---
title: Logic Blocks
nav_order: 5
parent: Beginners Guide to Blawx
---
# Logic Blocks
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## And
The and operator returns true if both of its internal parts return true, and returns false otherwise. It looks like this:

![and]({{ site.baseurl }}/img/and.png)

However, you will usually never need to use the “and” operator when using Blawx unless you want to be visibly explicit about something. This is because as a short-hand, the vertical connectors on Blawx work as an “and” connector. So the following piece of code:

![and version]({{ site.baseurl }}/img/and_block_version.png)

… has exactly the same meaning inside a rule or query if you remove the and block like this:

![vertical version]({{ site.baseurl }}/img/vertical_stack_image.png)

Because a vertical connection between the two blocks also means “and”.

## Or

![or]({{ site.baseurl }}/img/or.png)

The Or operator takes two statements, and returns true if either of the statements returns true. Unlike “and”, if you want to use “or”, you need to use it specifically. If you want to return true if one of three values is true, for example, you need to use nested “or” blocks, like this:

![nested or]({{ site.baseurl }}/img/nested_or.png)


## Negation

Blawx provides you with two different types of negation.

The first type of negation is a "logical not.” A logical not looks like this:

![not]({{ site.baseurl }}/img/not.png)

The second type of negation is a “n.a.f. not.” It looks like this:

![naf not]({{ site.baseurl }}/img/naf_not.png)

NAF is short for “negation as failure.”

The difference between them is that a logical not checks to see if it knows (either because it was stated as a fact, or as the result of the application of rules), that the statement inside it is explicitly false.

You make a statement explicitly false by using "logical not" in a fact, or in the conclusion of a rule.

NAF Not checks for explicit falsity, too. If something is "not" true, it is always also "naf not" true. But NAF not also checks to see if it can prove the statement is true. If it cannot prove it true, it concludes that the statement is false. It treats the "failure" to find proof of truth as "negation" of the statement.

NAF not cannot be used in facts, or in the conclusions of rules.

NAF Not is particularly useful when you are checking to see whether or not an object exists in the data.  Let's imagine you want to ask if there are no dogs. You might (incorrectly) write this code:

![wrong not any dogs]({{ site.baseurl }}/img/wrong_not_any_dogs.png)

But this code will not work as expected. A logical “not” only returns “true” if its contents are explicitly “false.” But if a fact stated (or a rule concluded) "not any is in the category Dog", that would mean “it is impossible for an object to be a dog.” That is probably not what you meant to check for.

You don't want to know if that statement is explicitly false. You want to know
whether you can find a specific example in which it is true. Put another way,
you don't want to ask "is it true that nothing can be a dog?", you want to ask 
"do you know of any examples of dogs?" So the NAF version
is what you need.

![correct not any dogs]({{ site.baseurl }}/img/correct_not_any_dogs.png)

That version of the rule will work as expected.

Another way to think about the difference is to think of statements as having opposites.
Logical not checks to see if the opposite is true. NAF not checks to see if the opposite
is true, *or* if the statement can't be proven.

In criminal trials, when a court decides that a person is "not guilty", they are using the NAF version of "not". "Not guilty" means *either* the person is innocent (the opposite of guilty), *or* there was not sufficient proof to
find them guilty.

As a general rule, you usually want to use "naf not" in questions and in rule
conditions. "Not" is the only thing that will work in rule conclusions and facts. 

## Implication
The implication block in Blawx looks like this:

![implication]({{ site.baseurl }}/img/implication.png)

The implication operator is intended to be used in the conditions of a rule. It is used to ask whether it is true that whenever the first query is true, the second one is true.

While the implication operator can be useful in some circumstances, it can also be very confusing, and is not entirely necessary. Everything that can be done with the implication operator can also be done using a combination of “or” and “negation” blocks.

There are four different symbols that can be used for the type of implication. They vary in two ways: directionality, and the type of negation used.

### Implication Directionality
Directionality is shown by the arrow heads at the end of the line. Either there is an arrow head only on the right, or there is an arrow head on both sides. If there is an arrowhead on the right, the implication is only from the top condition to the bottom condition. If there is an arrowhead on both sides, the implication is in both directions.

For example, conssider the query “Is it true that whenever A is True, B is 42?” That statement is made using only one arrowhead, like this:

![implication]({{ site.baseurl }}/img/implication_example.png)

If you used the line with two arrow heads, you are asking whether both implications are true. So this query, using the line with two arrow heads…

![bidirectional implication]({{ site.baseurl }}/img/bidirectional_implication_example.png)

… means the exact same thing as this query, which uses two mirrored implications with only one arrow head:

![bidirectional implication expanded]({{ site.baseurl }}/img/bidirectional_implication_expanded.png)

So the line with two arrow heads is a short-hand for asking whether an implication is true in both directions.

### Implication Negation Type
The type of lines used in the implication indicate the type of negation used in the implication. To understand this, it is easier to look at the version of the implication created from negation and or blocks.

Let’s imagine we want to ask, “Is it true that whenever A is true, B is 42?”

Using an implication block, it would look like this:

![implication example]({{ site.baseurl }}/img/implication_example.png)

If we wanted to do the same thing using “or” and “negation” blocks, it would be this:

![implication expanded]({{ site.baseurl }}/img/implication_example_expanded.png)

This could be read as “is it true that either A is true, or, it cannot be shown that B is 42?” If there is no proof that the value of B includes 42 (remember that B could be a list of more than one value), then n.a.f. not will return true, and the or will return true.

But if you use the double-line version of the implication arrow, like this:

![double line implication]({{ site.baseurl }}/img/double_line_implication_example.png)

Then the equivalent “or” and “negation” version would look like this:

![double line expanded]({{ site.baseurl }}/img/double_line_implication_example_expanded.png)

This statement can be read as “is it true that either A is true, or you can prove that B cannot be 42.”

In most cases you are going to want to use the squiggly-line, n.a.f. version of implication.

Note that because the squiggly-line version uses n.a.f. negation, it can only
be used in questions and in the conditions of rules. In facts and in rule
conclusions, you can only use the double-line version.

## Universal and Existential Quantification
Universal and existential quantification are both dealt with with the same quantification block, which can be modified to use either the word “any” or the word “all.” The quantification block looks like this:

![quantifier]({{ site.baseurl }}/img/quantifier.png)

The quantification block expects you to provide a variable, and then to provide a set of conditions in which that variable appears.

Blawx will consider all of the values that can be found for the variable provided, and for each possible value, will check to see if the condition is met when the variable has that value.

For an "any" quantifier, it will return “true” if at least one value returns true in the condition. For an "all" quantifier, it will return “true” if the condition returns true for every possible value of the variable.

Note that if you do not wrap a statement in a quantifier, Blawx treats it as though it has been wrapped in an "any" quantifier by default. If you want to know are there any dogs, you can use the "any" quantifier like this:

![existential example]({{ site.baseurl }}/img/existential_example.png)

However, that is the same as asking whether there are any dogs like this:

![existential example simplified]({{ site.baseurl }}/img/existential_example_simplified.png)

So the existential qualifier is usually not required. If you want to ask whether all of the known Mammals are Dogs, you could ask that using the universal quantifier, like this:


Because A has already been limited to Mammals outside the universal quantifier, all Mammals, as opposed to all objects, will be checked to see if they are all dogs. And only if all Mammals are dogs will the query return “Yes.”

## Comparison

![comparison]({{ site.baseurl }}/img/comparitor.png)

The comparison operator has 7 different comparisons it can make between two values, or objects.

### Less Than, Greater Than
The inequality operators of “<“, “<=”, “>”, “>=” work much as you would expect as long as the values provided to the operator are numbers.

### Numerical Equality and Inequality
The equality operator “=” asks whether the two objects or values or variables provided have the same value. For example, you could use the equality operator to ask whether two inventory objects have the same price.

The inequality operator “!=” works exactly the same as wrapping a “=” comparison in a “not” operator, reversing the truth value returned.

### Identity and Non-Identity
The identity comparison “==” asks whether two objects or variables or values are the same object.

The non-identity comparison "!==" asks whether two objects are not the same object.

This can be very useful when you are trying to compare two objects of the same category to one another. For example, you may want to check to see if two people are sibings by asking whether they share a parent. However, because variables with
different names do not necessarily refer to different data, you need to use the
non-identity comparison to say that the two people with the same parent are not
the same person.

![nonidentity example]({{ site.baseurl }}/img/sibling_rule_fixed.png)

Without the non-identity comparison, the rule would allow for the implication that everyone is their own sibling.