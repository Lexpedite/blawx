

function setAttributeType(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {
    // console.log("Block was created.");
    for (var i = 0; i < event.ids.length; i++) {
      block = demoWorkspace.getBlockById(event.ids[i]);
      if (block.type == "attribute_selector") {
        var attribute_name = block.blawxAttributeName;
        if (block.blawxAttributeOrder == 'ov') {
            block.getInput('second_element').connection.setCheck([blawxTypeToBlocklyType(block.blawxAttributeType),'VARIABLE']);
            block.getInput('first_element').connection.setCheck(['OBJECT','VARIABLE']);
        }
        else {
          block.getInput('first_element').connection.setCheck([blawxTypeToBlocklyType(block.blawxAttributeType),'VARIABLE']);
          block.getInput('second_element').connection.setCheck(['OBJECT','VARIABLE']);
        }
      }
    }
  }
}

demoWorkspace.addChangeListener(setAttributeType);