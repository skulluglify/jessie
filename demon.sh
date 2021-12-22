#! /usr/bin/env bash

RELOAD=0

mkdir -p .shasums

while true; do

    for f in `find . -type f | grep -Ei "\.(html?|m?jsx?|css|component|jessie)$"`; do
        SHA16=$(shasum "$f" | awk '{print $1}')
        if [ -f .shasums/"$f".shasum ]; then
            SHA16f=$(cat .shasums/"$f".shasum)
            SAMEFILE=$(echo $SHA16 | grep -E "^$SHA16f\$")
            if [ -z "$SAMEFILE" ]; then RELOAD=1; fi
        fi
        mkdir -p .shasums/"$(dirname $f)"
        cat<<<$SHA16>.shasums/"$f".shasum
    done

    if [ $RELOAD -eq 1 ]; then
        echo "detect files have been changed, restart current webview"
        source ./client.sh 192.168.1.9
        RELOAD=0
    fi

    sleep .2

done
