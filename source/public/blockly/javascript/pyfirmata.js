Blockly.JavaScript.firmataPinMode = function (pinNumber, pinMode)
{
  if(!Blockly.JavaScript.definitions_['firmata_pin_mode_'+pinNumber])
  {
    Blockly.JavaScript.definitions_['firmata_pin_mode_'+pinNumber] = 
    'firmata.pinMode ('+pinNumber+', '+pinMode+');\n';
  }
}

Blockly.JavaScript.firmataConnect = function (port)
{
  if (!Blockly.JavaScript.definitions_['firmata_connect'])
  {
    var firmataVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'firmata', Blockly.Variables.NAME_TYPE);
    Blockly.JavaScript.definitions_['firmata_connect'] =
    'var '+firmataVar+'= require (\'firmata\');\n'+ 
    'firmata.connect ('+port+');\n';
  }
}
Blockly.JavaScript['firmata_init'] = function(block) {
  var dropdown_board = block.getFieldValue('board');
  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.firmataConnect (value_port);
  var code = '';
  return code;
};

Blockly.JavaScript['firmata_digitalwrite'] = function(block) {
  var dropdown_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_digitalpin = Blockly.JavaScript.valueToCode(block, 'digitalPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.firmataPinMode (value_digitalpin, 1);
  var code = 'firmata.digitalWrite ('+value_digitalpin+', '+dropdown_value+');\n';
  return code;
};

Blockly.JavaScript['firmata_digitalread'] = function(block) {
  var value_digitalpin = Blockly.JavaScript.valueToCode(block, 'digitalPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.firmataPinMode (value_digitalpin, 0);
  var code = 'firmata.digitalRead ('+value_digitalpin+')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['firmata_serial'] = function(block) {
  var text_port = block.getFieldValue('port');
  var dropdown_baudrate = block.getFieldValue('baudrate');
  // TODO: Assemble JavaScript into code variable.
  // var arguments = '-b '+dropdown_baudrate;
  // if (text_port!='auto') arguments += ' -p '+text_port;
  // var code = 'require ("child_process").exec (\'ino serial '+arguments+'\');';
  Blockly.JavaScript.NoSupportFor ('Arduino');
  var code = '// Block not supported in JavaScript\n';
  return code;
};

Blockly.JavaScript['firmata_set_rgb_led'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var value_red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.colors ();
  Blockly.JavaScript.firmataPinMode (value_red, 1);
  Blockly.JavaScript.firmataPinMode (value_green, 1);
  Blockly.JavaScript.firmataPinMode (value_blue, 1);
  var colorVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = 'var '+colorVar + ' = colorToRGB ('+value_color+');\n'+
            'firmata.digitalWrite ('+value_red+', '+colorVar+'[0]);\n'+
            'firmata.digitalWrite ('+value_green+', '+colorVar+'[1]);\n'+
            'firmata.digitalWrite ('+value_blue+', '+colorVar+'[2]);\n';
  return code;
};

Blockly.JavaScript['firmata_set_fine_rgb_led'] = function(block) {
 var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var value_red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_ATOMIC);
  var value_green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.colors ();
  Blockly.JavaScript.firmataPinMode (value_red, 1);
  Blockly.JavaScript.firmataPinMode (value_green, 1);
  Blockly.JavaScript.firmataPinMode (value_blue, 1);
  var colorVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = 'var '+colorVar + ' = colorToRGB ('+value_color+');\n'+
            'firmata.digitalWrite ('+value_red+', '+colorVar+'[0]/255);\n'+
            'firmata.digitalWrite ('+value_green+', '+colorVar+'[1]/255);\n'+
            'firmata.digitalWrite ('+value_blue+', '+colorVar+'[2]/255);\n';
  return code;
};

Blockly.JavaScript['firmata_analogread'] = function(block) {
  var value_analogpin = Blockly.JavaScript.valueToCode(block, 'analogPin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'firmata.analogRead ('+value_analogpin+')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['firmata_analogwrite'] = function(block) {
  var value_analogvalue = Blockly.JavaScript.valueToCode(block, 'analogValue', Blockly.JavaScript.ORDER_ATOMIC);
  var value_analogpin = Blockly.JavaScript.valueToCode(block, 'analogPin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.firmataPinMode (value_analogpin, 1);
  var code = 'firmata.analogWrite ('+value_analogpin+', '+value_analogvalue+');\n';
  return code;
};

Blockly.JavaScript['firmata_servo'] = function(block) {
  var value_analogvalue = Blockly.Python.valueToCode(block, 'value_servo', Blockly.Python.ORDER_ATOMIC);
  var value_analogpin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.JavaScript.firmataPinMode (value_analogpin, 1);
  var code = 'firmata.servoWrite ('+value_analogpin+', '+value_analogvalue+');\n';
  return code;
};