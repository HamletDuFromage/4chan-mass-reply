#!/bin/bash
rm -r dist/
zip -r source.zip src/ README.md LICENSE package.json package-lock.json webpack.config.js
npm run build
pushd dist
rm 4chan-mass-reply-unpacked.zip
zip -r 4chan-mass-reply-unpacked.zip ./*
popd
