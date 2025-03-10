import { lstatSync, createReadStream } from "node:fs";
import { basename } from "node:path";
import { stdout, stderr } from "node:process";
import { WritableStreamBuffer } from "stream-buffers";
import yargs from "yargs";
import { hideBin } from "yargs/helpers"; 

import { indexCommandArgs, cdxIndexCommandArgs } from "./args";
import { Indexer, CDXIndexer, StreamResults } from "../lib";

import * as pkg from "../../package.json";

const BUFF_SIZE = 1024 * 128;

// ===========================================================================
export function main(
  out: WritableStreamBuffer | NodeJS.WriteStream = stdout,
  args?: string[]
) {
  let promise = Promise.resolve();

  args = args || hideBin(process.argv);

  yargs()
    .version(pkg.version)
    .usage("$0 [command]")
    // Basic Indexer
    .command({
      command: "index <filenames..>",
      describe: "Index WARC(s)",
      builder: indexCommandArgs,
      handler: async (args) => {
        promise = new Indexer(args).writeAll(loadStreams(args.filenames), out);
      },
    })
    // CDX Indexer
    .command({
      command: "cdx-index <filenames..>",
      describe: "CDX(J) Index of WARC(s)",
      builder: cdxIndexCommandArgs,
      handler: async (args) => {
        promise = new CDXIndexer(args).writeAll(loadStreams(args.filenames), out);
      },
    })
    .demandCommand(1, "Please specify a command")
    .strictCommands()
    .help()
    .parseAsync(args);

  return promise;
}

function loadStreams(filenames: string[]) {
  return filenames.reduce<StreamResults>((accumulator, filename) => {
    if (!lstatSync(filename).isFile()) {
      stderr.write(`Skipping ${filename}, not a file\n`);
      return accumulator;
    }

    const reader = createReadStream(filename, { highWaterMark: BUFF_SIZE });
    filename = basename(filename);
    accumulator.push({ filename, reader });
    return accumulator;
  }, []);
}
