export function debugLog(...args) {
  const prefix = '[4chan Mass Reply]';
  console.debug(prefix, ...args);
}

export function getNumberWithOrdinal(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

export function getRandomDate() {
  const curtime = new Date().getTime();
  const randomTimePastYear = curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
  return new Date(randomTimePastYear);
}

export function getRandomString(length, lowercase = true, uppercase = true, digits = true) {
  let result = '';
  let alphabet = '';
  if (lowercase) {
    alphabet += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (uppercase) {
    alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (digits) {
    alphabet += '0123456789';
  }
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
