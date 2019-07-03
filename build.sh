#!/bin/bash
# exit 0 ~ OK
# exit 1 ~ npm is not installed
# exit 2 ~ grunt is not installed
# exit 3 ~ grunt failed

if !(hash npm 2> /dev/null) ; then
    echo -e "$(tput setaf 1)Npm is not installed.\033[0m"
    exit 1
fi

if !(hash grunt 2> /dev/null) ; then
    char='0'
    while [ $char != 'N' ] &&
          [ $char != 'n' ] &&
          [ $char != 'Y' ] &&
          [ $char != 'y' ]  ; do
	    echo -en "$(tput setaf 4)Grunt is not installed. Do you want to install it? [Y]/[N]: "
      read char
    done

    echo -e "\033[0m"

    if [ $char == 'Y' ] || [ $char == 'y' ]; then
        # Install grunt-cli globally using npm or yarn
        if ! hash yarn 2>/dev/null; then
            sudo npm install -g grunt-cli
        else
            # You don't need sudo for yarn,
            # it will be installed in ~
            yarn global add grunt-cli
        fi
    elif [ $char == 'N' ] || [ $char == 'n' ]; then
		echo -e "$(tput setaf 1)Can't build: grunt is not installed.\033[0m"
        exit 2
    fi
fi

# Install dependencies using npm or yarn
if ! hash yarn 2>/dev/null; then
    npm install
else
    yarn
fi

patch node_modules/highcharts-ng/dist/highcharts-ng.js patches/highcharts-ng.patch
patch node_modules/angular-tree-control/css/tree-control-attribute.css patches/tree-control-attribute.patch
patch node_modules/8fold-marked/lib/marked.js patches/marked.patch
patch node_modules/angular-ui-ace/src/ui-ace.js patches/angular-ui-ace.patch

grunt

if [ $? -ne 0 ] ; then
	echo -e "$(tput setaf 1)Grunt failed.\033[0m"
	exit 3
fi

echo -e "$(tput setaf 2)Build succeeded.\033[0m"
exit 0
