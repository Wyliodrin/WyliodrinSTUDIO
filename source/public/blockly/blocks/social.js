"use strict";

goog.provide('Blockly.Blocks.social');

goog.require('Blockly.Blocks');


Blockly.Blocks['mail_setup'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Setup")
        .appendField(new Blockly.FieldDropdown([["GMail", "gmail"], ["Yahoo", "yahoo"], ["Hotmail", "hotmail"]]), "server");
    this.appendValueInput("Your e-mail")
        .setCheck("String")
        .appendField("Your e-mail");
    this.appendValueInput("password")
        .setCheck("String")
        .appendField("Password");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['mail_send'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_mail');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Send mail");
    this.appendValueInput("toAddr")
        .setCheck("String")
        .appendField("To");
    this.appendValueInput("subj")
        .setCheck("String")
        .appendField("Subject");
    this.appendValueInput("msg")
        .setCheck("String")
        .appendField("Message");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['attachment_mail_send'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_mail');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Send mail");
    this.appendValueInput("toAddr")
        .setCheck("String")
        .appendField("To");
    this.appendValueInput("subj")
        .setCheck("String")
        .appendField("Subject");
    this.appendValueInput("msg")
        .setCheck("String")
        .appendField("Message");
    this.appendValueInput("attachment")
        .setCheck("String")
        .appendField("Attachment");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['facebook_setup'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup1');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Facebook setup");
    this.appendValueInput("token")
        .setCheck("String")
        .appendField("Access Token");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_post'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#post');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Post on Facebook");
    this.appendValueInput("message")
        .setCheck("String")
        .appendField("Message");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_friendslist'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_friends_list');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Get friends list");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_getfriend'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_friend');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Get the #");
    this.appendValueInput("friendNumber")
        .setCheck("Number");
    this.appendValueInput("friendList")
        .appendField("friend from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_notifications'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_notifications');
    this.setColour(240);
    this.appendDummyInput()
        .appendField("Get notifications");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_getlikes'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendValueInput("page")
        .setCheck("String")
        .appendField("Get # of likes from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['facebook_getgroupposts'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(240);
    this.appendValueInput("group")
        .appendField("Get posts from group");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['twitter_setup'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#twitter_setup');
    this.setColour(270);
    this.appendDummyInput()
        .appendField("Twitter setup");
    this.appendValueInput("consKey")
        .setCheck("String")
        .appendField("Consumer key");
    this.appendValueInput("consSecret")
        .setCheck("String")
        .appendField("Consumer secret");
    this.appendValueInput("accessToken")
        .setCheck("String")
        .appendField("Access token");
    this.appendValueInput("accessTokenSecret")
        .setCheck("String")
        .appendField("Access token secret");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twitter_post'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#tweet');
    this.setColour(270);
    this.appendDummyInput()
        .appendField("Post on Twitter");
    this.appendValueInput("msg")
        .setCheck("String")
        .appendField("Message");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twitter_timeline'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_timeline');
    this.setColour(270);
    this.appendDummyInput()
        .appendField("Get timeline");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twitter_user_timeline'] = {
  init: function() {
    console.log('init');
    this.setHelpUrl('');
    this.setColour(270);
    this.setOutput(true);
    this.setTooltip('');
    this.setInputsInline(true);
    this.appendDummyInput()
        .appendField("Get tweets from")
        .appendField(new Blockly.FieldDropdown([["me", "my"], ["user", "user"]], function(option){
            var insertUser = (option == 'user');
            this.sourceBlock_.updateShape_(insertUser, this);
        }), "dropdown");   
  },
  domToMutation: function(xmlElement) {
    var usernameInput = (xmlElement.getAttribute('username') == 'true');
    this.updateShape_(usernameInput);
  },
  mutationToDom: function() {
    console.log("to dom");
      var container = document.createElement('mutation');
      var username = (this.getFieldValue('dropdown') == 'user');
      container.setAttribute('username', username);
      return container;
  },
  updateShape_: function(insertUser) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('username');
    if (insertUser) {
      if (!inputExists) {
        this.appendValueInput('username')
            .setCheck('String');
      }
    } else if (inputExists) {
      this.removeInput('username');
    }
  }
};



Blockly.Blocks['twilio_setup'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#setup2');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Twilio setup");
    this.appendValueInput("twi_account")
        .appendField("Account");
    this.appendValueInput("twi_token")
        .appendField("Token");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_call_say'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#make_a_call');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Make a Call");
    this.appendValueInput("twi_to")
        .appendField("To");
    this.appendValueInput("twi_from")
        .appendField("From");
    this.appendValueInput("twi_say")
        .appendField("Say");
    this.appendDummyInput()
        .appendField("in")
        .appendField(new Blockly.FieldDropdown([["English", "en-EN"], ["German", "de-DE"], ["French", "fr-FR"]]), "twi_language");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_call_music_url'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#make_a_call_with_music');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Make a Call");
    this.appendValueInput("twi_to")
        .appendField("To");
    this.appendValueInput("twi_from")
        .appendField("From");
    this.appendValueInput("twi_music_url")
        .appendField("Music URL");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_msg'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#send_a_sms');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Send an SMS");
    this.appendValueInput("twiSMS_to")
        .appendField("To");
    this.appendValueInput("twiSMS_from")
        .appendField("From");
    this.appendValueInput("twi_msg")
        .appendField("Message");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_calllist'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_call_list');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Get your call list");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_msglist'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_sms_list');
    this.setColour(355);
    this.appendDummyInput()
        .appendField("Get your SMS list");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_getSMS'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_sms');
    this.setColour(355);
    this.appendValueInput("nrSms")
        .appendField("Get the #");
    this.appendValueInput("smsList")
        .appendField("SMS from ");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['twilio_getcall'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_a_call');
    this.setColour(355);
    this.appendValueInput("nrCall")
        .appendField("Get the #");
    this.appendValueInput("callLi")
        .appendField("call from ");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['communication_open_connection'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendValueInput("message")
        .setCheck("null")
        .appendField("On message");
    this.appendValueInput("from_id")
	    .setCheck("null")
        .appendField("Received from");
    this.appendValueInput("label")
        .setCheck("String")
        .appendField("With label");
    this.appendStatementInput("commands")
        .setCheck("null")
        .appendField("Do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['communication_open_connection_label'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendValueInput("label")
        .setCheck("String")
        .appendField("For label");
    this.appendValueInput("message")
        .setCheck("null")
        .appendField("On message");
    this.appendValueInput("from_id")
        .setCheck("null")
        .appendField("Received from");
     this.appendValueInput("channel")
        .setCheck("null")
        .appendField("With label");
    this.appendStatementInput("commands")
        .setCheck("null")
        .appendField("Do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['communication_send_message'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendValueInput("message")
        .appendField("Send message");
    this.appendValueInput("id")
        .appendField("To");
    this.appendValueInput("label")
        .setCheck("String")
        .appendField("With label");    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


