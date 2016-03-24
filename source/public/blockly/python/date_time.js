Blockly.Python.datetime = function()
{
	if (!Blockly.Python.definitions_['import_datetime'])
	{
		Blockly.Python.definitions_['import_datetime'] = "from datetime import *\n";
	}
}

Blockly.Python['get_time'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  Blockly.Python.datetime();
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
  	code = 'datetime.now().hour';
  }
  else if(type == 1)
  {
  	code = 'datetime.now().minute';
  }
  else
  {
  	code = 'datetime.now().second';
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['get_date'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  Blockly.Python.datetime();
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
    code = '(datetime.now().weekday()+1)';
  }
  else if(type == 1)
  {
    code = 'datetime.now().day';
  }
  else if(type == 2)
  {
    code = 'datetime.now().month';
  }
  else
  {
    code = 'datetime.now().year';
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['format_numbers'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.datetime();
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
    code = 'str('+value_number+').zfill(2)';
  }
  else if(type == 1)
  {
    code = 'str('+value_number+').rjust(2)';
  }
  else
  {
    code = value_number;
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};