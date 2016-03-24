Blockly.Python.udooGetSensor = function ()
{
  if (!Blockly.Python.definitions_['udooGetSensor'])
  {
    Blockly.Python.definitions_['udooGetSensor'] = 'def getUDOOSensor (dataFile, axis):\n'+
                          "  f = open (dataFile)\n"+
                          "  data = f.readline ()\n"+
                          "  data = data.replace(\'\\n\', \'\')\n"+
                          "  if (axis != -1):"+
                          "    return data.split (\',\')[axis]\n"+
                          "  return data.split (\',\')\n";
  }
}

Blockly.Python['udoo_enable_accelerometer'] = function(block) {
  var f = Blockly.Python.variableDB_.getDistinctName ('f', Blockly.Generator.NAME_TYPE);
  var code = f + ' = open (\'/sys/class/misc/FreescaleAccelerometer/enable\', \'w\')\n' +
         f + '.write (\'1\')\n';
  return code;
};

Blockly.Python['udoo_enable_magnetometer'] = function(block) {
  var f = Blockly.Python.variableDB_.getDistinctName ('f', Blockly.Generator.NAME_TYPE);
  var code = f + ' = open (\'/sys/class/misc/FreescaleMagnetometer/enable\', \'w\')\n' +
         f + '.write (\'1\')\n';
  return code;
};

Blockly.Python['udoo_enable_gyroscope'] = function(block) {
  var f = Blockly.Python.variableDB_.getDistinctName ('f', Blockly.Generator.NAME_TYPE);
  var code = f + ' = open (\'/sys/class/misc/FreescaleGyroscope/enable\', \'w\')\n' +
         f + '.write (\'1\')\n';
  return code;
};

Blockly.Python['udoo_get_accelerometer'] = function(block) {
  Blockly.Python.udooGetSensor();
  var dropdown_name = block.getFieldValue('axis');
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleAccelerometer/data\', ' + 
      dropdown_name + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['udoo_get_all_accelerometer'] = function(block) {
  Blockly.Python.udooGetSensor();
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleAccelerometer/data\', -1)';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['udoo_get_magnetometer'] = function(block) {
  Blockly.Python.udooGetSensor();
  var dropdown_name = block.getFieldValue('axis');
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleMagnetometer/data\', ' + 
      dropdown_name + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['udoo_get_all_magnetometer'] = function(block) {
  Blockly.Python.udooGetSensor();
  var dropdown_name = block.getFieldValue('axis');
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleMagnetometer/data\', -1)';
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['udoo_get_gyroscope'] = function(block) {
  Blockly.Python.udooGetSensor();
  var dropdown_name = block.getFieldValue('axis');
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleGyroscope/data\', ' + 
      dropdown_name + ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['udoo_get_gyroscope'] = function(block) {
  Blockly.Python.udooGetSensor();
  var dropdown_name = block.getFieldValue('axis');
  var code = 'getUDOOSensor (\'/sys/class/misc/FreescaleGyroscope/data\', -1)';
  return [code, Blockly.Python.ORDER_NONE];
};
