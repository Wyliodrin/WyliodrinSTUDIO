Blockly.JavaScript.grove = function ()
{
  Blockly.JavaScript.wiringpi();
  if (!Blockly.visual.grove_pins)
  {
    Blockly.visual.grove_pins = Blockly.JavaScript.variableDB_.getDistinctName('grove', Blockly.Generator.NAME_TYPE);
  }
  var grovepins = Blockly.visual.grove_pins;
  Blockly.JavaScript.grovepins = grovepins;
  Blockly.JavaScript.function_init ('grove', 'if ('+Blockly.visual.prefix_init+'process.env.wyliodrin_board == "raspberrypi") { '+grovepins+' = 300; '+Blockly.JavaScript.wyliodrin+'.grovepiSetup ('+grovepins+', 4); } else { '+grovepins+' = 0; } ');
}

Blockly.JavaScript.ledbar_setup = function (d)
{
  if (!Blockly.JavaScript.definitions_['grove_ledbar_'+d])
  {
    var ledbar = Blockly.visual.prefix_init+Blockly.JavaScript.variableDB_.getDistinctName('ledbar'+d, Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.ledbar = ledbar;
    Blockly.JavaScript.definitions_['grove_ledbar_'+d] = 'if (!'+ledbar+') '+ledbar+' = new '+Blockly.JavaScript.wyliodrin+'.LED_Bar('+Blockly.JavaScript.grovepins+'+'+d+"+1"+", "+Blockly.JavaScript.grovepins+'+'+d+');\n'
  }
}


Blockly.JavaScript.colors = function ()
{
  if (!Blockly.JavaScript.definitions_['color2rgb'])
  {
    Blockly.JavaScript.definitions_['color2rgb'] = 'function colorToRGB(color)\n'+'{\n'+'  var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(color);\n'+'  return result ? {\n'+'    r: parseInt(result[1], 16),\n'+'    g: parseInt(result[2], 16),\n'+'    b: parseInt(result[3], 16)\n'+'  } : null;\n'+'}';//de verificat pe placa
  }
  if (!Blockly.JavaScript.definitions_['basic_color'])
  {
    Blockly.JavaScript.definitions_['basic_color'] = 'function basic_color(color)\n'+'{\n'+'  var value = 0;\n'+'  if(color>=128)\n'+'    value = 1;\n'+'  else\n'+'    value = 0;\n'+'  return value;\n'+'}';//de testat
  }
}
// Blockly.JavaScript.setpinmode = function (pin, mode)
// {
//   if (!isNaN (parseInt(pin)))
//   {
    
//       if (Blockly.JavaScript.definitions_['pin_mode_in_'+pin]) 'print "Pin '+pin+' is used to input and output."';
//       if (!Blockly.JavaScript.definitions_['pin_mode_out_'+pin]) Blockly.JavaScript.definitions_['pin_mode_out_'+pin] = 'pinMode ('+pin+', '+mode+');\n';
//   }
// }

// Blockly.JavaScript.buttons_initial_value= function (button)
// {
//   if (!isNaN(parseInt(button)))
//   {
//     if (!Blockly.JavaScript.definitions_['buttons_initial_value_'+button])
//     {
//       Blockly.JavaScript.definitions_['buttons_initial_value_'+button] = Blockly.JavaScript.buttons+'['+button+'] = digitalRead ('+button+')\n';
//     }
//   }
// }


// Blockly.JavaScript.buttons_switched = function ()
// {
//   if (!Blockly.JavaScript.definitions_['buttons_switched'])
//   {
//     var buttons = Blockly.JavaScript.variableDB_.getDistinctName(
//         'buttons', Blockly.Generator.NAME_TYPE);
//     Blockly.JavaScript.definitions_['buttons_variable'] = buttons+' = []\n';
//     Blockly.JavaScript.buttons = buttons;
//     Blockly.JavaScript.definitions_['buttons_switched'] = 'function buttonSwitched(button, expectedValue)\n'+'{\n'+
//                             '  var value = '+Blockly.JavaScript.wyliodrin+'.digitalRead (button);\n'+//prefixez functiile cu wyliodrin (vezi import) 
//                             '  var stable = true;\n'+
//                             '  for(var i=0;i<100;i++)\n'+
//           '  {\n'+
//                             '    var valuenext = wyliodrin.digitalRead (button);\n'+
//                             '    if(value!=valuenext)\n'+
//                             '      stable = false;\n'+
//                             '    if(stable)\n'+
//                             '      if(value!=buttons[button])\n'+
//           '      {\n'+
//                             '        buttons[button]=value;\n'+
//                             '        return value == expectedValue;\n'+
//           '      }\n'+
//                             '      else\n'+
//                             '        return false;\n'+
//           '   }\n'+
//                             '    return false;\n'+
//           '}';
//   }
// }

// Blockly.JavaScript.mapSetup = function ()
// {
//   if (!Blockly.JavaScript.definitions_['mapSetup'])
//   {
//     Blockly.JavaScript.definitions_['mapSetup'] = 'function mapFunction(value, fromLow, fromHigh, toLow, toHigh){\n'+
//                           "  var fromDiff = fromHigh - fromLow;\n"+
//                           "  var toDiff = toHigh - toLow;\n"+
//                           "  var ratio = toDiff / fromDiff;\n"+
//                           "  return toLow + (value - fromLow) * ratio;\n"+
//                           "}"
//                             ;
//   }
// }

// Blockly.JavaScript.soundSensorSetup = function ()
// {
//   if (!Blockly.JavaScript.definitions_['ss_setup'])
//     {
//       var auxSS = Blockly.JavaScript.variableDB_.getDistinctName('ss_var', Blockly.Generator.NAME_TYPE);
//       Blockly.JavaScript.SSVar = auxSS;
//     }
// }

// Blockly.JavaScript.temperatureSensorSetup = function ()
// {
//   if (!Blockly.JavaScript.definitions_['ts_setup'])
//     {
//       var auxTS = Blockly.JavaScript.variableDB_.getDistinctName('ts_var', Blockly.Generator.NAME_TYPE);
//       Blockly.JavaScript.TSVar = auxTS;
//     }
// }

// Blockly.JavaScript.lightSensorSetup = function ()
// {
//   if (!Blockly.JavaScript.definitions_['ls_setup'])
//     {
//       var auxLS = Blockly.JavaScript.variableDB_.getDistinctName('ls_var', Blockly.Generator.NAME_TYPE);
//       Blockly.JavaScript.LSVar = auxLS;
//     }
// }


Blockly.JavaScript.getDegrees = function ()
{
  if (!Blockly.JavaScript.definitions_['getDegrees'])
  {
    Blockly.JavaScript.definitions_['getDegrees'] = 'function getDegrees(pin){\n'+
                          "  var value = "+Blockly.JavaScript.wyliodrin+".analogRead (pin);\n"+
                          "  var degrees = map(value, 0, 1023, 0, 300);\n"+
                          "  return degrees;\n"+
                          "}"
                            ;
  }
}

Blockly.JavaScript.LCDSet = function(row, column)
{
  // var l = Blockly.visual.prefix_init+Blockly.JavaScript.variableDB_.getDistinctName('lcd_grove', Blockly.Generator.NAME_TYPE);
  Blockly.JavaScript.LCD = Blockly.JavaScript.variable_init ('lcd_grove', 'new '+Blockly.JavaScript.wyliodrin+'.rgb_lcd();#lcd_grove#.begin('+column+', '+row+')');
  // Blockly.JavaScript.definitions_['LCDSet'] = 'if (!'+Blockly.JavaScript.LCD+') '+Blockly.JavaScript.LCD+' = new '+Blockly.JavaScript.wyliodrin+'.rgb_lcd();\n';
}

Blockly.JavaScript.BSet = function()
{
  if(!Blockly.JavaScript.definitions_['setB'])
  {
    var b = Blockly.JavaScript.variableDB_.getDistinctName('B', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.B = b;
     Blockly.JavaScript.definitions_['setB'] = Blockly.JavaScript.B+" = 3975;                  //B value of the thermistor\n";
  }
}


Blockly.JavaScript.getTemperature = function()
{
  if(!Blockly.JavaScript.definitions_['getTemperature'])
  {
    Blockly.JavaScript.definitions_['getTemperature'] = "function getTemperature (value){\n"+
                                                "  if (value==0) value=0.0001;\n"+
                                                "  value =(1023-value)*10000/value;\n"+
                                                "  var celsius=Math.round((1/(Math.log(value/10000.0)/"+Blockly.JavaScript.B+"+1/298.15)-273.15)*100)/100;\n"+
                                                "  return celsius;\n"+
                                                "}";
  }
}

Blockly.JavaScript.getTemperatureInFahrenheit = function()
{
  if(!Blockly.JavaScript.definitions_['getTemperatureInFahrenheit'])
  {
    Blockly.JavaScript.definitions_['getTemperatureInFahrenheit'] = "function getTemperatureInFahrenheit (value){\n"+
                                                "  if (value==0) value=0.0001;\n"+
                                                "  value =(1023-value)*10000/value;\n"+
                                                "  var celsius=Math.round((1/(Math.log(value/10000.0)/"+Blockly.JavaScript.B+"+1/298.15)-273.15)*100)/100;\n"+
                                                "  var fahrenheit = celsius*1.8 + 32;\n"+
                                                "  return fahrenheit;\n"+
                                                "}";
  }
}

Blockly.JavaScript.ServoSetup = function(index)
{
  if(!Blockly.JavaScript.definitions_['s'+index])
  {
    var s = Blockly.visual.prefix_init+Blockly.JavaScript.variableDB_.getDistinctName('servo'+index, Blockly.Generator.NAME_TYPE);
    if(!Blockly.JavaScript.Servo)
      Blockly.JavaScript.Servo = [];
    Blockly.JavaScript.Servo[index] = s;
    Blockly.JavaScript.definitions_['s'+index] = 'if (!'+Blockly.JavaScript.Servo[index]+') {\n  '+Blockly.JavaScript.Servo[index]+" = new "+Blockly.JavaScript.wyliodrin+".Servo();\n"+
                                                  '  '+Blockly.JavaScript.Servo[index]+".attach ("+index+", 544, 2400);\n}\n";
  }
}

Blockly.JavaScript.alcoholSetup = function ()
{
  if (!Blockly.JavaScript.definitions_['alcoholSetup'])
  {
    Blockly.JavaScript.definitions_['alcoholSetup'] = 'function getAlcohol(pin){\n'+
                          "  "+Blockly.JavaScript.wyliodrin+".digitalWrite( pin+1, 0 );\n"+
                          "  var value = "+Blockly.JavaScript.wyliodrin+".analogRead(pin);\n"+
                          "  return 1023 - value;\n"+
                          "}"
                            ;
  }
}

Blockly.JavaScript.heaterSetup = function (pin)
{
  if (!Blockly.JavaScript.definitions_['heaterSetup'])
  {
    Blockly.JavaScript.definitions_['heaterSetup'] = Blockly.JavaScript.wyliodrin+".digitalWrite("+pin+"+1, 1);\n";
  }
}


Blockly.JavaScript.uvSetup = function ()
{
  if (!Blockly.JavaScript.definitions_['uvSetup'])
  {
    Blockly.JavaScript.definitions_['uvSetup'] = 'function getUV(pin){\n'+
                          "  var sum = 0;\n"+
                          "  for(var i=0; i<1024; i++){\n"+
                          "    var value = "+Blockly.JavaScript.wyliodrin+".analogRead(pin);\n"+
                          "    sum  = value + sum;\n"+
                          "  }\n"+
                          "  sum = sum/1024.0;\n"+
                          "  return sum;\n"+
                          "}\n" 
                            ;
  }
}

Blockly.JavaScript['grove_setpin'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_hl = block.getFieldValue('value_hl');
  var dropdown_value_pin = block.getFieldValue('value_pin');
  Blockly.JavaScript.setpinmode (dropdown_value_pin, 1);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pin+', '+dropdown_value_hl+');\n';
  return code;
};

Blockly.JavaScript['grove_readpin'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinr, 0);
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_readanalog'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_analogpin = block.getFieldValue('value_analogPin');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_analogpin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_setpwm'] = function(block) {
  Blockly.JavaScript.grove();
  var value_value_pwm = Blockly.JavaScript.valueToCode(block, 'value_pwm', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_value_pwmpin = block.getFieldValue('value_pwmPin');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogWrite ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pwmpin+', '+value_value_pwm+')\n';
  return code;
};



Blockly.JavaScript['grove_ooled'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  var dropdown_led_value = block.getFieldValue('led_value');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinr, 1);
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinr+', '+dropdown_led_value+');\n';
  return code;
};

Blockly.JavaScript['grove_ledbrightness'] = function(block) {
  Blockly.JavaScript.grove();
  var value_led_brvalue = Blockly.JavaScript.valueToCode(block, 'led_brValue', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+".analogWrite("+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinr+", "+value_led_brvalue+");\n";
  return code;
};



Blockly.JavaScript['grove_button'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_hl = block.getFieldValue('value_hl');
  var dropdown_value_pinb = block.getFieldValue('value_pinB');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinb, 0);
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinb+') == '+dropdown_value_hl;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_buttonsw'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_hlsw = block.getFieldValue('value_hlsw');
  var dropdown_value_pinrs = block.getFieldValue('value_pinRS');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinrs, 0);
  Blockly.JavaScript.buttons_switched ();
  Blockly.JavaScript.buttons_initial_value (dropdown_value_pinrs);
  var code = 'buttonSwitched('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinrs+', '+dropdown_value_hlsw+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['grove_ras'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_apin = block.getFieldValue('value_aPin');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.getDegrees();
  var code = 'getDegrees ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_apin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['grove_buzzerhl'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_buzzerhl = block.getFieldValue('value_buzzerhl');
  var dropdown_value_pinbuzz = block.getFieldValue('value_pinBuzz');
  Blockly.JavaScript.setpinmode (dropdown_value_pinbuzz, 1);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinbuzz+', '+dropdown_value_buzzerhl+');\n';
  return code;
};

Blockly.JavaScript['grove_buzzervol'] = function(block) {
  Blockly.JavaScript.grove();
  var value_volVar = Blockly.JavaScript.valueToCode(block, 'volVar', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_value_apinb = block.getFieldValue('value_aPinB');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+".analogWrite("+Blockly.JavaScript.grovepins+'+'+dropdown_value_apinb+", "+value_volVar+");\n";
  return code;
};



Blockly.JavaScript['grove_touch'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_tpin = block.getFieldValue('value_tPin');
  var dropdown_value_tu = block.getFieldValue('value_tu');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_tpin, 0);
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+Blockly.JavaScript.grovepins+'+'+dropdown_value_tpin+') == '+dropdown_value_tu;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_touchsw'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_hlsw = block.getFieldValue('value_hlsw');
  var dropdown_value_pinrs = block.getFieldValue('value_pinRS');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinrs, 0);
  Blockly.JavaScript.buttons_switched ();
  Blockly.JavaScript.buttons_initial_value (dropdown_value_pinrs);
  var code = 'buttonSwitched('+Blockly.JavaScript.grovepins+'+'+dropdown_value_pinrs+', '+dropdown_value_hlsw+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};




