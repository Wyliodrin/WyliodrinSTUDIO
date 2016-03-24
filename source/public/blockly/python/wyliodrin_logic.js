
Blockly.Python.valueChanged = function ()
{
	if (!Blockly.Python.definitions_['old_values'])
	{
		var valueold = Blockly.Python.variableDB_.getName('old_values', Blockly.Variables.NAME_TYPE);
		Blockly.Python.old_values = valueold;
		Blockly.Python.definitions_['old_values'] = Blockly.Python.old_values +' = {}\n';
	}
	if (!Blockly.Python.definitions_['value_changed'])
	{
		Blockly.Python.definitions_['value_changed'] = 'def valueChanged(name, value, change):\n'+
														'  global '+Blockly.Python.old_values+'\n'+
														'  val = False\n'+
														'  if name in '+ Blockly.Python.old_values+'.keys():\n'+
														'    if abs('+Blockly.Python.old_values+'[name] - value) >= change:\n'+
														'      val = True\n'+
														'      '+Blockly.Python.old_values+'[name] = value\n'+
														'  else:\n'+
														'    '+Blockly.Python.old_values+'[name] = value\n'+
														'  return val\n';
	}
}

Blockly.Python['value_changed'] = function(block) {
	Blockly.Python.valueChanged ();
 	var variable_variable = Blockly.Python.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
	var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
	// TODO: Assemble Python into code variable.
	var code = 'valueChanged (\''+variable_variable+'\', '+variable_variable+', '+value_value+')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.Python.ORDER_NONE];
};