---
title: Categories, Objects, and Attributes
parent: Beginners Guide to Blawx
nav_order: 3
---
# Categories, Objects, and Attributes
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

Categories, Objects, and Attributes are how Blawx organizes what it knows about the world.

A Category is a type of object. For example, "Car."

A Category has Attributes, which are names for things that you can know about things in that Category. Attributes also describe the type of data that can go in that attribute. For example, "a car has a model name, which is text."

An Object is a specific thing in the world you want to model. An object can have
any number of categories. An Object has the same attributes as all of the categories it belongs to, which hold that information about the object. For example, "my car's make is Ford, and my car's model is 'mustang'."

The information that you put into an object's attribute has to be of
the correct type. You can't put a number if the attribute is supposed to hold text, and vice-versa.

An easy way to think of a Category is as a description of a blank form. The form might have a name, like “Application for a Permit”. That is like the Category name. A form will also have fields that can be filled in, like “Applicant’s Name. Those are like the category’s attributes.

When you create and fill out an actual form of that type, that is like creating an Object. The information that gets put into the blanks on the form are like the values that get put into the attributes of an object. Some fields on the form are for writing words, others numbers, and others dates. Those are like the types of the category attributes.

An attribute can hold either a basic data type, or objects in a category.

The basic data types are text, numbers, yes/no values, dates, times, datetimes, and durations.

Not only can you use your Categories as a type, but you can use your category
as the type of an attribute inside itself!

For example, you can say that a Person has a Name, which is a text value, and they have a friend, which is a Person.

![person friend]({{ site.baseurl }}/img/person_friend.png)

## Categories

### Creating Categories
You create a category by putting a category declaration block in a fact block. A category declaration block can be found under the “Categories” drawer in the Toolbox.

![default category]({{ site.baseurl }}/img/default_is_category.png)

When you drag a category declaration block onto the workspace, a corresponding category block is added under the “known categories” drawer of the toolbox. This block is used in blanks that require or allow a Category as a value.

![known category default]({{ site.baseurl }}/img/known_category_default.png)

Note that if you have two category declarations with the same name defined, Blawx will create two different known category blocks with the same text, using either of them has the same effect. So it is best practice not to have duplicates in category names in order to avoid confusion.

Category names should not have spaces in them. Blawx will not stop you from creating
a category with a space in its name, but it is unlikely to work properly.

### Adding Attributes to a Category
Once you have declared a Category, you can use an category attribute block to give it one or more attributes. The category attribute block can be found in the “Categories” drawer of the toolbox, and looks like this:

![attribute declaration]({{ site.baseurl }}/img/attribute_declaration.png)

To complete a category attribute block, you must provide the category that you are defining attributes for, and add new attribute blocks. The category attribute block comes with new attribute block by default, but you can add more by dragging additional new attribute blocks from the “Categories” drawer of the toolbox.

For example, to say that “a person has a name and a best friend” you might set out an attribute declaration block like this:

![person ontology]({{ site.baseurl }}/img/person_ontology.png)

Remember, all of this needs to be placed in a Fact block to work properly. Fact blocks are explained in the next section.

### Attribute Cardinality

It is sometimes important to have an answer to the question "how many values
is this attribute supposed to have?" For example, if a person has more than one
birthdate, something has probably gone wrong. But if they have more than one
friend, that is just good news.

Blawx provides five different new attribute blocks to allow you to specify
different answers to the question of "how many value should this attribute have"?

The options are "exactly X", "up to X", "X or more", "between X and Y", or "any
number." Using the "any number" block has the same meaning as "0 or more."

![exactly x]({{ site.baseurl }}/img/attribute_exactly.png)
![up to X]({{ site.baseurl }}/img/attribute_up_to.png)
![or more]({{ site.baseurl }}/img/attribute_or_more.png)
![between]({{ site.baseurl }}/img/attribute_between.png)
![any]({{ site.baseurl }}/img/attribute_any.png)

