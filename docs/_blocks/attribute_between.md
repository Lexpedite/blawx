---
title: "New Attribute Between Block"
parent: Categories
---
# New Attribute Between Block
![attribute_between block]({{ site.baseurl }}/img/attribute_between.png "New Attribute Between Block")

The New Attribute Between Block is used to create an attribute inside a [Category Attribute Block]({{ site.basurl}}/docs/blocks/category_attribute/).

This block is used to indicate that there are a minimum and maximum expected number of values. The first field accepts an integer of 0 or more. The second field accepts an integer of 1 or more. The second field must be equal to or higher than the first integer. If the two values are equal, that is equivalent to using the [New Attribute Exactly Block]({{ site.baseurl }}/docs/blocks/new_attribute_exactly/).

Note that Blawx does not currently use the cardinality values expressed in New Attribute blocks. In future versions, compliance with cardinality requirements will be possible at run-time, and the cardinalities will be used to simplify the creation of expert system user interfaces.