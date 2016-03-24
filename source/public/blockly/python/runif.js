
"use strict";



Blockly.Python.time = function ()
{
	if (!Blockly.Python.definitions_["import_time"])
	{
		Blockly.Python.definitions_["import_time"] = "from time import *\n";
	}
};

Blockly.Python['runif_statements'] = function(block) {
  Blockly.Python.time ();
  var value_if = Blockly.Python.valueToCode(block, 'if', Blockly.Python.ORDER_ATOMIC);
  var value_every = Blockly.Python.valueToCode(block, 'every', Blockly.Python.ORDER_ATOMIC);
  var statements_lines = Blockly.Python.statementToCode(block, 'lines');
  console.log (statements_lines);
  var dropdown_multiply = block.getFieldValue('multiply');
  var ifv = Blockly.Python.variableDB_.getDistinctName('ifv', Blockly.Generator.NAME_TYPE);
  Blockly.Python.definitions_[ifv] = ifv+' = 0\n';
  // TODO: Assemble Python into code variable.
  var globals = Blockly.Variables.allVariables(block);
  for (var i=0; i<globals.length; i++)
  {
    globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var code = 'global '+ifv+'\n'+
				'if ('+value_if+') and (abs ('+ifv+'-mktime (localtime())) > '+value_every+'*'+dropdown_multiply+'):\n'+
  				globals+
				statements_lines+
  				'  '+ifv+'=mktime(localtime())\n';
  return code;
};
