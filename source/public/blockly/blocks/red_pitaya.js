Blockly.Blocks['rp_analogwrite'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog write");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write an analog value on a pin using PWM. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogwritevoltage'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog write");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("voltage");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write the voltage value on a pin using PWM. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogwriteraw'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog write");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("raw value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write a raw analog value on a pin using PWM. Please be careful not to use the same pin for reading and writing.');
  }
};



Blockly.Blocks['rp_analogread'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog read");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogreadvoltage'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog read voltage from");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the voltage from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogreadraw'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Analog read raw");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the raw value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogread_shield'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Extension board analog read");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogreadvoltage_shield'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Extension board analog read voltage from");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the voltagee from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_analogreadraw_shield'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("Extension board analog read raw");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the raw value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_set_led'] = {
  init: function() {
      this.appendDummyInput()
        .appendField("Set Led ")
        .appendField(new Blockly.FieldDropdown([["0", "17"],["1", "18"], ["2", "19"], ["3", "20"], ["4", "21"], ["5", "22"], ["6", "23"],["7", "24"]]), "pin")
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["ON", "1"], ["OFF", "0"]]), "state");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(345);
    this.setTooltip('Set an LED On or Off');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['rp_pinmode'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pin_mode');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("pinMode");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendDummyInput()
        .appendField("mode")
        .appendField(new Blockly.FieldDropdown([["INPUT", "0"], ["OUTPUT", "1"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the mode of a pin to INPUT or OUTPUT. Please be careful not to set the same pin for INPUT and OUTPUT.');
  }
};

Blockly.Blocks['rp_digitalwrite'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_write');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("digitalWrite");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write a value on a pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['rp_digitalread'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_read');
    this.setColour(345);
    this.appendDummyInput()
        .appendField("digitalRead");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value from a pin. Please be careful not to use the same pin for reading and writing.');
  }
};