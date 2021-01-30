var attributeTypes = [];
var attributeOrders = [];
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
        if (nextblock && nextblock.type == "custom_attribute_declaration") {
            // If it is, I need to get (where the next block is "block")
            var dropdown_order = nextblock.getFieldValue('order');
            var text_prefix = nextblock.getFieldValue('prefix');
            var text_infix = nextblock.getFieldValue('infix');
            var text_postfix = nextblock.getFieldValue('postfix');
            attributeOrders[attribute_name] = dropdown_order; // This saves the order so that it can be retrieved when setting the types.
            // And then I need to construct the custom block, putting the name of the attribute in 'data',
            // which is automatically serialized without needing any mutators.
            var blockText = "<xml><block type='custom_attribute_selector'><data>" + attribute_name + "</data><field name='prefix'>" + text_prefix + "</field><field name='infix'>" + text_infix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
        } else {
            var blockText = "<xml><block type='attribute_selector'><field name='attributeName'>" + attribute_name + "</field></block></xml>";
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
        if (nextblock && nextblock.type == "custom_attribute_declaration") {
            // If it is, I need to get (where the next block is "block")
            var dropdown_order = nextblock.getFieldValue('order');
            var text_prefix = nextblock.getFieldValue('prefix');
            var text_infix = nextblock.getFieldValue('infix');
            var text_postfix = nextblock.getFieldValue('postfix');
            // And then I need to construct the custom block, in such a way as to give it
            // the information it needs to set the TYPE checking value on both fields.
            if (dropdown_order == "object_first") {
                var blockText = "<xml><block type='custom_attribute_selector'><field name='prefix'>" + text_prefix + "</field><field name='infix'>" + text_infix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
            } else {
                var blockText = "<xml><block type='custom_attribute_selector'><field name='prefix'>" + text_prefix + "</field><field name='infix'>" + text_infix + "</field><field name='postfix'>" + text_postfix + "</field></block></xml>";
            }
        } else {
            var blockText = "<xml><block type='attribute_selector'><field name='attributeName'>" + attribute_name + "</field></block></xml>";
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
    if (blockList[i].type == "entity_declaration") {
        // Get the name of the entity, insert a block of that type,
        var entity_name = blockList[i].getFieldValue('entity_name'); 
        var blockText = "<xml><block type='object_selector'><field name='objectName'>" + entity_name+"</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
    }
    if (blockList[i].type == "new_object_of_type") {
        // Get the name of the entity, insert a block of that type,
        var entity_name = blockList[i].getFieldValue('object_name'); 
        var blockText = "<xml><block type='object_selector'><field name='objectName'>" + entity_name+"</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
    }
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
        if (blockList[i].type == "entity_declaration") {
        // Get the name of the entity, insert a block of that type,
        var entity_name = blockList[i].getFieldValue('entity_name'); 
        var blockText = "<xml><block type='object_selector'><field name='objectName'>" + entity_name+"</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
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
    if (blockList[i].type == "declare_type") {
        // Get the name of the entity, insert a block of that type,
        var type_name = blockList[i].getFieldValue('type_name'); 
        var blockText = "<xml><block type='category_selector'><field name='categoryName'>" + type_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
    }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "declare_type") {
        // Get the name of the entity, insert a block of that type,
        var type_name = blockList[i].getFieldValue('type_name'); 
        var blockText = "<xml><block type='category_selector'><field name='categoryName'>" + type_name + "</field></block></xml>"
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
    if (blockList[i].type == "declare_type") {
        // Get the name of the entity, insert a block of that type,
        var type_name = blockList[i].getFieldValue('type_name'); 
        var blockText = "<xml><block type='new_object_of_type'><field name='category_name'>" + type_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
    }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "declare_type") {
        // Get the name of the entity, insert a block of that type,
        var type_name = blockList[i].getFieldValue('type_name'); 
        var blockText = "<xml><block type='new_object_of_type'><field name='category_name'>" + type_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // Need to add check to make sure I'm not repeatedly adding the same block.
        xmlList.push(block);
        }
    }
    // Now add the two blocks that are always there, object equivalence and category assignment
    }
    var entityIdentityBlockText = "<xml><block type='entity_identity'></block></xml>";
    var entityIdentityBlock = Blockly.Xml.textToDom(entityIdentityBlockText).firstChild;
    var entityIsTypeBlockText = "<xml><block type='entity_is_type'></block></xml>";
    var entityIsTypeBlock = Blockly.Xml.textToDom(entityIsTypeBlockText).firstChild;
    xmlList.push(entityIdentityBlock);
    xmlList.push(entityIsTypeBlock);
    return xmlList;
};

demoWorkspace.registerToolboxCategoryCallback('NEW_OBJECTS', newObjectCallback);