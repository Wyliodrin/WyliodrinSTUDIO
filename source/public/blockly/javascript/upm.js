"use strict"

Blockly.JavaScript.lcd_jhd1313m1_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_i2clcd'])
    {
      
      Blockly.JavaScript.my_lcd_upm_import= Blockly.JavaScript.import('jsupm_i2clcd', 'jsupm_i2clcd');
              
    }
};

Blockly.JavaScript.buzzer_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_buzzer'])
  {
    Blockly.JavaScript.my_upm_buzzer_import= Blockly.JavaScript.import('jsupm_buzzer', 'jsupm_buzzer');
    
  }
};


Blockly.JavaScript.servo_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_servo'])
  {
    Blockly.JavaScript.my_upm_servo_import= Blockly.JavaScript.import('jsupm_servo', 'jsupm_servo');
    }
};
Blockly.JavaScript.grove_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_grove'])
  {
    Blockly.JavaScript.my_upm_grove_import= Blockly.JavaScript.import('jsupm_grove', 'jsupm_grove');
  }
};
Blockly.JavaScript.ldt0028_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_ldt0028'])
  {
    Blockly.JavaScript.my_upm_ldt0028_import= Blockly.JavaScript.import('jsupm_ldt0028', 'jsupm_ldt0028');
  }
};

Blockly.JavaScript.hcsr04_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_hcsr04'])
  {
    Blockly.JavaScript.my_upm_hcsr04_import= Blockly.JavaScript.import('jsupm_hcsr04', 'jsupm_hcsr04');
  
  }
};

Blockly.JavaScript.lsm303_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_lsm303'])
  {
    Blockly.JavaScript.my_upm_lsm303_import= Blockly.JavaScript.import('jsupm_lsm303', 'jsupm_lsm303');
  
  }
};

Blockly.JavaScript.th02_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_th02'])
  {
    Blockly.JavaScript.my_upm_th02_import= Blockly.JavaScript.import('jsupm_th02', 'jsupm_th02');
  
  }
};
Blockly.JavaScript.gas_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_gas'])
  {
    Blockly.JavaScript.my_upm_gas_import= Blockly.JavaScript.import('jsupm_gas', 'jsupm_gas');
  
  }
};

