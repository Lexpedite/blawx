---
title: Issues with Negation
parent: Advanced Topics
published: false
---
# Issues with Negation
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

As discussed in the Logic section of the Beginner's Guide, Blawx features two different kinds of negation: logical negation, and negation as failure.

The difference between the two is that logical negation asserts that the statement within it is known to be false, while negation as failure asserts either that the statement is known to be false, or that it merely cannot be proven true.

Logical negation cannot be used in queries or rule conditions, while negation as failure can be used in all parts of your code. In most cases, negation as failure is the style of negation that you will want to use, unless you are trying to categorically exclude possibilities.

## What Negation As Failure Means

Negation as failure behaves in sometimes unintuitive ways. It is a block that asks the reasoner to find out if the thing is known to be false, or if that is not known, when you try to prove it true, does that attempt fail.

The difference between "false" and "can't be proved true" is big, and can have surprising results.

If you say:

jason:Person.

And then you ask...

?x:Person.

It will say "yes, jason".

If you ask

\neg ?x:Person.

It will say "no." Because no one said that it was impossible for anything to be a person.

If you ask

\naf ?x:Person.

It will say "Yes - undefined."

Why? Because the ?x inside the \naf is "free". A "free" variable is a variable that is not used anywhere else
in the statement in a way that allows it to be bound to possible values.

If I say ?x:Person, I am saying "create a variable and call it x. Then see if you can match x with anything where it is true that the matched thing is a person." Including "Person" makes the variable non-free. Flora-2 has a way to
start looking for what might match with that variable.

If I say \naf ?x:Person, I'm saying create a variable and call it x. Now see if you can match x with anything where you canot prove x is a person.

Flora-2 says "if I create a hypothetical object, I can't prove the imaginary object is a person." So the answer to
naf negation of a free variable is always Yes. 

Why does Flora-2 even talk about imaginary values? Well, that's because it's capable of figuring out the relationships between rules in the abstract, without objects to fill them.

Let's say that some things are in the star trek universe, and some things are in the star wars universe. Things in the star trek universe are not in the star wars universe. Things in the star wars universe are not in the star trek universe. If I ask you "is there some object x that is in the star wars universe and is in the star trek universe"?

Do you need to have an actual thing to slot into the value 'x' in order to answer that question? No. You can tell that it is false by considering only hypothetical objects. A hypothetical object in star trek is not in star wars. A hypothetical object in star wars is not in star trek. Therefore, the answer is no, even if there are no objects.

Flora can do that, too.

\neg ?x:StarTrek :- ?x:StarWars.
\neg ?x:StarWars :- ?x:StarTrek.
?- \naf (?x:StarWars, ?x:StarTrek).

Yes.

So the question is: "is it not possible to prove that for some object x, x is in star wars and x is in star trek?"
Using hypothetical objects, the answer is "yes."

We didn't have to put anything in either universe in order for Flora to figure out that nothing can be in both, but
that capability only exists if Flora can reason about hypothetical objects.

So if you have at least one person, and you ask "is it not possible to prove that there is an object x that is a person", then
the answer will be "yes" for some values of x (the hypothetical objects), and "no" for other values of x (the people),
and Flora will be confused, and say "undefined."

If you have no people, and you ask "is it not possible to prove that there is an object x that is a person", then
the answer will be "yes", because the answer is always "yes" with regard to all real and hypothetical objects.

So if ?x:Person means "is there a person", and \naf ?x:Person means is there even a hypothetical not-person, then how do you ask if there is an actual not-person?

There are two ways. First, you can use a nameless variable. WHY DOES THIS WORK?

Your other option is to ask flora for some category of thing first, and then ask it whether the things in that category are not persons. Blawx has a default category called Thing. Every object in the database is a thing.

So you could say

?x:Thing, \naf ?x:Person.