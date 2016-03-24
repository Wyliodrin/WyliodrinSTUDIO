Blockly.Python.timer = function()
{
	if(!Blockly.Python.definitions_['import_timer'])
	{
		Blockly.Python.definitions_['import_timer'] = 'from threading import Timer\n';
	}
}

Blockly.Python['repeat_timing'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  var dropdown_time = block.getFieldValue('TIME');
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');
  var type = parseInt (dropdown_time);
  Blockly.Python.timer();
  var dfunct = Blockly.Python.variableDB_.getDistinctName(
        'loopCode', Blockly.Generator.NAME_TYPE);
  if(type == 1)
  {
  	value_value = value_value/1000;
  }
  else if(type == 2)
  {
  	value_value = value_value/1000000;
  }
  var globals = Blockly.Variables.allVariables(block);
  for (var i=0; i<globals.length; i++)
  {
    globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  // TODO: Assemble Python into code variable.
  var code = 'def '+dfunct+'():\n'+globals+statements_name+
  			'  Timer('+value_value+', '+dfunct+').start()\n'+
        dfunct+'()\n';
  return code;
};
