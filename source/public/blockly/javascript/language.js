Blockly.JavaScript['language_line'] = function(block) {
  var text_line = block.getFieldValue('line');
  // TODO: Assemble JavaScript into code variable.
  var code = text_line+'\n';
  return code;
};

Blockly.JavaScript['language_encode'] = function(block) {
  var value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Encode');
  var code = '// encode is not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['language_line_return'] = function(block) {
  var text_line = block.getFieldValue('line');
  // TODO: Assemble JavaScript into code variable.
  var code = text_line;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

