"use strict";

var libwyliodrin = [
	{
		name:"pinMode",
		description:"Configures the specified pin to behave either as an input or an output.",
		snippet:"pinMode (${1:pin}, ${2:mode})",
		returns:"None",
		params:[
			{
				name:"pin",
				description:"the number of the pin whose mode you wish to set",
				optional:false
			},
			{
				name:"mode",
				description:"INPUT,OUTPUT",
				optional:false
			}
		]
	},
	{
		name:"digitalWrite",
		description:"Write a HIGH or a LOW value to a digital pin.",
		snippet:"digitalWrite (${1:pin}, ${2:value})",
		returns:"None",
		params:[
			{
				name:"pin",
				description:"the number of the pin you want to write the value on",
				optional:false
			},
			{
				name:"value",
				description:"LOW,HIGH",
				optional:false
			}
		]
	},
	{
		name:"analogWrite",
		description:"Writes a scaled analog value (PWM wave) to a pin.",
		snippet:"analogWrite (${1:pin}, ${2:value})",
		returns:"None",
		params:[
			{
				name:"pin",
				description:"the pin to write to",
				optional:false
			},
			{
				name:"value",
				description:"the duty cycle: between 0 (always off) and 255 (always on).",
				optional:false
			}
		]
	},
	{
		name:"analogRead",
		description:"Reads the scaled value from the specified analog pin.",
		snippet:"analogRead (${1:pin})",
		returns:"int (0 to 1023)",
		params:[
			{
				name:"pin",
				description:"the number of the analog input pin to read from",
				optional:false
			}
		]
	},
	{
		name:"analogReadRaw",
		description:"Reads the raw value from the specified analog pin.",
		snippet:"analogReadRaw (${1:pin})",
		returns:"int (values depend on the board)",
		params:[
			{
				name:"pin",
				description:"the number of the analog input pin to read from",
				optional:false
			}
		]
	},
	{
		name:"analogWriteRaw",
		description:"Writes a raw analog value (PWM wave) to a pin.",
		snippet:"analogWriteRaw (${1:pin}, ${2:value})",
		returns:"None",
		params:[
			{
				name:"pin",
				description:"the pin to write to",
				optional:false
			},
			{
				name:"value",
				description:"the raw duty cycle: depends on the board",
				optional:false
			}
		]
	},
	{
		name:"pulseIn",
		description:"Reads a pulse (either HIGH or LOW) on a pin.",
		snippet:"pulseIn (${1:pin})",
		returns:"the length of the pulse (in microseconds) or 0 if no pulse is completed before the timeout",
		params:[
			{
				name:"pin",
				description:"the number of the pin on which you want to read the pulse",
				optional:false
			},
			{
				name:"value",
				description:"type of pulse to read (HIGH or LOW)",
				optional:false
			},
			{
				name:"timeout",
				description:"the number of microseconds to wait for the pulse to be completed (the function returns 0 if no complete pulse was received within the timeout)",
				optional:true,
				defaultValue:"1000000"
			}
		]
	},
	{
		name:"shiftIn",
		description:"Shifts in a byte of data one bit at a time. Starts from either the most (i.e. the leftmost) or least (rightmost) significant bit.",
		snippet:"shiftIn (${1:dataPin}, ${2:clockPin}, ${3:bitOrder})",
		returns:"the value read",
		params:[
			{
				name:"dataPin",
				description:"the pin on which to input each bit",
				optional:false
			},
			{
				name:"clockPin",
				description:"he pin to toggle to signal a read from dataPin",
				optional:false
			},
			{
				name:"bitOrder",
				description:"which order to shift in the bits (MSBFIRST or LSBFIRST)",
				optional:false,
			}
		]
	},
	{
		name:"shiftOut",
		description:"Shifts out a byte of data one bit at a time. Starts from either the most (i.e. the leftmost) or least (rightmost) significant bit.",
		returns:"None",
		params:[
			{
				name:"dataPin",
				description:"the pin on which to input each bit",
				optional:false
			},
			{
				name:"clockPin",
				description:"the pin to toggle once the dataPin has been set to the correct value",
				optional:false
			},
			{
				name:"bitOrder",
				description:"which order to shift in the bits (MSBFIRST or LSBFIRST)",
				optional:false,
			}
		]
	},
	{
		name:"delayMicroseconds",
		description:"Pauses the program for the amount of time (in microseconds) specified as parameter.",
		returns:"None",
		params:
		[
			{
				name:"us",
				description:"the number of microseconds to pause",
				optional:false
			}
		]
	},
	{
		name:"millis",
		description:"Returns the number of milliseconds since the board began running the current program.",
		returns:"Number of milliseconds since the program started",
		params:[]
	},
	{
		name:"micros",
		description:"Returns the number of microseconds since the board began running the current program.",
		returns:"Number of microseconds since the program started",
		params:[]
	},
	{
		name:"sendSignal",
		description:"Sends a signal to the dashboard.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"value",
				description:"the value of the signal",
				optional:false
			}
		]
	},
	{
		name:"sendSignalAndFlag",
		description:"Sends a signal to the dashboard and puts a flag on the graph.",
		returns:"None",
		params:
		[
			{
				name:"flag",
				description:"the name of the flag that appears on the graph",
				optional:false
			},
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"value",
				description:"the value of the signal",
				optional:false
			}
		]
	},
	{
		name:"putFlag",
		description:"Attaches a flag to a signal on the graph.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal the flag is attached to",
				optional:false
			},
			{
				name:"flag",
				description:"the name of the flag that appears on the graph",
				optional:false
			}
		]
	},
	{
		name:"sendSignalsList",
		description:"Sends a list of signals to the dashboard. The list of signal labels and values should have the same number of elements.",
		returns:"None",
		params:
		[
			{
				name:"listOfLabels",
				description:"a list of labels, each identifying a different signal",
				optional:false
			},
			{
				name:"listOfValues",
				description:"a list of the values to be displayed in tha dashboard; each value has a correspondent label",
				optional:false
			},
			{
				name:"noOfElements",
				description:"the number of elements in the labels and values lists",
				optional:false
			}
		]
	},
	{
		name:"sendSignalsListAndFlag",
		description:"Sends a list of signals to the dashboard and puts a flag on the graph. The list of signal labels and values should have the same number of elements.",
		returns:"None",
		params:
		[
			{
				name:"flag",
				description:"the name of the flag that appears on the graph",
				optional:false
			},
			{
				name:"listOfLabels",
				description:"a list of labels, each identifying a different signal",
				optional:false
			},
			{
				name:"listOfValues",
				description:"a list of the values to be displayed in tha dashboard; each value has a correspondent label",
				optional:false
			},
			{
				name:"noOfElements",
				description:"the number of elements in the labels and values lists",
				optional:false
			}
		]
	},
	{
		name:"sendCoordinates",
		description:"Sends a signal described by latitude and longitude to be displayed on a maps dashboard element.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"latitude",
				description:"the latitude to be displayed on the maps",
				optional:false
			},
			{
				name:"longitude",
				description:"the longitude to be displayed on the maps",
				optional:false
			}
		]
	},
	{
		name:"sendCoordinatesAndFlag",
		description:"Sends a signal described by latitude and longitude together with a flag to be displayed on a maps dashboard element.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"latitude",
				description:"the latitude to be displayed on the maps",
				optional:false
			},
			{
				name:"longitude",
				description:"the longitude to be displayed on the maps",
				optional:false
			},
			{
				name:"flag",
				description:"the name of the flag that appears on the maps",
				optional:false
			}
		]
	},
	{
		name:"sendSignalXY",
		description:"Sends a signal described by two coordinates.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"x",
				description:"the x coordinate of the signal",
				optional:false
			},
			{
				name:"y",
				description:"the y coordinate of the signal; y is considered the timestamp of the x value",
				optional:false
			}
		]
	},
	{
		name:"sendSignalXYAndFlag",
		description:"Sends a signal described by two coordinates and puts a flag on the graph.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label of the signal",
				optional:false
			},
			{
				name:"x",
				description:"the x coordinate of the signal",
				optional:false
			},
			{
				name:"y",
				description:"the y coordinate of the signal; y is considered the timestamp of the x value",
				optional:false
			},
			{
				name:"flag",
				description:"the name of the flag that appears on the graph",
				optional:false
			}
		]
	},
	{
		name:"initCommunication",
		description:"Initiates the sending of messages to the same or other board(s). The function needs to be called only once, followed by no matter how many calls of the \"sendMessage\" function.",
		returns:"None",
		params:[]
	},
	{
		name:"sendMessage",
		description:"Sends a message to one or multiple board(s)",
		returns:"None",
		params:
		[
			{
				name:"id(s)",
				description:"the id or a list of ids of the board(s) to which the message is sent",
				optional:false
			},
			{
				name:"label",
				description:"the label that identifies the connection through which the message is sent",
				optional:false
			},
			{
				name:"message",
				description:"the message to be sent",
				optional:false
			}
		]
	},
	{
		name:"openConnection",
		description:"Opens a connection and waits for messages from the same or other board(s) to be received.",
		returns:"None",
		params:
		[
			{
				name:"label",
				description:"the label that identifies the connection through which the message is sent",
				optional:false
			},
			{
				name:"myFunction",
				description:"myFunction (sender, label, error, message); the function is called once a message is received",
				optional:false
			}
		]
	}
];

