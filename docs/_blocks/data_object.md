---
title: "Data Object Block"
parent: Data Structues
---
# Data Object Block
![data object block]({{ site.baseurl }}/img/data_object.png "Data Object Block")

The Data Object Block is used to create an object that duplicates how external data will be provided to the Blawx API.  Using the Data Object Block creates a "Known Object" block with the same name that can be used in code to refer to that external data. It accepts the name of the data object, which defaults to "data", and a list of data lists or data values.  The values of those properties can then be tested in code using the data attribute block.