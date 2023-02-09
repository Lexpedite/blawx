var attributeTypes = [];
var importDictionary = {};
var knownAttributesCallback;
knownAttributesCallback = function(workspace) {
    attributeTypes = [];
    var all_workspaces = getAllWorkspaces();
    var xmlList = [];
    for (var w = 0; w < all_workspaces.length; w++) {
        // Go through the blocks in the workspace.
        // If the block is an object declaration, add the relevant block to the xml
        if (all_workspaces[w].xml_content) {
            var domObject = Blockly.Xml.textToDom(all_workspaces[w].xml_content);
            var tempWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(domObject, tempWorkspace);
            var blockList = tempWorkspace.getAllBlocks();
            for (var i = 0; i< blockList.length; i++) {
            if (blockList[i].type == "attribute_declaration" |
                blockList[i].type == "cardinality_up_to" |
                blockList[i].type == "cardinality_or_more" |
                blockList[i].type == "cardinality_between" |
                blockList[i].type == "cardinality_exactly" |
                blockList[i].type == "cardinality_any") {
                var attribute_name = blockList[i].getFieldValue('attribute_name');
                var attribute_type = blockList[i].getInputTargetBlock('attribute_type').toString();
                // At this point, I need to check to see if the next block is a customization.
                var nextblock = blockList[i].getNextBlock();
                if (nextblock && nextblock.type == "attribute_display") {
                    // If it is, I need to get (where the next block is "block")
                    var dropdown_order = nextblock.getFieldValue('order');
                    var text_prefix = nextblock.getFieldValue('prefix');
                    var text_infix = nextblock.getFieldValue('infix');
                    var text_postfix = nextblock.getFieldValue('postfix');
                    // The attribute name, and the order of the elements, is required
                    // in order to generate code, so those pieces of information are
                    // placed in THE MUTATOR.
                    var blockText = "<xml><block type='attribute_selector'><mutation xmlns='http://www.w3.org/1999/xhtml' attributename='" + attribute_name + "' attributetype='" + attribute_type + "' attributeorder='" + dropdown_order + "'></mutation><field name='prefix'>" + text_prefix + "</field><field name='infix'>" + text_infix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
                } else {
                    var blockText = "<xml><block type='attribute_selector'><mutation xmlns='http://www.w3.org/1999/xhtml' attributename='" + attribute_name + "' attributetype='" + attribute_type + "' attributeorder='ov'></mutation><field name='prefix'></field><field name='infix'>'s " + attribute_name + " is</field><field name='postfix'></field></block></xml>";
                }
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                // need to check for repeatedly adding the same block.
                xmlList.push(block);
            }
            }
        }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "attribute_declaration" |
            blockList[i].type == "cardinality_up_to" |
            blockList[i].type == "cardinality_or_more" |
            blockList[i].type == "cardinality_between" |
            blockList[i].type == "cardinality_exactly" |
            blockList[i].type == "cardinality_any") {
            var attribute_name = blockList[i].getFieldValue('attribute_name');
            var attribute_type = blockList[i].getInputTargetBlock('attribute_type').toString();
            attributeTypes[attribute_name] = attribute_type;
            // At this point, I need to check to see if the next block is a customization.
            var nextblock = blockList[i].getNextBlock();
            if (nextblock && nextblock.type == "attribute_display") {
                // If it is, I need to get (where the next block is "block")
                var dropdown_order = nextblock.getFieldValue('order');
                var text_prefix = nextblock.getFieldValue('prefix');
                var text_infix = nextblock.getFieldValue('infix');
                var text_postfix = nextblock.getFieldValue('postfix');
                // The attribute name, and the order of the elements, is required
                // in order to generate code, so those pieces of information are
                // placed in THE MUTATOR.
                var blockText = "<xml><block type='attribute_selector'><mutation xmlns='http://www.w3.org/1999/xhtml' attributename='" + attribute_name + "' attributetype='" + attribute_type + "' attributeorder='" + dropdown_order + "'></mutation><field name='prefix'>" + text_prefix + "</field><field name='infix'>" + text_infix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
            } else {
                var blockText = "<xml><block type='attribute_selector'><mutation xmlns='http://www.w3.org/1999/xhtml' attributename='" + attribute_name + "' attributetype='" + attribute_type + "' attributeorder='ov'></mutation><field name='prefix'></field><field name='infix'>'s " + attribute_name + " is</field><field name='postfix'></field></block></xml>";
            }
            var block = Blockly.Xml.textToDom(blockText).firstChild;
            // need to check for repeatedly adding the same block.
            xmlList.push(block);
        }
    }
    }
    return xmlList;
}

