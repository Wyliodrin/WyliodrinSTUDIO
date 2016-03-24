Blockly.Python.pixyImport = function ()
{
  Blockly.Python.wiringpi();
}

// Blockly.Python.pixySet = function()
// {
//   if(!Blockly.Python.definitions_['pixy_setup'])
//   {
//     var p = Blockly.Python.variableDB_.getDistinctName('pixy', Blockly.Generator.NAME_TYPE);
//     Blockly.Python.pixy = p;
//     Blockly.Python.definitions_['pixy_setup'] = Blockly.Python.pixy+" = Pixy()\n";
//   }
// }

Blockly.Python.pixyAtr = function(pixy)
{
    Blockly.Python.pixy+' = '+pixy+'\n';
}

Blockly.Python.pixyEqual = function(pixy)
{
    pixy+' = '+Blockly.Python.pixy+'\n';
}

Blockly.Python['pixy_init'] = function(block) {
  Blockly.Python.pixyImport();
  var variable_pixy = Blockly.Python.variableDB_.getName(block.getFieldValue('pixy'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = variable_pixy +" = Pixy()\n"+
  variable_pixy+'.init()\n';
  Blockly.Python.pixyAtr(variable_pixy);
  return code;
};

Blockly.Python['pixy_blocks'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_pixy = Blockly.Python.valueToCode(block, 'pixy', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.pixyEqual(value_pixy);
  var code = value_pixy+'.getBlocks()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['pixy_block'] = function(block) {
  var value_blocknr = Blockly.Python.valueToCode(block, 'blockNr', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var value_pixy = Blockly.Python.valueToCode(block, 'pixy', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.pixyEqual(value_pixy);
  var code = value_pixy+'.getBlock('+value_blocknr+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};