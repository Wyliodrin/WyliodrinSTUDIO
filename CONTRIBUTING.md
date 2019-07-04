# Contributing to WyliodrinSTUDIO

:+1::tada: Thank you for improving IoT Education :tada::+1:

We are a small project that is trying to make IoT education easier for everyone.
We would love your help with

 - [Translating](#translating)
 - [Examples](#examples)
 - [Issues](#issues)
 - [Pull Request](#pull-request)
 - [Features](#features)

## Translating

We would like to see WyliodrinSTUDIO in as many languages as possible. For this
we need your help.

All you need to do is translate the [source/public/translations/messages-en.json](source/public/translations/messages-en.json) file. Make a new file, called messages-your_langauge_code.json. The language code
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

It would be very good for the project if you could translate it into:
 - Spanish
 - Chinese
 - Italian
 - Dutch
 - Portuguese
 - Hungarian

## Examples
Another way to contribute is to write examples. To make an example,
create a new project, add your code for the software and the firmware
and add the schematics.

Export the project and place it in [source/embedded/example/software/](source/embedded/example/software/) in the specific board's folder.

If the example is for all the boards, place it in the *board* folder

## Issues
Please send us any issues that you have using the GitHub issues option.

Please write the following data:
 - WyliodrinSTUDIO version (in the About menu)
 - The Chrome browser version that runs it

## Contributing Code
###  Fork the repository
A fork of the project is needed in order to temporarily commit changes to the original project without affecting the master branch. You can use this to propose new changes or fix a few bugs.

####  FORK OUR REPOSITORY
 1. Open the [Wyliodrin/WyliodrinSTUDIO](https://github.com/Wyliodrin/WyliodrinSTUDIO) repository in the GitHub webpage.
 2. In the top-right corner of the page, click *Fork*.

Now, you have a fork of the WyliodrinSTUDIO repository on your account, but you also need to create a clone of your fork locally on your computer.

####  MAKE A CLONE OF YOUR FORK
1. Open the WyliodrinSTUDIO repository from YOUR account repository.
2. Under the repository name, to the right side click ![Clone or download](http://imgur.com/aEWwV6z.png).
3. Copy the URL from the **Clone with HTTPs** box.
4. Open Git Bash and type ```git clone``` and paste the URL. Press Enter. Your local clone will be created.

### Make a new branch for a feature or bugfix
Every time you want to fix a bug or add a feature, you need to create a branch for it, which will be a copy of your master branch.

#### MAKE A NEW BRANCH
  1. Open Git Bash and type ```git branch name_new_branch```
  2. When you finished working on a branch and you want to switch to another, type the command: ```git checkout name_of_your_branch```

  Tip: You can see your branches by using: ```git branch```

### Merge the branch back
- Open Git Bash and go to the top level of your local repository.
- Type ```git status``` to make sure you are on the correct branch and to check if you have all your changes committed.
- Change the branch ```git checkout master```.
- Merge changes from your branch into the master branch ```git merge name_your_branch```.

### Make a pull request
When you finished developing your branch, the next step is to "save" the changes to the master branch. This can be done by sending a request to the project maintainers to pull your fork into original repository.

 1. On GitHub, go to your fork's webpage.
 2. Under the repository name, to the left side click [New pull request](https://github.com/Wyliodrin/WyliodrinSTUDIO/compare?expand=1).
 3. You need to follow and complete the [PULL_REQUEST_TEMPLATE](https://github.com/Wyliodrin/WyliodrinSTUDIO/blob/master/PULL_REQUEST_TEMPLATE.md).
 4. Give your pull request a name and click submit button.

## Features

If you have any ideas and suggestions, please write them on the [forum](http://www.wyliodrin.com/forum). Make sure you sign in to [Wyliodrin](http://www.wyliodrin.com) to be able to write.

You may write suggestions in the [Chrome Store](https://goo.gl/Sgj9HB)

## Coding standards

Please ensure you follow the coding standards used through-out the existing code base. Some basic rules include:

 - indent with 4-spaces, no tabs.
 - opening brace on the next line as `if`/`for`/`function` and so on, closing brace on its own line.
