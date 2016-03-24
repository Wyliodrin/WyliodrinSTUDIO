"use strict";

Blockly.Blocks['megahash'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(60);
    this.appendValueInput("host")
        .appendField("5s MegaHash from ");
    this.appendValueInput("port")
        .appendField("and port");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};