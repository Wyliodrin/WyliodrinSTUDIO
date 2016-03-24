
Blockly.JavaScript.valueChanged = function ()
{
	if (!Blockly.JavaScript.definitions_['old_values'])
	{
		var valueold = Blockly.JavaScript.variableDB_.getName('old_values', Blockly.Variables.NAME_TYPE);
		Blockly.JavaScript.old_values = valueold;
		Blockly.JavaScript.definitions_['old_values'] = Blockly.JavaScript.old_values +' = {};\n';
	}
	if (!Blockly.JavaScript.definitions_['value_changed'])
	{
		Blockly.JavaScript.definitions_['value_changed'] = 'function valueChanged(name, value, change)\n'+
														'{\n'+
														'  val = false;\n'+
														'  if (name in '+ Blockly.JavaScript.old_values+')\n'+
														'  {\n'+
														'    if (Math.abs('+Blockly.JavaScript.old_values+'[name] - value) >= change)\n'+
														'    {\n'+
														'      val = true;\n'+
														'      '+Blockly.JavaScript.old_values+'[name] = value;\n'+
														'    }\n'+
														'  }\n'+
														'  else\n'+
														'  {\n'+
														'    '+Blockly.JavaScript.old_values+'[name] = value;\n'+
														'  }\n'+
														'  return val;\n'+
														'}\n';
	}
}

Blockly.JavaScript['value_changed'] = function(block) {
	Blockly.JavaScript.valueChanged ();
 	var variable_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
	var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
	// TODO: Assemble Python into code variable.
	var code = 'valueChanged (\''+variable_variable+'\', '+variable_variable+', '+value_value+')';
	// TODO: Change ORDER_NONE to the correct strength.
	return [code, Blockly.JavaScript.ORDER_NONE];
};