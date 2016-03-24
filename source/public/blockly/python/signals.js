Blockly.Python['send_signals'] = function(block) {
  Blockly.Python.wiringpi()
  var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
  var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sendSignal('+value_value_signal+', '+value_value_value+')\n';
  return code;
};

Blockly.Python['signal_sendanddebug'] = function(block) {
  Blockly.Python.wiringpi();
  var value_signal_text = Blockly.Python.valueToCode(block, 'signal_text', Blockly.Python.ORDER_ATOMIC);
  var value_signal_value = Blockly.Python.valueToCode(block, 'signal_value', Blockly.Python.ORDER_ATOMIC);
  var value_debug_text = Blockly.Python.valueToCode(block, 'debug_text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sendSignalAndFlag('+value_debug_text+', '+value_signal_text+', '+value_signal_value+')\n';
  return code;
};

Blockly.Python['signal_putflag'] = function(block) {
  Blockly.Python.wiringpi();
  var value_signal_text = Blockly.Python.valueToCode(block, 'signal_text', Blockly.Python.ORDER_ATOMIC);
  var value_debug_text = Blockly.Python.valueToCode(block, 'flag_text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'putFlag('+value_signal_text+', '+value_debug_text+')\n';
  return code;
};

Blockly.Python['signal_receivesignal'] = function(block) {
  Blockly.Python.wiringpi();
  Blockly.Python.importJson();
  var value_signal = Blockly.Python.valueToCode(block, 'signal', Blockly.Python.ORDER_ATOMIC);
  var value_signalvalue = Blockly.Python.valueToCode(block, 'signalvalue', Blockly.Python.ORDER_ATOMIC);
  var statements_commands = Blockly.Python.statementToCode(block, 'commands');
  // TODO: Assemble Python into code variable.
  var function_name = Blockly.Python.variableDB_.getDistinctName('myFunction', Blockly.Generator.NAME_TYPE);
  var code = "";
  if(statements_commands != "")
  {
    var globals = Blockly.Variables.allVariables(block);
    for (var i=0; i<globals.length; i++)
    {
      globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
    }
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
    var code = "def "+function_name+"(__sender, __channel, __error, __message):\n"+
              globals+
              "  "+value_signalvalue+" = int(json.loads(__message))\n"+
              statements_commands+"\n"+
             "openConnection(\"signal:\""+" + "+value_signal+", "+function_name+")\n";
  }
  return code;
};


Blockly.Python['sendsignals'] = function(block) {
  Blockly.Python.wiringpi();
  var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
  var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'sendSignalsList ('+value_value_signal+', '+
          value_value_value+', min(len('+value_value_signal+'), len('+
          value_value_value+')))\n';
  return code;
};

Blockly.Python['sendsignalsandflag'] = function(block) {
  Blockly.Python.wiringpi();
  var value_value_signal = Blockly.Python.valueToCode(block, 'value_signal', Blockly.Python.ORDER_ATOMIC);
  var value_value_value = Blockly.Python.valueToCode(block, 'value_value', Blockly.Python.ORDER_ATOMIC);
  var flag = Blockly.Python.valueToCode(block, 'debug_text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'sendSignalsListAndFlag ('+flag+', '+value_value_signal+', '+
          value_value_value+', min(len('+value_value_signal+'), len('+
          value_value_value+')))\n';
  return code;
};

Blockly.Python['sendcoord'] = function(block) {
  Blockly.Python.wiringpi();
  var value_name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);
  var value_latitudine = Blockly.Python.valueToCode(block, 'latitudine', Blockly.Python.ORDER_ATOMIC);
  var value_longitudine = Blockly.Python.valueToCode(block, 'longitudine', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sendCoordinates('+value_name+', '+value_latitudine+', '+value_longitudine+')\n';
  return code;
};

Blockly.Python['sendcoordandflag'] = function(block) {
  Blockly.Python.wiringpi();
  var value_name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);
  var value_latitudine = Blockly.Python.valueToCode(block, 'latitudine', Blockly.Python.ORDER_ATOMIC);
  var value_longitudine = Blockly.Python.valueToCode(block, 'longitudine', Blockly.Python.ORDER_ATOMIC);
  var value_flag = Blockly.Python.valueToCode(block, 'flag', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'sendCoordinatesAndFlag('+value_name+', '+value_latitudine+', '+value_longitudine+', '+value_flag+')\n';
  return code;
};