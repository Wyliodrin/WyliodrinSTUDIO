
Blockly.Blocks['language_encode'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Set encode")
        .appendField(new Blockly.FieldTextInput(""), "value");
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['language_line'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Insert line")
        .appendField(new Blockly.FieldTextInput(""), "line");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['language_line_return'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Insert line")
        .appendField(new Blockly.FieldTextInput(""), "line");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

