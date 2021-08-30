---
title: "Implication Block"
parent: Logic
---
# Implication Block
![implication block]({{ site.baseurl }}/img/implication.png "Implication Block")

The Implication Block is availabe in the Logic drawer of the Toolbox. It is used to test whether it is true that whenever the statements in the first input are true the statements in the second input are also true.

The implication operator also accepts an implication type, which is one of the following:

* "==>" - the second statements are true whenever the first statements are true using logical negation
* "<==>" - the second statements are true when the first statements are true, and the first statements are true when the second statements are true using logical negation
* "~~>" - the second statements are true whenever the first statements are true using negation as failure
* "<~~>" - the second statements are true when the first statements are true, and the first statements are true when the second statements are true using negation as failure

The implication operators is rarely used except in advanced applications.

Implication operators using negation as failure can only be used in the conditions of a rule or in a query. Please see the logic section of the beginners guide for more information.

