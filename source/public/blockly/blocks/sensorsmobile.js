Blockly.Blocks['sensors_mobile'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(300);
    this.appendDummyInput("sensor")
        .appendField("On sensor")
        .appendField(new Blockly.FieldDropdown([["accelerometer", "accelerometer"], 
                                                ["ambient temperature", "ambient_temperature"],
                                                ["gravity", "gravity"],
                                                ["gps", "gps"],
                                                ["gyroscope", "gyroscope"], 
                                                ["uncalibrated gyroscope", "gyroscope_uncalibrated"], 
                                                ["temperature", "temperature"], 
                                                ["light", "light"], 
                                                ["heart rate", "heart_rate"], 
                                                ["linear accelerometer", "linear_acceleration"], 
                                                ["magnetic field", "magnetic_field"], 
                                                ["uncalibrated magnetic field", "uncalibrated_magnetic_field"], 
                                                ["orientation", "orientation"], 
                                                ["pressure", "pressure"], 
                                                ["proximity", "proximity"], 
                                                ["relative humidity", "relative_humidity"], 
                                                ["rotation vector", "rotation_vector"], 
                                                ["game rotation vector", "game_rotation_vector"],
                                                ["geomagnetic rotation vector", "geomagnetic_rotation_vector"],
                                                ["step counter", "step_counter"], 
                                                ["step detector", "step_detector"],
                                                ["other", "other"]]), "sensor");
    this.appendValueInput("from_id")
	    .setCheck("null")
        .appendField("from mobile");
    this.appendValueInput("sensorvalue")
        .appendField("value");
    this.appendStatementInput("commands")
        .setCheck("null")
        .appendField("Do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};