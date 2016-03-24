"use strict";

Blockly.Blocks['webserver_sendfile'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendValueInput("file")
        .setCheck("String")
        .appendField("Web")
        .appendField("Send file");
    this.appendValueInput("route")
        .setCheck("String")
        .appendField("for route");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_sendtext'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendValueInput("string")
        .setCheck("String")
        .appendField("Web")
        .appendField("Send");
    this.appendValueInput("route")
        .setCheck("String")
        .appendField("for route");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_run'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendDummyInput()
        .appendField("Run webserver")
        .appendField(new Blockly.FieldDropdown([["Debug", "debug"], ["Release", "release"]]), "run");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_online'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendDummyInput()
        .appendField("Run webserver");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_statements'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendValueInput("route")
        .setCheck("Webserver Querystring")
        .appendField("Web Server ")
        .appendField(new Blockly.FieldDropdown([["GET", "GET"], ["POST", "POST"], ["PUT", "PUT"], ["DELETE", "DELETE"]]), "method")
        .appendField(" route");
    this.appendValueInput("return")
        .appendField("return")
        .appendField(new Blockly.FieldDropdown([["file", "file"], ["text", "text"]]), "return");
    this.appendStatementInput("statements");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_parameter_str'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(45);
    this.appendValueInput("next")
        .setCheck("Webserver Querystring")
        .appendField(new Blockly.FieldTextInput("/"), "parameter_str");
    this.setOutput(true, "Webserver Querystring");
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_parameter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(55);
    this.appendValueInput("next")
        .appendField ("parameter")
        .setCheck("Webserver Querystring")
        .appendField(new Blockly.FieldTextInput("parameter"), "parameter")
        .appendField("of type ")
        .appendField(new Blockly.FieldDropdown([["integer number", "int"], ["real number", "float"], ["text", "str"], ["path", "path"]]), "type");
    this.setOutput(true, "Webserver Querystring");
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_route_parameter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(55);
    this.appendDummyInput("next")
        .appendField ("route")
        .appendField(new Blockly.FieldTextInput("parameter"), "parameter");
    this.setOutput(true, "");
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_get_parameter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(55);
    this.appendDummyInput("next")
        .appendField ("GET")
        .appendField(new Blockly.FieldTextInput("parameter"), "parameter");
    this.setOutput(true, "");
    this.setTooltip('');
  }
};

Blockly.Blocks['webserver_post_parameter'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(55);
    this.appendDummyInput("next")
        .appendField ("POST")
        .appendField(new Blockly.FieldTextInput("parameter"), "parameter");
    this.setOutput(true, "");
    this.setTooltip('');
  }
};
