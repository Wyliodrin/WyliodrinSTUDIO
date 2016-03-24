Blockly.Python.importSocket = function ()
{
  if (!Blockly.Python.definitions_['importSocket'])
  {
    Blockly.Python.definitions_['importSocket'] = "import socket\n";
    }
}

Blockly.Python.mathSetup = function()
{
  if(!Blockly.Python.definitions_['import_math'])
  {
    Blockly.Python.definitions_['import_math'] = 'from math import *\n';
  }
}

Blockly.Python.datetime = function()
{
	if (!Blockly.Python.definitions_['import_datetime'])
	{
		Blockly.Python.definitions_['import_datetime'] = "from datetime import *\n";
	}
}

Blockly.Python.wiringpi = function ()
{
	if (!Blockly.Python.definitions_['import_wiringpi'])
	{
		Blockly.Python.definitions_['import_wiringpi'] = 'try:\n  from wyliodrin import *\nexcept:\n  from wiringpi2 import *\n  wiringPiSetup()\n';
	}
}

Blockly.Python.mail = function ()
{
	if (!Blockly.Python.definitions_['import_mail'])
	{
		Blockly.Python.definitions_['import_mail'] = "import sys\n"+
    'try:\n  from email.MIMEMultipart import MIMEMultipart\n  from email.MIMEText import MIMEText\n  import smtplib\nexcept:\n  print("Please open the Shell and run \'social_install\'")\n  sys.exit(1)\n';
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

Blockly.Python.timer = function()
{
	if(!Blockly.Python.definitions_['import_timer'])
  {
    Blockly.Python.definitions_['import_timer'] = 'from threading import Timer\n';
  }
}

Blockly.Python.wyliodrinImport = function()
{
  if(!Blockly.Python.definitions_['import_wyliodrin'])
  {
    Blockly.Python.definitions_['import_wyliodrin'] = 'from wyliodrin import *\n';
  }
}
