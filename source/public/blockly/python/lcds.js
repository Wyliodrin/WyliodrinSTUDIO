
Blockly.Python.LCDSet = function(sclk, din, dc, cs, rst)
{
  if(!Blockly.Python.definitions_['LCDSet'])
  {
    var l = Blockly.Python.variableDB_.getDistinctName('lcd', Blockly.Generator.NAME_TYPE);
    Blockly.Python.LCD = l;
    Blockly.Python.definitions_['lcd'] = Blockly.Python.LCD+" = Adafruit_PCD8544("+sclk+", "+din+", "+dc+", "+cs+", "+rst+")\n";
  }
}

Blockly.Python.lcdSPIDisplay = function(cs, dc, mosi, sclk, rst)
{
  if(!Blockly.Python.definitions_['lcdSPIDisplay'])
  {
    var l = Blockly.Python.variableDB_.getDistinctName('lcdSpi', Blockly.Generator.NAME_TYPE);
    Blockly.Python.LCDSpi = l;
    Blockly.Python.definitions_['lcdSpi'] = Blockly.Python.LCDSpi+" = Adafruit_ST7735("+cs+", "+dc+", "+mosi+", "+sclk+", "+rst+")\n";
  }
}

Blockly.Python.colorSetup = function ()
{
  if (!Blockly.Python.definitions_['colorSetup'])
    {
      var color = Blockly.Python.variableDB_.getDistinctName('color', Blockly.Generator.NAME_TYPE);
      Blockly.Python.colorValue = color;
      var colorChanged = Blockly.Python.variableDB_.getDistinctName('colorChanged', Blockly.Generator.NAME_TYPE);
      Blockly.Python.colorChanged = colorChanged;
    }
}

