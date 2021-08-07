#!/bin/bash
rm *.xpi *.zip
zip -r extension.zip popup/ icons/ content_scripts/ manifest.json
