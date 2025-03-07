import { WindowHeaders } from "./WindowHeaders";
import { iterateHeaders, iterateHeadersKeys } from "./iterateHeaders";

// Declare that there is a global property named "Headers" - this might not be present at runtime
declare const Headers: any;

/** @internal */
export function normalizeName(name: any): string {
  if (typeof name !== "string") {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
    throw new TypeError("Invalid character in header field name")
  }
  return name.toLowerCase()
}

/** @internal */
export function normalizeValue(value: any): string {
  if (typeof value !== "string") {
    value = String(value)
  }
  return value
}

// getHeadersValues abstracts the difference between get() and getAll() between browsers and always returns an array
/** @internal */
export function getHeaderValues(headersAsNative: Headers, key: string): string[] {
  const headers =  toWindowHeaders(headersAsNative);
  if (headers instanceof Headers && headers.getAll) {
    // If the headers instance has a getAll function then it will return an array
    return headers.getAll(key);
  }

  // There is no getAll() function so get *should* return an array
  const getValue = headers.get(key);
  if (getValue && typeof getValue === "string") {
    // some .get() implementations return a string even though they don't have a .getAll() - notably Microsoft Edge
    return [getValue];
  }
  return getValue;
}

// toWindowHeaders casts the native browser class to an interface that includes functions of different browser implementations
function toWindowHeaders(headersAsNative: Headers): WindowHeaders {
  return headersAsNative as any as WindowHeaders;
}

// getHeaderKeys returns an array of keys in a headers instance
/** @internal */
export function getHeaderKeys(headersAsNative: Headers): string[] {
  const headers =  toWindowHeaders(headersAsNative);
  const asMap: {[key: string]: boolean} = {};
  const keys: string[] = [];

  if (headers.keys) {
    iterateHeadersKeys(headers, key => {
      if (!asMap[key]) {
        // Only add the key if it hasn't been added already
        asMap[key] = true;
        keys.push(key);
      }
    });
  } else if (headers.forEach) {
    headers.forEach((_, key) => {
      if (!asMap[key]) {
        // Only add the key if it hasn't been added already
        asMap[key] = true;
        keys.push(key);
      }
    });
  } else {
    // If keys() and forEach() aren't available then fallback to iterating through headers
    iterateHeaders(headers, (entry: string[]) => {
      const key = entry[0];
      if (!asMap[key]) {
        // Only add the key if it hasn't been added already
        asMap[key] = true;
        keys.push(key);
      }
    });
  }
  return keys;
}

/** @internal */
export function splitHeaderValue(str: string) {
  const values: string[] = [];
  const commaSpaceValues = str.split(", ");
  commaSpaceValues.forEach(commaSpaceValue => {
    commaSpaceValue.split(",").forEach(commaValue => {
      values.push(commaValue);
    });
  });
  return values;
}
