
Blockly.Python.mobile = function (value_id)
{
  if (!Blockly.Python.definitions_ ['mobile_signals_'+value_id])
  {
    if (!Blockly.Python.mobile_sensor)
    {
      Blockly.Python.mobile_sensor = {};
    }
    Blockly.Python.mobile_sensor[value_id] = Blockly.Python.variableDB_.getDistinctName('mobile_sensor', Blockly.Generator.NAME_TYPE);
    var function_name = Blockly.Python.variableDB_.getDistinctName('mobile_sensor_function_'+value_id, Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_ ['mobile_signals_'+value_id] = Blockly.Python.mobile_sensor[value_id]+" = {}\n"+
        "def "+function_name+"(__sender, __channel, __error, __message):\n"+
              "  global "+Blockly.Python.mobile_sensor[value_id]+"\n"+
              "  jsonValues = json.loads(__message)\n"+
              "  for key in jsonValues:\n"+
              "    if key in "+Blockly.Python.mobile_sensor[value_id]+":\n"+
              "      "+Blockly.Python.mobile_sensor[value_id]+"[key](jsonValues[key])\n"+
              "openConnection(\"mobile:\"+"+value_id+", "+function_name+")\n";
  }
};

Blockly.Python['sensors_mobile'] = function(block) {
  Blockly.Python.wiringpi();
  Blockly.Python.importJson();
  var value_id = Blockly.Python.valueToCode(block, 'from_id', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.mobile (value_id);
  var statements_commands = Blockly.Python.statementToCode(block, 'commands');
  var value_sensorvalue = Blockly.Python.valueToCode(block, 'sensorvalue', Blockly.Python.ORDER_ATOMIC);
  var value_sensor = block.getFieldValue ('sensor');
  // TODO: Assemble Python into code variable.
  var function_name = Blockly.Python.variableDB_.getDistinctName('mobile_sensor_'+value_sensor, Blockly.Generator.NAME_TYPE);
  var code = "";
  if(statements_commands != "")
  {
    var globals = Blockly.Variables.allVariables(block);
    for (var i=0; i<globals.length; i++)
    {
      globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
    }
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
    var code = "def "+function_name+"(jsonValues):\n"+
              globals+
              "  "+value_sensorvalue+" = jsonValues\n"+
              statements_commands+
              Blockly.Python.mobile_sensor[value_id]+"[\""+value_sensor+"\"] = "+function_name+"\n";
  }
  return code;
};