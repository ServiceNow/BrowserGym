import assert from 'node:assert'
import hexToArrayBuffer from 'hex-to-array-buffer'
import base32Encode from './index.js'

const testCases = [
  // RFC 4648 - Test vectors
  ['RFC4648', '', ''],
  ['RFC4648', '66', 'MY======'],
  ['RFC4648', '666f', 'MZXQ===='],
  ['RFC4648', '666f6f', 'MZXW6==='],
  ['RFC4648', '666f6f62', 'MZXW6YQ='],
  ['RFC4648', '666f6f6261', 'MZXW6YTB'],
  ['RFC4648', '666f6f626172', 'MZXW6YTBOI======'],

  // RFC 4648 - Hex test vectors
  ['RFC4648-HEX', '', ''],
  ['RFC4648-HEX', '66', 'CO======'],
  ['RFC4648-HEX', '666f', 'CPNG===='],
  ['RFC4648-HEX', '666f6f', 'CPNMU==='],
  ['RFC4648-HEX', '666f6f62', 'CPNMUOG='],
  ['RFC4648-HEX', '666f6f6261', 'CPNMUOJ1'],
  ['RFC4648-HEX', '666f6f626172', 'CPNMUOJ1E8======'],

  // RFC 4648 - Random data
  ['RFC4648', '73', 'OM======'],
  ['RFC4648', 'f80c', '7AGA===='],
  ['RFC4648', '6450', 'MRIA===='],
  ['RFC4648', 'cc91d0', 'ZSI5A==='],
  ['RFC4648', '6c60c0', 'NRQMA==='],
  ['RFC4648', '4f6a23', 'J5VCG==='],
  ['RFC4648', '88b44f18', 'RC2E6GA='],
  ['RFC4648', '90bad04714', 'SC5NARYU'],
  ['RFC4648', 'e9ef1def8086', '5HXR334AQY======'],
  ['RFC4648', '83fe3f9c1e9302', 'QP7D7HA6SMBA===='],
  ['RFC4648', '15aa1f7cafc17cb8', 'CWVB67FPYF6LQ==='],
  ['RFC4648', 'da51d4fed48b4c32dc', '3JI5J7WURNGDFXA='],
  ['RFC4648', 'c4be14228512d7299831', 'YS7BIIUFCLLSTGBR'],
  ['RFC4648', '2f273c5b5ef04724fab944', 'F4TTYW266BDSJ6VZIQ======'],
  ['RFC4648', '969da1b80ec2442d2bdd4bdb', 'S2O2DOAOYJCC2K65JPNQ===='],
  ['RFC4648', '31f5adb50792f549d3714f3f99', 'GH223NIHSL2UTU3RJ47ZS==='],
  ['RFC4648', '6a654f7a072c29951930700c0a61', 'NJSU66QHFQUZKGJQOAGAUYI='],
  ['RFC4648', '0fe29d6825ad999e87d9b7cac3589d', 'B7RJ22BFVWMZ5B6ZW7FMGWE5'],
  ['RFC4648', '0f960ab44e165973a5172ccd294b3412', 'B6LAVNCOCZMXHJIXFTGSSSZUCI======'],
  ['RFC4648', '325b9fd847a41fb0d485c207a1a5b02dcf', 'GJNZ7WCHUQP3BVEFYID2DJNQFXHQ===='],
  ['RFC4648', 'ddf80ebe21bf1b1e12a64c5cc6a74b5d92dd', '3X4A5PRBX4NR4EVGJROMNJ2LLWJN2==='],
  ['RFC4648', 'c0cae52c6f641ce04a7ee5b9a8fa8ded121bca', 'YDFOKLDPMQOOAST64W42R6UN5UJBXSQ='],
  ['RFC4648', '872840a355c8c70586f462c9e669ee760cb3537e', 'Q4UEBI2VZDDQLBXUMLE6M2POOYGLGU36'],
  ['RFC4648', '5773fe22662818a120c5688824c935fe018208a496', 'K5Z74ITGFAMKCIGFNCECJSJV7YAYECFESY======'],
  ['RFC4648', '416e23abc524d1b85736e2bea6cfecd5192789034a28', 'IFXCHK6FETI3QVZW4K7KNT7M2UMSPCIDJIUA===='],
  ['RFC4648', '83d2386ebdd7e8e818ec00e3ccd882aa933b905b7e2e44', 'QPJDQ3V527UOQGHMADR4ZWECVKJTXEC3PYXEI==='],
  ['RFC4648', 'a2fa8b881f3b8024f52745763c4ae08ea12bdf8bef1a72f8', 'UL5IXCA7HOACJ5JHIV3DYSXAR2QSXX4L54NHF6A='],
  ['RFC4648', 'b074ae8b9efde0f17f37bccadde006d039997b59c8efb05add', 'WB2K5C467XQPC7ZXXTFN3YAG2A4ZS62ZZDX3AWW5'],
  ['RFC4648', '764fef941aee7e416dc204ae5ab9c5b9ce644567798e6849aea9', 'OZH67FA25Z7EC3OCASXFVOOFXHHGIRLHPGHGQSNOVE======'],
  ['RFC4648', '4995d9811f37f59797d7c3b9b9e5325aa78277415f70f4accf588c', 'JGK5TAI7G72ZPF6XYO43TZJSLKTYE52BL5YPJLGPLCGA===='],
  ['RFC4648', '24f0812ca8eed58374c11a7008f0b262698b72fd2792709208eaacb2', 'ETYICLFI53KYG5GBDJYAR4FSMJUYW4X5E6JHBEQI5KWLE==='],
  ['RFC4648', 'd70692543810d4bf50d81cf44a55801a557a388a341367c7ea077ca306', '24DJEVBYCDKL6UGYDT2EUVMADJKXUOEKGQJWPR7KA56KGBQ='],
  ['RFC4648', '6e08a89ca36b677ff8fe99e68a1241c8d8cef2570a5f60b6417d2538b30c', 'NYEKRHFDNNTX76H6THTIUESBZDMM54SXBJPWBNSBPUSTRMYM'],
  ['RFC4648', 'f2fc2319bd29457ccd01e8e194ee9bd7e97298b6610df4ab0f3d5baa0b2d7ccf69829edb74edef', '6L6CGGN5FFCXZTIB5DQZJ3U327UXFGFWMEG7JKYPHVN2UCZNPTHWTAU63N2O33Y='],

  // Crockford - Small samples
  ['Crockford', '', ''],
  ['Crockford', '61', 'C4'],
  ['Crockford', '74657374', 'EHJQ6X0'],
  ['Crockford', '6c696e7573', 'DHMPWXBK'],
  ['Crockford', '666f6f626172', 'CSQPYRK1E8']
]

// base32 encode with no options
testCases.forEach(function (testCase) {
  assert.equal(base32Encode(hexToArrayBuffer(testCase[1]), testCase[0]), testCase[2])
})

// base32 encode with disabled padding option
testCases.forEach(function (testCase) {
  assert.equal(base32Encode(hexToArrayBuffer(testCase[1]), testCase[0], { padding: false }), testCase[2].replace(/=/g, ''))
})

assert.equal(base32Encode(new Int8Array([1, 2, 3, 4]), 'Crockford'), '0410610')
assert.equal(base32Encode(new Uint8Array([1, 2, 3, 4]), 'Crockford'), '0410610')
assert.equal(base32Encode(new Uint8ClampedArray([1, 2, 3, 4]), 'Crockford'), '0410610')
