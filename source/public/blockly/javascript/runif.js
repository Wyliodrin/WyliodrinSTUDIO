"use strict";



Blockly.JavaScript['runif_statements'] = function(block) {
  var value_if = Blockly.JavaScript.valueToCode(block, 'if', Blockly.JavaScript.ORDER_ATOMIC);
  var value_every = Blockly.JavaScript.valueToCode(block, 'every', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_lines = Blockly.JavaScript.statementToCode(block, 'lines');
  console.log (statements_lines);
  var dropdown_multiply = block.getFieldValue('multiply');
  var ifv = Blockly.JavaScript.variableDB_.getDistinctName('ifv', Blockly.Generator.NAME_TYPE);
  Blockly.JavaScript.definitions_[ifv] = 'var '+ifv+' = 0;';
  // TODO: Assemble JavaScript into code variable.
  var code = 'if (('+value_if+') && (Math.abs ('+ifv+'-Math.round(new Date().getTime()/1000) > '+value_every+'*'+dropdown_multiply+'))\n'+
          '{\n'+
  				statements_lines+
  				'  '+ifv+'=time.mktime(time.localtime()))\n'+
          '}\n';
  return code;
};


