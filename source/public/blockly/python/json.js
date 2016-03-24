"use strict";

Blockly.Python['json_key'] = function(block) {
  var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
  var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_json+'['+value_key+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['json_index'] = function(block) {
  var value_index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);
  var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_json+'['+value_index+']';;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['json_items'] = function(block) {
  var value_json = Blockly.Python.valueToCode(block, 'JSON', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'len('+value_json+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Doru

Blockly.Python.spark_getFunc = function()
{
  if(!Blockly.Python.definitions_['spark_getFunc_function'])
  {
    Blockly.Python.definitions_['spark_getFunc_function'] = "def sparkfunc(id, token, funcname, string_parameter):\n"+
            "  params = {\"access_token\" : token, \"args\" : string_parameter}\n" +
            "  response = requests.post(\"https://api.spark.io/v1/devices/\"+id+\"/\"+funcname, data = params)" +
            "  data = response.text()\n"+
            "  try:\n"+
            "    return int(json.loads(data)[\"return_value\"])\n"+ 
            "  except:\n"+
            "    print 'There was an error calling the function. The data return from spark core API is: '+data\n";
  }
}

Blockly.Python.import_requests = function()
{
  if(!Blockly.Python.definitions_['requests'])
  {
    Blockly.Python.definitions_['requests'] = 'import requests'
  }
}


Blockly.Python['spark_getFunc'] = function(block) {
  var value_func = Blockly.Python.valueToCode(block, 'func', Blockly.Python.ORDER_ATOMIC);
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('device'), Blockly.Variables.NAME_TYPE);
  var value_sentvalue = Blockly.Python.valueToCode(block, 'sentvalue', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.import_requests();
  Blockly.Python.importJson();
  Blockly.Python.spark_getFunc();
  // TODO: Assemble Python into code variable.
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // TODO: Change ORDER_NONE to the correct strength.
  code = "sparkfunc(" +variable_device+ "[0], " + variable_device + "[1], " +value_variable+ ", " + value_sentvalue + "))";
  return [code, Blockly.Python.ORDER_NONE];
};


