# Wyliodrin STUDIO

[![Build Status](https://travis-ci.org/Wyliodrin/WyliodrinSTUDIO.svg?branch=master)](https://travis-ci.org/Wyliodrin/WyliodrinSTUDIO)
[![Dependency Status](https://gemnasium.com/Wyliodrin/WyliodrinSTUDIO.svg)](https://gemnasium.com/Wyliodrin/WyliodrinSTUDIO)
[![Gitter](https://badges.gitter.im/Wyliodrin/WyliodrinSTUDIO.svg)](https://gitter.im/Wyliodrin/WyliodrinSTUDIO?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Wyliodrin STUDIO is a Chrome based IDE for software and hardware development for IoT and Embedded Linux systems.

![Wyliodrin](https://raw.githubusercontent.com/Wyliodrin/WyliodrinSTUDIO/master/extra/gitslide.gif)

* Connect to devices using TCP/IP or serial port
* Develop software and firmware for IoT in several programming languages
* Shell access to the device
* Import and export Wyliodrin STUDIO projects
* Visual dashboard for displaying sensor data
* Display the hardware schematics
* Manage packages for Python and Javascript
* Task manager for managing the device
* Network connection manager for the device  (Ethernet and WiFi)
* Interactive electronics documentation (resistor color code)
* Example projects and firmware
* Wyliodrin API documentation in C/C++, Python and Javascript

## Supported devices:
* Raspberry Pi and Arduino 
* UDOO Neo 
* BeagleBone Black 
* Arduino Yun

## Supported languages
* Visual Programming (translates to Python)
* Javascript
* Python
* Streams (node-red)
* Shell Script (bash)

## Install
You may find Wyliodrin STUDIO on the [Chrome Store](https://goo.gl/Sgj9HB)

![Wyliodrin](https://raw.githubusercontent.com/Wyliodrin/WyliodrinSTUDIO/master/extra/wyliodrin_studio_qr.png)

## Device

The device needs to run
* [wyliodrin-app-server](https://www.github.com/wyliodrin/wyliodrin-app-server)
* [wyliodrin-server](https://www.github.com/wyliodrin/wyliodrin-server)
* [libwyliodrin](https://www.github.com/wyliodrin/libwyliodrin)

You may download device images that have them installed from Wyliodrin.

* UDOO Neo [Download Image](http://www.wyliodrin.com/images/beta/udooneo)
* Raspberry Pi and Arduino [Download Image](http://www.wyliodrin.com/images/beta/raspberrypi)
* BeagleBone Black [Download Image](http://www.wyliodrin.com/images/beta/beagleboneblack)
* Arduino Yun

## Build

You will need 

* [NodeJS](http://www.nodejs.org) version 4 or higher.
* [grunt](http://gruntjs.com/)
* [yarn](https://yarnpkg.com/) (optional)

You may build Wyliodrin STUDIO yourself

    git clone https://www.github.com/Wyliodrin/WyliodrinSTUDIO
    cd WyliodrinSTUDIO
    yarn # npm install works slow
    patch node_modules/highcharts-ng/dist/highcharts-ng.js patches/highcharts-ng.patch
    patch node_modules/angular-tree-control/css/tree-control-attribute.css patches/tree-control-attribute.patch
    patch node_modules/marked/lib/marked.js patches/marked.patch
    patch node_modules/angular-ui-ace/src/ui-ace.js patches/angular-ui-ace.patch
    grunt

### Install grunt 

    sudo npm install -g grunt-cli 

The build is in the *build* folder

### Parameters

* DEBUG_WYLIODRIN='wyliodrin.*' - enable debug messages (this will have a performance impact)
* MIXPANEL_WYLIODRIN='' - mixpanel token for anonymous statistics sending

## Contribute

We would love your help. Click [here](CONTRIBUTING.md) to find out how to contribute.

## Authors

Wyliodrin STUDIO is a product of [Wyliodrin](http://www.wyliodrin.com)

* [Alexandru Radovici](https://www.github.com/alexandruradovici) - Maintainer
* [Razvan Serban](https://www.github.com/serban-razvan) - Developer
* [Ioana Culic](https://www.github.com/ioanaculic) - Developer
* [Ovidiu Stoica](https://www.github.com/oviska) - UX / UI

Contributions

* [Paula Margarit](https://www.github.com/paula-elena) - Developer
* [Daniel Dosaru](https://www.github.com/dosarudaniel) - Developer
* [Mihai Popescu](https://www.github.com/mhpopescu) - Developer

Wyliodrin is a trademark of Wyliodrin SRL. All rights reservered.

## License

GPLv3

Please consider contacting us at office@wyliodrin.com if you plan to use it in a commercial software.
This license allows you to write/distribute/sell an applications written in Wyliodrin STUDIO. If does not allow you to sell Wyliodrin STUDIO or any derived products.


