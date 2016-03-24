"use strict";

goog.provide('Blockly.Blocks.social');

goog.require('Blockly.Blocks');


Blockly.Blocks['grove_setpin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_pin1');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pin");
    this.appendDummyInput()
        .appendField("To")
        .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "value_hl");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_readpin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read_pin1');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Read pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinR");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_readanalog'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#read_analog_pin');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Read analog pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "value_analogPin");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_setpwm'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_pwm_pin');
    this.setColour(130);
    this.appendValueInput("value_pwm")
        .setCheck("Number")
        .appendField("Set PWM pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pwmPin")
        .appendField("to value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_ooled'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_led1');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set LED")
        .appendField(new Blockly.FieldDropdown([["On", "1"], ["Off", "0"]]), "led_value");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinR");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_ledbrightness'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_led_brightness');
    this.setColour(130);
    this.appendValueInput("led_brValue")
        .appendField("Set LED brightness");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinR");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_button'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_button');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Button on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinB");
    this.appendDummyInput()
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Released", "0"]]), "value_hl");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_buttonsw'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#button_switched');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Button on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinRS");
    this.appendDummyInput()
        .appendField("switched to")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Released", "0"]]), "value_hlsw");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_ras'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#potentiometer');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get angle from pin ")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "value_aPin");
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_buzzerhl'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_buzzer');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set buzzer")
        .appendField(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "value_buzzerhl");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinBuzz");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_buzzervol'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_buzzer_volume');
    this.setColour(130);
    this.appendValueInput("volVar")
        .appendField("Set buzzer volume to");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_aPinB");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_touch'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_touch');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Touch on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_tPin");        
    this.appendDummyInput()
        .appendField("is")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Not Pressed", "0"]]), "value_tu");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['grove_touchsw'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#touch_switched');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Touch on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinRS");
    this.appendDummyInput()
        .appendField("switched to")
        .appendField(new Blockly.FieldDropdown([["Pressed", "1"], ["Released", "0"]]), "value_hlsw");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_sounds'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_volume');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get volume from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "value_ssPin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_temperatures'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_temperature');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get temperature from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "value_tsPin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_temperaturef'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_temperature_in_fahrenheit');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get the temperature in Fahrenheit from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "temperatureF");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_temperatures_aux'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_temperature_aux');
    this.setColour(130);
    this.appendValueInput("aux")
        .appendField("Get temperature from")
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lights'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_light');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get light from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "value_lsPin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_lcdbegin'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_lcd');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Init LCD with")
        .appendField(new Blockly.FieldDropdown([["2", "2"], ["1", "1"], ["4", "4"]]), "value_row");
        //.appendField("rows and 16 columns");
    this.appendDummyInput()
        .appendField("rows and ")
        .appendField(new Blockly.FieldDropdown([["16", "16"], ["20", "20"]]), "value_column")
        .appendField("columns");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};



Blockly.Blocks['grove_lcdprint'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#print_on_lcd');
    this.setColour(130);
    this.appendValueInput("message")
        .appendField("Print on LCD");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdisplay'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#turn_lcd_on');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn LCD on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdisplayoff'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#turn_lcd_off');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn LCD off");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdblinkon'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#turn_lcd_blink_on');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn blink on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdblinkoff'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#turn_lcd_blink_off');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn blink off");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdcursor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_cursor_on');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn cursor on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdnocursor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_cursor_off');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn cursor off");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdscrolll'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_scroll_left');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Scroll to left");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdscrollr'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_scroll_right');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Scroll to right");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdtdrl'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_right_to_left');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set text direction right to left");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdtdlr'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_left_to_right');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set text direction left to right");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdautos'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_autoscroll_on');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn on autoscroll");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdsetcursor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_lcd_cursor');
    this.setColour(130);
    this.appendValueInput("value_cursorRow")
        .appendField("Set cursor at");
    this.appendValueInput("value_cursorColumn")
        .appendField("row and");
    this.appendDummyInput()
        .appendField("column");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdcolor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#set_lcd_color');
    this.setColour(130);
    this.appendValueInput("value_color")
        .setCheck("Color")
        .appendField("Set LCD colour")
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_lcdnoautos'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#lcd_autoscroll_off');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Turn off autoscroll");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_relay'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#relay');
    this.setColour(130);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Start", "1"], ["Stop", "0"]]), "value_relay")
        .appendField("the relay");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_readrelay'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_relay_state');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Relay state on pin");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_pinR");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_servo'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#servo');
    this.setColour(130);
    this.appendValueInput("value_servo")
        .appendField("Set servo angle");
    this.appendDummyInput()
        .appendField("on pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "value_servopin");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_alcoholsensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_alcohol_value');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get alcohol value from")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "pinValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_motionsensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_motion');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get  motion from")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "pinValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_ledbar'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Set level for LED Bar on ")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "pinValue");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("with value");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_uvsensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_uv_value');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get UV value from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "uvValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_vibrationsensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_vibration_value');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get vibration value from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "vibrationValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_moisturesensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_moisture_value');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get moisture value from pin")
        .appendField(new Blockly.FieldDropdown([["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"]]), "moistureValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['grove_watersensor'] = {
  init: function() {
    this.setHelpUrl('https://projects.wyliodrin.com/wiki/languages/visual#get_water');
    this.setColour(130);
    this.appendDummyInput()
        .appendField("Get water value from pin")
        .appendField(new Blockly.FieldDropdown([["D2", "2"], ["D3", "3"], ["D4", "4"], ["D5", "5"], ["D6", "6"], ["D7", "7"], ["D8", "8"]]), "waterValue");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};