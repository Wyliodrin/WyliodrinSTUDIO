Blockly.Python.grove = function ()
{
  Blockly.Python.wiringpi();
  if (!Blockly.Python.definitions_['import_os'])
  {
   Blockly.Python.definitions_['import_os'] = 'import os\n'; 
  }
  if (!Blockly.Python.definitions_['grove_pins'])
  {
    var grovepins = Blockly.Python.variableDB_.getDistinctName('grove', Blockly.Generator.NAME_TYPE);
    Blockly.Python.grovepins = grovepins;
    Blockly.Python.definitions_['grove_pins'] = 'if os.getenv ("wyliodrin_board") == "raspberrypi":\n  '+grovepins+' = 300\n  grovepiSetup ('+grovepins+', 4)\nelse:\n  '+grovepins+' = 0\n';
  }
}

Blockly.Python.ledbar_setup = function (d)
{
  if (!Blockly.Python.definitions_['grove_ledbar_'+d])
  {
    var ledbar = Blockly.Python.variableDB_.getDistinctName('ledbar'+d, Blockly.Generator.NAME_TYPE);
    Blockly.Python.ledbar = ledbar;
    Blockly.Python.definitions_['grove_ledbar_'+d] = ledbar+' = LED_Bar('+Blockly.Python.grovepins+'+'+d+"+1"+", "+Blockly.Python.grovepins+'+'+d+');\n'
  }
}

Blockly.Python.mathSetup = function()
{
  if(!Blockly.Python.definitions_['import_math'])
  {
    Blockly.Python.definitions_['import_math'] = 'from math import *\n';
  }
}

Blockly.Python.getDegrees = function ()
{
	if (!Blockly.Python.definitions_['getDegrees'])
	{
		Blockly.Python.definitions_['getDegrees'] = 'def getDegrees (pin):\n'+
													"  value = analogRead (pin)\n"+
													"  degrees = map(value, 0, 1023, 0, 300)\n"+
													"  return degrees"
														;
	}
}

Blockly.Python.BSet = function()
{
  if(!Blockly.Python.definitions_['setB'])
  {
    var b = Blockly.Python.variableDB_.getDistinctName('B', Blockly.Generator.NAME_TYPE);
    Blockly.Python.B = b;
    Blockly.Python.definitions_['setB'] = Blockly.Python.B+" = 3975         #B value of the thermistor\n";
  }
}

Blockly.Python.getTemperature = function()
{
  if(!Blockly.Python.definitions_['getTemperature'])
  {
    Blockly.Python.definitions_['getTemperature'] = "def getTemperature (value):\n"+
                                                "  if value==0: value=0.0001\n"+
                                                "  value =(1023-value)*10000/value\n"+
                                                "  celsius=round(1/(log(value/10000.0)/"+Blockly.Python.B+"+1/298.15)-273.15,2)\n"+
                                                "  return celsius";
  }
}

Blockly.Python.getTemperatureInFahrenheit = function()
{
  if(!Blockly.Python.definitions_['getTemperatureInFahrenheit'])
  {
    Blockly.Python.definitions_['getTemperatureInFahrenheit'] = "def getTemperatureInFahrenheit (value):\n"+
                                                "  if value==0: value=0.0001\n"+
                                                "  value =(1023-value)*10000/value\n"+
                                                "  celsius=round(1/(log(value/10000.0)/"+Blockly.Python.B+"+1/298.15)-273.15,2)\n"+
                                                "  fahrenheit = celsius*1.8 + 32\n"+
                                                "  return fahrenheit";
  }
}


Blockly.Python.mapSetup = function ()
{
  if (!Blockly.Python.definitions_['mapSetup'])
  {
    Blockly.Python.definitions_['mapSetup'] = 'def mapFunction(value, fromLow, fromHigh, toLow, toHigh):\n'+
                          "  fromDiff = fromHigh - fromLow\n"+
                          "  toDiff = toHigh - toLow\n"+
                          "  ratio = toDiff / fromDiff\n"+
                          "  return toLow+(value-fromLow)*ratio"
                            ;
  }
}

Blockly.Python.getVolume = function ()
{
  Blockly.Python.mapSetup();
	if (!Blockly.Python.definitions_['getVolume'])
	{
		Blockly.Python.definitions_['getVolume'] = 'def volumeFunction(readValue):\n'+
													"  voltage = readValue*5/1023\n"+
													"  degree = voltage*300/5\n"+
													"  volume = mapFunction(degree, 0, 300, 0, 255)\n"+
													"  return volume\n"
														;
	}
}

