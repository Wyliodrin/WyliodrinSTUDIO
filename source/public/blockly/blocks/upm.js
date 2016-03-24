"use strict";

Blockly.Blocks['upm_lcd_i2clcd_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("bus")
        .setCheck("Number")
        .appendField("init Grove RGB LCD with bus");
    this.appendValueInput("lcd_address")
        .setCheck("Number")
        .appendField("LCD address");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lcd_jhd1313m1_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("bus")
        .setCheck("Number")
        .appendField("init Grove RGB LCD with bus");
    this.appendValueInput("lcd_address")
        .setCheck("Number")
        .appendField("LCD address");
    this.appendValueInput("rgb_address")
        .setCheck("Number")
        .appendField("RGB address");
    this.setInputsInline(true);
    this.setOutput(true, "Jhd1313m1");
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lcd_jhd1313m1_write'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lcd")
        .setCheck("Jhd1313m1")
        .appendField("Write ");
    this.appendValueInput("write")
        .setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lcd_jhd1313m1_cursor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lcd")
        .setCheck("Jhd1313m1")
        .appendField("Set");
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("cursor at");
    this.appendValueInput("y")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lcd_jhd1313m1_scroll'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lcd")
        .setCheck("Jhd1313m1")
        .appendField("Scroll")
        .appendField(new Blockly.FieldDropdown([["Left", "False"], ["Right", "True"]]), "direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lcd_jhd1313m1_clear'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lcd")
        .setCheck("Jhd1313m1")
        .appendField("Clear");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lcd_jhd1313m1_setcolor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lcd")
        .setCheck("Jhd1313m1")
        .appendField("Set colour of");
    this.appendValueInput("colour")
        .setCheck("")
        .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_buzzer_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init buzzer on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_buzzer_playsound'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("buzzer")
        .setCheck("")
        .appendField("Play on");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["DO", "do"], ["RE", "re"], ["MI", "mi"], ["FA", "fa"], ["SO", "so"], ["LA", "la"], ["TI", "ti"]]), "note");
    this.appendValueInput("delay")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["microseconds", "1"], ["milliseconds", "1000"], ["seconds", "sec"]]), "timp");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_buzzer_playsound_freq'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("buzzer")
        .setCheck("")
        .appendField("Play on");
    this.appendValueInput("frecv")
        .setCheck("Number")
        .appendField("the frequence");
    this.appendValueInput("delay")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["microseconds", "1"], ["milliseconds", "1000"], ["seconds", "1000000"]]), "timp");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_servo_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init servo on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_servo_set_angle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("servo")
        .setCheck("")
        .appendField("For ");
    this.appendValueInput("angle")
        .setCheck("Number")
        .appendField("set angle to");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_led_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Led on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_led_write'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("write")
        .appendField("Write")
    this.appendValueInput("led")
        .setCheck("")
        .appendField("on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_led_on'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("led")
        .setCheck("")
        .appendField("Set");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_relay_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Relay on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_relay_write'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("write")
        .appendField("Write")
    this.appendValueInput("led")
        .setCheck("")
        .appendField("on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_relay_on'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("led")
        .setCheck("")
        .appendField("Set");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["on", "on"], ["off", "off"]]), "on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_temp_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Temperature on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_temp'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["raw", "raw_value"], ["temperature", "value"]]), "value");
    this.appendValueInput("temp")
        .setCheck("")
        .appendField("value from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_grove_light_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Light on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_light_values'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendDummyInput()
        .appendField("Get")
        .appendField(new Blockly.FieldDropdown([["raw", "raw_value"], ["light", "value"]]), "value");
    this.appendValueInput("light")
        .setCheck("")
        .appendField("value from");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_grove_rotary_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Rotary on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_rotary_abs'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("rotary")
        .setCheck("")
        .appendField("Get from");
    this.appendDummyInput()
        .appendField("absolute")
        .appendField(new Blockly.FieldDropdown([["radians", "rad"], ["degrees", "deg"], ["value", "value"]]), "vdr");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_rotary_rel'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("rotary")
        .setCheck("")
        .appendField("Get from");
    this.appendDummyInput()
        .appendField("relative")
        .appendField(new Blockly.FieldDropdown([["radians", "rad"], ["degrees", "deg"], ["value", "value"]]), "vdr");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_slide_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Slider on pin");
    this.appendValueInput("voltage")
        .setCheck("")
        .appendField("with refrence voltage");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_grove_slide_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("slide")
        .setCheck("")
        .appendField("Get from");
    this.appendDummyInput()
        .appendField("absolute")
        .appendField(new Blockly.FieldDropdown([["raw", "raw"], ["voltage", "voltage"], ["refValue", "ref"]]), "val");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_grove_button_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Button on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_grove_button_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("button")
        .setCheck("")
        .appendField("Get button value");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_touch_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init Grove Touch on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_grove_touch_value'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("touch")
        .setCheck("")
        .appendField("Get touch value");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_piezo_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init vibration sensor on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_piezo_sample'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("piezo")
        .setCheck("")
        .appendField("Get sample");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_hcsr04_distance'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("hcsr04")
        .setCheck("")
        .appendField("Get distance from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_hcsr04_detectEdge'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("hcsr04")
        .setCheck("")
        .appendField("edge detected by");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("bus")
        .setCheck("Number")
        .appendField("init LSM303 Accelerometer ");
    this.appendValueInput("mag_address")
        .setCheck("Number")
       
    this.appendValueInput("acc_address")
        .setCheck("Number")
        
    this.appendValueInput("acc_scale")
        .setCheck("Number")
            this.setInputsInline(true);
    this.setOutput(true, "accelerometru");
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_lsm303_getHeading'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get heading from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getCoordinates'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get coordinates from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getAcceleration'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get acceleration from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getRawCoorData'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get raw coordinates from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lsm303_getRawAccelData'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get raw acceleration from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getCoorX'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get coordinate X from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lsm303_getCoorY'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get coordinate Y from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getCoorZ'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get coordrinate Z from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lsm303_getAccelZ'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get acceleration Z from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_lsm303_getAccelY'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get acceleration Y from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_lsm303_getAccelX'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("lsm303")
        .setCheck("")
        .appendField("Get acceleration Z from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_th2_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendDummyInput()
        .appendField("init TH2 sensor");
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_th2_getTemp'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("th2")
        .setCheck("")
        .appendField("Get temperature from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_th2_getHumid'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("th2")
        .setCheck("")
        .appendField("Get humidity from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_th2_getStatus'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("th2")
        .setCheck("")
        .appendField("Get status from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_airQuality_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init air quality sensor on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_airQuality_ppm'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("airQual")
        .setCheck("")
        .appendField("Get ppm from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_mq_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendDummyInput()
        .appendField("Init")
        .appendField(new Blockly.FieldDropdown([["MQ2", "MQ2"], ["MQ3", "MQ3"], ["MQ5", "MQ5"], ["MQ9", "MQ9"]]), "mq");
    this.appendValueInput("pin")
        .appendField("on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_microphone_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init sound sensor on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_compass_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("init compass on pin");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_compass_direction'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("compass")
        .setCheck("")
        .appendField("Get direction from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_compass_heading'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("compass")
        .setCheck("")
        .appendField("Get heading from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_compass_coordinates'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("compass")
        .setCheck("")
        .appendField("Get coordinates from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_compass_getDeclination'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("compass")
        .setCheck("")
        .appendField("Get declination from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_compass_setDeclination'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("dec")
        .setCheck("")
        .appendField("Set declination");
    this.appendValueInput("compass")
        .setCheck("")
        .appendField("on");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_3axis_accelerom_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("bus")
        .setCheck("Number")
        .appendField("init accelerometer on bus");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['upm_3AxAccel_getAcceleration'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("accelerometer")
        .setCheck("")
        .appendField("Get acceleration from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_3AxAccel_getRawVal'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("accelerometer")
        .setCheck("")
        .appendField("Get raw values from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['upm_3AxAccel_getScale'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("accelerometer")
        .setCheck("")
        .appendField("Get scale from");
    
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};


Blockly.Blocks['upm_3axaccel_update'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(75);
    this.appendValueInput("accelerometer")
        .setCheck("")
        .appendField("Update ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
