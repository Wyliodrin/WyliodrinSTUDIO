Blockly.JavaScript['data_in_motion'] = function(block) {
  var text_ruleid = block.getFieldValue('ruleid');
  var text_context = block.getFieldValue('context');
  var dropdown_data = block.getFieldValue('data');
  var timer;
  var cache;
  if (dropdown_data == "timer") timer = Blockly.JavaScript.valueToCode(block, 'timerandcache', Blockly.JavaScript.ORDER_ATOMIC);
  if (dropdown_data == "cache") cache = Blockly.JavaScript.valueToCode(block, 'timerandcache', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_specifications = Blockly.JavaScript.statementToCode(block, 'specifications');
  // TODO: Assemble JavaScript into code variable.
  var meta = {
	  	"meta" : {
	  		"ruleid": text_ruleid,
	  		"context": text_context,
	  		"timer": timer,
	  		"cache": cache
  		}
  	  };
  var rule = meta;
  if (statements_specifications)
  {
  	console.log ('['+statements_specifications.substring (0, statements_specifications.length-2)+']');
	  var specifications = JSON.parse ('['+statements_specifications.substring (0, statements_specifications.length-2)+']');
	  for (var l = 0; l<specifications.length; l++)
	  {
	  	goog.object.extend (rule, specifications[l]);
	  }
  }
  var code = JSON.stringify (rule
  	, null, 2);
  console.log (code);
  return code;
};

Blockly.JavaScript['data_in_motion_action'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var value_endpoint = Blockly.JavaScript.valueToCode(block, 'endpoint', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
  var period;
  if (dropdown_type == "timer") period = Blockly.JavaScript.valueToCode(block, 'typetimer', Blockly.JavaScript.ORDER_ATOMIC);
  var  name = '';
  var endpoint = '';
  if (value_endpoint) endpoint = JSON.parse (value_endpoint);
  console.log (statements_action);
  if (statements_action)
  {
  	name = JSON.parse ('['+statements_action.substring(0, statements_action.length-2)+']');
  }
  // TODO: Assemble JavaScript into code variable.
  var code = JSON.stringify ({
	  	"action" : {
	  		"type": dropdown_type,
	  		"period": period,
	  		"name": name,
	  		"endpoint": endpoint
  		}
  	}, null, 2)+',\n';
  console.log (code);
  return code;
};

Blockly.JavaScript['data_in_motion_action_name'] = function(block) {
  var dropdown_name = block.getFieldValue('name');
  // TODO: Assemble JavaScript into code variable.
  var code = '"'+dropdown_name+'",\n';
  console.log (code);
  return code;
};

Blockly.JavaScript['data_in_motion_action_endpoint'] = function(block) {
  var dropdown_method = block.getFieldValue('method');
  var value_address = Blockly.JavaScript.valueToCode(block, 'address', Blockly.JavaScript.ORDER_ATOMIC);
  var value_port = Blockly.JavaScript.valueToCode(block, 'port', Blockly.JavaScript.ORDER_ATOMIC);
  var value_resource = Blockly.JavaScript.valueToCode(block, 'resource', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = JSON.stringify ({
  		method: dropdown_method,
  		addr: value_address,
  		port: value_port,
  		resource: value_resource
  	}, null, 2);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


