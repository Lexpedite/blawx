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
        var run_xhttp = new XMLHttpRequest();
        run_xhttp.open("POST", "../run/", true);
        run_xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        run_xhttp.setRequestHeader('X-CSRFToken', csrftoken);
        run_xhttp.onreadystatechange = function() {
            output_object = JSON.parse(this.responseText);
            // console.log(output_object);
            if (output_object.answer == 'false' || output_object.answer == 'true') {
                if (output_object.answer == 'false') {
                    $output.textContent = "No models";
                } else {
                    $output.textContent = "Yes";
                }
            } else {
                var output_content = '<div class="accordion accordion-flush">';
                var answers = JSON.parse(output_object.answer);
                for (let i = 0; i < answers.length; i++) {
                    var count = i+1;
                    var heading_name = "model_" + count + "_heading";
                    var collapse_name = "model_" + count + "_collapse";
                    output_content += '<div class="accordion-item"><h2 class="accordion-header" id="' + heading_name + '">';
                    output_content += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapse_name + '" aria-expanded="false" aria-controls="' + collapse_name + '">';
                    output_content += 'Model #' + count;
                    output_content += '</button></h2>';
                    output_content += '<div id="' + collapse_name + '" class="accordion-collapse collapse" aria-labelledby="' + heading_name + '" style="">';
                    output_content += '<pre class="accordion-body">' + answers[i].Human.slice(0,-5) + '</pre>';
                    output_content += '</div></div>';
                }
                output_content += '</div>';
                $output.innerHTML = output_content;
            }
            $problems.textContent = output_object.transcript;
        };
        run_xhttp.send();
    };
    console.log("Saving and Running")
    $output = document.getElementById('nav-output');
    $output.textContent = "Thinking...\n";
    $problems = document.getElementById('problems');
    xhttp.send(body=JSON.stringify(payload));
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
