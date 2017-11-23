Blockly.Python.wiringpi = function ()
{
  if (!Blockly.Python.definitions_['import_wiringpi'])
  {
    Blockly.Python.definitions_['import_wiringpi'] = 'from wyliodrin import *\n';
  }
}

Blockly.Python.importtime = function ()
{
  if (!Blockly.Python.definitions_['import_time'])
  {
    Blockly.Python.definitions_['import_time'] = 'from time import *\n';
  }
}

Blockly.Python.rapiro = function ()
{
  if (!Blockly.Python.definitions_['import_serial'])
  {
    Blockly.Python.definitions_['import_serial'] = 'from serial import *\n';
  }
  if (!Blockly.Python.definitions_['import_time'])
  {
    Blockly.Python.definitions_['import_time'] = 'from time import *\n';
  }
  if (!Blockly.Python.definitions_['rapiro_setup'])
  {
    var rapiro = Blockly.Python.variableDB_.getDistinctName(
        'rapiro', Blockly.Generator.NAME_TYPE);
    Blockly.Python.rapiro_robot = rapiro;
    Blockly.Python.definitions_['rapiro_setup'] = rapiro+' = Serial (port=\'/dev/ttyAMA0\', baudrate=57600)\n';//def handler(signum, frame):\n  print \'stopping rapiro\'\n  '+rapiro+'.write (\'#S\')\nsignal.signal(signal.SIGTERM, handler)';
  }
}

function leadingnumbers (number, digits)
{
  number = ''+number;
  for (var i=number.length; i<digits; i++) number = '0'+number;
  return number;
}

