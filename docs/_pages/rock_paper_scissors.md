---
title: Rock Paper Scissors
parent: Beginners Guide to Blawx
nav_order: 7
---
# Rock, Paper, Scissors
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

This tutorial shows you how the Blawx encoding process works for a the example of the rules of the game of Rock, Paper, Scissors (also known as Rochambeau, and in certain mighty circles as Boulder, Parchment, Shears).

## The Blawx Encoding Process

The Blawx encoding process (whether for laws, regulations, contracts, or board games) involves four stages: Ontology, Rules, Facts, Questions.

1. Ontology: In this phase you tell Blawx about your model of the world.
2. Rules: In this phase you tell Blawx how to derive new information about the world.
3. Facts: In this phase you tell Blawx about a specific scenario that you want to ask questions about.
4. Question: In this phase you ask Blawx questions and get answers.

As you will see, you will naturally jump back and forth between these phases as
required. They are not a strict sequence of events. But they are a helpful map for beginners. 

## Phase 1: Ontology - "What are we talking about, here?"

The task in phase one is to tell Blawx about the Categories, Objects, and Attributes that will be applicable to all different fact scenarios. We want to
figure out how we are going to model the world we are interested in.

When trying to discover categories, attributes, and objects that you might need, it is helpful to start at the end of the process and work backward. Imagine the question you want to be able to ask, and imagine what categories and attributes and objects you might need to ask that question. Then imagine the rules that you
are going to want to express, and imagine what categories, attributes, and objects
you might need to be able to express those.

If you don't think of everything (and you won't), don't worry. You can always
switch back to the Ontology phase whenever you need to.

### The Ontology of Rock, Paper, Scissors

The only question that we want to be answer is "who won this game of Rock,
Paper, Scissors." So what categories might we need?

Well, we want to be able to talk about games. A game will have players, and
a winner. So we also need to be able to talk about players. So let's start there:

![ont1]({{ site.baseurl }}/img/rps_ont_1.png)

Now we can think about the rules. The rules of Rock Paper Scissors are simple.
Each player throws one of three signs, and each sign beats one other sign.
The winner is the player whose sign beats the other player's sign.

So we are going to need to talk about the signs, what signs beat what other
signs. Because we know what the specific
signs will be in every possible case, we can include them as objects in our
ontology.

![ont2]({{ site.baseurl }}/img/rps_ont_2.png)

We need to tell Blawx that Rock beats Scissors, etc. What phase of the
encoding process does that belong in?

Note that the word "rule" in Blawx means something
slightly different than the way we use it in everyday language. In everyday
language we might say "it is a rule of Rock, Paper, Scissors that Rock beats Scissors." But in Blawx, the "Rules" phase is for explaining how to get new
information from existing information. "Rock beats Scissors" is not a way to
get new information from existing information. It is a statement that is
always true, with regard to any game we are interested in modelling.
So inside our encoding, "Rock beats Scissors" not a Rule, it is Ontology.

We can use the obects and attributes we have already created to add the 
relationships bewtween the signs like this:

![ont3]({{ site.baseurl }}/img/rps_ont_3.png)

Note that we used three different Fact blocks to set out our Ontology, but
we could have used just one. It doesn't make any difference. You can use as many fact blocks as
is convenient for you, and include the statements in any order.

## Phase 2: Rules - "What can I infer?"

In the second phase of the Blawx encoding process, you encode Blawx rules.

Rules are ways that Blawx can go from something that it already knows, to
something that it can infer. They have conditions, and if those conditions are
true, then the conclusion is also true.

If you are encoding legislation or contracts, you may find that you need one
or more rules for each section or subsection of the source document. But
more generally, you
want to think about what pieces of information you want to be able to calculate.

### The Rules of Rock, Paper, Scissors

For Rock, Paper, Scissors, we want to be able to infer the winner of the game. So
we will need a rule, and the conclusion of the rule will be that a given game
has a given winner. So here's how we can start:

![rule1]({{ site.baseurl }}/img/rps_rule_1.png)

Now we need to make some conditions. A player is the winner if their throw
beats the other player's throw.

### Back to Phase 1!

Uh oh! We don't have anything in our ontology to represent a "throw". That's OK,
we can add it now. But how shall we do it?

We could say "a player has exactly 1 throw." And if we knew for sure that our
code was never going to be used to talk about more than one game at the same time,
that might be just fine. But if we modeled throws that way, we would have no way
of saying that the player threw Rock in Game 1, but Paper in Game 2!

One way to think about your ontology model is to ask questions like "what is the
type of thing, and what other types of things does it contain?"

It doesn't really makes sense to say "a player has a throw," because "Rock" is not
a piece of information about "Bob". Instead "Bob threw rock" is a piece of
information about a game. So what type of thing is "bob threw rock"? Let's call
that a "throw". So a "game" has two "throws", and a "throw" has one "player" and 
one "sign." 

![ont4]({{ site.baseurl }}/img/rps_ont_4.png)

Note that we now have two different blocks that create attributes for the Game
cateogry. Again, Blawx doesn't care. You can add attributes whenever you like.

Now we have a game, that has throws, that has a player; and we still have a block
that says a game has players. We have created two different ways of storing the
players.

It's possible to imagine reasons you might want to have both, but we don't need
games to have players. And while you can add attributes later, you can't remove
them later, so we will go back to the first ontology block and remove "players"
as an attribute of a "game".

![ont5]({{ site.baseurl }}/img/rps_ont_5.png)

### Back to Phase 2!

Alright, now we have the ontology we need to express our rule. The rule, again,
is "the winner of a game is the player whose throw beats the other player's
throw."

One way to approach this is to start at a central point in your ontology,
and then move, step-by-step to the information that you need.

Our central point is the game, so let's start by saying "there is a game."

![rule2]({{ site.baseurl }}/img/rps_rule_2.png)

A game only has throws. So let's get two throws from the game. Because Blawx
doesn't know when you want different variables to refer to different objects,
we also have to say specifically that these two throws are not the same thing.

![rule3]({{ site.baseurl }}/img/rps_rule_3.png)

Great. Now from the first throw we can get the player. We could get the other
player, too, but we don't need that information. We just need the signs that
both players threw. So we can add blocks for that.

![rule4]({{ site.baseurl }}/img/rps_rule_4.png)

We have followed the links through our ontology, and we now have all the information
we need to say the thing we actually wanted to check, which is whether or not
the player's throw beats the other player's throw. So we ask whether the
sign in the player's throw beats the sign in the other player's throw.

![rule5]({{ site.baseurl }}/img/rps_rule_5.png)

## Phase 3: Facts - "Describe a fact scenario"

In the third phase, we describe the specific facts we want to ask Blawx about. So here, we’re going to say there was a game where Bob threw Rock, and Jane threw Paper. Here's what it looks like:

![facts]({{ site.baseurl }}/img/rps_facts.png)

Note that because our model has one game, two players, and two throws, we needed
to crete 5 objects, put all those objects into the appropriate categories,
and then give those objects their attributes.


## Phase 4: Question - "What do you want to know?"
Now we can just ask the question. Who is the winner of myGame? Because we’ve created all the rules and facts above, asking the question is really simple, and looks like this:

![question]({{ site.baseurl }}/img/rps_question.png)

We use the name “winner” for the variable that will hold the winner.

So now we can click Run Blawx Code in the Menu… and we should get something that says the winner is Jane, because paper beats rock.

```
Yes

winner = Jane
```

Victory! For us, and for Jane!

## Play with it!

The code that we made above is available for you to play with. Just
[click here](/blawx.com?load=address_of_example) and you will be taken to your blawx interface with the code pre-loaded.

Here are some things to try:
1. Change the signs that Bob and Jane threw, and see if the winner changes.
2. Create a second game between Bob and Jane.
3. Change the question to use a variable instead of "myGame", and find the winners
   of all the games.
4. Create a game where both players throw the same sign, and see who Blawx thinks
   the winner is.
5. Create an attribute for games called "is_a_tie", and write a rule to set it
   to true if a game does not have a winner.

## Congratulations

You have made it to the end of the Blawx Beginners Guide! You are officially
no longer a beginner. If you would like to learn more, you can take a look at
the [Advanced Topics](/docs/advanced_topics/) section of the documentation, or take a look at some of
the [examples](/docs/examples/) available.

Your feedback on Blawx and on this Guide is extremely valuable. If you have any
thoughts you would be willing to share, don't hesitate to contact us.