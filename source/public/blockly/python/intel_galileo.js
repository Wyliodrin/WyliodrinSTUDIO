Blockly.Python.intel_galileo_pymraa = function ()
{
  if (!Blockly.Python.definitions_['import_pymraa'])
  {
    Blockly.Python.definitions_['import_pymraa'] = 'import mraa\n';
  }
}

Blockly.Python.intel_galileo_setup_onboard_led = function ()
{
  if (!Blockly.Python.definitions_['intel_galileo_onboard_led'])
  {
    var intel_galileo_onboard_led = Blockly.Python.variableDB_.getDistinctName(
                  'led', Blockly.Variables.NAME_TYPE);
      Blockly.Python.intel_galileo_onboard_led = intel_galileo_onboard_led;
      Blockly.Python.definitions_['intel_galileo_onboard_led'] = 'if mraa.get_platform_name() == mraa.MRAA_INTEL_GALILEO_GEN1:\n  '+intel_galileo_onboard_led + " = mraa.Gpio (3, True, True)\nelse:\n  "+intel_galileo_onboard_led + " = mraa.Gpio (13)\n";
                                    intel_galileo_onboard_led + ".dir (mraa.DIR_OUT)\n";
  }
}


Blockly.Python['intel_galileo_set_onboard_led'] = function(block) {
  Blockly.Python.intel_galileo_pymraa ();
  Blockly.Python.intel_galileo_setup_onboard_led ();
  // console.log ('value_pin '+value_pin);
  var value_value = block.getFieldValue ('value');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.intel_galileo_onboard_led+'.write ('+value_value+')\n';
  return code;
};