export function debugLog(...args) {
  const prefix = '[4chan Mass Reply]';
  console.debug(prefix, ...args);
}

export function getRandomString(length, lowercase = true, uppercase = true, digits = true) {
  let result = '';
  let alphabet = '';
  if (lowercase) alphabet += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (digits) alphabet += '0123456789';
  for (let i = 0; i < length; ++i) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

export function getRandomHexString(length) {
  let result = '';
  const alphabet = '0123456789abcdef';
  for (let i = 0; i < length; ++i) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

export function isKYMfilename(filename) {
  // at least 1 digit and 1 letter
  const kymRegex = /^(?=[a-f]*[0-9])(?=[0-9]*[a-f])[a-f0-9]{3}\.[a-zA-Z]+$/;
  return kymRegex.test(filename);
}

export const is4chanX = (!!document.querySelector("html[class~='fourchan-x'"));

export function getFilenameElements(element) {
  const selector = (is4chanX
    ? "div[class~='fileText'] > span[class~='file-info'] > a"
    : "div[class~='fileText'] > a");

  return element.querySelectorAll(selector);
}
