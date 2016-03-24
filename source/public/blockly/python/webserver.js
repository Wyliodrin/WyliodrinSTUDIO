"use strict";

Blockly.Python.webserver_parameters = {};

Blockly.Python.webserver = function ()
{
    if (!Blockly.Python.definitions_['import_flask'])
    {
    	var app= Blockly.Python.variableDB_.getDistinctName(
        'app', Blockly.Generator.NAME_TYPE);
        Blockly.Python.app = app;
        Blockly.Python.definitions_['import_flask'] = 'from flask import Flask\n'+app+' = Flask (__name__)\n';
    }
}

Blockly.Python.webserver_template = function ()
{
    if (!Blockly.Python.definitions_['import_render_template'])
    {
        Blockly.Python.definitions_['import_render_template'] = 'from flask import render_template\n';
    }
}

Blockly.Python.webserver_request = function ()
{
    if (!Blockly.Python.definitions_['import_request'])
    {
        Blockly.Python.definitions_['import_request'] = 'from flask import request\n';
    }
}

Blockly.Python['webserver_run'] = function(block) {
	Blockly.Python.webserver ();
  var dropdown_run = block.getFieldValue('run');
  // TODO: Assemble Python into code variable.
  var code = (dropdown_run == 'debug'?Blockly.Python.app+'.debug = True\n':'')+Blockly.Python.app+'.run (host=\'0.0.0.0\')\n';
  return code;
};

Blockly.Python['webserver_online'] = function(block) {
  Blockly.Python.webserver ();
  var dropdown_run = block.getFieldValue('run');
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.app+'.run (host=\'0.0.0.0\')\n';
  return code;
};

Blockly.Python['webserver_sendfile'] = function(block) {
  Blockly.Python.webserver();
  Blockly.Python.webserver_template ();
  var value_file = Blockly.Python.valueToCode(block, 'file', Blockly.Python.ORDER_ATOMIC);
  var value_route = Blockly.Python.valueToCode(block, 'route', Blockly.Python.ORDER_ATOMIC);
  var route_function= Blockly.Python.variableDB_.getDistinctName(
        'route', Blockly.Generator.NAME_TYPE);
  var data = "";
  var vars = Blockly.Variables.allVariables();
  console.log (vars);
  for (var i = vars.length - 1; i >= 0; i--) {
    var v = Blockly.Python.variableDB_.getName(vars[i],
          Blockly.Variables.NAME_TYPE);
    console.log (vars[i]);
    console.log (v);
    data += v +"="+v;
    if (i > 0) data += ", ";
  }
  // TODO: Assemble Python into code variable.
  var code = '@'+Blockly.Python.app+'.route ('+value_route+')\ndef '+route_function+'():\n  return render_template ('+value_file+', '+data+')\n';
  return code;
};

Blockly.Python['webserver_sendtext'] = function(block) {
	Blockly.Python.webserver();
  var value_string = Blockly.Python.valueToCode(block, 'string', Blockly.Python.ORDER_ATOMIC);
  var value_route = Blockly.Python.valueToCode(block, 'route', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var route_function= Blockly.Python.variableDB_.getDistinctName(
        'route', Blockly.Generator.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = '@'+Blockly.Python.app+'.route ('+value_route+')\ndef '+route_function+'():\n  return str('+value_string+')\n';
  return code;
};

Blockly.Python['webserver_statements'] = function(block) {
  Blockly.Python.webserver();
  Blockly.Python.webserver_template ();
  var value_route = Blockly.Python.valueToCode(block, 'route', Blockly.Python.ORDER_ATOMIC);
  var statements_statements = Blockly.Python.statementToCode(block, 'statements');
  var dropdown_method = block.getFieldValue('method');
  var dropdown_return = block.getFieldValue('return');
  var value_return = Blockly.Python.valueToCode(block, 'return', Blockly.Python.ORDER_ATOMIC);
  var route_function= Blockly.Python.variableDB_.getDistinctName(
        'route', Blockly.Generator.NAME_TYPE);
  var globals = Blockly.Variables.allVariables(block);
  for (var i=0; i<globals.length; i++) globals[i] = Blockly.Python.variableDB_.getName (globals[i], Blockly.Variables.NAME_TYPE);
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var vars = Blockly.Variables.allVariables();
  var data = '';
  for (var i = vars.length - 1; i >= 0; i--) {
    var v = Blockly.Python.variableDB_.getName(vars[i],
          Blockly.Variables.NAME_TYPE);
    console.log (vars[i]);
    console.log (v);
    data += v +"="+v;
    if (i > 0) data += ", ";
  }
  var ret = '';
  if (dropdown_return == 'text') ret='  return str('+value_return+')\n';
  else
  if (dropdown_return == 'file') ret='  return render_template ('+value_return+(data.length>0?', '+data:'')+')\n';
  console.log (dropdown_return);
  var route = '';
  var parameters = '';
  var parameter = value_route;
  while (parameter)
  {
    parameter = JSON.parse (parameter.substring (1));
    console.log (parameter);
    if (parameter.type == 'parameter_str')
    {
      route+=parameter.value;
    }
    else
    if (parameter.type == 'parameter')
    {
      route+="<"+(parameter.datatype=="str"?"":parameter.datatype+":")+parameter.value+">";
      if (parameters.length>0) parameters+=', ';
      parameters+=parameter.value;
    }
    parameter = parameter.next;
  }
  // TODO: Assemble Python into code variable.
  var code = '@'+Blockly.Python.app+'.route ("'+route+'", methods=[\''+dropdown_method+'\'])\ndef '+route_function+'('+parameters+'):\n'+globals+statements_statements+ret;
  return code;
};

Blockly.Python['webserver_parameter_str'] = function(block) {
  var value_next = Blockly.Python.valueToCode(block, 'next', Blockly.Python.ORDER_ATOMIC);
  var text_parameter_str = block.getFieldValue('parameter_str');
  // TODO: Assemble Python into code variable.
  var code = '#'+JSON.stringify ({type:'parameter_str', value:text_parameter_str, next:value_next});
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['webserver_parameter'] = function(block) {
  var value_next = Blockly.Python.valueToCode(block, 'next', Blockly.Python.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  var datatype = block.getFieldValue ("type");
  Blockly.Python.webserver_parameters[block.getFieldValue('parameter')] = Blockly.Python.variableDB_.getDistinctName (variable_parameter, Blockly.Variables.NAME_TYPE);
  // TODO: Assemble Python into code variable.
  var code = '#'+JSON.stringify ({type:'parameter', datatype: datatype, value:Blockly.Python.webserver_parameters[variable_parameter], next:value_next});
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['webserver_route_parameter'] = function(block) {
  var value_next = Blockly.Python.valueToCode(block, 'next', Blockly.Python.ORDER_ATOMIC);
  var variable_parameter = Blockly.Python.webserver_parameters[block.getFieldValue('parameter')];
  // TODO: Assemble Python into code variable.
  var code = variable_parameter;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['webserver_get_parameter'] = function(block) {
  Blockly.Python.webserver_request ();
  var value_next = Blockly.Python.valueToCode(block, 'next', Blockly.Python.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  // TODO: Assemble Python into code variable.
  var code = "request.args.get ('"+variable_parameter+"', '')";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['webserver_post_parameter'] = function(block) {
  Blockly.Python.webserver_request ();
  var value_next = Blockly.Python.valueToCode(block, 'next', Blockly.Python.ORDER_ATOMIC);
  var variable_parameter = block.getFieldValue('parameter');
  // TODO: Assemble Python into code variable.
  var code = "request.form['"+variable_parameter+"']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
