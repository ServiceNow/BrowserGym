/** Return a `DataView` instance that uses the same memory as the provided `ArrayBuffer`, 8-bit typed array or `Buffer`. */
export default function toDataView (data: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray): DataView
