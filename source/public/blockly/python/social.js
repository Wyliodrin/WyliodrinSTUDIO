Blockly.Python.importJson = function ()
{
  if (!Blockly.Python.definitions_['importJson'])
  {
    Blockly.Python.definitions_['importJson'] = "import json\n";
    }
}

Blockly.Python.mail = function ()
{
	if (!Blockly.Python.definitions_['import_mail'])
	{
		Blockly.Python.definitions_['import_mail'] = "import sys\n"+
    'try:\n  from email.MIMEMultipart import MIMEMultipart\n  from email.mime.image import MIMEImage\n  from email.mime.base import MIMEBase\n  from email.mime.audio import MIMEAudio\n  from email import encoders\n  from email.MIMEText import MIMEText\n  import smtplib\n  import mimetypes\nexcept:\n  print("Please open the Shell and run \'social_install\'")\n  sys.exit(1)\n';
	}
}

Blockly.Python.facebookImport = function ()
{
  if (!Blockly.Python.definitions_['import_fb'])
  {
    Blockly.Python.definitions_['import_fb'] = "import sys\n"+
                  'try:\n  import facebook\nexcept:\n  print("Please open the Shell and run \'social_install\' script")\n  sys.exit(1)\n';
  }
}

Blockly.Python.requestImport = function ()
{
  if (!Blockly.Python.definitions_['import_rq'])
  {
    Blockly.Python.definitions_['import_rq'] = "import requests\n";
  }
}

Blockly.Python.twitterImport = function ()
{
  if (!Blockly.Python.definitions_['import_tw'])
  {
    Blockly.Python.definitions_['import_tw'] = "import sys\n"+
                              'try:\n  import tweepy\nexcept:\n  print("Please open the Shell and run \'social_install\' script")\n  sys.exit(1)\n';
  }
}

Blockly.Python.twilioImport = function ()
{
  if (!Blockly.Python.definitions_['import_twi'])
  {
    Blockly.Python.definitions_['import_twi'] = "import sys\n"+
                  'try:\n  from twilio.rest import TwilioRestClient\nexcept:\n  print("Please open the Shell and run \'social_install\' script")\n  sys.exit(1)\n';
  }
}

Blockly.Python.urllibImport = function ()
{
  if (!Blockly.Python.definitions_['import_urllib'])
  {
    Blockly.Python.definitions_['import_urllib'] = 'from urllib import *\n';
  }
}



