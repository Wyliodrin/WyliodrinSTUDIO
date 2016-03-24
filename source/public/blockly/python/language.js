Blockly.Python['language_encode'] = function(block) {
  var value = block.getFieldValue('value');
  // TODO: Assemble Python into code variable.
  Blockly.Python.encode = value;
  var code = '\n';
  return code;
};

Blockly.Python['language_line'] = function(block) {
  var text_line = block.getFieldValue('line');
  // TODO: Assemble Python into code variable.
  var code = text_line+'\n';
  return code;
};

Blockly.Python['language_line_return'] = function(block) {
  var text_line = block.getFieldValue('line');
  // TODO: Assemble Python into code variable.
  var code = text_line;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

