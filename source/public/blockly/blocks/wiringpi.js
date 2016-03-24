"use strict";

goog.provide('Blockly.Blocks.wiringpi');

goog.require('Blockly.Blocks');

function pins ()
{
    var pinslist = [];
    for (var i=0; i<25; i++)
    {
        pinslist.push ([i+'', i+'']);
    }
    return pinslist;
}

Blockly.Blocks['setpin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_pin');
    this.setColour(17);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Set pin");
    this.appendDummyInput()
        .appendField("To")
        .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set a pin HIGH or LOW');
  }
};

Blockly.Blocks['readpin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read_pin');
    this.setColour(17);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Read pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value of a pin');
  }
};

Blockly.Blocks['digitalwrite'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_write');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("digitalWrite");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write a value on a pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['digitalread'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#digital_read');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("digitalRead");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value from a pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['analogwrite'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#analog_write');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("analogWrite");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write an analog value on a pin using PWM. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['analogread'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#analog_read');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("analogRead");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Read the value from an ADC pin. Please be careful not to use the same pin for reading and writing.');
  }
};

Blockly.Blocks['delay'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay');
    this.setColour(17);
    this.appendValueInput("millis")
        .setCheck("Number")
        .appendField("delay");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["milliseconds", "0"], ["microseconds", "1"], ["seconds", "2"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Wait for some specified period.');
  }
};

Blockly.Blocks['pinmode'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pin_mode');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("pinMode");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("pin");
    this.appendDummyInput()
        .appendField("mode")
        .appendField(new Blockly.FieldDropdown([["INPUT", "0"], ["OUTPUT", "1"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the mode of a pin to INPUT or OUTPUT. Please be careful not to set the same pin for INPUT and OUTPUT.');
  }
};

Blockly.Blocks['delaymicroseconds'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#delay_microseconds');
    this.setColour(17);
    this.appendValueInput("micros")
        .setCheck("Number")
        .appendField("delay");
    this.appendDummyInput()
        .appendField("microseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Wait for some microseconds.');
  }
};

Blockly.Blocks['millis'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#millis');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("milliseconds since start");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('The number of milliseconds since the start of the program.');
  }
};

Blockly.Blocks['micros'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#micros');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("microseconds since start");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('The number of microseconds since the start of the program.');
  }
};

Blockly.Blocks['print'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Write on screen");
    this.appendValueInput("value")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Write the value on the screen and keep the cursor on the same line.');
  }
};

Blockly.Blocks['read'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Read");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["text", "0"], ["integer number", "1"], ["real number", "2"]]), "type");
    this.appendDummyInput()
        .appendField("from keyboard");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Read a text from the keyboard.');
  }
};

Blockly.Blocks['readwrite'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#write_and_read');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Write on screen");
    this.appendValueInput("value")
    this.appendDummyInput()
        .appendField("and read ");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["text", "0"], ["integer number", "1"], ["real number", "2"]]), "type");
    this.appendDummyInput()
        .appendField("from keyboard");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Write the value on the screen and read a text from the keyboard.');
  }
};

Blockly.Blocks['println'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#print');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Print on screen");
    this.appendValueInput("value")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Print the value on the screen and set the cursor to the next line.');
  }
};

Blockly.Blocks['shiftout'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#shift_out');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("Shift Out");
    this.appendValueInput("data_pin")
        .setCheck("Number")
        .appendField("Data Pin")
    this.appendValueInput("clock_pin")
        .setCheck("Number")
        .appendField("Clock Pin")
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Send the value serially on data pin using a clock on clock pin in LSB_ORDER.');
  }
};

Blockly.Blocks['shiftin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#shift_in');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("Shift In");
    this.appendValueInput("data_pin")
        .setCheck("Number")
        .appendField("Data Pin")
    this.appendValueInput("clock_pin")
        .setCheck("Number")
        .appendField("Clock Pin")
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Read serially data pin using a clock on clock pin in LSB_ORDER.');
  }
};