Blockly.JavaScript['grove_sounds'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_sspin = block.getFieldValue('value_ssPin');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead('+Blockly.JavaScript.grovepins+'+'+dropdown_value_sspin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['grove_temperatures'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_tspin = block.getFieldValue('value_tsPin');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.BSet();
  Blockly.JavaScript.getTemperature();
  var code = 'getTemperature ('+Blockly.JavaScript.wyliodrin+".analogRead ("+Blockly.JavaScript.grovepins+'+'+dropdown_value_tspin+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['grove_temperaturef'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_temperaturef = block.getFieldValue('temperatureF');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.BSet();
  Blockly.JavaScript.getTemperatureInFahrenheit();
  var code = 'getTemperatureInFahrenheit ('+Blockly.JavaScript.wyliodrin+".analogRead ("+Blockly.JavaScript.grovepins+'+'+dropdown_temperaturef+'))';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_temperatures_aux'] = function(block) {
  var value_aux = Blockly.JavaScript.valueToCode(block, 'aux', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.BSet();
  Blockly.JavaScript.getTemperature();
  var code = 'getTemperature ('+value_aux+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['grove_lights'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_lspin = block.getFieldValue('value_lsPin');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead('+Blockly.JavaScript.grovepins+'+'+dropdown_value_lspin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['grove_lcdbegin'] = function(block) {
  if(!Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    var dropdown_value_row = block.getFieldValue('value_row');
    var dropdown_value_column = block.getFieldValue('value_column');
    Blockly.JavaScript.LCDSet(dropdown_value_row, dropdown_value_column);
  }
    var code = '';
    return code;
};

Blockly.JavaScript['grove_lcdprint'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.print(String('+value_message+'));\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdisplay'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.display();\n';
    return code;
    }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdisplayoff'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.noDisplay();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdblinkon'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.blink();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdblinkoff'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.noBlink();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdcursor'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.cursor();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdnocursor'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.noCursor();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdscrolll'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.scrollDisplayLeft();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdscrollr'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.scrollDisplayRight();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdtdrl'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.rightToLeft();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdtdlr'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.leftToRight();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdautos'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.autoscroll();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdnoautos'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.noAutoscroll();\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_lcdsetcursor'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    var value_value_cursorrow = Blockly.JavaScript.valueToCode(block, 'value_cursorRow', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value_cursorcolumn = Blockly.JavaScript.valueToCode(block, 'value_cursorColumn', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = Blockly.JavaScript.LCD+'.setCursor('+value_value_cursorcolumn+','+value_value_cursorrow+');\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript.colorSetup = function ()
{
  if (!Blockly.JavaScript.definitions_['color_setup'])
    {
      var color = Blockly.JavaScript.variableDB_.getDistinctName('color', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.colorValue = color;
    }
}


Blockly.JavaScript['grove_lcdcolor'] = function(block) {
  if(Blockly.JavaScript.definitions_['lcd_grove'])
  {
    Blockly.JavaScript.grove();
    var value_value_color = Blockly.JavaScript.valueToCode(block, 'value_color', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    Blockly.JavaScript.colorSetup();
    if (!Blockly.JavaScript.definitions_['color2rgb'])
    {
      Blockly.JavaScript.definitions_['color2rgb'] = 'function colorToRGB(color)\n'+'{\n'+'  var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(color);\n'+'  return result ? {\n'+'    r: parseInt(result[1], 16),\n'+'    g: parseInt(result[2], 16),\n'+'    b: parseInt(result[3], 16)\n'+'  } : null;\n'+'}';
    }
    var code = "var "+Blockly.JavaScript.colorValue+" = colorToRGB("+value_value_color+");\n"+
    Blockly.JavaScript.LCD+".setRGB("+Blockly.JavaScript.colorValue+".r, "+Blockly.JavaScript.colorValue+".g, "+Blockly.JavaScript.colorValue+'.b);\n';
    return code;
  }
  else
  {
    var code = 'console.log("LCD not initialised");\n';
    return code;
  }
};

Blockly.JavaScript['grove_relay'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_pin = block.getFieldValue('value_pin');
  var dropdown_value_relay = block.getFieldValue('value_relay');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pin, 1);
  var code = Blockly.JavaScript.wyliodrin+'.digitalWrite('+dropdown_value_pin+', '+dropdown_value_relay+');\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.JavaScript['grove_readrelay'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_value_pinr = block.getFieldValue('value_pinR');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_value_pinr, 0);
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+dropdown_value_pinr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_servo'] = function(block) {
  Blockly.JavaScript.grove();
  //Blockly.JavaScript.ServoSetup();
  var value_value_servo = Blockly.JavaScript.valueToCode(block, 'value_servo', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_value_servopin = block.getFieldValue('value_servopin');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.ServoSetup(Blockly.JavaScript.grovepins+'+'+dropdown_value_servopin);
  var code = Blockly.JavaScript.Servo[Blockly.JavaScript.grovepins+'+'+dropdown_value_servopin]+".write("+value_value_servo+");\n";
  return code;
};

Blockly.JavaScript['grove_alcoholsensor'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode(dropdown_pinvalue+1, 1);
  Blockly.JavaScript.heaterSetup(dropdown_pinvalue+1);
  Blockly.JavaScript.alcoholSetup();
  var code = 'getAlcohol('+Blockly.JavaScript.grovepins+'+'+dropdown_pinvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_motionsensor'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.setpinmode (dropdown_pinvalue, 0);
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead ('+Blockly.JavaScript.grovepins+'+'+dropdown_pinvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_ledbar'] = function(block) {
  Blockly.JavaScript.grove();
  //Blockly.JavaScript.ledBarImport();
  // var value_clk = Blockly.JavaScript.valueToCode(block, 'clk', Blockly.JavaScript.ORDER_ATOMIC);
  // var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pinvalue = block.getFieldValue('pinValue');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.setpinmode (dropdown_pinvalue, 1);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.ledbar_setup(dropdown_pinvalue);
  var code = Blockly.JavaScript.ledbar+".setLevel("+value_value+");\n";
  return code;
};

Blockly.JavaScript['grove_uvsensor'] = function(block) {
  Blockly.JavaScript.grove();
  Blockly.JavaScript.uvSetup();
  var dropdown_uvvalue = block.getFieldValue('uvValue');
  // TODO: Assemble JavaScript into code variable.
  var code = 'getUV('+Blockly.JavaScript.grovepins+'+'+dropdown_uvvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_vibrationsensor'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_vibrationvalue = block.getFieldValue('vibrationValue');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead('+Blockly.JavaScript.grovepins+'+'+dropdown_vibrationvalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['grove_moisturesensor'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_moisturevalue = block.getFieldValue('moistureValue');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.analogRead('+Blockly.JavaScript.grovepins+'+'+dropdown_moisturevalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['grove_watersensor'] = function(block) {
  Blockly.JavaScript.grove();
  var dropdown_watervalue = block.getFieldValue('waterValue');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.wyliodrin+'.digitalRead('+Blockly.JavaScript.grovepins+'+'+dropdown_watervalue+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};