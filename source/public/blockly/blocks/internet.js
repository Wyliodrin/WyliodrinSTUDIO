"use strict";


Blockly.Blocks['weather_init'] = {
    init: function () {
        this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#init_weather_api');
        this.setColour(260);
        this.appendValueInput("key")
            .setCheck("String")
            .appendField("Init weather API with ");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

Blockly.Blocks['weather_main'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["temperature", "temp"], ["humidity", "humidity"], ["pressure", "pressure"], ["wind speed", "speed"]]), "weatherParam");
    this.appendValueInput("city")
        .setCheck("String")
        .appendField("from ");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['weather_coord'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["temperature", "temp"], ["humidity", "humidity"], ["pressure", "pressure"], ["wind speed", "speed"]]), "weatherParam");
    this.appendValueInput("lat")
        .setCheck("String")
        .appendField("from latitude");
    this.appendValueInput("lon")
        .setCheck("String")
        .appendField("longitude");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};