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
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.enable_motor = function (explicit, motor)
{
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.set_sensor = function (port, type)
{
    return Blockly.JavaScript.brickpi();
}

Blockly.JavaScript.brickpi_motor_set = function() {
    return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_motor_all_stop= function() {
    return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_motor_get_encoder= function() {
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_new_val= function() {
   return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.brickpi_led_set= function() {
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_update= function() {
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_startup= function() {
  return Blockly.JavaScript.brickpi();
};

Blockly.JavaScript.brickpi_sensor_touch=function() {
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_light=function() {
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.brickpi_sensor_ultrasonic=function() {
    return [Blockly.JavaScript.brickpireturn(), Blockly.JavaScript.ORDER_ATOMIC];
};