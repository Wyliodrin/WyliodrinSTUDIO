"use strict"
Blockly.Python.lcd_jhd1313m1_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_i2clcd'])
    {
      
      Blockly.Python.my_lcd_upm_import= Blockly.Python.variableDB_.getDistinctName('pyupm_i2clcd', Blockly.Generator.NAME_TYPE);
      Blockly.Python.definitions_['import_pyupm_i2clcd'] = "import pyupm_i2clcd as "+Blockly.Python.my_lcd_upm_import+"\n";
      
              
    }
};

Blockly.Python.buzzer_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_buzzer'])
  {
    Blockly.Python.my_upm_buzzer_import= Blockly.Python.variableDB_.getDistinctName('pyupm_buzzer', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_buzzer'] = "import "+Blockly.Python.my_upm_buzzer_import+' as pyupm_buzzer'+"\n";
  }
};

Blockly.Python.servo_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_servo'])
  {
    Blockly.Python.my_upm_servo_import= Blockly.Python.variableDB_.getDistinctName('pyupm_servo', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_servo'] = "import "+Blockly.Python.my_upm_servo_import+' as pyupm_servo'+"\n";
  }
};
Blockly.Python.grove_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_grove'])
  {
    Blockly.Python.my_upm_grove_import= Blockly.Python.variableDB_.getDistinctName('pyupm_grove', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_grove'] = "import "+Blockly.Python.my_upm_grove_import+' as pyupm_grove'+"\n";
  }
};
Blockly.Python.ldt0028_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_ldt0028'])
  {
    Blockly.Python.my_upm_ldt0028_import= Blockly.Python.variableDB_.getDistinctName('pyupm_ldt0028', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_ldt0028'] = "import "+Blockly.Python.my_upm_ldt0028_import+' as pyupm_ldt0028'+"\n";
  }
};

Blockly.Python.hcsr04_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_hcsr04'])
  {
    Blockly.Python.my_upm_hcsr04_import= Blockly.Python.variableDB_.getDistinctName('pyupm_hcsr04', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_hcsr04'] = "import "+Blockly.Python.my_upm_hcsr04_import+' as pyupm_hcsr04'+"\n";
  }
};

Blockly.Python.lsm303_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_lsm303'])
  {
    Blockly.Python.my_upm_lsm303_import= Blockly.Python.variableDB_.getDistinctName('pyupm_lsm303', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_lsm303'] = "import "+Blockly.Python.my_upm_lsm303_import+' as pyupm_lsm303'+"\n";
  }
};

Blockly.Python.th02_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_th02'])
  {
    Blockly.Python.my_upm_th02_import= Blockly.Python.variableDB_.getDistinctName('pyupm_th02', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_th02'] = "import "+Blockly.Python.my_upm_th02_import+' as pyupm_th02'+"\n";
  }
};
Blockly.Python.gas_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_gas'])
  {
    Blockly.Python.my_upm_gas_import= Blockly.Python.variableDB_.getDistinctName('pyupm_gas', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_gas'] = "import "+Blockly.Python.my_upm_gas_import+' as pyupm_gas'+"\n";
  }
};

Blockly.Python.mic_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_mic'])
  {
    Blockly.Python.my_upm_mic_import= Blockly.Python.variableDB_.getDistinctName('pyupm_mic', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_mic'] = "import "+Blockly.Python.my_upm_mic_import+' as pyupm_mic'+"\n";
  }
};

Blockly.Python.hmc5883l_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_hmc5883l'])
  {
    Blockly.Python.my_upm_hmc5883l_import= Blockly.Python.variableDB_.getDistinctName('pyupm_hmc5883l', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_hmc5883l'] = "import "+Blockly.Python.my_upm_hmc5883l_import+' as pyupm_hmc5883l'+"\n";
  }
};

Blockly.Python.upm_3ax_accelerometer_setup = function ()
{
  if (!Blockly.Python.definitions_['import_pyupm_adxl345'])
  {
    Blockly.Python.my_upm_adxl345_import= Blockly.Python.variableDB_.getDistinctName('pyupm_adxl345', Blockly.Generator.NAME_TYPE);
    Blockly.Python.definitions_['import_pyupm_adxl345'] = "import "+Blockly.Python.my_upm_adxl345_import+' as pyupm_adxl345'+"\n";
  }
};

