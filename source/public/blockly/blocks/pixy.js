"use strict";

Blockly.Blocks['pixy_init'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(140);
    this.appendDummyInput()
        .appendField("Init pixy")
        .appendField(new Blockly.FieldVariable("pixyItem"), "pixy");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['pixy_blocks'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(140);
    this.appendValueInput("pixy")
        .appendField("Get blocks from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['pixy_block'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(140);
    this.appendValueInput("pixy")
        .appendField("Get from");
    this.appendValueInput("blockNr")
        .setCheck("Number")
        .appendField("block #");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};