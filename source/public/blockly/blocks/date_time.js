Blockly.Blocks['get_time'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["hour", "0"], ["minute", "1"], ["second", "2"]]), "NAME")
        .appendField("of day");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['get_date'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["day of week", "0"], ["day", "1"], ["month", "2"], ["year", "3"]]), "NAME")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('');
  }
};

Blockly.Blocks['format_numbers'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("number")
        .appendField("Format")
        .appendField(new Blockly.FieldDropdown([["two digits with zeros", "0"], ["two digits with spaces", "1"]]), "NAME")
        .setCheck("Number")
        .appendField("number");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setTooltip('');
  }
};