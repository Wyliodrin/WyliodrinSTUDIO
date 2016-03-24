"use strict";


Blockly.Blocks['truncate'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("truncate")
        .setCheck("Number")
        .appendField("truncate");
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['map_block'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("value")
        .appendField("Map the value");
    this.appendValueInput("from_low")
        .appendField("from the lowest value");
    this.appendValueInput("to_low")
        .appendField("to the lowest value");
    this.appendValueInput("from_high")
        .appendField("from the highest value");
    this.appendValueInput("to_high")
        .appendField("to the highest value");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['kelvintocelsius'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("degrees")
        .appendField("Get Celsius degrees from Kelvin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['fahrenheittocelsius'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("degrees")
        .appendField("Get Celsius degrees from Fahrenheit");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['celsiustokelvin'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("degrees")
        .appendField("Get Kelvin degrees from Celsius");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['celsiustofahrenheit'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("degrees")
        .appendField("Get Fahrenheit degrees from Celsius");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};