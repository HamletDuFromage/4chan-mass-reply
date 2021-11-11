# 4chan Mass Reply browser extension
<img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/HamletDuFromage/4chan-mass-quote/total">

Inspired by /tv/'s posting culture, this browser extension aims to facilitate the creation of mass replies on 4chan.org and 4channel.org, and also reply to dubs.

## Usage
Click on the toolbar icon when in a thread, and select one of four options.

- "Quote" quotes all the replies in the thread.
- "Sneed" adds "sneed" at the end.
- "Check 'em" only quotes post with repeating digits.
- "KnowYourMeme" quotes knowyourmeme.com filenames.
- "Copy To Clipboard" is self explanatory.

## Additional features
- Anonymize image uploads by changing hash and randomizing filename (toggleable).
- Strip cookies from post uploads (toggleable).
- Delete cookies through a context menu item.
- Highlights knowyourmeme filenames.

## Screenshots
![screenshot](https://user-images.githubusercontent.com/61667930/140670643-ab781714-92ed-4840-8256-c0fe3bd9de3c.png)

## Permissions:
- Clipboard to copy copypastas into the clipboard and for the button to paste the clipboard into the comment
- Storage to save the parameter between each use 
- Access to 4chan and 4channel to be able to delete cookies

## Install
### Firefox
- https://github.com/HamletDuFromage/4chan-mass-reply/releases/download/latest/4chan_mass_reply.xpi

### MS Edge
- https://microsoftedge.microsoft.com/addons/detail/4chan-mass-reply/objbncahkeohdginhdcifhfchmhpoggg

### Chrome/Chromium/Brave
The extension has been ported to Chromium based browser. Download the zip file in the release and sideload it. 

## How to build
```
$ npm install --save-dev
$ npm npm run build
```
The resulting extension will be in `dist/`.

### Buy me a coffee?
https://ko-fi.com/hamletdufromage
