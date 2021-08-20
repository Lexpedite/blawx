---
title: "Customized Attribute Selector Block"
parent: Categories
---
# Customized Attribute Selector Block
![customized attribute selector block]({{ site.baseurl }}/img/customized_attribute_selector.png "Customized Attribute Selector Block")

A Customized Attribute Selector Block serves exactly the same purpose as an attribute selector block, except that you must determine from the text provided which input connector is for the object, and which is for the value.

For example, if the customized attribute selector block reads "there are __ legs on a __", and the relevant attribute is called "legs", it accepts a number, and it is an attribute on the "creature" category, then the first blank accepts a numerical value (or variable), and the second blank accepts an object (or variable). If the block reads "a __ has __ legs", the opposite is true.

Customized Attribute Selector blocks are used to make your Blawx code easier to read. They are created when you use the [Attribute Customization Block]({{ site.baseurl }}/docs/blocks/attribute_customization/).

See the [Attribute Customization]({{ site.baseurl }}/docs/pages/categories_and_objects/#attribute-customization) section of the Beginner's Guide for more examples.
