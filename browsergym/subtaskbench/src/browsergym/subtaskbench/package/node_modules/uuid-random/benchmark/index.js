/**
 *
 * Benchmark UUID libraries
 *
 * Libraries no longer included:
 *  - an-uuid (no longer exists?)
 *  - node-uuid (deprecated)
 *  - performance-uuid (doesn't work anymore?)
 *  - simply-uuid (extremely slow)
 *  - fast-uuid (no crypto PRNG option)
 *
 */

var Stats = require('fast-stats').Stats
var microtime = require('microtime')
var id128 = require('id128')

var libs = {
  // This lib (fastest)
  'uuid-random': require('..'),

  // Really extensive uuid lib
  id128: () => id128.Uuid4.generate().toCanonical(),

  // Slightly slower.
  'portable-uuid': require('portable-uuid'),

  // Best npm package name
  uuid: require('uuid').v4,

  // Modern non-RFC uuid
  nanoid: require('nanoid').nanoid,
}

var i,
  start,
  seconds,
  ops = 1000000,
  runs = 10

function percent(n) {
  return Math.round(n * 100 * 100) / 100
}

for (const lib in libs) {
  const results = new Stats()
  for (let run = 0; run < runs; run++) {
    start = microtime.now()
    for (i = 0; i < ops; i++) libs[lib]()
    seconds = (microtime.now() - start) / 1000000
    results.push(ops / seconds)
  }
  const amean = results.amean()
  const moe = percent(results.moe() / amean)
  console.log(`${lib} x ${amean.toLocaleString()} ops/sec ±${moe}%`)
}
