"use strict";

Blockly.Blocks['spark_init'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("ID")
        .setCheck("String")
        .appendField("Init Spark")
        .appendField("with device ID");
    this.appendValueInput("TOKEN")
        .setCheck("String")
        .appendField("token");
    this.setInputsInline(true);
    this.setOutput (true, "Spark");
    this.setTooltip('');
  }
};

 Blockly.Blocks['spark_digitalread'] = {
   init: function() {
     this.setHelpUrl('http://www.example.com/');
     this.setColour(230);
      this.appendDummyInput()
        .appendField("Spark device")
        .appendField(new Blockly.FieldVariable("item"), "spark_device")
         .appendField("digital read pin")
         .appendField(new Blockly.FieldDropdown([["D0", "\"D0\""], ["D1", "\"D1\""],["D2", "\"D2\""],["D3", "\"D3\""],
            ["D4", "\"D4\""],["D5", "\"D5\""],["D6", "\"D6\""],["D7", "\"D7\""],
            ["A0", "\"A0\""], ["A1", "\"A1\""],["A2", "\"A2\""],["A3", "\"A3\""],
            ["A4", "\"A4\""],["A5", "\"A5\""],["A6", "\"A6\""],["A7", "\"A7\""]]), "pin");
     this.setInputsInline(true);
     this.setOutput(true, "Number");
     this.setTooltip('');
   }
 };

Blockly.Blocks['spark_digitalwrite'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("Spark device")
        .appendField(new Blockly.FieldVariable("item"), "spark_device")
        .appendField("digital write pin")
        .appendField(new Blockly.FieldDropdown([["D0", "\"D0\""], ["D1", "\"D1\""],["D2", "\"D2\""],["D3", "\"D3\""],
            ["D4", "\"D4\""],["D5", "\"D5\""],["D6", "\"D6\""],["D7", "\"D7\""],
            ["A0", "\"A0\""], ["A1", "\"A1\""],["A2", "\"A2\""],["A3", "\"A3\""],
            ["A4", "\"A4\""],["A5", "\"A5\""],["A6", "\"A6\""],["A7", "\"A7\""]]), "pin")
        .appendField("value")
        .appendField(new Blockly.FieldDropdown([["Low", "\"LOW\""], ["High", "\"HIGH\""]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['spark_analogread'] = {
   init: function() {
     this.setHelpUrl('http://www.example.com/');
     this.setColour(230);
      this.appendDummyInput()
        .appendField("Spark device")
        .appendField(new Blockly.FieldVariable("item"), "spark_device")
         .appendField("analog read pin")
         .appendField(new Blockly.FieldDropdown([["A0", "\"A0\""], ["A1", "\"A1\""],["A2", "\"A2\""],["A3", "\"A3\""],
            ["A4", "\"A4\""],["A5", "\"A5\""],["A6", "\"A6\""],["A7", "\"A7\""]]), "pin");
     this.setInputsInline(true);
     this.setOutput(true, "Number");
     this.setTooltip('');
   }
 };

Blockly.Blocks['spark_analogwrite'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("Spark device")
        .appendField(new Blockly.FieldVariable("item"), "spark_device")
        .appendField("analog write pin")
        .appendField(new Blockly.FieldDropdown([["A0", "\"A0\""], ["A1", "\"A1\""],
            ["A4", "\"A4\""],["A5", "\"A5\""],["A6", "\"A6\""],["A7", "\"A7\""],["D0", "\"D0\""], ["D1", "\"D1\""]]), "pin")
    this.appendValueInput("value")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['spark_getvar'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendValueInput("variable")
        .appendField("Get");
    this.appendDummyInput()
        .appendField("of type ")
        .appendField(new Blockly.FieldDropdown([["integer number", "int"], ["real number", "float"], ["text", "str"]]), "type")
        .appendField("from Spark device")
        .appendField(new Blockly.FieldVariable("item"), "device");
    // this.appendDummyInput()
    //     .appendField("Get")
    //     .appendField(new Blockly.FieldVariable("variable"), "var")
    //     .appendField("from Spark device")
    //     .appendField(new Blockly.FieldVariable("item"), "device");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['spark_digitalwriteVal'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
   this.appendDummyInput()
        .appendField("Spark device")
        .appendField(new Blockly.FieldVariable("item"), "spark_device")
        .appendField("digital write pin")
        .appendField(new Blockly.FieldDropdown([["D0", "\"D0\""], ["D1", "\"D1\""],["D2", "\"D2\""],["D3", "\"D3\""],
            ["D4", "\"D4\""],["D5", "\"D5\""],["D6", "\"D6\""],["D7", "\"D7\""],
            ["A0", "\"A0\""], ["A1", "\"A1\""],["A2", "\"A2\""],["A3", "\"A3\""],
            ["A4", "\"A4\""],["A5", "\"A5\""],["A6", "\"A6\""],["A7", "\"A7\""]]), "pin");
    this.appendValueInput("value")
        .appendField("value");
        //.appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['spark_getfunc'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Call")
        .appendField(new Blockly.FieldTextInput("function"), "func")
        .appendField("from")
        .appendField(new Blockly.FieldVariable("spark"), "device")
        .appendField("with")
    this.appendValueInput("value")
        .appendField("as parameter");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};