Blockly.Python.import_urllib = function()
{
  if(!Blockly.Python.definitions_['urllib'])
  {
    Blockly.Python.definitions_['urllib'] = 'import urllib'
  }
}



Blockly.Python.spark_read = function()
{
  if(!Blockly.Python.definitions_['spark_read_function'])
  {
    Blockly.Python.definitions_['spark_read_function'] = "def sparkRead(id, token, pin):\n"+
                                                          "  params = urllib.urlencode({'access_token':token,'params':pin})\n"+
            "  response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/digitalread\", params)\n"+
            "  data = response.read()\n"+
            "  try:\n"+
            "    return int(json.loads(data)[\"return_value\"])\n"+ 
            "  except:\n"+
            "    print 'There was an error, the data return from spark is: '+data\n";
  }
}

Blockly.Python.spark_write = function()
{
  if(!Blockly.Python.definitions_['spark_write_function'])
  {
    Blockly.Python.definitions_['spark_write_function'] = "def sparkWrite(id, token, pin, value):\n"+
                                                          "  params = urllib.urlencode({'access_token':token,'params':pin+\",\"+value})\n"+
            "  response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/digitalwrite\",params)\n"+
            "  print response\n" ;
  }
}

Blockly.Python.spark_writeI = function()
{
  if(!Blockly.Python.definitions_['spark_iwrite_function'])
  {
    Blockly.Python.definitions_['spark_iwrite_function'] = "def sparkIWrite(id, token, pin, value):\n"+
                                                          "  if value == 0:\n"+
                                                          "    params = urllib.urlencode({'access_token':token,'params':pin+\",LOW\"})\n"+
                                                          "  else:\n"+
                                                          "    params = urllib.urlencode({'access_token':token,'params':pin+\",HIGH\"})\n"+
            "  response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/digitalwrite\",params)\n"+
            "  print response\n" ;
  }
}

Blockly.Python.spark_aread = function()
{
  if(!Blockly.Python.definitions_['spark_aread_function'])
  {
    Blockly.Python.definitions_['spark_aread_function'] = "def sparkAnalogRead(id, token, pin):\n"+
                                                          "  params = urllib.urlencode({'access_token':token,'params':pin})\n"+
            "  response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/analogread\",params)\n"+
            "  data = response.read()\n"+
            "  try:\n"+
            "    return int(json.loads(data)[\"return_value\"])\n"+ 
            "  except:\n"+
            "    print 'There was an error, the data return from spark is: '+data\n";
  }
}

Blockly.Python.spark_awrite = function()
{
  if(!Blockly.Python.definitions_['spark_awrite_function'])
  {
    Blockly.Python.definitions_['spark_awrite_function'] = "def sparkAnalogWrite(id, token, pin, value):\n"+
                                                          "  params = urllib.urlencode({'access_token':token,'params':pin+\",\"+value})\n  "+
            "response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/analogwrite\",params)\n" ;
  }
}

Blockly.Python.spark_getVar = function()
{
  if(!Blockly.Python.definitions_['spark_getVar_function'])
  {;
    Blockly.Python.definitions_['spark_getVar_function'] = "def sparkGetVar(id, token, sparkVariable):\n"+
            "  response = urllib.urlopen(\"https://api.spark.io/v1/devices/\"+id+\"/\"+sparkVariable+\"?access_token=\"+token)\n"+
            "  data = response.read()\n"+
            "  try:\n"+
            "    return int(json.loads(data)[\"result\"])\n"+ 
            "  except:\n"+
            "    print 'There was an error, the data return from spark is: '+data\n";
  }
}

