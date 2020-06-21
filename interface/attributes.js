function blawxTypeToBlocklyType(blawxType) {
    if (blawxType == 'True/False') {
      return 'Boolean';
    } else if (blawxType == "Number") {
      return 'Number';
    } else if (blawxType == "String") {
      return 'String';
    } else if (blawxType == "Date") {
      return 'DATE';
    } else if (blawxType == "Datetime") {
      return 'DATETIME';
    } else if (blawxType == "Time") {
      return "TIME";
    } else if (blawxType == "Duration") {
      return "DURATION";
    } else {
      return null;
    }
  }

function setAttributeType(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {
    for (var i = 0; i < event.ids.length; i++) {
      block = demoWorkspace.getBlockById(event.ids[i]);
      if (block.type == "attribute_selector") {
        var attribute_name = block.getFieldValue('attributeName');
        if (block.getInput('value').connection.getCheck()[0] == 'CALCULATED TYPE HERE') {
          block.getInput('value').connection.setCheck([blawxTypeToBlocklyType(attributeTypes[attribute_name]),'ENTITY']);
        }
      }
    }
  }
}

demoWorkspace.addChangeListener(setAttributeType);