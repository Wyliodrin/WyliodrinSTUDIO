Blockly.JavaScript['spark_init'] = function(block) {
  var value_id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_ATOMIC);
  var value_token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '//Spark block not supported in JavaScript';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_digitalread'] = function(block) {
  // var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '0 /*Spark block not supported in JavaScript*/';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_digitalwrite'] = function(block) {
  // var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  //var dropdown_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '//Spark block not supported in JavaScript';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_analogread'] = function(block) {
  // var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '0 /*Spark block not supported in JavaScript*/';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_analogwrite'] = function(block) {
  // var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  //var dropdown_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '//Spark block not supported in JavaScript';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_getvar'] = function(block) {
  var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_device = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('device'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = 'null /*Spark block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['spark_digitalwriteVal'] = function(block) {
  // var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  //var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  //var dropdown_value = block.getFieldValue('value');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = '//Spark block not supported in JavaScript';
  return code;
};

// Doru

Blockly.JavaScript['spark_getfunc'] = function(block) {
  //var value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  // var variable_device = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('device'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Spark');
  var code = 'null /*Spark block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};