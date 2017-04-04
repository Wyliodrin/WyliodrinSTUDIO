#!/bin/bash
# exit 0 ~ OK
# exit 1 ~ npm is not installed
# exit 2 ~ grunt is not installed
# exit 3 ~ grunt failed

if [ "$TRAVIS" != "true" ] ; then
    if which yarn > /dev/null ; then
        yarn
    else
    	if !(which npm > /dev/null) ; then
    		echo "$(tput setaf 1)Npm is not installed."
    		exit 1
    	fi
        npm install
    fi
fi

if !(which grunt > /dev/null) ; then
    char='0'
    while [ $char != 'N' ] &&
          [ $char != 'n' ] &&
          [ $char != 'Y' ] &&
          [ $char != 'y' ]  ; do
	echo "$(tput setaf 4)Grunt is not installed. Do you want to install it? [Y]/[N]"
    read char
    done

    if [ $char == 'Y' ] || [ $char == 'y' ]; then
         sudo npm install -g grunt-cli
    elif [ $char == 'N' ] || [ $char == 'n' ]; then
		echo "$(tput setaf 1)Can't build: grunt is not installed."
        exit 2
    fi
fi

patch node_modules/highcharts-ng/dist/highcharts-ng.js patches/highcharts-ng.patch
patch node_modules/angular-tree-control/css/tree-control-attribute.css patches/tree-control-attribute.patch
patch node_modules/marked/lib/marked.js patches/marked.patch
patch node_modules/angular-ui-ace/src/ui-ace.js patches/angular-ui-ace.patch

grunt

if [ $? -ne 0 ] ; then
	echo "$(tput setaf 1)Grunt failed."
	exit 3
fi

echo "$(tput setaf 2)Build succeeded."
exit 0