Blockly.Python.mapServo = function ()
{
	if (!Blockly.Python.definitions_['mapServo'])
	{
		Blockly.Python.definitions_['mapServo'] = 'def servoMapFunction(readValue):\n'+
													"  shaft = map(readValue, 0, 1023, 0, 179)\n"+
													"  return shaft\n"
														;
	}
}

Blockly.Python.rasSetup = function ()
{
  if (!Blockly.Python.definitions_['ras_setup'])
    {
      var auxRas = Blockly.Python.variableDB_.getDistinctName('ras_var', Blockly.Generator.NAME_TYPE);
      Blockly.Python.rasVar = auxRas;
    }
}

Blockly.Python.soundSensorSetup = function ()
{
  if (!Blockly.Python.definitions_['ss_setup'])
    {
      var auxSS = Blockly.Python.variableDB_.getDistinctName('ss_var', Blockly.Generator.NAME_TYPE);
      Blockly.Python.SSVar = auxSS;
    }
}

Blockly.Python.temperatureSensorSetup = function ()
{
  if (!Blockly.Python.definitions_['ts_setup'])
    {
      var auxTS = Blockly.Python.variableDB_.getDistinctName('ts_var', Blockly.Generator.NAME_TYPE);
      Blockly.Python.TSVar = auxTS;
    }
}

Blockly.Python.lightSensorSetup = function ()
{
  if (!Blockly.Python.definitions_['ls_setup'])
    {
      var auxLS = Blockly.Python.variableDB_.getDistinctName('ls_var', Blockly.Generator.NAME_TYPE);
      Blockly.Python.LSVar = auxLS;
    }
}

Blockly.Python.alcoholSetup = function ()
{
  if (!Blockly.Python.definitions_['alcoholSetup'])
  {
    Blockly.Python.definitions_['alcoholSetup'] = 'def getAlcohol(pin):\n'+
                          //"  "+Blockly.Python.wyliodrin+".digitalWrite( pin+1, 0 )\n"+
                          "  digitalWrite( pin+1, 0 )\n"+
                          //"  value = "+Blockly.Python.wyliodrin+".analogRead(pin)\n"+
                          "  value = analogRead(pin)\n"+
                          "  return 1023 - value\n"
                            ;
  }
}

Blockly.Python.heaterSetup = function (pin)
{
  if (!Blockly.Python.definitions_['heaterSetup'])
  {
    Blockly.Python.definitions_['heaterSetup'] = "digitalWrite("+pin+"+1, 1);\n";
  }
}

Blockly.Python.uvSetup = function ()
{
  if (!Blockly.Python.definitions_['uvSetup'])
  {
    Blockly.Python.definitions_['uvSetup'] = 'def getUV(pin):\n'+
                          "  sum = 0\n"+
                          "  for i in range(0, 1024):\n"+
                          "    value = analogRead(pin)\n"+
                          "    sum  = value + sum\n"+
                          "  sum = sum/1024.0\n"+
                          "  return sum\n" 
                            ;
  }
}

Blockly.Python['grove_setpin'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_hl = block.getFieldValue('value_hl');
  var dropdown_value_pin = block.getFieldValue('value_pin');
  Blockly.Python.setpinmode (dropdown_value_pin, 1);
  // TODO: Assemble Python into code variable.
  var code = 'digitalWrite ('+Blockly.Python.grovepins+'+'+dropdown_value_pin+', '+dropdown_value_hl+')\n';
  return code;
};

Blockly.Python['grove_readpin'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pinr, 0);
  var code = 'digitalRead ('+Blockly.Python.grovepins+'+'+dropdown_value_pinr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_readanalog'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_analogpin = block.getFieldValue('value_analogPin');
  // TODO: Assemble Python into code variable.
  var code ='analogRead ('+Blockly.Python.grovepins+'+'+dropdown_value_analogpin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_setpwm'] = function(block) {
  Blockly.Python.grove();
  var value_value_pwm = Blockly.Python.valueToCode(block, 'value_pwm', Blockly.Python.ORDER_ATOMIC);
  var dropdown_value_pwmpin = block.getFieldValue('value_pwmPin');
  //Blockly.Python.setpinmode(dropdown_value_pwmpin, 1);
  // TODO: Assemble Python into code variable.
  var code = 'analogWrite ('+Blockly.Python.grovepins+'+'+dropdown_value_pwmpin+', '+value_value_pwm+')\n';
  return code;
};


Blockly.Python['grove_ooled'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  var dropdown_led_value = block.getFieldValue('led_value');
  Blockly.Python.setpinmode (dropdown_value_pinr, 1)
  // TODO: Assemble Python into code variable.
  var code = 'digitalWrite ('+Blockly.Python.grovepins+'+'+dropdown_value_pinr+', '+dropdown_led_value+')\n';
  return code;
};