Blockly.Blocks['say'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(250);
    this.appendValueInput("string")
        .appendField("Say");
    this.appendDummyInput()
        .appendField("in")
        .appendField(new Blockly.FieldDropdown([["English", "en"], ["French", "fr"], ["German", "de"], ["Dutch", "nl"], ["Romanian", "ro"], ["Russian", "ru"], ["Portuguese", "pt"], ["Spanish", "es"], ["Italian", "it"], ["Hungarian", "hu"], ["Czech", "cs"], ["Bulgarian", "bg"], ["Serbian", "sr"], ["Turkish", "tr"]]), "language");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['play'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#play');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Play");
    this.appendValueInput("url")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Play music from URL');
  }
};

Blockly.Blocks['pause'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pause');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Pause");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Pause music');
  }
};

Blockly.Blocks['stop'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stop');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Stop");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Stop music');
  }
};

Blockly.Blocks['isplaying'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#is_playing');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Is Playing");
    this.setInputsInline(true);
    this.setOutput (true, "Boolean");
    this.setTooltip('Check if music is playing');
  }
};

Blockly.Blocks['setvolume'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_volume');
    this.setColour(250);
    this.appendDummyInput()
        .appendField("Set Volume");
    this.appendValueInput("volume")
        .setCheck("Number")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the volume');
  }
};

Blockly.Blocks['load_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#load');
    this.setColour(225);
    this.appendDummyInput()
        .appendField("Load audio")
        .appendField("stream from");
    this.appendValueInput("filename")
        .setCheck("String")
        .appendField(new Blockly.FieldDropdown([["file", "0"], ["address", "1"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Audio Stream");
    this.setTooltip('Load an audio stream from a file or an address.');
  }
};

Blockly.Blocks['play_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#play');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Play audio stream");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Play a previously loaded audio stream from a variable.');
  }
};

Blockly.Blocks['pause_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#pause');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Pause audio stream");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Pause the audio stream from a variable.');
  }
};

Blockly.Blocks['stop_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stop');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Stop audio stream");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Stop the audio stream from a variable.');
  }
};

Blockly.Blocks['isplaying_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#is_playing');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Audio stream");
    this.appendDummyInput()
        .appendField("is playing");
    this.setInputsInline(true);
    this.setOutput (true, "Boolean");
    this.setTooltip('Check if audio stream from a variable is playing');
  }
};

Blockly.Blocks['level_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stream_level');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Stream level");
    this.appendValueInput("scale")
        .setCheck("Number")
        .appendField("scaled to");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Returns the level of an audio stream from a variable.');
  }
};

Blockly.Blocks['level_side_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#stream_level');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Stream level")
        .appendField(new Blockly.FieldDropdown([["left", "\"left\""], ["right", "\"right\""]]), "side");
    this.appendValueInput("scale")
        .setCheck("Number")
        .appendField("scaled to");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('Returns the level of an audio stream side from a variable.');
  }
};

Blockly.Blocks['position_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#position');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Audio stream");
    this.appendDummyInput()
        .appendField("position in")
        .appendField(new Blockly.FieldDropdown([["seconds", "0"], ["bytes", "1"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Audio Stream");
    this.setTooltip('Returns the position of the audio stream from a variable.');
  }
};

Blockly.Blocks['data_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#data');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Audio stream");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Address Title", "0"], ]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Audio Stream");
    this.setTooltip('Returns some data of the audio stream from a variable.');
  }
};

Blockly.Blocks['set_position_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_position');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Set audio stream");
    this.appendValueInput("pos")
        .appendField("at position");
    this.appendDummyInput()
        .appendField("in")
        .appendField(new Blockly.FieldDropdown([["seconds", "0"], ["bytes", "1"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the position of an audio stream from a variable.');
  }
};

Blockly.Blocks['volume_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#audio_stream_volume');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Audio stream volume");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setTooltip('Returns the volume of an audio stream from a variable.');
  }
};