var functionsDoc = {
	arduino:libwyliodrin.concat ([
	]),
	visual:[],
	python: libwyliodrin.concat ([
		{
			name:"GPIO.setmode",
			description:"Specifies the IO pins numbering.",
			returns:"None",
			params:[
				{
					name:"numbering",
					description:"BOARD,BCM",
					optional:false
				}
			]
		},
		{
			name:"GPIO.setup",
			description:"Configures the specified channel either as an input or an output.",
			returns:"None",
			params:[
				{
					name:"channel(s)",
					description:"the channel number based on the specified numbering system, or a list of channels",
					optional:false
				},
				{
					name:"mode",
					description:"IN,OUT",
					optional:false
				},
				{
					name:"initial",
					description:"the initial value for the channel; work only for output channel",
					optional:true,
					defaultValue:"HIGH"
				}
			]
		},
		{
			name:"GPIO.input",
			description:"Reads the value of a GPIO pin.",
			returns:"LOW,HIGH",
			params:[
				{
					name:"channel",
					description:"the channel number based on the numbering system",
					optional:false
				}
			]
		},
		{
			name:"GPIO.output",
			description:"Sets the output state of a GPIO pin.",
			returns:"None",
			params:[
				{
					name:"channel",
					description:"the channel number based on the numbering system",
					optional:false
				},
				{
					name:"state",
					description:"LOW,HIGH, or a list of states",
					optional:false
				}
			]
		},
		{
			name:"GPIO.cleanup",
			description:"Cleans up the used resources.",
			returns:"None",
			params:[
				{
					name:"channel(s)",
					description:"the channel or a list of channels to be cleaned up",
					optional:true
				}
			]
		},
		{
			name:"GPIO.PWM",
			description:"Creates a PWM instance.",
			returns:"PWM instance",
			params:[
				{
					name:"channel",
					description:"the channel number based on the numbering system",
					optional:false
				},
				{
					name:"frequency",
					description:"the frequency of the PWM",
					optional:false
				}
			]
		},
		{
			name:"GPIO.start",
			description:"Starts PWM pin.",
			returns:"None",
			params:[
				{
					name:"dc",
					description:"duty cycle, long between 0.0 and 100.0",
					optional:false
				}
			]
		},
		{
			name:"GPIO.ChangeFrequency",
			description:"Changes PWM frequency.",
			returns:"None",
			params:[
				{
					name:"frequency",
					description:"the new frequency in Hz",
					optional:false
				}
			]
		},
		{
			name:"GPIO.ChangeDutyCycle",
			description:"Changes PWM duty cycle.",
			returns:"None",
			params:[
				{
					name:"dc",
					description:"duty cycle, long between 0.0 and 100.0",
					optional:false
				}
			]
		},
		{
			name:"GPIO.stop",
			description:"Stops PWM.",
			params: [],
			returns:"None"
		},
		{
			name:"abs",
			description:"Return the absolute value of a number.",
			returns:"Absolute value",
			params:[
				{
					name:"x",
					description:"a plain or long integer or a floating point number; if the argument is a complex number, its magnitude is returned",
					optional:false
				}
			]
		},
		{
			name:"cmp",
			description:"Compare the two objects x and y and return an integer according to the outcome. The return value is negative if x < y, zero if x == y and strictly positive if x > y.",
			returns:"negative if x < y, zero if x == y and strictly positive if x > y",
			params:[
				{
					name:"x",
					description:"object to be compared",
					optional:false
				},
				{
					name:"y",
					description:"object to be compared",
					optional:false
				}
			]
		},
		{
			name:"len",
			description:"Returns the length (the number of items) of an object.",
			returns:"integer",
			params:[
				{
					name:"s",
					description:"a sequence (such as a string, bytes, tuple, list, or range) or a collection (such as a dictionary, set, or frozen set)",
					optional:false
				}
			]
		},
		{
			name:"print",
			description:"Print objects to the stream file.",
			returns:"None",
			params:[
				{
					name:"objects",
					description:"objects to be printed",
					optional:false
				},
				{
					name:"sep",
					description:"objects separator",
					optional:true,
					defaultValue:"/' /'"
				},
				{
					name:"end",
					description:"final sequence to be printed",
					optional:true,
					defaultValue:"/'\n/'"
				},
				{
					name:"file",
					description:"an object with a write(string) method",
					optional:true,
					defaultValue:"sys.stdout"
				}
			]
		}
	]),
	nodejs: libwyliodrin.concat([
	]),
	shell: [],
	csharp: []

};


module.exports = functionsDoc;
