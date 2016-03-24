"use strict";

Blockly.JavaScript.webserver_parameters = {};

Blockly.JavaScript.webserver = function ()
{
    if (!Blockly.JavaScript.definitions_['import_express'])
    {
    	var app= Blockly.JavaScript.variableDB_.getDistinctName(
        'app', Blockly.Generator.NAME_TYPE);
      var express= Blockly.JavaScript.variableDB_.getDistinctName(
        'express', Blockly.Generator.NAME_TYPE);
      var bodyparser= Blockly.JavaScript.variableDB_.getDistinctName(
        'bodyparser', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.express = express;
        Blockly.JavaScript.app = app;
        Blockly.JavaScript.bodyparser = bodyparser;
        Blockly.JavaScript.definitions_['import_express'] = 'var '+Blockly.JavaScript.express + ' = require (\'express\');\n'+
            'var '+Blockly.JavaScript.app+' = '+Blockly.JavaScript.express+'();\n'+
            Blockly.JavaScript.app +'.use (require (\'morgan\')("dev"));\n'+
            Blockly.JavaScript.bodyparser +'=require (\'body-parser\');\n'+
            Blockly.JavaScript.app +'.use ('+Blockly.JavaScript.bodyparser+'.json());\n'+
            Blockly.JavaScript.app +'.use ('+Blockly.JavaScript.bodyparser+'.urlencoded({ extended:true }));\n'+
            Blockly.JavaScript.app +'.use (\'static\', '+Blockly.JavaScript.express+'.static(__dirname+\'/static\'));\n';
    }
}

Blockly.JavaScript.webserver_template = function ()
{
    if (!Blockly.JavaScript.definitions_['import_jinja'])
    {
      var jinja= Blockly.JavaScript.variableDB_.getDistinctName(
        'jinja', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.jinja = jinja;
        Blockly.JavaScript.definitions_['import_jinja'] = 'var '+Blockly.JavaScript.jinja+' = require (\'jinja\');';
    }
}

Blockly.JavaScript.webserver_request = function ()
{
    if (!Blockly.JavaScript.definitions_['import_request'])
    {
        Blockly.JavaScript.definitions_['import_request'] = 'from flask import request\n';
    }
}

Blockly.JavaScript['webserver_run'] = function(block) {
	Blockly.JavaScript.webserver ();
  var dropdown_run = block.getFieldValue('run');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.app+'.listen (5000);';
  return code;
};

Blockly.JavaScript['webserver_online'] = function(block) {
  Blockly.JavaScript.webserver ();
  var dropdown_run = block.getFieldValue('run');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.express_server = Blockly.JavaScript.variableDB_.getDistinctName(
        'express_server', Blockly.Generator.NAME_TYPE);
  var code = 'var '+Blockly.JavaScript.express_server+'='+Blockly.JavaScript.app+'.listen (5000, function ()\n'+
    '{\n'+
    '  console.log(\'Listening on %s:%d\', '+Blockly.JavaScript.express_server+'.address().address, '+Blockly.JavaScript.express_server+'.address().port);\n'+
    '});\n';
  return code;
};

Blockly.JavaScript['webserver_sendfile'] = function(block) {
  Blockly.JavaScript.webserver();
  Blockly.JavaScript.webserver_template ();
  var value_file = Blockly.JavaScript.valueToCode(block, 'file', Blockly.JavaScript.ORDER_ATOMIC);
  var value_route = Blockly.JavaScript.valueToCode(block, 'route', Blockly.JavaScript.ORDER_ATOMIC);
  var data = "";
  var vars = Blockly.Variables.allVariables();
  console.log (vars);
  for (var i = vars.length - 1; i >= 0; i--) {
    var v = Blockly.JavaScript.variableDB_.getName(vars[i],
          Blockly.Variables.NAME_TYPE);
    console.log (vars[i]);
    console.log (v);
    data += v +":"+v;
    if (i > 0) data += ",\n  ";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.app+'.get ('+value_route+', function (request, response)\n'+
    '{\n'+
    '  response.send ('+Blockly.JavaScript.jinja+'.compileFile (__dirname+\'/templates/\'+'+value_file+').render({'+data+'}));\n'+
    '});\n';
  return code;
};

Blockly.JavaScript['webserver_sendtext'] = function(block) {
	Blockly.JavaScript.webserver();
  var value_string = Blockly.JavaScript.valueToCode(block, 'string', Blockly.JavaScript.ORDER_ATOMIC);
  var value_route = Blockly.JavaScript.valueToCode(block, 'route', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.app+'.get ('+value_route+', function (request, response)\n'+
    '{\n'+
    '  response.send (\'\'+'+value_string+');\n'+
    '});\n';
  return code;
};

Blockly.JavaScript['webserver_statements'] = function(block) {
  Blockly.JavaScript.webserver();
  Blockly.JavaScript.webserver_template ();
  var value_route = Blockly.JavaScript.valueToCode(block, 'route', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var dropdown_method = block.getFieldValue('method');
  var dropdown_return = block.getFieldValue('return');
  var value_return = Blockly.JavaScript.valueToCode(block, 'return', Blockly.JavaScript.ORDER_ATOMIC);
  var route_function= Blockly.JavaScript.variableDB_.getDistinctName(
        'route', Blockly.Generator.NAME_TYPE);
  // var globals = Blockly.Variables.allVariables(block);
  // globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var vars = Blockly.Variables.allVariables();
  var data = '';
  for (var i = vars.length - 1; i >= 0; i--) {
    var v = Blockly.JavaScript.variableDB_.getName(vars[i],
          Blockly.Variables.NAME_TYPE);
    console.log (vars[i]);
    console.log (v);
    data += v +":"+v;
    if (i > 0) data += ",\n  ";
  }
  var ret = '';
  if (dropdown_return == 'text') ret='  response.send (\'\'+'+value_return+');\n';
  else
  if (dropdown_return == 'file') ret='  response.send ('+Blockly.JavaScript.jinja+'.compileFile (__dirname+\'/templates\''+value_return+').render ({'+(data.length>0?data:'')+'});\n';
  console.log (dropdown_return);
  var route = '';
  var parameters = '';
  var parameter = value_route;
  while (parameter)
  {
    parameter = JSON.parse (parameter.substring (2));
    console.log (parameter);
    if (parameter.type == 'parameter_str')
    {
      route+=parameter.value;
    }
    else
    if (parameter.type == 'parameter')
    {
      route+=":"+parameter.value;
      if (parameters.length>0) parameters+=', ';
      parameters+=parameter.value;
    }
    parameter = parameter.next;
  }
  // TODO: Assemble JavaScript into code variable.
  // var code = '@'+Blockly.JavaScript.app+'.route ("'+route+'", methods=[\''+dropdown_method+'\'])\ndef '+route_function+'('+parameters+'):\n'+globals+statements_statements+ret;
  var code = Blockly.JavaScript.app+'.'+dropdown_method.toLowerCase()+' (\''+route+'\', function (request, response)\n'+
    '{\n'+
      statements_statements+
      ret+
    '});\n';
  return code;
};

Blockly.JavaScript['webserver_parameter_str'] = function(block) {
  var value_next = Blockly.JavaScript.valueToCode(block, 'next', Blockly.JavaScript.ORDER_ATOMIC);
  var text_parameter_str = block.getFieldValue('parameter_str');
  // TODO: Assemble JavaScript into code variable.
  var code = '//'+JSON.stringify ({type:'parameter_str', value:text_parameter_str, next:value_next});
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['webserver_parameter'] = function(block) {
  var value_next = Blockly.JavaScript.valueToCode(block, 'next', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  var datatype = block.getFieldValue ("type");
  Blockly.JavaScript.webserver_parameters[block.getFieldValue('parameter')] = Blockly.JavaScript.variableDB_.getDistinctName (variable_parameter, Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = '//'+JSON.stringify ({type:'parameter', datatype: datatype, value:Blockly.JavaScript.webserver_parameters[variable_parameter], next:value_next});
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['webserver_route_parameter'] = function(block) {
  var value_next = Blockly.JavaScript.valueToCode(block, 'next', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_parameter = Blockly.JavaScript.webserver_parameters[block.getFieldValue('parameter')];
  // TODO: Assemble JavaScript into code variable.
  var code = 'request.params.'+variable_parameter;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['webserver_get_parameter'] = function(block) {
  Blockly.JavaScript.webserver_request ();
  var value_next = Blockly.JavaScript.valueToCode(block, 'next', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  // TODO: Assemble JavaScript into code variable.
  var code = "request.query."+variable_parameter;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['webserver_post_parameter'] = function(block) {
  Blockly.JavaScript.webserver_request ();
  var value_next = Blockly.JavaScript.valueToCode(block, 'next', Blockly.JavaScript.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  // TODO: Assemble JavaScript into code variable.
  var code = "request.body."+variable_parameter;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
