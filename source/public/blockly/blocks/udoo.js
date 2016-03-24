Blockly.Blocks['udoo_enable_accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enable accelerometer");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Accelerometer")
        .appendField(new Blockly.FieldDropdown([["x", "0"], ["y", "1"], ["z", "2"]]), "axis")
        .appendField("axis");
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_all_accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Accelerometer values")
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_enable_magnetometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enable magnetometer");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_all_magnetometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Magnetometer values")
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_magnetometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Magnetometer")
        .appendField(new Blockly.FieldDropdown([["x", "0"], ["y", "1"], ["z", "2"]]), "axis")
        .appendField("axis");
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_enable_gyroscope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enable gyroscope");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_gyroscope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gyroscope")
        .appendField(new Blockly.FieldDropdown([["x", "0"], ["y", "1"], ["z", "2"]]), "axis")
        .appendField("axis");
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['udoo_get_all_gyroscope'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Gyroscope values")
    this.setOutput(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};