Blockly.Python.mailSetup = function (server, port, username, password)
{
	if (!Blockly.Python.definitions_['mail_setup'])
  	{
    	var auxServer = Blockly.Python.variableDB_.getDistinctName('mail_server', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.mailServer = auxServer;
    	var auxName = Blockly.Python.variableDB_.getDistinctName('mail_name', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.mailName = auxName;
    	var auxPass = Blockly.Python.variableDB_.getDistinctName('mail_password', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.mailPassword = auxPass;
    	var auxPort = Blockly.Python.variableDB_.getDistinctName('mail_port', Blockly.Generator.NAME_TYPE);
    	Blockly.Python.mailPort = auxPort;
      if (server == 'gmail') 
        server = "'smtp.gmail.com'";
      if (server == 'yahoo') 
        server = "'smtp.mail.yahoo.com'";
      if (server == 'hotmail') 
        server = "'smtp.live.com'";
    	Blockly.Python.definitions_['mail_setup'] = Blockly.Python.mailServer+' = '+server+'\n'+
											    	Blockly.Python.mailPort+' = '+port+'\n'+
											    	Blockly.Python.mailName+' = '+username+'\n'+
											    	Blockly.Python.mailPassword+' = '+password+'\n'
											    	;
  	}
}

Blockly.Python.facebookSetup = function (fbToken)
{
  if (!Blockly.Python.definitions_['facebook_setup'])
    {
      var auxFbT = Blockly.Python.variableDB_.getDistinctName('facebook_token', Blockly.Generator.NAME_TYPE);
      Blockly.Python.facebookToken = auxFbT;
      Blockly.Python.definitions_['facebook_setup'] = Blockly.Python.facebookToken+' = '+fbToken+'\n';
    }
}

Blockly.Python.fbLikeSetup = function ()
{
  if (!Blockly.Python.definitions_['fbLike'])
    {
      Blockly.Python.definitions_['fbLike'] = 'def getLikes(user):\n'+
                                  '  url = "https://graph.facebook.com/"+user\n'+
                                  "  response = requests.get(url)\n"+
                                  "  profile = response.json()\n"+
                                  "  likes = profile['likes']\n"+
                                  "  return likes"
                                  ;
    }
}

Blockly.Python.twitterSetup = function (cKey, cSecret, aToken, aTSecret)
{
  if (!Blockly.Python.definitions_['twitter_setup'])
    {
      var auxKey = Blockly.Python.variableDB_.getDistinctName('twitter_key', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twitterKey = auxKey;
      var auxSecret = Blockly.Python.variableDB_.getDistinctName('twitter_secret', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twitterSecret = auxSecret;
      var auxToken = Blockly.Python.variableDB_.getDistinctName('twitter_token', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twitterToken = auxToken;
      var auxSecretToken = Blockly.Python.variableDB_.getDistinctName('twitter_secretToken', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twitterSecretToken = auxSecretToken;
      var auxtweet = Blockly.Python.variableDB_.getDistinctName('twitter_tweet', Blockly.Generator.NAME_TYPE);
      Blockly.Python.tweetText = auxtweet;
      Blockly.Python.definitions_['twitter_setup'] = Blockly.Python.twitterKey+' = '+cKey+'\n'+
                            Blockly.Python.twitterSecret+' = '+cSecret+'\n'+
                            Blockly.Python.twitterToken+' = '+aToken+'\n'+
                            Blockly.Python.twitterSecretToken+' = '+aTSecret+'\n'
                            ;
    }
}

Blockly.Python.twilioSetup = function (twiAccount, twiToken)
{
  if (!Blockly.Python.definitions_['twilio_setup'])
    {
      var auxTwiAcc = Blockly.Python.variableDB_.getDistinctName('twilio_account', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twilioAccount = auxTwiAcc;
      var auxTwiT = Blockly.Python.variableDB_.getDistinctName('twilio_token', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twilioToken = auxTwiT;
      var auxClient = Blockly.Python.variableDB_.getDistinctName('twilio_client', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twilioClient = auxClient;
      var auxMessage = Blockly.Python.variableDB_.getDistinctName('twilio_message', Blockly.Generator.NAME_TYPE);
      Blockly.Python.twilioMessage = auxMessage;
      Blockly.Python.definitions_['twilio_setup'] = Blockly.Python.twilioAccount+' = '+twiAccount+'\n'+
                                  Blockly.Python.twilioToken+' = '+twiToken+'\n'
                                  ;
    }
}



Blockly.Python.mailSetVar = function ()
{
  if (!Blockly.Python.definitions_['mailSetVar'])
    {
      Blockly.Python.mailSetup();
      if (!Blockly.Python.definitions_["import_os"])
      {
        Blockly.Python.definitions_["import_os"] = "import os\n";
      }
      Blockly.Python.definitions_['mailSetVar'] = 'def mailFunction(fromAddress, toAddress, mPassword, mServer, mPort, mSubject, mMessage, mAttachment):\n'+
                                  '  msg = MIMEMultipart()\n'+
                                  "  msg['From'] = fromAddress\n"+
                                  "  msg['To'] = toAddress\n"+
                                  "  msg['Subject'] = mSubject\n"+
                                  "  body = mMessage\n"+
                                  "  msg.attach(MIMEText(body, 'plain'))\n"+
                                  "  if mAttachment:\n"+
                                  "    fp = open(mAttachment, 'rb')\n"+
                                  "    ctype, encoding = mimetypes.guess_type(mAttachment)\n"+
                                  "    if ctype is None or encoding is not None:\n"+
                                  "      ctype = 'application/octet-stream'\n"+
                                  "    maintype, subtype = ctype.split('/', 1)\n"+
                                  "    if maintype == 'text':\n"+
                                  "      a = MIMEText(fp.read(), _subtype=subtype)\n"+
                                  "    elif maintype == 'image':\n"+
                                  "      a = MIMEImage(fp.read(), _subtype=subtype)\n"+
                                  "    elif maintype == 'audio':\n"+
                                  "      a = MIMEAudio(fp.read(), _subtype=subtype)\n"+
                                  "    else:\n"+
                                  "      a = MIMEBase(maintype, subtype)\n"+
                                  "      a.set_payload(fp.read())\n"+
                                  "      encoders.encode_base64(msg)\n"+
                                  "    fp.close()\n"+
                                  "    msg.add_header('Content-Disposition', 'attachment', filename=os.path.basename(mAttachment))\n"+
                                  "    msg.attach(a)\n"+
                                  '  loginServer = smtplib.SMTP(mServer, mPort)\n'+
                                  "  loginServer.ehlo()\n"+
                                  "  loginServer.starttls()\n"+
                                  "  loginServer.ehlo()\n"+
                                  "  loginServer.login(fromAddress, mPassword)\n"+
                                  "  text = msg.as_string()\n"+
                                  "  loginServer.sendmail(fromAddress, toAddress, text)"
                                  ;
    }
}

Blockly.Python.twitterSetVar = function ()
{
  if (!Blockly.Python.definitions_['twitterSetVar'])
    {
      Blockly.Python.definitions_['twitterSetVar'] = 'def twitterFunction(cKey, cSecret, aToken, aTSecret):\n'+
                                  '  auth = tweepy.OAuthHandler(cKey, cSecret)\n'+
                                  '  auth.set_access_token(aToken, aTSecret)\n'+
                                  '  '+Blockly.Python.tweetText+' = tweepy.API(auth)\n'+
                                  '  return '+Blockly.Python.tweetText
                                  ;
    }
}

Blockly.Python.twitterSetTlVar = function ()
{
  if (!Blockly.Python.definitions_['twitterSetTlVar'])
    {
      Blockly.Python.twitterSetVar()
      Blockly.Python.definitions_['twitterSetTlVar'] = 'def twitterTimelineFunction():\n'+
                                  "  "+Blockly.Python.tweetText+' = '+"twitterFunction("+Blockly.Python.twitterKey+", "+Blockly.Python.twitterSecret+", "+Blockly.Python.twitterToken+", "+Blockly.Python.twitterSecretToken+")\n"+
                                  "  public_tweets ="+Blockly.Python.tweetText+".home_timeline()\n"+
                                  "  tweetArray = []\n"+
                                  "  for tweetTimeline in public_tweets:\n"+
                                  "    tweetArray.append(tweetTimeline.text)\n"+
                                  "  return tweetArray"
                                  ;
    }
}

Blockly.Python.twitterSetUserTlVar = function ()
{
  if (!Blockly.Python.definitions_['twitterSetUserTlVar'])
    {
      Blockly.Python.twitterSetVar()
      Blockly.Python.definitions_['twitterSetUserTlVar'] = 'def twitterUserTimelineFunction(user):\n'+
                                  "  "+Blockly.Python.tweetText+' = '+"twitterFunction("+Blockly.Python.twitterKey+", "+Blockly.Python.twitterSecret+", "+Blockly.Python.twitterToken+", "+Blockly.Python.twitterSecretToken+")\n"+
                                  "  if user == 'myself':\n"+
                                  "    public_tweets ="+Blockly.Python.tweetText+".user_timeline()\n"+
                                  "  else:\n"+
				  "    public_tweets ="+Blockly.Python.tweetText+".user_timeline(user)\n"+
                                  "  tweetArray = []\n"+
                                  "  for tweetTimeline in public_tweets:\n"+
                                  "    tweetArray.append(tweetTimeline.text)\n"+
                                  "  return tweetArray";
    }
}

Blockly.Python.twilioSetSmsVar = function ()
{
  if (!Blockly.Python.definitions_['twilioSetSmsVar'])
    {
      Blockly.Python.definitions_['twilioSetSmsVar'] = 'def twilioSmsFunction(msgList, indexMsg):\n'+
                                  "  messageIndex = msgList[indexMsg].sid\n"+
                                  "  mess = "+Blockly.Python.twilioClient+".messages.get(messageIndex)\n"+
                                  '  '+Blockly.Python.twilioMessage+' = mess.body\n'+
                                  '  return '+Blockly.Python.twilioMessage
                                  ;
    }
}

Blockly.Python.twilioSetCallVar = function ()
{
  if(!Blockly.Python.definitions_['twilioSetCallVar'])
  {
    Blockly.Python.definitions_['twilioSetCallVar'] = 'def twilioCallFunction(callList, indexCall):\n'+
                                  "  callIndex = callList[indexCall].sid\n"+
                                  "  mess = "+Blockly.Python.twilioClient+".calls.get(callIndex)\n"+
                                  '  return mess'
                                  ;
  }
}



Blockly.Python['mail_setup'] = function(block) {
  Blockly.Python.mail()
  var value_mailadd = Blockly.Python.valueToCode(block, 'Your e-mail', Blockly.Python.ORDER_ATOMIC);
  var value_password = Blockly.Python.valueToCode(block, 'password', Blockly.Python.ORDER_ATOMIC);
  var dropdown_server = block.getFieldValue('server');
  // TODO: Assemble Python into code variable.
  var port_possib;
  if(dropdown_server == 'gmail')
  	port_possib=587;
  else
  if(dropdown_server == 'yahoo')
  	port_possib=587;
  else
  if(dropdown_server == 'hotmail')
  	port_possib=587;
  Blockly.Python.mailSetup(dropdown_server, port_possib, value_mailadd, value_password)
  var code = '';
  return code;
};

Blockly.Python['mail_send'] = function(block) {
  Blockly.Python.mailSetVar();
  var value_toaddr = Blockly.Python.valueToCode(block, 'toAddr', Blockly.Python.ORDER_ATOMIC);
  var value_subj = Blockly.Python.valueToCode(block, 'subj', Blockly.Python.ORDER_ATOMIC);
  var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
 var code = 'mailFunction('+Blockly.Python.mailName+', '+value_toaddr+', '+Blockly.Python.mailPassword+', '+Blockly.Python.mailServer+', '+Blockly.Python.mailPort+', str('+value_subj+') , str('+value_msg+'), None)\n';
  return code;
};

Blockly.Python['attachment_mail_send'] = function(block) {
  Blockly.Python.mailSetVar();
  var value_toaddr = Blockly.Python.valueToCode(block, 'toAddr', Blockly.Python.ORDER_ATOMIC);
  var value_subj = Blockly.Python.valueToCode(block, 'subj', Blockly.Python.ORDER_ATOMIC);
  var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
  var value_attachment = Blockly.Python.valueToCode(block, 'attachment', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
 var code = 'mailFunction('+Blockly.Python.mailName+', '+value_toaddr+', '+Blockly.Python.mailPassword+', '+Blockly.Python.mailServer+', '+Blockly.Python.mailPort+', str('+value_subj+') , str('+value_msg+'), str('+value_attachment+'))\n';
  return code;
};


Blockly.Python['facebook_setup'] = function(block) {
  Blockly.Python.facebookImport()
  var value_token = Blockly.Python.valueToCode(block, 'token', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.facebookSetup(value_token);
  var code = '';
  return code;
};

Blockly.Python['facebook_post'] = function(block) {
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "graph = facebook.GraphAPI("+Blockly.Python.facebookToken+")\n"+
  "profile = graph.get_object('me')"+'\n'+
  "friends = graph.get_connections('me', 'friends')"+'\n'+
  "graph.put_object('me', 'feed', message = str("+value_message+"))"+'\n'
  ;
  return code;
};

Blockly.Python['facebook_friendslist'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "facebook.GraphAPI("+Blockly.Python.facebookToken+").get_object('me/friends')['data']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['facebook_getfriend'] = function(block) {
  var value_friendnumber = Blockly.Python.valueToCode(block, 'friendNumber', Blockly.Python.ORDER_ATOMIC);
  var value_friendlist = Blockly.Python.valueToCode(block, 'friendList', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "facebook.GraphAPI("+Blockly.Python.facebookToken+").get_object('me/friends')['data']["+value_friendnumber+"]";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['facebook_notifications'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = "facebook.GraphAPI("+Blockly.Python.facebookToken+").get_object('me/notifications')['data']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['facebook_getlikes'] = function(block) {
  Blockly.Python.requestImport();
  var value_page = Blockly.Python.valueToCode(block, 'page', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.fbLikeSetup();
  var code = 'getLikes('+value_page+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['facebook_getgroupposts'] = function(block) {
  var value_group = Blockly.Python.valueToCode(block, 'group', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "facebook.GraphAPI("+Blockly.Python.facebookToken+").get_object("+value_group+"+'/feed')['data']";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['twitter_setup'] = function(block) {
  Blockly.Python.twitterImport()
  var value_conskey = Blockly.Python.valueToCode(block, 'consKey', Blockly.Python.ORDER_ATOMIC);
  var value_conssecret = Blockly.Python.valueToCode(block, 'consSecret', Blockly.Python.ORDER_ATOMIC);
  var value_accesstoken = Blockly.Python.valueToCode(block, 'accessToken', Blockly.Python.ORDER_ATOMIC);
  var value_accesstokensecret = Blockly.Python.valueToCode(block, 'accessTokenSecret', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.twitterSetup(value_conskey, value_conssecret, value_accesstoken, value_accesstokensecret)
  // TODO: Assemble Python into code variable.
  var code = '';
  return code;
};

Blockly.Python['twitter_post'] = function(block) {
  Blockly.Python.twitterSetVar()
  var value_msg = Blockly.Python.valueToCode(block, 'msg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.tweetText+' = '+"twitterFunction("+Blockly.Python.twitterKey+", "+Blockly.Python.twitterSecret+", "+Blockly.Python.twitterToken+", "+Blockly.Python.twitterSecretToken+")\n"+  
  Blockly.Python.tweetText+".update_status(str("+value_msg+"))\n"
  ;
  return code;
};

Blockly.Python['twitter_timeline'] = function(block) {
  Blockly.Python.twitterSetTlVar()
  // TODO: Assemble Python into code variable.
  var code = "twitterTimelineFunction()";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['twitter_user_timeline'] = function(block) {
  Blockly.Python.twitterSetUserTlVar()
  // TODO: Assemble Python into code variable.
  var user = block.getFieldValue('dropdown');
  var code;
  if(user == "my")
    code = "twitterUserTimelineFunction('myself')";
  else
  {
    var username = Blockly.Python.valueToCode(block, 'username', Blockly.Python.ORDER_ATOMIC);
    code = "twitterUserTimelineFunction("+username+")"
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['twilio_setup'] = function(block) {
  Blockly.Python.twilioImport()
  var value_twi_account = Blockly.Python.valueToCode(block, 'twi_account', Blockly.Python.ORDER_ATOMIC);
  var value_twi_token = Blockly.Python.valueToCode(block, 'twi_token', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.twilioSetup(value_twi_account, value_twi_token)
  var code = Blockly.Python.twilioClient+' = '+"TwilioRestClient("+Blockly.Python.twilioAccount+", "+ Blockly.Python.twilioToken+")\n";
  return code;
};

Blockly.Python['twilio_call_say'] = function(block) {
  Blockly.Python.twilioImport ();
  Blockly.Python.urllibImport ();
  var value_twi_to = Blockly.Python.valueToCode(block, 'twi_to', Blockly.Python.ORDER_ATOMIC);
  var value_twi_from = Blockly.Python.valueToCode(block, 'twi_from', Blockly.Python.ORDER_ATOMIC);
  var value_twi_say = Blockly.Python.valueToCode(block, 'twi_say', Blockly.Python.ORDER_ATOMIC);
  var dropdown_twi_language = block.getFieldValue('twi_language');
  // TODO: Assemble Python into code variable.
  var code = 'call ='+ Blockly.Python.twilioClient+'.calls.create(to='+value_twi_to+', from_='+value_twi_from+", url='http://twimlets.com/echo?'+urlencode({'Twiml':'<Response><Say voice=\"alice\" language=\""+dropdown_twi_language+"\">'+"+value_twi_say+"+'</Say></Response>'}))\n"
  //'print call.sid'
  ;
  return code;
};

Blockly.Python['twilio_call_music_url'] = function(block) {
  Blockly.Python.twilioImport ();
  Blockly.Python.urllibImport ();
  var value_twi_to = Blockly.Python.valueToCode(block, 'twi_to', Blockly.Python.ORDER_ATOMIC);
  var value_twi_from = Blockly.Python.valueToCode(block, 'twi_from', Blockly.Python.ORDER_ATOMIC);
  var value_twi_music_url = Blockly.Python.valueToCode(block, 'twi_music_url', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'call ='+ Blockly.Python.twilioClient+'.calls.create(to='+value_twi_to+', from_='+value_twi_from+", url='http://twimlets.com/message?'+urlencode({'Message[0]':"+value_twi_music_url+"}))\n"
  //'print call.sid'
  ;
  return code;
};

Blockly.Python['twilio_msg'] = function(block) {
  var value_twisms_to = Blockly.Python.valueToCode(block, 'twiSMS_to', Blockly.Python.ORDER_ATOMIC);
  var value_twisms_from = Blockly.Python.valueToCode(block, 'twiSMS_from', Blockly.Python.ORDER_ATOMIC);
  var value_twi_msg = Blockly.Python.valueToCode(block, 'twi_msg', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'message ='+ Blockly.Python.twilioClient+'.messages.create(to='+value_twisms_to+', from_='+value_twisms_from+", body="+value_twi_msg+")\n";
  return code;
};

Blockly.Python['twilio_calllist'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.twilioClient+'.calls.list()'
  ;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['twilio_getcall'] = function(block) {
  Blockly.Python.twilioSetCallVar()
  var value_nrcall = Blockly.Python.valueToCode(block, 'nrCall', Blockly.Python.ORDER_ATOMIC);
  var value_callli = Blockly.Python.valueToCode(block, 'callLi', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'twilioCallFunction('+value_callli+', '+value_nrcall+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['twilio_msglist'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.twilioClient+'.messages.list()'
  ;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['twilio_getSMS'] = function(block) {
  Blockly.Python.twilioSetSmsVar();
  var value_nrsms = Blockly.Python.valueToCode(block, 'nrSms', Blockly.Python.ORDER_ATOMIC);
  var value_smslist = Blockly.Python.valueToCode(block, 'smsList', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'twilioSmsFunction('+value_smslist+', '+value_nrsms+')'
  ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['communication_open_connection'] = function(block) {
  Blockly.Python.wiringpi();
  Blockly.Python.importJson();
  var value_label = Blockly.Python.valueToCode(block, 'label', Blockly.Python.ORDER_ATOMIC);
  var statements_commands = Blockly.Python.statementToCode(block, 'commands');
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  var value_sender = Blockly.Python.valueToCode(block, 'from_id', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var function_name = Blockly.Python.variableDB_.getDistinctName('myFunction', Blockly.Generator.NAME_TYPE);
  var code = "";
  if(statements_commands != "")
  {
    var globals = Blockly.Variables.allVariables(block);
    for (var i=0; i<globals.length; i++)
    {
      globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
    }
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
    var code = "def "+function_name+"(__sender, __channel, __error, __message):\n"+
              globals+
              "  "+value_sender+" = __sender\n"+
              "  "+value_message+" = json.loads(__message)\n"+
              statements_commands+"\n"+
             "openConnection("+value_label+", "+function_name+")\n";
  }
  return code;
};

Blockly.Python['communication_open_connection_label'] = function(block) {
  Blockly.Python.wiringpi();
  Blockly.Python.importJson();
  var value_label = Blockly.Python.valueToCode(block, 'label', Blockly.Python.ORDER_ATOMIC);
  var statements_commands = Blockly.Python.statementToCode(block, 'commands');
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  var value_sender = Blockly.Python.valueToCode(block, 'from_id', Blockly.Python.ORDER_ATOMIC);
  var value_channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var function_name = Blockly.Python.variableDB_.getDistinctName('myFunction', Blockly.Generator.NAME_TYPE);
  var code = "";
  if(statements_commands != "")
  {
    var globals = Blockly.Variables.allVariables(block);
    for (var i=0; i<globals.length; i++)
    {
      globals[i] = Blockly.Python.variableDB_.getName(globals[i], Blockly.Variables.NAME_TYPE);
    }
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
    var code = "def "+function_name+"(__sender, __label, __error, __message):\n"+
              globals+
              "  "+value_sender+" = __sender\n"+
              "  "+value_message+" = json.loads(__message)\n"+
              "  "+value_channel+" = __label\n"+
              statements_commands+"\n"+
             "openConnection("+value_label+", "+function_name+")\n";
  }
  return code;
};

Blockly.Python.initCommunication = function()
{
  if (!Blockly.Python.definitions_['init_communication'])
  {
    Blockly.Python.definitions_['init_communication'] = "initCommunication()\n";
  }
}

Blockly.Python['communication_send_message'] = function(block) {
  Blockly.Python.wiringpi();
  Blockly.Python.importJson();
  Blockly.Python.initCommunication();
  var value_id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_ATOMIC);
  var value_label = Blockly.Python.valueToCode(block, 'label', Blockly.Python.ORDER_ATOMIC);
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "sendMessage("+value_id+", "+value_label+", json.dumps("+value_message+"))\n";
  return code;
};
