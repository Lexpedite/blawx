---
title: Simulating External Data
parent: Advanced Topics
---
# Simulating External Data
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## How Blawx Processes External Data

When external data is sent to the Blawx API as JSON, it is translated into a single object,
with the name "data". All of the elements of the JSON object will be created as attributes
of the "data" object. If it is a named field, the property will have the given name. However,
sub-objects in the JSON are created as objects in Blawx but are left unnamed.


So if you submit the following JSON data package:

```
{
 'foo': 'bar'
}
```

Blawx will create an object named “data”, with an attribute named ‘foo’, the value of which is set to ‘bar’.

If you submit the following JSON data package:

```
{
 foo: {
  'this': 'that',
  'one': 1
 }
}
```

Blawx will create an object called data, with an attribute named ‘foo’. It will also create a second object, which will be set as the value of “foo” for the object "data". That second object will have two attributes, named “this” and “one”, with the values indicated. The second object will not have a human-readable name.

## Simulating External Data in Blawx

When you want to test Blawx code that will use data sent to the reasoner, you can use the "Data"
drawer of the toolbox to simulate JSON data inside your workspace.

For example, the above JSON data could be represented like this:

![JSON example]({{site.baseurl}}/img/json_example.png)

This is done using the data object block, the data list block, and the data value block. 

### The Data Object Block

![data object]({{site.baseurl}}/img/data_object.png)

This is the data object block. It creates an object with the name that you give it, which is “data” by default. “Data” is also the name given by the Blawx Reasoner to data it receives over the API.

The “data” object created by this block will be visible in the Known Objects drawer of the toolbox.

The data object block needs to be placed inside a Fact block to work properly.

Inside the data object block, you can place data value blocks, and data list blocks.

### Data Value Block

A data value consists of a name and a value assigned to that name, and looks like this:

![data value block]({{site.baseurl}}/img/data_value.png)

Any name can be used, and it will accept any type of value, but not variables.

### Data List Block

A sub-dictionary looks like this, and works in the same way as a data object block except that it does not have a name.

![data list]({{site.baseurl}}/img/data_list.png)

Data list blocks also accept both data values and data lists.

## Referring to External Data in Blawx

When referring to external data in Blawx, whether actual or simulated, you need to be able to refer to the objects
and the attributes. That can be done by including the data object block in your code, so as to create a "data" known object, and then by using the data attribute block.

For example, if you wanted to check whether the value of 'one' in the object which is the value of 'foo' is greater than 0, you could do it like this:

![data property example]({{site.baseurl}}/img/data_property_example.png)

In the example above we are asking a question, but the same technique can be used to refer to external data in your rule conditions.

Note that the data attribute block works in exactly the same way as any other attribute block, except that it allows you to type in the name of an attribute that may not be defined anywhere in your workspace. If you type in the name of an attribute that is defined in a category, it will work as though you had used that attribute selector block.

However, it is recommended that you only use the data attribute block for dealing with real or simulated externally-submitted data. Using the standard object attribute selector blocks helps to avoid errors in writing your code caused by typos, and makes your code easier to read.

If you put the name of an attribute that is not defined anywhere in a Category and does not exist in the data, Blawx cannot tell that it was a mistake, and your code will fail silently.

## Working with Categories in External Data

Real and simulated external data do not include Category information. If your rules rely on Categories, you will need to create rules which will assign Categories to those objects.