demoWorkspace.registerToolboxCategoryCallback('KNOWN_ATTRIBUTES', knownAttributesCallback);


var knownObjectsCallback;
knownObjectsCallback = function(workspace) {
    var all_workspaces = getAllWorkspaces();
    var xmlList = [];
    for (var w = 0; w < all_workspaces.length; w++) {
        // Go through the blocks in the workspace.
        // If the block is an object declaration, add the relevant block to the xml
        if (all_workspaces[w].xml_content) {
            var domObject = Blockly.Xml.textToDom(all_workspaces[w].xml_content);
            var tempWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(domObject, tempWorkspace);
            var blockList = tempWorkspace.getAllBlocks();
            for (var i = 0; i< blockList.length; i++) {
            if (blockList[i].type == "object_declaration") {
                // Get the name of the entity, insert a block of that type,
                var object_name = blockList[i].getFieldValue('object_name'); 
                var blockText = "<xml><block type='object_selector'><field name='object_name'>" + object_name+"</field></block></xml>"
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                // Need to add check to make sure I'm not repeatedly adding the same block.
                xmlList.push(block);
            }
            // UPDATE THIS WHEN I SWITCH TO INPUTS.
            if (blockList[i].type == "data_dictionary") {
                var entity_name = blockList[i].getFieldValue('dictionary_name');
                var blockText = "<xml><block type='object_selector'><field name='objectName'>" + entity_name+"</field></block></xml>"
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                // Need to add check to make sure I'm not repeatedly adding the same block.
                xmlList.push(block);
            }
            }
        }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "object_declaration") {
        // Get the name of the entity, insert a block of that type,
        var object_name = blockList[i].getFieldValue('object_name'); 
        var blockText = "<xml><block type='object_selector'><field name='object_name'>" + object_name+"</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
        // UPDATE THIS WHEN I CHANGE TO INPUTS.
        if (blockList[i].type == "data_dictionary") {
        var entity_name = blockList[i].getFieldValue('dictionary_name');
        var blockText = "<xml><block type='object_selector'><field name='objectName'>" + entity_name+"</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
    }
    }
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('KNOWN_OBJECTS', knownObjectsCallback);

var knownCategoriesCallback;
knownCategoriesCallback = function(workspace) {
    var all_workspaces = getAllWorkspaces();
    // console.log("All Workspaces:")
    // console.log(all_workspaces)
    var xmlList = [];
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
                if (blockList[i].type == "category_declaration") {
                    // Get the name of the entity, insert a block of that type,
                    var category_name = blockList[i].getFieldValue('category_name'); 
                    var blockText = "<xml><block type='category_selector'><field name='category_name'>" + category_name + "</field></block></xml>"
                    var block = Blockly.Xml.textToDom(blockText).firstChild;
                    // Need to add check to make sure I'm not repeatedly adding the same block.
                    xmlList.push(block);
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
        var blockText = "<xml><block type='category_selector'><field name='category_name'>" + category_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
    }
    }
    
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('KNOWN_CATEGORIES', knownCategoriesCallback);

var newObjectCallback;
newObjectCallback = function(workspace) {
    var all_workspaces = getAllWorkspaces();
    // console.log("All Workspaces:")
    // console.log(all_workspaces)
    var xmlList = [];
    for (var w = 0; w < all_workspaces.length; w++) {
        // Go through the blocks in the workspace.
        // If the block is an object declaration, add the relevant block to the xml
        if (all_workspaces[w].xml_content) {
            var domObject = Blockly.Xml.textToDom(all_workspaces[w].xml_content);
            var tempWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(domObject, tempWorkspace);
            var blockList = tempWorkspace.getAllBlocks();
            for (var i = 0; i< blockList.length; i++) {
            if (blockList[i].type == "category_declaration") {
                // Get the name of the entity, insert a block of that type,
                var category_name = blockList[i].getFieldValue('category_name'); 
                var nextblock = blockList[i].getNextBlock();
                if (nextblock && nextblock.type == "category_display") {
                    // If it is, I need to get (where the next block is "block")
                    var text_prefix = nextblock.getFieldValue('prefix');
                    var text_postfix = nextblock.getFieldValue('postfix');
                    // The category name, and the order of the elements, is required
                    // in order to generate code, so those pieces of information are
                    // placed in THE MUTATOR.
                    
                    var blockText = "<xml><block type='object_declaration'><mutation xmlns='http://www.w3.org/1999/xhtml' category_name='" + category_name + "'></mutation><field name='prefix'>" + text_prefix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
                } else {
                    var blockText = "<xml><block type='object_declaration'><mutation xmlns='http://www.w3.org/1999/xhtml' category_name='" + category_name + "'></mutation><field name='postfix'>is a " + category_name + "</field></block></xml>"
                }
                
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                // Need to add check to make sure I'm not repeatedly adding the same block.
                xmlList.push(block);
            }
            }
        }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "category_declaration") {
        // Get the name of the entity, insert a block of that type,
        var category_name = blockList[i].getFieldValue('category_name'); 
        var nextblock = blockList[i].getNextBlock();
        if (nextblock && nextblock.type == "category_display") {
            // If it is, I need to get (where the next block is "block")
            var text_prefix = nextblock.getFieldValue('prefix');
            var text_postfix = nextblock.getFieldValue('postfix');
            // The category name, and the order of the elements, is required
            // in order to generate code, so those pieces of information are
            // placed in THE MUTATOR.
            
            var blockText = "<xml><block type='object_declaration'><mutation xmlns='http://www.w3.org/1999/xhtml' category_name='" + category_name + "'></mutation><field name='prefix'>" + text_prefix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
        } else {
            var blockText = "<xml><block type='object_declaration'><mutation xmlns='http://www.w3.org/1999/xhtml' category_name='" + category_name + "'></mutation><field name='postfix'>is a " + category_name + "</field></block></xml>"
        }
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
    }
    // Now add the three blocks that are always there, object equivalence and category assignment
    }
    
    var objectEqualityBlockText = '<xml><block type="object_equality"></block></xml>';
    var objectEqualityBlock = Blockly.Xml.textToDom(objectEqualityBlockText).firstChild;
    var objectDisequalityBlockText = '<xml><block type="object_disequality"></block></xml>';
    var objectDisequalityBlock = Blockly.Xml.textToDom(objectDisequalityBlockText).firstChild;
    var objectCategoryBlockText = '<xml><block type="new_object_category"></block></xml>';
    var objectCategoryBlock = Blockly.Xml.textToDom(objectCategoryBlockText).firstChild;
    xmlList.push(objectEqualityBlock);
    xmlList.push(objectDisequalityBlock);
    xmlList.push(objectCategoryBlock);
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('NEW_OBJECTS', newObjectCallback);

var listSections;
listSections = function() {
    var sections = $('akomaNtoso section[eid],paragraph[eid],subsection[eid],subparagraph[eid]');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].attributes.eid.value.startsWith('sec')) {
            console.log(sections[i].attributes.eid.value)

        }
        
    }
};

