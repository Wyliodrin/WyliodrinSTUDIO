Blockly.JavaScript['delay_chrome'] = function(block) {
  var value_millis = Blockly.JavaScript.valueToCode(block, 'millis', Blockly.JavaScript.ORDER_ATOMIC);
  var type = parseInt (block.getFieldValue("type"));
  if (isNaN(type)) type = 0;
  // TODO: Assemble Python into code variable.
  var code = '';
  if (type == 0)
  {
    code = 'delay ('+value_millis+');\n';
  }
  else if (type == 1)
  {
    code = 'delay (('+value_millis+')/1000);\n';
  }
  else
  {
    code = 'delay (('+value_millis+')*1000);\n';
  }
  return code;
};