
Blockly.Blocks['unipi_power'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
 
    this.appendValueInput("relNr")
        .appendField("set relay")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["off", "0"], ["on", "1"]]), "v");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['unipi_analogRead'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendDummyInput()
        .appendField("Analog read pin")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"]]), "pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['unipi_digitalRead'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Digital read pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['unipi_analogWrite'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendValueInput("val")
        .setCheck("Number")
        .appendField("Analog write value");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};