Blockly.Python['spark_init'] = function(block) {
  var value_id = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_ATOMIC);
  var value_token = Blockly.Python.valueToCode(block, 'TOKEN', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.import_urllib();
  var code = "["+value_id+", "+value_token+"]\n";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['spark_digitalread'] = function(block) {
  var value_pin = block.getFieldValue("pin");
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('spark_device'), Blockly.Variables.NAME_TYPE);
  Blockly.Python.spark_read();
  Blockly.Python.importJson();
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // // TODO: Assemble Python into code variable.
  var code = "sparkRead("+variable_device+"[0], "+variable_device+"[1], "+value_pin+")";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['spark_digitalwrite'] = function(block) {
  var value_pin = block.getFieldValue("pin");
  var dropdown_value = block.getFieldValue('value');
   var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('spark_device'), Blockly.Variables.NAME_TYPE);
  Blockly.Python.import_urllib();
  Blockly.Python.spark_write();
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // TODO: Assemble Python into code variable.
  code = "sparkWrite("+variable_device+"[0], "+variable_device+"[1], "+value_pin+", "+dropdown_value+")\n";
  return code;
};

Blockly.Python['spark_analogread'] = function(block) {
  var value_pin = block.getFieldValue("pin");
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('spark_device'), Blockly.Variables.NAME_TYPE);
  Blockly.Python.spark_aread();
  Blockly.Python.importJson();
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // // TODO: Assemble Python into code variable.
  var code = "sparkAnalogRead("+variable_device+"[0], "+variable_device+"[1], "+value_pin+")";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['spark_analogwrite'] = function(block) {
  var value_pin = block.getFieldValue("pin");
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('spark_device'), Blockly.Variables.NAME_TYPE);
  Blockly.Python.import_urllib();
  Blockly.Python.spark_awrite();
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // TODO: Assemble Python into code variable.
  code = "sparkAnalogWrite("+variable_device+"[0], "+variable_device+"[1], "+value_pin+", str("+value_value+"))\n";
  return code;
};

Blockly.Python['spark_getvar'] = function(block) {
  var value_variable = Blockly.Python.valueToCode(block, 'variable', Blockly.Python.ORDER_ATOMIC);
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('device'), Blockly.Variables.NAME_TYPE);
  var value_type = block.getFieldValue('type');
  Blockly.Python.importJson();
  Blockly.Python.spark_getVar();
  // TODO: Assemble Python into code variable.
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // TODO: Change ORDER_NONE to the correct strength.
  code = value_type+"(sparkGetVar("+variable_device+"[0], "+variable_device+"[1], "+value_variable+"))";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['spark_digitalwriteVal'] = function(block) {
  var value_pin = block.getFieldValue("pin");
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('spark_device'), Blockly.Variables.NAME_TYPE);
  Blockly.Python.import_urllib();
  Blockly.Python.spark_writeI();
  var code;
  if(!Blockly.Python.sparkId)
  {
    code = "\#Init Spark block must be used first.\nprint('Init Spark block not used')\n";
  }
  // TODO: Assemble Python into code variable.
  code = "sparkIWrite("+variable_device+"[0], "+variable_device+"[1], "+value_pin+", "+value_value+")\n";
  return code;
};

Blockly.Python.sparkgetfunc = function()
{
  if(!Blockly.Python.definitions_['spark_getFunc_function'])
  {
    Blockly.Python.definitions_['spark_getFunc_function'] = "def sparkfunc(id, token, funcname, string_parameter):\n"+
	    "  params = {\"access_token\" : token, \"args\" : string_parameter}\n" +
            "  response = requests.post(\"https://api.spark.io/v1/devices/\"+id+\"/\"+funcname, data = params)\n" +
            "  data = response.text\n"+
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


Blockly.Python['spark_getfunc'] = function(block) {
  var value_func = block.getFieldValue('func');
  var variable_device = Blockly.Python.variableDB_.getName(block.getFieldValue('device'), Blockly.Variables.NAME_TYPE);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.import_requests();
  Blockly.Python.importJson();
  Blockly.Python.sparkgetfunc();
  // // TODO: Assemble Python into code variable.
  var code;
  // TODO: Change ORDER_NONE to the correct strength.
  code = "sparkfunc(" +variable_device+ "[0], " + variable_device + "[1], '" +value_func+ "', " + value_value + ")";
  return [code, Blockly.Python.ORDER_NONE];
};
