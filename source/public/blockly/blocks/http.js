"use strict";

Blockly.Blocks['http_get'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("HTTP")
        .appendField(new Blockly.FieldDropdown([["GET", "get"], ["DELETE", "delete"], ["OPTIONS", "options"], ["HEAD", "head"]]), "method");
    this.appendValueInput("link")
        .appendField("link");
    this.setInputsInline(true);
    this.setTooltip('');
    this.setOutput (true, "http");
  }
};

Blockly.Blocks['http_post'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("HTTP")
        .appendField(new Blockly.FieldDropdown([["POST", "post"], ["PUT", "put"]]), "method");
    this.appendValueInput("link")
        .appendField("link");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["form", "data"], ["json", "json"]]), "format");
    this.appendValueInput("data")
        .appendField("data");
    this.setInputsInline(true);
    this.setTooltip('');
    this.setOutput (true, "http");
  }
};

Blockly.Blocks['http_format'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("HTTP response as")
        .appendField(new Blockly.FieldDropdown([["text", "text"], ["raw", "content"], ["JSON", "json()"]]), "format");
    this.appendValueInput("data")
        .appendField("data")
        .setCheck ('http');
    this.setInputsInline(true);
    this.setTooltip('');
    this.setOutput (true);
  }
};
