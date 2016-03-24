
"use strict";

Blockly.Blocks['picamera_snapshot'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(135);
    this.appendValueInput("filename")
        .setCheck("String")
        .appendField("Pi Camera take snapshot");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['picamera_start_recording'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(135);
    this.appendValueInput("filename")
        .setCheck("String")
        .appendField("Pi Camera start recording");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['picamera_stop_recording'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(135);
    this.appendDummyInput()
        .appendField("Pi Camera stop recording");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
