#!/usr/bin/env bash

if [ ! -d node_modules ]; then
  env \
  ADBLOCK=true \
  DISABLE_OPENCOLLECTIVE=true \
  npm install --loglevel silent
fi

if [ ! -d declare/ ]; then

  mkdir declare/
fi

if [ -n "$(ls declare/)" ]; then

  rm -rf declare/*

fi

if [ ! -d dist/ ]; then

  mkdir dist/
fi

cp -r index.html dist/

if [ -n "$(ls dist/)" ]; then

  rm -rf dist/*

fi

npm run build
