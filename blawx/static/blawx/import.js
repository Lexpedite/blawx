function createImportListener(event) {
    if (event.type == Blockly.Events.BLOCK_CREATE) {
    for (var i = 0; i < event.ids.length; i++) {
      block = demoWorkspace.getBlockById(event.ids[i]);
      if (block.type == "import_ruleset") {
        currentUri = block.getFieldValue('uri');
        var uri;
        if (currentUri == "filename.blawx") {
          Blockly.prompt("What is the web address of the published .blawx file you would like to import?",'',function(value){uri = value});
          block.setFieldValue(uri,'uri');
        } else {
          uri = currentUri;
        }
        importSpace = new Blockly.Workspace();
        importDictionary[block.id] = importSpace;
        var request = new XMLHttpRequest();
        request.open('GET', uri, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var xml = Blockly.Xml.textToDom(request.responseText);
                Blockly.Xml.domToWorkspace(xml, importSpace);
            }
        }
        
        }
        
      }
    } else if (event.type == Blockly.Events.BLOCK_DELETE) {
      for (var i = 0; i < event.ids.length; i++) {
        if (event.ids[i] in importDictionary) {
          var workspace;
          workspace = importDictionary[event.ids[i]];
          workspace.dispose();
          delete importDictionary[event.ids[i]];
        }
      }
    }
  }
  demoWorkspace.addChangeListener(createImportListener);