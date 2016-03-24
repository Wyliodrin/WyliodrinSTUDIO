Blockly.JavaScript['rp_analogwrite'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['rp_analogwritevoltage'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogWriteVoltage ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['rp_analogwriteraw'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogWriteRaw ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['rp_analogread'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_analogreadvoltage'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogReadVoltage ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_analogreadraw'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogReadRaw ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_analogread_shield'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_analogreadvoltage_shield'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogReadVoltage ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_analogreadraw_shield'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogReadRaw ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rp_set_led'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = block.getFieldValue('pin');
  var value_value = block.getFieldValue('state');
  var code = "";
  if (!Blockly.JavaScript.setpinmode (value_pin, 1))
  {
    code = Blockly.JavaScript.wyliodrin+".pinMode ("+value_pin+", 1);\n";
  }
  // TODO: Assemble Python into code variable.
  code = code + Blockly.JavaScript.wyliodrin+'.digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['rp_pinmode'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mode = block.getFieldValue('mode');
  if (parseInt (value_pin) != NaN)
  {
    if (Blockly.JavaScript.definitions_['pin_mode_in_'+value_pin]) delete Blockly.JavaScript.definitions_['pin_mode_in_'+value_pin];
    if (Blockly.JavaScript.definitions_['pin_mode_out_'+value_pin]) delete Blockly.JavaScript.definitions_['pin_mode_out_'+value_pin];
  }
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.pinMode ('+value_pin+', '+value_mode+');\n';
  return code;
};

Blockly.JavaScript['rp_digitalwrite'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  // console.log ('value_pin '+value_pin);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['rp_digitalread'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
