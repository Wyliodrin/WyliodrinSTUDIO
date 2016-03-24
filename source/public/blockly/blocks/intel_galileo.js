"use strict";

goog.provide('Blockly.Blocks.intel_galileo');

goog.require('Blockly.Blocks');

Blockly.Blocks['intel_galileo_set_onboard_led'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("Set onboard Led ");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["On", "1"], ["Off", "0"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set Intel Arduino onboard LED On or Off');
  }
};