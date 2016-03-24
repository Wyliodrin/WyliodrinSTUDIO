Blockly.JavaScript['get_time'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
  	code = 'new Date().getHours()';
  }
  else if(type == 1)
  {
  	code = 'new Date().getMinutes()';
  }
  else
  {
  	code = 'new Date().getSeconds()';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['get_date'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
    code = 'new Date().getDate()';
  }
  else if(type == 1)
  {
    code = '(new Date().getDay()+1)';
  }
  else if(type == 2)
  {
    code = '(new Date().getMonth()+1)';
  }
  else
  {
    code = 'new Date().getFullYear()';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['format_numbers'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.datetime();
  var type = parseInt(dropdown_name);
  var code = '';
  if(type == 0)
  {
    code = '('+value_number+'<10?"0"+'+value_number+':'+value_number+')';
  }
  else if(type == 1)
  {
    code = '('+value_number+'<10?" "+'+value_number+':'+value_number+')';
  }
  else
  {
    code = value_number;
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
