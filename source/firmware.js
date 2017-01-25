"use strict";
var FIRMWARE_TYPES = {
    'arduino':
    {
      name: 'Arduino',
      source: 'src/Arduino.ino',
      devices:
      {
        'uno':'Arduino Uno',
        'atmega328':'Arduino Duemilanove w/ ATmega328',
        'diecimila':'Arduino Diecimila or Duemilanove w/ ATmega168',
        'nano328':'Arduino Nano w/ ATmega328',
        'nano':'Arduino Nano w/ ATmega168',
        'mega2560':'Arduino Mega 2560 or Mega ADK',
        'mega':'Arduino Mega (ATmega1280)',
        'leonardo':'Arduino Leonardo',
        'mini328':'Arduino Mini w/ ATmega328',
        'mini':'Arduino Mini w/ ATmega168',
        'ethernet':'Arduino Ethernet',
        'fio':'Arduino Fio',
        'bt328':'Arduino BT w/ ATmega328',
        'bt':'Arduino BT w/ ATmega168',
        'lilypad328':'LilyPad Arduino w/ ATmega328',
        'lilypad':'LilyPad Arduino w/ ATmega168',
        'pro5v328':'Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega328',
        'pro5v':'Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega168',
        'pro328':'Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega328',
        'pro':'Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega168',
        'atmega168':'Arduino NG or older w/ ATmega168',
        'atmega8':'Arduino NG or older w/ ATmega8'
      }
    },
    'openmote':
    {
        name: 'Open Mote',
        source: '',
        devices:
        {
            'openmote':'Open Mote'
        }
    }
  };

module.exports = FIRMWARE_TYPES;
