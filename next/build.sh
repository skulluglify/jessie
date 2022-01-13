#!/usr/bin/env bash

if [ ! -d node_modules ]; then
  env \
  ADBLOCK=true \
  DISABLE_OPENCOLLECTIVE=true \
  npm install --loglevel silent
fi

if [ -n "$(ls declare)" ]; then

  rm -rf declare/*

fi

if [ -n "$(ls dist)" ]; then

  rm -rf dist/*

fi

npm run build