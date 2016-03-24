Blockly.JavaScript.unipiSetup = function ()
{
  Blockly.JavaScript.wiringpi();
  Blockly.JavaScript.function_init ('unipi', Blockly.JavaScript.wyliodrin+'.unipiSetup();');
  console.log (Blockly.JavaScript.wyliodrin);
}

Blockly.JavaScript['unipi_power'] = function(block) {
  Blockly.JavaScript.unipiSetup();
  console.log ('jsw: '+Blockly.JavaScript.wyliodrin);
  var value_relnr = Blockly.JavaScript.valueToCode(block, 'relNr', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_v = block.getFieldValue('v');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.unipiRelay('+value_relnr+','+dropdown_v+')\n';
  return code;
};
Blockly.JavaScript['unipi_analogRead'] = function(block) {
  Blockly.JavaScript.unipiSetup();
   var dropdown_pin = block.getFieldValue('pin');;
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.unipiAnalogRead('+dropdown_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['unipi_digitalRead'] = function(block) {
  Blockly.JavaScript.unipiSetup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.unipiDigitalRead('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['unipi_analogWrite'] = function(block) {
  Blockly.JavaScript.unipiSetup();
  var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.unipiAnalogWrite('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};