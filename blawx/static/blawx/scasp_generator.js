// This is a stub version of an sCASP generator for Blockly based
// on the JavaScript generator included with Blockly, which is
// available at https://github.com/google/blockly/blob/master/generators/javascript.js
//
// Some features that were not necessary for Blawx have been excluded,
// such as features dealing with how Blockly keeps track of variables.
// A more formal re-implementation of sCASP as a Blockly language would
// probably require re-implementing this code, and the code generators.

const sCASP = new Blockly.Generator('sCASP');

sCASP.ORDER_ATOMIC = 0;
sCASP.ORDER_NONE = 99;

sCASP.ORDER_OVERRIDES = [];


sCASP.isInitialized = false;

sCASP.init = function (workspace) {
    // Call Blockly.Generator's init.
    Object.getPrototypeOf(this).init.call(this);
    this.isInitialized = true;
}

sCASP.finish = function (code) {
    // Call Blockly.Generator's finish.
    code = Object.getPrototypeOf(this).finish.call(this, code);
    this.isInitialized = false;
    return code
}


// I'm not sure that this is correct in the s(CASP) context, even though
// the equivalent is valid for JavaScript.
sCASP.scrubNakedValue = function (line) {
    return line + '.\n';
};

sCASP.scrub_ = function (block, code, opt_thisOnly) {
    let commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        let comment = block.getCommentText();
        if (comment) {
            comment = Blockly.utils.string.wrap(comment, this.COMMENT_WRAP - 2);
            commentCode += this.prefixLines(comment + '\n', '% ');
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (let i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type === Blockly.inputTypes.VALUE) {
                const childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(comment, '% ');
                    }
                }
            }
        }
    }
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

