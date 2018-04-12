#!/bin/sh
if [ ! -f "pid" ]
then
    node ./lib/bin/index.js ./conf/config.json &
    echo $! > pid
fi