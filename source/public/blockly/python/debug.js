Blockly.Python.initDebug = function()
{
	if (!Blockly.Python.definitions_['initdebug'])
	{
		Blockly.Python.definitions_['initdebug'] = "initDebug ()\n";
	}
}


Blockly.Python['breakpoint'] = function(block) {
   Blockly.Python.wiringpi();
   Blockly.Python.initCommunication();
   Blockly.Python.initDebug();
   var code = 'breakpoint()\n';
   return code;
};