Blockly.JavaScript.mic_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_mic'])
  {
    Blockly.JavaScript.my_upm_mic_import= Blockly.JavaScript.import('jsupm_mic', 'jsupm_mic');
  
  }
};
Blockly.JavaScript.hmc5883l_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_hmc5883l'])
  {
   Blockly.JavaScript.my_upm_hmc5883l_import= Blockly.JavaScript.import('jsupm_hmc5883l', 'jsupm_hmc5883l');
  
  }
};
  Blockly.JavaScript.upm_3ax_accelerometer_setup = function ()
{
  if (!Blockly.JavaScript.definitions_['import_jsupm_adxl345'])
  {
   Blockly.JavaScript.my_upm_3ax_accelerometer_import= Blockly.JavaScript.import('jsupm_adxl345', 'jsupm_adxl345');
  
  }
};
Blockly.JavaScript['upm_lcd_i2clcd_setup'] = function(block) {
  Blockly.JavaScript.lcd_jhd1313m1_setup();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  
  var value_lcd_adress = Blockly.JavaScript.valueToCode(block, 'lcd_address', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "new "+Blockly.JavaScript.my_lcd_upm_import+'.I2CLcd('+value_bus+", "+value_lcd_adress+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_lcd_jhd1313m1_setup'] = function(block) {
  Blockly.JavaScript.lcd_jhd1313m1_setup();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  var value_rgb_address = Blockly.JavaScript.valueToCode(block, 'rgb_address', Blockly.JavaScript.ORDER_ATOMIC);
  var value_lcd_adress = Blockly.JavaScript.valueToCode(block, 'lcd_address', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "new "+Blockly.JavaScript.my_lcd_upm_import+'.Jhd1313m1('+value_bus+", "+value_lcd_adress+', '+value_rgb_address+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_lcd_jhd1313m1_write'] = function(block) {
  var value_lcd = Blockly.JavaScript.valueToCode(block, 'lcd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_write = Blockly.JavaScript.valueToCode(block, 'write', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcd +'.write('+value_write+');\n';
  return code;
};

Blockly.JavaScript['upm_lcd_jhd1313m1_cursor'] = function(block) {
  var value_lcd = Blockly.JavaScript.valueToCode(block, 'lcd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcd+'.setCursor('+value_x+','+value_y+");\n";
  return code;
};

Blockly.JavaScript['upm_lcd_jhd1313m1_clear'] = function(block) {
  var value_lcd = Blockly.JavaScript.valueToCode(block, 'lcd', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcd+'.clear();\n';
  return code;
};

Blockly.JavaScript['upm_lcd_jhd1313m1_scroll'] = function(block) {
  var value_lcd = Blockly.JavaScript.valueToCode(block, 'lcd', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_direction = block.getFieldValue('direction');
  if (block.getFieldValue('direction')=="False")
    var jsdirection="false"
  else var jsdirection="true";
  // TODO: Assemble JavaScript into code variable.
  var code = value_lcd+".scroll("+jsdirection+");\n";
  return code;
};

Blockly.JavaScript['upm_lcd_jhd1313m1_setcolor'] = function(block) {
 Blockly.JavaScript.colors();
  var value_lcd = Blockly.JavaScript.valueToCode(block, 'lcd', Blockly.JavaScript.ORDER_ATOMIC);
  var value_colour = Blockly.JavaScript.valueToCode(block, 'colour', Blockly.JavaScript.ORDER_ATOMIC);
  
  // TODO: Assemble JavaScript into code variable.
  var code ='var color ='+" colorToRGB"+"("+value_colour+');'+'\n'+value_lcd+'.setColor('+"color.r"+","+"color.g"+","+"color.b"+');\n';

  return code;
};

Blockly.JavaScript['upm_buzzer_setup'] = function(block) {
  Blockly.JavaScript.buzzer_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_buzzer_import+'.Buzzer('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_buzzer_playsound'] = function(block) {
  var value_buzzer = Blockly.JavaScript.valueToCode(block, 'buzzer', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_note = block.getFieldValue('note');
  var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_timp = block.getFieldValue('timp');
  // TODO: Assemble JavaScript into code variable.
    var code = value_buzzer+'.playSound(jsupm_buzzer.'+dropdown_note+','+value_delay+"*"+dropdown_timp+');\n'
  return code;
};

Blockly.JavaScript['upm_buzzer_playsound_freq'] = function(block) {
  var value_buzzer = Blockly.JavaScript.valueToCode(block, 'buzzer', Blockly.JavaScript.ORDER_ATOMIC);
  var value_frecv = Blockly.JavaScript.valueToCode(block, 'frecv', Blockly.JavaScript.ORDER_ATOMIC);
  var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_timp = block.getFieldValue('timp');
  // TODO: Assemble JavaScript into code variable.
 
    var code = value_buzzer+'.playSound('+value_frecv+','+value_delay+'*'+dropdown_timp+');\n'
 
  return code;
};


Blockly.JavaScript['upm_servo_setup'] = function(block) {
  Blockly.JavaScript.servo_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_servo_import+'.ES08A('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_servo_set_angle'] = function(block) {
  var value_servo = Blockly.JavaScript.valueToCode(block, 'servo', Blockly.JavaScript.ORDER_ATOMIC);
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_servo+'.setAngle('+value_angle+');\n';
  return code;
};

Blockly.JavaScript['upm_grove_led_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveLed('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_led_write'] = function(block) {
  var value_write = Blockly.JavaScript.valueToCode(block, 'write', Blockly.JavaScript.ORDER_ATOMIC);
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_led+'.write('+value_write+');\n';
  return code;
};
Blockly.JavaScript['upm_grove_led_on'] = function(block) {
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_on = block.getFieldValue('on');
  // TODO: Assemble JavaScript into code variable.
  var code =  value_led+'.'+dropdown_on+'();\n';
  return code;
};

Blockly.JavaScript['upm_grove_relay_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveRelay('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_relay_write'] = function(block) {
  var value_write = Blockly.JavaScript.valueToCode(block, 'write', Blockly.JavaScript.ORDER_ATOMIC);
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_led+'.write('+value_write+');\n';
  return code;
};
Blockly.JavaScript['upm_grove_relay_on'] = function(block) {
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_on = block.getFieldValue('on');
  // TODO: Assemble JavaScript into code variable.
  var code =  value_led+'.'+dropdown_on+'();\n';
  return code;
};

Blockly.JavaScript['upm_grove_temp_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveTemp('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['upm_grove_temp'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var value_temp = Blockly.JavaScript.valueToCode(block, 'temp', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_temp+'.'+dropdown_value+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_grove_light_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveLight('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_light_values'] = function(block) {
  var dropdown_value = block.getFieldValue('value');
  var value_light = Blockly.JavaScript.valueToCode(block, 'light', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_light+'.'+dropdown_value+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_rotary_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveRotary('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_grove_rotary_abs'] = function(block) {
  var value_rotary = Blockly.JavaScript.valueToCode(block, 'rotary', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_vdr = block.getFieldValue('vdr');
  // TODO: Assemble JavaScript into code variable.
  var code = value_rotary+'.abs_'+dropdown_vdr+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_grove_rotary_rel'] = function(block) {
  var value_rotary = Blockly.JavaScript.valueToCode(block, 'rotary', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_vdr = block.getFieldValue('vdr');
  // TODO: Assemble JavaScript into code variable.
  var code = value_rotary+'.rel_'+dropdown_vdr+'()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_grove_slide_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_voltage = Blockly.JavaScript.valueToCode(block, 'voltage', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveSlide('+value_pin+','+value_voltage+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['upm_grove_slide_value'] = function(block) {
  var value_slide = Blockly.JavaScript.valueToCode(block, 'slide', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_val = block.getFieldValue('val');
  // TODO: Assemble JavaScript into code variable.
  var code = value_slide+'.'+dropdown_val+'_value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_button_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveButton('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_button_value'] = function(block) {
  var value_button = Blockly.JavaScript.valueToCode(block, 'button', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_button+'.value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_grove_touch_setup'] = function(block) {
  Blockly.JavaScript.grove_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_grove_import+'.GroveButton('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_grove_touch_value'] = function(block) {
  var value_touch = Blockly.JavaScript.valueToCode(block, 'touch', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_touch+'.value()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_piezo_setup'] = function(block) {
  Blockly.JavaScript.ldt0028_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_ldt0028_import+'.LDT0028('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_piezo_sample'] = function(block) {
  var value_piezo = Blockly.JavaScript.valueToCode(block, 'piezo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_piezo+'.getSample()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_hcsr04_setup'] = function(block) {
Blockly.JavaScript.hcsr04_setup();
var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);

var code = 'new '+Blockly.JavaScript.my_upm_hcsr04_import+'.HCSR04'+value_pin+ ')';



 return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_hcsr04_distance'] = function(block) {
  var value_hcsr04 = Blockly.JavaScript.valueToCode(block, 'hcsr04', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_hcsr04+'.getDistance()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_hcsr04_detectEdge'] = function(block) {
  var value_hcsr04 = Blockly.JavaScript.valueToCode(block, 'hcsr04', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_hcsr04+'.askEdgeDetected()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};









Blockly.JavaScript['upm_lsm303_setup'] = function(block) {
  Blockly.JavaScript.lsm303_setup();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mag_adress = Blockly.JavaScript.valueToCode(block, 'mag_address', Blockly.JavaScript.ORDER_ATOMIC);
  var value_acc_address = Blockly.JavaScript.valueToCode(block, 'acc_address', Blockly.JavaScript.ORDER_ATOMIC);
  var value_acc_scale = Blockly.JavaScript.valueToCode(block, 'acc_scale', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "new "+Blockly.JavaScript.my_upm_lsm303_import+'.LSM303('+value_bus+', '+value_mag_adress+', '+value_acc_address+', '+value_acc_scale+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_lsm303_getHeading'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getHeading()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_lsm303_getCoordinates'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getCoordinates()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
 Blockly.JavaScript['upm_lsm303_getAcceleration'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getAcceleration()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getRawCoorData'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getRawCoorData()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getCoorX'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getCoorX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getCoorY'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getCoorY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getCoorZ'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getCoorZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getAccelZ'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getAccelZ()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_lsm303_getAccelX'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getAccelX()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getAccelY'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getAccelY()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_lsm303_getRawAccelData'] = function(block) {
  var value_lsm303 = Blockly.JavaScript.valueToCode(block, 'lsm303', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_lsm303+'.getRawCoorData()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_th2_setup'] = function(block) {
  Blockly.JavaScript.th02_setup();
  
  var code = 'new '+Blockly.JavaScript.my_upm_th02_import+'.TH02()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_th2_getTemp'] = function(block) {
  var value_th2 = Blockly.JavaScript.valueToCode(block, 'th2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_th2+'.getTemperature()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_th2_getHumid'] = function(block) {
  var value_th2 = Blockly.JavaScript.valueToCode(block, 'th2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_th2+'.getHumidity()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_th2_getStatus'] = function(block) {
  var value_th2 = Blockly.JavaScript.valueToCode(block, 'th2', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_th2+'.getStatus()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_airQuality_setup'] = function(block) {
  Blockly.JavaScript.gas_setup();
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_gas_import+'.TP401('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_airQuality_ppm'] = function(block) {
  var value_airQual = Blockly.JavaScript.valueToCode(block, 'airQual', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_airQual+'.getPPM()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_mq_setup'] = function(block) {
  Blockly.JavaScript.gas_setup();
  var dropdown_mq = block.getFieldValue('mq');
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code ='new '+Blockly.JavaScript.my_upm_gas_import+'.'+dropdown_mq+'('+value_pin+')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_microphone_setup'] = function(block) {
  Blockly.JavaScript.mic_setup();

  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_mic_import+'.Microphone('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['upm_compass_setup'] = function(block) {
Blockly.JavaScript.hmc5883l_setup();

  
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+ Blockly.JavaScript.my_upm_hmc5883l_import+'.Hmc5883l('+value_pin+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_compass_direction'] = function(block) {
  var value_compass = Blockly.JavaScript.valueToCode(block, 'compass', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_compass+'.direction()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_compass_heading'] = function(block) {
  var value_compass = Blockly.JavaScript.valueToCode(block, 'compass', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_compass+'.heading()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_compass_coordinates'] = function(block) {
  var value_compass = Blockly.JavaScript.valueToCode(block, 'compass', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_compass+'.coordinates()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_compass_getDeclination'] = function(block) {
  var value_compass = Blockly.JavaScript.valueToCode(block, 'compass', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_compass+'.get_declination()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_compass_setDeclination'] = function(block) {
 
  var value_dec= Blockly.JavaScript.valueToCode(block, 'dec', Blockly.JavaScript.ORDER_ATOMIC);
   var value_compass = Blockly.JavaScript.valueToCode(block, 'compass', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =value_compass+'.set_declination('+value_dec+');';

  return code;
};


Blockly.JavaScript['upm_3axis_accelerom_setup'] = function(block) {
  Blockly.JavaScript.upm_3ax_accelerometer_setup();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_3ax_accelerometer_import+'.Adxl345('+value_bus+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_3AxAccel_getAcceleration'] = function(block) {
  var value_accelerometer = Blockly.JavaScript.valueToCode(block, 'accelerometer', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerometer+'.getAcceleration()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_3AxAccel_getRawVal'] = function(block) {
  var value_accelerometer = Blockly.JavaScript.valueToCode(block, 'accelerometer', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerometer+'.getRawValues()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['upm_3AxAccel_getScale'] = function(block) {
  var value_accelerometer = Blockly.JavaScript.valueToCode(block, 'accelerometer', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = value_accelerometer+'.getScale()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['upm_3axaccel_update'] = function(block) {
  var value_accelerometer = Blockly.JavaScript.valueToCode(block, 'accelerometer', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code =value_accelerometer+'.update();';
  return code;
};

Blockly.JavaScript['upm_3axis_compass_setup'] = function(block) {
  Blockly.JavaScript.upm_3ax_compass_setup();
  var value_bus = Blockly.JavaScript.valueToCode(block, 'bus', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'new '+Blockly.JavaScript.my_upm_3ax_compass_import+'.hmc5883l('+value_bus+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
