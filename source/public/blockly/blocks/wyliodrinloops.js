Blockly.Blocks['repeat_timing'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Repeat every");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["seconds", "0"], ["miliseconds", "1"], ["microseconds", "2"]]), "TIME");
    this.appendStatementInput("NAME")
        .setCheck("null")
        .appendField("do");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


