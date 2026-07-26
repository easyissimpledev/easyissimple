/**
 * EasyIsSimple - Client-Side Text to Base64 (and vice-versa) Encoder
 * 
 * Demonstrates how UTF-8 text is encoded and decoded to/from Base64
 * locally inside the browser.
 */

// Encode UTF-8 text to a Base64 string locally
function encodeTextToBase64(text) {
  const utf8Bytes = new TextEncoder().encode(text);
  let binaryString = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryString += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binaryString);
}

// Decode a Base64 string back into UTF-8 text locally
function decodeBase64ToText(base64String) {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}
