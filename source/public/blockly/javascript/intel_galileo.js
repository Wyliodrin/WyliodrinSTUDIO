Blockly.JavaScript.intel_galileo_pymraa = function ()
{
  if (!Blockly.JavaScript.definitions_['import_mraajs'])
  {
    Blockly.JavaScript.definitions_['import_mraajs'] = 'var mraajs = require ("mraa");\n';
  }
}

Blockly.JavaScript.intel_galileo_setup_onboard_led = function ()
{
  if (!Blockly.JavaScript.definitions_['intel_galileo_onboard_led'])
  {
    var intel_galileo_onboard_led = Blockly.JavaScript.variableDB_.getDistinctName(
                  'led', Blockly.Variables.NAME_TYPE);
      Blockly.JavaScript.intel_galileo_onboard_led = intel_galileo_onboard_led;
      Blockly.JavaScript.definitions_['intel_galileo_onboard_led'] = 'if (mraajs.get_platform_name() == mraajs.INTEL_GALILEO_GEN1)\n{\n  '+intel_galileo_onboard_led + " = new mraajs.Gpio (3, true, true);\n}\nelse\n{\n  " + intel_galileo_onboard_led + " = new mraajs.Gpio (13);\n}\n";
                                    intel_galileo_onboard_led + ".dir (mraajs.DIR_OUT);\n";
  }
}


Blockly.JavaScript['intel_galileo_set_onboard_led'] = function(block) {
  Blockly.JavaScript.intel_galileo_pymraa ();
  Blockly.JavaScript.intel_galileo_setup_onboard_led ();
  // console.log ('value_pin '+value_pin);
  var value_value = block.getFieldValue ('value');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.intel_galileo_onboard_led+'.write ('+value_value+');\n';
  return code;
};