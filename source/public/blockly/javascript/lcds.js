
Blockly.JavaScript.lcdDisplay = function()
{
  if(!Blockly.JavaScript.definitions_['lcdDisplay'])
  {
    var l = Blockly.JavaScript.variableDB_.getDistinctName('lcd', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.LCD = l;
    Blockly.JavaScript.definitions_['lcdDisplay'] = "var "+Blockly.JavaScript.LCD+';\n';
  }
}

Blockly.JavaScript.lcdSPIDisplay = function(cs, dc, mosi, sclk, rst)
{
  if(!Blockly.JavaScript.definitions_['lcdSPIDisplay'])
  {
    var l = Blockly.JavaScript.variableDB_.getDistinctName('lcdSPIDisplay', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.LCDSpi = l;
    Blockly.JavaScript.definitions_['lcdSPIDisplay'] = Blockly.JavaScript.LCDSpi+' = new '+Blockly.JavaScript.wyliodrin+'.Adafruit_ST7735('+cs+", "+dc+", "+mosi+", "+sclk+", "+rst+');\n';
  }
}

Blockly.JavaScript.lcdAtr = function(lcd)
{
    var l = Blockly.JavaScript.variableDB_.getDistinctName('lcd', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.LCD = l;
    Blockly.JavaScript.definitions_['lcdDisplay'] = "var "+Blockly.JavaScript.LCD+' = '+lcd+';\n';
}

Blockly.JavaScript.lcdEqual = function(lcd)
{
    var l = Blockly.JavaScript.variableDB_.getDistinctName('lcdSPIDisplay', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.LCDSpi = l;
    Blockly.JavaScript.definitions_['lcdSPIDisplay'] = lcd+' = '+Blockly.JavaScript.LCDSpi+';\n';
    //lcd+' = '+globalVar+';\n';
}

Blockly.JavaScript.spiLcdAtr = function(lcd, globalVar)
{
    globalVar+' = '+lcd+';\n';
}

Blockly.JavaScript.spiLcdEqual = function(lcd, globalVar)
{
    lcd+' = '+globalVar+';\n';
}

Blockly.JavaScript.colorSetup = function ()
{
  if (!Blockly.JavaScript.definitions_['color_setup'])
    {
      var color = Blockly.JavaScript.variableDB_.getDistinctName('color', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.colorValue = color;
      var newColor = Blockly.JavaScript.variableDB_.getDistinctName('newColor', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.newColor = newColor;
    }
}

Blockly.JavaScript.bgColorSetup = function ()
{
  if (!Blockly.JavaScript.definitions_['bgColor_setup'])
    {
      var bgColor = Blockly.JavaScript.variableDB_.getDistinctName('bgColor', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.bgColorValue = bgColor;
      var newBgColor = Blockly.JavaScript.variableDB_.getDistinctName('newBgColor', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.newBgColor = newBgColor;
    }
}

Blockly.JavaScript.colors = function ()
{
  if (!Blockly.JavaScript.definitions_['import_struct'])
  {
    //Blockly.JavaScript.definitions_['import_struct'] = 'import struct;\n';
  }
  if (!Blockly.JavaScript.definitions_['color2rgb'])
  {
    Blockly.JavaScript.definitions_['color2rgb'] = 'function colorToRGB(color)\n'+
                                                    '{\n'+
                                                    '  var result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(color);\n'+
                                                    '  return result ? {\n'+
                                                    '    r: parseInt(result[1], 16),\n'+
                                                    '    g: parseInt(result[2], 16),\n'+
                                                    '    b: parseInt(result[3], 16)\n'+
                                                    '  } : null;\n'+
                                                    '}';
  }
}

Blockly.JavaScript['ada_setnokiadisplay'] = function(block) {
  Blockly.JavaScript.grove();
  var variable_lcdvariable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lcdVariable'), Blockly.Variables.NAME_TYPE);
  var value_sclk = Blockly.JavaScript.valueToCode(block, 'sclk', Blockly.JavaScript.ORDER_ATOMIC);
  var value_din = Blockly.JavaScript.valueToCode(block, 'din', Blockly.JavaScript.ORDER_ATOMIC);
  var value_dc = Blockly.JavaScript.valueToCode(block, 'dc', Blockly.JavaScript.ORDER_ATOMIC);
  var value_cs = Blockly.JavaScript.valueToCode(block, 'cs', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rst = Blockly.JavaScript.valueToCode(block, 'rst', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  //Blockly.JavaScript.lcdDisplay();
  //Blockly.JavaScript.spiLcdEqual(variable_lcdvariable);
  var code = variable_lcdvariable+' = new '+Blockly.JavaScript.wyliodrin+'.Adafruit_PCD8544('+value_sclk+", "+value_din+", "+value_dc+", "+value_cs+", "+value_rst+');\n';
  Blockly.JavaScript.spiLcdAtr(variable_lcdvariable, Blockly.JavaScript.LCDSpi);
  return code;
};

Blockly.JavaScript['ada_setstdisplay'] = function(block) {
  Blockly.JavaScript.grove();
  var variable_lcdvariable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lcdVariable'), Blockly.Variables.NAME_TYPE);
  var value_cs = Blockly.JavaScript.valueToCode(block, 'cs', Blockly.JavaScript.ORDER_ATOMIC);
  var value_dc = Blockly.JavaScript.valueToCode(block, 'dc', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mosi = Blockly.JavaScript.valueToCode(block, 'mosi', Blockly.JavaScript.ORDER_ATOMIC);
  var value_sclk = Blockly.JavaScript.valueToCode(block, 'sclk', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rst = Blockly.JavaScript.valueToCode(block, 'rst', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.lcdSPIDisplay(value_cs, value_dc, value_mosi, value_sclk, value_rst);
  var code = variable_lcdvariable+' = '+Blockly.JavaScript.LCDSpi+';\n';
  return code;
};

Blockly.JavaScript['ada_drawline'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdVar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_vcolor = Blockly.JavaScript.valueToCode(block, 'vColor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "var "+Blockly.JavaScript.colorValue+" = colorToRGB("+value_vcolor+");\n"+
  "var "+Blockly.JavaScript.newColor+' = '+Blockly.JavaScript.colorValue+".r*Math.pow(2,11)+"+Blockly.JavaScript.colorValue+".g*Math.pow(2,5)+"+Blockly.JavaScript.colorValue+".b;\n"+
  value_lcdVar+'.drawLine('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+Blockly.JavaScript.newColor+');\n';
  return code;
};

Blockly.JavaScript['ada_drawpixel'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdVar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_pixelcolor = Blockly.JavaScript.valueToCode(block, 'pixelColor', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "var "+Blockly.JavaScript.colorValue+" = colorToRGB("+value_pixelcolor+");\n"+
  "var "+Blockly.JavaScript.newColor+' = '+Blockly.JavaScript.colorValue+".r*Math.pow(2,11)+"+Blockly.JavaScript.colorValue+".g*Math.pow(2,5)+"+Blockly.JavaScript.colorValue+".b;\n"+
  value_lcdVar+'.drawPixel('+value_x0+', '+value_y0+', '+Blockly.JavaScript.newColor+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfastvline'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawFastVLine('+value_x0+', '+value_y0+', '+value_length+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfasthline'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawFastHLine('+value_x0+', '+value_y0+', '+value_length+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawstrokerect'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfillrect'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.fillRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawstrokecercle'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawCircle('+value_x0+', '+value_y0+', '+value_radius+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfillcercle'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.fillCircle('+value_x0+', '+value_y0+', '+value_radius+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawstrokeroundrect'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawRoundRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+value_radius+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfillroundrect'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.fillRoundRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+value_radius+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawstroketriangle'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'x2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y2 = Blockly.JavaScript.valueToCode(block, 'y2', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.drawTriangle('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+value_x2+', '+value_y2+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawfilltriangle'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'x2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y2 = Blockly.JavaScript.valueToCode(block, 'y2', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_vcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.fillTriangle('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+value_x2+', '+value_y2+', '+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_drawchar'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  Blockly.JavaScript.bgColorSetup();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_char = Blockly.JavaScript.valueToCode(block, 'char', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  var colour_bgcolor = block.getFieldValue('bgcolor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_color+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  Blockly.JavaScript.bgColorValue+' = colorToRGB ('+colour_bgcolor+');\n'+
  Blockly.JavaScript.bgColorChanged+' = '+Blockly.JavaScript.bgColorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.bgColorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.bgColorValue+'[2];\n'+
  value_lcdvar+'.drawChar('+value_x0+', '+value_y0+', '+value_char+', '+Blockly.JavaScript.colorChanged+', '+Blockly.JavaScript.bgColorChanged+', '+value_size+');\n';
  return code;
};

Blockly.JavaScript['ada_setcursor'] = function(block) {
	Blockly.JavaScript.grove();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_cursor_x = Blockly.JavaScript.valueToCode(block, 'cursor_x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_cursor_y = Blockly.JavaScript.valueToCode(block, 'cursor_y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcdvar+'.setCursor('+value_cursor_x+', '+value_cursor_y+');\n';
  return code;
};

Blockly.JavaScript['ada_settextcolor'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_textcolor = block.getFieldValue('textColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_textcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.setTextColor('+Blockly.JavaScript.colorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_settextbgcolor'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  Blockly.JavaScript.bgColorSetup();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_textcolor = block.getFieldValue('textColor');
  var colour_textBgcolor = block.getFieldValue('textBgColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_textcolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  Blockly.JavaScript.bgColorValue+' = colorToRGB ('+colour_textBgcolor+');\n'+
  Blockly.JavaScript.bgColorChanged+' = '+Blockly.JavaScript.bgColorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.bgColorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.bgColorValue+'[2];\n'+
  value_lcdvar+'.setTextColor('+Blockly.JavaScript.colorChanged+','+Blockly.JavaScript.bgColorChanged+');\n';
  return code;
};

Blockly.JavaScript['ada_settextsize'] = function(block) {
	Blockly.JavaScript.grove();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_textsize = Blockly.JavaScript.valueToCode(block, 'textSize', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcdvar+'.setTextSize('+value_textsize+');\n';
  return code;
};

Blockly.JavaScript['ada_settextwrap'] = function(block) {
	Blockly.JavaScript.grove();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_wrap = block.getFieldValue('wrap');
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcdvar+'.setTextWrap('+dropdown_wrap+');\n';
  return code;
};

Blockly.JavaScript['ada_writetext'] = function(block) {
	Blockly.JavaScript.grove();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcdvar+'._print('+value_text+');\n';
  return code;
};
//ecran mare
Blockly.JavaScript['ada_fillscreen'] = function(block) {
	Blockly.JavaScript.grove();
  Blockly.JavaScript.colorSetup();
  Blockly.JavaScript.colors();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var colour_screencolor = block.getFieldValue('screenColor');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.colorValue+' = colorToRGB ('+colour_screencolor+');\n'+
  Blockly.JavaScript.colorChanged+' = '+Blockly.JavaScript.colorValue+'[0]*math.pow(2,11)+'+Blockly.JavaScript.colorValue+'[1]*math.pow(2,5)+'+Blockly.JavaScript.colorValue+'[2];\n'+
  value_lcdvar+'.fillScreen('+Blockly.JavaScript.colorChanged+');\n';
  return code;
};
//pt nokia diplay
Blockly.JavaScript['ada_clearscreen'] = function(block) {
  Blockly.JavaScript.grove();
  // TODO: Assemble JavaScript into code variable.
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_lcdvar+'.clearDisplay();\n';
  return code;
};
//pt nokia diplay
Blockly.JavaScript['ada_setcontrast'] = function(block) {
  Blockly.JavaScript.grove();
  var value_lcdvar = Blockly.JavaScript.valueToCode(block, 'lcdVar', Blockly.JavaScript.ORDER_ATOMIC);
  var value_contrast = Blockly.JavaScript.valueToCode(block, 'contrast', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcdvar+'.setContrast('+value_contrast+');\n';
  return code;
};