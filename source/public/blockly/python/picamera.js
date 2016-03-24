
"use strict";

Blockly.Python.picamera_setup = function ()
{
	if (!Blockly.Python.definitions_['import_picamera'])
  	{
    	var picamera = Blockly.Python.variableDB_.getDistinctName('camera', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.picamera = picamera;
    	Blockly.Python.definitions_['import_picamera'] = "from picamera import *\n"+
    						Blockly.Python.picamera + " = PiCamera()\n";
  	}
}

Blockly.Python['picamera_snapshot'] = function(block) {
	Blockly.Python.picamera_setup ();
  var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.picamera+'.capture ('+value_filename+'+".jpg")\n';
  return code;
};

Blockly.Python['picamera_start_recording'] = function(block) {
	Blockly.Python.picamera_setup ();
  var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.picamera+'.start_recording ('+value_filename+'+".h264")\n';
  return code;
};

Blockly.Python['picamera_stop_recording'] = function(block) {
	Blockly.Python.picamera_setup ();
  var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.picamera+'.stop_recording ()\n';
  return code;
};
