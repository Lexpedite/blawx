---
title: "Attribute Customization Block"
parent: Categories
---
# Attribute Customization Block
![attribute_customization block]({{ site.baseurl }}/img/attribute_customization.png "Attribute Customization Block")

The attribute customization block allows you to change how an attribute will be displayed to the user.

The block consists of two parts. The top of the block gives the order in which the name of the object and the name of the value should appear in the text, either "object, then value", or "value, then object".

The bottom of the block allows you to provide the text that should appear before, between, and after the two names.

For example, if you have a category called "Creature", with an attribute called "legs", which is exactly one number value, you might want that displayed as "a spider has 8 legs".  "Spider" is the name of the object, and "8" is the name of the value. So you would choose "object, then value". In the bottom of the block you would use the text "a", "has", and "legs" in the three spaces.

See the [Attribute Customization]({{ site.baseurl }}/docs/pages/categories_and_objects/#attribute-customization) section of the Beginner's Guide for more examples.

## Where It Can Be Used

An Attribute Selector block can only placed immediately following an attribute declaration block, and refers to the attribute declaration directly above it.