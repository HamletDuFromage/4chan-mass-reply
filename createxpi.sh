#!/bin/bash
rm *.xpi
zip -r temp.zip popup/ icons/ content_scripts/ manifest.json
mv temp.zip 4chan_Mass_Quotes.xpi
