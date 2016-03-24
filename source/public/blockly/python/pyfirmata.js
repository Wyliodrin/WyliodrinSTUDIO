Blockly.Python.firmataImport = function()
{
  if(!Blockly.Python.definitions_['import_firmata'])
  {
    Blockly.Python.definitions_['import_firmata'] = 'from pyfirmata import Arduino, ArduinoMega\n'+
    												'from pyfirmata import util\n';
  }
}

Blockly.Python.firmataSetup = function (board_type, board_port)
{
	if (!Blockly.Python.definitions_['import_firmata_setup'])
  	{
    	var auxBoard = Blockly.Python.variableDB_.getDistinctName('board', Blockly.Generator.NAME_TYPE);
      var auxReader = Blockly.Python.variableDB_.getDistinctName('reader', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.board = auxBoard;
      Blockly.Python.reader = auxReader;
    	Blockly.Python.definitions_['import_firmata_setup'] = "def setBoard(boardType, port):\n"+
											    	   "  if boardType == 'arduino':\n"+
											    	   "    "+Blockly.Python.board+" = Arduino(port)\n"+
											    	   "  else:\n"+
											    	   "    "+Blockly.Python.board+" = ArduinoMega(port)\n"+
                               "  return board\n"+
                               Blockly.Python.board + "=setBoard("+board_type+", "+board_port+")\n"+
                               auxReader+" = util.Iterator("+auxBoard+")\n"+
                               auxReader+".start()\n"
											    	   ;
  	}
}


Blockly.Python.pinFunction = function (type, pin, fns)
{
    if (!Blockly.Python.board)
    {
      Blockly.Python.definitions_['pin_function_'+type+':'+pin] = "print (\"Please start the Arduino board first\")\n";
      if (!Blockly.Python.pin)
      {
        Blockly.Python.pin = [];
      }
      Blockly.Python.pin[type+':'+pin] = "None";
    }
    else
    {
      var auxPin = Blockly.Python.variableDB_.getDistinctName('pin_var', Blockly.Generator.NAME_TYPE);
      if (!Blockly.Python.definitions_['pin_function_'+type+':'+pin])
      {
        if (!Blockly.Python.pin)
        {
          Blockly.Python.pin = [];
        }
        Blockly.Python.pin[type+':'+pin] = auxPin;
        Blockly.Python.definitions_['pin_function_'+type+':'+pin] = Blockly.Python.pin[type+':'+pin]+" = "+Blockly.Python.board+".get_pin(\""+type+":"+pin+":"+fns+"\")\n";
      }
    }
}


Blockly.Python.pinSetup = function ()
{
  	var auxAPin = Blockly.Python.variableDB_.getDistinctName('pin', Blockly.Generator.NAME_TYPE);
    Blockly.Python.aPin = auxAPin;
}

Blockly.Python['firmata_init'] = function(block) {
  var dropdown_board = block.getFieldValue('board');
  var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.firmataImport();
  Blockly.Python.firmataSetup("'"+dropdown_board+"'", value_port);
  // TODO: Assemble Python into code variable.
  var code = "";
  return code;
};

Blockly.Python['firmata_digitalwrite'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var value_digitalpin = Blockly.Python.valueToCode(block, 'digitalPin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.pinFunction('d', value_digitalpin, 'o');
  code = Blockly.Python.pin['d:'+value_digitalpin]+".write("+value_value+")\n";
  return code;
};

Blockly.Python['firmata_digitalread'] = function(block) {
  var value_digitalpin = Blockly.Python.valueToCode(block, 'digitalPin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.pinFunction('d', value_digitalpin, 'i');
  var code = Blockly.Python.pin['d:'+value_digitalpin]+".read()";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['firmata_set_rgb_led'] = function(block) {
  Blockly.Python.colors ();
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.

  Blockly.Python.pinFunction('d', value_red, 'o');
  Blockly.Python.pinFunction('d', value_green, 'o');
  Blockly.Python.pinFunction('d', value_blue, 'o');
  // TODO: Assemble Python into code variable.

  var colorVar = Blockly.Python.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
         Blockly.Python.pin['d:'+value_red]+".write(basic_color("+colorVar+"[0]))\n"+
         Blockly.Python.pin['d:'+value_green]+".write(basic_color("+colorVar+"[1]))\n"+
         Blockly.Python.pin['d:'+value_blue]+".write(basic_color("+colorVar+"[2]))\n"
  ;
  return code;
};

Blockly.Python['firmata_set_fine_rgb_led'] = function(block) {
  Blockly.Python.colors ();
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.pinFunction('d', value_red, 'p');
  Blockly.Python.pinFunction('d', value_green, 'p');
  Blockly.Python.pinFunction('d', value_blue, 'p');
  // TODO: Assemble Python into code variable.
  var colorVar = Blockly.Python.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
        Blockly.Python.pin['d:'+value_red]+".write("+colorVar+"[0]/255.0)\n"+
         Blockly.Python.pin['d:'+value_green]+".write("+colorVar+"[1]/255.0)\n"+
         Blockly.Python.pin['d:'+value_blue]+".write("+colorVar+"[2]/255.0)\n"
  ;
  return code;
};

Blockly.Python['firmata_serial'] = function(block) {
  var text_port = block.getFieldValue('port');
  var dropdown_baudrate = block.getFieldValue('baudrate');
  if (!Blockly.Python.definitions_['import_os'])
  {
   Blockly.Python.definitions_['import_os'] = 'import os'; 
  }
  // TODO: Assemble Python into code variable.
  var _arguments = '-b '+dropdown_baudrate;
  if (text_port!='auto') _arguments += ' -p '+text_port;
  var code = 'os.system (\'ino serial '+_arguments+'\')';
  return code;
};

Blockly.Python['firmata_analogread'] = function(block) {
  var value_analogpin = Blockly.Python.valueToCode(block, 'analogPin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.pinFunction('a', value_analogpin, 'i');
  var code = "round(("+Blockly.Python.pin['a:'+value_analogpin]+".read() or 0) * 1023)";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['firmata_analogwrite'] = function(block) {
  var value_analogvalue = Blockly.Python.valueToCode(block, 'analogValue', Blockly.Python.ORDER_ATOMIC);
  var value_analogpin = Blockly.Python.valueToCode(block, 'analogPin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.pinFunction('d', value_analogpin, 'p');
  // TODO: Assemble Python into code variable.
  code = Blockly.Python.pin['d:'+value_analogpin]+".write("+value_analogvalue+"/255.0)\n";
  return code;
};

Blockly.Python['firmata_servo'] = function(block) {
  var value_analogvalue = Blockly.Python.valueToCode(block, 'value_servo', Blockly.Python.ORDER_ATOMIC);
  var value_analogpin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.pinFunction('d', value_analogpin, 's');
  // TODO: Assemble Python into code variable.
  code = Blockly.Python.pin['d:'+value_analogpin]+".write("+value_analogvalue+")\n";
  return code;
};