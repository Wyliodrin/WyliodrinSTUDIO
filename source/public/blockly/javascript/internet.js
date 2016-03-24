Blockly.JavaScript['weather_init'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Weather');
  var code = '0 /*Block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['weather_main'] = function(block) {
  var dropdown_weatherparam = block.getFieldValue('weatherParam');
  var value_city = Blockly.JavaScript.valueToCode(block, 'city', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Weather');
  var code = '0 /*Block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['weather_coord'] = function(block) {
  var dropdown_weatherparam = block.getFieldValue('weatherParam');
  var value_lat = Blockly.JavaScript.valueToCode(block, 'lat', Blockly.JavaScript.ORDER_ATOMIC);
  var value_lon = Blockly.JavaScript.valueToCode(block, 'lon', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Weather');
  var code = '0 /*Block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};