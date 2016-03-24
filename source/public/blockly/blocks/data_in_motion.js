Blockly.Blocks['data_in_motion'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("rule id")
        .appendField(new Blockly.FieldTextInput(""), "ruleid");
    this.appendDummyInput()
        .appendField("context")
        .appendField(new Blockly.FieldTextInput(""), "context");
    this.appendDummyInput()
        .appendField("how")
        .appendField(new Blockly.FieldDropdown([["rule", "empty"], ["timer", "timer"], ["cache", "cache"]], function(option) {
          var timerandcache = (option != 'empty');
          this.sourceBlock_.updateShape_(timerandcache);
      }), "data");
    this.appendStatementInput("specifications");
    this.setInputsInline(true);
    this.setTooltip('');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var timerandcache = (this.getFieldValue('data') != 'empty');
    container.setAttribute('timerandcache', timerandcache);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hastimerandcache = (xmlElement.getAttribute('timerandcache') == 'true');
    this.updateShape_(hastimerandcache);  // Helper function for adding/removing 2nd input.
  },

  updateShape_: function(timerandcache) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('timerandcache');
    if (timerandcache) {
      if (!inputExists) {
        this.appendValueInput('timerandcache')
            .setCheck('Number');
        this.moveInputBefore ('timerandcache', 'specifications')
      }
    } else if (inputExists) {
      this.removeInput('timerandcache');
    }
  }
};

Blockly.Blocks['data_in_motion_action'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("action")
        .appendField(new Blockly.FieldDropdown([["event", "event"], ["timer", "timer"]], function(option) {
          var typetimer = (option == 'timer');
          this.sourceBlock_.updateShape_(typetimer);
      }), "type");
    this.appendValueInput("endpoint")
        .appendField("endpoint");
    this.appendStatementInput("action");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var typetimer = (this.getFieldValue('type') == 'timer');
    container.setAttribute('typetimer', typetimer);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hastypetimer = (xmlElement.getAttribute('typetimer') == 'true');
    this.updateShape_(hastypetimer);  // Helper function for adding/removing 2nd input.
  },

  updateShape_: function(typetimer) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('typetimer');
    if (typetimer) {
      if (!inputExists) {
        this.appendValueInput('typetimer')
            .appendField ('period')
            .setCheck('Number');
        this.moveInputBefore ('typetimer', 'endpoint')
      }
    } else if (inputExists) {
      this.removeInput('typetimer');
    }
  }
};

Blockly.Blocks['data_in_motion_action_name'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(25);
    this.appendDummyInput()
        .appendField("request")
        .appendField(new Blockly.FieldDropdown([["GetHeader", "GetHeader"], ["GetPayload", "GetPayload"], ["GpsUpdate", "GpsUpdate"], ["Fetchdata", "Fetchdata"]]), "name");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['data_in_motion_action_endpoint'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(145);
    this.appendDummyInput()
        .appendField("method")
        .appendField(new Blockly.FieldDropdown([["tcp", ""], ["http", "http"]]), "method");
    this.appendValueInput("address")
        .appendField("address");
    this.appendValueInput("port")
        .appendField("port");
    this.appendValueInput("resource")
        .appendField("resource");
    this.setOutput(true);
    this.setTooltip('');
  }
};

