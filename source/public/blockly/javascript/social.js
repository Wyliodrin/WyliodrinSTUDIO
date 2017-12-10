Blockly.JavaScript.mailImport = function ()
{
  if (!Blockly.JavaScript.definitions_['import_mail'])
  {
    var ema = Blockly.JavaScript.variableDB_.getDistinctName(
        'emailVar', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.mailS = ema;
    var auxSysM = Blockly.JavaScript.variableDB_.getDistinctName('SysMail', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.mailSys = auxSysM;
    Blockly.JavaScript.definitions_['import_mail'] = "var "+Blockly.JavaScript.mailSys+" = require('sys');\n"+
    "var "+Blockly.JavaScript.mailS+" = require('nodemailer');\nif (!"+Blockly.JavaScript.mailS+"){\n  console.log("+'"Please open the Shell and run \'social_install\' script");\n  '+Blockly.JavaScript.mailSys+'.exit(1);}\n';
  }
}

Blockly.JavaScript.mailSetup = function (username, password)
{
  if (!Blockly.JavaScript.definitions_['mail_setup'])
    {
      var auxName = Blockly.JavaScript.variableDB_.getDistinctName('mail_name', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.mailName = auxName;
      var auxPass = Blockly.JavaScript.variableDB_.getDistinctName('mail_password', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.mailPassword = auxPass;
      Blockly.JavaScript.definitions_['mail_setup'] = Blockly.JavaScript.mailName+' = '+username+';\n'+
                            Blockly.JavaScript.mailPassword+' = '+password+';\n'
                            ;
    }
}

Blockly.JavaScript.mailSetVar = function ()
{
  if (!Blockly.JavaScript.definitions_['mailSetVar'])
    {
      Blockly.JavaScript.mailSetup()
      Blockly.JavaScript.definitions_['mailSetVar'] = "function sendMail(fromAdd, pass, toAdd, subj, mess){\n"+
                                                      ' var smtpTransport = '+Blockly.JavaScript.mailS+'.createTransport("SMTP",{\n'+
                                                      ' auth: {\n'+
                                                      ' user: fromAdd,\n'+
                                                      ' pass: pass, \n'+
                                                      ' }\n'+
                                                      ' });\n'+
                                                      " var mailOptions = {\n"+
                                                      " from: fromAdd,\n"+
                                                      " to: toAdd,\n"+
                                                      " subject: subj,\n"+
                                                      " html: mess\n"+
                                                      " }\n"+
                                                      "smtpTransport.sendMail(mailOptions, function(error, response){\n"+
                                                      " if(error){\n"+
                                                      "   console.log(error);\n"+
                                                      " }else{\n"+
                                                          "console.log('Message sent');\n"+
                                                      "}\n"+
                                                      "smtpTransport.close();\n"+
                                                      "});\n"+
                                                      "}\n";
    }
}

Blockly.JavaScript.facebookImport = function ()
{
  if (!Blockly.JavaScript.definitions_['import_facebook'])
    {
      var fb = Blockly.JavaScript.variableDB_.getDistinctName(
        'fbVar', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.facebookV = fb;
      var auxSysF = Blockly.JavaScript.variableDB_.getDistinctName('SysFb', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.facebookSys = auxSysF;
      Blockly.JavaScript.definitions_['import_facebook'] = "var "+Blockly.JavaScript.facebookSys+" = require('sys');\n"+
                          "var "+Blockly.JavaScript.facebookV+" = require('fb');\nif (!"+Blockly.JavaScript.facebookV+"){\n  console.log("+'"Please open the Shell and run \'social_install\' script");\n  '+Blockly.JavaScript.facebookSys+'.exit(1);}\n';
    }
}

Blockly.JavaScript.facebookSetup = function (fbtoken)
{
  if (!Blockly.JavaScript.definitions_['facebook_setup'])
    {
      var auxToken = Blockly.JavaScript.variableDB_.getDistinctName('facebook_token', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.fbToken = auxToken;
      Blockly.JavaScript.definitions_['facebook_setup'] = Blockly.JavaScript.fbToken+' = '+fbtoken+';\n'+
      Blockly.JavaScript.facebookV+".setAccessToken("+Blockly.JavaScript.fbToken+");\n"
                            ;
    }
}

Blockly.JavaScript.twitterImport = function ()
{
  if (!Blockly.JavaScript.definitions_['import_twitter'])
    {
      var twit = Blockly.JavaScript.variableDB_.getDistinctName('twitterVar', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterV = twit;
      var auxSys = Blockly.JavaScript.variableDB_.getDistinctName('SysTwitter', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterSys = auxSys;
      Blockly.JavaScript.definitions_['import_twitter'] = "var "+Blockly.JavaScript.twitterSys+" = require('sys');\n"+ 
                                                          "var "+Blockly.JavaScript.twitterV+" = require('twitter-ng');\nif (!"+Blockly.JavaScript.twitterV+"){\n  console.log("+'"Please open the Shell and run \'social_install\' script");\n  '+Blockly.JavaScript.twitterSys+'.exit(1);}\n';
    }

}

Blockly.JavaScript.twitterSetup = function (cKey, cSecret, aToken, aTSecret)
{
  if (!Blockly.JavaScript.definitions_['twitter_setup'])
    {
      var auxKey = Blockly.JavaScript.variableDB_.getDistinctName('twitter_key', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterKey = auxKey;
      var auxSecret = Blockly.JavaScript.variableDB_.getDistinctName('twitter_secret', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterSecret = auxSecret;
      var auxToken = Blockly.JavaScript.variableDB_.getDistinctName('twitter_token', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterToken = auxToken;
      var auxSecretToken = Blockly.JavaScript.variableDB_.getDistinctName('twitter_secretToken', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twitterSecretToken = auxSecretToken;
      var auxtweet = Blockly.JavaScript.variableDB_.getDistinctName('twitter_tweet', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.tweetText = auxtweet;
      Blockly.JavaScript.definitions_['twitter_setup'] = Blockly.JavaScript.twitterKey+' = '+cKey+';\n'+
                            Blockly.JavaScript.twitterSecret+' = '+cSecret+';\n'+
                            Blockly.JavaScript.twitterToken+' = '+aToken+';\n'+
                            Blockly.JavaScript.twitterSecretToken+' = '+aTSecret+';\n'+
                            "var twitterObject = new "+Blockly.JavaScript.twitterV+"({\n"+
                            "consumer_key: "+Blockly.JavaScript.twitterKey+",\n"+
                            "consumer_secret: "+Blockly.JavaScript.twitterSecret+",\n"+
                            "access_token_key: "+Blockly.JavaScript.twitterToken+",\n"+
                            "access_token_secret: "+Blockly.JavaScript.twitterSecretToken+"\n"+
                            "});\n"
                            ;
    }
}



Blockly.JavaScript.twilioSetup = function (twiAccount, twiToken)
{
  if (!Blockly.JavaScript.definitions_['twilio_setup'])
    {
      var auxTwiAcc = Blockly.JavaScript.variableDB_.getDistinctName('twilio_account', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twilioAccount = auxTwiAcc;
      var auxTwiT = Blockly.JavaScript.variableDB_.getDistinctName('twilio_token', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twilioToken = auxTwiT;
      var auxClient = Blockly.JavaScript.variableDB_.getDistinctName('twilio_client', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twilioClient = auxClient;
      var auxMessage = Blockly.JavaScript.variableDB_.getDistinctName('twilio_message', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.twilioMessage = auxMessage;
      Blockly.JavaScript.definitions_['twilio_setup'] = Blockly.JavaScript.twilioAccount+' = '+twiAccount+';\n'+
                                  Blockly.JavaScript.twilioToken+' = '+twiToken+';\n'+
                                  "var "+Blockly.JavaScript.twilioClient+" = require('twilio')("+Blockly.JavaScript.twilioAccount+", "+ Blockly.JavaScript.twilioToken+");\n";
                                  ;
    }
}

Blockly.JavaScript.queryStringImport = function ()
{
  if (!Blockly.JavaScript.definitions_['import_querystring'])
    {
      var querystring = Blockly.JavaScript.variableDB_.getDistinctName(
        'querystring', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.querystring = querystring;
    Blockly.JavaScript.definitions_['import_querystring'] = "var "+Blockly.JavaScript.querystring+" = require('querystring');\n"
    }
}




Blockly.JavaScript['mail_setup'] = function(block) {
  Blockly.JavaScript.mailImport();
  var value_mailadd = Blockly.JavaScript.valueToCode(block, 'Your e-mail', Blockly.JavaScript.ORDER_ATOMIC);
  var value_password = Blockly.JavaScript.valueToCode(block, 'password', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_server = block.getFieldValue('server');
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.mailSetup(value_mailadd, value_password);
  var code = '';
  return code;
};

Blockly.JavaScript['mail_send'] = function(block) {
  Blockly.JavaScript.mailSetVar();
  var value_toaddr = Blockly.JavaScript.valueToCode(block, 'toAddr', Blockly.JavaScript.ORDER_ATOMIC);
  var value_subj = Blockly.JavaScript.valueToCode(block, 'subj', Blockly.JavaScript.ORDER_ATOMIC);
  var value_msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
 var code = 'sendMail('+Blockly.JavaScript.mailName+', '+Blockly.JavaScript.mailPassword+', '+value_toaddr+', '+value_subj+', '+value_msg+');\n';
  return code;
};


Blockly.JavaScript['attachment_mail_send'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "//AttachmentMailSend block not supported in javascript\n";
  return code;
};



Blockly.JavaScript['facebook_setup'] = function(block) {
  Blockly.JavaScript.facebookImport();
  var value_token = Blockly.JavaScript.valueToCode(block, 'token', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.facebookSetup(value_token);
  var code = '';
  return code;
};

Blockly.JavaScript['facebook_post'] = function(block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "var body = String("+value_message+");\n"+
  Blockly.JavaScript.facebookV+".api('me/feed', 'post', { message: body}, function (res) {\n"+
  "if(!res || res.error) {\n"+
  " console.log(res.error);\n"+
  "return;\n"+
  "}\n"+
  "});\n"
  ;
  return code;
};


Blockly.JavaScript['facebook_friendslist'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Facebook Friends List');
  var code = '[] /*Block not supported in JavaScript*/';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['facebook_getfriend'] = function(block) {
  var value_friendnumber = Blockly.JavaScript.valueToCode(block, 'friendNumber', Blockly.JavaScript.ORDER_ATOMIC);
  var value_friendlist = Blockly.JavaScript.valueToCode(block, 'friendList', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Facebook Get Friend');
  var code = "{} /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['facebook_notifications'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Facebook Notifications');
  var code = "[] /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['facebook_getlikes'] = function(block) {
  var value_page = Blockly.JavaScript.valueToCode(block, 'page', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Facebook Get Likes');
  var code = "0 /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['facebook_getgroupposts'] = function(block) {
  var value_group = Blockly.JavaScript.valueToCode(block, 'group', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Facebook Get Group Posts');
  var code = "[] /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['twitter_setup'] = function(block) {
  Blockly.JavaScript.twitterImport();
  var value_conskey = Blockly.JavaScript.valueToCode(block, 'consKey', Blockly.JavaScript.ORDER_ATOMIC);
  var value_conssecret = Blockly.JavaScript.valueToCode(block, 'consSecret', Blockly.JavaScript.ORDER_ATOMIC);
  var value_accesstoken = Blockly.JavaScript.valueToCode(block, 'accessToken', Blockly.JavaScript.ORDER_ATOMIC);
  var value_accesstokensecret = Blockly.JavaScript.valueToCode(block, 'accessTokenSecret', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.twitterSetup(value_conskey, value_conssecret, value_accesstoken, value_accesstokensecret);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  return code;
};

Blockly.JavaScript['twitter_post'] = function(block) {
  var value_msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "twitterObject.updateStatus("+value_msg+",function(data) {});\n"
  ;
  return code;
};

Blockly.JavaScript['twitter_timeline'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Twitter Get Timeline');
  var code = "[] /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['twitter_user_timeline'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.NoSupportFor ('Twitter Get User Timeline');
  var code = "[] /*Block not supported in JavaScript*/";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['twilio_setup'] = function(block) {
  var value_twi_account = Blockly.JavaScript.valueToCode(block, 'twi_account', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_token = Blockly.JavaScript.valueToCode(block, 'twi_token', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  Blockly.JavaScript.twilioSetup(value_twi_account, value_twi_token);
  var code = '';
  return code;
};

Blockly.JavaScript['twilio_call_say'] = function(block) {
  Blockly.JavaScript.queryStringImport ();
  var value_twi_to = Blockly.JavaScript.valueToCode(block, 'twi_to', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_from = Blockly.JavaScript.valueToCode(block, 'twi_from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_say = Blockly.JavaScript.valueToCode(block, 'twi_say', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_twi_language = block.getFieldValue('twi_language');
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.twilioClient+'.makeCall({to:'+value_twi_to+', from:'+value_twi_from+", url: 'http://twimlets.com/echo?'+"+Blockly.JavaScript.querystring+'.stringify({\'Twiml\': \'<Response><Say voice=\"alice\" language=\"'+dropdown_twi_language+'\">\'+'+value_twi_say+'+\'</Say></Response>\'})\n'+
    "},  function(err, responseData) {\n"+
    " console.log(err);});\n"
  ;
  return code;
};

Blockly.JavaScript['twilio_call_music_url'] = function(block) {
  Blockly.JavaScript.queryStringImport ();
  var value_twi_to = Blockly.JavaScript.valueToCode(block, 'twi_to', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_from = Blockly.JavaScript.valueToCode(block, 'twi_from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_music_url = Blockly.JavaScript.valueToCode(block, 'twi_music_url', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.twilioClient+'.makeCall({to:'+value_twi_to+', from:'+value_twi_from+", url: 'http://twimlets.com/message?'+"+Blockly.JavaScript.querystring+'.stringify({\'Message[0]\': '+value_twi_music_url+"})\n"+
    "},  function(err, responseData) {\n"+
    " console.log(err);});\n"
  ;
  return code;
};


Blockly.JavaScript['twilio_msg'] = function(block) {
  var value_twisms_to = Blockly.JavaScript.valueToCode(block, 'twiSMS_to', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twisms_from = Blockly.JavaScript.valueToCode(block, 'twiSMS_from', Blockly.JavaScript.ORDER_ATOMIC);
  var value_twi_msg = Blockly.JavaScript.valueToCode(block, 'twi_msg', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = Blockly.JavaScript.twilioClient+'.sendMessage({to:'+value_twisms_to+', from:'+value_twisms_from+", body:"+value_twi_msg+'\n'+
    "}, function(err, responseData) {\n"+
    " if (err) {\n"+
    "   console.log(err);\n"+
    " }\n"+
    "});\n";
  return code;
};

Blockly.JavaScript['twilio_calllist'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code ="//Block not supported in JavaScript.\n"+
  "console.log('Block not supported in JavaScript.')"
  ;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['twilio_getcall'] = function(block) {
  var value_nrcall = Blockly.JavaScript.valueToCode(block, 'nrCall', Blockly.JavaScript.ORDER_ATOMIC);
  var value_callli = Blockly.JavaScript.valueToCode(block, 'callLi', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "//Block not supported in JavaScript.\n"+
  "console.log('Block not supported in JavaScript.')";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['twilio_msglist'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "//Block not supported in JavaScript.\n"+
  "console.log('Block not supported in JavaScript.')"
  ;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['twilio_getSMS'] = function(block) {
  var value_nrsms = Blockly.JavaScript.valueToCode(block, 'nrSms', Blockly.JavaScript.ORDER_ATOMIC);
  var value_smslist = Blockly.JavaScript.valueToCode(block, 'smsList', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "//Block not supported in JavaScript.\n"+
  "console.log('Block not supported in JavaScript.')"
  ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['communication_open_connection'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '//Communication open connection block not supported in javascript\n';
  Blockly.JavaScript.NoSupportFor('communication_open_connection');
  return code;
};

Blockly.JavaScript['communication_open_connection_label'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '//Communication open connection label block not supported in javascript\n';
  Blockly.JavaScript.NoSupportFor('communication_open_connection_label');
  return code;
};


Blockly.JavaScript['communication_send_message'] = function(block) {
  var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
  var value_label = Blockly.JavaScript.valueToCode(block, 'label', Blockly.JavaScript.ORDER_ATOMIC);
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '//Communication send message block not supported in javascript\n';
  Blockly.JavaScript.NoSupportFor('communication_send_message');
  return code;
};


