import toDataView from 'to-data-view'

const RFC4648 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const RFC4648_HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV'
const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export default function base32Encode (data, variant, options) {
  options = options || {}
  let alphabet, defaultPadding

  switch (variant) {
    case 'RFC3548':
    case 'RFC4648':
      alphabet = RFC4648
      defaultPadding = true
      break
    case 'RFC4648-HEX':
      alphabet = RFC4648_HEX
      defaultPadding = true
      break
    case 'Crockford':
      alphabet = CROCKFORD
      defaultPadding = false
      break
    default:
      throw new Error('Unknown base32 variant: ' + variant)
  }

  const padding = (options.padding !== undefined ? options.padding : defaultPadding)
  const view = toDataView(data)

  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < view.byteLength; i++) {
    value = (value << 8) | view.getUint8(i)
    bits += 8

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31]
  }

  if (padding) {
    while ((output.length % 8) !== 0) {
      output += '='
    }
  }

  return output
}
