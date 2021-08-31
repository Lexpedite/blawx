---
title: Integration API
parent: Advanced Topics
---
# Integration
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

The Blawx Reasoner API is located at `/reasoner.py` on your Blawx server. It accepts urlencoded POST requests, and expects two parameters: `code`, and `data`. Code is set to the contents of a `.blawx` file. Data is set to a JSON package of data.

Blawx will process the JSON package by converting it into a data dictionary block. For testing purposes, and to refer to the elements of the data packet in your Blawx code, see the documentation on modeling [external data](/docs/pages/external_data).

Just like the Blawx interface, the API will respond only to the first question it finds. The output is a JSON block is structured as follows:

```
{
  'main': 'Yes'|'No'
  '1': {
    variable1: value1,
    variable2: value2,
    ...
    variablen: valuen
  }
  ...
  'n': {
    ...
  }
}
```

If the question was a yes/no question, the only property returned will be ‘main’, with the answer the reasoner got.

If the question was a search that returned no results, the only thing returned will be ‘main’, which will have the value ‘No’.

If the question was a search that returned results, each result will be enumerated, and each non-silent variable in the question will be listed as a property of that result.

For a working example, take a look at the Blawx module for [docassemble](/docs/pages/docassemble).