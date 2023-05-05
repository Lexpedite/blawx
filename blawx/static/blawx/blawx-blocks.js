scasp_blockset = [{
  "type": "variable",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "variable_name",
      "text": "A"
    }
  ],
  "output": "VARIABLE",
  "colour": 60,
  "tooltip": "Use this block to match to an object or data value.",
  "helpUrl": "/docs/blocks/variable/"
},
{
  "type": "silent_variable",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAzElEQVR4AWOgG/j//78zEJuQokEDiOvRxHYD8e//EDCbWIPqoRr6oXwZqCHBQFwMxN+BWIJYw/rRDAuG0gpQcQcQnyzDcBlErsskoN50ICe2JqN7E4htiNVsAMT7gZgDyv6PxZsyUDUy+AwSgWq0gPIvoxsGpHWA+DMQ8xBy1XaojSxQl8UD8XI0wzRwGoAWQ6+hiVEHKsYCsQBhGGGACIfdUI3voYnxN8SrCMNIMhCq+Two/GBJg1zD9oMwjnRWT2ri7MeRNzUYBi0AANQgbf4Gx9YVAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "(mute)",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "variable_name",
      "text": "A"
    }
  ],
  "output": "VARIABLE",
  "colour": 60,
  "tooltip": "Use to match to a variable that can be re-used, but isn't reported in queries.",
  "helpUrl": "/docs/blocks/silent_variable/"
},
{
  "type": "unnamed_variable",
  "message0": "any",
  "output": "VARIABLE",
  "colour": 60,
  "tooltip": "Use to match any object or value where you do not need to re-use the variable, or report it in a query.\"",
  "helpUrl": "/docs/blocks/unnamed_variable/"
},
{
  "type": "variable_assignment",
  "message0": "%1 is set to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "variable",
      "check": "VARIABLE"
    },
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 60,
  "tooltip": "Use to give the variable in the first input the value in the right input.",
  "helpUrl": "/docs/blocks/variable_assignment/"
},
{
  "type": "conjunction",
  "message0": "all of %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "conjoined_statements",
      "check": "OUTER"
    }
  ],
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 285,
  "tooltip": "All the statements listed are true with regard to the same variables. Usually required only inside an \"or\" block. See help for more information.",
  "helpUrl": "/docs/blocks/all_of/"
},
{
  "type": "disjunction",
  "message0": "any of %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "disjoined_statements",
      "check": "OUTER"
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 285,
  "tooltip": "Use to check whether any of the contained statements is true. To combine statements, use an \"all of\" inside this block.",
  "helpUrl": "/docs/blocks/any_of"
},
{
  "type": "logical_negation",
  "message0": "it is false that %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "negated_statement",
      "check": "OUTER"
    }
  ],
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 285,
  "tooltip": "Use to match if the statements are known false. Usually, you will want to use the \"not\" block. See help for details.",
  "helpUrl": "/docs/blocks/known_false"
},
{
  "type": "default_negation",
  "message0": "there is no evidence that %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "default_negated_statement",
      "check": "OUTER"
    }
  ],
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 285,
  "tooltip": "Use to match if the statements are not known to be true.",
  "helpUrl": "/docs/blocks/not"
},
{
  "type": "comparison",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "first_comparator",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "operator",
      "options": [
        [
          "is the same value as",
          "eq"
        ],
        [
          "is a different value than",
          "neq"
        ],
        [
          "is less than",
          "lt"
        ],
        [
          "is greater than",
          "gt"
        ],
        [
          "is less than or the same value as",
          "lte"
        ],
        [
          "is greater than or the same value as",
          "gte"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "second_comparator",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 285,
  "tooltip": "Use to match when the comparison of the two values is true.",
  "helpUrl": "/docs/blocks/comparison/"
},
{
  "type": "fact",
  "message0": "According to %1 We know %2",
  "args0": [
    {
      "type": "input_value",
      "name": "source",
      "check": "RULE"
    },
    {
      "type": "input_statement",
      "name": "statements",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to make statements that are known to be true, and create categories and objects.",
  "helpUrl": "/docs/blocks/fact/"
},
{
  "type": "query",
  "message0": "Is it true that: %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "query",
      "check": "OUTER"
    }
  ],
  "colour": 270,
  "tooltip": "Use to ask the reasoner to find scenarios in which the included statements are all true.",
  "helpUrl": "/docs/blocks/question/"
},
{
  "type": "rule",
  "message0": "According to %1 When we know: %2 We also know: %3",
  "args0": [
    {
      "type": "input_value",
      "name": "source",
      "check": "RULE"
    },
    {
      "type": "input_statement",
      "name": "conditions",
      "check": "OUTER"
    },
    {
      "type": "input_statement",
      "name": "conclusion",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to set out the conclusions that can be drawn from a rule.",
  "helpUrl": "/docs/blocks/rule/"
},
{
  "type": "unattributed_rule",
  "message0": "When we know: %1 %2 We also know: %3 %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "conditions",
      "check": "OUTER"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "conclusion",
      "check": "OUTER"
    }
  ],
  "colour": 270,
  "tooltip": "Use to set out the conclusions that can be drawn without attributing them to a rule.",
  "helpUrl": "/docs/blocks/rule/"
},
{
  "type": "legal_doc",
  "message0": "§ %1 reads: %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "legal_doc_name",
      "text": "document"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "divisions",
      "check": "DOCPART"
    }
  ],
  "inputsInline": true,
  "colour": 165,
  "tooltip": "Use to create a legal document that can be referred to in rules.",
  "helpUrl": "/docs/blocks/legal_doc/"
},
{
  "type": "legal_doc_node",
  "message0": "§ %1 reads: %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "node_name",
      "text": "section"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "sub_parts",
      "check": "DOCPART"
    }
  ],
  "previousStatement": [
    "LEGALDOC",
    "DOCPART"
  ],
  "nextStatement": "DOCPART",
  "colour": 165,
  "tooltip": "Use to create a part of a legal document that has sub-parts and a name.",
  "helpUrl": "/docs/blocks/legal_doc_node"
},
{
  "type": "legal_doc_text",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "legal_doc_text",
      "text": "text"
    }
  ],
  "previousStatement": [
    "LEGALDOC",
    "DOCPART"
  ],
  "nextStatement": "DOCPART",
  "colour": 165,
  "tooltip": "Use to create a part of a legal document that does not have sub-parts.",
  "helpUrl": "/docs/blocks/legal_doc_leaf"
},
{
  "type": "doc_selector",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "doc_part_name",
      "text": "Old Age Act, section 4(a)"
    }
  ],
  "output": "RULE",
  "colour": 165,
  "tooltip": "Use to refer to a section of a legal document in a rule or override statement.",
  "helpUrl": "/docs/blocks/section_selector/"
},
{
  "type": "overrules",
  "message0": "the conclusion in  %1 that %2 overrules the conclusion in %3 that %4",
  "args0": [
    {
      "type": "input_value",
      "name": "defeating_rule",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "defeating_statement",
      "check": "OUTER"
    },
    {
      "type": "input_value",
      "name": "defeated_rule",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "defeated_statement",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "previousStatement": "OUTER",
  "colour": 165,
  "tooltip": "Use to indicate that one rule overrides another rule.",
  "helpUrl": "/docs/blocks/overrules/"
},
{
  "type": "object_equality",
  "message0": "%1 and %2 are the same object",
  "args0": [
    {
      "type": "input_value",
      "name": "first_object",
      "check": [
        "VARIABLE",
        "OBJECT"
      ]
    },
    {
      "type": "input_value",
      "name": "second_object",
      "check": [
        "VARIABLE",
        "OBJECT"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 225,
  "tooltip": "Use to indicate two variables or objects refer to the same object.",
  "helpUrl": "/docs/blocks/object_equality/"
},
{
  "type": "object_disequality",
  "message0": "%1 and %2 are not the same object",
  "args0": [
    {
      "type": "input_value",
      "name": "first_object",
      "check": [
        "VARIABLE",
        "OBJECT"
      ]
    },
    {
      "type": "input_value",
      "name": "second_object",
      "check": [
        "VARIABLE",
        "OBJECT"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 225,
  "tooltip": "Use to indicate two variables or objects do not refer to the same object.",
  "helpUrl": "/docs/blocks/object_disequality/"
},
{
  "type": "object_category",
  "message0": "%1 is in the category %2",
  "args0": [
    {
      "type": "input_value",
      "name": "object",
      "check": [
        "OBJECT",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "category",
      "check": "CATEGORY"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 225,
  "tooltip": "Use to add a category to an object.",
  "helpUrl": "/docs/blocks/object_category/"
},
{
  "type": "include",
  "message0": "Include: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "filename"
    }
  ],
  "colour": 270,
  "tooltip": "Use to include the statements from a Blawx workspace at the given URL in this workspace without repeating them.",
  "helpUrl": "/docs/blocks/include/"
},
{
  "type": "unattributed_fact",
  "message0": "We know %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statements",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to make statements that are known to be true, and create categories and objects.",
  "helpUrl": "/docs/blocks/fact/"
},
{
  "type": "constraint",
  "message0": "According to %1 it is never the case that: %2",
  "args0": [
    {
      "type": "input_value",
      "name": "source",
      "check": "RULE"
    },
    {
      "type": "input_statement",
      "name": "conditions",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to set out a set of statements that are never true at the same time.",
  "helpUrl": "/docs/blocks/constraint/"
},
{
  "type": "unattributed_constraint",
  "message0": "It is never the case that: %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "conditions",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to set out a set of statements that are never true at the same time without attributing it to a rule..",
  "helpUrl": "/docs/blocks/constraint/"
},
{
  "type": "category_declaration",
  "message0": "%1 is a Category",
  "args0": [
    {
      "type": "field_input",
      "name": "category_name",
      "text": "default"
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": [
    "STATEMENT",
    "CATEGORY_DISPLAY"
  ],
  "colour": 15,
  "tooltip": "Use to create a category.",
  "helpUrl": "/docs/blocks/new_category/"
},
{
  "type": "category_equivalence",
  "message0": "A %1 is also a %2",
  "args0": [
    {
      "type": "input_value",
      "name": "first_category",
      "check": "CATEGORY"
    },
    {
      "type": "input_value",
      "name": "second_category",
      "check": "CATEGORY"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 15,
  "tooltip": "Use to indicate that members of the first category are members of the second category.",
  "helpUrl": "/docs/blocks/category_equivalence/"
},
{
  "type": "category_attribute",
  "message0": "A %1 has attributes %2",
  "args0": [
    {
      "type": "input_value",
      "name": "category",
      "check": "CATEGORY"
    },
    {
      "type": "input_statement",
      "name": "attributes",
      "check": "ATTRIBUTE"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 15,
  "tooltip": "Use to add attributes to a category",
  "helpUrl": "/docs/blocks/category_attribute/"
},
{
  "type": "attribute_declaration",
  "message0": "%1 which is any number of %2",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute_name",
      "text": "attribute name"
    },
    {
      "type": "input_value",
      "name": "attribute_type",
      "check": [
        "CATEGORY",
        "TYPE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": "ATTRIBUTE",
  "nextStatement": [
    "ATTRIBUTE",
    "ATTRIBUTE_DISPLAY"
  ],
  "colour": 45,
  "tooltip": "Use to create an attribute for a category.",
  "helpUrl": "/docs/blocks/new_attribute/"
},
{
  "type": "attribute_display",
  "message0": "Appearing as %1 %2 %3 %4 %5 %6 %7 %8 %9",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "order",
      "options": [
        [
          "object, then value",
          "ov"
        ],
        [
          "value, then object",
          "vo"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "field_label_serializable",
      "name": "first_element",
      "text": "object"
    },
    {
      "type": "field_input",
      "name": "infix",
      "text": "'s attribute_name is"
    },
    {
      "type": "field_label_serializable",
      "name": "second_element",
      "text": "value"
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": ""
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    }
  ],
  "previousStatement": "ATTRIBUTE_DISPLAY",
  "nextStatement": "ATTRIBUTE",
  "colour": 45,
  "tooltip": "Use to customize how the attribute will be displayed in Blawx.",
  "helpUrl": "/docs/blocks/attribute_display/"
},
{
  "type": "category_selector",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "category_name",
      "text": "default"
    }
  ],
  "output": "CATEGORY",
  "colour": 15,
  "tooltip": "Use to refer to a category.",
  "helpUrl": "/docs/blocks/category_selector/"
},
{
  "type": "object_selector",
  "message0": "%1",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "object_name",
      "text": "default"
    }
  ],
  "output": "OBJECT",
  "colour": 225,
  "tooltip": "Use to refer to an object.",
  "helpUrl": "/docs/blocks/object_selector/"
},
{
  "type": "object_declaration",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "object_name",
      "text": "default"
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "is a category"
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 225,
  "tooltip": "Use to create an object.",
  "helpUrl": "/docs/blocks/new_object/"
},
{
  "type": "category_display",
  "message0": "Appearing as: %1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "field_label_serializable",
      "name": "first_element",
      "text": "object"
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": "is a category"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    }
  ],
  "previousStatement": "CATEGORY_DISPLAY",
  "nextStatement": "STATEMENT",
  "colour": 15,
  "tooltip": "Use to customize how a category is displayed.",
  "helpUrl": "/docs/blocks/category_display/"
},
{
  "type": "true_false_type_selector",
  "message0": "%1 True / False",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABE0lEQVR4AbTTgWYDQRAG4KIogiAIiiAIgiCAQzkUARQQBHmM4gBFEUBRBFAUAfQB8gAFFBAEARyCw+ErDI5bd4r+LHasb8eOvfn34A45NrEy3P4FGGGHSjslCgz6kBlOgA+sMccEK3wCvjFOI4xxxgWrjssecQ2s3Rn2qLDo6XqIDaBIdVPjtQd5QoklvlBqDgBrwLwHqXHEAFtA1jxUQHP0XUjUFoBNC8IAS1yQJZEI7gHbJrQFZIEdcUXRQiLIAXmzOAG8xD4wWkgE76gQzxDBATUWDWyXRixRY5eayhQlfjDpmN4DLjhhlD5EhjLWM6ZRHyLHG+CMWd9/m+IgnRp7jH9HSimgAI3NeiiOBhtAawAAtsUaDV9xaDsAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Checkmark",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to indicate that an attribute should have the values true or false.",
  "helpUrl": "/docs/blocks/true_false/"
},
{
  "type": "number_type_selector",
  "message0": "%1 Number",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to indicate that an attribute should be a number.",
  "helpUrl": "/docs/blocks/number/"
},
{
  "type": "date_type_selector",
  "message0": "%1 Date",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to indicate that an attribute should be a date.",
  "helpUrl": "/docs/blocks/date"
},
{
  "type": "duration_type_selector",
  "message0": "%1 Duration",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to indicate that an attribute should be a duration.",
  "helpUrl": "/docs/blocks/duration"
},
{
  "type": "number_value",
  "message0": "%1",
  "args0": [
    {
      "type": "field_number",
      "name": "value",
      "value": 0
    }
  ],
  "output": "Number",
  "colour": 240,
  "tooltip": "Use to specify a number value.",
  "helpUrl": "/docs/blocks/number_value/"
},
{
  "type": "true_value",
  "message0": "True",
  "output": "Boolean",
  "colour": 195,
  "tooltip": "Use to specify the value 'true'.",
  "helpUrl": "/docs/blocks/true/"
},
{
  "type": "false_value",
  "message0": "False",
  "output": "Boolean",
  "colour": 195,
  "tooltip": "Use to specify the value 'false'.",
  "helpUrl": "/docs/blocks/false/"
},
{
  "type": "date_value",
  "message0": "%1 %2 / %3 / %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_number",
      "name": "year",
      "value": 2000,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "month",
      "value": 1,
      "min": 1,
      "max": 12,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "day",
      "value": 1,
      "min": 1,
      "max": 31,
      "precision": 1
    }
  ],
  "output": "DATE",
  "colour": 330,
  "tooltip": "Use to specify a date value.",
  "helpUrl": "/docs/blocks/date_value/"
},
{
  "type": "duration_value",
  "message0": "%1 %2 days, %3 hours, %4 minutes, %5 seconds",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "sign",
      "options": [
        [
          "+",
          "1"
        ],
        [
          "-",
          "-1"
        ]
      ]
    },
    {
      "type": "field_number",
      "name": "days",
      "value": 0,
      "min": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "hours",
      "value": 0,
      "min": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "minutes",
      "value": 0,
      "min": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "seconds",
      "value": 0,
      "min": 0
    }
  ],
  "output": "DURATION",
  "colour": 330,
  "tooltip": "Use to specify a duration value.",
  "helpUrl": "/docs/blocks/duration_value/"
},
{
  "type": "calculation",
  "message0": "%1 is calculated as %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "variable",
      "check": "VARIABLE"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "calculation",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 240,
  "tooltip": "Use to calculate a number and assign it to a variable.",
  "helpUrl": "/docs/blocks/calculation/"
},
{
  "type": "math_operation",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "left_side",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "operator",
      "options": [
        [
          "+",
          "add"
        ],
        [
          "-",
          "sub"
        ],
        [
          "*",
          "mul"
        ],
        [
          "/",
          "div"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "right_side",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 240,
  "tooltip": "Use to apply a mathematical operator to two numbers.",
  "helpUrl": "/docs/blocks/math_operator/"
},
{
  "type": "date_comparison",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "VARIABLE",
        "DATE",
        "DATETIME"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "comparison",
      "options": [
        [
          "<",
          "lt"
        ],
        [
          "=<",
          "lte"
        ],
        [
          "=",
          "eq"
        ],
        [
          ">=",
          "gte"
        ],
        [
          ">",
          "gt"
        ],
        [
          "≠",
          "ne"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "VARIABLE",
        "DATE",
        "DATETIME"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to compare two date values.",
  "helpUrl": "/docs/blocks/date_comparison"
},
{
  "type": "date_element",
  "message0": "the %1 from %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "element",
      "options": [
        [
          "year",
          "y"
        ],
        [
          "month",
          "m"
        ],
        [
          "day",
          "d"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "date",
      "check": [
        "VARIABLE",
        "DATE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 330,
  "tooltip": "Use to get the year, month, or day value from a date.",
  "helpUrl": "/docs/blocks/date_element/"
},
{
  "type": "date_calculate",
  "message0": "%1 %2 / %3 / %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "year",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "month",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "day",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DATE",
  "colour": 330,
  "tooltip": "Use to create a date value from number values for year (four digits), month, and day.",
  "helpUrl": "/docs/blocks/date_constructor"
},
{
  "type": "duration_calculate",
  "message0": "%1 %2 sign, %3 years, %4 months, %5 days, %6 hours, %7 minutes, %8 seconds",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "sign",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "years",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "months",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "days",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "hours",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "minutes",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "seconds",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DURATION",
  "colour": 330,
  "tooltip": "Use to create a duration value from a number for sign (1 = future, -1 = past), and numbers for years, months, and days.",
  "helpUrl": "/docs/blocks/duration_constructor"
},
{
  "type": "duration_element",
  "message0": "the %1 from %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "element",
      "options": [
        [
          "sign",
          "s"
        ],
        [
          "years",
          "y"
        ],
        [
          "months",
          "m"
        ],
        [
          "days",
          "d"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": [
        "DURATION",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 330,
  "tooltip": "Use to get the sign, years, months, or days value from a duration.",
  "helpUrl": "/docs/blocks/duration_element/"
},
{
  "type": "date_difference_days",
  "message0": "the number of days between %1 %2 and %3 %4 is %5 %6",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "duration_days",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to get the number of days between two dates",
  "helpUrl": "/docs/blocks/days_between"
},
{
  "type": "date_difference",
  "message0": "the duration between %1 %2 and %3 %4 %5 is %6",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": [
        "DURATION",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to get the duration between two dates",
  "helpUrl": "/docs/blocks/duration_between/"
},
{
  "type": "date_add",
  "message0": "adding %1 %2 to %3 %4 gives %5 %6",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": [
        "DURATION",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATETIME",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to calculate the relationship between two dates and a duration.",
  "helpUrl": "/docs/blocks/date_add/"
},
{
  "type": "numerical_constraint",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_comparator",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "operator",
      "options": [
        [
          "<",
          "lt"
        ],
        [
          ">",
          "gt"
        ],
        [
          "=<",
          "lte"
        ],
        [
          ">=",
          "gte"
        ],
        [
          "=",
          "eq"
        ],
        [
          "\\=",
          "ne"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_comparator",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 240,
  "tooltip": "Use to impose a constraint on the relationship between two numbers.",
  "helpUrl": "/docs/blocks/numerical_constraint/"
},
{
  "type": "json_input",
  "message0": "{ %1 %2 }",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "json",
      "check": "JSON_DICT"
    }
  ],
  "colour": 0,
  "tooltip": "Use to simulate JSON input to the reasoner.",
  "helpUrl": "/docs/blocks/json_input/"
},
{
  "type": "json_list",
  "message0": "[ %1 %2 ],",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "json_list_elements",
      "check": [
        "JSON_VALUE",
        "JSON_LIST",
        "JSON_DICT"
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": "JSON_LIST",
  "nextStatement": "JSON_LIST",
  "colour": 0,
  "tooltip": "Use to simulate a JSON list.",
  "helpUrl": "/docs/blocks/json_list/"
},
{
  "type": "json_value",
  "message0": "%1 ,",
  "args0": [
    {
      "type": "field_input",
      "name": "value",
      "text": "value"
    }
  ],
  "inputsInline": false,
  "previousStatement": "JSON_VALUE",
  "nextStatement": [
    "JSON_VALUE",
    "JSON_DICT"
  ],
  "colour": 0,
  "tooltip": "Use to simulate a JSON value.",
  "helpUrl": "/docs/blocks/json_value/"
},
{
  "type": "json_dictionary",
  "message0": "\" %1 \": %2",
  "args0": [
    {
      "type": "field_input",
      "name": "predicate",
      "text": "key"
    },
    {
      "type": "input_statement",
      "name": "parameters",
      "check": "JSON_LIST"
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "JSON_DICT",
    "JSON_VALUE"
  ],
  "nextStatement": [
    "JSON_DICT",
    "JSON_VALUE"
  ],
  "colour": 0,
  "tooltip": "Use to simulate a JSON dictionary.",
  "helpUrl": "/docs/blocks/json_dictionary/"
},
{
  "type": "silent_legal_doc_node",
  "message0": "%1 § %2 reads: %3 %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAzElEQVR4AWOgG/j//78zEJuQokEDiOvRxHYD8e//EDCbWIPqoRr6oXwZqCHBQFwMxN+BWIJYw/rRDAuG0gpQcQcQnyzDcBlErsskoN50ICe2JqN7E4htiNVsAMT7gZgDyv6PxZsyUDUy+AwSgWq0gPIvoxsGpHWA+DMQ8xBy1XaojSxQl8UD8XI0wzRwGoAWQ6+hiVEHKsYCsQBhGGGACIfdUI3voYnxN8SrCMNIMhCq+Two/GBJg1zD9oMwjnRWT2ri7MeRNzUYBi0AANQgbf4Gx9YVAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "(mute)",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "node_name",
      "text": "section"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "sub_parts",
      "check": "DOCPART"
    }
  ],
  "previousStatement": [
    "LEGALDOC",
    "DOCPART"
  ],
  "nextStatement": "DOCPART",
  "colour": 165,
  "tooltip": "Use to create a part of a legal document that has sub-parts and a name.",
  "helpUrl": "/docs/blocks/legal_doc_node"
},
{
  "type": "legal_doc_text_continuation",
  "message0": "→ %1",
  "args0": [
    {
      "type": "field_input",
      "name": "legal_doc_text",
      "text": "text"
    }
  ],
  "previousStatement": [
    "LEGALDOC",
    "DOCPART"
  ],
  "nextStatement": "DOCPART",
  "colour": 165,
  "tooltip": "Use to describe text that when quoted to the user should include the text of its parent.",
  "helpUrl": "/docs/blocks/legal_doc_text_continuation"
},
{
  "type": "legal_doc_text_parent_continuation",
  "message0": "↳ %1",
  "args0": [
    {
      "type": "field_input",
      "name": "legal_doc_text",
      "text": "text"
    }
  ],
  "previousStatement": [
    "LEGALDOC",
    "DOCPART"
  ],
  "nextStatement": "DOCPART",
  "colour": 165,
  "tooltip": "Use to describe text that when quoted to the user should include the text of its parent.",
  "helpUrl": "/docs/blocks/legal_doc_text_continuation"
},
{
  "type": "attribute_selector",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "first_element"
    },
    {
      "type": "field_label_serializable",
      "name": "infix",
      "text": "'s attribute_name is"
    },
    {
      "type": "input_value",
      "name": "second_element"
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": ""
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 135,
  "tooltip": "Use to set or check the value of an object's attribute.",
  "helpUrl": "/docs/blocks/attribute_selector"
},
{
  "type": "assume",
  "message0": "Assume: %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statements",
      "check": "OUTER"
    }
  ],
  "inputsInline": false,
  "colour": 270,
  "tooltip": "Use to specify statements which in the scenario may be proven or not proven.",
  "helpUrl": "/docs/blocks/assumption/"
},
{
  "type": "json_textfield",
  "message0": "JSON: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "payload",
      "text": "{ 'insert': 'json here' }"
    }
  ],
  "colour": 270,
  "tooltip": "Use to simulate JSON input for the API.",
  "helpUrl": "/docs/blocks/json_input/"
},
{
  "type": "opposes",
  "message0": "%1 opposes %2 %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "first_statement",
      "check": "OUTER"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "second_statement",
      "check": "OUTER"
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 165,
  "tooltip": "Use to indicate that two conclusions are inconsistent for the purpose of override statements",
  "helpUrl": "/docs/blocks/opposes"
},
{
  "type": "according_to",
  "message0": "According to %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "rule",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 165,
  "tooltip": "Use to determine whether a conclusion was held by a rule, regardless of whether it was later overridden.",
  "helpUrl": "/docs/blocks/according_to"
},
{
  "type": "scope",
  "message0": "anything under %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "RULE"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 165,
  "tooltip": "Use to indicate the given section of a written rule and its sub-sections.",
  "helpUrl": ""
},
{
  "type": "holds",
  "message0": "The conclusion in %1 that %2 holds",
  "args0": [
    {
      "type": "input_value",
      "name": "section",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 165,
  "tooltip": "Use to determine whether a conclusion was held by a rule and not overruled..",
  "helpUrl": "/docs/blocks/holds"
},
{
  "type": "lexsis_root",
  "message0": "Interview Structure: %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "nodes"
    }
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "empty_list",
  "message0": "Empty List",
  "output": "LIST",
  "colour": 300,
  "tooltip": "For creating an empty list value.",
  "helpUrl": "/docs/blocks/empty_list"
},
{
  "type": "head_tail",
  "message0": "%1 , %2",
  "args0": [
    {
      "type": "input_value",
      "name": "head",
      "check": [
        "OBJECT",
        "Number",
        "Boolean",
        "DATE",
        "DATETIME",
        "TIME",
        "DURATION",
        "VARIABLE",
        "LIST"
      ]
    },
    {
      "type": "input_value",
      "name": "tail",
      "check": [
        "OBJECT",
        "Number",
        "Boolean",
        "DATE",
        "DATETIME",
        "TIME",
        "DURATION",
        "VARIABLE",
        "LIST"
      ]
    }
  ],
  "inputsInline": true,
  "output": "LIST",
  "colour": 300,
  "tooltip": "For matching the first item in a list, and the remainder of that list. ",
  "helpUrl": "/docs/blocks/first_rest"
},
{
  "type": "time_type_selector",
  "message0": "%1 Time",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Clock",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to select time as the type of an attribute.",
  "helpUrl": "/docs/blocks/time"
},
{
  "type": "time_value",
  "message0": "%1 %2 : %3 : %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Clock",
      "flipRtl": false
    },
    {
      "type": "field_number",
      "name": "hours",
      "value": 0,
      "min": 0,
      "max": 23,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "minutes",
      "value": 0,
      "min": 0,
      "max": 59,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "seconds",
      "value": 0,
      "min": 0,
      "max": 59.99999
    }
  ],
  "output": "TIME",
  "colour": 330,
  "tooltip": "Used to specify a time in hours (0-23), minutes (0-59), and seconds (arbitrary precision).",
  "helpUrl": "/docs/blocks/time_value"
},
{
  "type": "datetime_type_selector",
  "message0": "%1 %2 Date / Time",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Clock",
      "flipRtl": false
    }
  ],
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to select the datetime type for an attribute.",
  "helpUrl": "/docs/blocks/datetime"
},
{
  "type": "datetime_value",
  "message0": "%1 %2 / %3 / %4 %5 %6 : %7 : %8",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_number",
      "name": "year",
      "value": 2000,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "month",
      "value": 1,
      "min": 1,
      "max": 12,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "day",
      "value": 1,
      "min": 1,
      "max": 31,
      "precision": 1
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Clock",
      "flipRtl": false
    },
    {
      "type": "field_number",
      "name": "hours",
      "value": 0,
      "min": 0,
      "max": 23,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "minutes",
      "value": 0,
      "min": 0,
      "max": 59,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "seconds",
      "value": 0,
      "min": 0,
      "max": 59.99999
    }
  ],
  "output": "DATETIME",
  "colour": 330,
  "tooltip": "Use to specify a datetime value in year, month, day, hour (24), minute, seconds",
  "helpUrl": "/docs/blocks/datetime_value"
},
{
  "type": "time_comparison",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_time",
      "check": [
        "VARIABLE",
        "TIME"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "comparison",
      "options": [
        [
          "is before",
          "lt"
        ],
        [
          "is before or the same time as",
          "lte"
        ],
        [
          "is the same time as",
          "eq"
        ],
        [
          "is after or the same time as",
          "gte"
        ],
        [
          "is after",
          "gt"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_time",
      "check": [
        "VARIABLE",
        "TIME"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "time_calculate",
  "message0": "%1 %2 : %3 : %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "hours",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "minutes",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "seconds",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "TIME",
  "colour": 330,
  "tooltip": "Use to generate a time dynamically from number values.",
  "helpUrl": "/docs/blocks/time_constructor"
},
{
  "type": "datetime_calculate",
  "message0": "%1 %2 / %3 / %4 %5 %6 : %7 : %8",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "year",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "month",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "day",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "hours",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "minutes",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "seconds",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DATETIME",
  "colour": 330,
  "tooltip": "Use to generate a datetime dynamically from number values.",
  "helpUrl": "/docs/blocks/datetime_constructor"
},
{
  "type": "date_add_days",
  "message0": "adding %1 %2 days to %3 %4 gives %5 %6",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "days",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to get the result of adding a number of days to a date. To subtract, use a negative number of days.",
  "helpUrl": "/docs/blocks/date_add_days/"
},
{
  "type": "duration_comparison",
  "message0": "%1 %2 %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "VARIABLE",
        "DURATION"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "comparison",
      "options": [
        [
          "<",
          "lt"
        ],
        [
          "=<",
          "lte"
        ],
        [
          "=",
          "eq"
        ],
        [
          ">=",
          "gte"
        ],
        [
          ">",
          "gt"
        ],
        [
          "≠",
          "ne"
        ]
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "VARIABLE",
        "DURATION"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to compare two durations.",
  "helpUrl": "/docs/blocks/duration_comparison"
},
{
  "type": "now",
  "message0": "%1 %2 %3 is set to the current datetime",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "now",
      "check": "VARIABLE"
    }
  ],
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Binds a variable to the current datetime when a query is run.",
  "helpUrl": "/docs/blocks/now"
},
{
  "type": "today",
  "message0": "%1 %2 is set to the current date",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "VARIABLE"
    }
  ],
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Binds a variable to the current date when a question is answered.",
  "helpUrl": "/docs/blocks/today"
},
{
  "type": "datetime_construct",
  "message0": "%1 %2 and %3 %4 is %5 %6 %7",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "date",
      "check": [
        "VARIABLE",
        "DATE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "VARIABLE",
        "TIME"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "VARIABLE",
        "DATETIME"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to relate a date and a time to a datetime.",
  "helpUrl": "/docs/blocks/datetime_combination"
},
{
  "type": "collect_list",
  "message0": "%1 is a list of all the values of %2 returned for %3",
  "args0": [
    {
      "type": "input_value",
      "name": "list_name",
      "check": "VARIABLE"
    },
    {
      "type": "input_value",
      "name": "variable_name",
      "check": "VARIABLE"
    },
    {
      "type": "input_statement",
      "name": "search",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 300,
  "tooltip": "Use to generate a list of values that satisfy the statement.",
  "helpUrl": "/docs/blocks/collect_list/"
},
{
  "type": "list_aggregation",
  "message0": "%1 is the %2 of the elements of %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "aggregation",
      "options": [
        [
          "count",
          "cnt"
        ],
        [
          "sum",
          "sum"
        ],
        [
          "average",
          "ave"
        ],
        [
          "minimum",
          "min"
        ],
        [
          "maximum",
          "max"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "list",
      "check": [
        "LIST",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 300,
  "tooltip": "Use to calculate a value on the basis of all the values in a list.",
  "helpUrl": "/docs/blocks/list_aggregation/"
},
{
  "type": "list_type_selector",
  "message0": "List",
  "output": "TYPE",
  "colour": 160,
  "tooltip": "Use to select the list type for an attribute.",
  "helpUrl": "/docs/blocks/list"
},
{
  "type": "list_start",
  "message0": "[ %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 300,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "list_end",
  "message0": "]",
  "output": null,
  "colour": 300,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "list_element",
  "message0": "%1 , %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "element"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "next"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 300,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "new_attribute_declaration",
  "message0": "has an attribute %1 %2 which is of type %3 , appearing as %4 %5 %6 %7 %8 %9 %10 %11 %12",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute_name",
      "text": "attribute name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "attribute_type",
      "options": [
        [
          "true / false",
          "boolean"
        ],
        [
          "number",
          "number"
        ],
        [
          "date",
          "date"
        ],
        [
          "time",
          "time"
        ],
        [
          "datetime",
          "datetime"
        ],
        [
          "duration",
          "duration"
        ],
        [
          "category",
          "category_name"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "order",
      "options": [
        [
          "object, then value",
          "ov"
        ],
        [
          "value, then object",
          "vo"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "field_label_serializable",
      "name": "first_element",
      "text": "object"
    },
    {
      "type": "field_input",
      "name": "infix",
      "text": "'s attribute name is"
    },
    {
      "type": "field_label_serializable",
      "name": "second_element",
      "text": "value"
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": ""
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    }
  ],
  "inputsInline": false,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 45,
  "tooltip": "Use to create an attribute for a category.",
  "helpUrl": "/docs/blocks/new_attribute/"
},
{
  "type": "new_category_declaration",
  "message0": "%1 is a Category %2 Appearing as: %3 %4 %5 %6 %7",
  "args0": [
    {
      "type": "field_input",
      "name": "category_name",
      "text": "category_name"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    },
    {
      "type": "field_input",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "field_label_serializable",
      "name": "first_element",
      "text": "object"
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": "is a category_name"
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
      "width": 15,
      "height": 15,
      "alt": "\"",
      "flipRtl": false
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 15,
  "tooltip": "Use to create a category.",
  "helpUrl": "/docs/blocks/new_category/"
},
{
  "type": "unary_attribute_selector",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "first_element",
      "check": [
        "VARIABLE",
        "OBJECT"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "is attribute_name"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 135,
  "tooltip": "Use to set or check the value of an object's attribute.",
  "helpUrl": "/docs/blocks/attribute_selector"
},
{
  "type": "new_object_category",
  "message0": "%1 is in the category %2",
  "args0": [
    {
      "type": "input_value",
      "name": "object",
      "check": [
        "OBJECT",
        "VARIABLE"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "category_name",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 225,
  "tooltip": "Use to add a category to an object, or check for category membership.",
  "helpUrl": "/docs/blocks/object_category/"
},
{
  "type": "attributed_rule",
  "message0": "When we know: %1 %2 We also know that according to %3 %4 %5 subject to exceptions %6 %7 subject to applicability",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "conditions",
      "check": "OUTER"
    },
    {
      "type": "input_value",
      "name": "source",
      "check": "RULE"
    },
    {
      "type": "input_statement",
      "name": "conclusion",
      "check": "OUTER"
    },
    {
      "type": "field_checkbox",
      "name": "defeasible",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "inapplicable",
      "checked": false
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to set out the conclusions that can be drawn from a rule.",
  "helpUrl": "/docs/blocks/attributed_rule/"
},
{
  "type": "defeated",
  "message0": "the conclusion in  %1 that %2 is defeated",
  "args0": [
    {
      "type": "input_value",
      "name": "defeating_rule",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "defeating_statement",
      "check": "OUTER"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 165,
  "tooltip": "Use to specify or test that a conclusion in a section is defeated",
  "helpUrl": "/docs/blocks/defeated/"
},
{
  "type": "applies",
  "message0": "%1 applies to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "applicable_rule",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "object",
      "check": [
        "OBJECT",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 165,
  "tooltip": "Use to specify or test if a section applies to an object",
  "helpUrl": "/docs/blocks/applies/"
},
{
  "type": "happens",
  "message0": "At time %1 the event %2 happened",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "TIME",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "event",
      "check": [
        "EVENT",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "initiates",
  "message0": "At time %1 %2 begins to hold",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate that a statement becomes true at a time.",
  "helpUrl": "/docs/blocks/initiates/"
},
{
  "type": "terminates",
  "message0": "At time %1 %2 no longer holds",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate that a statement is false at and after a time.",
  "helpUrl": "/docs/blocks/terminates/"
},
{
  "type": "holds_at",
  "message0": "From %1 %2 %3 %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate that a statement is true from a particular datetime forward.",
  "helpUrl": "/docs/blocks/holds_at/"
},
{
  "type": "initially",
  "message0": "Initially %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate that the statement is temporally valid until it is contradictred.",
  "helpUrl": "/docs/blocks/initially/"
},
{
  "type": "trajectory",
  "message0": "If at time %1 we know %2 %3 then at time %4 we know %5 %6",
  "args0": [
    {
      "type": "input_value",
      "name": "initial_time",
      "check": [
        "TIME",
        "VARIABLE"
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "initial_fluent",
      "check": "STATEMENT"
    },
    {
      "type": "input_value",
      "name": "subsequent_time",
      "check": [
        "TIME",
        "VARIABLE"
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "subsequent_fluent",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "started_in",
  "message0": "Between %1 and %2 %3 started holding",
  "args0": [
    {
      "type": "input_value",
      "name": "start_time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "end_time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to check whether a statement became true between two times.",
  "helpUrl": "/docs/blocks/started_in/"
},
{
  "type": "stopped_in",
  "message0": "Between %1 and %2 %3 stopped holding",
  "args0": [
    {
      "type": "input_value",
      "name": "start_time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_value",
      "name": "end_time",
      "check": [
        "Number",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to check whether a statement became false between two times.",
  "helpUrl": "/docs/blocks/stopped_in/"
},
{
  "type": "attributed_fact",
  "message0": "We know that according to %1 %2 %3 subject to exceptions",
  "args0": [
    {
      "type": "input_value",
      "name": "source",
      "check": [
        "RULE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "OUTER"
    },
    {
      "type": "field_checkbox",
      "name": "exceptions",
      "checked": true
    }
  ],
  "inputsInline": true,
  "colour": 270,
  "tooltip": "Use to make a statements that is tentatively true, and/or has a legislative source.",
  "helpUrl": "/docs/blocks/attributed_fact/"
},
{
  "type": "holds_during",
  "message0": "From %1 %2 to %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "start_time",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "end_time",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to find the longest periods of time (using timestamps) during which the statement was valid",
  "helpUrl": "/docs/blocks/during/"
},
{
  "type": "datetime_to_ts",
  "message0": "%1 %2 %3 as a timestamp is %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "VARIABLE",
        "DATETIME"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to generate a posix timestamp from a datetime.",
  "helpUrl": "/docs/blocks/datetime_to_ts"
},
{
  "type": "ts_to_datetime",
  "message0": "%1 %2 as a datetime is %3 %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "VARIABLE",
        "Number"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "VARIABLE",
        "DATETIME"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to generate a posix timestamp from a datetime.",
  "helpUrl": "/docs/blocks/datetime_to_ts"
},
{
  "type": "as_of",
  "message0": "As of %1 %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "DATE",
        "DATETIME",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to state that or check if a statement is true at a particular point in time.",
  "helpUrl": "/docs/blocks/as_of/"
},
{
  "type": "ultimately",
  "message0": "Ultimately %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate or check that the statement is temporally valid after all events.",
  "helpUrl": "/docs/blocks/ultimately/"
},
{
  "type": "from",
  "message0": "From %1 %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "DATETIME",
        "DATE",
        "VARIABLE"
      ]
    },
    {
      "type": "input_statement",
      "name": "statement",
      "check": "STATEMENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "STATEMENT",
    "OUTER"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to indicate that or ask if a statement becomes valid from a given datetime..",
  "helpUrl": "/docs/blocks/from/"
},
{
  "type": "datetime_ts",
  "message0": "%1 %2 %3 is %4 %5",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "datetime",
      "check": [
        "VARIABLE",
        "DATETIME"
      ]
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "*",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "VARIABLE",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 90,
  "tooltip": "Use to translate from datetimes to timestamps for use in events.",
  "helpUrl": "/docs/blocks/datetime_ts"
},
{
  "type": "time_from_ts",
  "message0": "%1 ← %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "clock",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "TIME",
  "colour": 330,
  "tooltip": "Generate a time from a numerical timestamp value",
  "helpUrl": "/docs/blocks/time_from_ts"
},
{
  "type": "datetime_from_ts",
  "message0": "%1 %2 ← %3 %4",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjM1IDMzLjY1IDIuMjUtMi4yNS03Ljk1LThWMTMuMzVoLTNWMjQuNlpNMjQgNDRxLTQuMSAwLTcuNzUtMS41NzUtMy42NS0xLjU3NS02LjM3NS00LjMtMi43MjUtMi43MjUtNC4zLTYuMzc1UTQgMjguMSA0IDI0dDEuNTc1LTcuNzVxMS41NzUtMy42NSA0LjMtNi4zNzUgMi43MjUtMi43MjUgNi4zNzUtNC4zUTE5LjkgNCAyNCA0dDcuNzUgMS41NzVxMy42NSAxLjU3NSA2LjM3NSA0LjMgMi43MjUgMi43MjUgNC4zIDYuMzc1UTQ0IDE5LjkgNDQgMjR0LTEuNTc1IDcuNzVxLTEuNTc1IDMuNjUtNC4zIDYuMzc1LTIuNzI1IDIuNzI1LTYuMzc1IDQuM1EyOC4xIDQ0IDI0IDQ0Wm0wLTIwWm0wIDE3cTcgMCAxMi01dDUtMTJxMC03LTUtMTJUMjQgN3EtNyAwLTEyIDVUNyAyNHEwIDcgNSAxMnQxMiA1WiIvPjwvc3ZnPg==",
      "width": 15,
      "height": 15,
      "alt": "clock",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DATETIME",
  "colour": 330,
  "tooltip": "Generate a datetime from a numerical timestamp value",
  "helpUrl": "/docs/blocks/datetime_from_ts"
},
{
  "type": "date_from_ts",
  "message0": "%1 ← %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DATE",
  "colour": 330,
  "tooltip": "Generate a date from a numerical timestamp value",
  "helpUrl": "/docs/blocks/date_from_ts"
},
{
  "type": "duration_from_ts",
  "message0": "%1 ← %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABBUlEQVR4AbXTAaTCUBTG8eFiCA9heAgPEAAeQoQwAIQwhBAghBACBAgQQghDgABDAAhhCGGAEEIY1v8Ac52tFn38sLPru/eaOUXJssxFw+I6FSNFbdhpf1LkIbB4VUtcjBDhghghBjACrVcl/0ggOSPEGkdIYuzxgFdU0sAdCXzlvZ/bZFJ2mghXeLnZVuSef3FDDKOVdCHp2eXCmgWQ+FrRFDeYN4pqkCy1oh0O6nWhzI/YFxUlynwilPkJK61oDqJ/UmttHSmG2sumcm81sgYp/ooWbCDpl5QEkMzKdqohgmSNZm7eQgjJAebVsQ3GeECSghBmWMCt8uP+oIMxZghQd76dJxd5zAMEIzMrAAAAAElFTkSuQmCC",
      "width": 15,
      "height": 15,
      "alt": "Stopwatch",
      "flipRtl": false
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADASURBVDhPYxh0gBFKM/z//18FSBUDsQZYgDC4AMSdjIyML0AcJhABBc1AHAFhEgUSgLgcwkQCQBftB2EolyBAV4/sIhQAVRgP5WLwcQKoQrANUDYugKyGoIsWQOkDQNwAxSAA4sPksAN0G4BsEKiHcrHxiXIRyQCrQUg2NYCcAQJIfLgrkAFdwgjExxn9UD6m63BK4ADo6pHz2nog5QDEoDxEDDAA4jXAvJYK4iCHUSsQg8KAWLADiDshzMEHGBgAFnW9mZqHm3AAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "#",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "timestamp",
      "check": [
        "Number",
        "VARIABLE"
      ]
    }
  ],
  "inputsInline": true,
  "output": "DURATION",
  "colour": 330,
  "tooltip": "Generate a duration from a numerical timestamp value",
  "helpUrl": "/docs/blocks/duration_from_ts"
},
{
  "type": "relationship_declaration",
  "message0": "%1 is a relationship between %2 objects or values described as %3 %4 %5 %6 %7 %8 %9 %10",
  "args0": [
    {
      "type": "field_input",
      "name": "relationship_name",
      "text": "relationship_name"
    },
    {
      "type": "field_dropdown",
      "name": "arity",
      "options": [
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ],
        [
          "8",
          "8"
        ],
        [
          "9",
          "9"
        ],
        [
          "10",
          "10"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "prefix1",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type1",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "prefix2",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type2",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "prefix3",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type3",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": ""
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 30,
  "tooltip": "Use to declare a relationship between 3 or more objects or values.",
  "helpUrl": "/docs/blocks/new_relationship/"
},
{
  "type": "relationship_selector",
  "message0": "%1 %2 %3 %4 %5 %6 %7",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "first_element"
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "second_element"
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "third_element"
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 150,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_ddeclaration",
  "message0": "%1 is a relationship between %2 objects or values described as %3 %4 %5 %6 %7 %8 %9 %10",
  "args0": [
    {
      "type": "field_input",
      "name": "relationship_name",
      "text": "relationship_name"
    },
    {
      "type": "field_dropdown",
      "name": "arity",
      "options": [
        [
          "3",
          "3"
        ],
        [
          "4",
          "4"
        ],
        [
          "5",
          "5"
        ],
        [
          "6",
          "6"
        ],
        [
          "7",
          "7"
        ],
        [
          "8",
          "8"
        ],
        [
          "9",
          "9"
        ],
        [
          "10",
          "10"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "prefix1",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type1",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "prefix2",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type2",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "prefix3",
      "text": ""
    },
    {
      "type": "field_dropdown",
      "name": "type3",
      "options": [
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_input",
      "name": "postfix",
      "text": ""
    }
  ],
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 30,
  "tooltip": "Use to declare a relationship between 3 or more objects or values.",
  "helpUrl": "/docs/blocks/new_relationship/"
},
{
  "type": "relationship_selector3",
  "message0": "%1 %2 %3 %4 %5 %6 %7",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector4",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector5",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector6",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix6",
      "text": "prefix6"
    },
    {
      "type": "input_value",
      "name": "parameter6",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector7",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix6",
      "text": "prefix6"
    },
    {
      "type": "input_value",
      "name": "parameter6",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix7",
      "text": "prefix7"
    },
    {
      "type": "input_value",
      "name": "parameter7",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector8",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix6",
      "text": "prefix6"
    },
    {
      "type": "input_value",
      "name": "parameter6",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix7",
      "text": "prefix7"
    },
    {
      "type": "input_value",
      "name": "parameter7",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix8",
      "text": "prefix8"
    },
    {
      "type": "input_value",
      "name": "parameter8",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector9",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix6",
      "text": "prefix6"
    },
    {
      "type": "input_value",
      "name": "parameter6",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix7",
      "text": "prefix7"
    },
    {
      "type": "input_value",
      "name": "parameter7",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix8",
      "text": "prefix8"
    },
    {
      "type": "input_value",
      "name": "parameter8",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix9",
      "text": "prefix9"
    },
    {
      "type": "input_value",
      "name": "parameter9",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
},
{
  "type": "relationship_selector10",
  "message0": "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "prefix1",
      "text": "prefix1"
    },
    {
      "type": "input_value",
      "name": "parameter1",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix2",
      "text": "prefix2"
    },
    {
      "type": "input_value",
      "name": "parameter2",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix3",
      "text": "prefix3"
    },
    {
      "type": "input_value",
      "name": "parameter3",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix4",
      "text": "prefix4"
    },
    {
      "type": "input_value",
      "name": "parameter4",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix5",
      "text": "prefix5"
    },
    {
      "type": "input_value",
      "name": "parameter5",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix6",
      "text": "prefix6"
    },
    {
      "type": "input_value",
      "name": "parameter6",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix7",
      "text": "prefix7"
    },
    {
      "type": "input_value",
      "name": "parameter7",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix8",
      "text": "prefix8"
    },
    {
      "type": "input_value",
      "name": "parameter8",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix9",
      "text": "prefix9"
    },
    {
      "type": "input_value",
      "name": "parameter9",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "prefix10",
      "text": "prefix10"
    },
    {
      "type": "input_value",
      "name": "parameter10",
      "check": [
        "VARIABLE",
        "SOMETHING"
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "postfix",
      "text": "postfix"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 195,
  "tooltip": "Use to set or check the value of a relationship.",
  "helpUrl": "/docs/blocks/relationship_selector/"
}]

// TODO: A bunch of these things below are redundant as the blocks are being removed.
// Make modifications that it is not possible to make in the Developer Tools
for (var i = 0; i < scasp_blockset.length; i++) {
  if (scasp_blockset[i].type == "attribute_selector") {
    scasp_blockset[i]['mutator'] = "attribute_selector_mutator"
  };
  if (scasp_blockset[i].type.startsWith('relationship_selector')) {
    scasp_blockset[i]['mutator'] = "relationship_selector_mutator";
  };
  if (scasp_blockset[i].type == "unary_attribute_selector" ) {
    scasp_blockset[i]['mutator'] = "unary_attribute_selector_mutator"
  };
  if (scasp_blockset[i].type == "object_selector") {
    scasp_blockset[i]['mutator'] = "object_selector_mutator"
  };
  if (scasp_blockset[i].type == "category_selector") {
    scasp_blockset[i]['mutator'] = "category_selector_mutator"
  };
  if (scasp_blockset[i].type == "doc_selector") {
    scasp_blockset[i]['mutator'] = "rule_selector_mutator"
  };
  if (scasp_blockset[i].type == "attribute_declaration") {
    scasp_blockset[i]['mutator'] = "attribute_declaration_mutator";
    scasp_blockset[i]['customContextMenu'] = function(array) {
      return array.push({ 'text': "Test", 'enabled': true, 'callback': null})
    }
  };
  if (scasp_blockset[i].type == "attribute_display") {
    scasp_blockset[i]['extensions'] = ["changeAttributeDisplayText"];
  };
  if (scasp_blockset[i].type == "new_attribute_declaration") {
    scasp_blockset[i]['extensions'] = ["changeNewAttributeDisplayText",
                                      "changeNewAttributeDisplayFormat"];//,
                                      //"dynamic_new_attribute_category_menu_extension"];
  }
  if (scasp_blockset[i].type == "object_declaration") {
    scasp_blockset[i]['mutator'] = "object_declaration_mutator";
  };
  // if (scasp_blockset[i].type == "category_display") {
  //   scasp_blockset[i]['extensions'] = ['changeCategoryDisplayText'];
  // }
  if (scasp_blockset[i].type == "json_textfield") {
    scasp_blockset[i].args0[0].type = "field_multilinetext";
    scasp_blockset[i].args0[0]['spellcheck'] = false;
  }
}

// This allows us to include reference definitions in the JSON above, but actually
// use the custom JavaScript below to define blocks that it is awkward to build with JSON.
const excluded_block_types = ['new_attribute_declaration','new_object_category','relationship_declaration'];

for (var i = 0; i < scasp_blockset.length; i++) {
  const typename = scasp_blockset[i].type
  const elem = scasp_blockset[i]
  if(!(excluded_block_types.includes(typename))) {
    Blockly.Blocks[typename] = {
      init: function() {
        this.jsonInit(elem)
      }
    }
  }
}

var headless=false;

Blockly.Blocks['relationship_declaration'] = {
  init: function() {
    this.appendDummyInput("topline")
      .appendField(new Blockly.FieldTextInput("relationship_name"), "relationship_name")
      .appendField("is a relationship between")
      .appendField(new Blockly.FieldDropdown([["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"]]), "relationship_arity")
      .appendField("objects or values, displayed as");
    var desc = this.appendDummyInput("description");
    for (var a=1; a< 3+1; a++) {
      desc.appendField(new Blockly.FieldTextInput(""), "prefix" +a );
      desc.appendField(new Blockly.FieldDropdown([["true / false","boolean"], ["number","number"], ["date","date"], ["time","time"], ["datetime","datetime"], ["duration","duration"], ['list','list']]), "type" + a);
    }
    desc.appendField(new Blockly.FieldTextInput(""), "postfix");
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["OUTER", "STATEMENT"]);
    this.setNextStatement(true, "STATEMENT");
    this.setColour(30);
    this.setTooltip("Use to declare a relationship between 3 or more objects or values.");
    this.setHelpUrl("/docs/blocks/new_relationship/");
  },
  mutationToDom() {
    // Store information required to reconstruct the block
    let container = document.createElement('mutation');
    var arity = parseInt(this.getFieldValue('arity'));
    for (var i=1; i<= arity; i) {
      container.setAttribute('prefix'+i,this.getFieldValue('prefix'+i));
      container.setAttribute('type'+i,JSON.stringify(this.getField('type'+i).selectedOption_));
    }
    container.setAttribute('type_list',JSON.stringify(this.getField('type1').menuGenerator_));
    
    return container;
  },
  domToMutation(xmlElement) {
    // Reformat the block based on the mutation.
        // The values of the three mandatory ones will still be there in the XML.
    // We need to add the fields and values for everything above that number.
    var input = this.getInput('description');
    for (var n = 1; n<4; n++) {
      var prefix_index = (n*2)-2;
      var type_index = (n*2)-1;
      this.getField('prefix'+n).value = xmlElement.getAttribute('prefix'+n);
      this.getField('type'+n).selectedOption_ = JSON.parse(xmlElement.getAttribute('type'+n));
      this.getField('type'+n).menuGenerator_ = JSON.parse(xmlElement.getAttribute('type_list'));
    }
    for (var n = 4; n <= 10; n++) {
      if (xmlElement.hasAttribute('prefix'+n)) { // returns null if the attribute doesn't exist
        // This one exists in the container.
        // Add the corresponding fields, and set the values accordingly.
        // If we are adding the fourth, the numbers are 6 and 7 for the prefix and type.
        // If we are adding the fifth, the numbers are 8 and 9 for the prefix and type.
        // So the numbers are n*2-2, and n*2-1
        var prefix_index = (n*2)-2;
        var type_index = (n*2)-1;
        input.insertFieldAt(prefix_index,new Blockly.FieldTextInput(""), "prefix" + n );
        this.getField('prefix'+n).value = xmlElement.getAttribute('prefix'+n);
        input.insertFieldAt(type_index,new Blockly.FieldDropdown(this.generateDataTypes), "type" + n);
        this.getField('type'+n).selectedOption_ = JSON.parse(xmlElement.getAttribute('type'+n));
        this.getField('type'+n).menuGenerator_ = JSON.parse(xmlElement.getAttribute('type_list'));
      }
    }
  }
}

var updateRelationshipDeclaration;
updateRelationshipDeclaration = function(changeEvent) {
  if (changeEvent.type == Blockly.Events.BLOCK_CHANGE &&
      changeEvent.element == "field" &&
      changeEvent.name == "relationship_arity"
      ) {
        
        var arity = parseInt(changeEvent.newValue);
        var old_arity = parseInt(changeEvent.oldValue);
        var target = demoWorkspace.getBlockById(changeEvent.blockId);
        var input = target.getInput('description');

        if (arity > old_arity) {
          // If there are 3, and the new value is 4, the indexes are 6 and 7. So the index
          // is always the new arity times two minus 2 and 1.
          // The current value of the postfix should be moved to the first new prefix.
          var postfix_text = target.getFieldValue("postfix");
          for (var c = old_arity + 1 ; c <= arity; c++) { // Starts at 4, goes until newValue
            var prefix_insert = (c*2)-2;
            var type_insert = (c*2)-1;
            input.insertFieldAt(prefix_insert,new Blockly.FieldTextInput(""), "prefix" + c );
            if (c == old_arity+1) {
              target.getField("prefix" + c).setValue(postfix_text);
              target.getField("postfix").setValue("");
            }
            input.insertFieldAt(type_insert,new Blockly.FieldDropdown(target.generateDataTypes), "type" + c);
          }
        } else if (arity < old_arity) {
          // If the number is smaller, removeField
          var new_postfix = target.getFieldValue("prefix" + (arity+1));
          target.getField("postfix").setValue(new_postfix);
          for (var c = old_arity; c > arity; c--) {
            input.removeField("prefix"+c);
            input.removeField("type"+c);
          }
        }
        demoWorkspace.render();
      
  }
};

Blockly.Blocks['new_attribute_declaration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("The category")
        .appendField(new Blockly.FieldDropdown([['no categories defined','none']]),"category_name")
        .appendField("has an attribute")
        .appendField(new Blockly.FieldTextInput("attribute name"), "attribute_name");
    this.appendDummyInput()
        .appendField("which is of type")
        .appendField(new Blockly.FieldDropdown([["true / false","boolean"], ["number","number"], ["date","date"], ["time","time"], ["datetime","datetime"], ["duration","duration"], ['list','list']]),"attribute_type")
        .appendField(", appearing as")
        .appendField(new Blockly.FieldDropdown([["object, then value","ov"], ["value, then object","vo"]]), "order");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC", 15, 15, { alt: "\"", flipRtl: "FALSE" }))
        .appendField(new Blockly.FieldTextInput(""), "prefix")
        .appendField(new Blockly.FieldLabelSerializable("object"), "first_element")
        .appendField(new Blockly.FieldTextInput("'s attribute name is"), "infix")
        .appendField(new Blockly.FieldLabelSerializable("value"), "second_element")
        .appendField(new Blockly.FieldTextInput(""), "postfix")
        .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==", 15, 15, { alt: "\"", flipRtl: "FALSE" }));
    this.setInputsInline(false);
    this.setPreviousStatement(true, ["OUTER", "STATEMENT"]);
    this.setNextStatement(true, "STATEMENT");
    this.setColour(45);
 this.setTooltip("Use to create an attribute for a category.");
 this.setHelpUrl("/docs/blocks/new_attribute/");
 this.setOnChange(function(changeEvent) {
  this.getField('attribute_type').getOptions(false);
  this.getField('category_name').getOptions(false);
  if (this.getFieldValue('order') == "ov") {
    this.getField('first_element').setValue('object');
    this.getField('second_element').setValue('value');
  } else {
    this.getField('first_element').setValue('value');
    this.getField('second_element').setValue('object');
  }
  if (this.getFieldValue('attribute_type') == "boolean") {
    this.getField('order').setValue('ov'); // reset to order first, so we know what we need to hide.
    this.getField('first_element').setValue('object');
    this.getField('second_element').setValue('value');
    this.getField('second_element').setVisible(false);
    this.getField('infix').setVisible(false);
    this.getField('order').setVisible(false);
    this.getField('second_element').setEnabled(false);
    this.getField('infix').setEnabled(false);
    this.getField('order').setEnabled(false);
  } else {
    this.getField('second_element').setVisible(true);
    this.getField('infix').setVisible(true);
    this.getField('order').setVisible(true);
    this.getField('second_element').setEnabled(true);
    this.getField('infix').setEnabled(true);
    this.getField('order').setEnabled(true);
  }
});
  },
  mutationToDom() {
    let container = document.createElement('mutation');

    // Bind some values to container e.g. container.setAttribute('foo', 3.14);
    container.setAttribute('category_name',JSON.stringify(this.getField('category_name').selectedOption_));
    container.setAttribute('category_list',JSON.stringify(this.getField('category_name').getOptions()));
    container.setAttribute('attribute_type',JSON.stringify(this.getField('attribute_type').selectedOption_));
    container.setAttribute('attribute_list',JSON.stringify(this.getField('attribute_type').getOptions()));

    return container;
  },
  domToMutation(xmlElement) {
    // Retrieve all attributes from 'xmlElement' and reshape your block
    // e.g. let foo = xmlElement.getAttribute('foo');
    // this.reshape(foo);
    var category_name = JSON.parse(xmlElement.getAttribute('category_name'));
    var attribute_type = JSON.parse(xmlElement.getAttribute('attribute_type'));
    var category_list = JSON.parse(xmlElement.getAttribute('category_list'));
    var attribute_list = JSON.parse(xmlElement.getAttribute('attribute_list'));
    
    this.getField('category_name').selectedOption_ = category_name;
    this.getField('attribute_type').selectedOption_ = attribute_type;
    this.getField('category_name').menuGenerator_ = category_list;
    this.getField('attribute_type').menuGenerator_ = attribute_list;
  }
};

Blockly.Blocks['new_object_category'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck(["OBJECT", "VARIABLE"]);
    this.appendDummyInput()
        .appendField("is in the category")
        .appendField(new Blockly.FieldDropdown([['no categories defined','no categories defined']]), "category_name");
    this.setInputsInline(true);
    this.setPreviousStatement(true, ["OUTER", "STATEMENT"]);
    this.setNextStatement(true, "STATEMENT");
    this.setColour(225);
 this.setTooltip("Use to add a category to an object, or check for category membership.");
 this.setHelpUrl("/docs/blocks/object_category/");
  },
  generateCategories: function() {
    var allCategories = getAllCategories();
    if (allCategories.length) {
      var optionList = [];
      for (var i =0; i< allCategories.length; i++) {
        optionList.push([allCategories[i],allCategories[i]])
      }
    } else {
      var optionList = [['No Categories Defined','none']];
    }

    return optionList;
    
    //return [['this','this'],['that','that']];
  },
  mutationToDom() {
    let container = document.createElement('mutation');

    // Bind some values to container e.g. container.setAttribute('foo', 3.14);
    container.setAttribute('category_name',this.getFieldValue('category_name'));
    container.setAttribute('category_list',JSON.stringify(this.getField('category_name').getOptions()));

    return container;
  },
  domToMutation(xmlElement) {
    // Retrieve all attributes from 'xmlElement' and reshape your block
    // e.g. let foo = xmlElement.getAttribute('foo');
    // this.reshape(foo);
    var category_name = xmlElement.getAttribute('category_name');
    var category_list = xmlElement.getAttribute('category_list');
    // This is just a god-awful kludge, that still sends warnings until the list catches up with the value.
    this.getField('category_name').selectedOption_ = [category_name, category_name];
    this.getField('category_name').menuGenerator_ = JSON.parse(category_list);
  }
};


function getAllCategories() {
  return [... new Set(knownCategories.concat(localCategories))];
}

function getKnownCategories() {

  var all_workspaces = getAllWorkspaces();
  var knownCategoriesList = [];
  
  for (var w = 0; w < all_workspaces.length; w++) {
    // Go through the blocks in the workspace.
    // If the block is an object declaration, add the relevant block to the xml
    if (all_workspaces[w].xml_content) {
      var domObject = Blockly.Xml.textToDom(all_workspaces[w].xml_content);
      var tempWorkspace = new Blockly.Workspace();
      Blockly.Xml.domToWorkspace(domObject, tempWorkspace);
      var blockList = tempWorkspace.getAllBlocks();
      // console.log("BlockList: " + blockList)
      for (var i = 0; i< blockList.length; i++) {
                  if (blockList[i].type == "category_declaration" || blockList[i].type == "new_category_declaration") {
                    // Get the name of the entity, insert a block of that type,
                      var category_name = blockList[i].getFieldValue('category_name');
                      knownCategoriesList.push(category_name); 
                    }
                  }
                  delete tempWorkspace;
                }
              }
      for (var id in importDictionary) {
        var blockList = importDictionary[id].getAllBlocks();
        for (var i = 0; i< blockList.length; i++) {
          if (blockList[i].type == "category_declaration") {
            // Get the name of the entity, insert a block of that type,
            var category_name = blockList[i].getFieldValue('category_name'); 
            knownCategoriesList.push(category_name);
          }
        }
      }
      return knownCategoriesList;
    }

function updateLocalCategories() {
  var blockList = demoWorkspace.getAllBlocks();
  localCategories = [];
  for (var i = 0; i< blockList.length; i++) {
    if (blockList[i].type == "category_declaration" || blockList[i].type == "new_category_declaration") {
      // Get the name of the entity, insert a block of that type,
        var category_name = blockList[i].getFieldValue('category_name');
        localCategories.push(category_name); 
    }
  }
  // We can run this every time there is a reason to, and then immediately generate options and send them out.
  var allCategories = [... new Set(knownCategories.concat(localCategories))];
  if (allCategories.length) {
    var allCategoryList = [];
    for (var i =0; i< allCategories.length; i++) {
      allCategoryList.push([allCategories[i],allCategories[i]])
    }
  } else {
    var allCategoryList = [['No Categories Defined','none']];
  }
  // Now we have an allcategories option list, we can add datatypes to create an allTypes option list
  var datatypeOptions = [["true / false","boolean"], ["number","number"], ["date","date"], ["time","time"], ["datetime","datetime"], ["duration","duration"], ['list','list']];
  if (allCategoryList.length) {
    var allTypes = datatypeOptions.concat(allCategoryList)
  } else {
    var allTypes = datatypeOptions;
  }
  // Now we need to update all the relevant fields in all the relevant blocks.
  var noc_blocks = demoWorkspace.getBlocksByType('new_object_category')
  for (var i=0; i< noc_blocks.length; i++) {
    noc_blocks[i].getField('category_name').menuGenerator_ = allCategoryList;
    // TODO I need to make it so that if the current option has been removed, the selected option changes.
    updateDropDownOptions(noc_blocks[i].getField('category_name'),allCategoryList);
  }
  // Attribute Declarations
  var att_blocks = demoWorkspace.getBlocksByType('new_attribute_declaration');
  for (var i=0; i < att_blocks.length; i++) {
    var category_field = att_blocks[i].getField('category_name');
    var type_field = att_blocks[i].getField('attribute_type');
    updateDropDownOptions(category_field,allCategoryList);
    updateDropDownOptions(type_field,allTypes);
  }
  // Relationship Declarations
  var rel_blocks = demoWorkspace.getBlocksByType('relationship_declaration');
  for (var i=0; i< rel_blocks.length; i++) {
    var arity = rel_blocks[i].getFieldValue('arity');
    for (var j=1; j<=arity; j++) {
      updateDropDownOptions(rel_blocks[i].getField('Type'+j),allTypes);
    }
  }
}

function updateDropDownOptions(ddfield,options) {
  var selected = ddfield.selectedOption_
  if (!optionInList(selected,options)) {
    ddfield.setValue(options[0][1]);
  }
}

function optionInList(option,list) {
  for (var i = 0; i < list.length; i++) {
    if (option[0] == list[i][0] && option[1] == list[i][1]) {
      return true;
    }
  }
  return false;
}