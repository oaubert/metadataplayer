#!/bin/sh
./compil.sh
java -jar ../res/jsdoc/jsrun.jar ../res/jsdoc/app/run.js -a -t=../res/jsdoc/templates/jsdoc/ ../../build/LdtPlayer-release.js -d=../../doc/jsdoc/