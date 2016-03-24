
Blockly.JavaScript['visual_singleton'] = function(block) {
  var value_var = Blockly.JavaScript.valueToCode(block, 'var', Blockly.JavaScript.ORDER_ATOMIC);
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'if (!context["'+value_var+'"])\n'+
              '{\n'+
              '  context["'+value_var+'"]='+value_val+';\n'+
              '}\n'+
              value_var+'=context["'+value_var+'"]\n';
  return code;
};

Blockly.JavaScript['visual_msg'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'msg';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['visual_msg_payload'] = function(block) {
  var value_payload = Blockly.JavaScript.valueToCode(block, 'payload', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'msg['+value_payload+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['visual_ret'] = function(block) {
  var value_msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'return '+value_msg+';\n';
  return code;
};

Blockly.JavaScript['visual_msg_set'] = function(block) {
  var value_payload = Blockly.JavaScript.valueToCode(block, 'payload', Blockly.JavaScript.ORDER_ATOMIC);
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'msg['+value_payload+']='+value_val+';\n';
  return code;
};

Blockly.JavaScript['visual_context'] = function(block) {
  var text_val = block.getFieldValue('val');
  // TODO: Assemble JavaScript into code variable.
  var code = 'context["'+text_val+'"]';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['visual_context_value'] = function(block) {
  var text_val = block.getFieldValue('val');
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'context["'+text_val+'"]='+value_val+';\n';
  return code;
};

Blockly.JavaScript['visual_new_message'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '{}';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['visual_set_message'] = function(block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var value_payload = Blockly.JavaScript.valueToCode(block, 'payload', Blockly.JavaScript.ORDER_ATOMIC);
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_message+'['+value_payload+']='+value_val+';\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.JavaScript['visual_message_value'] = function(block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var value_payload = Blockly.JavaScript.valueToCode(block, 'payload', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_message+'['+value_payload+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