Blockly.Python['upm_lcd_i2clcd_setup'] = function(block) {
  Blockly.Python.lcd_jhd1313m1_setup();
  var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
  var value_lcd_adress = Blockly.Python.valueToCode(block, 'lcd_address', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_lcd_upm_import+".I2CLcd("+value_bus+', '+value_lcd_adress+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lcd_jhd1313m1_setup'] = function(block) {
  Blockly.Python.lcd_jhd1313m1_setup();
  var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
  var value_lcd_adress = Blockly.Python.valueToCode(block, 'lcd_address', Blockly.Python.ORDER_ATOMIC);
  var value_rgb_address = Blockly.Python.valueToCode(block, 'rgb_address', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_lcd_upm_import+".Jhd1313m1("+value_bus+', '+value_lcd_adress+', '+value_rgb_address+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_lcd_jhd1313m1_write'] = function(block) {
  var value_lcd = Blockly.Python.valueToCode(block, 'lcd', Blockly.Python.ORDER_ATOMIC);
  var value_write = Blockly.Python.valueToCode(block, 'write', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcd +'.write('+value_write+')\n';
  return code;
};
 

Blockly.Python['upm_lcd_jhd1313m1_cursor'] = function(block) {
  var value_lcd = Blockly.Python.valueToCode(block, 'lcd', Blockly.Python.ORDER_ATOMIC);
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcd+'.setCursor('+value_x+','+value_y+")\n";
  return code;
};

Blockly.Python['upm_lcd_jhd1313m1_scroll'] = function(block) {
  var value_lcd = Blockly.Python.valueToCode(block, 'lcd', Blockly.Python.ORDER_ATOMIC);
  var dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble Python into code variable.
  var code = value_lcd+".scroll("+dropdown_direction+")\n";
  return code;
};

Blockly.Python['upm_lcd_jhd1313m1_clear'] = function(block) {
  var value_lcd = Blockly.Python.valueToCode(block, 'lcd', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_lcd+'.clear()\n';
  return code;
};

Blockly.Python['upm_lcd_jhd1313m1_setcolor'] = function(block) {
  Blockly.Python.colors();
  var value_lcd = Blockly.Python.valueToCode(block, 'lcd', Blockly.Python.ORDER_ATOMIC);
  var value_colour = Blockly.Python.valueToCode(block, 'colour', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code ='color ='+"colorToRGB"+"("+value_colour+')'+'\n'+value_lcd+'.setColor('+"color[0]"+","+"color[1]"+","+"color[2]"+')';
  return code;
};

Blockly.Python['upm_buzzer_setup'] = function(block) {
  Blockly.Python.buzzer_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_buzzer_import+'.Buzzer('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_buzzer_playsound'] = function(block) {
  var value_buzzer = Blockly.Python.valueToCode(block, 'buzzer', Blockly.Python.ORDER_ATOMIC);
  var dropdown_note = block.getFieldValue('note');
  var value_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
  var dropdown_timp = block.getFieldValue('timp');
  // TODO: Assemble Python into code variable.
    var code = value_buzzer+'.playSound(pyupm_buzzer.'+dropdown_note+','+value_delay+'*'+dropdown_timp+')\n';
  return code;
};
Blockly.Python['upm_buzzer_playsound_freq'] = function(block) {
  var value_buzzer = Blockly.Python.valueToCode(block, 'buzzer', Blockly.Python.ORDER_ATOMIC);
  var value_frecv = Blockly.Python.valueToCode(block, 'frecv', Blockly.Python.ORDER_ATOMIC);
  var value_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
  var dropdown_timp = block.getFieldValue('timp');
  // TODO: Assemble Python into code variable.
  var code = value_buzzer+'.playSound('+value_frecv+','+value_delay+'*'+dropdown_timp+')\n';
  return code;
};

Blockly.Python['upm_servo_setup'] = function(block) {
  Blockly.Python.servo_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_servo_import+'.ES08A('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_servo_set_angle'] = function(block) {
  var value_servo = Blockly.Python.valueToCode(block, 'servo', Blockly.Python.ORDER_ATOMIC);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_servo+'.setAngle('+value_angle+')\n';
  return code;
};


Blockly.Python['upm_grove_led_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveLed('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['upm_grove_led_write'] = function(block) {
  var value_write = Blockly.Python.valueToCode(block, 'write', Blockly.Python.ORDER_ATOMIC);
  var value_led= Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_led+'.write('+value_write+')\n';
  return code;
};

Blockly.Python['upm_grove_led_on'] = function(block) {
  var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
  var dropdown_on = block.getFieldValue('on');
  // TODO: Assemble Python into code variable.
  var code = value_led+'.'+dropdown_on+'()\n';
  return code;
};

Blockly.Python['upm_grove_relay_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveRelay('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['upm_grove_relay_write'] = function(block) {
  var value_write = Blockly.Python.valueToCode(block, 'write', Blockly.Python.ORDER_ATOMIC);
  var value_led= Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_led+'.write('+value_write+')\n';
  return code;
};

Blockly.Python['upm_grove_relay_on'] = function(block) {
  var value_led = Blockly.Python.valueToCode(block, 'led', Blockly.Python.ORDER_ATOMIC);
  var dropdown_on = block.getFieldValue('on');
  // TODO: Assemble Python into code variable.
  var code = value_led+'.'+dropdown_on+'()\n';
  return code;
};

Blockly.Python['upm_grove_temp_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveTemp('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};



Blockly.Python['upm_grove_temp'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var value_temp = Blockly.Python.valueToCode(block, 'temp', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_temp+'.'+dropdown_value+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_light_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveLight('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_light_values'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var value_light = Blockly.Python.valueToCode(block, 'light', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_light+'.'+dropdown_value+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_rotary_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveRotary('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_rotary_abs'] = function(block) {
  var value_rotary = Blockly.Python.valueToCode(block, 'rotary', Blockly.Python.ORDER_ATOMIC);
  var dropdown_vdr = block.getFieldValue('vdr');
  // TODO: Assemble Python into code variable.
  var code = value_rotary+'.abs_'+dropdown_vdr+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_grove_rotary_rel'] = function(block) {
  var value_rotary = Blockly.Python.valueToCode(block, 'rotary', Blockly.Python.ORDER_ATOMIC);
  var dropdown_vdr = block.getFieldValue('vdr');
  // TODO: Assemble Python into code variable.
  var code = value_rotary+'.rel_'+dropdown_vdr+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_slide_setup'] = function(block) {
   Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_voltage = Blockly.Python.valueToCode(block, 'voltage', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveSlide('+value_pin+','+value_voltage+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_grove_slide_value'] = function(block) {
  var value_slide = Blockly.Python.valueToCode(block, 'slide', Blockly.Python.ORDER_ATOMIC);
  var dropdown_val = block.getFieldValue('val');
  // TODO: Assemble Python into code variable.
  var code = value_slide+'.'+dropdown_val+'_value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_button_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveButton('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_grove_button_value'] = function(block) {
  var value_button = Blockly.Python.valueToCode(block, 'button', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_button+'.value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_grove_touch_setup'] = function(block) {
  Blockly.Python.grove_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_grove_import+'.GroveButton('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_grove_touch_value'] = function(block) {
  var value_touch = Blockly.Python.valueToCode(block, 'touch', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_touch+'.value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_piezo_setup'] = function(block) {
  Blockly.Python.ldt0028_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_ldt0028_import+'.LDT0028('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_piezo_sample'] = function(block) {
  var value_piezo = Blockly.Python.valueToCode(block, 'piezo', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_piezo+'.getSample()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_hcsr04_distance'] = function(block) {
  var value_hcsr04 = Blockly.Python.valueToCode(block, 'hcsr04', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_hcsr04+'.getDistance()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_hcsr04_detectEdge'] = function(block) {
  var value_hcsr04 = Blockly.Python.valueToCode(block, 'hcsr04', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_hcsr04+'.askEdgeDetected()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_setup'] = function(block) {
  Blockly.Python.lsm303_setup();
  var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
  var value_mag_address = Blockly.Python.valueToCode(block, 'mag_address', Blockly.Python.ORDER_ATOMIC);
  var value_acc_address = Blockly.Python.valueToCode(block, 'acc_address', Blockly.Python.ORDER_ATOMIC);
  var value_acc_scale = Blockly.Python.valueToCode(block, 'acc_scale', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_lsm303_import+'.LSM303('+value_bus+', '+value_mag_address+', '+value_acc_address+', '+value_acc_scale+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_getHeading'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getHeading()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_getCoordinates'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getCoordinates()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getAcceleration'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getAcceleration()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getRawCoorData'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getRawCoorData()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_getRawAccelData'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getRawAccelData()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getCoorX'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getCoorX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_getCoorY'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getCoorY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getCoorZ'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getCoorZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getAccelZ'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getAccelZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_lsm303_getAccelY'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getAccelY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_lsm303_getAccelX'] = function(block) {
  var value_lsm303 = Blockly.Python.valueToCode(block, 'lsm303', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_lsm303+'.getAccelX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_th2_setup'] = function(block) {
  Blockly.Python.th02_setup();
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_th02_import+'.TH02()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_th2_getTemp'] = function(block) {
  var value_airQual = Blockly.Python.valueToCode(block, 'th2', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_th2+'.getTemperature';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_th2_getHumid'] = function(block) {
  var value_th2 = Blockly.Python.valueToCode(block, 'th2', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_th2+'.getHumidity';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_th2_getStatus'] = function(block) {
  var value_th2 = Blockly.Python.valueToCode(block, 'th2', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_th2+'.getStatus';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['upm_airQuality_setup'] = function(block) {
  Blockly.Python.gas_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_gas_import+'.TP401('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_airQuality_ppm'] = function(block) {
  var value_airQual = Blockly.Python.valueToCode(block, 'airQual', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_airQual+'.getPPM()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_mq_setup'] = function(block) {
   Blockly.Python.gas_setup();
  var dropdown_mq = block.getFieldValue('mq');
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_gas_import+'.'+dropdown_mq+'('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_microphone_setup'] = function(block) {
  Blockly.Python.mic_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_mic_import+'.Microphone('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_compass_setup'] = function(block) {
   Blockly.Python.hmc5883l_setup();
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = Blockly.Python.my_upm_hmc5883l_import+'.Hmc5883l('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
  Blockly.Python['upm_compass_direction'] = function(block) {
  var value_compass = Blockly.Python.valueToCode(block, 'compass', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_compass+'.direction';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
  Blockly.Python['upm_compass_heading'] = function(block) {
  var value_compass = Blockly.Python.valueToCode(block, 'compass', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_compass+'.heading';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_compass_coordinates'] = function(block) {
  var value_compass = Blockly.Python.valueToCode(block, 'compass', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_compass+'.coordinates';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_compass_getDeclination'] = function(block) {
  var value_compass = Blockly.Python.valueToCode(block, 'compass', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_compass+'.get_declination';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_compass_setDeclination'] = function(block) {
  var value_compass = Blockly.Python.valueToCode(block, 'compass', Blockly.Python.ORDER_ATOMIC);
  var value_dec = Blockly.Python.valueToCode(block, 'dec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_compass+'.set_declination('+value_dec+')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['upm_3axis_accelerom_setup'] = function(block) {
  Blockly.Python.upm_3ax_accelerometer_setup();
  var value_bus = Blockly.Python.valueToCode(block, 'bus', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code =  Blockly.Python.my_upm_adxl345_import+'.Adxl345('+value_bus+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_3AxAccel_getAcceleration'] = function(block) {
  var value_accelerometer = Blockly.Python.valueToCode(block, 'accelerometer', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerometer+'.getAcceleration()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_3AxAccel_getRawVal'] = function(block) {
  var value_accelerometer = Blockly.Python.valueToCode(block, 'accelerometer', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerometer+'.getRawValues()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['upm_3AxAccel_getScale'] = function(block) {
  var value_accelerometer = Blockly.Python.valueToCode(block, 'accelerometer', Blockly.Python.ORDER_ATOMIC);
  
  // TODO: Assemble Python into code variable.
  var code = value_accelerometer+'.getScale()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['upm_3axaccel_update'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_accelerometer+'.update()\n';
  return code;
};
