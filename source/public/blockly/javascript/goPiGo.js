"use strict"

Blockly.JavaScript.goPiGo_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsgopigo'])
    {
      
      Blockly.JavaScript.gopigo_import= Blockly.JavaScript.import('jsgopigo', 'jsgopigo');
              
    }

};

Blockly.JavaScript['gopigo_direction'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble JavaScript into code variable.
    Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code = '// GoPiGo is not supported in JavaScript';
  return code;
};



Blockly.JavaScript['gopigo_stop'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code = '// GoPiGo is not supported in JavaScript';
  return code;
};

Blockly.JavaScript['gopigo_increase_speed'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code = '// GoPiGo is not supported in JavaScript';
  return code;
};

Blockly.JavaScript['gopigo_decrease_speed'] = function(block) {
  // TODO: Assemble JavaScript deto code variable.
  Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code = '// GoPiGo is not supported in JavaScript';
  return code;
};

Blockly.JavaScript['gopigo_volt'] = function(block) {
  
 // TODO: Assemble JavaScript deto code variable.
 Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code =  '// GoPiGo is not supported in JavaScript';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['gopigo_motor_direction'] = function(block) {
  //var value_gopigo = Blockly.JavaScript.valueToCode(block, 'gopigo', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_motor_direction = block.getFieldValue('motor_direction');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('GoPiGo');
  var code = '// GoPiGo is not supported in JavaScript';
  return code;
};
Blockly.JavaScript['gopigo_led'] = function(block) {
  var dropdown_led = block.getFieldValue('led');
  // TODO: Assemble JavaScript into code variable.
  var code =  '// GoPiGo is not supported in JavaScript';
  return code;
};
Blockly.JavaScript['gopigo_enc_tgt'] = function(block) {
  //var value_gopigo = Blockly.JavaScript.valueToCode(block, 'gopigo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript deto code variable.
  //Blockly.JavaScript.NoSupportFor ('GoPiGo');
  //var code = '// GoPiGo is not supported in JavaScript';
  // TODO: Change ORDER_NONE to the correct strength.
  //return code;
};