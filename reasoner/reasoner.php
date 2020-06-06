<?PHP
header('Content-type:application/json;charset=utf-8');
// Get the code from the webpage.
$blawxcode = $_POST["code"];
$blawxdata = $_POST["data"];

// Debug mode, if set to true, will break the interface, but the feedback
// from the reasoner will be visible in the data returned from the reasoner
// and can be inspected in the browser's debugging tools.
$debugmode = False;

// for debugging, if no code provided, insert something simple.
if ($debugmode) {
	if ($blawxcode == "") {
		$blawxcode = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="fact" id="ptICG`ae^=FJa_t}tMT." x="64" y="90"><statement name="statement"><block type="declare_type" id="P.#=)Gpn7HEgA!}!Fx|="><field name="type_name">Man</field><next><block type="declare_type" id="(Ie81H6)oH1lIoFvKBQ#"><field name="type_name">Mortal</field><next><block type="entity_declaration" id="wS8LtRZaGcgRGMqLqQK{"><field name="entity_name">Socrates</field><next><block type="entity_is_type" id="Eo=/]L.9!,#|j^cw)#uM"><value name="entity name"><block type="object_selector" id="AxEvuQYY)UDCJ(~)!BoX"><mutation xmlns="http://www.w3.org/1999/xhtml" objectname="Socrates"></mutation></block></value><value name="type name"><block type="category_selector" id="W9g(2yTNP2;{[Kj+XMhO"><mutation xmlns="http://www.w3.org/1999/xhtml" categoryname="Man"></mutation></block></value></block></next></block></next></block></next></block></statement></block><block type="rule" id="LAudRsN*1D4t%B00)e!~" x="65" y="251"><field name="rule_name">name</field><statement name="conclusion"><block type="entity_is_type" id="X=^1x#EJi4yH:7xxab(-"><value name="entity name"><block type="variable_selector" id="NH!z_)H!@Z0#5U3_V6-R"><field name="variable_selected">A</field></block></value><value name="type name"><block type="category_selector" id="h@@Fxcwp#P.a^bq{WG,G"><mutation xmlns="http://www.w3.org/1999/xhtml" categoryname="Mortal"></mutation></block></value></block></statement><statement name="conditions"><block type="entity_is_type" id="p+]9iS,`]WGtL@CPi8:d"><value name="entity name"><block type="variable_selector" id="m0F{!5Az)gCk[qH$Wq0R"><field name="variable_selected">A</field></block></value><value name="type name"><block type="category_selector" id="W8hC2os4qLB:4Pn.GAMJ"><mutation xmlns="http://www.w3.org/1999/xhtml" categoryname="Man"></mutation></block></value></block></statement></block><block type="query" id="7xrN*_rs`mPzj[|EV[,D" x="56" y="414"><statement name="query"><block type="entity_is_type" id="/,aW6sS+1+%S^Fh@*hb3"><value name="entity name"><block type="object_selector" id="+tu*!jAvd1C2(*xb;r!O"><mutation xmlns="http://www.w3.org/1999/xhtml" objectname="Socrates"></mutation></block></value><value name="type name"><block type="category_selector" id="2*WKv`pj{9,zhkZ?P;.]"><mutation xmlns="http://www.w3.org/1999/xhtml" categoryname="Mortal"></mutation></block></value></block></statement></block></xml>';
	}	
}

//Debug
if ($debugmode) {
	echo "Code Received:\n";
	echo $blawxcode;
	echo "\n";
	echo "Data Received:\n";
	echo $blawxdata;
	echo "\n";
}


// Receive the code from the web request and put it in a file.
$tempfile = tempnam(".","blawxcode");
$tmpblxfile = $tempfile.".blawx";
$tmpflrfile = $tempfile.".flr";
$tmpjsonfile = $tempfile.".json";

if ($debugmode) {
	echo "Creating temporary file ".$tmpblxfile."\n";
}

$blawxhandle = fopen($tmpblxfile,"w");
if ($blawxcode) {
	fwrite($blawxhandle,$blawxcode);
	fclose($blawxhandle);
}

$blawxhandle = fopen($tmpjsonfile,"w");
if ($blawxdata) {
	fwrite($blawxhandle,$blawxdata);
	fclose($blawxhandle);
}

// Run the decode command with that filename, put the results into a variable.
$descriptorspec = array(
	0 => array("pipe", "r"),
	1 => array("pipe", "w"),
	2 => array("file", "./reasoner_error.log", "a")
);

if ($debugmode) {
	echo "Sending code to be turned into Flora-2 code.\n";
}

$code = shell_exec('node /var/www/html/decode.js '.$tmpblxfile);

if ($debugmode) {
	echo "Code received back: \n";
	echo $code;
	echo "\n";
	echo "Sending data to be turned into Flora-2 code.\n";
}

$blawxdata = shell_exec('python3 /var/www/html/json2f2.py '.$tmpjsonfile);

if ($debugmode) {
	echo "Code received back: \n";
	echo $blawxdata;
	echo "\n";
}