Blawx allows you to specify cardinality, but it does not
do anything to enforce it in your code. That encorcement can be done,
but is an advanced technique, and doesn't happen
by default. The primary motivation for including cardinality in your
data structures is for automatically generating user interfaces. Without this
information a tool that was generating a user interface on the basis of your
Blawx code might ask something like "do you have any *other* birthdays?"

### Attribute Customization

By default, when you create an attribute using the above blocks, an attribute
selector block will be created that looks like this...

![default attribute selector]({{site.baseurl}}/img/default_attribute_selector.png)

... where the text "attribute_name" is replaced with the text that you have provided.

This may not be the most intuitive way of describing the relationship, however. If
you want to customize how the attribute selector will appear, you can use the
attribute customization block. The only place an attribute customization block can
be used is under an attribute declaration block, and it applies only to the attribute
declared directly above it.

The attribute customization block looks like this:

![attribute customization block]({{site.baseurl}}/img/attribute_customization.png)

The block allows you to choose the order in which the object and the value are
included, and the text that should appear before, between, and after them. By default
the order is "object, then value". And the words "object" and "value" appear in that
order below. If you change the order to "value, then object" in the dropdown, the
illustration below the dropdown field will be updated, like this:

![reverse order customization]({{site.baseurl}}/img/reversed_order_attribute_customization.png)

Once you have selected the order that you want the object and the value to appear,
you can specify the text that appears before, between, and after them. For example,
imagine that you have a category called "Animal" and an attribute called "legs" that
was supposed to hold how many legs the animal has.  

Here are three different ways you might want your
customized attribute block to appear, and how to
achieve that effect using the attribute customization block:

* "The animal has N legs"
  * Order: object, then value
  * Before: "The"
  * Between: "has"
  * After: "legs"
* "There are N legs on a(n) animal"
  * Order: value, then object
  * Before: "There are"
  * Between: "legs on a(n)"
  * After: Empty
* "N is the number of legs on a(n)"
  * Order: value, then object
  * Before: Empty
  * Between: "is the number of legs on a(n)"
  * After: Empty

Here's what the second example above looks like in the interface:

![customization example]({{site.baseurl}}/img/attribute_customization_example.png)

And here is what the resulting attribute selector block will look like:

![customized attribute selector]({{site.baseurl}}/img/customized_attribute_selector.png)

**BE CAREFUL!**

If you leave all three fields blank, Blawx will still know what attribute the
block is for, but your users will have no clue. Make sure to customize attribute
blocks in ways that sound natural to your users, but are also very clear about which
attribute is being modified.

That said, there is no need for your attribute name
to appear in the text, which can allow you to use
more concise attribute names.

### Category Equivalence
An object can have more than one category. One of the ways you can give an object more than one category is by stating that all objects of one category are also included in another category. For example, “all cats are mammals”.

In Blawx you can do this using the category equivalence block, which looks like this:

![category equivalence]({{ site.baseurl }}/img/category_equivalence.png)

The category equivalence block requires two category blocks from the “Known Categories” drawer of the Toolbox. A complete category equivalence block would look like this:

![cat is mammal]({{ site.baseurl }}/img/cat_is_mammal.png)

Category equivalence works in one direction only. In this example, if you create an object, and give that object the category “Cat”, and then ask whether that object is in the category “Mammal”, the answer will be yes. If you create an object and give it only the category of “Mammal”, and then ask whether it is in the category “Cat”, the answer will be no.

## Objects

### Creating an Object
An object is created by using the object declaration block, which looks like this, and it just takes a name for the object.

![bob is object]({{ site.baseurl }}/img/bob_is_object.png)

Object names should not have spaces in them. Blawx will not stop you from creating
an object with a name that has spaces in it, but it is unlikely to work properly.

When you drag an object declaration onto the Workspace, a corresponding Object Block appears in the “Known Objects” drawer of the Toolbox.

![bob known]({{ site.baseurl }}/img/known_object_bob.png)

The object block for “Bob” can be used anywhere a block is expecting an or accepts an object as a value.

