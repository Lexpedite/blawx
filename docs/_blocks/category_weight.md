---
title: "Category Weight Block"
parent: Categories
---
# Category Weight Block
![category weight block]({{ site.baseurl }}/img/category_weight.png "Category Weight Block")

The category weight block allows you to assign a "weight" value (an integer 0 or higher) to
a category declared in a new category block directly above it.

Currently, the "weight" is not used for anything, and the block will not affect your code.

In future versions, category weights will be used to automatically generate a hierarchical
data structure for use in 
collecting information from a user in an expert system interface. Categories with a lower
weight will be the "containers" of categories with higher weights when there is an attribute
that links them. Attribute that refer to categories already "contained" by another category
will be changed into object references, and collected only after all the facts in the
relevant categories have been collected.

For example, imagine your Blawx code has two data structures, House, and Person. There is
also a "lives in" attribute for Person that refers to exactly one house.

An expert system collecting information in that structure might ask "who are you?" and then "where do you live?" In that case "house" is contained inside "person." Or, it might ask "Tell me about a house?" and then "Who lives in it?" In that case, "person" is contained inside "house".

Because Blawx attribute references can be circular (e.g. Category A has an attribute that refers to an object in Category B, Category B has an attribute that refers to an object in Category C, and Category C has an attribute that refers to an object in Category A) the software cannot reliably guess
from the Blawx categories alone how that interface should be created. Adding weights to categories allows the user to quickly and easily correct bad guesses.