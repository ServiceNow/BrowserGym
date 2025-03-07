// adapted from https://github.com/celeranis/node-current-types/blob/master/webstreams.d.ts

import * as WebStreams from "node:stream/web";

declare module "stream/web" {
  // https://wicg.github.io/compression/
  // https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream/CompressionStream
  // https://chromium.googlesource.com/devtools/devtools-frontend/+/581bfa00fd962837c51e2284dc78303446088c67/test/unittests/front_end/models/bindings/FileUtils_test.ts
  export interface CompressionStream extends GenericTransformStream {
    readonly format: "gzip" | "deflate" | "deflate-raw";
  }
  declare const CompressionStream: {
    prototype: CompressionStream;
    new (format: "gzip" | "deflate" | "deflate-raw"): CompressionStream;
  };
}

declare global {
  // eslint-disable-next-line no-var
  export var CompressionStream: typeof WebStreams.CompressionStream;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface CompressionStream extends WebStreams.CompressionStream {}
}
