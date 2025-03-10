# uuid-random

[![MIT Licence](https://img.shields.io/badge/License-MIT-informational)](LICENSE.txt)
[![Stable](https://img.shields.io/badge/Stable-1.3.0-brightgreen)](https://github.com/jchook/uuid-random/releases)

Generate RFC-4122 compliant [random UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29) (version 4) with better [statistical dispersion](https://en.wikipedia.org/wiki/Statistical_dispersion) than `Math.random()`.



## Install

```sh
npm i uuid-random
```

Or download the [latest release](https://github.com/jchook/uuid-random/releases).

## Features

  * Tiny (0.6k minified + gzipped)
  * Uses [cryptographic randomness](http://caniuse.com/#feat=getrandomvalues) when possible
  * Very fast!


## Compatability

Compatible with almost all versions of:

- Node
- Babel
- TypeScript
- Web browsers

## Performance

The included `benchmark.js` as well as [independent benchmarks](https://github.com/aarondcohen/benchmark-guid) rank this library as the _fastest_ pure JS UUID v4 generator available with cryptographically secure PRNG— almost **20x faster** than the most popular library (using latest NodeJS).

| npm package     | performance     |
|-----------------|-----------------|
| portable-uuid   | 354k ops/sec    |
| uuid            | 474k ops/sec    |
| id128           | 6.0M ops/sec    |
| **uuid-random** <small>(this)</small> | **9.7M ops/sec**  |

*Results above generated on a 4.20GHz Intel i7-7700K with Node v12.18.0*

## Why use UUID?

**U**niversally **U**nique **ID**entifiers transcend many constraints of traditional incremental integer IDs, especially in distributed systems. In UUID version 4, we essentially generate a random 128-bit value.

We do trade guaranteed uniqueness for __extremely__ probable uniqueness (you would need to do-loop `uuid()` at max speed for 73,067 years for a 50% chance of **one** collision). But for that slight cost, we may now generate valid, unique, persistent IDs on any node of a distributed system (e.g. intermittently offline or high-latency clients).

_Note, if you plan to use UUIDs for a new project, depending on your requirements, you may consider a more recent standard that addresses some of the shortcomings of UUID, such as [flake-id](https://github.com/T-PWK/flake-idgen), [nanoid](https://github.com/ai/nanoid), [cuid](https://github.com/ericelliott/cuid), or [ulid](https://github.com/ulid/spec)._


## Example Usage

### Babel

```javascript
import uuid from 'uuid-random';
uuid(); // 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55'
```

### Node

```javascript
var uuid = require('uuid-random');
uuid(); // '0b99b82f-62cf-4275-88b3-de039020f14e'
```

### Browser

```html
<script src="uuid-random.min.js"></script>
<script>
  uuid(); // 'b96ab5e6-f1e8-4653-ab08-4dd82ea65778'
</script>
```

### Validate a UUID v4 String

```javascript
uuid.test('0b99b82f-62cf-4275-88b3-de039020f14e'); // true
```

### Generate Binary UUIDs

```javascript
uuid.bin(); // <Buffer 41 db 10 54 b3 61 48 50 87 f1 2f 7b 08 a5 0f 06>
```


## Contributing

Feel free to [open an issue](https://github.com/jchook/uuid-random/issues) or submit a [pull request](https://github.com/jchook/uuid-random/pulls).

## License

MIT.
