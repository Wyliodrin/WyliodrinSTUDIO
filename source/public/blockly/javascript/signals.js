Blockly.JavaScript['send_signals'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_value_signal = Blockly.JavaScript.valueToCode(block, 'value_signal', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_value = Blockly.JavaScript.valueToCode(block, 'value_value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendSignal('+value_value_signal+', '+value_value_value+');\n';
  return code;
};


Blockly.JavaScript['sendsignals'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_value_signal = Blockly.JavaScript.valueToCode(block, 'value_signal', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_value = Blockly.JavaScript.valueToCode(block, 'value_value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendSignalsList ('+value_value_signal+', '+
          value_value_value+', Math.min(counts('+value_value_signal+'), counts('+
          value_value_value+')));\n';
  return code;
};

Blockly.JavaScript['signal_receivesignal'] = function(block) {
//  var value_label = Blockly.JavaScript.valueToCode(block, 'label', Blockly.JavaScript.ORDER_ATOMIC);
  //var statements_commands = Blockly.JavaScript.statementToCode(block, 'commands');
  // TODO: Assemble JavaScript into code variable.
  var code = '//Receiveing signal not supported in javascript\n';
  Blockly.JavaScript.NoSupportFor('signal_receivesignal');
  return code;
};

Blockly.JavaScript['sendsignalsandflag'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_value_signal = Blockly.JavaScript.valueToCode(block, 'value_signal', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_value = Blockly.JavaScript.valueToCode(block, 'value_value', Blockly.JavaScript.ORDER_ATOMIC);
  var flag = Blockly.JavaScript.valueToCode(block, 'debug_text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendSignalsListAndFlag ('+flag+', '+value_value_signal+', '+
          value_value_value+', Math.min(counts('+value_value_signal+'), counts('+
          value_value_value+')));\n';
  return code;
};

Blockly.JavaScript['signal_sendanddebug'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_signal_text = Blockly.JavaScript.valueToCode(block, 'signal_text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_signal_value = Blockly.JavaScript.valueToCode(block, 'signal_value', Blockly.JavaScript.ORDER_ATOMIC);
  var value_debug_text = Blockly.JavaScript.valueToCode(block, 'debug_text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendSignalAndFlag('+value_debug_text+', '+value_signal_text+', '+value_signal_value+');\n';
  return code;
};

Blockly.JavaScript['signal_putflag'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_signal_text = Blockly.JavaScript.valueToCode(block, 'signal_text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_debug_text = Blockly.JavaScript.valueToCode(block, 'flag_text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.putFlag('+value_signal_text+', '+value_debug_text+');\n';
  return code;
};

Blockly.JavaScript['sendcoord'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_latitudine = Blockly.JavaScript.valueToCode(block, 'latitudine', Blockly.JavaScript.ORDER_ATOMIC);
  var value_longitudine = Blockly.JavaScript.valueToCode(block, 'longitudine', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendCoordinates('+value_name+', '+value_latitudine+', '+value_longitudine+');\n';
  return code;
};

Blockly.JavaScript['sendcoordandflag'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_latitudine = Blockly.JavaScript.valueToCode(block, 'latitudine', Blockly.JavaScript.ORDER_ATOMIC);
  var value_longitudine = Blockly.JavaScript.valueToCode(block, 'longitudine', Blockly.JavaScript.ORDER_ATOMIC);
  var value_flag = Blockly.JavaScript.valueToCode(block, 'flag', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendCoordinatesAndFlag('+value_name+', '+value_latitudine+', '+value_longitudine+', '+value_flag+');\n';
  return code;
};