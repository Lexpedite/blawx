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
    payload.scasp_encoding = sCASP.workspaceToCode(demoWorkspace);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../" + current_section + "/update/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        console.log("Saved")
    };
    console.log("Saving")
    xhttp.send(body=JSON.stringify(payload));
    Blockly.hideChaff();

}

function formatDates(text) {
    var date_format = /date\((\d+(?:\.\d+)?)\)/g
    var datetime_format = /datetime\((\d+(?:\.\d+)?)\)/g
    var duration_format = /duration\((\d+(?:\.\d+)?)\)/g
    var time_format = /(?<!date)time\((\d+(?:\.\d+)?)\)/g
    var output = text;
    // Replace date(#) with date format.
    var date_match = null;
    while (date_match = date_format.exec(output)) {
        var date = new Date(date_match[1]*1000)
        var date_text = date.getFullYear() + "/" + (parseInt(date.getMonth())+1) + "/" + date.getDate();
        output = output.replace(date_match[0]," "+date_text)
    }
    var datetime_match = null;
    while (datetime_match = datetime_format.exec(output)) {
        var date = new Date(datetime_match[1]*1000)
        var datetime_text = date.getFullYear() + "/" + (parseInt(date.getMonth())+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes().toString().padStart(2,"0") + ":" + date.getSeconds().toString().padStart(2,"0")
        output = output.replace(datetime_match[0]," "+datetime_text)
    }
    var duration_match = null;
    while (duration_match = duration_format.exec(output)) {
        var timestamp = duration_match[1];
        if (timestamp < 1) {
            var direction = "into the past";
            timestamp = timestamp * -1;
        } else {
            var direction = "into the future";
        }
        var days = Math.floor(timestamp/86400);
        var hours = Math.floor((timestamp-days*86400)/3600);
        var minutes = Math.floor((timestamp-days*86400-hours*3600)/60);
        var seconds = timestamp - days*86400 - hours*3600 - minutes*60;
        var duration_text = (days != 0 ? days + " days, " :"") + 
                (hours != 0 ? hours + " hours, " : "") + 
                (minutes != 0 ? minutes + " minutes, " : "") +
                (seconds != 0 ? seconds + " seconds " : "") + 
                direction
        output = output.replace(duration_match[0]," "+duration_text)
    }
    var time_match = null;
    while (time_match = time_format.exec(output)) {
        var timestamp = time_match[1];
        var hours = Math.floor(timestamp/3600);
        var minutes = Math.floor((timestamp-(hours*3600))/60)
        var seconds = timestamp-(hours*3600)-(minutes*60)
        var time_text = hours + ":" + minutes.toString().padStart(2,"0") + ":" + seconds.toString().padStart(2,"0")
        output = output.replace(time_match[0]," "+time_text)
    }
    return output;
}

function addSectionReferences(text) {
    // Search the string for the list of section references
    var match = text.match(/according to (sec_.*)_section/);
    var rule_text = "This will be the text of the act."
    if (match) {
        var eId = match[1];
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../../rule/" + eId + "/", false);
        xhttp.setRequestHeader('X-CSRFToken', csrftoken);
        xhttp.send();
        output_object = JSON.parse(xhttp.responseText);
        rule_text = output_object['text'];
        text = text.replace("according to " + eId + "_section",
        'according to <a href="#" data-bs-toggle="tooltip" data-bs-html="true" title="' + rule_text + '">' + eId + '</a>')
    }
    var new_text = text.replace(/(sec_.*)_section/g,"$1");
    new_text = new_text.replace(/sec_/g,"section ");
    new_text = new_text.replace(/__subsec_/g," subsection ");
    new_text = new_text.replace(/__para_/g," paragraph ");
    new_text = new_text.replace(/__subpara_/g,' sub-paragraph ');
    new_text = new_text.replace(/__span_/g,' span ');
    return new_text
}

function convertModelToTree(list,answer,explanation,prefix="",root=true) {
    output_html = "";
    if (root) {
        prefix = "ex_" + answer + "_" + explanation
        output_html += '<div class="explanation">'
        // An explanation may have more than one root conclusion it
        // is trying to explain. So at this point it is potentially
        // a list of lists, with no text elements.
        // Run this again against each sub-element.
        output_html += "<ul>"
        for (var i = 0; i < list.length; i++) {
            output_html += "<li>"
            output_html += convertModelToTree(list[i],answer,explanation,prefix + '_' + i,false)
            output_html += "</li>"
        }
        output_html += "</ul>"
        output_html += "</div>"
    } else {
        // Now we are inside a given root explanation.
        // Each node is a piece of text, optionally followed by an array
        // of reasons for that piece of text.
        var has_reasons = Array.isArray(list[1]);
        var target = prefix; 
        output_html += '<div class="explanation_node">'
        if (has_reasons) {
            output_html += '<i class="bi bi-caret-right" data-bs-toggle="collapse" data-bs-target="#' + target + '"></i>'
        }
        output_html += formatDates(addSectionReferences(list[0]))
        output_html += '</div>'
        // Now we have displayed the text, we optionally display each of the
        // reasons, processing it using this formula if it, too, has reasons.
        if (has_reasons) {
            output_html += '<div class="subparts collapse" id="' + target + '">'
            output_html += "<ul>"
            for (var j = 0; j < list[1].length; j++) {
                var reason_has_reasons = Array.isArray(list[1][j+1]);
                output_html += "<li>"
                if (reason_has_reasons) {
                    output_html += convertModelToTree(list[1].slice(j),answer,explanation,target + '_' + j,false)
                    j++;
                } else {
                    output_html += formatDates(list[1][j])
                }
                output_html += "</li>"
            }
            output_html += '</ul></div>'
        }
    }
    return output_html;
}

var tooltipTriggerList;
var tooltipList;
var updateTooltips;
updateTooltips = function() {
    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

function describe_constraint(constraint) {
    // A constraint is a functor and a list of arguments.
    // Some functions can have other functions inside them.
    // Functors can be "{}", ",", "put_attr", ">", ">=", "=<", or "<".
    var functor = constraint['functor'];
    var args = constraint['args'];
    var output = ""
    switch(functor) {
        case "put_attr": // We don't need to display these.
            return ""
        case "{}": // This is a set of one or more numerical constraints
            for (var a=0; a< args.length; a++) {
                output += "<li>" + describe_constraint(args[a]) + "</li>";
            }
            return output;
        case ",": // This is a set of two conjoined constraints
            output += describe_constraint(args[0]);
            output += " and ";
            output += describe_constraint(args[1]);
            return output;
        case "<":
            output += args[0] + " is less than " + args[1];
            return output;
        case ">":
            output += args[0] + " is greater than " + args[1];
            return output;
        case "=<":
            output += args[0] + " is less than or equal to " + args[1];
            return output;
        case ">=":
            output += args[0] + " is greater than or equal to " + args[1];
            return output;
        case "∉":
            output += "<li>" + args[0] + " is not "
            if (args[1].length > 1) {
                output += "one of ";
            }
            output += args[1].toString() + "</li>";
            return output;
        default:
            console.warn("Unrecognized constraint type applied to variable: " + constraint.toString())
    }
}

var runCode
runCode = function(button) {
    var run_xhttp = new XMLHttpRequest();
    run_xhttp.open("POST", "run/", true);
    run_xhttp.setRequestHeader('Content-type', 'application/json');
    run_xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    run_xhttp.onload = function() {
        //console.log("Response Length: " + this.responseText.length)
        output_object = JSON.parse(this.responseText);
        // console.log(output_object);
        if (output_object.error) {
            $output.textContent = output_object.error;
        } else if (output_object.Answers.length == 0) {
            $output.textContent = "No models";
        } else {
            var output_content = '<div class="accordion accordion-flush">';
            var answers = output_object.Answers;
            for (let i = 0; i < answers.length; i++) {
                var count = i+1;
                var heading_name = "answer_" + count + "_heading";
                var collapse_name = "answer_" + count + "_collapse";
                output_content += '<div class="accordion-item"><h2 class="accordion-header" id="' + heading_name + '">';
                output_content += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + collapse_name + '" aria-expanded="false" aria-controls="' + collapse_name + '">';
                output_content += 'Answer #' + count;
                var variables = answers[i].Variables;
                output_content += '</button></h2>';
                output_content += '<div id="' + collapse_name + '" class="accordion-collapse collapse" aria-labelledby="' + heading_name + '" style="">';
                models = answers[i].Models;
                output_content += '<div class="accordian accordian-flush">'
                output_content += '<ul>'
                /// Replaceing from here
                var attributes_output = [];
                
                // output_content += attributes_output;
                /// To Here.
                output_content += '</ul>'
                
                for (let j = 0; j < models.length; j++) {
                    var model_count = j+1;
                    var model_heading_name = "answer_" + count + "_model_" + model_count + "_heading";
                    var model_collapse_name = "answer_" + count + "_model_" + model_count + "_collapse";
                    output_content += '<div class="accordion-item"><h2 class="accordion-header" id="' + model_heading_name + '">';
                    output_content += '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + model_collapse_name + '" aria-expanded="false" aria-controls="' + model_collapse_name + '">';
                    output_content += 'Explanation #' + model_count;
                    output_content += '</button></h2>';
                    output_content += '<div id="' + model_collapse_name + '" class="accordion-collapse collapse" aria-labelledby="' + model_heading_name + '" style="">';
                    for (var attribute in models[j]['Residuals']) {
                        var description = describe_constraint(models[j]['Residuals'][attribute]);
                        if (description != "") {
                            attributes_output.push(description);
                        }
                    }
                    // for (var key in variables) {
                    //     if (key == "$residuals") {
                    //         for (var attribute in variables['$residuals']) {
                    //             if (variables['$residuals'][attribute]['functor'] == "put_attr" && variables['$residuals'][attribute]['args'][1] == 'scasp_output' && variables['$residuals'][attribute]['args'][2]['functor'] == 'name') {
                    //                 // This is designed to prevent re-printing information about the Attributes that is already displayed.
                    //                 // If the only thing present int he attributes is the name, just skip it.
                    //                 continue;
                    //             } else if (variables['$residuals'][attribute]['functor'] == "∉") {
                    //                 // This is an inequality constraint
                    //                 attributes_output += "<li>where " + variables['$residuals'][attribute]['args'][0] + " is not ";
                    //                 if (variables['$residuals'][attribute]['args'][1].length > 1) {
                    //                     attributes_output += "one of ";
                    //                 }
                    //                 attributes_output += variables['$residuals'][attribute]['args'][1].toString() + "</li>"
                    //             } else if (variables['$residuals'][attribute]['functor'] == "{}") {
                    //                 attributes_output += "<li>where" + variables['$residuals'][attribute]['args'][0]['args'][0] + " " + variables['$residuals'][attribute]['args'][0]['functor'] + " " + variables['$residuals'][attribute]['args'][0]['args'][1] + "</li>";
                    //             } else {
                    //                 // It should throw a console warning if there was something else in there.
                    //                 console.warn("Unrecognized attribute in output: " + attribute['functor'] + ".");
                    //             }
                    //         }
                    //     } else {
                    //         output_content += '<li>' + key + ': ' + variables[key] + '</li>';
                    //     }
                    // }
                    if(attributes_output.length) {
                        output_content += "Where:<ul>";
                        for (var ao=0; ao < attributes_output.length; ao++) {
                            output_content += attributes_output[ao];
                        }
                        output_content += "</ul>";
                    }
                    output_content += convertModelToTree(models[j].Tree,count,model_count);
                    output_content += '</div></div>';
                    
                }
                output_content += '</div></div></div>';
            }
            output_content += '</div>';
            $output.innerHTML = output_content;
        }
        if (output_object.transcript) {
            $problems.textContent = output_object.transcript;
        }
        
        updateTooltips();
        // Open the drawer and select Output
        // $('#rightbar').collapse('show');
        var someTabTriggerEl = document.querySelector('#answers-tab')
        var tab = new bootstrap.Tab(someTabTriggerEl)
        tab.show()
    };
    // If there is a json_input type block on the workspace, insert its contents into the post
    // request.
    json_inputs = demoWorkspace.getBlocksByType('json_textfield');
    if (json_inputs.length > 0) {
        run_xhttp.send(body=json_inputs[0].getFieldValue('payload')) // Only uses the "first"
    } else {
        run_xhttp.send();
    }
    $output = document.getElementById('answers');
    $output.textContent = "Thinking...\n";
    $problems = document.getElementById('problems');
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

function loadBlocksFile(element) {
    try {	
      var file = element.files[0];
      var fr = new FileReader();           
      fr.onload = function (event) {
        var xml = Blockly.utils.xml.textToDom(event.target.result);
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
    var xml = Blockly.utils.xml.textToDom(event.target.result);
    importWorkspace.clear();
    Blockly.Xml.domToWorkspace(xml, importWorkspace);
    };
    fr.readAsText(file);
    document.getElementById(element.id).value = "";
} catch (e) {
    alert(e);
}
}
var getExample;
getExample = function(example_pk){
    // Get the code for the example
    var xml = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/example/" + example_pk + "/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        output_object = JSON.parse(this.responseText);
        demoWorkspace.clear();
        xml = Blockly.utils.xml.textToDom(output_object.xml_content);
        Blockly.Xml.domToWorkspace(xml, demoWorkspace);
    }
    xhttp.send();
    Blockly.hideChaff();   
}
var load_section_workspace;
load_section_workspace = function(ruledoc_id,workspace_id) {
    // console.log("Trying to load workspace " + workspace_id + " from RuleDoc " + ruledoc_id)
    // Save the current workspace with a call to /ruledoc_id/workspace_name/update
    // updateWorkspace();
    // Get the new workspace with a call to /ruledoc_id/workspace_name/get
    var xml = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../" + workspace_id + "/get/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        // console.log("gotten")
        demoWorkspace.clear();
        if (this.responseText) {
            output_object = JSON.parse(this.responseText);
            if (output_object.xml_content) {
                xml = Blockly.utils.xml.textToDom(output_object.xml_content);
                Blockly.Xml.domToWorkspace(xml, demoWorkspace);
            }
        }
    }
    // console.log("getting")
    xhttp.send();
    Blockly.hideChaff();
}
var load_test_workspace;
load_test_workspace = function(ruledoc_id,test_name) {
    console.log("Trying to load workspace " + test_name + " from RuleDoc " + ruledoc_id)
    // Save the current workspace with a call to /ruledoc_id/workspace_name/update
    // updateWorkspace();
    // Get the new workspace with a call to /ruledoc_id/workspace_name/get
    var xml = "";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../test/" + test_name + "/get/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        console.log("gotten")
        demoWorkspace.clear();
        if (this.responseText) {
            output_object = JSON.parse(this.responseText);
            if (output_object.xml_content) {
                xml = Blockly.utils.xml.textToDom(output_object.xml_content);
                Blockly.Xml.domToWorkspace(xml, demoWorkspace);
            }
        }
    }
    console.log("getting")
    xhttp.send();
    Blockly.hideChaff();
}
var updateBlawxTest
updateBlawxTest = function() {
    var payload = {}
    var main_xml = Blockly.Xml.workspaceToDom(demoWorkspace);
    // Output the current workspace to a variable
    payload.xml_content = Blockly.Xml.domToText(main_xml);
    // Output the current encoding to a variable
    payload.scasp_encoding = sCASP.workspaceToCode(demoWorkspace);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../" + blawxTestID + "/update/", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
    xhttp.onreadystatechange = function() {
        console.log("Saved")
    };
    console.log("Saving")
    xhttp.send(body=JSON.stringify(payload));
    Blockly.hideChaff();
}

var show_tutorial;
show_tutorial = function() {
    $('#rightbar').collapse('show');
    var tutorial_tab = $('#nav-tutorial-tab');
    var bootstrap_tab = new bootstrap.Tab(tutorial_tab)
    bootstrap_tab.show();
}