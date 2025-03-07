# Base32 Encode

Base32 encoder with support for multiple variants.

## Installation

```sh
npm install --save base32-encode
```

## Usage

```js
import base32Encode from 'base32-encode'
const data = new Uint8Array([0x74, 0x65, 0x73, 0x74])

console.log(base32Encode(data, 'Crockford'))
//=> EHJQ6X0

console.log(base32Encode(data, 'RFC4648'))
//=> ORSXG5A=

console.log(base32Encode(data, 'RFC4648', { padding: false }))
//=> ORSXG5A

console.log(base32Encode(data, 'RFC4648-HEX'))
//=> EHIN6T0=
```

## API

### `base32Encode(data, variant[, options])`

- `data` (`ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray`, required)
- `variant` (`'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford'`, required)
- `options` (`object`, optional)
  - `padding` (`boolean`, optional) - If set, forcefully enable or disable padding. The default behavior is to follow the default of the selected variant.
- returns `string`

Encode the data in `data` into a Base32 encoded string.

#### Variants

- `'RFC3548'` - Alias for `'RFC4648'`
- `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
- `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
- `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)

## See also

- [base32-decode](https://github.com/LinusU/base32-decode) - Base32 decoder
