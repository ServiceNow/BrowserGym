// Declare the class that *might* be present in the browser
export declare interface WindowHeaders {
  get(key: string): string[]; // in some browsers .get returns a single string
  getAll(key: string): string[]; // some browsers don't have a .getAll
  has(key: string): boolean;
  delete(key: string): void;
  keys(): any;
  entries(): any;
  forEach(callback: (value: string, key: string) => void): any;
  append(key: string, value: string): void;
  set(key: string, value: string): void;
}