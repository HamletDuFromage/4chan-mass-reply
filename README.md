# 4chan Mass Reply browser extension
<img alt="total downloads" src="https://img.shields.io/github/downloads/HamletDuFromage/4chan-mass-quote/total">

Inspired by /tv/'s posting culture, this browser extension aims to facilitate the creation of mass replies on 4chan.org and 4channel.org.

## Features:

- Anonymize image uploads by randomizing hash and filename
- Bypass ban evasion detection by stripping the cookies and modifying useragent
- Bypass common wordfilters by replacing one of the characters with a similar looking one (homoglyph)
- Automatically slide captcha it into the right position
- Reattach the last selected file
- Configurable mass reply with multiple targets
- Built-in copypastas

![popup](screenshots/popup.png)

## Usage
Use the buttons in the reply box for (left to right):
- Clear comment field
- Paste clipboard into the comment field
- Append "sneed"
- Convert quotelinks into soyquotes (for example: `>>1234456` in the comment field will be replaced with the quoted content of that post without a link to it)
- Convert quotelinks into filename quotes
- Reply to every post on the page
- Reply to posts with repeating digits in the post number
- Reply to 1-post-by-this-ID
- Reply to /pol/ memeflag posts
- Rank IDs by their post count
- Quote knowyourmeme.com filenames

![replybox](screenshots/replybox.png)


## Permissions:
- Clipboard to copy copypastas and the paste clipboard button
- Storage to save the settings between each use
- Access to 4chan and 4channel

## Install
### Firefox
- https://github.com/HamletDuFromage/4chan-mass-reply/releases/latest/download/4chan_mass_reply.xpi

### MS Edge
- https://microsoftedge.microsoft.com/addons/detail/4chan-mass-reply/objbncahkeohdginhdcifhfchmhpoggg

### Chrome/Chromium/Brave
- Download the ZIP archive from the release section and sideload it.

### Android
- With [Kiwi Browser](https://kiwibrowser.com/), download the zip archive and install the extension via ( ⋮ ) -> Extensions.
- With [SmartCookieWeb Preview](https://github.com/CookieJarApps/SmartCookieWeb-Preview/releases/latest), a Firefox fork, go to `about:config`, set `xpinstall.signatures.required` to `false` and sideload the addon in the settings (Advanced settings > Sideload XPI).

## How to build
```
$ npm install --save-dev
$ npm run build
```
The resulting extension will be in `dist/`.

### Buy me a coffee?
https://ko-fi.com/hamletdufromage
