var attributeTypes = [];
var importDictionary = {};
var knownAttributesCallback;
knownAttributesCallback = function(workspace) {
    var xmlList = [];
    attributeTypes = [];
    var blockList = demoWorkspace.getAllBlocks();
    for (var i = 0; i< blockList.length; i++) {
    if (blockList[i].type == "attribute_declaration") {
        var attribute_name = blockList[i].getFieldValue('attribute_name');
        var attribute_type = blockList[i].getInputTargetBlock('attribute_type').toString();
        attributeTypes[attribute_name] = attribute_type;
        var blockText = "<xml><block type='attribute_selector'><field name='attributeName'>" + attribute_name + "</field></block></xml>"
        var block = Blockly.Xml.textToDom(blockText).firstChild;
        // need to check for repeatedly adding the same block.
        xmlList.push(block);
    }
    }
    for (var id in importDictionary) {
    var blockList = importDictionary[id].getAllBlocks();
    
    for (var i = 0; i< blockList.length; i++) {
        if (blockList[i].type == "attribute_declaration") {
        var attribute_name = blockList[i].getFieldValue('attribute_name');
        var attribute_type = blockList[i].getInputTargetBlock('attribute_type').toString();
        attributeTypes[attribute_name] = attribute_type;
        var blockText = "<xml><block type='attribute_selector'><field name='attributeName'>" + attribute_name + "</field></block></xml>"
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