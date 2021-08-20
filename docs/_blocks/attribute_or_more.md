---
title: "New Attribute X or More Block"
parent: Categories
---
# New Attribute X or More Block
![attribute_or_more block]({{ site.baseurl }}/img/attribute_or_more.png "New Attribute X or More Block Block")

The New Attribute X or More Block is used to create an attribute inside a [Category Attribute Block]({{ site.basurl}}/docs/blocks/category_attribute/).

It accepts an integer value of 0 or higher. It indicates that the code is expecting a minimum of that number of values for this attribute for each object in the category. Setting the value to 0 is equivalent to using the [New Attribute Any Block]({{ site.baseurl }}/docs/blocks/new_attribute_any/).

Note that Blawx does not currently use the cardinality values expressed in New Attribute blocks. In future versions, compliance with cardinality requirements will be possible at run-time, and the cardinalities will be used to simplify the creation of expert system user interfaces.