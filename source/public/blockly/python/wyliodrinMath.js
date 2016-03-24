Blockly.Python.mapS = function ()
{
  Blockly.Python.wiringpi();
}

Blockly.Python['truncate'] = function(block) {
  var value_truncate = Blockly.Python.valueToCode(block, 'truncate', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'int('+value_truncate+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['map_block'] = function(block) {
	Blockly.Python.mapS();
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var value_from_low = Blockly.Python.valueToCode(block, 'from_low', Blockly.Python.ORDER_ATOMIC);
  var value_to_low = Blockly.Python.valueToCode(block, 'to_low', Blockly.Python.ORDER_ATOMIC);
  var value_from_high = Blockly.Python.valueToCode(block, 'from_high', Blockly.Python.ORDER_ATOMIC);
  var value_to_high = Blockly.Python.valueToCode(block, 'to_high', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'map('+value_value+', '+value_from_low+', '+value_from_high+', '+value_to_low+', '+value_to_high+')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['kelvintocelsius'] = function(block) {
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_degrees+'-273.15';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fahrenheittocelsius'] = function(block) {
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '('+value_degrees+'-32)/1.8';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['celsiustokelvin'] = function(block) {
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_degrees+'+273.15';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['celsiustofahrenheit'] = function(block) {
  var value_degrees = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '('+value_degrees+'*1.8)+32';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};