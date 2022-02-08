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
  "message0": "known false %1",
  "args0": [
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
  "message0": "not %1",
  "args0": [
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
  "message0": "Is it true that: %1",
  "args0": [
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
  "message0": "When we know: %1 We also know: %2",
  "args0": [
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
  "helpUrl": "/docs/blocks/doc_selector/"
},
{
  "type": "overrules",
  "message0": "%1 overrules %2",
  "args0": [
    {
      "type": "input_value",
      "name": "defeating_rule",
      "check": "RULE"
    },
    {
      "type": "input_value",
      "name": "defeated_rule",
      "check": "RULE"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 270,
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
  "message0": "We know %1",
  "args0": [
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
  "message0": "It is never the case that: %1",
  "args0": [
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
  "helpUrl": "/docs/blocks/date_type_selector/"
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
  "helpUrl": "/docs/blocks/duration_type_selector/"
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
      "value": 2000
    },
    {
      "type": "field_number",
      "name": "month",
      "value": 1,
      "min": 1,
      "max": 12
    },
    {
      "type": "field_number",
      "name": "day",
      "value": 1,
      "min": 1,
      "max": 31
    }
  ],
  "output": "DATE",
  "colour": 330,
  "tooltip": "Use to specify a date value.",
  "helpUrl": "/docs/blocks/date_value/"
},
{
  "type": "duration_value",
  "message0": "%1 %2 years, %3 months, %4 days",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "sign",
      "options": [
        [
          "+",
          "pos"
        ],
        [
          "-",
          "neg"
        ]
      ]
    },
    {
      "type": "field_number",
      "name": "years",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_number",
      "name": "months",
      "value": 0,
      "min": 0
    },
    {
      "type": "field_number",
      "name": "days",
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
      "check": "DATE"
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
          "is before or the same date as",
          "lte"
        ],
        [
          "is the same date as",
          "eq"
        ],
        [
          "is after or the same date as",
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
      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAdElEQVR4Ae3PgQXDYBBH8UMBRQAFFNAxjg7QMTpAAcU3WkboQMWvEBwEFwKVx3Pw97ioYEJiikpzE0hAbtrgjIEPLHdesW5eONXQEzA3hUcNDYgmgLFfqM96aHTc4bU/CB0hZFN419DdNr64RQVXZNNLLPwAidY8ploh57UAAAAASUVORK5CYII=",
      "width": 15,
      "height": 15,
      "alt": "Calendar",
      "flipRtl": false
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": "DATE"
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
      "check": "DATE"
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
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "month",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "day",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "DATE",
  "colour": 330,
  "tooltip": "Use to create a date value from number values for year (four digits), month, and day.",
  "helpUrl": "/docs/blocks/date_calculate/"
},
{
  "type": "duration_calculate",
  "message0": "%1 %2 sign, %3 years, %4 months, %5 days",
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
        "Boolean"
      ]
    },
    {
      "type": "input_value",
      "name": "years",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "months",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "days",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "DURATION",
  "colour": 330,
  "tooltip": "Use to create a duration value from a number for sign (1 = future, -1 = past), and numbers for years, months, and days.",
  "helpUrl": "/docs/blocks/duration_calculate/"
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
      "check": "DURATION"
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
      "check": "DATE"
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
      "check": "DATE"
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
      "check": "Number"
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
  "helpUrl": "/docs/blocks/date_difference_days/"
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
      "check": "DATE"
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
      "check": "DATE"
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
      "check": "DURATION"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to get the duration (years, months, and days) between two dates",
  "helpUrl": "/docs/blocks/date_difference/"
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
      "check": "DURATION"
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
      "check": "DATE"
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
      "check": "DATE"
    }
  ],
  "inputsInline": true,
  "previousStatement": [
    "OUTER",
    "STATEMENT"
  ],
  "nextStatement": "STATEMENT",
  "colour": 330,
  "tooltip": "Use to get the result of adding a duration to a date. To subtract, use a duration with a negative sign.",
  "helpUrl": "/docs/blocks/date_difference/"
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
          "must be less than",
          "lt"
        ],
        [
          "must be greater than",
          "gt"
        ],
        [
          "must be less than or the same value as",
          "lte"
        ],
        [
          "must be greater than or the same value as",
          "gte"
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
  "message0": "Assume: %1",
  "args0": [
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
}]

// Make modifications that it is not possible to make in the Developer Tools
for (var i = 0; i < scasp_blockset.length; i++) {
  if (scasp_blockset[i].type == "attribute_selector") {
    scasp_blockset[i]['mutator'] = "attribute_selector_mutator"
  };
  if (scasp_blockset[i].type == "object_selector") {
    scasp_blockset[i]['mutator'] = "object_selector_mutator"
  };
  if (scasp_blockset[i].type == "category_selector") {
    scasp_blockset[i]['mutator'] = "category_selector_mutator"
  };
  if (scasp_blockset[i].type == "attribute_declaration") {
    scasp_blockset[i]['mutator'] = "attribute_declaration_mutator";
  };
  if (scasp_blockset[i].type == "attribute_display") {
    scasp_blockset[i]['extensions'] = ["changeAttributeDisplayText"];
  };
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

for (var i = 0; i < scasp_blockset.length; i++) {
  const typename = scasp_blockset[i].type
  const elem = scasp_blockset[i]
  Blockly.Blocks[typename] = {
    init: function() {
      this.jsonInit(elem)
    }
  }
}