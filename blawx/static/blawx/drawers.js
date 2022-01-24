var attributeTypes = [];
var importDictionary = {};
var knownAttributesCallback;
knownAttributesCallback = function(workspace) {
    var xmlList = [];
    attributeTypes = [];
    var blockList = demoWorkspace.getAllBlocks();
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

// New Known Attributes
// Needs to put the 

var knownObjectsCallback;
knownObjectsCallback = function(workspace) {
    var xmlList = [];
    // Go through the blocks in the workspace.
    // If the block is an object declaration, add the relevant block to the xml
    var blockList = demoWorkspace.getAllBlocks();
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
    var xmlList = [];
    // Go through the blocks in the workspace.
    // If the block is an object declaration, add the relevant block to the xml
    var blockList = demoWorkspace.getAllBlocks();
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
    var xmlList = [];
    // Go through the blocks in the workspace.
    // If the block is an object declaration, add the relevant block to the xml
    var blockList = demoWorkspace.getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
    if (blockList[i].type == "category_declaration") {
        // Get the name of the entity, insert a block of that type,
        var category_name = blockList[i].getFieldValue('category_name'); 
        var blockText = "<xml><block type='object_declaration'><field name='postfix'>is a " + category_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
    }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "category_declaration") {
        // Get the name of the entity, insert a block of that type,
        var category_name = blockList[i].getFieldValue('category_name'); 
        var blockText = "<xml><block type='object_declaration'><field name='postfix'>is a " + category_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
    }
    // Now add the two blocks that are always there, object equivalence and category assignment
    }
    
    var objectEqualityBlockText = '<xml><block type="object_equality"></block></xml>';
    var objectEqualityBlock = Blockly.Xml.textToDom(objectEqualityBlockText).firstChild;
    var objectDisequalityBlockText = '<xml><block type="object_disequality"></block></xml>';
    var objectDisequalityBlock = Blockly.Xml.textToDom(objectDisequalityBlockText).firstChild;
    var objectCategoryBlockText = '<xml><block type="object_category"></block></xml>';
    var objectCategoryBlock = Blockly.Xml.textToDom(objectCategoryBlockText).firstChild;
    xmlList.push(objectEqualityBlock);
    xmlList.push(objectDisequalityBlock);
    xmlList.push(objectCategoryBlock);
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('NEW_OBJECTS', newObjectCallback);