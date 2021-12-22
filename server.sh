#!/usr/bin/env bash
# ifconfig | grep -i "inet " | awk '{printf("%s %s\n",$1,$2)}'
PORT=$(ifconfig | grep -i "inet " | head -n 1 | awk '{print $2}')
python -m http.server --directory=static --bind $PORT 4747 &>/dev/null &
echo $PORT
