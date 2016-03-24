
Blockly.JavaScript.import = function (label, module)
{
	if (!Blockly.JavaScript.definitions_['import_'+module])
	{
	    var w;
	    if (Blockly.visual.prefix_init != "")
	    {
	      w = Blockly.visual.prefix_init+label;
	    }
	    else
	    {
	  		w = Blockly.JavaScript.variableDB_.getDistinctName(
	          label, Blockly.Generator.NAME_TYPE);
	    }
			Blockly.JavaScript.wyliodrin = w;
	    if (Blockly.visual.prefix_init != "")
	    {
	      Blockly.JavaScript.definitions_['import_'+module] = 'if (!'+w+') '+w+' = '+Blockly.visual.prefix_init+'require("'+module+'");\n'
	    }
	    else
	    {
			  Blockly.JavaScript.definitions_['import_'+module] = 'var '+w+' = require("'+module+'");\n'
	    }
	    if (!Blockly.visual.imports) Blockly.visual.imports = {};
	    Blockly.visual.imports[module] = w;
	}
	return Blockly.visual.imports[module];
}

Blockly.JavaScript.variable_init = function (label, text)
{
	// console.log ('label '+label+', text '+text);
	if (!Blockly.JavaScript.definitions_[label])
	{
	    var w;
	    if (Blockly.visual.prefix_init != "")
	    {
	      w = Blockly.visual.prefix_init+label;
	    }
	    else
	    {
	  		w = Blockly.JavaScript.variableDB_.getDistinctName(
	          label, Blockly.Generator.NAME_TYPE);
	    }
			Blockly.JavaScript.wyliodrin = w;
			text = text.replace ('#'+label+'#', w);
	    if (Blockly.visual.prefix_init != "")
	    {
	      Blockly.JavaScript.definitions_[label] = 'if (!'+w+') { '+w+' = '+text+'; } \n'
	    }
	    else
	    {
			  Blockly.JavaScript.definitions_[label] = 'var '+w+' = '+text+';\n'
	    }
	    if (!Blockly.visual.variables_init) Blockly.visual.variables_init = {};
	    Blockly.visual.variables_init[label] = w;
	}
	return Blockly.visual.variables_init[label];
}

Blockly.JavaScript.function_init = function (label, text)
{
	// console.log ('label '+label+', text '+text);
	if (!Blockly.JavaScript.definitions_[label])
	{
	    var w;
	    if (Blockly.visual.prefix_init != "")
	    {
	      w = Blockly.visual.prefix_init+label;
	    }
	    else
	    {
	  		
	    }
			text = text.replace ('#'+label+'#', w);
	    if (Blockly.visual.prefix_init != "")
	    {
	      Blockly.JavaScript.definitions_[label] = 'if (!'+w+') { '+w+' = "init"; '+text+' } \n'
	    }
	    else
	    {
			  Blockly.JavaScript.definitions_[label] = text;
	    }
	    return true;
	}
	return false;
}




