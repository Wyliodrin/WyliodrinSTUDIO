"use strict";
module.exports = 
{
	'raspberrypi':
	{
		'arduino':function (projectid, firmware, port)
		{
			var parameters = '-m '+firmware;
			if (port != 'auto') parameters += ' -p '+port;
			return 'mkdir /tmp/arduino_'+projectid+'_'+firmware+'; cd Arduino && rm -f .build && ln -s /tmp/arduino_'+projectid+'_'+firmware+' .build && ino build -m '+firmware+' && ino upload '+parameters;
		},
		'openmote':function (projectid, firmware, port)
		{
			return 'firmware:\n\tzip -r archive.zip * -x Makefile.wyliodrin \n\tcurl -F "file=@archive.zip" https://abcd2017-serbanrazvan.c9users.io/ > Makefile.temp\n\t(echo -n "https://abcd2017-serbanrazvan.c9users.io/getResult/" ; cat Makefile.temp )| xargs wget -O result.zip\n\trm -rf /wyliodrin/RIOT/examples/wyliodrin_project && mkdir /wyliodrin/RIOT/examples/wyliodrin_project && unzip result.zip -d /wyliodrin/RIOT/examples/wyliodrin_project\n\tcd /wyliodrin/RIOT/examples/wyliodrin_project && make flash term';
		}
	},
	'udooneo':
	{
		'arduino':function (projectid, firmware, port)
		{
			return 'timeout 120 xvfb-run /usr/bin/arduino -v --upload Arduino/Arduino.ino';
		}
	},
	'arduinoyun':
	{
		'arduino':function (projectid, firmware, port)
		{
			return 'cd Arduino && make && run-avrdude Arduino.hex';
		}
	}
};