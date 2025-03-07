import { WindowHeaders } from "./WindowHeaders";

export function iterateHeaders(headers: WindowHeaders, callback: (entry: string[]) => void): void {
  const iterator = (headers as any)[Symbol.iterator]();
  let entry = iterator.next();
  while (!entry.done) {
    callback(entry.value[0]);
    entry = iterator.next();
  }
}

export function iterateHeadersKeys(headers: WindowHeaders, callback: (key: string) => void): void {
  const iterator = headers.keys();
  let entry = iterator.next();
  while (!entry.done) {
    callback(entry.value);
    entry = iterator.next();
  }
}
