"use strict";

goog.provide('Blockly.Blocks.signals');

goog.require('Blockly.Blocks');


Blockly.Blocks['send_signals'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("value_signal")
        .setCheck("String")
        .appendField("Send signal");
    this.appendValueInput("value_value")
        .setCheck("Number")
        .appendField("with value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['sendsignalsandflag'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("value_signal")
        .setCheck("Array")
        .appendField("Send signals");
    this.appendValueInput("value_value")
        .setCheck("Array")
        .appendField("with values");
    this.appendValueInput("debug_text")
    .setCheck("String")
    .appendField("and flag");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['sendsignals'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("value_signal")
        .setCheck("Array")
        .appendField("Send signals");
    this.appendValueInput("value_value")
        .setCheck("Array")
        .appendField("with values");
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['signal_sendanddebug'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("signal_text")
        .setCheck("String")
        .appendField("Send signal");
    this.appendValueInput("signal_value")
        .setCheck("Number")
        .appendField("value");
    this.appendValueInput("debug_text")
        .setCheck("String")
        .appendField("debug message");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['signal_putflag'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("flag_text")
        .setCheck("String")
        .appendField("Put flag");
    this.appendValueInput("signal_text")
        .setCheck("String")
        .appendField("at signal");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['signal_receivesignal'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("signal")
        .setCheck("String")
        .appendField("On receive signal");
    this.appendValueInput("signalvalue")
        .setCheck("null")
        .appendField("with signal value");
    this.appendStatementInput("commands")
        .setCheck("null")
        .appendField("Do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['sendcoord'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("name")
        .appendField("Send coordinates");
    this.appendValueInput("latitudine")
        .appendField("at latitude");
    this.appendValueInput("longitudine")
        .appendField("and longitude");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['sendcoordandflag'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("name")
        .appendField("Send coordinates");
    this.appendValueInput("latitudine")
        .appendField("at latitude");
    this.appendValueInput("longitudine")
        .appendField("longitude");
    this.appendValueInput("flag")
        .appendField("and flag");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};