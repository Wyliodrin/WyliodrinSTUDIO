"use strict";

goog.provide('Blockly.Blocks.wyliodrin_logic');

goog.require('Blockly.Blocks');

Blockly.Blocks['value_changed'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Value of")
        .appendField(new Blockly.FieldVariable("item"), "variable")
        .appendField("changed with");
    this.appendValueInput("value")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};