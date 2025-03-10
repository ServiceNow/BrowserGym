declare function index(): string;

declare namespace index {
  let BUFFER_SIZE: number;

  function bin(): Uint8Array;
  function test(uuid: string): boolean;
}

export = index;