Blockly.Python.bgColorSetup = function ()
{
  if (!Blockly.Python.definitions_['bgColorSetup'])
    {
      var bgColor = Blockly.Python.variableDB_.getDistinctName('bgColor', Blockly.Generator.NAME_TYPE);
      Blockly.Python.bgColorValue = bgColor;
      var bgColorChanged = Blockly.Python.variableDB_.getDistinctName('bgColorChanged', Blockly.Generator.NAME_TYPE);
      Blockly.Python.bgColorChanged = colorChanged;
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

Blockly.Python['ada_setnokiadisplay'] = function(block) {
  Blockly.Python.grove();
  var variable_lcdvariable = Blockly.Python.variableDB_.getName(block.getFieldValue('lcdVariable'), Blockly.Variables.NAME_TYPE);
  var value_sclk = Blockly.Python.valueToCode(block, 'sclk', Blockly.Python.ORDER_ATOMIC);
  var value_din = Blockly.Python.valueToCode(block, 'din', Blockly.Python.ORDER_ATOMIC);
  var value_dc = Blockly.Python.valueToCode(block, 'dc', Blockly.Python.ORDER_ATOMIC);
  var value_cs = Blockly.Python.valueToCode(block, 'cs', Blockly.Python.ORDER_ATOMIC);
  var value_rst = Blockly.Python.valueToCode(block, 'rst', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.LCDSet(value_sclk, value_din, value_dc, value_cs, value_rst);
  var code = variable_lcdvariable+' = '+Blockly.Python.LCD+'\n';
  return code;
};

Blockly.Python['ada_setstdisplay'] = function(block) {
  Blockly.Python.grove();
  var variable_lcdvariable = Blockly.Python.variableDB_.getName(block.getFieldValue('lcdVariable'), Blockly.Variables.NAME_TYPE);
  var value_cs = Blockly.Python.valueToCode(block, 'cs', Blockly.Python.ORDER_ATOMIC);
  var value_dc = Blockly.Python.valueToCode(block, 'dc', Blockly.Python.ORDER_ATOMIC);
  var value_mosi = Blockly.Python.valueToCode(block, 'mosi', Blockly.Python.ORDER_ATOMIC);
  var value_sclk = Blockly.Python.valueToCode(block, 'sclk', Blockly.Python.ORDER_ATOMIC);
  var value_rst = Blockly.Python.valueToCode(block, 'rst', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.lcdSPIDisplay(value_cs, value_dc, value_mosi, value_sclk, value_rst);
  var code = variable_lcdvariable+' = '+Blockly.Python.LCDSpi+'\n';
  return code;
};

Blockly.Python['ada_drawline'] = function(block) {
  Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdVar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC); 
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
  var value_y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
  var value_vcolor = Blockly.Python.valueToCode(block, 'vColor', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+" = colorToRGB ("+value_vcolor+")\n"+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdVar+'.drawLine('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawpixel'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdVar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_pixelcolor = Blockly.Python.valueToCode(block, 'pixelColor', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+value_pixelcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdVar+'.drawPixel('+value_x0+', '+value_y0+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfastvline'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawFastVLine('+value_x0+', '+value_y0+', '+value_length+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfasthline'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(block, 'length', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawFastHLine('+value_x0+', '+value_y0+', '+value_length+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawstrokerect'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfillrect'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.fillRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawstrokecercle'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_radius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawCircle('+value_x0+', '+value_y0+', '+value_radius+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfillcercle'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_radius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.fillCircle('+value_x0+', '+value_y0+', '+value_radius+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawstrokeroundrect'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var value_radius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawRoundRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+value_radius+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfillroundrect'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var value_radius = Blockly.Python.valueToCode(block, 'radius', Blockly.Python.ORDER_ATOMIC);
  var colour_vcolor = block.getFieldValue('vColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.fillRoundRect('+value_x0+', '+value_y0+', '+value_width+', '+value_height+', '+value_radius+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawstroketriangle'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
  var value_y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
  var value_x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_ATOMIC);
  var value_y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.drawTriangle('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+value_x2+', '+value_y2+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawfilltriangle'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
  var value_y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
  var value_x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_ATOMIC);
  var value_y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_vcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.fillTriangle('+value_x0+', '+value_y0+', '+value_x1+', '+value_y1+', '+value_x2+', '+value_y2+', '+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_drawchar'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  Blockly.Python.bgColorSetup();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_char = Blockly.Python.valueToCode(block, 'char', Blockly.Python.ORDER_ATOMIC);
  var value_x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_ATOMIC);
  var value_y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_ATOMIC);
  var value_size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');
  var colour_bgcolor = block.getFieldValue('bgcolor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_color+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  Blockly.Python.bgColorValue+' = colorToRGB ('+colour_bgcolor+')\n'+
  Blockly.Python.bgColorChanged+' = '+Blockly.Python.bgColorValue+'[0]*math.pow(2,11)+'+Blockly.Python.bgColorValue+'[1]*math.pow(2,5)+'+Blockly.Python.bgColorValue+'[2]\n'+
  value_lcdvar+'.drawChar('+value_x0+', '+value_y0+', '+value_char+', '+Blockly.Python.colorChanged+', '+Blockly.Python.bgColorChanged+', '+value_size+')\n';
  return code;
};

Blockly.Python['ada_setcursor'] = function(block) {
	Blockly.Python.grove();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_cursor_x = Blockly.Python.valueToCode(block, 'cursor_x', Blockly.Python.ORDER_ATOMIC);
  var value_cursor_y = Blockly.Python.valueToCode(block, 'cursor_y', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcdvar+'.setCursor('+value_cursor_x+', '+value_cursor_y+')\n';
  return code;
};

Blockly.Python['ada_settextcolor'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var colour_textcolor = block.getFieldValue('textColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_textcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.setTextColor('+Blockly.Python.colorChanged+')\n';
  return code;
};

Blockly.Python['ada_settextbgcolor'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.bgColorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var colour_textcolor = block.getFieldValue('textColor');
  var colour_textBgcolor = block.getFieldValue('textBgColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_textcolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  Blockly.Python.bgColorValue+' = colorToRGB ('+colour_textBgcolor+')\n'+
  Blockly.Python.bgColorChanged+' = '+Blockly.Python.bgColorValue+'[0]*math.pow(2,11)+'+Blockly.Python.bgColorValue+'[1]*math.pow(2,5)+'+Blockly.Python.bgColorValue+'[2]\n'+
  value_lcdvar+'.setTextColor('+Blockly.Python.colorChanged+','+Blockly.Python.bgColorChanged+')\n';
  return code;
};

Blockly.Python['ada_settextsize'] = function(block) {
	Blockly.Python.grove();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_textsize = Blockly.Python.valueToCode(block, 'textSize', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcdvar+'.setTextSize('+value_textsize+')\n';
  return code;
};

Blockly.Python['ada_settextwrap'] = function(block) {
	Blockly.Python.grove();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var dropdown_wrap = block.getFieldValue('wrap');
  // TODO: Assemble Python into code variable.
  var code = value_lcdvar+'.setTextWrap('+dropdown_wrap+')\n';
  return code;
};

Blockly.Python['ada_writetext'] = function(block) {
	Blockly.Python.grove();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcdvar+'._print('+value_text+')\n';
  return code;
};

Blockly.Python['ada_fillscreen'] = function(block) {
	Blockly.Python.grove();
  Blockly.Python.colorSetup();
  Blockly.Python.colors();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var colour_screencolor = block.getFieldValue('screenColor');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.colorValue+' = colorToRGB ('+colour_screencolor+')\n'+
  Blockly.Python.colorChanged+' = '+Blockly.Python.colorValue+'[0]*math.pow(2,11)+'+Blockly.Python.colorValue+'[1]*math.pow(2,5)+'+Blockly.Python.colorValue+'[2]\n'+
  value_lcdvar+'.fillScreen('+Blockly.Python.colorChanged+')\n';
  return code;
};
Blockly.Python['ada_clearscreen'] = function(block) {
  Blockly.Python.grove();
  // TODO: Assemble Python into code variable.
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var code = value_lcdvar+'.clearDisplay()\n';
  return code;
};
Blockly.Python['ada_setcontrast'] = function(block) {
  Blockly.Python.grove();
  var value_lcdvar = Blockly.Python.valueToCode(block, 'lcdVar', Blockly.Python.ORDER_ATOMIC);
  var value_contrast = Blockly.Python.valueToCode(block, 'contrast', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcdvar+'.setContrast('+value_contrast+')\n';
  return code;
};