declare namespace base32Encode {
  interface Options {
    /** If set, forcefully enable or disable padding. The default behavior is to follow the default of the selected variant. */
    padding?: boolean
  }
}

/**
 * Encode the data in `data` into a Base32 encoded string.
 *
 * #### Variants
 *
 * - `'RFC3548'` - Alias for `'RFC4648'`
 * - `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)
 *
 * @param data
 * @param variant
 * @param options
 */
export default function base32Encode(data: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray, variant: 'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford', options?: base32Encode.Options): string
