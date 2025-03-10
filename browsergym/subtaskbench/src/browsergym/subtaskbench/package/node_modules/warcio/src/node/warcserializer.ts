import fs, { WriteStream } from "node:fs";
import { unlink } from "node:fs/promises";

import { temporaryFile } from "tempy";

import { WARCRecord } from "../lib/warcrecord";
import * as warcserializer from "../lib/warcserializer";

// default size to buffer in memory 2MB
export const DEFAULT_MEM_SIZE = 1024 * 1024 * 2;


// ===========================================================================
export type WARCSerializerOpts = warcserializer.WARCSerializerOpts & {
  maxMemSize?: number;
};

// ===========================================================================
export class WARCSerializer extends warcserializer.WARCSerializer {
  static override async serialize(record: WARCRecord, opts?: WARCSerializerOpts) {
    const s = new WARCSerializer(record, opts);
    return await s.readFully();
  }

  constructor(record: WARCRecord, opts : WARCSerializerOpts = {}) {
    super(record, opts, new TempFileBuffer(opts.maxMemSize || DEFAULT_MEM_SIZE));
  }
}

// ===========================================================================
export class TempFileBuffer extends warcserializer.SerializerInMemBuffer
{
  memSize: number;
  currSize = 0;
  fh: WriteStream | null = null;
  filename = "";

  constructor(memSize = DEFAULT_MEM_SIZE) {
    super();
    this.memSize = memSize;
  }

  override write(chunk: Uint8Array): void {
    if ((this.currSize + chunk.length) <= this.memSize) {
      this.buffers.push(chunk);
    } else {
      if (!this.fh) {
        this.filename = temporaryFile();
        this.fh = fs.createWriteStream(this.filename);
      }
      this.fh.write(chunk);
    }
    this.currSize += chunk.length;
  }

  override async* readAll(): AsyncIterable<Uint8Array> {
    for (const buff of this.buffers) {
      yield buff;
    }

    if (!this.fh) {
      return;
    }

    await streamFinish(this.fh);
    this.fh = null;

    const reader = fs.createReadStream(this.filename);
    for await (const buff of reader) {
      yield buff;
    }

    await unlink(this.filename);
  }
}

export function streamFinish(fh: WriteStream) {
  const p = new Promise<void>(resolve => {
    fh.once("finish", () => resolve());
  });
  fh.end();
  return p;
}
