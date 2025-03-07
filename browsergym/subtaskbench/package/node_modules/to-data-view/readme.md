# To DataView

Create a `DataView` over an `ArrayBuffer`/8-bit typed array (commonly used in the browsers) or a `Buffer` (commonly used in Node.js).

Supported inputs:

- [`ArrayBuffer`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [`Buffer`](https://nodejs.org/docs/latest/api/buffer.html#buffer_class_buffer)
- [`Int8Array`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
- [`Uint8Array`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [`Uint8ClampedArray`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)

## Installation

```sh
npm install --save to-data-view
```

## Usage

```js
import toDataView from 'to-data-view'

// This function will accept both `ArrayBuffer` and `Buffer` as input
function awesomeParser (source) {
  const view = toDataView(source)

  // ...
}
```

## API

### `toDataView(data)`

- `data` (`ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray`, required)
- returns `DataView`

Return a `DataView` instance that uses the same memory as the provided `ArrayBuffer`, 8-bit typed array or `Buffer`.
