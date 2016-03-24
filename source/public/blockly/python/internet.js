Blockly.Python.weather_setup = function()
{
  if(!Blockly.Python.definitions_['weather_setup_function'])
  {
    Blockly.Python.definitions_['spark_write_function'] = "def getWeather(city, param, key):\n"+
                                                          "   response = urllib.urlopen('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+key)\n"+
                                                          "   responseJson = json.loads (response.read())\n"+
                                                          '   if param =="humidity" or param =="pressure":\n'+
                                                          "     return float(responseJson['main'][param])\n"+
                                                          '   if param == "temp":\n'+
                                                          "     celsius = float(responseJson['main'][param])-273.15\n"+
                                                          "     return celsius\n"+
                                                          '   if param == "speed":\n'+
                                                          "     return float(responseJson['wind'][param])\n"
                                                          ;
  }
}

Blockly.Python.weatherLL_setup = function()
{
  if(!Blockly.Python.definitions_['weather_setup_function'])
  {
    Blockly.Python.definitions_['spark_write_function'] = "def getWeatherCoord(lat, lon, param, key):\n"+
                                                          "   response = urllib.urlopen('http://api.openweathermap.org/data/2.5/weather?lat='+str(lat)+'&lon='+str(lon)+'&APPID='+key)\n"+
                                                          "   responseJson = json.loads (response.read())\n"+
                                                          '   if param =="humidity" or param =="pressure":\n'+
                                                          "     return float(responseJson['main'][param])\n"+
                                                          '   if param == "temp":\n'+
                                                          "     celsius = float(responseJson['main'][param])-273.15\n"+
                                                          "     return celsius\n"+
                                                          '   if param == "speed":\n'+
                                                          "     return float(responseJson['wind'][param])\n"
                                                          ;
  }
}

Blockly.Python['weather_init'] = function(block) {
  var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var weather_key = Blockly.Python.variableDB_.getDistinctName ('key', Blockly.Generator.NAME_TYPE);
  Blockly.Python. weather_key= weather_key;
  var code = weather_key + ' = ' + value_key+"\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['weather_main'] = function(block) {
  Blockly.Python.import_urllib();
  Blockly.Python.importJson();
  Blockly.Python.weather_setup();
  var dropdown_weatherparam = block.getFieldValue('weatherParam');
  var value_city = Blockly.Python.valueToCode(block, 'city', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'getWeather('+value_city+", '"+dropdown_weatherparam+"', "+
            Blockly.Python.weather_key+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['weather_coord'] = function(block) {
  Blockly.Python.import_urllib();
  Blockly.Python.importJson();
  var dropdown_weatherparam = block.getFieldValue('weatherParam');
  var value_lat = Blockly.Python.valueToCode(block, 'lat', Blockly.Python.ORDER_ATOMIC);
  var value_lon = Blockly.Python.valueToCode(block, 'lon', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.weatherLL_setup();
  var code = 'getWeatherCoord('+value_lat+', '+value_lon+", '"+dropdown_weatherparam+"', "+
            Blockly.Python.weather_key+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};