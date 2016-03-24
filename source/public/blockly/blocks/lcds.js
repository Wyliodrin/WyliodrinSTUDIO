"use strict";

Blockly.Blocks['ada_setnokiadisplay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Set Nokia")
        .appendField(new Blockly.FieldVariable("LCD"), "lcdVariable");
    this.appendValueInput("sclk")
        .setCheck("Number")
        .appendField(" pins SCLK");
    this.appendValueInput("din")
        .setCheck("Number")
        .appendField("DIN");
    this.appendValueInput("dc")
        .setCheck("Number")
        .appendField("DC");
    this.appendValueInput("cs")
        .setCheck("Number")
        .appendField("CS");
    this.appendValueInput("rst")
        .setCheck("Number")
        .appendField("RST");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_setstdisplay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Set SPI")
        .appendField(new Blockly.FieldVariable("LCD"), "lcdVariable");
    this.appendValueInput("cs")
        .setCheck("Number")
        .appendField(" pins CS");
    this.appendValueInput("dc")
        .setCheck("Number")
        .appendField("DC");
    this.appendValueInput("mosi")
        .setCheck("Number")
        .appendField("MOSI");
    this.appendValueInput("sclk")
        .setCheck("Number")
        .appendField("SCLK");
    this.appendValueInput("rst")
        .setCheck("Number")
        .appendField("RST");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['ada_drawline'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw line on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField(" from x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(", y");
    this.appendValueInput("x1")
        .setCheck("Number")
        .appendField("to x");
    this.appendValueInput("y1")
        .setCheck("Number")
        .appendField(", y");
    this.appendValueInput("vColor")
        .setCheck("Color")
        .appendField("and color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawpixel'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw pixel on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField(" at x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(", y");
    this.appendValueInput("pixelColor")
        .setCheck("Color")
        .appendField("with color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfastvline'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw vertical line on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x ");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(" and y");
    this.appendValueInput("length")
        .setCheck("Number")
        .appendField("with length");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfasthline'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw horizontal line on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x ");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(" and y");
    this.appendValueInput("length")
        .setCheck("Number")
        .appendField("with length");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawstrokerect'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw rectangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x and");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField(", width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfillrect'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw fill rectangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x and");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField(", width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawstrokecercle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw cercle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("with center at x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(", y");
    this.appendValueInput("radius")
        .setCheck("Number")
        .appendField("radius");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfillcercle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw fill cercle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("with center at x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(", y");
    this.appendValueInput("radius")
        .setCheck("Number")
        .appendField("radius");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawstrokeroundrect'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw round rectangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField("width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.appendValueInput("radius")
        .setCheck("Number")
        .appendField("radius of the corner");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfillroundrect'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw round fill rectangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField("width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("height");
    this.appendValueInput("radius")
        .setCheck("Number")
        .appendField("radius of the corner");
    this.appendDummyInput()
        .appendField("and color")
        .appendField(new Blockly.FieldColour("#ff0000"), "vColor");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawstroketriangle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw triangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("x1")
        .setCheck("Number")
        .appendField("to x");
    this.appendValueInput("y1")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("x2")
        .setCheck("Number")
        .appendField("and x");
    this.appendValueInput("y2")
        .setCheck("Number")
        .appendField("y");
    this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#ff0000"), "color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawfilltriangle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw fill triangle on");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("from x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("x1")
        .setCheck("Number")
        .appendField("to x");
    this.appendValueInput("y1")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("x2")
        .setCheck("Number")
        .appendField("and x");
    this.appendValueInput("y2")
        .setCheck("Number")
        .appendField("y");
    this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#ff0000"), "color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_drawchar'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Draw on");
    this.appendValueInput("char")
        .appendField("the char");
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("at x");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField("y");
    this.appendValueInput("size")
        .setCheck("Number")
        .appendField("with size");
    this.appendDummyInput()
        .appendField("color")
        .appendField(new Blockly.FieldColour("#ff0000"), "color");
    this.appendDummyInput()
        .appendField("background color")
        .appendField(new Blockly.FieldColour("#ff0000"), "bgcolor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_setcursor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendValueInput("cursor_x")
        .setCheck("Number")
        .appendField("cursor at x:");
    this.appendValueInput("cursor_y")
        .setCheck("Number")
        .appendField("and y:");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_settextcolor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendDummyInput()
        .appendField("text color at")
        .appendField(new Blockly.FieldColour("#ff0000"), "textColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_settextbgcolor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendDummyInput()
        .appendField("text color at")
        .appendField(new Blockly.FieldColour("#ff0000"), "textColor");
    this.appendDummyInput()
        .appendField("text background color at")
        .appendField(new Blockly.FieldColour("#ff0000"), "textBgColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_settextsize'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendValueInput("textSize")
        .appendField("text size at");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_settextwrap'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendDummyInput()
        .appendField("text wrap to")
        .appendField(new Blockly.FieldDropdown([["True", "1"], ["False", "0"]]), "wrap");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_writetext'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Write on");
    this.appendValueInput("text")
        .appendField("the text");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_fillscreen'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendDummyInput()
        .appendField("to the color")
        .appendField(new Blockly.FieldColour("#ff0000"), "screenColor");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_setcontrast'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("lcdVar")
        .appendField("Set the LCD");
    this.appendValueInput("contrast")
        .setCheck("Number")
        .appendField(" contrast at");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['ada_clearscreen'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Clear ");
    this.appendValueInput("lcdVar")
        .appendField("LCD");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};