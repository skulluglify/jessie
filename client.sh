#!/usr/bin/env bash

BIND=$1
PORT=$2

if [ -z "$BIND" ]; then
    BIND=127.0.0.1
fi

if [ -z "$PORT" ]; then
    PORT=4747
fi


if [ -z $(echo $CHROME_WAS_CALL) ]; then
  bash webview.sh $BIND $PORT &>/dev/null
  export CHROME_WAS_CALL=1
else
  rm -rf /tmp/jessie-demo/userdata/*
fi
