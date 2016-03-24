Blockly.JavaScript['repeat_timing'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_time = block.getFieldValue('TIME');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var type = parseInt (dropdown_time);
  if(type == 0)
  {
  	value_value = value_value*1000;
  }
  else if(type == 2)
  {
  	value_value = value_value/1000;
  }
   var dfunct = Blockly.JavaScript.variableDB_.getDistinctName(
        'loopCode', Blockly.Generator.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = 'function '+dfunct+'()\n{\n'+
  				statements_name+'}\nsetInterval('+dfunct+', '+value_value+');\n';
  return code;
};