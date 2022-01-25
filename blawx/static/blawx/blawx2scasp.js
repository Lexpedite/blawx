function liveCode(event) {
  // console.log("Livecoding")
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  document.getElementById('output').textContent = code;
}
demoWorkspace.addChangeListener(liveCode);

function text2math(string) {
  switch(string) {
    case "add": return "+";
    case "sub": return "-";
    case "mul": return "*";
    case "div": return "/";
    case "lt": return "<";
    case "lte": return "=<";
    case "gt": return ">";
    case "gte": return ">=";
    case "eq": return "==";
    case "neq": return "\\=";
  }
}

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

Blockly.JavaScript['variable'] = function(block) {
  var text_variable_name = block.getFieldValue('variable_name');
  // TODO: Assemble JavaScript into code variable.
  var code = text_variable_name;
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['silent_variable'] = function(block) {
  var text_variable_name = block.getFieldValue('variable_name');
  // TODO: Assemble JavaScript into code variable.
  var code = '_' + text_variable_name;
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['unnamed_variable'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '_';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variable_assignment'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_variable + ' = ' + value_value;
  return code;
};

Blockly.JavaScript['conjunction'] = function(block) {
  var statements_conjoined_statements = Blockly.JavaScript.statementToCode(block, 'conjoined_statements');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['disjunction'] = function(block) {
  var statements_disjoined_statements = Blockly.JavaScript.statementToCode(block, 'disjoined_statements');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['logical_negation'] = function(block) {
  var statements_negated_statement = Blockly.JavaScript.statementToCode(block, 'negated_statement');
  // TODO: Assemble JavaScript into code variable.
  var code = '-' + statements_negated_statement;
  return code;
};

Blockly.JavaScript['default_negation'] = function(block) {
  var statements_default_negated_statement = Blockly.JavaScript.statementToCode(block, 'default_negated_statement');
  // TODO: Assemble JavaScript into code variable.
  var code = 'not ' + statements_default_negated_statement;
  return code;
};

Blockly.JavaScript['comparison'] = function(block) {
  var value_first_comparator = Blockly.JavaScript.valueToCode(block, 'first_comparator', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_second_comparator = Blockly.JavaScript.valueToCode(block, 'second_comparator', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_first_comparator + " " + text2math(dropdown_operator) + " " + value_second_comparator;
  return code;
};

Blockly.JavaScript['fact'] = function(block) {
  var value_source = Blockly.JavaScript.valueToCode(block, 'source', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  var currentBlock = this.getInputTargetBlock('statements');
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    code += codeForBlock + '.\n';
    currentBlock = currentBlock.getNextBlock();
  }
  return code;
};

Blockly.JavaScript['query'] = function(block) {
  var statements_query = Blockly.JavaScript.statementToCode(block, 'query');
  // TODO: Assemble JavaScript into code variable.
  var code = '?- ' + statements_query + '.\n\n';
  return code;
};

Blockly.JavaScript['rule'] = function(block) {
  var value_source = Blockly.JavaScript.valueToCode(block, 'source', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_conditions = Blockly.JavaScript.statementToCode(block, 'conditions');
  var statements_conclusion = Blockly.JavaScript.statementToCode(block, 'conclusion');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['unattributed_rule'] = function(block) {
  var statements_conditions = Blockly.JavaScript.statementToCode(block, 'conditions');
  var statements_conclusion = Blockly.JavaScript.statementToCode(block, 'conclusion');
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  var currentBlock = this.getInputTargetBlock('conclusion');
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    currentBlock = currentBlock.getNextBlock();
    code += codeForBlock;
    if (currentBlock) {
      code += ",\n";
    }
  }
  code += " :- \n";
  currentBlock = this.getInputTargetBlock('conditions');
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    currentBlock = currentBlock.getNextBlock();
    code += codeForBlock;
    if (currentBlock) {
      code += ",\n";
    }
  }
  code += ".\n"
  return code;
};

Blockly.JavaScript['legal_doc'] = function(block) {
  var text_legal_doc_name = block.getFieldValue('legal_doc_name');
  var statements_divisions = Blockly.JavaScript.statementToCode(block, 'divisions');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['legal_doc_node'] = function(block) {
  var text_node_name = block.getFieldValue('node_name');
  var statements_sub_parts = Blockly.JavaScript.statementToCode(block, 'sub_parts');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['legal_doc_text'] = function(block) {
  var text_legal_doc_text = block.getFieldValue('legal_doc_text');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['doc_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['overrules'] = function(block) {
  var value_defeating_rule = Blockly.JavaScript.valueToCode(block, 'defeating_rule', Blockly.JavaScript.ORDER_ATOMIC);
  var value_defeated_rule = Blockly.JavaScript.valueToCode(block, 'defeated_rule', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['object_equality'] = function(block) {
  var value_first_object = Blockly.JavaScript.valueToCode(block, 'first_object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_object = Blockly.JavaScript.valueToCode(block, 'second_object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_first_object + " = " + value_second_object;
  return code;
};

Blockly.JavaScript['object_disequality'] = function(block) {
  var value_first_object = Blockly.JavaScript.valueToCode(block, 'first_object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_object = Blockly.JavaScript.valueToCode(block, 'second_object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_first_object + " \\= " + value_second_object;
  return code;
};

Blockly.JavaScript['object_category'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_category = Blockly.JavaScript.valueToCode(block, 'category', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_category + "(" + value_object + ")";
  return code;
};

Blockly.JavaScript['include'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['unattributed_fact'] = function(block) {
  // var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  var currentBlock = this.getInputTargetBlock('statements');
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    code += codeForBlock + '.\n';
    currentBlock = currentBlock.getNextBlock();
  }
  return code;
};

Blockly.JavaScript['constraint'] = function(block) {
  var value_source = Blockly.JavaScript.valueToCode(block, 'source', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_conditions = Blockly.JavaScript.statementToCode(block, 'conditions');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['unattributed_constraint'] = function(block) {
  var statements_conditions = Blockly.JavaScript.statementToCode(block, 'conditions');
  // TODO: Assemble JavaScript into code variable.
  var code = ":- ";
  var currentBlock = this.getInputTargetBlock('conditions');
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    currentBlock = currentBlock.getNextBlock();
    code += codeForBlock;
    if (currentBlock) {
      code += ',\n';
    }
  }
  code += ".\n";
  return code;
};

Blockly.JavaScript['category_declaration'] = function(block) {
  var text_category_name = block.getFieldValue('category_name');
  // // TODO: Assemble JavaScript into code variable.
  var code = '#pred ' + text_category_name + "(X) :: '@(X) is a " + text_category_name + "'";
  return code;
};

Blockly.JavaScript['category_equivalence'] = function(block) {
  var value_first_category = Blockly.JavaScript.valueToCode(block, 'first_category', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_category = Blockly.JavaScript.valueToCode(block, 'second_category', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_second_category + '(X) :- \n'  + value_first_category + '(X)';
  return code;
};

Blockly.JavaScript['category_attribute'] = function(block) {
  // var value_category = Blockly.JavaScript.valueToCode(block, 'category', Blockly.JavaScript.ORDER_ATOMIC);
  // var statements_attributes = Blockly.JavaScript.statementToCode(block, 'attributes');
  var currentBlock = this.getInputTargetBlock('attributes');
  var code = '';
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    code += codeForBlock + '\n';
    currentBlock = currentBlock.getNextBlock();
  }
  // TODO: Assemble JavaScript into code variable.
  
  return code;
};

Blockly.JavaScript['attribute_declaration'] = function(block) {
  var text_attribute_name = block.getFieldValue('attribute_name');
  // var value_attribute_type = Blockly.JavaScript.valueToCode(block, 'attribute_type', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '';
  var nextblock = block.getNextBlock();
  if (nextblock && nextblock.type == "attribute_display") {
    var order = nextblock.getFieldValue('order');
    var prefix = nextblock.getFieldValue('prefix');
    var infix = nextblock.getFieldValue('infix');
    var postfix = nextblock.getFieldValue('postfix');
    code += "#pred " + text_attribute_name + "(";
    if (order == "ov") {
      code += "X,Y";
    } else {
      code += "Y,X";
    }
    code += ") :: '" + prefix + " @(X) " + infix + " @(Y) " + postfix + "'\n"
  }
  return code;
};

Blockly.JavaScript['attribute_display'] = function(block) {
  // var dropdown_order = block.getFieldValue('order');
  // var text_prefix = block.getFieldValue('prefix');
  // var text_infix = block.getFieldValue('infix');
  // var text_postfix = block.getFieldValue('postfix');
  // // TODO: Assemble JavaScript into code variable.
  // var code = '...;\n';
  return '';
};

Blockly.JavaScript['category_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = this.getFieldValue('category_name');
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['object_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = this.getFieldValue('object_name');
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['object_declaration'] = function(block) {
  var text_object_name = block.getFieldValue('object_name');
  var category_name = block.blawxCategoryName;
  // TODO: Assemble JavaScript into code variable.
  var code = category_name + "(" + text_object_name + ")";
  return code;
};

Blockly.JavaScript['category_display'] = function(block) {
  var dropdown_order = block.getFieldValue('order');
  var text_prefix = block.getFieldValue('prefix');
  var text_infix = block.getFieldValue('infix');
  var text_postfix = block.getFieldValue('postfix');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['true_false_type_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['number_type_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['date_type_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_type_selector'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['number_value'] = function(block) {
  var number_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  var code = number_value;
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['true_value'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'true';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['false_value'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'false';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['date_value'] = function(block) {
  var number_year = block.getFieldValue('year');
  var number_month = block.getFieldValue('month');
  var number_day = block.getFieldValue('day');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_value'] = function(block) {
  var dropdown_sign = block.getFieldValue('sign');
  var number_years = block.getFieldValue('years');
  var number_months = block.getFieldValue('months');
  var number_days = block.getFieldValue('days');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['calculation'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var value_calculation = Blockly.JavaScript.valueToCode(block, 'calculation', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_variable + " is " + value_calculation;
  return code;
};

Blockly.JavaScript['math_operation'] = function(block) {
  var value_left_side = Blockly.JavaScript.valueToCode(block, 'left_side', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_right_side = Blockly.JavaScript.valueToCode(block, 'right_side', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_left_side + " " + text2math(dropdown_operator) + " " + value_right_side;
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['date_comparison'] = function(block) {
  var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_comparison = block.getFieldValue('comparison');
  var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['date_element'] = function(block) {
  var dropdown_element = block.getFieldValue('element');
  var value_date = Blockly.JavaScript.valueToCode(block, 'date', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['date_calculate'] = function(block) {
  var value_year = Blockly.JavaScript.valueToCode(block, 'year', Blockly.JavaScript.ORDER_ATOMIC);
  var value_month = Blockly.JavaScript.valueToCode(block, 'month', Blockly.JavaScript.ORDER_ATOMIC);
  var value_day = Blockly.JavaScript.valueToCode(block, 'day', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_calculate'] = function(block) {
  var value_sign = Blockly.JavaScript.valueToCode(block, 'sign', Blockly.JavaScript.ORDER_ATOMIC);
  var value_years = Blockly.JavaScript.valueToCode(block, 'years', Blockly.JavaScript.ORDER_ATOMIC);
  var value_months = Blockly.JavaScript.valueToCode(block, 'months', Blockly.JavaScript.ORDER_ATOMIC);
  var value_days = Blockly.JavaScript.valueToCode(block, 'days', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['duration_element'] = function(block) {
  var dropdown_element = block.getFieldValue('element');
  var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_ATOMIC to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['date_difference_days'] = function(block) {
  var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
  var value_duration_days = Blockly.JavaScript.valueToCode(block, 'duration_days', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['date_difference'] = function(block) {
  var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
  var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['date_add'] = function(block) {
  var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
  var value_first_date = Blockly.JavaScript.valueToCode(block, 'first_date', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_date = Blockly.JavaScript.valueToCode(block, 'second_date', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['numerical_constraint'] = function(block) {
  var value_first_comparator = Blockly.JavaScript.valueToCode(block, 'first_comparator', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_second_comparator = Blockly.JavaScript.valueToCode(block, 'second_comparator', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_first_comparator + " #" + text2math(dropdown_operator) + " " + value_second_comparator;
  return code;
};

Blockly.JavaScript['json_input'] = function(block) {
  var statements_json = Blockly.JavaScript.statementToCode(block, 'json');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['json_list'] = function(block) {
  var statements_json_list_elements = Blockly.JavaScript.statementToCode(block, 'json_list_elements');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['json_value'] = function(block) {
  var text_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['json_dictionary'] = function(block) {
  var text_predicate = block.getFieldValue('predicate');
  var statements_parameters = Blockly.JavaScript.statementToCode(block, 'parameters');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['silent_legal_doc_node'] = function(block) {
  var text_node_name = block.getFieldValue('node_name');
  var statements_sub_parts = Blockly.JavaScript.statementToCode(block, 'sub_parts');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['legal_doc_text_continuation'] = function(block) {
  var text_legal_doc_text = block.getFieldValue('legal_doc_text');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['legal_doc_text_parent_continuation'] = function(block) {
  var text_legal_doc_text = block.getFieldValue('legal_doc_text');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['attribute_selector'] = function(block) {
  var value_first_element = Blockly.JavaScript.valueToCode(block, 'first_element', Blockly.JavaScript.ORDER_ATOMIC);
  var value_second_element = Blockly.JavaScript.valueToCode(block, 'second_element', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var predicate = this.blawxAttributeName;
  var order = this.blawxAttributeOrder;
  if (order == "ov") {
    first = value_first_element;
    second = value_second_element;
  } else {
    first = value_second_element;
    second = value_first_element;
  }
  var code = predicate + "(" + first + "," + second + ")";
  return code;
};

Blockly.JavaScript['assume'] = function(block) {
  // var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
  // TODO: Assemble JavaScript into code variable.
  var currentBlock = this.getInputTargetBlock('statements');
  var code = '';
  while (currentBlock) {
    var codeForBlock = getCodeForSingleBlock(currentBlock);
    code += "#abducible " + codeForBlock + '.\n';
    currentBlock = currentBlock.getNextBlock();
  }
  return code;
};