Blockly.Blocks['set_volume_audio_stream'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_audio_stream_volume');
    this.setColour(225);
    this.appendValueInput("stream")
        .setCheck("Audio Stream")
        .appendField("Set audio stream volume");
    this.appendValueInput("vol")
        .setCheck("Number")
        .appendField("at");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the volume of an audio stream from a variable.');
  }
};

Blockly.Blocks['set_volume_audio'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_volume');
    this.setColour(225);
    this.appendValueInput("vol")
        .setCheck("Number")
        .appendField("Set audio volume");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the boards\' audio volume.');
  }
};

Blockly.Blocks['get_volume_audio'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#volume');
    this.setColour(225);
    this.appendDummyInput()
        .appendField("Audio volume");
    this.setInputsInline(true);
    this.setOutput (true, "Number");
    this.setTooltip('Returns the board\' audio volume.');
  }
};

Blockly.Blocks['set_led'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_led');
    this.setColour(17);
    this.appendDummyInput()
        .appendField("Set");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["On", "1"], ["Off", "0"]]), "value");
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("LED on pin")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set a LED On or Off');
  }
};

Blockly.Blocks['set_rgb_led'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_basic_color');
    this.setColour(17);
    this.appendValueInput("color")
        .setCheck("Colour")
        .appendField("Set basic color");
    this.appendDummyInput()
        .appendField("on RGB LED with pins");
    this.appendValueInput("red")
        .setCheck("Number")
        .appendField("R");
    this.appendValueInput("green")
        .setCheck("Number")
        .appendField("G");
    this.appendValueInput("blue")
        .setCheck("Number")
        .appendField("B");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the color on an RGB LED. This will set only the basic colors.');
  }
};

Blockly.Blocks['set_fine_rgb_led'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_fine_color');
    this.setColour(17);
    this.appendValueInput("color")
        .setCheck("Colour")
        .appendField("Set fine color");
    this.appendDummyInput()
        .appendField("on RGB LED with pins");
    this.appendValueInput("red")
        .setCheck("Number")
        .appendField("R");
    this.appendValueInput("green")
        .setCheck("Number")
        .appendField("G");
    this.appendValueInput("blue")
        .setCheck("Number")
        .appendField("B");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the color on an RGB LED. This will set colors using PWM so the pins need to be able to do that.');
  }
};

Blockly.Blocks['init_lcd_i2c'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Init LCD Columns")
        .appendField(new Blockly.FieldDropdown([["16", "16"], ["20", "20"]]), "cols")
        .appendField("Rows")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["4", "4"]]), "rows");
    this.appendValueInput("i2caddress")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("i2c Address");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['init_lcd'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Init LCD Columns")
        .appendField(new Blockly.FieldDropdown([["16", "16"], ["20", "20"]]), "cols")
        .appendField("Rows")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["4", "4"]]), "rows");
    this.appendValueInput("rs")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("RS Pin");
    this.appendValueInput("strobe")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Enable (E) Pin");
    this.appendValueInput("d0")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DB5");
    this.appendValueInput("d1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DB6");
    this.appendValueInput("d2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DB7");
    this.appendValueInput("d3")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DB8");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['clear_lcd'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Clear LCD");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['reset_lcd'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Reset Position on LCD");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['set_position_lcd'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Set LCD Position");
    this.appendValueInput("col")
        .setCheck("Number")
        .appendField("Column");
    this.appendValueInput("row")
        .setCheck("Number")
        .appendField("Row");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['print_lcd'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Print on LCD");
    this.appendValueInput("text");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['button_is'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#button_is');
    this.setColour(17);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Button on pin");
    this.appendDummyInput()
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Released", "0"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setTooltip('Read the value of a pin');
  }
};

