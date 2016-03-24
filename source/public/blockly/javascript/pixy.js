Blockly.JavaScript.pixyImport = function ()
{
  Blockly.JavaScript.wiringpi();
}

Blockly.JavaScript.pixySet = function(pixy)
{
    Blockly.JavaScript.definitions_['pixy_setup'] = pixy+" = new "+Blockly.JavaScript.wyliodrin+".Pixy();\n"
                                              ;
}

Blockly.JavaScript.pixyAtr = function(pixy)
{
    Blockly.JavaScript.pixy+' = '+pixy+';\n';
}

Blockly.JavaScript.pixyEqual = function(pixy)
{
    pixy+' = '+Blockly.JavaScript.pixy+';\n';
}

Blockly.JavaScript['pixy_init'] = function(block) {
  Blockly.JavaScript.pixyImport();
  var variable_pixy = Blockly.visual.prefix_init + Blockly.JavaScript.variableDB_.getName(block.getFieldValue('pixy'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = 'if (!'+variable_pixy+') {\n  '+variable_pixy+" = new "+Blockly.JavaScript.wyliodrin+".Pixy();\n"+
  '  '+variable_pixy+'.init();\n}\n';
  Blockly.JavaScript.pixyAtr(variable_pixy);
  return code;
};

Blockly.JavaScript['pixy_blocks'] = function(block) {
  var value_pixy = Blockly.JavaScript.valueToCode(block, 'pixy', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.pixyEqual(value_pixy);
  var code = value_pixy+'.getBlocks()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pixy_block'] = function(block) {
  var value_pixy = Blockly.JavaScript.valueToCode(block, 'pixy', Blockly.JavaScript.ORDER_ATOMIC);
  var value_blocknr = Blockly.JavaScript.valueToCode(block, 'blockNr', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.pixyEqual(value_pixy);
  var code = value_pixy+'.getBlock('+value_blocknr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};