# 4chan Mass Reply browser extension
<img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/HamletDuFromage/4chan-mass-quote/total">

Inspired by /tv/'s posting culture, this browser extension aims to facilitate the creation of mass replies on 4chan.org and 4channel.org, and also reply to dubs.

## Usage
Use the buttons in the reply box for (left to right):

![replybox](screenshots/replybox.png)

- Clear comment box
- Paste clipboard into comment box
- Mass Quote all the replies in the thread.
- Add "SNEED" at the end.
- Quote posts with repeating digits.
- Quote posts with memeflags (on /pol/)
- Quote posts from 1-post-by-this-ID users (all boards with IDs)
- Print rank of users by post amount (all boars with IDs)
- Quote knowyourmeme.com filenames.
- Convert quotelinks into soyquotes (in example: `>>1234456` in the comment field will be replaced with the quoted content of that post without a link to it)

Click on the toolbar icon to change settings or to copy a copypasta into the clipboard.

![popup](screenshots/popup.png)

Available features:

* Evasion 
  - Anonymize image uploads by changing hash and randomizing filename (toggleable).
  - Strip cookies from post uploads (toggleable).
  - Evade soy wordfilters by replacing it with a different but equally readable text.
  - Auto-select the last used file
* Mass Quote settings
  - Format of the mass-quote (one quote per line, multiple, etc.)
  - If thread is too large, which quotes to skip
* Copypastas
  - Check out copypastas and copy them into the clipboard

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
