
Blockly.JavaScript.wiringpi = function ()
{
  Blockly.JavaScript.wyliodrin = Blockly.JavaScript.import ('wyliodrin', 'wyliodrin');
}


Blockly.JavaScript.rapiro = function ()
{
  if (!Blockly.JavaScript.definitions_['import_serial'])
  {
    var serial = Blockly.JavaScript.variableDB_.getDistinctName(
        'SerialPort', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.SerialPort = serial;
    Blockly.JavaScript.definitions_['import_serial'] = 'var '+serial+' = require ("serialport").SerialPort;';
  }
  if (!Blockly.JavaScript.definitions_['rapiro_setup'])
  {
    var rapiro = Blockly.JavaScript.variableDB_.getDistinctName(
        'rapiro', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.rapiro_robot = rapiro;
    Blockly.JavaScript.definitions_['rapiro_setup'] = rapiro+' = new '+Blockly.JavaScript.SerialPort+'("/dev/ttyAMA0", {baudrate: 57600});\n';//def handler(signum, frame):\n  print \'stopping rapiro\'\n  '+rapiro+'.write (\'#S\')\nsignal.signal(signal.SIGTERM, handler)';
  }
}

Blockly.JavaScript.NoSupportFor = function (value)
{
  if (!Blockly.JavaScript.definitions_['nosupportfor_'+value])
  {
   Blockly.JavaScript.definitions_['nosupportfor_'+value] = 'console.log (\''+value+' is not supported in JavaScript\');';
  }
}

function leadingnumbers (number, digits)
{
  number = ''+number;
  for (var i=number.length; i<digits; i++) number = '0'+number;
  return number;
}

Blockly.JavaScript.bmp180_init = function ()
{
  Blockly.JavaScript.wiringpi ();
  if (!Blockly.JavaScript.definitions_['bmp180_init'])
  {
    Blockly.JavaScript.bmp180_device = Blockly.JavaScript.variable_init ('bmp180_device', Blockly.JavaScript.wyliodrin+'.Adafruit_BMP085_Unified ();\n#bmp180_device#.begin()');
    Blockly.JavaScript.definitions_['bmp180_init'] = '';
  } 
}

Blockly.JavaScript.buttons_switched = function ()
{
  if (!Blockly.JavaScript.definitions_['buttons_switched'])
  {
    var buttons = Blockly.JavaScript.variableDB_.getDistinctName(
        'buttons', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.definitions_['buttons_variable'] = buttons+' = []\n';
    Blockly.JavaScript.buttons = buttons;
    Blockly.JavaScript.definitions_['buttons_switched'] = 'function buttonSwitched(button, expectedValue)\n'+'{\n'+
                            '  var value = '+Blockly.JavaScript.wyliodrin+'.digitalRead (button);\n'+ 
                            '  var stable = true;\n'+
                            '  for(var i=0;i<100;i++)\n'+
          '  {\n'+
                            '    var valuenext = '+Blockly.JavaScript.wyliodrin+'.digitalRead (button);\n'+
                            '    if(value!=valuenext)\n'+
                            '      stable = false;\n'+
                            '    if(stable)\n'+
                            '      if(value!=buttons[button])\n'+
          '      {\n'+
                            '        buttons[button]=value;\n'+
                            '        return value == expectedValue;\n'+
          '      }\n'+
                            '      else\n'+
                            '        return false;\n'+
          '   }\n'+
                            '    return false;\n'+
          '}';
  }
}

Blockly.JavaScript.buttons_initial_value= function (button)
{
  if (!isNaN(parseInt(button)))
  {
    if (!Blockly.JavaScript.definitions_['buttons_initial_value_'+button])
    {
      Blockly.JavaScript.definitions_['buttons_initial_value_'+button] = Blockly.JavaScript.buttons+'['+button+'] = '+Blockly.JavaScript.wyliodrin+'.digitalRead ('+button+')\n';
    }
  }
}

Blockly.JavaScript.titleFromStream = function ()
{
  if (!Blockly.JavaScript.definitions_['titleFromStream'])
  {
    Blockly.JavaScript.definitions_['titleFromStream'] = 'function titleFromStream(data)\n'+'{\n'+'  try\n'+'  {\n'+'    return data[data.index("StreamTitle=\'")+13:data.index("\';")];\n'+'  }\n'+'  except:\n    return data\n';//todo
  }
}


Blockly.JavaScript.colors = function ()
{
  if (!Blockly.JavaScript.definitions_['import_struct'])
  {
    Blockly.JavaScript.definitions_['import_struct'] = 'import struct\n';
  }
  if (!Blockly.JavaScript.definitions_['color2rgb'])
  {
    Blockly.JavaScript.definitions_['color2rgb'] = 'function colorToRGB(color)\n'+'{\n'+'  var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(color);\n'+'  return result ? {\n'+'    r: parseInt(result[1], 16),\n'+'    g: parseInt(result[2], 16),\n'+'    b: parseInt(result[3], 16)\n'+'  } : null;\n'+'}';//de verificat pe placa
  }
  if (!Blockly.JavaScript.definitions_['basic_color'])
  {
    Blockly.JavaScript.definitions_['basic_color'] = 'function basic_color(color)\n'+'{\n'+'  var value = 0;\n'+'  if(color>=128)\n'+'    value = 1;\n'+'  else\n'+'    value = 0;\n'+'  return value;\n'+'}';//de testat
  }

}


Blockly.JavaScript.mplayer = function ()
{
  if (!Blockly.JavaScript.definitions_['import_mplayer'])
  {
    Blockly.JavaScript.definitions_['import_mplayer'] = 'from mplayer import Player //This block requires mplayer to be installed on the system.\n';
    var player = Blockly.JavaScript.variableDB_.getDistinctName(
        'player', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.player = player;
    Blockly.JavaScript.definitions_['mplayer_variable'] = 'var '+player+' = Player()\n';//todo
  }
}

Blockly.JavaScript.bass_init = function ()
{
}

Blockly.JavaScript.hi_lo_words = function ()
{
  if (!Blockly.JavaScript.definitions_['hi_lo_words'])
  {
    Blockly.JavaScript.definitions_['hi_lo_words'] = 'function HIWORD(words)\n'+'{\n'+'  return words & 0x0000ffff\n'+'}\n'+
                                    'function LOWORD(words)\n'+'{\n'+'  return words >> 16\n'+'}\n';
  }
}

Blockly.JavaScript.stream_level = function ()
{

}

Blockly.JavaScript.setpinmode = function (pin, mode)
{
  if (!isNaN (pin) && pin != "")
  {
    Blockly.JavaScript.wiringpi();
  
      if (Blockly.JavaScript.definitions_['pin_mode_in_'+pin]) console.log('Pin '+pin+' is used to input and output.');
      if (!Blockly.JavaScript.definitions_['pin_mode_out_'+pin]) Blockly.JavaScript.definitions_['pin_mode_out_'+pin] = Blockly.JavaScript.wyliodrin+'.pinMode ('+pin+', '+mode+');\n';
      return true;
  }
  else
  {
    return false;
  }
}

Blockly.JavaScript.signalName = function (name)
{
  var res = name.match(/[a-zA-Z_0-9]+/);
  return res;
}

Blockly.JavaScript['setpin'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  var value_value = block.getFieldValue ('value');
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['readpin'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['digitalwrite'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['digitalread'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['analogwrite'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 1);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['analogread'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['delay'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_millis = Blockly.JavaScript.valueToCode(block, 'millis', Blockly.JavaScript.ORDER_ATOMIC);
  var type = parseInt (block.getFieldValue("type"));
  if (isNaN(type)) type = 0;
  // TODO: Assemble Python into code variable.
  var code = '';
  if (type == 0)
  {
    code = Blockly.JavaScript.wyliodrin+'.delay ('+value_millis+');\n';
  }
  else if (type == 1)
  {
    code = Blockly.JavaScript.wyliodrin+'.delayMicroseconds ('+value_millis+');\n';
  }
  else
  {
    code = Blockly.JavaScript.wyliodrin+'.delay (('+value_millis+')*1000);\n';
  }
  return code;
};

Blockly.JavaScript['delay'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_millis = Blockly.JavaScript.valueToCode(block, 'millis', Blockly.JavaScript.ORDER_ATOMIC);
  var type = parseInt (block.getFieldValue("type"));
  if (isNaN(type)) type = 0;
  // TODO: Assemble Python into code variable.
  var code = '';
  if (type == 0)
  {
    code = Blockly.JavaScript.wyliodrin+'.delay ('+value_millis+');\n';
  }
  else if (type == 1)
  {
    code = Blockly.JavaScript.wyliodrin+'.delayMicroseconds ('+value_millis+');\n';
  }
  else
  {
    code = Blockly.JavaScript.wyliodrin+'.delay (('+value_millis+')*1000);\n';
  }
  return code;
};

Blockly.JavaScript['pinmode'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mode = block.getFieldValue('mode');
  if (parseInt (value_pin) != NaN)
  {
    if (Blockly.JavaScript.definitions_['pin_mode_in_'+value_pin]) delete Blockly.JavaScript.definitions_['pin_mode_in_'+value_pin];
    if (Blockly.JavaScript.definitions_['pin_mode_out_'+value_pin]) delete Blockly.JavaScript.definitions_['pin_mode_out_'+value_pin];
  }
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.pinMode ('+value_pin+', '+value_mode+');\n';
  return code;
};

Blockly.JavaScript['delaymicroseconds'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_micros = Blockly.JavaScript.valueToCode(block, 'micros', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.delayMicroseconds ('+value_micros+');\n';
  return code;
};

Blockly.JavaScript['millis'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.millis()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['micros'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.micros()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['print'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  console.log ()
  var code = 'console.log ('+value_value+');\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.JavaScript['read'] = function(block) {
  // TODO: Assemble Python into code variable.
  // TODO: Change ORDER_NONE to the correct strength.
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['readwrite'] = function(block) {
  // // TODO: Change ORDER_NONE to the correct strength.
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['readwritenr'] = function(block) {
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['println'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'console.log('+value_value+');\n';
  return code;
};

Blockly.JavaScript['shiftout'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var dropdown_data_pin = Blockly.JavaScript.valueToCode(block, 'data_pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (dropdown_data_pin, 1);
  var dropdown_clock_pin = Blockly.JavaScript.valueToCode(block, 'clock_pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (dropdown_clock_pin, 1);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.shiftOut ('+dropdown_data_pin+', '+dropdown_clock_pin+', '+Blockly.JavaScript.wyliodrin+'.MSBFIRST, '+value_value+');\n';
  return code;
};

Blockly.JavaScript['shiftin'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var dropdown_data_pin = Blockly.JavaScript.valueToCode(block, 'data_pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (dropdown_data_pin, 0);
  var dropdown_clock_pin = Blockly.JavaScript.valueToCode(block, 'clock_pin', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (dropdown_clock_pin, 1);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.shiftIn ('+dropdown_data_pin+', '+dropdown_clock_pin+', '+Blockly.JavaScript.wyliodrin+'.MSBFIRST)';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['say'] = function(block) {
  var value_string = Blockly.JavaScript.valueToCode(block, 'string', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_language = block.getFieldValue('language');
  // TODO: Assemble JavaScript into code variable.
  if (!Blockly.JavaScript.definitions_['import_child_process'])
  {
    var child_process = Blockly.JavaScript.variableDB_.getDistinctName(
      'child_process', Blockly.Variables.NAME_TYPE);
    Blockly.JavaScript.definitions_['import_child_process'] = 'var '+child_process+' = require (\'child_process\');\n'; 
    Blockly.JavaScript.child_process = child_process;
  }
  var code = Blockly.JavaScript.child_process+'.exec (\'say '+dropdown_language+' "\'+'+value_string+'+\'"\');\n';
  return code;
};

Blockly.JavaScript['play'] = function(block) {
  Blockly.JavaScript.mplayer ();
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.player+'.loadfile('+value_url+');\n';
  return code;
};

Blockly.JavaScript['pause'] = function(block) {
  Blockly.JavaScript.mplayer ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.player+'.pause();\n';
  return code;
};

Blockly.JavaScript['stop'] = function(block) {
  Blockly.JavaScript.mplayer ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.player+'.stop();\n';
  return code;
};

Blockly.JavaScript['isplaying'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var type = parseInt (block.getFieldValue("type"));
  var code = Blockly.JavaScript.player+'.filename!=None';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['setvolume'] = function(block) {
  Blockly.JavaScript.mplayer ();
  var value_volume = Blockly.JavaScript.valueToCode(block, 'volume', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.player+'.volume = '+value_volume+';\n';
  return code;
};

Blockly.JavaScript['load_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Load Audio Stream');
  return ["null /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['play_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  Blockly.JavaScript.NoSupportFor ('Play Audio Stream');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['pause_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  Blockly.JavaScript.NoSupportFor ('Pause Audio Stream');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['stop_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  Blockly.JavaScript.NoSupportFor ('Stop Audio Stream');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['isplaying_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Load Audio Stream');
  return ["null /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['level_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Load Audio Stream');
  return ["0 /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['level_side_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Level Side Audio Stream');
  return ["null /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['position_audio_stream'] = function(block) {
  // // TODO: Assemble Python into code variable.
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Position Audio Stream');
  return ["null /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['data_audio_stream'] = function(block) {
  // // TODO: Change ORDER_NONE to the correct strength.
  Blockly.JavaScript.NoSupportFor ('Data Audio Stream');
  return ["null /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['set_position_audio_stream'] = function(block) {
  Blockly.JavaScript.NoSupportFor ('Set Position Audio Stream');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['volume_audio_stream'] = function(block) {
  Blockly.JavaScript.NoSupportFor ('Volume Audio Stream');
  return ["0 /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['set_volume_audio_stream'] = function(block) {
  Blockly.JavaScript.NoSupportFor ('Set Volume Audio Stream');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['set_volume_audio'] = function(block) {
  Blockly.JavaScript.NoSupportFor ('Set Volume Audio');
  return "//Block not supported in JavaScript.\n";
};

Blockly.JavaScript['get_volume_audio'] = function(block) {
  Blockly.JavaScript.NoSupportFor ('Get Volume Audio');
  return ["0 /* Block not supported in JavaScript. */", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['set_led'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = block.getFieldValue ('value');
  var code = "";
  if (!Blockly.JavaScript.setpinmode (value_pin, 1))
  {
    code = Blockly.JavaScript.wyliodrin+".pinMode ("+value_pin+", 1);\n";
  }
  // TODO: Assemble Python into code variable.
  code = code + Blockly.JavaScript.wyliodrin+'.digitalWrite ('+value_pin+', '+value_value+');\n';
  return code;
};

Blockly.JavaScript['set_rgb_led'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  Blockly.JavaScript.colors ();
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var value_red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_red, 1);
  var value_green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_green, 1);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_blue, 1);
  // TODO: Assemble Python into code variable.
  var colorVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
  Blockly.JavaScript.wyliodrin+
  '.digitalWrite ('+value_red+', basic_color('+colorVar+'[0]))\n'+
  Blockly.JavaScript.wyliodrin+
  '.digitalWrite ('+value_green+', basic_color('+colorVar+'[1]))\n'+
  Blockly.JavaScript.wyliodrin+
  '.digitalWrite ('+value_blue+', basic_color('+colorVar+'[2]))\n'
  ;
  return code;
};

Blockly.JavaScript['set_fine_rgb_led'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  Blockly.JavaScript.colors ();
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var value_red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_red, 1);
  var value_green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_green, 1);
  var value_blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (value_blue, 1);
  // TODO: Assemble Python into code variable.
  var colorVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
  Blockly.JavaScript.wyliodrin+
  '.analogWrite ('+value_red+', '+colorVar+'.r)\n'+
  Blockly.JavaScript.wyliodrin+
  '.analogWrite ('+value_green+', '+colorVar+'.g)\n'+
  Blockly.JavaScript.wyliodrin+
  '.analogWrite ('+value_blue+', '+colorVar+'.b)\n'
  ;
  return code;
};

Blockly.JavaScript['init_lcd_i2c'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var dropdown_rows = block.getFieldValue('rows');
  var dropdown_cols = block.getFieldValue('cols');
  var value_i2caddress = Blockly.JavaScript.valueToCode(block, 'i2caddress', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.lcd = Blockly.JavaScript.variable_init ('lcd_variable', 'new '+Blockly.JavaScript.wyliodrin+'.LiquidCrystal ('+value_i2caddress+'-32)\n#lcd_variable#.begin('+dropdown_cols+', '+dropdown_rows+')');
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.JavaScript['init_lcd'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var dropdown_rows = block.getFieldValue('rows');
  var dropdown_cols = block.getFieldValue('cols');
  var value_rs = Blockly.JavaScript.valueToCode(block, 'rs', Blockly.JavaScript.ORDER_ATOMIC);
  var value_strobe = Blockly.JavaScript.valueToCode(block, 'strobe', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d0 = Blockly.JavaScript.valueToCode(block, 'd0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d1 = Blockly.JavaScript.valueToCode(block, 'd1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d2 = Blockly.JavaScript.valueToCode(block, 'd2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_d3 = Blockly.JavaScript.valueToCode(block, 'd3', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.lcd = Blockly.JavaScript.variable_init ('lcd_variable', 'new '+Blockly.JavaScript.wyliodrin+'.LiquidCrystal ('+value_rs+', '+value_strobe+', '+value_d0+', '+value_d1+', '+value_d2+', '+value_d3+')\n#lcd_variable#.begin ('+dropdown_rows+', '+dropdown_cols+')');
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.JavaScript['clear_lcd'] = function(block) {
  if (Blockly.JavaScript.definitions_['lcd_variable'])
  {
    Blockly.JavaScript.wiringpi ();
    // TODO: Assemble Python into code variable.
    var code = Blockly.JavaScript.lcd+'.clear()\n';
    return code;
  }
  else
  {
     return 'console.log("You must init the LCD before using clear lcd");\n';
  }
};

Blockly.JavaScript['reset_lcd'] = function(block) {
  if (Blockly.JavaScript.definitions_['lcd_variable'])
  {
    Blockly.JavaScript.wiringpi ();
    // TODO: Assemble Python into code variable.
    var code = Blockly.JavaScript.lcd+'.home()\n';
    return code;
  }
  else return 'console.log("You must init the LCD before using reset lcd");\n';
};

Blockly.JavaScript['set_position_lcd'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  if (Blockly.JavaScript.definitions_['lcd_variable'])
  {
    var value_col = Blockly.JavaScript.valueToCode(block, 'col', Blockly.JavaScript.ORDER_ATOMIC);
    var value_row = Blockly.JavaScript.valueToCode(block, 'row', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.JavaScript.lcd+'.setCursor ('+value_col+'-1, '+value_row+'-1)\n';
    return code;
  }
  else return 'console.log ("You must init the LCD before using set position lcd");\n';
};

Blockly.JavaScript['print_lcd'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  if (Blockly.JavaScript.definitions_['lcd_variable'])
  {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.JavaScript.lcd+'.print (""+'+value_text+')\n';
    return code;
  }
  else 'console.log("You must init the LCD before using print lcd");\n';
};

Blockly.JavaScript['button_is'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+value_pin+') == '+value_type;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['wiringpi_pins'] = function(block) {
  var dropdown_pins_numbering = block.getFieldValue('pins_numbering');
  // TODO: Assemble Python into code variable.
  Blockly.JavaScript.definitions_['import_os_pins'] = 'process.env[\'PINS_NUMBERING\'] = \''+dropdown_pins_numbering+'\';';
  var code = '';
  return code;
};

Blockly.JavaScript['button_event'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.JavaScript.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+value_pin+') == '+value_type;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['button_switched'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.JavaScript.setpinmode (value_pin, 0);
  Blockly.JavaScript.buttons_switched ();
  Blockly.JavaScript.buttons_initial_value (value_pin);
  // TODO: Assemble Python into code variable.
  var code = 'buttonSwitched ('+value_pin+', '+value_type+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['send_signal'] = function(block) {
  Blockly.JavaScript.wiringpi ();
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var text_name = block.getFieldValue('name');
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.sendSignal (\''+Blockly.JavaScript.signalName (text_name)+'\', '+value_value+')\n';
  return code;
};

Blockly.JavaScript['rapiro_stop'] = function(block) {
  Blockly.JavaScript.rapiro ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.rapiro_robot+'.write (\'#M0\')\nsleep(2)\n'+Blockly.JavaScript.rapiro_robot+'.write(\'#S\')\n';
  return code;
};

Blockly.JavaScript['rapiro_walk'] = function(block) {
  Blockly.JavaScript.rapiro ();
  var directon = block.getFieldValue('direction');
  var cmd = '';
  if (directon == 0) cmd='#M1';
  else
  if (directon == 1) cmd='#M2';
  var wait = Blockly.JavaScript.valueToCode(block, 'wait', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.rapiro_robot+'.write (\''+cmd+'\')\nsleep('+wait+')\n';
  return code;
};

Blockly.JavaScript['rapiro_turn'] = function(block) {
  Blockly.JavaScript.rapiro ();
  var directon = block.getFieldValue('direction');
  var cmd = '';
  if (directon == 0) cmd='#M3';
  else
  if (directon == 1) cmd='#M4';
  var wait = Blockly.JavaScript.valueToCode(block, 'wait', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.rapiro_robot+'.write (\''+cmd+'\')\nsleep('+wait+')\n';
  return code;
};

Blockly.JavaScript['rapiro_wave_hand'] = function(block) {
  Blockly.JavaScript.rapiro ();
  // TODO: Assemble Python into code variable.
  var wait = Blockly.JavaScript.valueToCode(block, 'wait', Blockly.JavaScript.ORDER_ATOMIC);
  var code = Blockly.JavaScript.rapiro_robot+'.write (\'#M5\')\nsleep('+wait+')\n';
  return code;
};

Blockly.JavaScript['rapiro_angle'] = function(block) {
  var angle = block.getFieldValue('angle');
  // TODO: Assemble JavaScript into code variable.
  var code = angle;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['rapiro_move'] = function(block) {
  Blockly.JavaScript.rapiro ();
  var motor = block.getFieldValue('motor');
  var angle = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
  console.log ('angle: '+angle);
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC) * 10;
  if (time < 0) time = 0;
  if (time > 255) time = 255;
  // TODO: Assemble Python into code variable.
  var code = Blockly.JavaScript.rapiro_robot+'.write (\'#PS\'+'+motor+'.zfill(2)+\'A\'+str('+angle+').zfill(3)+\'T\'+str('+time+').zfill(3))\nsleep('+time/10+')\n';
  return code;
};

Blockly.JavaScript['rapiro_set_eyes_color'] = function(block) {
  Blockly.JavaScript.colors ();
  Blockly.JavaScript.rapiro ();
  var color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC) * 10;
  var colorVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+color+')\n'+
        Blockly.JavaScript.rapiro_robot+'.write (\'#PR\'+str('+colorVar+'[0]).zfill(3)+\'G\'+str('+colorVar+'[1]).zfill(3)+\'B\'+str('+colorVar+'[2]).zfill(3)+\'T\'+str('+time+').zfill(3))\nsleep('+time/10+')\n';
  return code;
};

Blockly.JavaScript.sevenSegmentFunction = function ()
{
  if (!Blockly.JavaScript.definitions_['sevenSegmentFunction'])
  {
    Blockly.JavaScript.definitions_['sevenSegmentFunction'] = 'function displaySegment(sevenSegment, a, b, c, d, e, f, g, dp){\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[1], Math.abs(sevenSegment[0]-a));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[2], Math.abs(sevenSegment[0]-b));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[3], Math.abs(sevenSegment[0]-c));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[4], Math.abs(sevenSegment[0]-d));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[5], Math.abs(sevenSegment[0]-e));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[6], Math.abs(sevenSegment[0]-f));\n'+
                            '  '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[7], Math.abs(sevenSegment[0]-g));\n'+
                            '  if (sevenSegment.length)>=9 '+Blockly.JavaScript.wyliodrin+'.digitalWrite(sevenSegment[8], Math.abs(sevenSegment[0]-dp));\n'+
                            '}\n'
                            ;
  }
}

Blockly.JavaScript.sevenSegment = function ()
{
  if (!Blockly.JavaScript.definitions_['sevenSegment'])
  {
    Blockly.JavaScript.sevenSegmentFunction();
    var valueToBeDispl = Blockly.JavaScript.variableDB_.getDistinctName(
        'valueToDisplay', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.valueToDiplay = valueToBeDispl;
    if (!Blockly.JavaScript.definitions_['sevenSegment'])
    {
      Blockly.JavaScript.definitions_['sevenSegment'] = 'function display(sevenSegment, value){\n'+
                              '  if (value == "0")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1);\n'+
                              '  if (value == "1")\n'+
                              '    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 0, 0, 1);\n'+
                              '  if (value == "2")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 0, 1, 1, 0, 1, 1);\n'+
                              '  if (value == "3")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 0, 1, 1);\n'+
                              '  if (value == "4")\n'+
                              '    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 1, 1, 1);\n'+
                              '  if (value == "5")\n'+
                              '    displaySegment(sevenSegment, 1, 0, 1, 1, 0, 1, 1, 1);\n'+
                              '  if (value == "6")\n'+
                              '    displaySegment(sevenSegment, 1, 0, 1, 1, 1, 1, 1, 1);\n'+
                              '  if (value == "7")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 0, 0, 0, 0, 1);\n'+
                              '  if (value == "8")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1);\n'+
                              '  if (value == "9")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 1, 1, 1);\n'+
                              '  if (value == "A")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 0, 1, 1, 1, 1);\n'+
                              '  if (value == "B")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1);\n'+
                              '  if (value == "C")\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 0, 1);\n'+
                              '  if (value == "D")\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1);\n'+
                              '  if (value == "E")\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 1, 1);\n'+
                              '  if (value == "F")\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 0, 1, 1, 1, 1);\n'+
                              '  if (value == ".")\n'+
                              '    displaySegment(sevenSegment, 0, 0, 0, 0, 0, 0, 0, 1);\n'+
                              '}\n'
                              ;
    }
  }
}


Blockly.JavaScript['sevensegmdispl_setup'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_inverse = block.getFieldValue ('inverse');
  var value_seg_a = Blockly.JavaScript.valueToCode(block, 'seg_a', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_b = Blockly.JavaScript.valueToCode(block, 'seg_b', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_c = Blockly.JavaScript.valueToCode(block, 'seg_c', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_d = Blockly.JavaScript.valueToCode(block, 'seg_d', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_e = Blockly.JavaScript.valueToCode(block, 'seg_e', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_f = Blockly.JavaScript.valueToCode(block, 'seg_f', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_g = Blockly.JavaScript.valueToCode(block, 'seg_g', Blockly.JavaScript.ORDER_ATOMIC);
  var value_seg_dp = Blockly.JavaScript.valueToCode(block, 'seg_dp', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (value_seg_a, 1);
  Blockly.JavaScript.setpinmode (value_seg_b, 1);
  Blockly.JavaScript.setpinmode (value_seg_c, 1);
  Blockly.JavaScript.setpinmode (value_seg_d, 1);
  Blockly.JavaScript.setpinmode (value_seg_e, 1);
  Blockly.JavaScript.setpinmode (value_seg_f, 1);
  Blockly.JavaScript.setpinmode (value_seg_g, 1);
  Blockly.JavaScript.setpinmode (value_seg_dp, 1);
  var code = '['+value_inverse+', '+value_seg_a+', '+value_seg_b+', '+value_seg_c+', '+value_seg_d+', '+value_seg_e+', '+value_seg_f+', '+value_seg_g+', '+value_seg_dp+']';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sevensegmdispl_display'] = function(block) {
  Blockly.JavaScript.sevenSegment();
  var value_ssd = Blockly.JavaScript.valueToCode(block, 'ssd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_tobedispl = Blockly.JavaScript.valueToCode(block, 'tobedispl', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "display("+value_ssd+", \"\"+"+value_tobedispl+");";
  return code;
};

Blockly.JavaScript.Adafruit_7segment_init = function ()
{
  if (!Blockly.JavaScript.definitions_['Adafruit_7segment_init'])
  {
    Blockly.JavaScript.definitions_['Adafruit_7segment_init'] = 'function Adafruit_7segment_init(bus){\n'+
                                                                'ada_7segm=new wyliodrin.Adafruit_7segment();\n'+
                                                                'ada_7segm.begin(bus);\n'+
                                                                'return ada_7segm;}';
  }
}
Blockly.JavaScript.Adafruit_24bar_init = function ()
{
  if (!Blockly.JavaScript.definitions_['Adafruit_24bar_init'])
  {
    Blockly.JavaScript.definitions_['Adafruit_24bar_init'] = 'function Adafruit_24bar_init(bus){\n'+
                                                                'ada_24bar=new wyliodrin.Adafruit_24bargraph();\n'+
                                                                'ada_24bar.begin(bus);\n'+
                                                                'for (i = 0; i<24; i++) {\n'+
                                                              'ada_24bar.setBar(i, wyliodrin.LED_OFF)}\n'+
                                                              'return ada_24bar;}';
  }
}


Blockly.JavaScript.mpu6050_init = function ()
{
  if (!Blockly.JavaScript.definitions_['mpu6050_init'])
  {
    Blockly.JavaScript.definitions_['mpu6050_init'] = 'function mpu6050_init(bus)\n{\n'+
                                                                '  mpu6050=new wyliodrin.MPU6050(bus);\n'+
                                                                '  mpu6050.initialize();\n'+
                                                                '  return mpu6050;\n}';
  }
}

Blockly.JavaScript.htu21d_init = function ()
{
  if (!Blockly.JavaScript.definitions_['htu21d_init'])
  {
    Blockly.JavaScript.definitions_['htu21d_init'] = 'function htu21d_init()\n{\n'+
                                                                '  htu21d=new wyliodrin.HTU21D();\n'+
                                                                '  htu21d.begin();\n'+
                                                                '  return htu21d;\n}';
  }
}


Blockly.JavaScript['bmp180_get_pressure'] = function(block) {
  Blockly.JavaScript.bmp180_init ();
  // TODO: Assemble Python into code variable.
  var code =Blockly.JavaScript.bmp180_device+'.getPressure()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.JavaScript['bmp180_get_temperature'] = function(block) {
  Blockly.JavaScript.bmp180_init ();
  // TODO: Assemble Python into code variable.
  var code =Blockly.Python.bmp180_device+'.getTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
}


Blockly.JavaScript['adafruit_7segment_begin'] = function(block) {
  Blockly.JavaScript.wiringpi();
  Blockly.JavaScript.Adafruit_7segment_init();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);

  // TODO: Assemble JavaScript into code variable.
  var code = "new Adafruit_7segment_init("+value_bus+")";

return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['adafruit_24bar_begin'] = function(block) {
  Blockly.JavaScript.wiringpi();
  Blockly.JavaScript.Adafruit_24bar_init();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "Adafruit_24bar_init("+value_bus+")";

return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['adafruit_24bar_color'] = function(block) {
  Blockly.JavaScript.wiringpi();
  
  var value_24bar = Blockly.JavaScript.valueToCode(block, '24bar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_color = block.getFieldValue('color');
  // TODO: Assemble JavaScript into code variable.
  var code = value_24bar+'.setBar('+value_led+','+'wyliodrin.'+dropdown_color+');\n';
  return code;
};


Blockly.JavaScript['adafruit_writeDisplay'] = function(block) {
  Blockly.JavaScript.wiringpi();
  var value_adafruit = Blockly.JavaScript.valueToCode(block, 'adafruit', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =value_adafruit+'.writeDisplay();\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};
Blockly.JavaScript['adafruit_7segment_print'] = function(block) {
  Blockly.JavaScript.wiringpi();

  var value_7seg = Blockly.JavaScript.valueToCode(block, '7seg', Blockly.JavaScript.ORDER_ATOMIC);
  var value_nr = Blockly.JavaScript.valueToCode(block, 'nr', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  var code = value_7seg+'.print('+value_nr+','+'wyliodrin.'+dropdown_type+');\n';
  return code;
};


Blockly.JavaScript['mpu6050_setup'] = function(block) {
  Blockly.JavaScript.wiringpi();
  Blockly.JavaScript.mpu6050_init(); 
  var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "new mpu6050_init("+value_address+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getAccX'] = function(block) {
  var value_accelerom = Blockly.JavaScript.valueToCode(block, 'accelerom', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerom+'.getAccelerationX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getAccY'] = function(block) {
  var value_acceleromy = Blockly.JavaScript.valueToCode(block, 'acceleromy', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_acceleromy+'.getAccelerationY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getAccZ'] = function(block) {
  var value_acceleromz = Blockly.JavaScript.valueToCode(block, 'acceleromz', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_acceleromz+'.getAccelerationZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getTemp'] = function(block) {
  var value_acceleromt = Blockly.JavaScript.valueToCode(block, 'acceleromt', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_acceleromt+'.getTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getRotX'] = function(block) {
  var value_acceleromm = Blockly.JavaScript.valueToCode(block, 'acceleromm', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_acceleromm+'.getRotationX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getRotY'] = function(block) {
  var value_accelerommy = Blockly.JavaScript.valueToCode(block, 'accelerommy', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerommy+'.getRotationY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['mpu6050_getRotZ'] = function(block) {
  var value_accelerommz = Blockly.JavaScript.valueToCode(block, 'accelerommz', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerommz+'.getRotationZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['htu21d_setup'] = function(block) {
  Blockly.JavaScript.wiringpi();
  Blockly.JavaScript.htu21d_init();
  
  var code = 'new htu21d_init()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['htu21d_getHum'] = function(block) {
  var value_humidity = Blockly.JavaScript.valueToCode(block, 'humidity', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_humidity+'.readHumidity()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['htu21d_getTem'] = function(block) {
  var value_hum = Blockly.JavaScript.valueToCode(block, 'hum', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_hum+'.readTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};