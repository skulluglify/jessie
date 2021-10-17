#! /usr/bin/env bash

PORT=$1
DIRECTORY="jessie-demo"

if [ -z "$PORT" ]; then
    PORT=4747
fi

# python -m http.server --directory=`pwd` $PORT &>/dev/null &
# sleep .2

if [ -d /tmp/$DIRECTORY ]; then
    rm -rf /tmp/$DIRECTORY
fi

mkdir -p /tmp/$DIRECTORY/userdata
touch /tmp/$DIRECTORY/userdata/"First Run"

for pid in `ps -C chrome,google-chrome,google-chrome-stable -o pid,args --no-headers | grep -i "$DIRECTORY" | awk '{print $1}'`; do echo
    kill -9 $pid
done

if [ -z $(echo $WEBVIEW_CONFIG_CALL) ]; then
    google-chrome --user-data-dir=/tmp/$DIRECTORY/userdata --new-window --app=http://127.0.0.1:$PORT/index.html?name=jessie&type=javascript &>/dev/null
    export WEBVIEW_CONFIG_CALL=1
fi
