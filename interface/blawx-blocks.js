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
    "message0": "📅🕔 Date and Time",
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