"use strict";



Blockly.Blocks['gopigo_direction'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Go")
        .appendField(new Blockly.FieldDropdown([["forwards", "fwd"], ["left", "left"], ["right", "right"], ["backwords", "bwd"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['gopigo_stop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Stop");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['gopigo_increase_speed'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Increase speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['gopigo_decrease_speed'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Decrease speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['gopigo_volt'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Volt");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['gopigo_motor_direction'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    
    this.appendDummyInput()
        .appendField("Turn");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["forwards", "motor_fwd"], ["left", "left_rot()"], ["right", "right_rot()"], ["backwards", "motor_bwd"]]), "motor_direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['gopigo_led'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendDummyInput()
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown([["left led", "LED_L"], ["right led", "LED_R"]]), "led");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["on", "1"], ["off", "0"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};