Blockly.Python.importSocket = function ()
{
  if (!Blockly.Python.definitions_['importSocket'])
  {
    Blockly.Python.definitions_['importSocket'] = "import socket\n";
  }
}

Blockly.Python.importJson = function ()
{
  if (!Blockly.Python.definitions_['importJson'])
  {
    Blockly.Python.definitions_['importJson'] = "import json\n";
  }
}

Blockly.Python.bitcoinValue = function ()
{
  if (!Blockly.Python.definitions_['bitcoinValue'])
  {
    Blockly.Python.importSocket();
    Blockly.Python.importJson();
    Blockly.Python.definitions_['bitcoinValue'] = "def getMegaHash(localhost, port):\n"+
    											  "  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n"+
    											  "  sock.connect((localhost, port))\n"+
    											  "  sock.send(json.dumps({'command': 'summary'}))\n"+
    											  "  resp = ''\n"+
    											  "  while 1:\n"+
        										  "    buf = sock.recv(4096)\n"+
        										  "    if buf:\n"+
            									  "      resp += buf\n"+
        										  "    else:\n"+
            									  "      break\n"+
    											  "  sock.shutdown(socket.SHUT_RDWR)\n"+
    											  "  sock.close()\n"+
    											  "  respObj = json.loads(resp[:-1])\n"+
    											  "  return respObj['SUMMARY'][0]['MHS 5s']\n";
  	}
}

Blockly.Python['megahash'] = function(block) {
  Blockly.Python.bitcoinValue();
  var value_host = Blockly.Python.valueToCode(block, 'host', Blockly.Python.ORDER_ATOMIC);
  var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "getMegaHash("+value_host+", "+value_port+")";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};