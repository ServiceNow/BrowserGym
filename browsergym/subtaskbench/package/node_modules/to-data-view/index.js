export default function toDataView (data) {
  if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength)
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data)
  }

  throw new TypeError('Expected `data` to be an ArrayBuffer, Buffer, Int8Array, Uint8Array or Uint8ClampedArray')
}
