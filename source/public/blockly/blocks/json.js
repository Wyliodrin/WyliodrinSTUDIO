
"use strict";

Blockly.Blocks['json_key'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("key")
        .appendField("get");
    this.appendValueInput("JSON")
        .appendField("from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['json_index'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("index")
        .appendField("item #");
    this.appendValueInput("JSON")
        .appendField("from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['json_items'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("JSON")
        .appendField("count items from ");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
