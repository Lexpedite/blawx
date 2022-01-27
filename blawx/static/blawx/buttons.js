function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
var updateWorkspace
updateWorkspace = function() {
    var payload = {}
    var main_xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    // Output the current workspace to a variable
    payload.xml_content = Blockly.Xml.domToText(main_xml);
    // Output the current encoding to a variable
    payload.scasp_encoding = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../update/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        console.log("Saved")
    };
    console.log("Saving")
    xhttp.send(body=JSON.stringify(payload));
    Blockly.hideChaff();

}
var runCode
runCode = function(button) {
    $output = document.getElementById('output');
    $output.textContent = "Thinking...\n";
    var main_xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    var main_xml_text = Blockly.Xml.domToText(main_xml);
    //code += main_xml_text;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/blawx/run/rps/", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        output_object = JSON.parse(this.responseText);
        answer = output_object.answer;
        console.log(output_object.transcript);
        $output.textContent = answer.JOut;
    };
    xhttp.send();
    Blockly.hideChaff();
}
var clearBlocks;
clearBlocks = function(button) {
    demoWorkspace.clear();
    Blockly.hideChaff();
}
var clearImport;
clearImport = function(button) {
    importWorkspace.clear();
    Blockly.hideChaff();
}
var getLoadFile;
getLoadFile = function(button) {
    element = document.getElementById('loadfile');
    element.click();
    Blockly.hideChaff();
}
var getImportFile;
getImportFile = function(button) {
    element = document.getElementById('importfile');
    element.click();
    Blockly.hideChaff();
}
var exportBlocks;
exportBlocks = function(button) {
try {
    var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    var xml_text = Blockly.Xml.domToText(xml);
    
    var link = document.createElement('a');
    link.download="project.blawx";
    link.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
    document.body.appendChild(link);
    link.click();
    link.remove();
    Blockly.hideChaff();
} catch (e) {
    window.location.href="data:application/octet-stream;utf-8," + encodeURIComponent(xml_text);
    alert(e);
}
}
var gotoHelp;
gotoHelp = function(button) {
    window.open('/docs');
}
// demoWorkspace.registerButtonCallback('menuRunCode', runCode);
// demoWorkspace.registerButtonCallback('menuClear', clearBlocks);
// demoWorkspace.registerButtonCallback('menuLoad', getLoadFile);
// demoWorkspace.registerButtonCallback('menuSave', exportBlocks);
// demoWorkspace.registerButtonCallback('menuHelp', gotoHelp);

function loadBlocksFile(element) {
    try {	
      var file = element.files[0];
      var fr = new FileReader();           
      fr.onload = function (event) {
        var xml = Blockly.Xml.textToDom(event.target.result);
        demoWorkspace.clear();
        Blockly.Xml.domToWorkspace(xml, demoWorkspace);
      };
      fr.readAsText(file);
      document.getElementById(element.id).value = "";
    } catch (e) {
      alert(e);
    }	  
  }

function importBlocksFile(element) {
try {
    var file = element.files[0];
    var fr = new FileReader();
    fr.onload = function (event) {
    var xml = Blockly.Xml.textToDom(event.target.result);
    importWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, importWorkspace);
    };
    fr.readAsText(file);
    document.getElementById(element.id).value = "";
} catch (e) {
    alert(e);
}
}
