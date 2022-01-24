

function setAttributeType(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {
    for (var i = 0; i < event.ids.length; i++) {
      block = demoWorkspace.getBlockById(event.ids[i]);
      if (block.type == "attribute_selector") {
        var attribute_name = block.getFieldValue('attribute_name');
        if (block.getFieldValue('order') == 'ov') {
            block.getInput('second_element').connection.setCheck([blawxTypeToBlocklyType(attributeTypes[attribute_name]),'VARIABLE']);
            block.getInput('first_element').connection.setCheck(['OBJECT','VARIABLE']);
        }
        else {
          block.getInput('first_element').connection.setCheck([blawxTypeToBlocklyType(attributeTypes[attribute_name]),'VARIABLE']);
          block.getInput('second_element').connection.setCheck(['OBJECT','VARIABLE']);
        }
      }
    }
  }
}

demoWorkspace.addChangeListener(setAttributeType);

// function setCustomAttributeType(event) {
//   if (event.type == Blockly.Events.BLOCK_CREATE) {
//     for (var i = 0; i < event.ids.length; i++) {
//       block = demoWorkspace.getBlockById(event.ids[i]);
//       if (block.type == "custom_attribute_selector") {
//         var payload = JSON.parse(block.data);
//         var attribute_name = payload['attributeName'];
//         var type = blawxTypeToBlocklyType(attributeTypes[attribute_name]);
//         var order = payload['order'];
//         if (block.getInput('first_entity').connection.getCheck() == "FIRST COMPUTED TYPE HERE") {
//           // This checks to see if the type has already been set. If so, don't
//           // set it again, because that will first unset it, which will kick
//           // out copied sub-blocks and mess up the workspace.
//           if (order == 'object_first') {
//             // Change the second input.
//             block.getInput('second_entity').connection.setCheck([type,'ENTITY']);
//             block.getInput('first_entity').connection.setCheck('ENTITY');
//           } else {
//             // Change the first input.
//             block.getInput('first_entity').connection.setCheck([type,'ENTITY']);
//             block.getInput('second_entity').connection.setCheck('ENTITY');
//           }
//         }
        
//       }
//     }
//   }
// }

// demoWorkspace.addChangeListener(setCustomAttributeType);