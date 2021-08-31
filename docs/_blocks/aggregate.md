---
title: "Aggregate Block"
parent: Number Statements
---
# Aggregate Block
![aggregate block]({{ site.baseurl }}/img/aggregate.png "Aggregate Block")

The Aggregate Block is available in the "Number" section of the "Data Statements" drawer in the Toolbox.

It accepts the name of an aggregate, a variable, and then a set of statements that include the named variable. It returns the aggregate applied to the variable in all of the valid answers to the statements. The variable must resolve to a numerical value in the statements provided.

The aggregate is one of "minimum", "maximum", "count", "average", and "sum". There are also options for "distinct count", "distinct average", and "distinct sum", which will ignore duplicates in the returned results.