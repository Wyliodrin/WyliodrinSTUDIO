/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
"use strict";

Blockly.Blocks.brickpi_sensor_touch={
    category:"Sensors",
    helpUrl:"https://projects.wyliodrin.com/wiki/languages/visual#lego_touch_sensor",
    init:function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("LEGO Touch Sensor");
    this.appendDummyInput("")
        .appendField("on port")
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([["is pressed","1"],["is released","0"]]),"status");
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip("Returns the status of a touch sensor");
    }
};

Blockly.Blocks.brickpi_sensor_light={
    category:"Sensors",
    helpUrl:"https://projects.wyliodrin.com/wiki/languages/visual#lego_light_sensor",
    init:function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("LEGO Light Sensor");
    this.appendDummyInput("")
        .appendField("on port")
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip("Returns the value of a light sensor");
    }
};

Blockly.Blocks.brickpi_sensor_ultrasonic={
    category:"Sensors",
    helpUrl:"https://projects.wyliodrin.com/wiki/languages/visual#lego_ultrasonic_sensor",
    init:function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("LEGO Ultrasonic Sensor");
    this.appendDummyInput("")
        .appendField("on port")
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],
            ["3","3"],["4","4"]]),"port");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip("Returns the value of an ultrasonic sensor");
    }
};

Blockly.Blocks.brickpi_motor_set= {
    category: 'Motors',
    helpUrl: 'https://projects.wyliodrin.com/wiki/languages/visual#lego_run_motor',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("LEGO Run Motor")
            .appendField(new Blockly.FieldDropdown([["1", "PORT_A"], ["2", "PORT_B"], 
                ["3","PORT_C"],["4","PORT_D"],["All","All"]]), 'motor_num');
    this.appendDummyInput("")
            .appendField(" to power");
    this.appendValueInput('motor_power')
            .setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Motor 1-4, Power -100 to 100');
    }
};

Blockly.Blocks.brickpi_light_set= {
    category: 'Lights',
    helpUrl: 'http://www.google.com',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("Set light on motor port")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], 
                ["3","3"],["4","4"],["All","All"]]), 'motor_num');
    this.appendDummyInput("")
            .appendField(" to power");
    this.appendValueInput('motor_power')
            .setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Light in motor port 1-4, Power 0 to 100');
    }
};



Blockly.Blocks.brickpi_motor_get_encoder= {
    category: 'Motors',
    helpUrl: '',
    init: function() {
    this.setColour(300);
    this.appendDummyInput("")
        .appendField("Encoder Value");
    this.appendDummyInput("")
        .appendField("Motor")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3","3"], ["4","4"]]), 'enc');
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    this.setTooltip('Returns absolute rotation of specified motor');
    }
};


Blockly.Blocks.brickpi_sensor_new_val= {
    category: 'Sensors',
    helpUrl: '',
    init: function() {
    this.setColour(300)
    this.appendDummyInput("")
        .appendField("Unread Data On:");
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([["Sensor 1", "sensor1"], 
                            ["Sensor 2", "sensor2"],
                                                    ["Sensor 3", "sensor3"],
                            ["Sensor 4", "sensor4"],
                            ["Sensor 5", "sensor5"],
                            ["Encoder 1", "encoder1"],
                            ["Encoder 2", "encoder2"],
                            ["Encoder 3", "encoder3"],
                            ["Encoder 4", "encoder4"]]
                          ), 'port');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setTooltip('Returns true if there is unread data on the specified port');
    }

}

Blockly.Blocks.brickpi_led_set= {
category: 'LED',
  helpUrl: '',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
    .appendField("Set LEDs:");
    this.appendDummyInput("")
    .appendField("LED1")
        .appendField(new Blockly.FieldDropdown([["On", "On"], ["Off", "Off"]]), 'led1');
    this.appendDummyInput("")
    .appendField("LED2")
        .appendField(new Blockly.FieldDropdown([["On", "On"], ["Off", "Off"]]), 'led2');
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set LEDs to on or off');
  }
};

Blockly.Blocks.brickpi_update= {
category: 'LED',
  helpUrl: 'https://projects.wyliodrin.com/wiki/languages/visual#lego_update_values',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
    .appendField("LEGO Update Values");
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Updates the values of the sensors and motors');
  }
};

Blockly.Blocks.brickpi_startup= {
category: 'LED',
  helpUrl: 'https://projects.wyliodrin.com/wiki/languages/visual#lego_startup_sensors',
  init: function() {
    this.setColour(300);
    this.appendDummyInput("")
    .appendField("LEGO Startup Sensors");
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Start using sensors');
  }
};



