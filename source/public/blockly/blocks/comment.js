"use strict";

goog.provide('Blockly.Blocks.comment');

goog.require('Blockly.Blocks');

Blockly.Blocks['comment'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("Put comment")
        .appendField(new Blockly.FieldTextInput("comment"), "comment_value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};