/**
 *
 * Benchmark using the `benchmark` module.
 *
 * Unfortunately this module somehow adds overhead to the function calls
 * so the true ops/sec cannot be determined.
 *
 */

var Benchmark = require('benchmark')
var suite = new Benchmark.Suite()
var id128 = require('id128')

suite
  .add('uuid-random', require('..'))
  .add('id128', function () { id128.Uuid4.generate().toCanonical() })
  .add('portable-uuid', require('portable-uuid'))
  .add('uuid', require('uuid').v4)
  .add('nanoid', require('nanoid').nanoid)
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })


