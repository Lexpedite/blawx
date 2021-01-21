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

This tutorial shows you how the four-stage Blawx encoding process works for a very small example of a game of Rock, Paper, Scissors (also known as Rochambeau, and in certain mighty circles as Boulder, Parchment, Shears) .

The encoding process (whether for laws, regulations, contracts, or board games) involves four stages. First, you tell Blawx what you are going to be talking about. Second, you tell it the rules. Third, you tell it the facts for the specific question, and fourth you ask the question.

Phase One: What are we talking about, here?
The first step is to think about what sorts of questions we want to be able to answer. For this tutorial, we only want to be able to answer the question of which of two players won a game of rock paper scissors. And we’re talking about only one “throw”.

So what categories do we need? Well, we are going to need some sort of category for the game, and that category is going to need an attribute for who the winner is, so that we can ask for that value.

We need a category called Player, but because we don’t really need to know anything about them except their name, the category won’t need any attributes. We can just use the name of the object as the name of the player.

In order to describe the rules, we’re probably going to need to be able to talk about the three different hand signs (rock, paper, and scissors), and which other signs they beat. Because we know that no matter what there can only be three signs, we will define them as objects, and say what other signs they beat.

Here’s what that might look like:


Phase 2: What are the Rules?
OK, so the only rule we need to write is the rule that figures out who the winner of the game is. We need to compare the two throws in a game, and figure out which player won based on which player made what throw.

Wait. Games don’t have “throws”. We didn’t put anything in our description to explain what a “throw” is, or how you know what player it is for. Hmm…

Back to Phase 1
There are a lot of ways we could do this, but let’s do it this way: Let’s say that a Player has a Throw, which is a Sign. And that a Game has two players, Player 1 and Player 2. It will look like this:


We can create a new “We Know” block, and add new attribute declarations for player and game, without causing any problems. The category “Game” will still also have the attribute “winner” that we described before.

Back to Phase 2
OK, so what is our rule about who wins the game? First we need to formulate it, and then express it in Blawx. So we might say “the winner of the game is the player whose throw beats the throw of the other player.”

That seems pretty good, but if you think about it, we’re going to run into a problem when there are ties. Maybe? Maybe not. The “winner” of a game is maybe a slot that should stay empty if the game was a tie. So let’s stick with that formalization. If we want to deal better with ties we can fix it later.

OK, so a rule in Blawx needs a conclusion, which here is going to be setting the winner of a game object. That’s easy enough for getting started. Because we’re talking about a rule that applies to all possible objects, we want to use variables to refer the winner and the game.


Now, how do we encode “player’s throw beats the throw of the other player?” First, we have to find “other player”. Where does that object exist? We need to find “game”, first. Naming it the variable “game” doesn’t actually tell Blawx anything about what should go into that variable. So to avoid having Blawx waste time trying to figure out whether or not the object “Rock” fits in there, let’s be specific that the variable named game refers to an object that is in the Game category.


Now we need to make sure Blawx knows what “player” and “other player” means. So we will say that they both must be answers to the question “what are the game’s players”?


Note that spaces don’t work in variable names, so we use underscores to make the names like other_player a little more readable.

Again, we don’t want Blawx to waste time checking to see if Rock is a player for a given Game. So we will say that player and other player are both in the category Player.


Now we need to say that player’s throw beats the other player’s throw. So we need to get the information about what the throws are, put them into variables, make sure those variables are actually in the category “Sign”, and then compare them.


That should cover it, right?

We’re doing a lot of making sure that variables are in the right category, here. That may not be absolutely necessary if you’re dealing with a small set of data, and you are never letting anyone else use your code. But checking categories is good practice. It makes Blawx faster in large datasets, and it allows you to notice when something was entered incorrectly, or didn’t match your expectations.

Phase 3: What are the Facts?
In the third phase, we describe the specific facts we want to ask Blawx about. So here, we’re going to say there was a game where Bob threw Rock, and Jane threw Paper. To do this in Blawx we have to create a myGame object, make it a Game, create Bob and Jane, put them in the category Player, make them both players in myGame, and set their throws. This is what it looks like.


Phase 4: What Question Are We Asking?
Now we can just ask the question. Who is the winner of myGame? Because we’ve created all the rules and facts above, asking the question is really simple, and looks like this:


We use the name “W” for the variable that will hold the winner.

So now we can click Run… and we should get something that says the winner is Jane, because paper beats rock. So here we go…


Wait… “no?”

Well, we screwed something up. It should have said something like “W = Jane, Yes.”

Phase 5: Debugging
Did I not mention phase 5? There is always phase 5.

Tutorials don’t usually include a debugging part. But Blawx is a very powerful tool. Which means that there are a lot of ways in which things can not work on the first try. That’s 100% normal. That’s what you should expect. So why not learn how to deal with it while we are learning everything else?

If you want to try and find the bug before I tell you what it is, now’s your chance. Stop scrolling now and check it out..

Ready?

So the problem is probably in our rule. Here’s something you can do to help debug rules. Right click on the rule block, and choose “Duplicate”. That will create a copy of the rule and all its sub-blocks.

Then, in the copy you just made, grab the top condition (in this case “game is in the category Game”), and drag it out of the rule. It will take all the other conditions with it. Now delete the rule you just emptied out, either by clicking on it and using the delete key, right-clicking on it and choosing delete, or dragging it into the trash.

Now you have a copy of the conditions of the rule. Create a new query block, and drop the conditions into it.

You can now drag “Known Object” blocks for what you think should be the right answer, and put them in all the places where there is a variable, and run your query, and see what you have to change in order to make it work. Here’s what I get when I start that process:


You can then go through each condition and run it as a query on its own to see what is making your rule fail. But we don’t even need to play with it to see what’s wrong: Rock doesn’t beat paper!

The rule, as we have written it, doesn’t check whether one player’s throw beats the other player’s throw… it checks whether or not Player 1’s throw beats Player 2’s throw. It will never check to see if Player 2 won. That’s not what we wanted.

There are a couple of ways we could solve this problem. One would be to add an “or” block to the rule, and check scenarios where player 1 is “player” OR player 2 is “player” and vice-versa for “other_player.” But the other option shows off some more of Blawx’s features, and helps you understand how Blawx finds answers, so we’ll do that instead.

How Blawx Finds Answers
When you ask Blawx a question, you are asking it to search for some combination of objects that will make the statements in that query true. If you include variables in the question, it will tell you the variables it found for the variables listed in the question. But in the background, even for yes or no questions, it is trying to find a combination of objects that it can slot into the variables in the rules that gets it to a correct answer.

Here, it didn’t work because there is no combination of variables where the rule will result in there being a winner if the winner was the second player. What we want is for Blawx to consider each player, and whether that player is the winner. We can take advantage of the fact that in Blawx all attributes are lists to make this happen.

Back to Phase 1 (again)
Instead of having player 1 and player 2 as different attributes, let’s just use one, a list of players. As you’ll see, that lets us keep the rules and facts almost as they are.

So we need to fix our declaration for Game so it looks like this:


Back to Phase 2 (again)
Now we replace the Player 1 and Player 2 Known Attribute Blocks in our rule with the new “players” known attribute block, like this:


So you might think that this will make Blawx check for situations where Bob is “player” and Jane is “other_player”, and vice versa. And that’s true. But it will also make Blawx check for circumstances where Bob is “player” and Bob is also “other_player”, and where they are both Jane. In fact, if we didn’t include the checks for categories, Blawx would also consider the possibility that ALL of the variables should be filled with “scissors.”

We could add parts to the rule to say that player and other_player should not be the same object. And code to deal with the possibility that a player has more than one throw, and a game has more or less than two players. We won’t. But if you were writing code for production you might want to think about things like that.

Back to Phase 3 (for the first time)
Now we make the same change in our facts, removing the Player 1 and Player 2 known attributes, and replacing them with the new Players attribute. You can think of this as adding two objects, Bob and Jane, to the list of objects for which it is true that they are a player in myGame.


Back to Phase 4
So let’s recreate our query, and run it again. (Make sure you delete the query you created when you were debugging. Blawx can get confused if there is more than one query in the workspace. Alpha software, sorry.)


Victory! For us, and for Jane!

What Should We Do Now?
Don’t stop there. What are you going to change the code to do?

Maybe you want to change it so that it you can ask what the “outcome” is, and it will tell you if someone won, or if it was aa tie.

Maybe you want to make it able to figure out who won a best-of-3.

Maybe you want it to be able to figure out who’s left in the game (all the people who tied) in a game with more than 2 players?

Try something. See what happens.