### Giving an Object a Category
You give an object a category by using the object category block, which can be found in the “Objects” drawer of the Toolbox. It expects an object block and a category block. A completed object category block that says “Bob is a Person” looks like this.

![bob is person]({{ site.baseurl }}/img/bob_is_person.png)

### Making Two Objects the Same Object
Sometimes your Blawx code will get data from more than one source, and each source may create its own versions of the same objects. In those cases, it can be useful to state that two objects are the same object. You can do that using the object equivalence block, which is found in the “Objects” drawer of the Toolbox, and which looks like this:

![object identity]({{ site.baseurl }}/img/object_equivalence.png)

The object equivalence block takes two object blocks. To say that “Bob” and “Robert” are the same object, you could do this:

![bob and robert]({{ site.baseurl }}/img/bob_and_robert_identical.png)

Note that unlike with the Category Equivalence, which goes in one direction only, object equivalence goes in both directions. If Bob is the same object as Robert, Robert is the same object as Bob. So if you set out Bob’s Middle name, and then say that Bob and Robert are the same object, asking for Bob’s middle name and asking for Robert’s middle name will both work.

### Adding Attributes to an Object

Let’s imagine you want to write some rules about cars, and you have an ontology like this:

![car ontology]({{ site.baseurl }}/img/car_ontology.png)

You can see that two attributes have been defined for the category “Car”. One is “make”, and its type is “Manufacturer”, which is a category. The other attribute is “model”, which has a data type of text.

If you make these declarations, Blawx will now know about these two attributes, and they will be available in the Known Attributes drawer of the toolbox.

![known attributes]({{ site.baseurl }}/img/car_ontology_known_attributes.png)

The first connector expects an object, and the second hole is filled with a value. So to create a Ford Mustang, you might use the following blocks in a Fact Block:

![ford mustang]({{ site.baseurl }}/img/ford_mustang.png)

This creates an object called “my_car”, places it in the category “Car”, gives it the make “Ford”, and the model “Mustang.” If you try to place something in the value of the make attribute block that is not an object or a variable, it will not fit because Blwx knows that value is supposed to be an object in the category Manufacturer.

If you try to place something other than a string or an object or variable into the “model” attribute block, it will not fit, because Blawx knows that attribute is supposed to have a text value. Objects can still be provided because Blawx treats objects and variables as the same “type”, and a variable may contain a text value.

### Naming Attributes

Attribute names should not have spaces in them. Blawx will not currently
stop you from creting attribute names with spaces, but they are unlikely to work
properly.

When working with attributes you will want to be careful with how you name them. Blawx will not stop you from applying an attribute defined for “cars” to an object inthe category “bicycle”. If you need to know how many seats both categories have, but you want to avoid the implication that bikes have car seats or vice-versa, you may want to name the attributes “Bike_seats” and “car_seats” to make it clear what you are referring to.

If you create two attributes both named “seats”, they will both appear in the Known Attributes drawer of the toolbox, but it will not be possible to tell which attribute belongs to which category, and in fact, Blawx will treat them as two copies of the same attribute.

You may also want to name attributes so that their names fit more comfortably into the syntax of the attribute block, which is “object’s attribute is value”. For example, an attribute named “father” makes sense, if you have objects named Anakin and Luke: “Luke’s father is Anakin.” But it may be more difficult to read a yes/no attribute named “Jedi”. “Luke’s Jedi is True.” Something like “is_a_Jedi” might read more clearly.

### Object Attributes Hold Multiple Values By Default

In Blawx, because cardinality is not enforced by default, all object attributes can hold more than one value. As a result, it can be helpful to name your attributes in a way that implies how many values they are supposed to have. For instance, a game may have many players. So a game category might have an attribute called “players” to help the user recall that the attribute may have more than one value. Likewise, a category called “world_record_holder” may have an attribute that refers to the player holding that record, of which there is only one, so it may make sense to call that attribute “player” instead of “players.”