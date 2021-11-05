#!/bin/bash
rm -r dist/
zip -r source.zip src/ README.md LICENSE package.json package-lock.json webpack.config.js
npm run build
pushd dist
zip -r extension.zip ./* -x extension.zip
popd
