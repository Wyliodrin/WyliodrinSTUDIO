"use strict";
var DEVICES = {};
DEVICES[0x2341] = {
  name: 'Arduino',
  type: 'arduino'
};
DEVICES[0x2a03] = {
  name: 'Arduino',
  type: 'arduino'
};
DEVICES[0x10c4] = {
  name: 'OpenMote',
  type: 'openmote'
};
DEVICES[0x10c4][0xea60] = 
{
  name: 'Open Mote',
  type: 'openmote'
};
DEVICES[0x2341][0x0001] = 
{
  name: 'Uno',
  type: 'uno'
};
DEVICES[0x2341][0x0010] = {
  name: 'Mega 2560',
  type: 'mega2560'
};
DEVICES[0x2341][0x003f] = 
{
  name:'Mega ADK',
  type: 'mega2560'
};
DEVICES[0x2341][0x0042] = 
{
  name: 'Mega 2560 rev3',
  type: 'mega2560'
};
DEVICES[0x2341][0x0043] = 
{
  name: 'Uno R3',
  type: 'uno'
};
DEVICES[0x2341][0x0044] = 
{
  name: 'Mega ADK rev3',
  type: 'mega2560'
};
DEVICES[0x2341][0x8036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x0001] = 
{
  name: 'Linino ONE'
};
DEVICES[0x2a03][0x0036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x0037] = 
{
  name: 'Micro'
};
DEVICES[0x2a03][0x0038] = 
{
  name: 'Robot Control'
};
DEVICES[0x2a03][0x0039] =
{
  name: 'Robot Motor'
};
DEVICES[0x2a03][0x003a] = 
{
  name: 'Micro ADK rev3'
};
DEVICES[0x2a03][0x003c] = 
{
  name: 'Esplora'
};
DEVICES[0x2a03][0x003d] = 
{
  name: 'Due'
};
DEVICES[0x2a03][0x003e] = 
{
  name: 'Due'
};
DEVICES[0x2a03][0x0041] = 
{
  name: 'Yun'
};
DEVICES[0x2a03][0x0042] = 
{
  name: 'Mega 2560 rev3',
  type: 'mega2560'
};
DEVICES[0x2a03][0x0043] = 
{
  name: 'Uno Rev3',
  type: 'uno'
};
DEVICES[0x2a03][0x004d] = 
{
  name: 'Zero Pro'
};
DEVICES[0x2a03][0x8001] = 
{
  name: 'Linino ONE'
};
DEVICES[0x2a03][0x8036] = 
{
  name: 'Leonardo',
  type: 'leonardo'
};
DEVICES[0x2a03][0x8037] = 
{
  name: 'Micro'
};
DEVICES[0x2a03][0x8038] = 
{
  name: 'Robot Control'
};
DEVICES[0x2a03][0x8039] = 
{
  name: 'Robot Motor'
};
DEVICES[0x2a03][0x803a] = 
{
  name: 'Micro ADK rev3'
};
DEVICES[0x2a03][0x803c] = 
{
  name: 'Esplora'
};
DEVICES[0x2a03][0x8041] = 
{
  name: 'Yun'
};
DEVICES[0x2a03][0x804d] = 
{
  name: 'Zero Pro'
};

module.exports = DEVICES;