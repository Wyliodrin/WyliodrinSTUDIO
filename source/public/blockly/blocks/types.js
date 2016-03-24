
"use strict";

Blockly.Blocks['types_number'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("value")
        .appendField("integer number from");
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['types_real'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("value")
        .appendField("real number from");
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['types_text'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput("value")
        .appendField("text from");
    this.setOutput(true, "String");
    this.setTooltip('');
  }
};

Blockly.Blocks['text_string'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("string")
        .appendField(new Blockly.FieldTextInput("\\n"), "text");
    this.setOutput(true);
    this.setTooltip('');
  }
};
