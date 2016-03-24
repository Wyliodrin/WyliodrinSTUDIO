//DEFINE GENERATORS:

"use strict";


Blockly.JavaScript.brickpi = function()
{
    Blockly.JavaScript.NoSupportFor ('BrickPi');
}

Blockly.JavaScript.brickpireturn = function()
{
    return '0 /*Block not supported in JavaScript*/';
}

Blockly.JavaScript.brickpi_sensors = function ()
{
    // if (!Blockly.JavaScript.definitions_['brickpi_sensors'])
    // {
    //     // Blockly.Python.definitions_['brickpi_sensors'] = 'BrickPiSetupSensors()\n';
    // }
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.enable_motor = function (explicit, motor)
{
    // if (!Blockly.Python.definitions_['enable_motor_'+motor])
    // {
    //     if (!explicit) Blockly.Python.definitions_['enable_motor_'+motor] = 'BrickPi.MotorEnable['+motor+'] = 1\n';
    //     else Blockly.Python.definitions_['enable_motor_'+motor] = '';
    // }
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.set_sensor = function (port, type)
{
    // if (!Blockly.Python.definitions_['set_sensor_'+port])
    // {
    //     Blockly.Python.definitions_['set_sensor_'+port] = 'BrickPi.SensorType[PORT_'+port+'] = '+type+'\n';
    // }
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.brickpi_motor_set = function() {
    // Blockly.Python.brickpi ();
    // //var value_motor_number = Blockly.Python.valueToCode(this, 'motor_num', Blockly.Python.ORDER_ATOMIC);
    // var value_motor_power = Blockly.Python.valueToCode(this, 'motor_power', Blockly.Python.ORDER_NONE);
    // var code;
    // var value_motor_number= this.getTitleValue('motor_num');
    // //var value_motor_power = parseInt(this.getTitleValue('motor_power'));
    // if (value_motor_number == 'All')
    // {
    //     Blockly.Python.enable_motor (false, 'PORT_A');
    //     Blockly.Python.enable_motor (false, 'PORT_B');
    //     Blockly.Python.enable_motor (false, 'PORT_C');
    //     Blockly.Python.enable_motor (false, 'PORT_D');
    //     code = 'BrickPi.MotorSpeed[PORT_A] = '+value_motor_power+'\n'+
    //             'BrickPi.MotorSpeed[PORT_B] = '+value_motor_power+'\n'+
    //             'BrickPi.MotorSpeed[PORT_C] = '+value_motor_power+'\n'+
    //             'BrickPi.MotorSpeed[PORT_D] = '+value_motor_power+'\n';
    // }
    // else
    // {
    //     Blockly.Python.enable_motor (false, value_motor_number);
    //     code = 'BrickPi.MotorSpeed['+value_motor_number+'] = '+value_motor_power+'\n';
    // }
    // return code;
    return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_motor_all_stop= function() {
    // var code = 'BrickPi.MotorSpeed[PORT_A] = 0\n'+
    //             'BrickPi.MotorSpeed[PORT_B] = 0\n'+
    //             'BrickPi.MotorSpeed[PORT_C] = 0\n'+
    //             'BrickPi.MotorSpeed[PORT_D] = 0\n';
    // return code;
    return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_motor_get_encoder= function() {
    // var value_encoder= this.getTitleValue('enc');
    // value_encoder-=1;
    // var code = 'self.getSensorValue("encoder", ' + value_encoder + ')';
    // return [code, Blockly.Python.ORDER_ATOMIC];
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_new_val= function() {
    // var port= this.getTitleValue('port');
    // var code= 'self.sensorStatus["'+port+'"]';
    // return [code, Blockly.Python.ORDER_ATOMIC];
   return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.brickpi_led_set= function() {
  // var value_led1;
  // var value_led2;
  // if(this.getTitleValue('led1') =="On") {
  //   value_led1= 1;
  // }
  // else {
  //   value_led1= 0;
  // }
  //  if(this.getTitleValue('led2') =="On") {
  //   value_led2= 1;
  // }
  // else {
  //   value_led2= 0;
  // }
  //   code= 'toSend = Message(self.hostname, None, "HwCmd", Message.createImage(led1=' +value_led1+ ', led2=' +value_led2+ '))'+'\n'+'channel.basic_publish(exchange="", routing_key="HwCmd", body=toSend)'+'\n'+'time.sleep(.01)'+'\n';
  // return code;
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_update= function() {
  // var code= 'BrickPiUpdateValues()\n';
  // return code;
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_startup= function() {
  // var code= 'BrickPiSetupSensors()\n';
  // return code;
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_sensor_touch=function() {
    // var b=this.getTitleValue("port");
    // var a=this.getTitleValue("status");
    // Blockly.Python.brickpi ();
    // Blockly.Python.brickpi_sensors ();
    // Blockly.Python.set_sensor (b, 'TYPE_SENSOR_TOUCH');
    
    // return['BrickPi.Sensor[PORT_'+b+']', Blockly.Python.ORDER_ATOMIC];
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_light=function() {
    // var b=this.getTitleValue("port");;

    // Blockly.Python.brickpi ();
    // Blockly.Python.brickpi_sensors ();
    // Blockly.Python.set_sensor (b, 'TYPE_SENSOR_COLOR_FULL');
    
    // return['BrickPi.Sensor[PORT_'+b+']', Blockly.Python.ORDER_ATOMIC];
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_ultrasonic=function() {
    // var b=this.getTitleValue("port");;

    // Blockly.Python.brickpi ();
    // Blockly.Python.brickpi_sensors ();
    // Blockly.Python.set_sensor (b, 'TYPE_SENSOR_ULTRASONIC_CONT');
    
    // return['BrickPi.Sensor[PORT_'+b+']', Blockly.Python.ORDER_ATOMIC];
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

// Blockly.Python.sensor_sound=function() {
//     var b=this.getTitleValue("port");;

//     Blockly.Python.brickpi ();
//     Blockly.Python.brickpi_sensors ();
//     Blockly.Python.set_sensor (b, 'TYPE_SENSOR_SOUND');
    
//     return['BrickPi.Sensor[PORT_'+b+']', Blockly.Python.ORDER_ATOMIC];
// };
