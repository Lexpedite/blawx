---
title: "Category Equivalence Block"
parent: Categories
---
# Category Equivalence Block
![category equivalence block]({{ site.baseurl }}/img/category_equivalence.png "Category Equivalence Block")

The Category Equivalence block accepts two category selector blocks from the Known Categories drawer of the toolbox, and allows you to specify that all members of the first category are also members of the second category.

This might be used to create hierarchical categories, such as "all Cats are also Mammals".

Note that the equivalence relationships is one direction only. Members of the first category will be treated as though they were members of the second category, but not vice-versa.

If you wish to say "all Cats are Mammals, and all Mammals are Cats", you will need to ues two Category Equivalence Blocks.