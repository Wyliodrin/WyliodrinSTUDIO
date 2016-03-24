Blockly.Blocks['breakpoint'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("breakpoint");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(300);
    this.setTooltip('Sets a breakpoint');
    this.setHelpUrl('http://www.example.com/');
  }
};