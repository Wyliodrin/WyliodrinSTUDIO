Blockly.Python['rp_analogwrite'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'analogWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.Python['rp_analogwritevoltage'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'analogWriteVoltage ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.Python['rp_analogwriteraw'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'analogWriteRaw ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.Python['rp_analogread'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_analogreadvoltage'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogReadVoltage ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_analogreadraw'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogReadRaw ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_analogread_shield'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_analogreadvoltage_shield'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogReadVoltage ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_analogreadraw_shield'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogReadRaw ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rp_set_led'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = block.getFieldValue('pin');
  var value_value = block.getFieldValue('state');
  var code = "";
  if (!Blockly.Python.setpinmode (value_pin, 1))
  {
    code = "pinMode ("+value_pin+", 1);\n";
  }
  // TODO: Assemble Python into code variable.
  code = code + 'digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.Python['rp_pinmode'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_mode = block.getFieldValue('mode');
  if (parseInt (value_pin) != NaN)
  {
    if (Blockly.Python.definitions_['pin_mode_in_'+value_pin]) delete Blockly.Python.definitions_['pin_mode_in_'+value_pin];
    if (Blockly.Python.definitions_['pin_mode_out_'+value_pin]) delete Blockly.Python.definitions_['pin_mode_out_'+value_pin];
  }
  // TODO: Assemble Python into code variable.
  var code = 'pinMode ('+value_pin+', '+value_mode+');\n';
  return code;
};

Blockly.Python['rp_digitalwrite'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.Python['rp_digitalread'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code ='digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
