---
title: Exceptions
parent: Advanced Topics
---
# Exceptions
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## The Motivation

In legal writing it is very common to come across phrases like "despite section 3", or "subject to section 3". These are statement about what should be done when two different rules come to conflicting conclusions.

If your encoding language does not also allow you to write defaults and exceptions, you run into something
called the "reformulation" problem. Reformulation is the experience of coming to a section of law that
makes an exception to a rule that you have already encoded, and in order to encode that exception you need
to go back to the default rule, and reformulate it to include the exceptions.

That's slightly inconvenient at the point where you are first writing the code. But it becomes devestating
when the rules change.

Imagine that you have encoded a law by reformulating defaults and exceptions into single rules. Now, the
source rule changes, and you want to how and where to change your code to keep it up to date. Where should
you look? Well, you need to see if you can find the section of code that encoded the original rule. But if
you "reformulated" it to combine it with some other part of the code, it will be difficult to find. And if
it changes the results of multiple rules, you need to find where all of those rules were encoded, and
change them all.

The problem is that the one-to-one relationship between parts of the rules and parts of the code has been
broken. When the rules change, having that one-to-one relationship maintained allows you to know exactly
what code to change, and to be confident that there is nowhere else you need to look in order to update
your encoding.

So the ability to encode defaults and exceptions is convenient for drafting, but it is absolutely critical
for software maintenance.

## How to Encode Defaults and Assumptions in Blawx

Blawx needs to know two things in order to reason about defaults and exceptions: It needs to know what
constitutes a conflict, and it needs to know how to resolve those conflicts when different rules come to
conflicting conclusions.

### What constitutes a conflict?

Right now, there are only two things that Blawx will recognize as a conflict. If one rule concludes
something, and another rule comes to the same conclusion but wrapped in a "logical not" block, that
is a conflict.  Also, if you define a Yes/No attribute for a Category, and a single object has that
attribute set to both "true" and "false", Blawx will consider that a conflict.

In future versions of Blawx it will be possible for the user to add other types of conflicts. For now,
if you have something else that you want Blawx to treat as a conflict, you need to create a rule that
allows Blawx to infer that when one is true the other is negated. For instance, if you wanted to insist
that a person cannot be both a dog person and a cat person, you might use this rule:

![custom conflict]({{ site.baseurl }}/img/custom_conflict.png)

### How Should Blawx Resolve the Conflict?

If you have two rules that come to conflicting conclusions, Blawx will treat both of the conclusions as
false unless you tell it how to resolve the conflict. You tell it how to resolve the conflict by using
an overrides block, which accepts the names of two rules. The first rule overrides the second.

## Example: Can Tweety Fly?

The canonical example of defaults and exceptions is the "Tweety" example. We may want to conclude that
if something is a bird, then that thing can fly. But what if it is a penguin? Or injured? Then it can't,
despite the default rule.  Here's how you endode that in Blawx, using the four-step Blawx encoding
process.

First, we encode the ontology, which is straightforward. There are birds. They can either fly, or not,
and they can be injured, or not. There are also Penguins, which are a subcategory of birds.

![tweety ontology]({{ site.baseurl }}/img/tweety_ontology.png)

Next, we encode our three rules. The first rule is the default. If something is a bird, that thing can fly.

![default]({{ site.baseurl }}/img/tweety_default.png)

The second rule is that an injured bird cannot fly. So we create that as a rule, and then we create an
override statement to make this override the default rule above.

![exception1]({{ site.baseurl }}/img/tweety_exception_1.png)

The third rule is that a penguin cannot fly. Again, we make that a rule, and say that it overrides the
default rule.

![exception2]({{ site.baseurl }}/img/tweety_exception_2.png)

Now we describe the facts of the specific scenario and ask questions. If we say Tweety is a bird, and ask
if it is true that Tweety can fly, Blawx says "Yes."

![q1]({{ site.baseurl }}/img/tweety_q1.png)

If we add to the facts that Tweety is injured, blawx says "No", because the injury overrides the default.

![q2]({{ site.baseurl }}/img/tweety_q2.png)

If we say instead that Tweety is a Penguin, Blawx answers "No", because the penguin rule overrides.

![q3]({{ site.baseurl }}/img/tweety_q3.png)

Note that when we said only that Tweety was a Penguin, Blawx still knew that Tweety was also a bird,
because in our ontology we said that all Penguins were Birds.

If you would like to try the Tweety code for yourself, it is [available in the Examples section](/docs/tweety).