Blockly.Python.buttons_switched = function ()
{
  if (!Blockly.Python.definitions_['buttons_switched'])
  {
    var buttons = Blockly.Python.variableDB_.getDistinctName(
        'buttons', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['buttons_variable'] = buttons+' = {}\n';
    Blockly.Python.buttons = buttons;
    Blockly.Python.definitions_['buttons_switched'] = 'def buttonSwitched(button, expectedValue):\n'+
                            '  value = digitalRead (button)\n'+
                            '  stable = True\n'+
                            '  for i in range (100):\n'+
                            '    valuenext = digitalRead (button)\n'+
                            '    if value != valuenext:\n'+
                            '      stable = False\n'+
                            '  if stable:\n'+
                            '    if button in buttons and value != buttons[button]:\n'+
                            '      buttons[button] = value\n'+
                            '      return value == expectedValue\n'+
                            '    elif not button in buttons:\n'+
                            '      buttons[button] = value\n'+
                            '      return False\n'+
                            '    else:\n'+
                            '      return False\n'+
                            '  return False\n';
  }
}

Blockly.Python.bmp180_init = function ()
{
  Blockly.Python.wiringpi ();
  if (!Blockly.Python.definitions_['bmp180_init'])
  {
    var bmp180_device = Blockly.Python.variableDB_.getDistinctName(
        'bmp180_device', Blockly.Generator.NAME_TYPE);
    Blockly.Python.bmp180_device = bmp180_device;
    Blockly.Python.definitions_['bmp180_init'] = bmp180_device + ' = Adafruit_BMP085_Unified ()\n'+bmp180_device+'.begin()\n';
  } 
}

Blockly.Python.buttons_initial_value= function (button)
{
  if (!isNaN(parseInt(button)))
  {
    if (!Blockly.Python.definitions_['buttons_initial_value_'+button])
    {
      Blockly.Python.definitions_['buttons_initial_value_'+button] = Blockly.Python.buttons+'['+button+'] = digitalRead ('+button+')\n';
    }
  }
}

Blockly.Python.titleFromStream = function ()
{
  if (!Blockly.Python.definitions_['titleFromStream'])
  {
    Blockly.Python.definitions_['titleFromStream'] = 'def titleFromStream(data):\n  try:\n    return data[data.index("StreamTitle=\'")+13:data.index("\';")]\n  except:\n    return data\n';
  }
}


Blockly.Python.colors = function ()
{
  if (!Blockly.Python.definitions_['import_struct'])
  {
    Blockly.Python.definitions_['import_struct'] = 'import struct\n';
  }
  if (!Blockly.Python.definitions_['color2rgb'])
  {
    Blockly.Python.definitions_['color2rgb'] = 'def colorToRGB (color):\n  return struct.unpack (\'BBB\', color[1:].decode(\'hex\'))\n';
  }
  if (!Blockly.Python.definitions_['basic_color'])
  {
    Blockly.Python.definitions_['basic_color'] = 'def basic_color (color):\n  value = 0\n  if color>=128:\n    value = 1\n  else:\n    value = 0\n  return value\n';
  }

}


Blockly.Python.mplayer = function ()
{
  if (!Blockly.Python.definitions_['import_mplayer'])
  {
    Blockly.Python.definitions_['import_mplayer'] = 'from mplayer import Player\n';
    var player = Blockly.Python.variableDB_.getDistinctName(
        'player', Blockly.Generator.NAME_TYPE);
    Blockly.Python.player = player;
    Blockly.Python.definitions_['mplayer_variable'] = player+' = Player()\n';
  }
}

Blockly.Python.bass_init = function ()
{
  if (!Blockly.Python.definitions_['import_pybass'])
  {
    Blockly.Python.definitions_['import_pybass'] = 'from pybass import *\n';
    Blockly.Python.definitions_['bass_init'] = 'BASS_Init (-1, 44800, 0, 0, 0);\n'+
                                    'BASS_PluginLoad (\'/usr/local/lib/libbassflac.so\', 0)\n'+
                                    'BASS_PluginLoad (\'/usr/local/lib/libbass_aac.so\', 0)\n';
  }
}

Blockly.Python.hi_lo_words = function ()
{
  if (!Blockly.Python.definitions_['hi_lo_words'])
  {
    Blockly.Python.definitions_['hi_lo_words'] = 'def HIWORD (words):\n  return words & 0x0000ffff\n'+
                                    'def LOWORD (words):\n  return words >> 16\n';
  }
}

Blockly.Python.stream_level = function ()
{
  if (!Blockly.Python.definitions_['stream_level'])
  {
    Blockly.Python.definitions_['stream_level'] = 'def StreamLevel (stream, scale):\n  level = BASS_ChannelGetLevel (stream)\n  return ((HIWORD(level)+LOWORD(level))/2)*scale/32768';
  }
}

Blockly.Python.stream_level_side = function ()
{
  if (!Blockly.Python.definitions_['stream_level_side'])
  {
    Blockly.Python.definitions_['stream_level_side'] = 'def StreamLevelSide (stream, side, scale):\n  level = BASS_ChannelGetLevel (stream)\n  return (HIWORD(level) if side == "left" else LOWORD(level))*scale/32768';
  }
}

Blockly.Python.setpinmode = function (pin, mode)
{
  if (!isNaN (pin) && pin != "")
  {
      if (Blockly.Python.definitions_['pin_mode_in_'+pin]) throw 'Pin '+pin+' is used to input and output.';
      if (!Blockly.Python.definitions_['pin_mode_out_'+pin]) Blockly.Python.definitions_['pin_mode_out_'+pin] = 'pinMode ('+pin+', '+mode+')\n';
      return true;
  }
  else
  {
    return false;
  }
}

Blockly.Python.signalName = function (name)
{
  var res = name.match(/[a-zA-Z_0-9]+/);
  return res;
}


Blockly.Python['setpin'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  var value_value = block.getFieldValue ('value');
  var code = 'digitalWrite ('+value_pin+', '+value_value+')\n';
  return code;
};

Blockly.Python['readpin'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['digitalwrite'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'digitalWrite ('+value_pin+', '+value_value+')\n';
  return code;
};

Blockly.Python['digitalread'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'digitalRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['analogwrite'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 1);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'analogWrite ('+value_pin+', '+value_value+')\n';
  return code;
};

Blockly.Python['analogread'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'analogRead ('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['delay'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.importtime ();
  var value_millis = Blockly.Python.valueToCode(block, 'millis', Blockly.Python.ORDER_ATOMIC);
  var type = parseInt (block.getFieldValue("type"));
  if (isNaN(type)) type = 0;
  // TODO: Assemble Python into code variable.
  var code = '';
  if (type == 0)
  {
    code = 'sleep (('+value_millis+')/1000.0'+')\n';
  }
  else if (type == 1)
  {
    code = 'delayMicroseconds ('+value_millis+')\n';
  }
  else
  {
    code = 'sleep ('+value_millis+')\n';
  }
  return code;
};

Blockly.Python['pinmode'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_mode = block.getFieldValue('mode');
  if (parseInt (value_pin) != NaN)
  {
    if (Blockly.Python.definitions_['pin_mode_in_'+value_pin]) delete Blockly.Python.definitions_['pin_mode_in_'+value_pin];
    if (Blockly.Python.definitions_['pin_mode_out_'+value_pin]) delete Blockly.Python.definitions_['pin_mode_out_'+value_pin];
  }
  // TODO: Assemble Python into code variable.
  var code = 'pinMode ('+value_pin+', '+value_mode+')\n';
  return code;
};

Blockly.Python['delaymicroseconds'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_micros = Blockly.Python.valueToCode(block, 'micros', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'delayMicroseconds ('+value_micros+')\n';
  return code;
};

Blockly.Python['millis'] = function(block) {
  Blockly.Python.wiringpi ();
  // TODO: Assemble Python into code variable.
  var code = 'millis()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['micros'] = function(block) {
  Blockly.Python.wiringpi ();
  // TODO: Assemble Python into code variable.
  var code = 'micros()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['print'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  console.log ()
  var code = 'print ('+value_value+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['read'] = function(block) {
  // TODO: Assemble Python into code variable.
  var type = parseInt (block.getFieldValue("type"));
  var code;
  if (type == 0)
  {
    code = 'raw_input ("")';
  }
  else if (type == 1)
  {
    code = 'int(raw_input (""))'; 
  }
  else if (type == 2)
  {
    code = 'float(raw_input (""))';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['readwrite'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var type = parseInt (block.getFieldValue("type"));
  var code;
  if (type == 0)
  {
    code = 'raw_input ('+value_value+')';
  }
  else if (type == 1)
  {
    code = 'int(raw_input ('+value_value+'))'; 
  }
  else if (type == 2)
  {
    code = 'float(raw_input ('+value_value+'))';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['readwritenr'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'int(raw_input ('+value_value+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['println'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'print('+value_value+')\n';
  return code;
};

Blockly.Python['shiftout'] = function(block) {
  Blockly.Python.wiringpi();
  var dropdown_data_pin = Blockly.Python.valueToCode(block, 'data_pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (dropdown_data_pin, 1);
  var dropdown_clock_pin = Blockly.Python.valueToCode(block, 'clock_pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (dropdown_clock_pin, 1);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'shiftOut ('+dropdown_data_pin+', '+dropdown_clock_pin+', MSBFIRST, '+value_value+')\n';
  return code;
};

Blockly.Python['shiftin'] = function(block) {
  Blockly.Python.wiringpi();
  var dropdown_data_pin = Blockly.Python.valueToCode(block, 'data_pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (dropdown_data_pin, 0);
  var dropdown_clock_pin = Blockly.Python.valueToCode(block, 'clock_pin', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (dropdown_clock_pin, 1);
  // TODO: Assemble Python into code variable.
  var code = 'shiftIn ('+dropdown_data_pin+', '+dropdown_clock_pin+', MSBFIRST)';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['say'] = function(block) {
  var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
  var dropdown_language = block.getFieldValue('language');
  if (!Blockly.Python.definitions_['import_os'])
  {
   Blockly.Python.definitions_['import_os'] = 'import os'; 
  }
  // TODO: Assemble Python into code variable.
  var code = 'os.system (\'say '+dropdown_language+' "\'+str('+value_string+')+\'"\')\n';
  return code;
};

Blockly.Python['play'] = function(block) {
  Blockly.Python.mplayer ();
  var value_url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.player+'.loadfile('+value_url+')\n';
  return code;
};

Blockly.Python['pause'] = function(block) {
  Blockly.Python.mplayer ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.player+'.pause()\n';
  return code;
};

Blockly.Python['stop'] = function(block) {
  Blockly.Python.mplayer ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.player+'.stop()\n';
  return code;
};

Blockly.Python['isplaying'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var type = parseInt (block.getFieldValue("type"));
  var code = Blockly.Python.player+'.filename!=None';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['setvolume'] = function(block) {
  Blockly.Python.mplayer ();
  var value_volume = Blockly.Python.valueToCode(block, 'volume', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.player+'.volume = '+value_volume+'\n';
  return code;
};

Blockly.Python['load_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble Python into code variable.
  var code = '';
  if (dropdown_type == 0)
  {
    code = 'BASS_StreamCreateFile (False, '+value_filename+', 0, 0, 0)';
  }
  else if (dropdown_type == 1)
  {
    code = 'BASS_StreamCreateURL ('+value_filename+', 0, 0, DOWNLOADPROC(0), 0)';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['play_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'BASS_ChannelPlay ('+value_stream+', False)\n';
  return code;
};

Blockly.Python['pause_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'BASS_ChannelPause ('+value_stream+', False)\n';
  return code;
};

Blockly.Python['stop_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'BASS_ChannelStop ('+value_stream+')\n';
  return code;
};

Blockly.Python['isplaying_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  code = 'BASS_ChannelIsActive ('+value_stream+') == BASS_ACTIVE_PLAYING';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['level_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  Blockly.Python.hi_lo_words ();
  Blockly.Python.stream_level ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var value_scale = Blockly.Python.valueToCode(block, 'scale', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'StreamLevel ('+value_stream+', '+value_scale+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['level_side_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  Blockly.Python.hi_lo_words ();
  Blockly.Python.stream_level_side ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var value_side = block.getFieldValue('side');
  var value_scale = Blockly.Python.valueToCode(block, 'scale', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'StreamLevelSide ('+value_stream+', '+value_side+', '+value_scale+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['position_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble Python into code variable.
  var code = '';
  if (dropdown_type == 0)
  {
    code = 'BASS_ChannelBytes2Seconds ('+value_stream+', BASS_ChannelGetPosition ('+value_stream+', BASS_POS_BYTE))';
  }
  else if (dropdown_type == 1)
  {
    code = 'BASS_ChannelGetPosition ('+value_stream+', BASS_POS_BYTE)';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['data_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  Blockly.Python.titleFromStream();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble Python into code variable.
  var code = '';
  if (dropdown_type == 0)
  {
        code = 'titleFromStream(str(c_char_p (BASS_ChannelGetTags ('+value_stream+', BASS_TAG_META)).value))';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['set_position_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var value_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble Python into code variable.
  var code = '';
  var code = '';
  if (dropdown_type == 0)
  {
    code = 'BASS_ChannelSetPosition ('+value_stream+', BASS_ChannelSeconds2Bytes('+value_stream+', '+value_pos+'), BASS_POS_BYTE)\n';
  }
  else if (dropdown_type == 1)
  {
    code = 'BASS_ChannelSetPosition ('+value_stream+', '+value_pos+', BASS_POS_BYTE)\n';
  }
  return code;
};

Blockly.Python['volume_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'int (BASS_ChannelGetAttribute ('+value_stream+', BASS_ATTRIB_VOL))*100';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['set_volume_audio_stream'] = function(block) {
  Blockly.Python.bass_init ();
  var value_stream = Blockly.Python.valueToCode(block, 'stream', Blockly.Python.ORDER_ATOMIC);
  var value_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'BASS_ChannelSetAttribute ('+value_stream+', BASS_ATTRIB_VOL, '+value_vol+'/100.0)\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['set_volume_audio'] = function(block) {
  Blockly.Python.bass_init ();
  var value_vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'BASS_SetVolume ('+value_vol+'/100.0)\n';
  return code;
};

Blockly.Python['get_volume_audio'] = function(block) {
  Blockly.Python.bass_init ();
  // TODO: Assemble Python into code variable.
  var code = 'int (BASS_GetVolume ())*100';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['set_led'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_value = block.getFieldValue ('value');
  var code = "";
  if (!Blockly.Python.setpinmode (value_pin, 1))
  {
    code = "pinMode ("+value_pin+", 1)\n";
  }
  // TODO: Assemble Python into code variable.
  code = code + 'digitalWrite ('+value_pin+', '+value_value+')\n';
  return code;
};

Blockly.Python['set_rgb_led'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.colors ();
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_red, 1);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_green, 1);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_blue, 1);
  // TODO: Assemble Python into code variable.
  var colorVar = Blockly.Python.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
  'digitalWrite ('+value_red+', basic_color('+colorVar+'[0]))\n'+
  'digitalWrite ('+value_green+', basic_color('+colorVar+'[1]))\n'+
  'digitalWrite ('+value_blue+', basic_color('+colorVar+'[2]))\n'
  ;
  return code;
};

Blockly.Python['set_fine_rgb_led'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.colors ();
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_red, 1);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_green, 1);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (value_blue, 1);
  // TODO: Assemble Python into code variable.
  var colorVar = Blockly.Python.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+value_color+')\n'+
  'analogWrite ('+value_red+', '+colorVar+'[0])\n'+
  'analogWrite ('+value_green+', '+colorVar+'[1])\n'+
  'analogWrite ('+value_blue+', '+colorVar+'[2])\n'
  ;
  return code;
};

Blockly.Python['init_lcd_i2c'] = function(block) {
  Blockly.Python.wiringpi ();
  var lcd = Blockly.Python.variableDB_.getDistinctName(
        'lcd', Blockly.Generator.NAME_TYPE);
  var dropdown_rows = block.getFieldValue('rows');
  var dropdown_cols = block.getFieldValue('cols');
  var value_i2caddress = Blockly.Python.valueToCode(block, 'i2caddress', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.lcd = lcd;
  Blockly.Python.definitions_['lcd_variable'] = lcd + ' = LiquidCrystal ('+value_i2caddress+'-32)\n'+lcd+'.begin('+dropdown_cols+', '+dropdown_rows+')\n';
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['init_lcd'] = function(block) {
  Blockly.Python.wiringpi ();
  var lcd = Blockly.Python.variableDB_.getDistinctName(
        'lcd', Blockly.Generator.NAME_TYPE);
  var dropdown_rows = block.getFieldValue('rows');
  var dropdown_cols = block.getFieldValue('cols');
  var value_rs = Blockly.Python.valueToCode(block, 'rs', Blockly.Python.ORDER_ATOMIC);
  var value_strobe = Blockly.Python.valueToCode(block, 'strobe', Blockly.Python.ORDER_ATOMIC);
  var value_d0 = Blockly.Python.valueToCode(block, 'd0', Blockly.Python.ORDER_ATOMIC);
  var value_d1 = Blockly.Python.valueToCode(block, 'd1', Blockly.Python.ORDER_ATOMIC);
  var value_d2 = Blockly.Python.valueToCode(block, 'd2', Blockly.Python.ORDER_ATOMIC);
  var value_d3 = Blockly.Python.valueToCode(block, 'd3', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.lcd = lcd;
  Blockly.Python.definitions_['lcd_variable'] = lcd + ' = LiquidCrystal ('+value_rs+', '+value_strobe+', '+value_d0+', '+value_d1+', '+value_d2+', '+value_d3+')\n'+lcd+'.begin('+dropdown_rows+', '+dropdown_cols+')\n';
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['clear_lcd'] = function(block) {
  if (Blockly.Python.definitions_['lcd_variable'])
  {
    Blockly.Python.wiringpi ();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.lcd+'.clear()\n';
    return code;
  }
  else throw "You must init the LCD before using clear lcd";
};

Blockly.Python['reset_lcd'] = function(block) {
  if (Blockly.Python.definitions_['lcd_variable'])
  {
    Blockly.Python.wiringpi ();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.lcd+'.home()\n';
    return code;
  }
  else throw "You must init the LCD before using reset lcd";
};

Blockly.Python['set_position_lcd'] = function(block) {
  Blockly.Python.wiringpi ();
  if (Blockly.Python.definitions_['lcd_variable'])
  {
    var value_col = Blockly.Python.valueToCode(block, 'col', Blockly.Python.ORDER_ATOMIC);
    var value_row = Blockly.Python.valueToCode(block, 'row', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.lcd+'.setCursor('+value_col+'-1, '+value_row+'-1)\n';
    return code;
  }
  else throw "You must init the LCD before using set position lcd";
};

Blockly.Python['print_lcd'] = function(block) {
  Blockly.Python.wiringpi ();
  if (Blockly.Python.definitions_['lcd_variable'])
  {
    var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.lcd+'._print (str('+value_text+'))\n';
    return code;
  }
  else throw "You must init the LCD before using print lcd";
};

Blockly.Python['button_is'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'digitalRead ('+value_pin+') == '+value_type;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['button_event'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.Python.setpinmode (value_pin, 0);
  // TODO: Assemble Python into code variable.
  var code = 'digitalRead ('+value_pin+') == '+value_type;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['button_switched'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_type = block.getFieldValue ('type');
  Blockly.Python.setpinmode (value_pin, 0);
  Blockly.Python.buttons_switched ();
  Blockly.Python.buttons_initial_value (value_pin);
  // TODO: Assemble Python into code variable.
  var code = 'buttonSwitched ('+value_pin+', '+value_type+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['send_signal'] = function(block) {
  Blockly.Python.wiringpi ();
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var text_name = block.getFieldValue('name');
  // TODO: Assemble Python into code variable.
  var code = 'sendSignal (\''+Blockly.Python.signalName (text_name)+'\', '+value_value+')\n';
  return code;
};

Blockly.Python['rapiro_stop'] = function(block) {
  Blockly.Python.rapiro ();
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.rapiro_robot+'.write (\'#M0\')\nsleep(2)\n'+Blockly.Python.rapiro_robot+'.write(\'#S\')\n';
  return code;
};

Blockly.Python['wiringpi_pins'] = function(block) {
  var dropdown_pins_numbering = block.getFieldValue('pins_numbering');
  if (!Blockly.Python.definitions_['import_os'])
  {
   Blockly.Python.definitions_['import_os'] = 'import os'; 
  }
  Blockly.Python.definitions_['import_os_pins'] = 'os.environ["PINS_NUMBERING"] = \"'+dropdown_pins_numbering+'\"'
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['rapiro_walk'] = function(block) {
  Blockly.Python.rapiro ();
  var directon = block.getFieldValue('direction');
  var cmd = '';
  if (directon == 0) cmd='#M1';
  else
  if (directon == 1) cmd='#M2';
  var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.rapiro_robot+'.write (\''+cmd+'\')\nsleep('+wait+')\n';
  return code;
};

Blockly.Python['rapiro_turn'] = function(block) {
  Blockly.Python.rapiro ();
  var directon = block.getFieldValue('direction');
  var cmd = '';
  if (directon == 0) cmd='#M3';
  else
  if (directon == 1) cmd='#M4';
  var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.rapiro_robot+'.write (\''+cmd+'\')\nsleep('+wait+')\n';
  return code;
};

Blockly.Python['rapiro_wave_hand'] = function(block) {
  Blockly.Python.rapiro ();
  // TODO: Assemble Python into code variable.
  var wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
  var code = Blockly.Python.rapiro_robot+'.write (\'#M5\')\nsleep('+wait+')\n';
  return code;
};

Blockly.Python['rapiro_angle'] = function(block) {
  var angle = block.getFieldValue('angle');
  // TODO: Assemble JavaScript into code variable.
  var code = angle;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rapiro_move'] = function(block) {
  Blockly.Python.rapiro ();
  var motor = block.getFieldValue('motor');
  var angle = Blockly.Python.valueToCode(block, 'degrees', Blockly.Python.ORDER_ATOMIC);
  console.log ('angle: '+angle);
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC) * 10;
  if (time < 0) time = 0;
  if (time > 255) time = 255;
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.rapiro_robot+'.write (\'#PS\'+str('+motor+').zfill(2)+\'A\'+str('+angle+').zfill(3)+\'T\'+str('+time+').zfill(3))\nsleep('+time/10+')\n';
  return code;
};

Blockly.Python['rapiro_set_eyes_color'] = function(block) {
  Blockly.Python.colors ();
  Blockly.Python.rapiro ();
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  var time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC) * 10;
  var colorVar = Blockly.Python.variableDB_.getDistinctName(
      'color', Blockly.Variables.NAME_TYPE);
  var code = colorVar + ' = colorToRGB ('+color+')\n'+
        Blockly.Python.rapiro_robot+'.write (\'#PR\'+str('+colorVar+'[0]).zfill(3)+\'G\'+str('+colorVar+'[1]).zfill(3)+\'B\'+str('+colorVar+'[2]).zfill(3)+\'T\'+str('+time+').zfill(3))\nsleep('+time/10+')\n';
  return code;
};

Blockly.Python.sevenSegment = function ()
{
  if (!Blockly.Python.definitions_['sevenSegment'])
  {
    Blockly.Python.sevenSegmentFunction();
    var valueToBeDispl = Blockly.Python.variableDB_.getDistinctName(
        'valueToDisplay', Blockly.Generator.NAME_TYPE);
    Blockly.Python.valueToDiplay = valueToBeDispl;
    if (!Blockly.Python.definitions_['sevenSegment'])
    {
      Blockly.Python.definitions_['sevenSegment'] = "def display(sevenSegment, value):\n"+
                              '  if value == "0":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1)\n'+
                              '  if value == "1":\n'+
                              '    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 0, 0, 1)\n'+
                              '  if value == "2":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 0, 1, 1, 0, 1, 1)\n'+
                              '  if value == "3":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 0, 1, 1)\n'+
                              '  if value == "4":\n'+
                              '    displaySegment(sevenSegment, 0, 1, 1, 0, 0, 1, 1, 1)\n'+
                              '  if value == "5":\n'+
                              '    displaySegment(sevenSegment, 1, 0, 1, 1, 0, 1, 1, 1)\n'+
                              '  if value == "6":\n'+
                              '    displaySegment(sevenSegment, 1, 0, 1, 1, 1, 1, 1, 1)\n'+
                              '  if value == "7":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 0, 0, 0, 0, 1)\n'+
                              '  if value == "8":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1)\n'+
                              '  if value == "9":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 0, 1, 1, 1)\n'+
                              "  if value == 'A':\n"+
                              '    displaySegment(sevenSegment, 1, 1, 1, 0, 1, 1, 1, 1)\n'+
                              '  if value == "B":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 1, 1)\n'+
                              '  if value == "C":\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 0, 1)\n'+
                              '  if value == "D":\n'+
                              '    displaySegment(sevenSegment, 1, 1, 1, 1, 1, 1, 0, 1)\n'+
                              '  if value == "E":\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 1, 1, 1, 1, 1)\n'+
                              '  if value == "F":\n'+
                              '    displaySegment(sevenSegment, 1, 0, 0, 0, 1, 1, 1, 1)\n'+
                              '  if value == ".":\n'+
                              '    displaySegment(sevenSegment, 0, 0, 0, 0, 0, 0, 0, 1)\n'
                              ;
    }
  }
}

Blockly.Python.sevenSegmentFunction = function ()
{
  if (!Blockly.Python.definitions_['sevenSegmentFunction'])
  {
    Blockly.Python.definitions_['sevenSegmentFunction'] = 'def displaySegment(sevenSegment, a, b, c, d, e, f, g, dp):\n'+
                            '  digitalWrite(sevenSegment[1], abs(sevenSegment[0]-a))\n'+
                            '  digitalWrite(sevenSegment[2], abs(sevenSegment[0]-b))\n'+
                            '  digitalWrite(sevenSegment[3], abs(sevenSegment[0]-c))\n'+
                            '  digitalWrite(sevenSegment[4], abs(sevenSegment[0]-d))\n'+
                            '  digitalWrite(sevenSegment[5], abs(sevenSegment[0]-e))\n'+
                            '  digitalWrite(sevenSegment[6], abs(sevenSegment[0]-f))\n'+
                            '  digitalWrite(sevenSegment[7], abs(sevenSegment[0]-g))\n'+
                            '  if len(sevenSegment)>=9: digitalWrite(sevenSegment[8], abs(sevenSegment[0]-dp))\n'
                            ;
  }
}

Blockly.Python.Adafruit_7segment_init= function ()
{
  if (!Blockly.Python.definitions_['Adafruit_7segment_init'])
  {
    Blockly.Python.definitions_['Adafruit_7segment_init'] = "def Adafruit_7segment_init(bus):\n"+
                                                            "  ada_7segm=Adafruit_7segment()\n"+
                                                            "  ada_7segm.begin(bus)\n"+
                                                            "  return ada_7segm";
  }                                                           
}

Blockly.Python.mpu6050_init= function ()
{
  if (!Blockly.Python.definitions_['mpu6050_init'])
  {
    Blockly.Python.definitions_['mpu6050_init'] = "def mpu6050_init(bus):\n"+
                                                            "  mpu6050=MPU6050(bus)\n"+
                                                            "  mpu6050.initialize()\n"+
                                                            "  return mpu6050";
  }                                                           
}

Blockly.Python.htu21d_init= function ()
{
  if (!Blockly.Python.definitions_['htu21d_init'])
  {
    Blockly.Python.definitions_['htu21d_init'] = "def htu21d_init():\n"+
                                                            "  htu21d=HTU21D(bus)\n"+
                                                            "  htu21d.initialize()\n"+
                                                            "  return htu21d";
  }                                                           
}

Blockly.Python.Adafruit_24bar_init= function ()
{
  if (!Blockly.Python.definitions_['Adafruit_24bar_init'])
  {
    Blockly.Python.definitions_['Adafruit_24bar_init'] = "def Adafruit_24bar_init(bus):\n"+
                                                            " ada_24bar=Adafruit_24bargraph()\n"+
                                                            " ada_24bar.begin(bus)\n"+
                                                            " for i in range (0 ,24):\n"+
                                                            "   ada_24bar.setBar(i, LED_OFF)\n"+
                                                            "   ada_24bar.writeDisplay()\n"+
                                                            " return ada_24bar";
  }                                                           
}



Blockly.Python['sevensegmdispl_setup'] = function(block) {
  Blockly.Python.wiringpi();
  var value_inverse = block.getFieldValue ('inverse');  
  var value_seg_a = Blockly.Python.valueToCode(block, 'seg_a', Blockly.Python.ORDER_ATOMIC);
  var value_seg_b = Blockly.Python.valueToCode(block, 'seg_b', Blockly.Python.ORDER_ATOMIC);
  var value_seg_c = Blockly.Python.valueToCode(block, 'seg_c', Blockly.Python.ORDER_ATOMIC);
  var value_seg_d = Blockly.Python.valueToCode(block, 'seg_d', Blockly.Python.ORDER_ATOMIC);
  var value_seg_e = Blockly.Python.valueToCode(block, 'seg_e', Blockly.Python.ORDER_ATOMIC);
  var value_seg_f = Blockly.Python.valueToCode(block, 'seg_f', Blockly.Python.ORDER_ATOMIC);
  var value_seg_g = Blockly.Python.valueToCode(block, 'seg_g', Blockly.Python.ORDER_ATOMIC);
  var value_seg_dp = Blockly.Python.valueToCode(block, 'seg_dp', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (value_seg_a, 1);
  Blockly.Python.setpinmode (value_seg_b, 1);
  Blockly.Python.setpinmode (value_seg_c, 1);
  Blockly.Python.setpinmode (value_seg_d, 1);
  Blockly.Python.setpinmode (value_seg_e, 1);
  Blockly.Python.setpinmode (value_seg_f, 1);
  Blockly.Python.setpinmode (value_seg_g, 1);
  Blockly.Python.setpinmode (value_seg_dp, 1);
  var code = "["+value_inverse+', '+value_seg_a+', '+value_seg_b+', '+value_seg_c+', '+value_seg_d+', '+value_seg_e+', '+value_seg_f+', '+value_seg_g+', '+value_seg_dp+']';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['sevensegmdispl_display'] = function(block) {
  Blockly.Python.sevenSegment();
  var value_tobedispl = Blockly.Python.valueToCode(block, 'tobedispl', Blockly.Python.ORDER_ATOMIC);
  var value_ssd = Blockly.Python.valueToCode(block, 'ssd', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "display("+value_ssd+", str("+value_tobedispl+"))"+"\n";
  return code;
};






Blockly.Python['adafruit_7segment_begin'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.Adafruit_7segment_init();
  // TODO: Assemble Python into code variable.
  var code = "Adafruit_7segment_init(112)";
 return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['adafruit_24bar_begin'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.Adafruit_24bar_init();
  var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "Adafruit_24bar_init("+value_bus+")";
 return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['adafruit_24bar_color'] = function(block) {
  Blockly.Python.wiringpi ();

  var value_24bar = Blockly.Python.valueToCode(block, '24bar', Blockly.Python.ORDER_ATOMIC);
  var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
  var dropdown_color = block.getFieldValue('color');
  // TODO: Assemble Python into code variable.
  var code = value_24bar+'.setBar('+value_led+','+dropdown_color+')\n';
  return code;
};

Blockly.Python['bmp180_get_pressure'] = function(block) {
  Blockly.Python.bmp180_init ();
  // TODO: Assemble Python into code variable.
  var code =Blockly.Python.bmp180_device+'.getPressure()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}

Blockly.Python['bmp180_get_temperature'] = function(block) {
  Blockly.Python.bmp180_init ();
  // TODO: Assemble Python into code variable.
  var code =Blockly.Python.bmp180_device+'.getTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
}



Blockly.Python['adafruit_writeDisplay'] = function(block) {
  var value_adafruit = Blockly.Python.valueToCode(block, 'adafruit', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code =value_adafruit+'.writeDisplay()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};


Blockly.Python['adafruit_7segment_print'] = function(block) {
  Blockly.Python.wiringpi ();

  var value_7seg = Blockly.Python.valueToCode(block, '7seg', Blockly.Python.ORDER_ATOMIC);
  var value_nr = Blockly.Python.valueToCode(block, 'nr', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  // TODO: Assemble Python into code variable.
  var code = value_7seg+'._print('+value_nr+','+dropdown_type+')\n';
  return code;
};


Blockly.Python['mpu6050_setup'] = function(block) {
  Blockly.Python.wiringpi ();
  Blockly.Python.mpu6050_init();
  var value_address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'mpu6050_init('+value_address+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getAccX'] = function(block) {
  var value_accelerom = Blockly.Python.valueToCode(block, 'accelerom', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerom+'.getAccelerationX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getAccY'] = function(block) {
  var value_acceleromy = Blockly.Python.valueToCode(block, 'acceleromy', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_acceleromy+'.getAccelerationY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getAccZ'] = function(block) {
  var value_acceleromz = Blockly.Python.valueToCode(block, 'acceleromz', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_acceleromz+'.getAccelerationZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getTemp'] = function(block) {
  var value_acceleromt = Blockly.Python.valueToCode(block, 'acceleromt', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_acceleromt+'.getTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getRotX'] = function(block) {
  var value_acceleromm = Blockly.Python.valueToCode(block, 'acceleromm', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_acceleromm+'.getRotationX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getRotY'] = function(block) {
  var value_accelerommy = Blockly.Python.valueToCode(block, 'accelerommy', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerommy+'.getRotationY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mpu6050_getRotZ'] = function(block) {
  var value_accelerommz = Blockly.Python.valueToCode(block, 'accelerommz', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerommz+'.getRotationZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['htu21d_setup'] = function(block) {
  Blockly.Python.wiringpi ();
  // TODO: Assemble Python into code variable.
  var code = 'HTU21D()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['htu21d_getHum'] = function(block) {
  var value_humidity = Blockly.Python.valueToCode(block, 'humidity', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_humidity+'.readHumidity()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['htu21d_getTem'] = function(block) {
  var value_hum = Blockly.Python.valueToCode(block, 'hum', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_hum+'.readTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};