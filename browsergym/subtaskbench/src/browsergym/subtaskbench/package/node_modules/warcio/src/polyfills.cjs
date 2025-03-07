// nodejs polyfills
if (typeof process !== "undefined" && typeof global === "object") {
  // fetch polyfill
  if (!globalThis.fetch) {
    // use cross-fetch https://stackoverflow.com/a/58506717
    require("cross-fetch/polyfill");
  }

  // crypto polyfill
  if (!globalThis.crypto) {
    globalThis.crypto = require("crypto").webcrypto;
  }
  // web streams polyfill
  if (!globalThis.ReadableStream) {
    const webstreams = require("stream/web");
    for (const prop in webstreams) {
      globalThis[prop] = webstreams[prop];
    }
  }
}
