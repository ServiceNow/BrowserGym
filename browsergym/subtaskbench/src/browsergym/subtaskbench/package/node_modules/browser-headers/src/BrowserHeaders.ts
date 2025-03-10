import { normalizeName, normalizeValue, getHeaderValues, getHeaderKeys, splitHeaderValue } from "./util";

export interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value?: V): this;
  readonly size: number;
}

interface MapConstructor {
  new (): Map<any, any>;
  new <K, V>(entries?: [K, V][]): Map<K, V>;
  readonly prototype: Map<any, any>;
}

declare const Map: MapConstructor;

// Declare that there is a global property named "Headers" - this might not be present at runtime
declare const Headers: any;

// isBrowserHeaders is used to check if an argument is an instance of BrowserHeaders from another
// version of the dependency.
function isBrowserHeaders(arg: any): arg is BrowserHeaders {
  return typeof arg === "object" && typeof arg.headersMap === "object" && typeof arg.forEach === "function"
}

// BrowserHeaders is a wrapper class for Headers
export class BrowserHeaders {
  headersMap: {[key: string]: string[]};

  constructor(init: BrowserHeaders.ConstructorArg = {}, options: {splitValues: boolean} = { splitValues: false } ) {
    this.headersMap = {};

    if (init) {
      if (typeof Headers !== "undefined" && init instanceof Headers) {
        const keys = getHeaderKeys(init as Headers);
        keys.forEach(key => {
          const values = getHeaderValues(init as Headers, key);
          values.forEach(value => {
            if (options.splitValues) {
              this.append(key, splitHeaderValue(value));
            } else {
              this.append(key, value);
            }
          });
        });
      } else if (isBrowserHeaders(init)) {
        init.forEach((key, values) => {
          this.append(key, values)
        });
      } else if (typeof Map !== "undefined" && init instanceof Map) {
        const asMap = init as BrowserHeaders.HeaderMap;
        asMap.forEach((value: string|string[], key: string) => {
          this.append(key, value);
        });
      } else if (typeof init === "string") {
        this.appendFromString(init);
      } else if (typeof init === "object") {
        Object.getOwnPropertyNames(init).forEach(key => {
          const asObject = init as BrowserHeaders.HeaderObject;
          const values = asObject[key];
          if (Array.isArray(values)) {
            values.forEach(value => {
              this.append(key, value);
            });
          } else {
            this.append(key, values);
          }
        });
      }
    }
  }

  appendFromString(str: string): void {
    const pairs = str.split("\r\n");
    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      const index = p.indexOf(":");
      if (index > 0) {
        const key = p.substring(0, index).trim();
        const value = p.substring(index + 1).trim();
        this.append(key, value);
      }
    }
  }

  // delete either the key (all values) or a specific value for a key
  delete(key: string, value?: string): void {
    const normalizedKey = normalizeName(key);
    if (value === undefined) {
      delete this.headersMap[normalizedKey];
    } else {
      const existing = this.headersMap[normalizedKey];
      if (existing) {
        const index = existing.indexOf(value);
        if (index >= 0) {
          existing.splice(index, 1);
        }
        if (existing.length === 0) {
          // The last value was removed - remove the key
          delete this.headersMap[normalizedKey];
        }
      }
    }
  }

  append(key: string, value: string | string[]): void {
    const normalizedKey = normalizeName(key);
    if (!Array.isArray(this.headersMap[normalizedKey])) {
      this.headersMap[normalizedKey] = [];
    }
    if (Array.isArray(value)) {
      value.forEach(arrayValue => {
        this.headersMap[normalizedKey].push(normalizeValue(arrayValue));
      });
    } else {
      this.headersMap[normalizedKey].push(normalizeValue(value));
    }
  }

  // set overrides all existing values for a key
  set(key: string, value: string | string[]): void {
    const normalizedKey = normalizeName(key);
    if (Array.isArray(value)) {
      const normalized: string[] = [];
      value.forEach(arrayValue => {
        normalized.push(normalizeValue(arrayValue));
      });
      this.headersMap[normalizedKey] = normalized;
    } else {
      this.headersMap[normalizedKey] = [normalizeValue(value)];
    }
  }

  has(key: string, value?: string): boolean {
    const keyArray = this.headersMap[normalizeName(key)];
    const keyExists = Array.isArray(keyArray);
    if (!keyExists) {
      return false;
    }
    if (value !== undefined) {
      const normalizedValue = normalizeValue(value);
      return keyArray.indexOf(normalizedValue) >= 0;
    } else {
      return true;
    }
  }

  get(key: string): string[] {
    const values = this.headersMap[normalizeName(key)];
    if (values !== undefined) {
      return values.concat();
    }
    return [];
  }

  // forEach iterates through the keys and calls the callback with the key and *all* of it's values as an array
  forEach(callback: (key: string, values: string[]) => void): void {
    Object.getOwnPropertyNames(this.headersMap)
      .forEach(key => {
        callback(key, this.headersMap[key]);
      }, this);
  }

  toHeaders(): Headers {
    if (typeof Headers !== "undefined") {
      const headers = new Headers();
      this.forEach((key, values) => {
        values.forEach(value => {
          headers.append(key, value);
        });
      });
      return headers;
    } else {
      throw new Error("Headers class is not defined");
    }
  }
}

export namespace BrowserHeaders {
  export type HeaderObject = {[key: string]: string|string[]};
  export type HeaderMap = Map<string, string|string[]>;
  export type ConstructorArg = HeaderObject | HeaderMap | BrowserHeaders | Headers | string;
}
