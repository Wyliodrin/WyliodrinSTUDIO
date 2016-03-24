Blockly.JavaScript['firmata_init'] = function(block) {
  var dropdown_board = block.getFieldValue('board');
  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '//Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_digitalwrite'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var value_digitalpin = Blockly.JavaScript.valueToCode(block, 'digitalPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '//Block not supported in JavaScript';
  return code;
};

Blockly.JavaScript['firmata_digitalread'] = function(block) {
  var value_digitalpin = Blockly.JavaScript.valueToCode(block, 'digitalPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '0 /*Block not supported in JavaScript*/';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['firmata_serial'] = function(block) {
  var text_port = block.getFieldValue('port');
  var dropdown_baudrate = block.getFieldValue('baudrate');
  // TODO: Assemble JavaScript into code variable.
  // var arguments = '-b '+dropdown_baudrate;
  // if (text_port!='auto') arguments += ' -p '+text_port;
  // var code = 'require ("child_process").exec (\'ino serial '+arguments+'\');';
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '// Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_set_rgb_led'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var arguments = '-b '+dropdown_baudrate;
  // if (text_port!='auto') arguments += ' -p '+text_port;
  // var code = 'require ("child_process").exec (\'ino serial '+arguments+'\');';
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '// Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_set_fine_rgb_led'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  // var arguments = '-b '+dropdown_baudrate;
  // if (text_port!='auto') arguments += ' -p '+text_port;
  // var code = 'require ("child_process").exec (\'ino serial '+arguments+'\');';
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '// Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_analogread'] = function(block) {
  var value_analogpin = Blockly.JavaScript.valueToCode(block, 'analogPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '0 /*Block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['firmata_analogwrite'] = function(block) {
  var value_analogvalue = Blockly.JavaScript.valueToCode(block, 'analogValue', Blockly.JavaScript.ORDER_ATOMIC);
  var value_analogpin = Blockly.JavaScript.valueToCode(block, 'analogPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '//Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_servo'] = function(block) {
  //var value_analogvalue = Blockly.JavaScript.valueToCode(block, 'analogValue', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_analogpin = Blockly.JavaScript.valueToCode(block, 'analogPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '//Block not supported in JavaScript\n';
  return code;
};