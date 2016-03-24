"use strict";

Blockly.Blocks['firmata_init'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Start")
        .appendField(new Blockly.FieldDropdown([["Arduino", "arduino"], ["Arduino Mega", "arduinomega"]]), "board");
    this.appendValueInput("port")
        .appendField("on port");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_digitalwrite'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("digitalPin")
        .setCheck("Number")
        .appendField("Digital write on pin");
    this.appendValueInput("value")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_digitalread'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("digitalPin")
        .setCheck("Number")
        .appendField("Digital read pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_analogread'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("analogPin")
        .setCheck("Number")
        .appendField("Analog read pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_set_rgb_led'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_basic_color');
    this.setColour(120);
    this.appendValueInput("color")
        .setCheck("Colour")
        .appendField("Set basic color");
    this.appendDummyInput()
        .appendField("on RGB LED with pins");
    this.appendValueInput("red")
        .setCheck("Number")
        .appendField("R");
    this.appendValueInput("green")
        .setCheck("Number")
        .appendField("G");
    this.appendValueInput("blue")
        .setCheck("Number")
        .appendField("B");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the color on an RGB LED. This will set only the basic colors.');
  }
};

Blockly.Blocks['firmata_set_fine_rgb_led'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_fine_color');
    this.setColour(120);
    this.appendValueInput("color")
        .setCheck("Colour")
        .appendField("Set fine color");
    this.appendDummyInput()
        .appendField("on RGB LED with pins");
    this.appendValueInput("red")
        .setCheck("Number")
        .appendField("R");
    this.appendValueInput("green")
        .setCheck("Number")
        .appendField("G");
    this.appendValueInput("blue")
        .setCheck("Number")
        .appendField("B");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the color on an RGB LED. This will set colors using PWM so the pins need to be able to do that.');
  }
};

Blockly.Blocks['firmata_serial'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Serial Monitor")
        .appendField(new Blockly.FieldTextInput("auto"), "port")
        .appendField("with Baud Rate")
        .appendField(new Blockly.FieldDropdown([["300", "300"], ["1200", "1200"], ["2400", "2400"], ["4800", "4800"], ["9600", "9600"], ["14400", "14400"], ["28800", "28800"], ["38400", "38400"], ["57600", "57600"], ["115200", "11500"]]), "baudrate");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_analogwrite'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("analogPin")
        .setCheck("Number")
        .appendField("Analog write on pin");
    this.appendValueInput("analogValue")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['firmata_servo'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#servo');
    this.setColour(130);
    this.appendValueInput("value_servo")
        .appendField("Set servo angle");
    this.appendValueInput("pin")
        .appendField("on pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};