Blockly.Blocks['button_switched'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#button_switched');
    this.setColour(17);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("Button on pin");
    this.appendDummyInput()
        .appendField("switched to")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Released", "0"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setTooltip('Read the value of a pin');
  }
};

Blockly.Blocks['send_signal'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(17);
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Send signal")
        .appendField(new Blockly.FieldTextInput("signal"), "name");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_stop'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Stop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_start_walking'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Start Walking")
        .appendField(new Blockly.FieldDropdown([["forward", "0"], ["backwards", "1"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_start_turning'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Start Turning")
        .appendField(new Blockly.FieldDropdown([["left", "0"], ["right", "1"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_start_waveing_hand'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Start Waveing Your Hand");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_walk'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Walk")
        .appendField(new Blockly.FieldDropdown([["forward", "0"], ["backwards", "1"]]), "direction");
    this.appendValueInput("wait")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_turn'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Turn")
        .appendField(new Blockly.FieldDropdown([["left", "0"], ["right", "1"]]), "direction");
    this.appendValueInput("wait")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_wave_hand'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Wave your Hand for")
    this.appendValueInput("wait")
        .appendField("for");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

// Blockly.Blocks['rapiro_move'] = {
//   init: function() {
//     this.setHelpUrl('http://www.example.com/');
//     this.setColour(150);
//     this.appendDummyInput()
//         .appendField("Rapiro Move")
//         .appendField(new Blockly.FieldDropdown([["Head", "0"], ["Waist", "1"], ["Right Shoulder", "2"], ["Right Arm", "3"], ["Right Hand", "4"], ["Left Shoulder", "5"], ["Left Arm", "6"], ["Left Hand", "7"], ["Right Foot Yaw", "8"], ["Right Foot Pitch", "9"], ["Left Foot Yaw", "10"], ["Left Foot Pitch", "11"]]), "motor")
//         .appendField("to")
//         .appendField(new Blockly.FieldAngle("90"), "NAME");
//     this.appendValueInput("time")
//         .setCheck("Number")
//         .appendField("in");
//     this.appendDummyInput()
//         .appendField("seconds");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip('');
//   }
// };

Blockly.Blocks['rapiro_angle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(230);
    this.appendDummyInput()
        .appendField(new Blockly.FieldAngle("90"), "angle");
    this.setOutput(true, "Angle");
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_move'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Move")
        .appendField(new Blockly.FieldDropdown([["Head", "0"], ["Waist", "1"], ["Right Shoulder", "2"], ["Right Arm", "3"], ["Right Hand", "4"], ["Left Shoulder", "5"], ["Left Arm", "6"], ["Left Hand", "7"], ["Right Foot Yaw", "8"], ["Right Foot Pitch", "9"], ["Left Foot Yaw", "10"], ["Left Foot Pitch", "11"]]), "motor");
    this.appendValueInput("degrees")
        .setCheck("Angle")
        .appendField("to");
    this.appendValueInput("time")
        .setCheck("Number")
        .appendField("in");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['wiringpi_pins'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Set pins numbering")
        .appendField(new Blockly.FieldDropdown([["WiringPi", ""], ["GPIO", "GPIO"], ["Physical", "PHYSICAL"]]), "pins_numbering");
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['rapiro_set_eyes_color'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(150);
    this.appendDummyInput()
        .appendField("Rapiro Set Eyes Color");
    this.appendValueInput("color")
        .setCheck("Color");
    this.appendValueInput("time")
        .setCheck("Number")
        .appendField("in");
    this.appendDummyInput()
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['sevensegmdispl_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendDummyInput()
        .appendField("Setup the 7 segment display");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Common Cathode", "0"], ["Common Anode", "1"]]), "inverse");
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("http://upload.wikimedia.org/wikipedia/commons/2/22/7_segment_display_labeled.png", 80, 150, "*"));
    this.appendValueInput("seg_a")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A on pin");
    this.appendValueInput("seg_b")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("B on pin");
    this.appendValueInput("seg_c")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("C on pin");
    this.appendValueInput("seg_d")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("D on pin");
    this.appendValueInput("seg_e")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("E on pin");
    this.appendValueInput("seg_f")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("F on pin");
    this.appendValueInput("seg_g")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("G on pin");
    this.appendValueInput("seg_dp")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("DP on pin");
    this.setOutput (true, "Seven Segement");
    this.setTooltip('');
  }
};

Blockly.Blocks['sevensegmdispl_display'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput("ssd")
        .setCheck ("Seven Segment")
        .appendField("Display on");
    this.appendValueInput("tobedispl");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
 
//Blockly.Blocks['upm_adafruit_7segment_setup'] = {
  //init: function() {
    //this.setHelpUrl('http://www.example.com/');
    //this.setColour(260);
    //this.appendDummyInput()
    //    .appendField("as adafruit 7segment");
  //  this.setInputsInline(true);
   // this.setOutput(true);
  //  this.setTooltip('');
 // }
//};


Blockly.Blocks['adafruit_7segment_begin'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendValueInput("bus")
        .appendField("adafruit 7 segment on bus")
        .setCheck("Number");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['adafruit_24bar_begin'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendValueInput("bus")
        .appendField("adafruit 24 LED bar on bus")
        .setCheck("Number");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['adafruit_24bar_color'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendValueInput("24bar")
        .appendField("On");
    this.appendValueInput("led")
        .setCheck("Number")
        .appendField("set led");
    this.appendDummyInput()
        .appendField("to")
        .appendField(new Blockly.FieldDropdown([["red", "LED_RED"], ["yellow", "LED_YELLOW"], ["green", "LED_GREEN"], ["on", "LED_ON"], ["off", "LED_OFF"]]), "color");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['adafruit_writeDisplay'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendValueInput("adafruit")
        .appendField("Write on display");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['bmp180_get_pressure'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("BMP180 Get Pressure")
    this.setInputsInline(true);
    this.setOutput (true);
    this.setTooltip('');
  }
};

Blockly.Blocks['bmp180_get_temperature'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("BMP180 Get Temperature")
    this.setInputsInline(true);
    this.setOutput (true);
    this.setTooltip('');
  }
};

Blockly.Blocks['adafruit_7segment_print'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendValueInput("7seg")
        .appendField("On");
    this.appendValueInput("nr")
        .setCheck("Number")
        .appendField("print");
    this.appendDummyInput()
        .appendField("as")
        .appendField(new Blockly.FieldDropdown([["Decimal", "DEC"], ["Hexa", "HEX"], ["Octal", "OCT"], ["Binary", "BIN"], ["Bytes", "BYTE"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_setup'] = {
  init: function() {
    this.appendValueInput("address")
        .appendField("Init Accelerometer");
    this.setOutput(true);
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.setInputsInline(true);
  }
};
Blockly.Blocks['mpu6050_getAccX'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("accelerom")
        .setCheck("")
        .appendField("Get acceleration on coord X");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getAccY'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("acceleromy")
        .setCheck("")
        .appendField("Get acceleration on coord Y");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getAccZ'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("acceleromz")
        .setCheck("")
        .appendField("Get acceleration on coord Z");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getTemp'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("acceleromt")
        .setCheck("")
        .appendField("Get temperature");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getRotX'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("acceleromm")
        .setCheck("")
        .appendField("Get rotation on coord X");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getRotY'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("accelerommy")
        .setCheck("")
        .appendField("Get rotation on coord Y");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['mpu6050_getRotZ'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("accelerommz")
        .setCheck("")
        .appendField("Get rotation on coord Z");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['htu21d_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendDummyInput()
        .appendField("init humidity sensor");
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['htu21d_getHum'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("humidity")
        .setCheck("")
        .appendField("Get humidity");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['htu21d_getTem'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("hum")
        .setCheck("")
        .appendField("Get temperature");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
