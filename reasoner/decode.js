var Blockly = require('/usr/local/lib/node_modules/blockly');

Blockly.Blocks['declare_type'] = {
  init: function() {
    this.jsonInit({
  "type": "declare_type",
  "message0": "%1 is a Category",
  "args0": [
    {
      "type": "field_input",
      "name": "type_name",
      "text": "default"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 20,
  "tooltip": "Use this block to create a Category. Use a singular noun as its name.",
  "helpUrl": ""
})
  }
};

    Blockly.Blocks['declare_type_is_type'] = {
        init: function () {
            this.jsonInit({
                "type": "declare_type_is_type",
                "message0": "A %1 is a %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "first_type",
                        "check": "TYPE"
                    },
                    {
                        "type": "input_value",
                        "name": "second_type",
                        "check": "TYPE"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
                "tooltip": "Use this block to say that an object in one category is always also in another category. E.g. A Dog is an Animal.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['entity_declaration'] = {
        init: function () {
            this.jsonInit({
                "type": "entity_declaration",
                "message0": "%1 is an Object",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "entity_name",
                        "text": "object"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "Use this block to create an object. E.g. Bob exists.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['entity_is_type'] = {
        init: function () {
            this.jsonInit({
                "type": "entity_is_type",
                "message0": "%1 is in the Category %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "entity name",
                        "check": "ENTITY"
                    },
                    {
                        "type": "input_value",
                        "name": "type name",
                        "check": "TYPE"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "Use this block to say that an object is in a category. E.g. Bob is a Person.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['rule'] = {
        init: function () {
            this.jsonInit({
                "type": "rule",
                "message0": "Rule Name: %1 %2 We know %3 if %4",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "rule_name",
                        "text": "name"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "conclusion",
                        "align": "RIGHT"
                    },
                    {
                        "type": "input_statement",
                        "name": "conditions",
                        "align": "RIGHT"
                    }
                ],
                "colour": 260,
                "tooltip": "Rule: Use this block to state a rule of inference.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['variable_selector'] = {
        init: function () {
            this.jsonInit({
                "type": "variable_selector",
                "message0": "\" %1 \"",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "variable_selected",
                        "text": "A"
                    }
                ],
                "output": "ENTITY",
                "colour": 60,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['conjunction'] = {
        init: function () {
            this.jsonInit({
                "type": "conjunction",
                "message0": "%1 and %2 %3",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "first_statement"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "second_statement"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['disjunction'] = {
        init: function () {
            this.jsonInit({
                "type": "disjunction",
                "message0": "%1 or %2 %3",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "first_statement"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "second_statement"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['negation'] = {
        init: function () {
            this.jsonInit({
                "type": "negation",
                "message0": "not %1",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "NAME"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['fact'] = {
        init: function () {
            this.jsonInit({
                "type": "fact",
                "message0": "We know %1",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "statement"
                    }
                ],
                "colour": 260,
                "tooltip": "Fact: Use this block to say one or more things that are known to be true.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['query'] = {
        init: function () {
            this.jsonInit({
                "type": "query",
                "message0": "Is it true that: %1",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "query"
                    }
                ],
                "colour": 260,
                "tooltip": "Query: Use this block to pose a question to the reasoner.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['naf_negation'] = {
        init: function () {
            this.jsonInit({
                "type": "naf_negation",
                "message0": "n.a.f. not %1",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "NAME"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "negation-as-failure version of \"not\"",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['entity_identity'] = {
        init: function () {
            this.jsonInit({
                "type": "entity_identity",
                "message0": "%1 and %2 are the same object",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "first_entity",
                        "check": "ENTITY"
                    },
                    {
                        "type": "input_value",
                        "name": "second_entity",
                        "check": "ENTITY"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['attribute_declaration'] = {
        init: function () {
            this.jsonInit({
                "type": "attribute_declaration",
                "message0": "%1 , which is a  %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "attribute_name",
                        "text": "name"
                    },
                    {
                        "type": "input_value",
                        "name": "attribute_type",
                        "check": [
                            "TYPE",
                            "DATATYPE"
                        ]
                    }
                ],
                "inputsInline": true,
                "previousStatement": "ATTRIBUTE_DECLARATION",
                "nextStatement": "ATTRIBUTE_DECLARATION",
                "colour": 45,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['implication'] = {
        init: function () {
            this.jsonInit({
                "type": "implication",
                "message0": "%1 implies %2 %3 %4",
                "args0": [
                    {
                        "type": "input_statement",
                        "name": "first_statement"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "implication type",
                        "options": [
                            [
                                "==>",
                                "implies_1"
                            ],
                            [
                                "~~>",
                                "implies_2"
                            ],
                            [
                                "<==>",
                                "bdimplies_1"
                            ],
                            [
                                "<~~>",
                                "bdimplies_2"
                            ]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_statement",
                        "name": "second_statement"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['quantifier'] = {
        init: function () {
            this.jsonInit({
                "type": "quantifier",
                "message0": "For %1 of the entities %2 it is true that %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "quantifier_type",
                        "options": [
                            [
                                "any",
                                "exists"
                            ],
                            [
                                "all",
                                "forall"
                            ]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "NAME",
                        "check": "ENTITY"
                    },
                    {
                        "type": "input_statement",
                        "name": "predicate_statement",
                        "align": "RIGHT"
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['override'] = {
        init: function () {
            this.jsonInit({
                "type": "override",
                "message0": "Rule %1 overrides rule %2",
                "args0": [
                    {
                        "type": "field_input",
                        "name": "first_rule",
                        "text": "rule name"
                    },
                    {
                        "type": "field_input",
                        "name": "second_rule",
                        "text": "rule name"
                    }
                ],
                "colour": 260,
                "tooltip": "Override: Use this block to indicate that one rule overrides another.",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['declare_type_with_attributes'] = {
        init: function () {
            this.jsonInit({
                "type": "declare_type_with_attributes",
                "message0": "A %1 has attributes %2",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "type",
                        "check": "TYPE"
                    },
                    {
                        "type": "input_statement",
                        "name": "NAME",
                        "check": "ATTRIBUTE_DECLARATION"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 20,
                "tooltip": "Use this block to set out the attributes of a category. E.g. A Person has a Name, which is a Text String.",
                "helpUrl": ""
            });
        }
    }


    Blockly.Blocks['boolean_datatype'] = {
        init: function () {
            this.jsonInit({
                "type": "boolean_datatype",
                "message0": "☑ Yes / No",
                "output": "DATATYPE",
                "colour": 160,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['number_datatype'] = {
        init: function () {
            this.jsonInit({
                "type": "number_datatype",
                "message0": "#️⃣ Number",
                "output": "DATATYPE",
                "colour": 160,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['string_datatype'] = {
        init: function () {
            this.jsonInit({
                "type": "string_datatype",
                "message0": "🔠 Text",
                "output": "DATATYPE",
                "colour": 160,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['comparitor'] = {
        init: function () {
            this.jsonInit({
                "type": "comparitor",
                "message0": "%1 %2 %3 %4",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "first_value"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "comparitor",
                        "options": [
                            [
                                "<",
                                "lt"
                            ],
                            [
                                "<=",
                                "lte"
                            ],
                            [
                                ">",
                                "gt"
                            ],
                            [
                                ">=",
                                "gte"
                            ],
                            [
                                "==",
                                "eq"
                            ],
                            [
                                "!=",
                                "neq"
                            ],
                            [
                                "!==",
                                "nid"
                            ]
                        ]
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "input_value",
                        "name": "second_value"
                    }
                ],
                "inputsInline": true,
                "previousStatement": null,
                "nextStatement": null,
                "colour": 290,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['aggregate_statement'] = {
        init: function () {
            this.jsonInit({
                "type": "aggregate_statement",
                "message0": "The  %1 of %2 where %3",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "aggregation_operation",
                        "options": [
                            [
                                "minimum",
                                "min"
                            ],
                            [
                                "maximum",
                                "max"
                            ],
                            [
                                "count",
                                "count"
                            ],
                            [
                                "distinct count",
                                "countdistinct"
                            ],
                            [
                                "average",
                                "avg"
                            ],
                            [
                                "distinct average",
                                "avgdistinct"
                            ],
                            [
                                "sum",
                                "sum"
                            ],
                            [
                                "distinct sum",
                                "sumdistinct"
                            ]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "aggregate_variable",
                        "check": "ENTITY"
                    },
                    {
                        "type": "input_statement",
                        "name": "aggregate_conditions"
                    }
                ],
                "inputsInline": true,
                "output": "Number",
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
            });
        }
    }

    Blockly.Blocks['object_selector'] = {
        init: function () {
            this.jsonInit({
                "type": "object_selector",
                "message0": "%1",
                "args0": [
                    {
                        "type": "field_label",
                        "text": "Object",
                        "name": "objectName"
                    }
                ],
                "output": "ENTITY",
                "colour": 230,
                "tooltip": "",
                "helpUrl": "",
                "mutator": "object_selector_mutator"
            });
        }
    }

    Blockly.Blocks['category_selector'] = {
        init: function () {
            this.jsonInit({
                "type": "category_selector",
                "message0": "%1",
                "args0": [
                    {
                        "type": "field_label",
                        "text": "Category",
                        "name": "categoryName"
                    }
                ],
                "output": "TYPE",
                "colour": 20,
                "tooltip": "",
                "helpUrl": "",
                "mutator": "category_selector_mutator"
            });
        }
    }

    Blockly.Blocks['assignment'] = {
      init: function () {
        this.jsonInit({
  "type": "assignment",
  "message0": "%1 is set to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "variable",
      "check": "ENTITY"
    },
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": "ATTRIBUTE_ASSIGNMENT",
  "nextStatement": "ATTRIBUTE_ASSIGNMENT",
  "colour": 60,
  "tooltip": "",
  "helpUrl": ""
})
      }
    }

    Blockly.Blocks['math_operator'] = {
      init: function () {
        this.jsonInit(
          {
  "type": "math_operator",
  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "left_value",
      "check": [
        "ENTITY",
        "Number",
        "DATE",
        "DURATION",
        "TIME",
        "DATETIME"
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
          "subtract"
        ],
        [
          "*",
          "multiply"
        ],
        [
          "/",
          "divide"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "right_value",
      "check": [
        "ENTITY",
        "Number",
        "DATE",
        "DURATION",
        "TIME",
        "DATETIME"
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
        );
      }
    }

    Blockly.Blocks['attribute_selector'] = {
      init: function () {
        this.jsonInit({
  "type": "attribute_selector",
  "message0": "%1 's %2 is %3",
  "args0": [
    {
      "type": "input_value",
      "name": "entity",
      "check": "ENTITY"
    },
    {
      "type": "field_label",
      "text": "Attribute",
      "name": "attributeName"
    },
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "CALCULATED TYPE HERE",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 120,
  "tooltip": "The first block is an Object or Variable, the second is a variable or the correct value type for this attribute.",
  "helpUrl": "",
  "mutator": "attribute_selector_mutator"
});
      }
    }

    Blockly.Blocks['import_ruleset'] = {
      init: function () {
        this.jsonInit(
         {
          "type": "import_ruleset",
          "message0": "Include: %1",
          "args0": [
            {
              "type": "field_label_serializable",
              "name": "uri",
              "text": "filename.blawx"
            }
          ],
          "colour": 260,
          "tooltip": "Use this block to include code from a published workspace.",
          "helpUrl": ""
        }

        )
    }
    }

    Blockly.Blocks['data_property'] = {
      init: function() {
        this.jsonInit(
          {
            "type": "data_property",
            "message0": "%1 's %2 is %3 %4",
            "args0": [
              {
                "type": "input_value",
                "name": "subject",
                "check": [
                  "ENTITY",
                  "String"
                ]
              },
              {
                "type": "field_input",
                "name": "predicate",
                "text": "property"
              },
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "object"
              }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": "",
            "helpUrl": ""
          }
        )
      }
    }

    Blockly.Blocks['data_dictionary'] = {
      init: function() {
        this.jsonInit(
          {
        "type": "data_dictionary",
        "message0": "There is an object named %1 %2 : %3",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "field_input",
            "name": "dictionary_name",
            "text": "data"
          },
          {
            "type": "input_statement",
            "name": "NAME",
            "check": "KVP"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "This block creates a data object. It may contain data dictionaries, and data values.",
        "helpUrl": ""
      }
        )
      }
    }

Blockly.Blocks['kvp_basic'] = {
      init: function() {
        this.jsonInit(
          {
            "type": "kvp_basic",
            "message0": "%1 : %2",
            "args0": [
              {
                "type": "field_input",
                "name": "key",
                "text": "key"
              },
              {
                "type": "input_value",
                "name": "value",
                "check": [
                  "Boolean",
                  "Number",
                  "String"
                ]
              }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 0,
            "tooltip": "This block creates a data value inside a data object or data dictionary. The value may be True/False, a Number, or a String.",
            "helpUrl": ""
          }
        )
      }
}

Blockly.Blocks['data_dictionary_sub'] = {
      init: function() {
        this.jsonInit(
          {
            "type": "data_dictionary_sub",
            "message0": "%1 : %2",
            "args0": [
              {
                "type": "field_input",
                "name": "dictionary_name",
                "text": "key"
              },
              {
                "type": "input_statement",
                "name": "NAME",
                "check": "KVP"
              }
            ],
            "previousStatement": "KVP",
            "nextStatement": "KVP",
            "colour": 0,
            "tooltip": "This Block create a dictionary inside a data object or data dictionary. It can contain data dictionaries, or data values.",
            "helpUrl": ""
          }
        )
      }
}

Blockly.Blocks['calculation'] = {
    init: function() {
      this.jsonInit(
        {
            "type": "calculation",
            "message0": "%1 = %2 %3",
            "args0": [
              {
                "type": "input_value",
                "name": "variable",
                "check": "ENTITY"
              },
              {
                "type": "input_dummy"
              },
              {
                "type": "input_value",
                "name": "calculation",
                "check": "Number"
              }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "The first field is a variable. The second field is a calculation using math blocks.",
            "helpUrl": ""
        }
      )
    }
}

Blockly.Blocks['boolean_value'] = {
    init: function() {
      this.jsonInit(
        {
            "type": "boolean_value",
            "message0": "%1",
            "args0": [
              {
                "type": "field_dropdown",
                "name": "value",
                "options": [
                  [
                    "true",
                    "true"
                  ],
                  [
                    "false",
                    "false"
                  ]
                ]
              }
            ],
            "output": "Boolean",
            "colour": 195,
            "tooltip": "Returns either true or false.",
            "helpUrl": ""
          }
      )
    }
}

Blockly.Blocks['date_datatype'] = {
    init: function() {
      this.jsonInit(
{
    "type": "date_datatype",
    "message0": "📅 Date",
    "output": "DATATYPE",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['time_datatype'] = {
    init: function() {
      this.jsonInit(
  {
    "type": "time_datatype",
    "message0": "🕓 Time",
    "output": "DATATYPE",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['datetime_datatype'] = {
    init: function() {
      this.jsonInit(
  {
    "type": "datetime_datatype",
    "message0": "📅🕓 Date and Time",
    "output": "DATATYPE",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['duration_datatype'] = {
    init: function() {
      this.jsonInit(
  {
    "type": "duration_datatype",
    "message0": "⏱ Duration",
    "output": "DATATYPE",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['duration'] = {
    init: function() {
      this.jsonInit(  {
    "type": "duration",
    "message0": "%1 Y: %2 M: %3 D: %4 H: %5 M: %6 S: %7",
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
      },
      {
        "type": "field_number",
        "name": "hours",
        "value": 0,
        "min": 0
      },
      {
        "type": "field_number",
        "name": "minutes",
        "value": 0,
        "min": 0
      },
      {
        "type": "field_number",
        "name": "seconds",
        "value": 0,
        "min": 0,
        "precision": 0.01
      }
    ],
    "inputsInline": true,
    "output": "DURATION",
    "colour": 330,
    "tooltip": "Duration. Choose positive or negative, and provide a number for the number of years, months, days, hours, and minutes. Seconds are precise to 0.01s.",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['time'] = {
    init: function() {
      this.jsonInit(  {
    "type": "time",
    "message0": "%1 : %2 : %3 %4",
    "args0": [
      {
        "type": "field_number",
        "name": "hours",
        "value": 0,
        "min": 1,
        "max": 12
      },
      {
        "type": "field_number",
        "name": "minutes",
        "value": 0,
        "min": 0,
        "max": 59
      },
      {
        "type": "field_number",
        "name": "seconds",
        "value": 0,
        "min": 0,
        "max": 59.99,
        "precision": 0.01
      },
      {
        "type": "field_dropdown",
        "name": "daypart",
        "options": [
          [
            "am",
            "am"
          ],
          [
            "pm",
            "pm"
          ]
        ]
      }
    ],
    "output": "TIME",
    "colour": 330,
    "tooltip": "Time. Choose hours (1-12), minutes (0-59), and seconds (0-59.99), and part of day (am/pm).",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['date'] = {
    init: function() {
      this.jsonInit(
            {
    "type": "date",
    "message0": "%1 / %2 / %3",
    "args0": [
      {
        "type": "field_number",
        "name": "year",
        "value": 2020
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
    "tooltip": "Date. YYYY/M/D",
    "helpUrl": ""
  }
  )
}
}

Blockly.Blocks['datetime'] = {
    init: function() {
      this.jsonInit(  {
    "type": "datetime",
    "message0": "%1 / %2 / %3 at %4 : %5 : %6 %7",
    "args0": [
      {
        "type": "field_number",
        "name": "year",
        "value": 2020
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
      },
      {
        "type": "field_number",
        "name": "hours",
        "value": 0,
        "min": 1,
        "max": 12
      },
      {
        "type": "field_number",
        "name": "minutes",
        "value": 0,
        "min": 0,
        "max": 59
      },
      {
        "type": "field_number",
        "name": "seconds",
        "value": 0,
        "min": 0,
        "max": 59.99,
        "precision": 0.01
      },
      {
        "type": "field_dropdown",
        "name": "daypart",
        "options": [
          [
            "am",
            "am"
          ],
          [
            "pm",
            "pm"
          ]
        ]
      }
    ],
    "output": "DATETIME",
    "colour": 330,
    "tooltip": "Date/Time. YYYY/M/D at h:m:s am/pm (seconds are from 0-59.99)",
    "helpUrl": ""
  }
  )
    }
}


Blockly.Blocks['currency_datatype'] = {
  init: function() {
    this.jsonInit(  
{
  "type": "currency_datatype",
  "message0": "💰 Currency",
  "output": "DATATYPE",
  "colour": 180,
  "tooltip": "",
  "helpUrl": ""
}
)}}

Blockly.Blocks['concat_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "concat_text",
  "message0": "🔠 %1 with %2 🔠 %3 appended is 🔠 %4 %5",
  "args0": [
    {
      "type": "input_value",
      "name": "first_text",
      "check": [
        "String",
        "ENTITY"
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "second_text",
      "check": [
        "String",
        "ENTITY"
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "result",
      "check": [
        "String",
        "ENTITY"
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Makes one text value out of two text values by appending them.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['length_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "length_text",
  "message0": "length of 🔠 %1 is #️⃣ %2",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": [
        "String",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": [
        "Number",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns the length of a text value.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['toupper_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "toupper_text",
  "message0": "🔠 %1 in uppercase is 🔠 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": [
        "String",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "String",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns the text in ALL CAPS",
  "helpUrl": ""
}
)}}


Blockly.Blocks['tolower_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "tolower_text",
  "message0": "🔠 %1 in lowercase is 🔠 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": [
        "String",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "String",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns the text in lowercase",
  "helpUrl": ""
}
)}}


Blockly.Blocks['startswith_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "startswith_text",
  "message0": "🔠 %1 starts with 🔠 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "target",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns a yes or no if the first text begins with the second text.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['endswith_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "endswith_text",
  "message0": "🔠 %1 ends with 🔠 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "target",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns a yes or no if the first text ends with the second text.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['substring_text'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "substring_text",
  "message0": "🔠 %1 from character #️⃣ %2 to character  #️⃣ %3 is 🔠 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "start",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "length",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "output",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "Returns a part of a text. -1 means the end of the text value.",
  "helpUrl": ""
}
)}}

Blockly.Blocks['date_before'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "date_before",
  "message0": "📅/📅🕓 %1 is before 📅/📅🕓 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Enter two dates or dates with times to see if the first is before the second",
  "helpUrl": ""
}
)}}


Blockly.Blocks['date_before_or_eq'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "date_before_or_eq",
  "message0": "📅/📅🕓 %1 is before or at 📅/📅🕓 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "first_date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Enter two dates or dates with times to see if the first is before or exactly the same as the second.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['time_before_or_eq'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "time_before_or_eq",
  "message0": "🕓 %1 is before or at 🕓 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "first_time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "second_time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Enter two times to see if the first is before or exactly the same as the second.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['time_before'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "time_before",
  "message0": "🕓 %1 is before🕓 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "first_time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "second_time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Enter two times to see if the first is before the second.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['time_plus_dur'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "time_plus_dur",
  "message0": "🕓 %1 plus ⏱ %2 is 🕓 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": [
        "DURATION",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "TIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Add a time and a duration to get a new time.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['date_plus_dur'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "date_plus_dur",
  "message0": "📅/📅🕓 %1 plus ⏱ %2 is 📅/📅🕓 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": [
        "DURATION",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Add a time and a duration to get a new time.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['time_minus_time'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "time_minus_time",
  "message0": "🕓 %1 minus %2 🕓 %3 is ⏱ %4",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "second_time",
      "check": [
        "TIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "DURATION",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Find the duration between two times.",
  "helpUrl": ""
}
)}}


Blockly.Blocks['date_minus_date'] = {
  init: function() {
    this.jsonInit( 
{
  "type": "date_minus_date",
  "message0": "📅/📅🕓 %1 minus 📅/📅🕓 %2 is ⏱ %3",
  "args0": [
    {
      "type": "input_value",
      "name": "date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "second_date",
      "check": [
        "DATE",
        "DATETIME",
        "ENTITY"
      ]
    },
    {
      "type": "input_value",
      "name": "output",
      "check": [
        "DURATION",
        "ENTITY"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "Get the duration bewteen two dates or date times.",
  "helpUrl": ""
}
)}}

  Blockly.JavaScript['declare_type'] = function(block) {
    var text_type_name = block.getFieldValue('type_name');
    var code = text_type_name + '::Thing';
    return code;
  };
  
  Blockly.JavaScript['declare_type_is_type'] = function(block) {
    var value_first_type = Blockly.JavaScript.valueToCode(block, 'first_type', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_type = Blockly.JavaScript.valueToCode(block, 'second_type', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_first_type + "::" + value_second_type;
    return code;
  };
  
  Blockly.JavaScript['entity_declaration'] = function(block) {
    var text_entity_name = block.getFieldValue('entity_name');
    var code = text_entity_name;
    return code;
  };
  
  Blockly.JavaScript['entity_is_type'] = function(block) {
    var value_entity_name = Blockly.JavaScript.valueToCode(block, 'entity name', Blockly.JavaScript.ORDER_ATOMIC);
    var value_type_name = Blockly.JavaScript.valueToCode(block, 'type name', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_entity_name + ":" + value_type_name;
    return code;
  };
  
  Blockly.JavaScript['rule'] = function(block) {
    var text_rule_name = block.getFieldValue('rule_name');
    var statements_conclusion = Blockly.JavaScript.statementToCode(block, 'conclusion');
    var code = "";
    if (text_rule_name) {
        code += '@{' + text_rule_name.replace(/ /g,"_") + "}\n";
    }
    var currentBlock = this.getInputTargetBlock('conclusion');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ',\n';
      }
    }
    code += ' :-\n';
    currentBlock = this.getInputTargetBlock('conditions');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += "  " + codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ',\n';
      } else {
          code += '.\n';
      }
    }
    return code;
  };
  
  Blockly.JavaScript['variable_selector'] = function(block) {
    var text_variable_selected = block.getFieldValue('variable_selected');
    var code = '?' + text_variable_selected;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['object_selector'] = function(block) {
    var code = block.toString();
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  
  Blockly.JavaScript['category_selector'] = function(block) {
    var code = block.toString();
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  
  Blockly.JavaScript['attribute_selector'] = function(block) {
    var value_entity = Blockly.JavaScript.valueToCode(block, 'entity', Blockly.JavaScript.ORDER_ATOMIC);
    var value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var attributeName = block.getFieldValue('attributeName');
    var code = value_entity + '[' + attributeName + '->' + value + ']';
    return code;
  }
  
  Blockly.JavaScript['conjunction'] = function(block) {
    var statements_first_statement = Blockly.JavaScript.statementToCode(block, 'first_statement');
    var statements_second_statement = Blockly.JavaScript.statementToCode(block, 'second_statement');
    var code = statements_first_statement + ',\n' + statements_second_statement;
    return code;
  };
  
  Blockly.JavaScript['disjunction'] = function(block) {
    var code = "((\n";
    var currentBlock = this.getInputTargetBlock('first_statement');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += "\n";
        }
    }
    code += ");(";
    var currentBlock = this.getInputTargetBlock('second_statement');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += "\n";
        }
    }
    code += "))\n";
    return code;
  };
  
  Blockly.JavaScript['negation'] = function(block) {
    var code = '\\neg (';
    var currentBlock = this.getInputTargetBlock('NAME');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += "\n";
        }
    }
    code += ")";
    return code;};
  
  Blockly.JavaScript['fact'] = function(block) {
    var code = '';
    var currentBlock = this.getInputTargetBlock('statement');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock + '.\n';
      currentBlock = currentBlock.getNextBlock();
    }
    return code;
  };
  
  Blockly.JavaScript['query'] = function(block) {
    var code = '?- '
    var currentBlock = this.getInputTargetBlock('query');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += ".\n";
        }
    }
    return code;
  };
  
  Blockly.JavaScript['naf_negation'] = function(block) {
    var code = '\\naf (';
    var currentBlock = this.getInputTargetBlock('NAME');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += "\n";
        }
    }
    code += ")";
    return code;
  };
  
  Blockly.JavaScript['entity_identity'] = function(block) {
    var value_first_entity = Blockly.JavaScript.valueToCode(block, 'first_entity', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_entity = Blockly.JavaScript.valueToCode(block, 'second_entity', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_first_entity + ':=0=:' + value_second_entity;
    return code;
  };
  
  Blockly.JavaScript['attribute_declaration'] = function(block) {
    var text_attribute_name = block.getFieldValue('attribute_name');
    var value_attribute_name = Blockly.JavaScript.valueToCode(block, 'attribute_type', Blockly.JavaScript.ORDER_ATOMIC);
    var code = text_attribute_name.replace(/ /g,"_") + '=>' + value_attribute_name;
    return code;
  };
  
  Blockly.JavaScript['implication'] = function(block) {
    var statements_first_statement = Blockly.JavaScript.statementToCode(block, 'first_statement');
    var dropdown_implication_type = block.getFieldValue('implication type');
    var statements_second_statement = Blockly.JavaScript.statementToCode(block, 'second_statement');
    var code = statements_first_statement + dropdown_implication_type + statements_second_statement;
    return code;
  };
  
  Blockly.JavaScript['quantifier'] = function(block) {
    var dropdown_quantifier_type = block.getFieldValue('quantifier_type');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = dropdown_quantifier_type + '(' + value_name + ')^(';
    var statements_predicate_statement = Blockly.JavaScript.statementToCode(block, 'predicate_statement');
    var currentBlock = this.getInputTargetBlock('predicate_statement');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock;
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ",\n";
        } else {
            code += "\n";
        }
    }
    code += ')';
    return code;
  };
  
  Blockly.JavaScript['override'] = function(block) {
    var text_first_rule = block.getFieldValue('first_rule');
    var text_second_rule = block.getFieldValue('second_rule');
    var code = '\\overrides(' + text_first_rule + ", " + text_second_rule +").\n";
    return code;
  };
  
  Blockly.JavaScript['declare_type_with_attributes'] = function(block) {
    var value_type = Blockly.JavaScript.valueToCode(block, 'type', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = value_type + '[|';
    var currentBlock = this.getInputTargetBlock('NAME');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ', ';
      }
    }
    code += '|]';
    return code;
  };
  
  Blockly.JavaScript['boolean_datatype'] = function(block) {
    var code = "\\boolean";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['number_datatype'] = function(block) {
    var code = '\\integer';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['string_datatype'] = function(block) {
    var code = '\\string';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['comparitor'] = function(block) {
    var value_first_value = Blockly.JavaScript.valueToCode(block, 'first_value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_comparitor = block.getFieldValue('comparitor');
    var value_second_value = Blockly.JavaScript.valueToCode(block, 'second_value', Blockly.JavaScript.ORDER_ATOMIC);
    var new_comparitor = ''
    switch (dropdown_comparitor) {
      case 'lt':
        new_comparitor = '<';
        break;
      case 'lte':
        new_comparitor = '<=';
        break;
      case 'gt':
        new_comparitor = '>';
        break;
      case 'gte':
        new_comparitor = '>=';
        break;
      case 'eq':
        new_comparitor = '==';
        break;
      case 'neq':
        new_comparitor = '!=';
        break;
      case 'nid':
        new_comparitor = "!==";
        break;
      default:
        new_comparitor = "not implemented";
    }
    var code = value_first_value + new_comparitor + value_second_value;
    return code;
  };
  
  Blockly.JavaScript['assignment'] = function(block) {
    var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_variable + "=" + value_value;
    return code;
  };
  
  Blockly.JavaScript['aggregate_statement'] = function(block) {
    var dropdown_aggregation_operation = block.getFieldValue('aggregation_operation');
    var value_aggregate_variable = Blockly.JavaScript.valueToCode(block, 'aggregate_variable', Blockly.JavaScript.ORDER_ATOMIC);
    //var statements_aggregate_conditions = Blockly.JavaScript.statementToCode(block, 'aggregate_conditions');
    var code = dropdown_aggregation_operation + '{' + value_aggregate_variable + '|';
    var currentBlock = this.getInputTargetBlock('aggregate_conditions');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ', ';
      }
    }
    code += '}'
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['math_operator'] = function(block) {
    var value_left_value = Blockly.JavaScript.valueToCode(block, 'left_value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_right_value = Blockly.JavaScript.valueToCode(block, 'right_value', Blockly.JavaScript.ORDER_ATOMIC);
    switch(dropdown_operator) {
      case "add":
        var operator = "+";
        break;
      case "subtract":
        var operator = "-";
        break;
      case "multiply":
        var operator = "*";
        break;
      case "divide":
        var operator = "/";
        break;
      default:
        var operator = "not implemented";
    }
    var code = value_left_value + operator + value_right_value;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  Blockly.JavaScript['import_ruleset'] = function(block) {
    var text_ruleset_uri = block.getFieldValue('uri');
    var code = '';
    return code;
  };

  Blockly.JavaScript['data_property'] = function(block) {
    var value_subject = Blockly.JavaScript.valueToCode(block, 'subject', Blockly.JavaScript.ORDER_ATOMIC);
    var text_predicate = block.getFieldValue('predicate');
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_subject + '[' + text_predicate + '->' + value_object + ']';
    return code;
  };

  Blockly.JavaScript['data_dictionary'] = function(block) {
    var text_dictionary_name = block.getFieldValue('dictionary_name');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = '';
    // Add the starter code.
    code += text_dictionary_name + "[";
    // Add each of the sub-elements.
    var currentBlock = this.getInputTargetBlock('NAME');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ', ';
      }
    }
    // Add the closer code
    code += "]";
    return code;
  };
  
  Blockly.JavaScript['kvp_basic'] = function(block) {
    var text_key = block.getFieldValue('key');
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = text_key + ' -> ' + value_value;
    return code;
  };
  
  Blockly.JavaScript['data_dictionary_sub'] = function(block) {
    var text_dictionary_name = block.getFieldValue('dictionary_name');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    var code = '';
    // Add starter code
    code += text_dictionary_name + " -> \\#[";
    // Go through the sub-elements
    var currentBlock = this.getInputTargetBlock('NAME');
    while (currentBlock) {
      var codeForBlock = getCodeForSingleBlock(currentBlock);
      code += codeForBlock;
      currentBlock = currentBlock.getNextBlock();
      if (currentBlock) {
          code += ', ';
      }
    }
    // Add closer code
    code += "]";
    return code;
  };

  Blockly.JavaScript['calculation'] = function(block) {
    var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
    var value_calculation = Blockly.JavaScript.valueToCode(block, 'calculation', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_variable + " \\is " + value_calculation;
    return code;
  };

  Blockly.JavaScript['boolean_value'] = function(block) {
    var dropdown_value = block.getFieldValue('value');
    var code = "";
    if (dropdown_value == "true") {
      code = "\\true";
    }
    if (dropdown_value == "false") {
      code = "\\false";
    }
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['datetime'] = function(block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    var dropdown_daypart = block.getFieldValue('daypart');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['date'] = function(block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['time'] = function(block) {
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    var dropdown_daypart = block.getFieldValue('daypart');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['duration'] = function(block) {
    var dropdown_sign = block.getFieldValue('sign');
    var number_years = block.getFieldValue('years');
    var number_months = block.getFieldValue('months');
    var number_days = block.getFieldValue('days');
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    // TODO: Assemble JavaScript into code variable.
    var code = '...';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript['duration_datatype'] = function(block) {
    var code = "\\duration";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['datetime_datatype'] = function(block) {
    var code = "\\datetime";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['time_datatype'] = function(block) {
    var code = "\\time";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['date_datatype'] = function(block) {
    var code = "\\date";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['date_before'] = function(block) {
    var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['date_before_or_eq'] = function(block) {
    var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['time_before_or_eq'] = function(block) {
    var value_first_time = Blockly.JavaScript.valueToCode(block, 'first_time', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_time = Blockly.JavaScript.valueToCode(block, 'second_time', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['time_before'] = function(block) {
    var value_first_time = Blockly.JavaScript.valueToCode(block, 'first_time', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_time = Blockly.JavaScript.valueToCode(block, 'second_time', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['time_plus_dur'] = function(block) {
    var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
    var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['date_plus_dur'] = function(block) {
    var value_date = Blockly.JavaScript.valueToCode(block, 'date', Blockly.JavaScript.ORDER_ATOMIC);
    var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['time_minus_time'] = function(block) {
    var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_time = Blockly.JavaScript.valueToCode(block, 'second_time', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['date_minus_date'] = function(block) {
    var value_date = Blockly.JavaScript.valueToCode(block, 'date', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['concat_text'] = function(block) {
    var value_first_text = Blockly.JavaScript.valueToCode(block, 'first_text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_second_text = Blockly.JavaScript.valueToCode(block, 'second_text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['length_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['toupper_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['tolower_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['startswith_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_target = Blockly.JavaScript.valueToCode(block, 'target', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['endswith_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_target = Blockly.JavaScript.valueToCode(block, 'target', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  Blockly.JavaScript['substring_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_start = Blockly.JavaScript.valueToCode(block, 'start', Blockly.JavaScript.ORDER_ATOMIC);
    var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC);
    var value_output = Blockly.JavaScript.valueToCode(block, 'output', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
  };
  
  /**
   * Generate code for the specified block but not following blocks.
   * @param {Blockly.Block} block The block to generate code for.
   * @return {string|!Array} For statement blocks, the generated code.
   *     For value blocks, an array containing the generated code and an
   *     operator order value.  Returns '' if block is null.
   */
  function getCodeForSingleBlock(block) {
    if (!block) {
      return '';
    }
    if (block.disabled) {
      // Skip past this block if it is disabled.
      return getCodeForSingleBlock(block.getNextBlock());
    }
  
    var func = Blockly.JavaScript[block.type];
    if (typeof func != "function") {
      throw Error("Language JavaScript does not know how to generate code for block type " + block.type);
    }
    // First argument to func.call is the value of 'this' in the generator.
    // Prior to 24 September 2013 'this' was the only way to access the block.
    // The current prefered method of accessing the block is through the second
    // argument to func.call, which becomes the first parameter to the generator.
    var code = func.call(block, block);
    if (typeof code == "array") {
      if (!block.outputConnection || block.outputConnection == "") {
        throw Error("Expecting string from statement block " + block.type);
      }
      return [code[0], code[1]];
    } else if (typeof code == "string") {
      var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
      if (this.STATEMENT_PREFIX) {
        code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') +
            code;
      }
      return code;
    } else if (code === null) {
      // Block has handled code generation itself.
      return '';
    } else {
      throw ReferenceError('Invalid code generated: ' + code);
    }
  };

  OBJECT_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
      var container = Blockly.utils.xml.createElement('mutation');
      var objectName = this.getFieldValue('objectName');
      container.setAttribute('objectname', objectName);
      return container;
    },

    domToMutation: function(xmlElement) {
      var objectName = xmlElement.getAttribute('objectname');
      this.updateObjectName(objectName);
    },

    updateObjectName: function(objectName) {
      this.setFieldValue(objectName, 'objectName');
    }
  };

  Blockly.Extensions.registerMutator('object_selector_mutator', OBJECT_SELECTOR_MUTATOR_MIXIN);

  CATEGORY_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
      var container = Blockly.utils.xml.createElement('mutation');
      var categoryName = this.getFieldValue('categoryName');
      container.setAttribute('categoryname', categoryName);
      return container;
    },

    domToMutation: function(xmlElement) {
      var categoryName = xmlElement.getAttribute('categoryname');
      this.updateCategoryName(categoryName);
    },

    updateCategoryName: function(categoryName) {
      this.setFieldValue(categoryName, 'categoryName');
    }
  }

  Blockly.Extensions.registerMutator('category_selector_mutator', CATEGORY_SELECTOR_MUTATOR_MIXIN);

  ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
      var container = Blockly.utils.xml.createElement('mutation');
      var attributeName = this.getFieldValue('attributeName');
      var attributeType = this.getInput('value').connection.getCheck()[0];
      container.setAttribute('attributename', attributeName);
      container.setAttribute('attributetype', attributeType);
      return container;
    },
    domToMutation: function(xmlElement) {
      var attributeName = xmlElement.getAttribute('attributename');
      var attributeType = xmlElement.getAttribute('attributetype');
      this.updateAttributeSelector(attributeName,attributeType);
    },

    updateAttributeSelector: function(attributeName,attributeType) {
      this.setFieldValue(attributeName, "attributeName");
      this.getInput('value').setCheck([attributeType,"ENTITY"]);
    }
  }


  Blockly.Extensions.registerMutator('attribute_selector_mutator', ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);

      function importBlawxCode() {
	// Get all the blocks and go through them.
	get_blocks = workspace.getAllBlocks();
	for (var i = 0; i < get_blocks.length; i++ ) {
	  if (get_blocks[i].type == "import_ruleset") {
            currentUri = get_blocks[i].getFieldValue('uri');
            var uri;
            if (currentUri == "filename.blawx") {
  	      uri="";
            } else {
              uri = currentUri;
            }
            importSpace = new Blockly.Workspace();
            importDictionary[get_blocks[i].id] = importSpace;
            var request = new XMLHttpRequest();
            request.open('GET', uri, false);
            request.send(null);
            var xml = Blockly.Xml.textToDom(request.responseText);
            Blockly.Xml.domToWorkspace(xml, importSpace);        
            }
            
          }
        }

var workspace = new Blockly.Workspace();

var XMLHttpRequest = require("/usr/local/lib/node_modules/xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var data = "";
var importDictionary = {};
var datafile = process.argv[2];

data = fs.readFileSync(datafile,'utf8');

  try {
    var xml = Blockly.Xml.textToDom(data);
  
    // Create workspace and import the XML
    Blockly.Xml.domToWorkspace(xml, workspace);
	  importBlawxCode();
  
    // Convert code and log output
    var code = "";
    for (var id in importDictionary) {
	    code += Blockly.JavaScript.workspaceToCode(importDictionary[id]);
    }
    code += Blockly.JavaScript.workspaceToCode(workspace);
    console.log(code);
  }
  catch (e) {
    console.log(e);
  }
