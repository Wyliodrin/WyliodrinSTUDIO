# Contributing to WyliodrinSTUDIO

We would love your help with

 - [Translating](#translating)
 - [Issues](#issues)
 - [Pull Request](#pull-request)
 - [Features](#features)

## Translating

We would like to see WyliodrinSTUDIO in as many languages as possible. For this
we need your help. 

All you need to do is translate the [source/public/translations/messages-en.json](source/public/translations/messages-en.json) file. Make a new file, called messages-your_langauge_code.json. The lanuage code
is a two letter code for each language.

To get started, clone the repository and start translating the messages.

The format of [source/public/translations/messages-en.json](source/public/translations/messages-en.json) the file is the following:

    {
    	"LANGUAGE": {
    		"message":"English",
    		"description":"The name of the language that is written in the languages menu"
    	},
    	"appName": {
    		"message": "Wyliodrin STUDIO",
			"description": "The title that is written the Chrome Store, you should change this if the language characters are different from latin alphabet"
		},
		"appDesc": {
			"message": "Wyliodrin STUDIO is a Chrome based IDE for software and hardware development for IoT and Embedded Linux systems.",
			"description": "the short description written in the Chrome Store"
		},
    	"MESSAGE_KEY": {
    		"message":"the original message in English",
    		"description":"A description of the message so that you have a better idea how to translate it"
    	},
    	...
    }

For translation, only the message is necessarry:

    {
    	"LANGUAGE": {
    		"message":"Language Name"
    	},
    	"appName": {
    		"message":"Wyliodrin STUDIO"
    	},
    	"appDesc": {
    		message:"The description in your language"
    	},
    	"MESSAGE_KEY": {
    		"message":"the translated message in your language"
    	},
    	...
    }

It would be very good for the project if you could transalte it in:
 - Spanish
 - German
 - Chinese
 - Italian
 - Dutch
 - Portuguese
 - Hungarian

## Issues
Please send us any issues that you have using the github issues option.

Please write the following data:
 - WyliodrinSTUDIO version (in the About menu)
 - The Chrome browser version that runs it

## Pull Request

If you have any interesting feature or bug fix, please send us a pull request. Before sending it, make sure you follow the [coding standards](#coding_standards).

## Features

If you have any ideas and suggestions, please write them on the [forum](http://www.wyliodrin.com/forum). Make sure you sign in to [Wyliodrin](http://www.wyliodrin.com) to be able to write.

You may write suggestions in the [Chrome Store](https://goo.gl/Sgj9HB)

## Coding standards

Please ensure you follow the coding standards used through-out the existing code base. Some basic rules include:

 - indent with 4-spaces, no tabs.
 - opening brace on the next line as `if`/`for`/`function` and so on, closing brace on its own line.
