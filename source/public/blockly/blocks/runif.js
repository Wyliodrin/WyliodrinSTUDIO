
"use strict";

Blockly.Blocks['runif_statements'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("If");
    this.appendValueInput("if")
        .setCheck("Boolean");
    this.appendValueInput("every")
        .setCheck("Number")
        .appendField("once in");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["seconds", "1"], ["minutes", "60"], ["hours", "3600"]]), "multiply");
    this.appendStatementInput("lines");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
