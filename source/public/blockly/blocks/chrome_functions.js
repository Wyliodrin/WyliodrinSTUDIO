Blockly.Blocks['delay_chrome'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay');
    this.setColour(17);
    this.appendValueInput("millis")
        .setCheck("Number")
        .appendField("delay");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["milliseconds", "0"], ["microseconds", "1"], ["seconds", "2"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Wait for some specified period.');
  }
};