var knownRulesCallback;
knownRulesCallback = function(workspace) {
    var xmlList = [];
    var title_element = $('.lawpart.act');
    title = title_element[0].outerText;
    // var abbreviation = "";
    // var parts = title.split(" ")
    // for (var i = 0; i < parts.length; i++) {
    //     if (isNaN(parts[i])) {
    //         var first_char = parts[i].charAt(0);
    //         if (first_char == first_char.toUpperCase()) {
    //             abbreviation += first_char;
    //         }
    //     }
    // }
    var sections = $('.lawpart');

    // var blocktypes = ['scope']
    // for (var i = 0; i < blocktypes.length; i++) {
    //     var blocktext = '<xml><block type="' + blocktypes[i] + '"></block></xml>';
    //     var block = Blockly.Xml.textToDom(blocktext).firstChild;
    //     xmlList.push(block);
    // }

    for (var i = 0; i < sections.length; i++) {
        // If the id is "root_section" then just use the abbreviation
        // If the id starts with crossheading, use the text of the element.
        // Otherwise, use the hierarchical numbering.
        var blocktext = '<xml><block type="doc_selector">'
        blocktext += '<field name="doc_part_name">'
        var raw_id = sections[i].getElementsByTagName('input')[0].id
        if (raw_id == "root_section") {
            blocktext += abbreviation
        } else if (raw_id.startsWith("crossheading")) {
            blocktext += abbreviation + " "
            blocktext += sections[i].getElementsByClassName('lawtext')[0].outerText
        } else {
            var short_ref = raw_id;
            short_ref = short_ref.replace("sec_","");
            short_ref = short_ref.replace("__subsec_",".");
            short_ref = short_ref.replace("__para_",".");
            short_ref = short_ref.replace("__subpara_",".");
            short_ref = short_ref.replace("_section","");
            short_ref = short_ref.replace("__span_",".");
            blocktext += abbreviation + " " + short_ref;
        }
        blocktext += "</field>"
        blocktext += '<mutation xmlns="http://www.w3.org/1999/xhtml" section_reference="' + raw_id + '"></mutation>'
        blocktext += "</block></xml>"
        var block = Blockly.Xml.textToDom(blocktext).firstChild;
        xmlList.push(block);
        // if (sections[i].attributes.eid.value.startsWith('sec')) {
        //     var short_ref = sections[i].attributes.eid.value;
        //     short_ref = short_ref.replace("sec_","");
        //     short_ref = short_ref.replace("__subsec_",".");
        //     short_ref = short_ref.replace("__para_",".");
        //     short_ref = short_ref.replace("__subpara_",".");
        //     var blocktext = '<xml><block type="doc_selector"><field name="doc_part_name">' + abbreviation + " " + short_ref + '</field></block></xml>';
        //     var block = Blockly.Xml.textToDom(blocktext).firstChild;
        //     xmlList.push(block);
        //     // console.log("Pushing " + blocktext);
        // }
        
    }
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('KNOWN_RULES', knownRulesCallback);

var primaryDrawerCallback;
primaryDrawerCallback = function(workspace) {
    var blocktypes = ['unattributed_fact','unattributed_rule']
    var xmlList = [];
    for (var i = 0; i < blocktypes.length; i++) {
        var blocktext = '<xml><block type="' + blocktypes[i] + '"></block></xml>';
        var block = Blockly.Xml.textToDom(blocktext).firstChild;
        xmlList.push(block);
    }
    // console.log("Creating drawer using " + blocktext)
    if (typeof current_section !== 'undefined') {
        var blocktext;
        if (current_section == "root_section") {
            blocktext = abbreviation
        } else {
            blocktext = current_doc
        }

        var querytext = '<xml><block type="unattributed_rule">\
        <statement name="conclusion">\
        <block type="according_to">\
        <value name="rule">\
        <block type="doc_selector">\
        <mutation xmlns="http://www.w3.org/1999/xhtml" section_reference="' + current_section + '"></mutation>\
        <field name="doc_part_name">' + blocktext + '</field>\
        </block>\
        </value>\
        </block>\
        </statement>\
        </block></xml>';
        var queryblock = Blockly.Xml.textToDom(querytext).firstChild;
        xmlList.push(queryblock)
    }
    var blocktypes = ['unattributed_constraint','query']
    for (var i = 0; i < blocktypes.length; i++) {
        var blocktext = '<xml><block type="' + blocktypes[i] + '"></block></xml>';
        var block = Blockly.Xml.textToDom(blocktext).firstChild;
        xmlList.push(block);
    }
    var querytext = '<xml><block type="query">\
    <statement name="query">\
      <block type="holds"></block>\
    </statement>\
  </block></xml>';
    var queryblock = Blockly.Xml.textToDom(querytext).firstChild;
    xmlList.push(queryblock)
    var blocktypes = ['assume','json_textfield']
    for (var i = 0; i < blocktypes.length; i++) {
        var blocktext = '<xml><block type="' + blocktypes[i] + '"></block></xml>';
        var block = Blockly.Xml.textToDom(blocktext).firstChild;
        xmlList.push(block);
    }
    return xmlList
};

demoWorkspace.registerToolboxCategoryCallback('PRIMARY', primaryDrawerCallback);


var getAllWorkspaces;
getAllWorkspaces = function() {
    var xhttp = new XMLHttpRequest();
    if (workspace_is_test) {
        xhttp.open("GET", "../../all/get/", false); // Should be changed to asynch.
    } else {
        xhttp.open("GET", "../all/get/", false); // Should be changed to asynch.
    }
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);

    xhttp.send();
    var objects = JSON.parse(xhttp.responseText);
    if (workspace_is_test) {
        var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
        var xml_text = Blockly.Xml.domToText(xml);
        objects.push({ 'xml_content': xml_text});
    }
    return objects;
}