function text2math(string) {
    switch (string) {
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

    var func = sCASP[block.type];
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

sCASP['variable'] = function (block) {
    var text_variable_name = block.getFieldValue('variable_name');
    var code = text_variable_name;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['silent_variable'] = function (block) {
    var text_variable_name = block.getFieldValue('variable_name');
    var code = '_' + text_variable_name;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['unnamed_variable'] = function (block) {
    var code = '_';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['variable_assignment'] = function (block) {
    var value_variable = sCASP.valueToCode(block, 'variable', sCASP.ORDER_ATOMIC);
    var value_value = sCASP.valueToCode(block, 'value', sCASP.ORDER_ATOMIC);
    var code = value_variable + ' = ' + value_value;
    return code;
};

sCASP['conjunction'] = function (block) {
    var statements_conjoined_statements = sCASP.statementToCode(block, 'conjoined_statements');
    var code = '...;\n';
    return code;
};

sCASP['disjunction'] = function (block) {
    var statements_disjoined_statements = sCASP.statementToCode(block, 'disjoined_statements');
    var code = '...;\n';
    return code;
};

sCASP['logical_negation'] = function (block) {
    var statements_negated_statement = sCASP.statementToCode(block, 'negated_statement');
    var code = '-' + statements_negated_statement.trim();
    return code;
};

sCASP['default_negation'] = function (block) {
    var statements_default_negated_statement = sCASP.statementToCode(block, 'default_negated_statement');
    var code = 'not ' + statements_default_negated_statement.trim();
    return code;
};

sCASP['comparison'] = function (block) {
    var value_first_comparator = sCASP.valueToCode(block, 'first_comparator', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_second_comparator = sCASP.valueToCode(block, 'second_comparator', sCASP.ORDER_ATOMIC);
    var code = value_first_comparator + " " + text2math(dropdown_operator) + " " + value_second_comparator;
    return code;
};

sCASP['fact'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_statements = sCASP.statementToCode(block, 'statements');
    var code = "";
    var currentBlock = this.getInputTargetBlock('statements');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock + '.\n';
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['query'] = function (block) {
    var statements_query = sCASP.statementToCode(block, 'query');
    // var code = '?- ' + statements_query + '.\n\n';
    var code = "?- ";
    var currentBlock = this.getInputTargetBlock('query');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ", "
        }
    }
    code += ".\n"
    return code;

};

sCASP['rule'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var statements_conclusion = sCASP.statementToCode(block, 'conclusion');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_rule'] = function (block) {
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var statements_conclusion = sCASP.statementToCode(block, 'conclusion');
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

sCASP['legal_doc'] = function (block) {
    var text_legal_doc_name = block.getFieldValue('legal_doc_name');
    var statements_divisions = sCASP.statementToCode(block, 'divisions');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_node'] = function (block) {
    var text_node_name = block.getFieldValue('node_name');
    var statements_sub_parts = sCASP.statementToCode(block, 'sub_parts');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['doc_selector'] = function (block) {
    var value_doc_part_name = block.getFieldValue('doc_part_name');
    var value_section_reference = block.section_reference;
    var code = value_section_reference.toLowerCase();
    // value_doc_part_name.replace(' ','__').replace('.','_').toLowerCase() + "_end";
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['overrules'] = function (block) {
    var value_defeating_rule = sCASP.valueToCode(block, 'defeating_rule', sCASP.ORDER_ATOMIC);
    var statements_defeating_statement = sCASP.statementToCode(block, 'defeating_statement');
    var value_defeated_rule = sCASP.valueToCode(block, 'defeated_rule', sCASP.ORDER_ATOMIC);
    var statements_defeated_statement = sCASP.statementToCode(block, 'defeated_statement');
    var code = "blawx_defeated(" + value_defeated_rule + ",";
    var first_params = deconstruct_term(statements_defeated_statement);
    for (var i = 0; i< first_params.length; i++) {
        code += first_params[i].trim();
        if (i+1 < first_params.length) {
            code += ",";
        }
    }
    code += ") :- holds(" + value_defeating_rule + ",";
    var second_params = deconstruct_term(statements_defeating_statement);
    for (var i = 0; i< second_params.length; i++) {
        code += second_params[i].trim();
        if (i+1 < second_params.length) {
            code += ",";
        }
    }
    code += ")";
    return code;
};

sCASP['object_equality'] = function (block) {
    var value_first_object = sCASP.valueToCode(block, 'first_object', sCASP.ORDER_ATOMIC);
    var value_second_object = sCASP.valueToCode(block, 'second_object', sCASP.ORDER_ATOMIC);
    var code = value_first_object + " = " + value_second_object;
    return code;
};

sCASP['object_disequality'] = function (block) {
    var value_first_object = sCASP.valueToCode(block, 'first_object', sCASP.ORDER_ATOMIC);
    var value_second_object = sCASP.valueToCode(block, 'second_object', sCASP.ORDER_ATOMIC);
    var code = value_first_object + " \\= " + value_second_object;
    return code;
};

sCASP['object_category'] = function (block) {
    var value_object = sCASP.valueToCode(block, 'object', sCASP.ORDER_ATOMIC);
    var value_category = sCASP.valueToCode(block, 'category', sCASP.ORDER_ATOMIC);
    var code = value_category + "(" + value_object + ")";
    return code;
};

sCASP['include'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_fact'] = function (block) {
    // var statements_statements = sCASP.statementToCode(block, 'statements');
    var code = "";
    var currentBlock = this.getInputTargetBlock('statements');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        if (!code.endsWith('\n')) {
            code += '.\n';
        }
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['constraint'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_constraint'] = function (block) {
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var code = "false :- ";
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

sCASP['category_declaration'] = function (block) {
    var text_category_name = block.getFieldValue('category_name');
    var code = '';
    var nextblock = block.getNextBlock();
    code += "blawx_category(" + text_category_name + ").\n";
    if (nextblock && nextblock.type == "category_display") {
        var prefix = nextblock.getFieldValue('prefix');
        var postfix = nextblock.getFieldValue('postfix');
        code += "blawx_category_nlg(" + text_category_name + ",\"" + prefix + "\",\"" + postfix + "\").\n"
        code += "#pred " + text_category_name + "(X) :: '";
        code += (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
        code += "#pred according_to(R," + text_category_name + "(X)) :: '";
        code += "according to @(R), " + (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
        code += "#pred legally_holds(_," + text_category_name + "(X)) :: '";
        code += "it legally holds that " + (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
    } else {
        code += '#pred ' + text_category_name + "(X) :: '@(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
        code += "#pred according_to(R," + text_category_name + "(X)) :: '";
        code += "according to @(R), @(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
        code += "#pred legally_holds(_," + text_category_name + "(X)) :: '";
        code += "it legally holds that @(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
    }
    return code;
};

sCASP['category_equivalence'] = function (block) {
    var value_first_category = sCASP.valueToCode(block, 'first_category', sCASP.ORDER_ATOMIC);
    var value_second_category = sCASP.valueToCode(block, 'second_category', sCASP.ORDER_ATOMIC);
    var code = value_second_category + '(X) :- \n' + value_first_category + '(X)';
    return code;
};

sCASP['category_attribute'] = function (block) {
    var value_category = sCASP.valueToCode(block, 'category', sCASP.ORDER_ATOMIC);
    // var statements_attributes = sCASP.statementToCode(block, 'attributes');
    var currentBlock = this.getInputTargetBlock('attributes');
    var code = '';
    while (currentBlock) {
        if (currentBlock.type == "attribute_declaration") {
            var text_attribute_name = currentBlock.getFieldValue('attribute_name');
            // var block_attribute_type = currentBlock.getInputTargetBlock('attribute_type');
            var text_attribute_type = sCASP.valueToCode(currentBlock,'attribute_type', sCASP.ORDER_ATOMIC);
            code += 'blawx_attribute(' + value_category + ',' + text_attribute_name + ',' + text_attribute_type + ').\n';
        }
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        if (codeForBlock != "") {
            code += '\n';
        }
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['attribute_declaration'] = function (block) {
    var text_attribute_name = block.getFieldValue('attribute_name');
    var block_attribute_type = block.getInputTargetBlock('attribute_type');
    var code = '';
    var nextblock = block.getNextBlock();
    if (nextblock && nextblock.type == "attribute_display") {
        var order = nextblock.getFieldValue('order');
        var prefix = nextblock.getFieldValue('prefix');
        var infix = nextblock.getFieldValue('infix');
        var postfix = nextblock.getFieldValue('postfix');
        code += "blawx_attribute_nlg(" + text_attribute_name + "," + order + ",\"" + prefix + "\",\"" + infix + "\",\"" + postfix + "\").\n"
        code += "#pred " + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        add_code = prefix.replace(/'/g, '\\\'') + " @(X) " + infix.replace(/'/g, '\\\'') + " @(Y) " + postfix.replace(/'/g, '\\\'')
        code += ") :: '" + add_code.trim() + "'.\n"
        code += "#pred according_to(R," + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        code += ")) :: 'according to @(R), " + add_code.trim() + "'.\n"
        code += "#pred legally_holds(_," + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        code += ")) :: 'it legally holds that " + add_code.trim() + "'.\n"
        if (block_attribute_type.type == "true_false_type_selector") {
            code += "opposes(" + text_attribute_name + "(X,true)," + text_attribute_name + "(X,false)).\n";
            code += "opposes(" + text_attribute_name + "(X,false)," + text_attribute_name + "(X,true)).\n";
        }
    }
    return code;
};

sCASP['attribute_display'] = function (block) {
    // var dropdown_order = block.getFieldValue('order');
    // var text_prefix = block.getFieldValue('prefix');
    // var text_infix = block.getFieldValue('infix');
    // var text_postfix = block.getFieldValue('postfix');
    // // var code = '...;\n';
    return '';
};

sCASP['category_selector'] = function (block) {
    var code = this.getFieldValue('category_name');
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['object_selector'] = function (block) {
    var code = this.getFieldValue('object_name');
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['object_declaration'] = function (block) {
    var text_object_name = block.getFieldValue('object_name');
    var category_name = block.blawxCategoryName;
    var code = category_name + "(" + text_object_name + ")";
    return code;
};

sCASP['category_display'] = function (block) {
    // var dropdown_order = block.getFieldValue('order');
    // var text_prefix = block.getFieldValue('prefix');
    // var text_infix = block.getFieldValue('infix');
    // var text_postfix = block.getFieldValue('postfix');
    var code = '';
    return code;
};

sCASP['true_false_type_selector'] = function (block) {
    var code = 'boolean';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['number_type_selector'] = function (block) {
    var code = 'number';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_type_selector'] = function (block) {
    var code = 'date';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_type_selector'] = function (block) {
    var code = 'duration';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['number_value'] = function (block) {
    var number_value = block.getFieldValue('value');
    var code = number_value;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['true_value'] = function (block) {
    var code = 'true';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['false_value'] = function (block) {
    var code = 'false';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_value'] = function (block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    var code = 'date(' + number_year + ',' + number_month + ',' + number_day + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_value'] = function (block) {
    var dropdown_sign = block.getFieldValue('sign');
    var number_years = block.getFieldValue('years');
    var number_months = block.getFieldValue('months');
    var number_days = block.getFieldValue('days');
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    var code = 'duration(' + dropdown_sign + ',' + number_years + ',' + number_months + ',' + number_days + ',' + number_hours + ',' + number_minutes + ',' + number_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['calculation'] = function (block) {
    var value_variable = sCASP.valueToCode(block, 'variable', sCASP.ORDER_ATOMIC);
    var value_calculation = sCASP.valueToCode(block, 'calculation', sCASP.ORDER_ATOMIC);
    var code = value_variable + " is " + value_calculation;
    return code;
};

sCASP['math_operation'] = function (block) {
    var value_left_side = sCASP.valueToCode(block, 'left_side', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_right_side = sCASP.valueToCode(block, 'right_side', sCASP.ORDER_ATOMIC);
    var code = "( " + value_left_side + " " + text2math(dropdown_operator) + " " + value_right_side + " )";
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_comparison'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var dropdown_comparison = block.getFieldValue('comparison');
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    if (dropdown_comparison == "lt") {
        var code = 'before(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "lte") {
        var code = 'not_after(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gt") {
        var code = 'after(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gte") {
        var code = 'not_before(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "eq") {
        var code = 'eq(' + value_first_date + ',' + value_second_date + ')';
    }
    return code;
};

sCASP['date_element'] = function (block) {
    var dropdown_element = block.getFieldValue('element');
    var value_date = sCASP.valueToCode(block, 'date', sCASP.ORDER_ATOMIC);
    var code = '...';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_calculate'] = function (block) {
    var value_year = sCASP.valueToCode(block, 'year', sCASP.ORDER_ATOMIC);
    var value_month = sCASP.valueToCode(block, 'month', sCASP.ORDER_ATOMIC);
    var value_day = sCASP.valueToCode(block, 'day', sCASP.ORDER_ATOMIC);
    var code = 'date(' + value_year + ',' + value_month + ',' + value_day + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_calculate'] = function (block) {
    var value_sign = sCASP.valueToCode(block, 'sign', sCASP.ORDER_ATOMIC);
    var value_years = sCASP.valueToCode(block, 'years', sCASP.ORDER_ATOMIC);
    var value_months = sCASP.valueToCode(block, 'months', sCASP.ORDER_ATOMIC);
    var value_days = sCASP.valueToCode(block, 'days', sCASP.ORDER_ATOMIC);
    var value_hours = sCASP.valueToCode(block, 'hours', sCASP.ORDER_ATOMIC);
    var value_minutes = sCASP.valueToCode(block, 'minutes', sCASP.ORDER_ATOMIC);
    var value_seconds = sCASP.valueToCode(block, 'seconds', sCASP.ORDER_ATOMIC);
    var code = 'duration(' + value_sign + ',' + value_years + ',' +value_months + ',' + value_days + ',' + value_hours + ',' + value_minutes + ',' + value_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_element'] = function (block) {
    var dropdown_element = block.getFieldValue('element');
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var code = '...';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_difference_days'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var value_duration_days = sCASP.valueToCode(block, 'duration_days', sCASP.ORDER_ATOMIC);
    var code = 'days_between_datetimes(' + value_first_date + ',' + value_second_date + ',' + value_duration_days + ')';
    return code;
};

sCASP['date_difference'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var code = 'datetime_diff_duration(' + value_first_date + ',' + value_second_date + ',' + value_duration + ')';
    return code;
};

sCASP['date_add'] = function (block) {
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var code = 'datetime_add(' + value_first_date + ',' + value_duration + ',' + value_second_date + ')';
    return code;
};

sCASP['numerical_constraint'] = function (block) {
    var value_first_comparator = sCASP.valueToCode(block, 'first_comparator', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_second_comparator = sCASP.valueToCode(block, 'second_comparator', sCASP.ORDER_ATOMIC);
    var code = value_first_comparator + " #" + text2math(dropdown_operator) + " " + value_second_comparator;
    return code;
};

sCASP['json_input'] = function (block) {
    var statements_json = sCASP.statementToCode(block, 'json');
    var code = '...;\n';
    return code;
};

sCASP['json_list'] = function (block) {
    var statements_json_list_elements = sCASP.statementToCode(block, 'json_list_elements');
    var code = '...;\n';
    return code;
};

sCASP['json_value'] = function (block) {
    var text_value = block.getFieldValue('value');
    var code = '...;\n';
    return code;
};

sCASP['json_dictionary'] = function (block) {
    var text_predicate = block.getFieldValue('predicate');
    var statements_parameters = sCASP.statementToCode(block, 'parameters');
    var code = '...;\n';
    return code;
};

sCASP['silent_legal_doc_node'] = function (block) {
    var text_node_name = block.getFieldValue('node_name');
    var statements_sub_parts = sCASP.statementToCode(block, 'sub_parts');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text_continuation'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text_parent_continuation'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['attribute_selector'] = function (block) {
    var value_first_element = sCASP.valueToCode(block, 'first_element', sCASP.ORDER_ATOMIC);
    var value_second_element = sCASP.valueToCode(block, 'second_element', sCASP.ORDER_ATOMIC);
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

sCASP['unary_attribute_selector'] = function (block) {
    var value_first_element = sCASP.valueToCode(block, 'first_element', sCASP.ORDER_ATOMIC);
    var predicate = this.blawxAttributeName;
    var code = predicate + "(" + value_first_element + ")";
    return code;
};

sCASP['assume'] = function (block) {
    // var statements_statements = sCASP.statementToCode(block, 'statements');
    var currentBlock = this.getInputTargetBlock('statements');
    var code = '';
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += "#abducible " + codeForBlock + '.\n';
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['json_textfield'] = function (block) {
    // var text_payload = block.getFieldValue('payload');
    var code = '';
    return code;
};


sCASP['opposes'] = function (block) {
    var statements_first_statement = sCASP.statementToCode(block, 'first_statement');
    var statements_second_statement = sCASP.statementToCode(block, 'second_statement');
    var code = 'opposes(' + statements_first_statement + ',' + statements_second_statement + ').\n';
    code += 'opposes(' + statements_second_statement + ',' + statements_first_statement + ')';
    return code;
};

sCASP['according_to'] = function (block) {
    var value_rule = sCASP.valueToCode(block, 'rule', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var parameters = [value_rule];
    parameters = parameters.concat(deconstruct_term(statements_statement));
    var code = 'according_to('
    for(var i=0; i< parameters.length; i++) {
        code += parameters[i].trim();
        if (i+1 < parameters.length) {
            code += ",";
        }
    }
    code += ')';
    return code;
};

sCASP['scope'] = function (block) {
    var value_name = sCASP.valueToCode(block, 'NAME', sCASP.ORDER_ATOMIC);
    var code = 'not_implemented';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['holds'] = function (block) {
    var value_rule = sCASP.valueToCode(block, 'section', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var parameters = [value_rule];
    parameters = parameters.concat(deconstruct_term(statements_statement));
    var code = 'holds('
    for(var i=0; i< parameters.length; i++) {
        code += parameters[i].trim();
        if (i+1 < parameters.length) {
            code += ",";
        }
    }
    code += ')';
    return code;
};

sCASP['time_type_selector'] = function(block) {
    var code = 'time';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['time_value'] = function(block) {
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    var code = 'time(' + number_hours + ',' + number_minutes + ',' + number_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['datetime_type_selector'] = function(block) {
    var code = 'datetime';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['datetime_value'] = function(block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    var number_hours = block.getFieldValue('hours');
    var number_minutes = block.getFieldValue('minutes');
    var number_seconds = block.getFieldValue('seconds');
    var code = 'datetime(' + number_year + ',' + number_month + ',' + number_day + ',' + number_hours + ',' + number_minutes + ',' + number_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['time_calculate'] = function(block) {
    var value_hours = sCASP.valueToCode(block, 'hours', sCASP.ORDER_ATOMIC);
    var value_minutes = sCASP.valueToCode(block, 'minutes', sCASP.ORDER_ATOMIC);
    var value_seconds = sCASP.valueToCode(block, 'seconds', sCASP.ORDER_ATOMIC);
    var code = 'time(' + value_hours + ',' + value_minutes + ',' + value_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['datetime_calculate'] = function(block) {
    var value_year = sCASP.valueToCode(block, 'year', sCASP.ORDER_ATOMIC);
    var value_month = sCASP.valueToCode(block, 'month', sCASP.ORDER_ATOMIC);
    var value_day = sCASP.valueToCode(block, 'day', sCASP.ORDER_ATOMIC);
    var value_hours = sCASP.valueToCode(block, 'hours', sCASP.ORDER_ATOMIC);
    var value_minutes = sCASP.valueToCode(block, 'minutes', sCASP.ORDER_ATOMIC);
    var value_seconds = sCASP.valueToCode(block, 'seconds', sCASP.ORDER_ATOMIC);
    var code = 'datetime(' + value_year + ',' + value_month + ',' + value_day + ',' + value_hours + ',' + value_minutes + ',' + value_seconds + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_add_days'] = function(block) {
    var value_days = sCASP.valueToCode(block, 'days', sCASP.ORDER_ATOMIC);
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var code = 'datetime_add_days(' + value_first_date + ',' + value_days + ',' + value_second_date + ')';
    return code;
};

sCASP['duration_comparison'] = function(block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var dropdown_comparison = block.getFieldValue('comparison');
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    if (dropdown_comparison == "lt") {
        var code = 'lt(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "lte") {
        var code = 'lte(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gt") {
        var code = 'gt(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gte") {
        var code = 'gte(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "eq") {
        var code = 'eq(' + value_first_date + ',' + value_second_date + ')';
    }
    return code;
};

sCASP['now'] = function(block) {
    var value_now = sCASP.valueToCode(block, 'now', sCASP.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'blawx_now(' + value_now + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

sCASP['today'] = function(block) {
    var value_name = sCASP.valueToCode(block, 'NAME', sCASP.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'blawx_today(' + value_name + ')';
    // TODO: Change ORDER_NONE to the correct strength.
    return code;
};

sCASP['datetime_construct'] = function(block) {
    var value_date = sCASP.valueToCode(block, 'date', sCASP.ORDER_ATOMIC);
    var value_time = sCASP.valueToCode(block, 'time', sCASP.ORDER_ATOMIC);
    var value_datetime = sCASP.valueToCode(block, 'datetime', sCASP.ORDER_ATOMIC);
    var code = 'build_datetime(' + value_date + ',' + value_time + ',' + value_datetime + ')';
    return code;
};

sCASP['empty_list'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '[]';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['head_tail'] = function(block) {
    var value_head = sCASP.valueToCode(block, 'head', sCASP.ORDER_ATOMIC);
    var value_tail = sCASP.valueToCode(block, 'tail', sCASP.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '[' + value_head + ' | ' + value_tail + ']';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['collect_list'] = function(block) {
    var value_list_name = sCASP.valueToCode(block, 'list_name', sCASP.ORDER_ATOMIC);
    var value_variable_name = sCASP.valueToCode(block, 'variable_name', sCASP.ORDER_ATOMIC);
    var statements_search = sCASP.statementToCode(block, 'search');
    // TODO: Assemble JavaScript into code variable.
    var code = 'findall(' + value_variable_name + ' , ' + statements_search + ' , ' + value_list_name + ')';
    return code;
};

sCASP['list_aggregation'] = function(block) {
    var value_output = sCASP.valueToCode(block, 'output', sCASP.ORDER_ATOMIC);
    var dropdown_aggregation = block.getFieldValue('aggregation');
    var value_list = sCASP.valueToCode(block, 'list', sCASP.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var aggregate_predicate = '';
    switch(dropdown_aggregation) {
        case "cnt":
            aggregate_predicate = 'count_blawx_list';
            break;
        case "sum":
            aggregate_predicate = 'sum_blawx_list';
            break;
        case "ave":
            aggregate_predicate = 'average_blawx_list';
            break;
        case "min":
            aggregate_predicate = 'min_blawx_list';
            break;
        case "max":
            aggregate_predicate = 'max_blawx_list';
    }
    var code = aggregate_predicate + '(' + value_list + ' , ' + value_output + ')';
    return code;
};

sCASP['list_type_selector'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'list';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['new_attribute_declaration'] = function(block) {
    var dropdown_category = block.getFieldValue('category_name');
    var text_attribute_name = block.getFieldValue('attribute_name');
    var dropdown_attribute_type = block.getFieldValue('attribute_type');
    var dropdown_order = block.getFieldValue('order');
    var text_prefix = block.getFieldValue('prefix');
    var text_infix = block.getFieldValue('infix');
    var text_postfix = block.getFieldValue('postfix');
    var code = 'blawx_attribute(' + dropdown_category + ',' + text_attribute_name + ',' + dropdown_attribute_type + ').\n';
    if (dropdown_attribute_type != "boolean") {
        code += "blawx_attribute_nlg(" + text_attribute_name + "," + dropdown_order + ",\"" + text_prefix + "\",\"" + text_infix + "\",\"" + text_postfix + "\").\n"
        
        code += ":- dynamic " + text_attribute_name + "/2.\n"
        code += "#pred " + text_attribute_name + "(";
        var variable_order;
        if (dropdown_order == "ov") {
            variable_order = "X,Y";
        } else {
            variable_order = "Y,X";
        }
        code += variable_order;
        add_code = text_prefix.replace(/'/g, '\\\'') + " @(X) " + text_infix.replace(/'/g, '\\\'') + " @(Y) " + text_postfix.replace(/'/g, '\\\'')
        code += ") :: '" + add_code.trim() + "'.\n"
        code += '#pred holds(user,' + text_attribute_name + ',' + variable_order + ") :: 'it is provided as a fact that " + add_code.trim() + "'.\n";
        code += '#pred holds(user,-' + text_attribute_name + ',' + variable_order + ") :: 'it is provided as a fact that it is not the case that " + add_code.trim() + "'.\n";
        code += '#pred holds(Z,' + text_attribute_name + ',' + variable_order + ") :: 'the conclusion in @(Z) that " + add_code.trim() + " holds'.\n";
        code += '#pred holds(Z,-' + text_attribute_name + ',' + variable_order + ") :: 'the conclusion in @(Z) that it is not the case that " + add_code.trim() + " holds'.\n";
        code += '#pred according_to(Z,' + text_attribute_name + ',' + variable_order + ") :: 'according to @(Z), " + add_code.trim() + "'.\n";
        code += '#pred according_to(Z,-' + text_attribute_name + ',' + variable_order + ") :: 'according to @(Z), it is not the case that " + add_code.trim() + "'.\n";
        code += '#pred blawx_defeated(Z,' + text_attribute_name + ',' + variable_order + ") :: 'the conclusion in @(Z) that " + add_code.trim() + " is defeated'.\n";
        code += '#pred blawx_defeated(Z,-' + text_attribute_name + ',' + variable_order + ") :: 'the conclusion in @(Z) that " + add_code.trim() + " is defeated'.\n";
        code += '#pred blawx_initially(' + text_attribute_name + ',(' + variable_order + ")) :: 'that " + add_code.trim() + " holds initially'.\n";
        code += '#pred blawx_initially(-' + text_attribute_name + ',(' + variable_order + ")) :: 'that it is not the case that " + add_code.trim() + " holds initially'.\n";
        code += '#pred blawx_ultimately(' + text_attribute_name + ',(' + variable_order + ")) :: 'that " + add_code.trim() + " holds ultimately'.\n";
        code += '#pred blawx_ultimately(-' + text_attribute_name + ',(' + variable_order + ")) :: 'that it is not the case that " + add_code.trim() + " holds ultimately'.\n";
        code += '#pred blawx_as_of(' + text_attribute_name + ',(' + variable_order + "),T) :: 'that " + add_code.trim() + " holds at @(T)'.\n";
        code += '#pred blawx_as_of(-' + text_attribute_name + ',(' + variable_order + "),T) :: 'that it is not the case that " + add_code.trim() + " holds at @(T)'.\n";
        code += '#pred blawx_during(T1,' + text_attribute_name + ',(' + variable_order + "),T2) :: 'that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
        code += '#pred blawx_during(T1,-' + text_attribute_name + ',(' + variable_order + "),T2) :: 'that it is not the case that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
        code += '#pred blawx_becomes(' + text_attribute_name + ',(' + variable_order + "),T) :: 'that " + add_code.trim() + " became true at @(T)'.\n";
        code += '#pred blawx_becomes(-' + text_attribute_name + ',(' + variable_order + "),T) :: 'that it is not the case that " + add_code.trim() + " became true at @(T)'.\n";
        code += 'blawx_as_of(' + text_attribute_name + '(X,Y),Time) :- blawx_becomes(' + text_attribute_name + '(X,Y),BeforeT), not blawx_becomes(-' + text_attribute_name + '(X,Y), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
        code += 'blawx_as_of(' + text_attribute_name + '(X,Y),Time) :- blawx_initially(' + text_attribute_name + '(X,Y)), not blawx_becomes(-' + text_attribute_name + '(X,Y), BetweenT), BetweenT #< Time.\n';
        code += 'blawx_during(Start,' + text_attribute_name + '(X,Y),End) :- blawx_becomes(' + text_attribute_name + '(X,Y),Start), not blawx_becomes(-' + text_attribute_name + '(X,Y),BeforeEnd), blawx_becomes(-' + text_attribute_name + '(X,Y),End), BeforeEnd #< End, Start #< End.\n';
        code += 'blawx_during(bot,' + text_attribute_name + '(X,Y),End) :- blawx_initially(' + text_attribute_name + '(X,Y)), not blawx_becomes(-' + text_attribute_name + '(X,Y),BeforeEnd), blawx_becomes(-' + text_attribute_name + '(X,Y),End), BeforeEnd #< End.\n';
        code += 'blawx_during(Start,' + text_attribute_name + '(X,Y),eot) :- blawx_becomes(' + text_attribute_name + '(X,Y),Start), not blawx_becomes(-' + text_attribute_name + '(X,Y),AfterStart), blawx_ultimately(' + text_attribute_name + '(X,Y)), AfterStart #> Start.\n';
        code += 'blawx_as_of(-' + text_attribute_name + '(X,Y),Time) :- blawx_becomes(-' + text_attribute_name + '(X,Y),BeforeT), not blawx_becomes(' + text_attribute_name + '(X,Y), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
        code += 'blawx_as_of(-' + text_attribute_name + '(X,Y),Time) :- blawx_initially(-' + text_attribute_name + '(X,Y)), not blawx_becomes(' + text_attribute_name + '(X,Y), BetweenT), BetweenT #< Time.\n';
        code += 'blawx_during(Start,-' + text_attribute_name + '(X,Y),End) :- blawx_becomes(-' + text_attribute_name + '(X,Y),Start), not blawx_becomes(' + text_attribute_name + '(X,Y),BeforeEnd), blawx_becomes(' + text_attribute_name + '(X,Y),End), BeforeEnd #< End, Start #< End.\n';
        code += 'blawx_during(bot,-' + text_attribute_name + '(X,Y),End) :- blawx_initially(-' + text_attribute_name + '(X,Y)), not blawx_becomes(' + text_attribute_name + '(X,Y),BeforeEnd), blawx_becomes(' + text_attribute_name + '(X,Y),End), BeforeEnd #< End.\n';
        code += 'blawx_during(Start,-' + text_attribute_name + '(X,Y),eot) :- blawx_becomes(-' + text_attribute_name + '(X,Y),Start), not blawx_becomes(' + text_attribute_name + '(X,Y),AfterStart), blawx_ultimately(-' + text_attribute_name + '(X,Y)), AfterStart #> Start.\n';
    } else {
        // This is for booleans.
        code += "blawx_attribute_nlg(" + text_attribute_name + ",not_applicable,\"" + text_prefix + "\",not_applicable,\"" + text_postfix + "\").\n"
        code += ":- dynamic " + text_attribute_name + "/1.\n"
        add_code = text_prefix.replace(/'/g, '\\\'') + " @(X) " + text_postfix.replace(/'/g, '\\\'')
        code += "#pred " + text_attribute_name + "(X) :: '" + add_code.trim() + "'.\n"
        code += '#pred holds(user,' + text_attribute_name + ",X) :: 'it is provided as a fact that " + add_code.trim() + "'.\n";
        code += '#pred holds(user,-' + text_attribute_name + ",X) :: 'it is provided as a fact that it is not the case that " + add_code.trim() + "'.\n";
        code += '#pred holds(Z,' + text_attribute_name + ",X) :: 'the conclusion in @(Z) that " + add_code.trim() + " holds'.\n";
        code += '#pred holds(Z,-' + text_attribute_name + ",X) :: 'the conclusion in @(Z) that it is not the case that " + add_code.trim() + " holds'.\n";
        code += '#pred according_to(Z,' + text_attribute_name + ",X) :: 'according to @(Z), " + add_code.trim() + "'.\n";
        code += '#pred according_to(Z,-' + text_attribute_name + ",X) :: 'according to @(Z), it is not the case that " + add_code.trim() + "'.\n";
        code += '#pred blawx_defeated(Z,' + text_attribute_name + ",X) :: 'the conclusion in @(Z) that " + add_code.trim() + " is defeated'.\n";
        code += '#pred blawx_defeated(Z,-' + text_attribute_name + ",X) :: 'the conclusion in @(Z) that " + add_code.trim() + " is defeated'.\n";
        code += '#pred blawx_initially(' + text_attribute_name + "(X)) :: 'that " + add_code.trim() + " holds initially'.\n";
        code += '#pred blawx_initially(-' + text_attribute_name + "(X)) :: 'that it is not the case that " + add_code.trim() + " holds initially'.\n";
        code += '#pred blawx_ultimately(' + text_attribute_name + "(X)) :: 'that " + add_code.trim() + " holds ultimately'.\n";
        code += '#pred blawx_ultimately(-' + text_attribute_name + "(X)) :: 'that it is not the case that " + add_code.trim() + " holds ultimately'.\n";
        code += '#pred blawx_as_of(' + text_attribute_name + "(X),T) :: 'that " + add_code.trim() + " holds at @(T)'.\n";
        code += '#pred blawx_as_of(-' + text_attribute_name + "(X),T) :: 'that it is not the case that " + add_code.trim() + " holds at @(T)'.\n";
        code += '#pred blawx_during(T1,' + text_attribute_name + "(X),T2) :: 'that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
        code += '#pred blawx_during(T1,-' + text_attribute_name + "(X),T2) :: 'that it is not the case that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
        code += '#pred blawx_becomes(' + text_attribute_name + "(X),T) :: 'that " + add_code.trim() + " became true at @(T)'.\n";
        code += '#pred blawx_becomes(-' + text_attribute_name + "(X),T) :: 'that it is not the case that " + add_code.trim() + " became true at @(T)'.\n";
        code += 'blawx_as_of(' + text_attribute_name + '(X),Time) :- blawx_becomes(' + text_attribute_name + '(X),BeforeT), not blawx_becomes(-' + text_attribute_name + '(X), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
        code += 'blawx_as_of(' + text_attribute_name + '(X),Time) :- blawx_initially(' + text_attribute_name + '(X)), not blawx_becomes(-' + text_attribute_name + '(X), BetweenT), BetweenT #< Time.\n';
        code += 'blawx_during(Start,' + text_attribute_name + '(X),End) :- blawx_becomes(' + text_attribute_name + '(X),Start), not blawx_becomes(-' + text_attribute_name + '(X),BeforeEnd), blawx_becomes(-' + text_attribute_name + '(X),End), BeforeEnd #< End, Start #< End.\n';
        code += 'blawx_during(bot,' + text_attribute_name + '(X),End) :- blawx_initially(' + text_attribute_name + '(X)), not blawx_becomes(-' + text_attribute_name + '(X),BeforeEnd), blawx_becomes(-' + text_attribute_name + '(X),End), BeforeEnd #< End.\n';
        code += 'blawx_during(Start,' + text_attribute_name + '(X),eot) :- blawx_becomes(' + text_attribute_name + '(X),Start), not blawx_becomes(-' + text_attribute_name + '(X),AfterStart), blawx_ultimately(' + text_attribute_name + '(X)), AfterStart #> Start.\n';
        code += 'blawx_as_of(-' + text_attribute_name + '(X),Time) :- blawx_becomes(-' + text_attribute_name + '(X),BeforeT), not blawx_becomes(' + text_attribute_name + '(X), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
        code += 'blawx_as_of(-' + text_attribute_name + '(X),Time) :- blawx_initially(-' + text_attribute_name + '(X)), not blawx_becomes(' + text_attribute_name + '(X), BetweenT), BetweenT #< Time.\n';
        code += 'blawx_during(Start,-' + text_attribute_name + '(X),End) :- blawx_becomes(-' + text_attribute_name + '(X),Start), not blawx_becomes(' + text_attribute_name + '(X),BeforeEnd), blawx_becomes(' + text_attribute_name + '(X),End), BeforeEnd #< End, Start #< End.\n';
        code += 'blawx_during(bot,-' + text_attribute_name + '(X),End) :- blawx_initially(-' + text_attribute_name + '(X)), not blawx_becomes(' + text_attribute_name + '(X),BeforeEnd), blawx_becomes(' + text_attribute_name + '(X),End), BeforeEnd #< End.\n';
        code += 'blawx_during(Start,-' + text_attribute_name + '(X),eot) :- blawx_becomes(-' + text_attribute_name + '(X),Start), not blawx_becomes(' + text_attribute_name + '(X),AfterStart), blawx_ultimately(-' + text_attribute_name + '(X)), AfterStart #> Start.\n';
    }
    return code;
};

sCASP['new_category_declaration'] = function(block) {
    var text_category_name = block.getFieldValue('category_name');
    var text_prefix = block.getFieldValue('prefix');
    var text_postfix = block.getFieldValue('postfix');
    var code = "blawx_category(" + text_category_name + ").\n";
    code += "blawx_category_nlg(" + text_category_name + ",\"" + text_prefix + "\",\"" + text_postfix + "\").\n"
    code += ":- dynamic " + text_category_name + "/1.\n"
    code += "#pred " + text_category_name + "(X) :: '";
    add_code = (text_prefix.replace(/'/g, '\\\'') + " @(X) " + text_postfix.replace(/'/g, '\\\'')).trim()
    code += add_code + "'.\n";
    code += '#pred holds(user,' + text_category_name + ",X) :: 'it is provided as a fact that " + add_code.trim() + "'.\n";
    code += '#pred holds(user,-' + text_category_name + ",X) :: 'it is provided as a fact that it is not the case that " + add_code.trim() + "'.\n";
    code += '#pred holds(Z,' + text_category_name + ",X) :: 'the conclusion in @(Z) that " + add_code.trim() + " holds'.\n";
    code += '#pred holds(Z,-' + text_category_name + ",X) :: 'the conclusion in @(Z) that it is not the case that " + add_code.trim() + " holds'.\n";
    code += '#pred according_to(Z,' + text_category_name + ",X) :: 'according to @(Z), " + add_code.trim() + "'.\n";
    code += '#pred according_to(Z,-' + text_category_name + ",X) :: 'according to @(Z), it is not the case that " + add_code.trim() + "'.\n";
    code += '#pred blawx_defeated(Z,' + text_category_name + ",X) :: 'the conclusion in @(Z) that " + add_code.trim() + " is defeated'.\n";
    code += '#pred blawx_defeated(Z,-' + text_category_name + ",X) :: 'the conclusion in @(Z) that it is not the case that " + add_code.trim() + " is defeated'.\n";
    code += '#pred blawx_initially(' + text_category_name + "(X)) :: 'that " + add_code.trim() + " holds initially'.\n";
    code += '#pred blawx_initially(-' + text_category_name + "(X)) :: 'that it is not the case that " + add_code.trim() + " holds initially'.\n";
    code += '#pred blawx_ultimately(' + text_category_name + "(X)) :: 'that " + add_code.trim() + " holds ultimately'.\n";
    code += '#pred blawx_ultimately(-' + text_category_name + "(X)) :: 'that it is not the case that " + add_code.trim() + " holds ultimately'.\n";
    code += '#pred blawx_as_of(' + text_category_name + "(X),T) :: 'that " + add_code.trim() + " holds at @(T)'.\n";
    code += '#pred blawx_as_of(-' + text_category_name + "(X),T) :: 'that it is not the case that " + add_code.trim() + " holds at @(T)'.\n";
    code += '#pred blawx_during(T1,' + text_category_name + "(X),T2) :: 'that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
    code += '#pred blawx_during(T1,-' + text_category_name + "(X),T2) :: 'that it is not the case that " + add_code.trim() + " held between @(T1) and @(T2)'.\n";
    code += '#pred blawx_becomes(' + text_category_name + "(X),T) :: 'that " + add_code.trim() + " became true at @(T)'.\n";
    code += '#pred blawx_becomes(-' + text_category_name + "(X),T) :: 'that it is not the case that " + add_code.trim() + " became true at @(T)'.\n";
    code += 'blawx_as_of(' + text_category_name + '(X),Time) :- blawx_becomes(' + text_category_name + '(X),BeforeT), not blawx_becomes(-' + text_category_name + '(X), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
    code += 'blawx_as_of(' + text_category_name + '(X),Time) :- blawx_initially(' + text_category_name + '(X)), not blawx_becomes(-' + text_category_name + '(X), BetweenT), BetweenT #< Time.\n';
    code += 'blawx_during(Start,' + text_category_name + '(X),End) :- blawx_becomes(' + text_category_name + '(X),Start), not blawx_becomes(-' + text_category_name + '(X),BeforeEnd), blawx_becomes(-' + text_category_name + '(X),End), BeforeEnd #< End, Start #< End.\n';
    code += 'blawx_during(bot,' + text_category_name + '(X),End) :- blawx_initially(' + text_category_name + '(X)), not blawx_becomes(-' + text_category_name + '(X),BeforeEnd), blawx_becomes(-' + text_category_name + '(X),End), BeforeEnd #< End.\n';
    code += 'blawx_during(Start,' + text_category_name + '(X),eot) :- blawx_becomes(' + text_category_name + '(X),Start), not blawx_becomes(-' + text_category_name + '(X),AfterStart), blawx_ultimately(' + text_category_name + '(X)), AfterStart #> Start.\n';
    code += 'blawx_as_of(-' + text_category_name + '(X),Time) :- blawx_becomes(-' + text_category_name + '(X),BeforeT), not blawx_becomes(' + text_category_name + '(X), BetweenT), BeforeT #< Time,BeforeT #< BetweenT, BetweenT #< Time.\n';
    code += 'blawx_as_of(-' + text_category_name + '(X),Time) :- blawx_initially(-' + text_category_name + '(X)), not blawx_becomes(' + text_category_name + '(X), BetweenT), BetweenT #< Time.\n';
    code += 'blawx_during(Start,-' + text_category_name + '(X),End) :- blawx_becomes(-' + text_category_name + '(X),Start), not blawx_becomes(' + text_category_name + '(X),BeforeEnd), blawx_becomes(' + text_category_name + '(X),End), BeforeEnd #< End, Start #< End.\n';
    code += 'blawx_during(bot,-' + text_category_name + '(X),End) :- blawx_initially(-' + text_category_name + '(X)), not blawx_becomes(' + text_category_name + '(X),BeforeEnd), blawx_becomes(' + text_category_name + '(X),End), BeforeEnd #< End.\n';
    code += 'blawx_during(Start,-' + text_category_name + '(X),eot) :- blawx_becomes(-' + text_category_name + '(X),Start), not blawx_becomes(' + text_category_name + '(X),AfterStart), blawx_ultimately(-' + text_category_name + '(X)), AfterStart #> Start.\n';
    return code;
};

sCASP['new_object_category'] = function(block) {
    var value_object = sCASP.valueToCode(block, 'object', sCASP.ORDER_ATOMIC);
    var category_name = block.getFieldValue('category_name');
    var code = category_name + "(" + value_object + ")";
    return code;
};

sCASP['attributed_rule'] = function(block) {
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_conclusion = sCASP.statementToCode(block, 'conclusion');
    var checkbox_defeasible = block.getFieldValue('defeasible') === 'TRUE';
    var checkbox_inapplicable = block.getFieldValue('inapplicable') === 'TRUE';
    // There are two rules. The first is if conditions, according to. The second is if according to, holds.
    // IF the user has said applicability, the first rule checks for applicability.
    // IF the user has said defeasible, the second rule checks for defeats.
    // In order to check for defeats, we just need the conclusion, so that's fine. But to check for applicability,
    // we need the list of objects whose categories have been tested in the conditions.
    var applicable_targets = [];
    if (checkbox_inapplicable) {
        // So get the next block from the conditions connector, check if it is an object category block, if so add
        // to the list of categories, repeat until there is no next block.
        var statement = this.getInputTargetBlock('conditions');
        while(statement) {
            if (statement.type == "new_object_category") {
                applicable_targets.push(sCASP.valueToCode(statement,'object', sCASP.ORDER_ATOMIC));
            }
            statement = statement.getNextBlock();
        }
    }
    var first_rule = "according_to(" + value_source + ",";
    var conclusion_parameters = deconstruct_term(statements_conclusion);
    for (var i = 0; i< conclusion_parameters.length; i++) {
        first_rule += conclusion_parameters[i].trim();
        if (i+1 < conclusion_parameters.length) {
            first_rule += ",";
        }
    }
    first_rule += ") :- ";
    if (checkbox_inapplicable) {
        for(var t=0; t < applicable_targets.length; t++) {
            first_rule += "blawx_applies(" + value_source + "," + applicable_targets[t].trim() + "),\n";
        }
    }
    currentBlock = this.getInputTargetBlock('conditions');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        currentBlock = currentBlock.getNextBlock();
        first_rule += codeForBlock;
        if (currentBlock) {
            first_rule += ",\n";
        }
    }
    first_rule += ".\n";

    var second_rule = "% BLAWX CHECK DUPLICATES\n" + "holds(" + value_source + ",";
    for (var i = 0; i< conclusion_parameters.length; i++) {
        second_rule += conclusion_parameters[i].trim();
        if (i+1 < conclusion_parameters.length) {
            second_rule += ",";
        }
    }
    second_rule += ") :- according_to(" + value_source + ",";
    for (var i = 0; i< conclusion_parameters.length; i++) {
        second_rule += conclusion_parameters[i].trim();
        if (i+1 < conclusion_parameters.length) {
            second_rule += ",";
        }
    }
    second_rule += ")";
    if (checkbox_defeasible) {
        second_rule += ", not blawx_defeated(" + value_source + ",";
        for (var i = 0; i< conclusion_parameters.length; i++) {
            second_rule += conclusion_parameters[i].trim();
            if (i+1 < conclusion_parameters.length) {
                second_rule += ",";
            }
        }
        second_rule += ")";
    }
    second_rule += ".\n";

    var third_rule = "% BLAWX CHECK DUPLICATES\n" + statements_conclusion + " :- "
    third_rule += "holds(" + value_source + ",";
    for (var i = 0; i< conclusion_parameters.length; i++) {
        third_rule += conclusion_parameters[i].trim();
        if (i+1 < conclusion_parameters.length) {
            third_rule += ",";
        }
    }
    third_rule += ").\n"
    var code = first_rule + '\n' + second_rule + '\n' + third_rule;
    return code;
};

sCASP['defeated'] = function(block) {
    var value_defeating_rule = sCASP.valueToCode(block, 'defeating_rule', sCASP.ORDER_ATOMIC);
    var statements_defeating_statement = sCASP.statementToCode(block, 'defeating_statement');
    var parameters = [value_defeating_rule];
    parameters = parameters.concat(deconstruct_term(statements_defeating_statement));
    var code = 'blawx_defeated(';
    for(var i=0; i< parameters.length; i++) {
        code += parameters[i].trim();
        if (i+1 < parameters.length) {
            code += ",";
        }
    }
    code += ")";
    return code;
};

sCASP['applies'] = function(block) {
    var value_applicable_rule = sCASP.valueToCode(block, 'applicable_rule', sCASP.ORDER_ATOMIC);
    var value_object = sCASP.valueToCode(block, 'object', sCASP.ORDER_ATOMIC);
    var code = 'blawx_applies(' + value_applicable_rule + ',' + value_object + ')';
    return code;
};

sCASP['initially'] = function(block) {
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'blawx_initially(' + statements_statement + ')';
    return code;
};

sCASP['holds_during'] = function (block) {
    var value_start_time = sCASP.valueToCode(block, 'start_time', sCASP.ORDER_ATOMIC);
    var value_end_time = sCASP.valueToCode(block, 'end_time', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'blawx_during(' + value_start_time + ',' + statements_statement + ',' + value_end_time + ')';
    return code;
};

sCASP['as_of'] = function (block) {
    var value_datetime = sCASP.valueToCode(block, 'datetime', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    // TODO: Assemble JavaScript into code variable.
    var code = 'blawx_as_of(' + statements_statement + ',' + value_datetime + ')';
    return code;
};

sCASP['ultimately'] = function (block) {
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'blawx_ultimately(' + statements_statement + ')';
    return code;
};

sCASP['from'] = function (block) {
    var value_datetime = sCASP.valueToCode(block, 'datetime', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'blawx_becomes(' + statements_statement + ',' + value_datetime + ')';
    return code;
};

sCASP['datetime_to_ts'] = function (block) {
    var value_datetime = sCASP.valueToCode(block, 'datetime', sCASP.ORDER_ATOMIC);
    var value_timestamp = sCASP.valueToCode(block, 'timestamp', sCASP.ORDER_ATOMIC);
    var code = 'datetime_to_posix_timestamp(' + value_datetime + ',timestamp(' + value_timestamp + '))';
    return code;
};

sCASP['ts_to_datetime'] = function (block) {
    var value_timestamp = sCASP.valueToCode(block, 'timestamp', sCASP.ORDER_ATOMIC);
    var value_datetime = sCASP.valueToCode(block, 'datetime', sCASP.ORDER_ATOMIC);
    var code = 'posix_timestamp_to_datetime(' + value_datetime + ',timestamp(' + value_timestamp + '))';
    return code;
};

function deconstruct_term(term) {
    var elements = [];
    const term_pattern = /(?<functor>[^\(\)]*)\((?<parameters>.*)\)/gm
    const param_pattern = /(?:([^,\(\)]+(?:\([^\)]+\))?)(?:,?))/gm;
    var matches = term_pattern.exec(term);
    if (matches !== null) {
        elements.push(matches[1]);
        param_matches = matches[2].matchAll(param_pattern);
        for(const match of param_matches) {
            elements.push(match[1]);
        }
    } 
    return elements;
}