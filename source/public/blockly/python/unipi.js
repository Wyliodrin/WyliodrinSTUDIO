
Blockly.Python.unipiSetup = function ()
{
	Blockly.Python.wiringpi();
  if (!Blockly.Python.definitions_['unipi'])
  {
    Blockly.Python.definitions_['unipi'] = 'unipiSetup ()\n';
  }
  };

Blockly.Python['unipi_power'] = function(block) {
  Blockly.Python.unipiSetup();
  var value_relnr = Blockly.Python.valueToCode(block, 'relNr', Blockly.Python.ORDER_ATOMIC);
  var dropdown_v = block.getFieldValue('v');
  // TODO: Assemble Python into code variable.
  var code = 'unipiRelay('+value_relnr+','+dropdown_v+');';
  return code;
};
Blockly.Python['unipi_analogRead'] = function(block) {
  Blockly.Python.unipiSetup();
  var dropdown_pin = block.getFieldValue('pin');
  // TODO: Assemble Python into code variable.
  var code = 'unipiAnalogRead('+dropdown_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['unipi_digitalRead'] = function(block) {
  Blockly.Python.unipiSetup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'unipiDigitalRead('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['unipi_analogWrite'] = function(block) {
  Blockly.Python.unipiSetup();
  var value_val = Blockly.Python.valueToCode(block, 'val', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'unipiAnalogWrite('+value_val+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};