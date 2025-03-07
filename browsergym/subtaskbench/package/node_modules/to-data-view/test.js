import assert from 'node:assert'
import toDataView from './index.js'

assert(toDataView(Buffer.from('test')) instanceof DataView)
assert(toDataView(new ArrayBuffer(10)) instanceof DataView)
assert(toDataView(new Int8Array(1337)) instanceof DataView)
assert(toDataView(new Uint8Array(120)) instanceof DataView)
assert(toDataView(new Uint8ClampedArray(8)) instanceof DataView)

assert.throws(() => toDataView(), TypeError)
assert.throws(() => toDataView(undefined), TypeError)
assert.throws(() => toDataView(null), TypeError)
assert.throws(() => toDataView(true), TypeError)
assert.throws(() => toDataView(false), TypeError)
assert.throws(() => toDataView(1337), TypeError)
assert.throws(() => toDataView('string'), TypeError)
assert.throws(() => toDataView([0, 1, 2]), TypeError)
assert.throws(() => toDataView({ length: 10 }), TypeError)
assert.throws(() => toDataView(/foobar/i), TypeError)
assert.throws(() => toDataView(Symbol('foobar')), TypeError)