Blockly.Python['grove_ledbrightness'] = function(block) {
  Blockly.Python.grove()
  var value_led_brvalue = Blockly.Python.valueToCode(block, 'led_brValue', Blockly.Python.ORDER_ATOMIC);
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  //Blockly.Python.setpinmode(dropdown_value_pinr, 1);
  // TODO: Assemble Python into code variable.
  var code = "analogWrite ("+Blockly.Python.grovepins+"+"+dropdown_value_pinr+", "+value_led_brvalue+")\n";
  return code;
};


Blockly.Python['grove_button'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_hl = block.getFieldValue('value_hl');
  var dropdown_value_pinb = block.getFieldValue('value_pinB');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pinb, 0)
  var code = 'digitalRead ('+Blockly.Python.grovepins+'+'+dropdown_value_pinb+') == '+dropdown_value_hl;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_buttonsw'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_hlsw = block.getFieldValue('value_hlsw');
  var dropdown_value_pinrs = block.getFieldValue('value_pinRS');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pinrs, 0);
  Blockly.Python.buttons_switched ();
  Blockly.Python.buttons_initial_value (dropdown_value_pinrs);
  // TODO: Assemble Python into code variable.
  var code = 'buttonSwitched ('+Blockly.Python.grovepins+'+'+dropdown_value_pinrs+', '+dropdown_value_hlsw+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['grove_ras'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_apin = block.getFieldValue('value_aPin');
  //Blockly.Python.setpinmode (dropdown_value_apin, 0)
  //Blockly.Python.rasSetup()
  // TODO: Assemble Python into code variable.
  //var code = Blockly.Python.rasVar+' = analogRead('+dropdown_value_apin+')';
  Blockly.Python.getDegrees();
  var code = 'getDegrees ('+Blockly.Python.grovepins+'+'+dropdown_value_apin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['grove_buzzerhl'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_buzzerhl = block.getFieldValue('value_buzzerhl');
  var dropdown_value_pinbuzz = block.getFieldValue('value_pinBuzz');
  Blockly.Python.setpinmode (dropdown_value_pinbuzz, 1);
  // TODO: Assemble Python into code variable.
  var code = 'digitalWrite ('+Blockly.Python.grovepins+'+'+dropdown_value_pinbuzz+', '+dropdown_value_buzzerhl+')\n';
  return code;
};

Blockly.Python['grove_buzzervol'] = function(block) {
  Blockly.Python.grove()
  var value_volVar = Blockly.Python.valueToCode(block, 'volVar', Blockly.Python.ORDER_ATOMIC);
  var dropdown_value_apinb = block.getFieldValue('value_aPinB');
  // TODO: Assemble Python into code variable.
  //Blockly.Python.getVolume();
  // var code = "volume = volumeFunction("+value_volVar+")\n"+ 
  // "analogWrite("+dropdown_value_apinb+", volume)";
  //Blockly.Python.setpinmode(dropdown_value_apinb, 1);
  var code = "analogWrite ("+Blockly.Python.grovepins+'+'+dropdown_value_apinb+", "+value_volVar+")\n";
  return code;
};



Blockly.Python['grove_touch'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_tpin = block.getFieldValue('value_tPin');
  var dropdown_value_tu = block.getFieldValue('value_tu');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_tpin, 0)
  var code = 'digitalRead ('+Blockly.Python.grovepins+'+'+dropdown_value_tpin+') == '+dropdown_value_tu;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_touchsw'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_hlsw = block.getFieldValue('value_hlsw');
  var dropdown_value_pinrs = block.getFieldValue('value_pinRS');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pinrs, 0);
  Blockly.Python.buttons_switched ();
  Blockly.Python.buttons_initial_value (dropdown_value_pinrs);
  // TODO: Assemble Python into code variable.
  var code = 'buttonSwitched ('+Blockly.Python.grovepins+'+'+dropdown_value_pinrs+', '+dropdown_value_hlsw+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['grove_sounds'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_sspin = block.getFieldValue('value_ssPin');
  // TODO: Assemble Python into code variable.
  //Blockly.Python.setpinmode (dropdown_value_sspin, 0)
  //Blockly.Python.soundSensorSetup()
  var code = 'analogRead('+Blockly.Python.grovepins+'+'+dropdown_value_sspin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['grove_temperatures'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_tspin = block.getFieldValue('value_tsPin');
  // TODO: Assemble Python into code variable.
  //Blockly.Python.temperatureSensorSetup()
  Blockly.Python.mathSetup();
  Blockly.Python.BSet();
  Blockly.Python.getTemperature();
  var code = 'getTemperature (analogRead('+Blockly.Python.grovepins+'+'+dropdown_value_tspin+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_temperaturef'] = function(block) {
   Blockly.Python.grove();
  var dropdown_temperaturef = block.getFieldValue('temperatureF');
  // TODO: Assemble Python into code variable.
  Blockly.Python.mathSetup();
  Blockly.Python.BSet();
  Blockly.Python.getTemperatureInFahrenheit();
  var code = 'getTemperatureInFahrenheit(analogRead('+Blockly.Python.grovepins+'+'+dropdown_temperaturef+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_temperatures_aux'] = function(block) {
  var value_aux = Blockly.Python.valueToCode(block, 'aux', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.mathSetup();
  Blockly.Python.BSet();
  Blockly.Python.getTemperature();
  var code = 'getTemperature('+value_aux+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_lights'] = function(block) {
  Blockly.Python.grove()
  var dropdown_value_lspin = block.getFieldValue('value_lsPin');
  // TODO: Assemble Python into code variable.
  Blockly.Python.lightSensorSetup()
  var code = 'analogRead('+Blockly.Python.grovepins+'+'+dropdown_value_lspin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.LCDSet = function()
{
  if(!Blockly.Python.definitions_['LCDS'])
  {
    var l = Blockly.Python.variableDB_.getDistinctName('lcd', Blockly.Generator.NAME_TYPE);
    Blockly.Python.LCD = l;
  }
}


Blockly.Python['grove_lcdbegin'] = function(block) {
  if(!Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    Blockly.Python.LCDSet();
    var dropdown_value_row = block.getFieldValue('value_row');
    var dropdown_value_column = block.getFieldValue('value_column');
    Blockly.Python.definitions_['lcd'] = Blockly.Python.LCD+" = rgb_lcd()\n"+
                                          Blockly.Python.LCD+'.begin('+dropdown_value_column+', '+dropdown_value_row+')\n';
  }
  // TODO: Assemble Python into code variable.
  var code ='';
  return code;
};

Blockly.Python['grove_lcdprint'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.write(str('+value_message+'))\n';
    return code;
  }
  else
  {
    var code = 'print ("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdisplay'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.display()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdisplayoff'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.noDisplay()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdblinkon'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.blink()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdblinkoff'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.noBlink()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdcursor'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.cursor()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdnocursor'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.noCursor()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdscrolll'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.scrollDisplayLeft()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdscrollr'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.scrollDisplayRight()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdtdrl'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.rightToLeft()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdtdlr'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.leftToRight()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }  
};

Blockly.Python['grove_lcdautos'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.autoscroll()\n';
    return code;
    }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdnoautos'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.noAutoscroll()\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_lcdsetcursor'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    var value_value_cursorrow = Blockly.Python.valueToCode(block, 'value_cursorRow', Blockly.Python.ORDER_ATOMIC);
    var value_value_cursorcolumn = Blockly.Python.valueToCode(block, 'value_cursorColumn', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = Blockly.Python.LCD+'.setCursor('+value_value_cursorcolumn+','+value_value_cursorrow+')\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python.colorSetup = function ()
{
  if (!Blockly.Python.definitions_['color_setup'])
    {
      var color = Blockly.Python.variableDB_.getDistinctName('color', Blockly.Generator.NAME_TYPE);
      Blockly.Python.colorValue = color;
    }
}

Blockly.Python['grove_lcdcolor'] = function(block) {
  if(Blockly.Python.definitions_['lcd'])
  {
    Blockly.Python.grove();
    //Blockly.Python.LCDSet();
    var value_value_color = Blockly.Python.valueToCode(block, 'value_color', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    Blockly.Python.colorSetup();
    if (!Blockly.Python.definitions_['import_struct'])
    {
      Blockly.Python.definitions_['import_struct'] = 'import struct\n';
    }
    if (!Blockly.Python.definitions_['color2rgb'])
    {
      Blockly.Python.definitions_['color2rgb'] = 'def colorToRGB (color):\n  return struct.unpack (\'BBB\', color[1:].decode(\'hex\'))\n';
    }
    var code = Blockly.Python.colorValue+" = colorToRGB("+value_value_color+")\n"+
    Blockly.Python.LCD+".setRGB("+Blockly.Python.colorValue+"[0], "+Blockly.Python.colorValue+"[1], "+Blockly.Python.colorValue+'[2] )\n';
    return code;
  }
  else
  {
    var code = 'print("LCD not initialised")\n';
    return code;
  }
};

Blockly.Python['grove_relay'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_pin = block.getFieldValue('value_pin');
  var dropdown_value_relay = block.getFieldValue('value_relay');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pin, 1);
  var code = 'digitalWrite('+Blockly.Python.grovepins+'+'+dropdown_value_pin+', '+dropdown_value_relay+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['grove_readrelay'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_value_pinr, 0);
  var code = 'digitalRead ('+Blockly.Python.grovepins+'+'+dropdown_value_pinr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.ServoSetup = function(index)
{
  if(!Blockly.Python.definitions_['s'+index])
  {
    var s = Blockly.Python.variableDB_.getDistinctName('servo'+index, Blockly.Generator.NAME_TYPE);
    if(!Blockly.Python.Servo)
      Blockly.Python.Servo = [];
    Blockly.Python.Servo[index] = s;
    Blockly.Python.definitions_['s'+index] = Blockly.Python.Servo[index]+" = Servo()\n"+
                                                  Blockly.Python.Servo[index]+".attach ("+index+",544,2400)\n";
  }
}

// Blockly.Python.servoInit = function(index)
// {
//   if(!Blockly.Python.definitions_['servo_setup'+index])
//   {
//     Blockly.Python.definitions_['servo_setup'+index] =Blockly.Python.Servo[index]+" = Servo()\n"+
//                                                         Blockly.Python.Servo[index]+".attach("+index+")\n";
//   }
// }

Blockly.Python['grove_servo'] = function(block) {
  Blockly.Python.grove();
  var dropdown_value_servopin = block.getFieldValue('value_servopin');
  var value_value_servo = Blockly.Python.valueToCode(block, 'value_servo', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
 // Blockly.Python.setpinmode (dropdown_value_tpin, 1);
 Blockly.Python.ServoSetup(dropdown_value_servopin);
 //Blockly.Python.servoInit(dropdown_value_servopin);
 var code = Blockly.Python.Servo[dropdown_value_servopin]+".write ("+value_value_servo+")\n";
 // var code = '('+value_value_servo+')';
  return code;
};


Blockly.Python['grove_alcoholsensor'] = function(block) {
  Blockly.Python.grove();
  // TODO: Assemble Python into code variable.
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  Blockly.Python.setpinmode(dropdown_pinvalue+1, 1);
  Blockly.Python.heaterSetup(dropdown_pinvalue+1);
  Blockly.Python.alcoholSetup();
  var code = 'getAlcohol('+Blockly.Python.grovepins+'+'+dropdown_pinvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_motionsensor'] = function(block) {
  Blockly.Python.grove();
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_pinvalue, 0);
  var code = 'digitalRead('+Blockly.Python.grovepins+'+'+dropdown_pinvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_ledbar'] = function(block) {
  Blockly.Python.grove();
  //Blockly.Python.ledBarImport();
  // var value_clk = Blockly.Python.valueToCode(block, 'clk', Blockly.Python.ORDER_ATOMIC);
  // var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.setpinmode (dropdown_pinvalue, 1);
  // TODO: Assemble Python into code variable.
  Blockly.Python.ledbar_setup(dropdown_pinvalue);
  var code = Blockly.Python.ledbar+".setLevel("+value_value+");\n";
  return code;
};

Blockly.Python['grove_uvsensor'] = function(block) {
  Blockly.Python.grove();
  Blockly.Python.uvSetup();
  var dropdown_uvvalue = block.getFieldValue('uvValue');
  // TODO: Assemble Python into code variable.
  var code = 'getUV('+Blockly.Python.grovepins+'+'+dropdown_uvvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_vibrationsensor'] = function(block) {
  Blockly.Python.grove();
  var dropdown_vibrationvalue = block.getFieldValue('vibrationValue');
  // TODO: Assemble Python into code variable.
  var code = 'analogRead('+Blockly.Python.grovepins+'+'+dropdown_vibrationvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_moisturesensor'] = function(block) {
  Blockly.Python.grove();
  var dropdown_moisturevalue = block.getFieldValue('moistureValue');
  // TODO: Assemble Python into code variable.
  var code = 'analogRead('+Blockly.Python.grovepins+'+'+dropdown_moisturevalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['grove_watersensor'] = function(block) {
  Blockly.Python.grove();
  var dropdown_watervalue = block.getFieldValue('waterValue');
  // TODO: Assemble Python into code variable.
  Blockly.Python.setpinmode (dropdown_watervalue, 0);
  var code = 'digitalRead('+Blockly.Python.grovepins+'+'+dropdown_watervalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
