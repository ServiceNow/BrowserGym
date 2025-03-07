# Change log

The user-friendly summaries of how this project evolved over
time.


## 1.3.2 <small>- Jun 24, 2020</small>

- Fixes issue with `test()` case-sensitivity ([#17](https://github.com/jchook/uuid-random/issues/17))
- Improves tests
- Improves benchmarks


## 1.3.1 <small>- Jun 19, 2020</small>

- Fixes issue with iOS 9 ([#15](https://github.com/jchook/uuid-random/issues/15))


## 1.3.0 <small>- Sept 14, 2019</small>

- Exposes `uuid.randomBytes()` so you can override it, e.g. with [nacl](https://github.com/dchest/tweetnacl-js#random-bytes-generation) ([#5](https://github.com/jchook/uuid-random/issues/5#issuecomment-442081338))
- Exposes `uuid.clearBuffer()` to clear the internal RNG buffer
- Performance improvement via refactor ([#5](https://github.com/jchook/uuid-random/issues/5))
- Fix `Math.random()` fallback range from [0,255) to [0,255] ([#6](https://github.com/jchook/uuid-random/issues/5))
- Updated benchmarks (thanks [@aarondcohen](https://github.com/aarondcohen/benchmark-guid))
- README, etc now written in [E-Prime](https://en.wikipedia.org/wiki/E-Prime)


_Note: version jump to 1.3.0 since I should have named 1.0.4 ⇒ 1.1.0 and 1.0.5 ⇒ 1.2.0_


## 1.0.9

- Type definition for TypeScript


## 1.0.8

- Fix for IE11 when using crypto library (check window.msCrypto)


## 1.0.7

- Minor performance improvement
- Benchmarks latest npm uuid packages
- Updates code formatting and README
- Still the fastest pure JS UUIDv4 generator x2


## 1.0.5

- Fixes notice when environment does not support crypto
- Exposes `uuid.test()` function to validate a uuid v4 string


## 1.0.4

- Improves performance when generating large batches of uuids
- Exposes `uuid.bin()` for generating binary uuids


## 1.0.3

- Verified RFC-4122 compliance


## 1.0.2

- Bug fix


## 1.0.1

- Increased performance dramatically - now the fastest pure JS UUIDv4 generator x5


## 1.0.0

- Initial release
