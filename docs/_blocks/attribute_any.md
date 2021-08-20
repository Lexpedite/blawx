---
title: "New Attribute Any Block"
parent: Categories
---
# New Attribute Any Block
![attribute_any block]({{ site.baseurl }}/img/attribute_any.png "New Attribute Any Block")

The New Attribute Any Block is used to create an attribute inside a [Category Attribute Block]({{ site.basurl}}/docs/blocks/category_attribute/).

This block is used to indicate that there is no specific number of values that each object in this category is expected to have in this attribute.

The New Attribute Any Block is equivalent to using the [New Attribute Or More Block]({{ site.baseurl }}/docs/blocks/new_attribute_or_more/), and setting the value of that block to 0. "Any" is equivalent to "zero or more."

Note that Blawx does not currently use the cardinality values expressed in New Attribute blocks. In future versions, compliance with cardinality requirements will be possible at run-time, and the cardinalities will be used to simplify the creation of expert system user interfaces.