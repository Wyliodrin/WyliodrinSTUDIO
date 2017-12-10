"use strict"

Blockly.Python.goPiGo_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pygopigo'])
  {
    Blockly.Python.my_gopigo_import= Blockly.Python.variableDB_.getDistinctName('gopigo', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pygopigo'] = "import gopigo as "+Blockly.Python.my_gopigo_import+"\n";
  }
};



Blockly.Python['gopigo_direction'] = function(block) {
  Blockly.Python.goPiGo_setup();
  var dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.'+dropdown_direction+'()\n';
  return code;
};

Blockly.Python['gopigo_stop'] = function(block) {
    Blockly.Python.goPiGo_setup();
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.stop()\n';
  return code;
};
Blockly.Python['gopigo_increase_speed'] = function(block) {
  Blockly.Python.goPiGo_setup();
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.increase_speed()\n';
  return code;
};
Blockly.Python['gopigo_decrease_speed'] = function(block) {
  Blockly.Python.goPiGo_setup();
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.decrease_speed()\n';
  return code;
};
Blockly.Python['gopigo_volt'] = function(block) {
  Blockly.Python.goPiGo_setup();
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.volt()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gopigo_motor_direction'] = function(block) {
  Blockly.Python.goPiGo_setup();
  var dropdown_direction = block.getFieldValue('motor_direction');
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_gopigo_import+'.'+dropdown_direction+'()\n';
  return code;
};

Blockly.Python['gopigo_led'] = function(block) {
    Blockly.Python.goPiGo_setup();
  var dropdown_led = block.getFieldValue('led');
  var dropdown_value = block.getFieldValue('value');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_gopigo_import+'.led('+dropdown_led+','+dropdown_value+')\n'
  return code;
};

Blockly.Python['gopigo_enc_tgt'] = function(block) {
  // TODO: Assemble Python into code variable.
};