// Get the queries from the code.
preg_match('/^\?-.*\.$/ms',$code,$queries);
$queries[0] = preg_replace('/^\?-\ /m','',$queries[0]);
// Exclude the queries from the facts.
$facts = preg_replace('/^\?-.*\.$/ms','',$code);

// Put the facts
// in a temporary file, and have flora2 load it.
$factshandle = fopen($tmpflrfile,"w");
if ($code) {
	fwrite($factshandle,':- use_argumentation_theory.'.PHP_EOL);
	fwrite($factshandle,'\opposes(?_x[?_y->\true],?_x[?_y->\false]) :- ?_x:?_T, ?_T[|?_y=>\boolean|].'.PHP_EOL);
	fwrite($factshandle,$facts);
	if ($blawxdata) {
		fwrite($factshandle,$blawxdata);
	}
	fclose($factshandle);
} else {
	// for debugging
	fwrite($factshandle,"Test.\n");
	fclose($factshandle);
	$queries[0] = "Test.";
}

// Send data to Flora-2

$streams = array(
	0 => array("pipe", "r"),
	1 => array("pipe", "w"),
	2 => array("pipe", "w")
);

$flora = proc_open('sudo -u root /var/Flora-2/flora2/runflora --noprompt', $streams, $pipes);
// using sudo above is a hack to solve a permission problem that flora-2 doesn't run properly except with root
// privileges.
sleep(5);
if (is_resource($flora)) {
	stream_set_blocking($pipes[1],0);
	stream_set_blocking($pipes[2],0);
	// I want to send the initial commands.
	if ($debugmode) {
		echo "setting expert mode.\n";
	}
	fwrite($pipes[0], "expert{on}.\n");
	sleep(5);
	if ($debugmode) {
		$stdout = stream_get_contents($pipes[1],1024);
		$sterr = stream_get_contents($pipes[2],1024);
		echo "Standard Out;\n";
		echo $stdout . "\n";
		echo "Standard Err:\n";
		echo $stderr . "\n";
		echo "Loading data file:\n";
	}
	fwrite($pipes[0], "['".$tmpflrfile."'].\n");
	sleep(10);
	if ($debugmode) {
		$stdout = stream_get_contents($pipes[1],1024);
		$sterr = stream_get_contents($pipes[2],1024);
		echo "Standard Out;\n";
		echo $stdout . "\n";
		echo "Standard Err:\n";
		echo $stderr . "\n";
	}
	stream_get_contents($pipes[1],1024);
	stream_get_contents($pipes[2],1024);
	// I want to send the query
	$queries[0] = trim(preg_replace('/\s+/', ' ', $queries[0]));
	if ($debugmode) {
		echo "Sending query:\n";
		echo $queries[0]."\n";
	}
	
	fwrite($pipes[0],$queries[0]."\n");
	sleep(5);
	$answer = stream_get_contents($pipes[1],1024);  // This needs to be adjusted for longer output.
	if ($debugmode) {
		$sterr = stream_get_contents($pipes[2],1024);
		echo "Standard Out;\n";
		echo $answer . "\n";
		echo "Standard Err:\n";
		echo $stderr . "\n";
	}
	
	$answercount = 0;
        $answersdone = false;
        $lines = explode("\n", $answer);
        for ($i = 0; $i < count($lines); $i++) {
                # do something with $line
                if ($lines[$i] == "" and $answersdone == false) {
                        $answercount += 1;
                        $output['answers'][strval($answercount)] == [];
                }
                elseif (strpos($lines[$i], 'Times (in seconds)') !== false) {
                        #Do nothing.
                }
                elseif (strpos($lines[$i], 'solution(s)') !== false) {
                        $answersDone = True;
                        unset($output['answers'][strval($answercount)]);
                }
                elseif ($lines[$i] != 'Yes' and $lines[$i] != 'No' and $lines[$i] != '') {
			$lineparts = explode(" = ", $lines[$i], 2);
			if (strpos($lineparts[1], "flora'skolem") !== false) {
				$lineparts[1] = "Unnamed Object";
			}
                        if (substr($lineparts[0],0,1) == '?') {
							if (substr($lineparts[1],0,1) == '\\') {
								$output['answers'][strval($answercount)][substr($lineparts[0],1)] = substr($lineparts[1],1);
							} else {
								$output['answers'][strval($answercount)][substr($lineparts[0],1)] = $lineparts[1];
							}
                        } else {
							if (substr($lineparts[1],0,1) == '\\') {
								$output['answers'][strval($answercount)][$lineparts[0]] = substr($lineparts[1],1);
							} else {
								$output['answers'][strval($answercount)][$lineparts[0]] = $lineparts[1];
							}
                        }
                }
                elseif ($lines[$i] == 'Yes' or $lines[$i] == 'No') {
                        $output['main'] = $lines[$i];
                }
        }
        echo json_encode($output);

	stream_get_contents($pipes[2],1024);
	fwrite($pipes[0], "\halt.\n");
	sleep(1);
	fclose($pipes[0]);
	fclose($pipes[1]);
	fclose($pipes[2]);
	$return_value = proc_close($flora);
}
// unlink($tmpflrfile);
?>


