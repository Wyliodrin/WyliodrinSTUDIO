#!/bin/bash
patch node_modules/highcharts-ng/dist/highcharts-ng.js patches/highcharts-ng.patch
patch node_modules/angular-tree-control/css/tree-control-attribute.css patches/tree-control-attribute.patch
patch node_modules/marked/lib/marked.js patches/marked.patch
patch node_modules/angular-ui-ace/src/ui-ace.js patches/angular-ui-ace.patch

echo "Done!"
