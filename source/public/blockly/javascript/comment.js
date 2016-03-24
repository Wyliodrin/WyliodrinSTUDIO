Blockly.JavaScript['comment'] = function(block) {
  var text_comment_value = block.getFieldValue('comment_value');
  // TODO: Assemble JavaScript into code variable.
  var code = '//'+text_comment_value+"\n";
  return code;
};