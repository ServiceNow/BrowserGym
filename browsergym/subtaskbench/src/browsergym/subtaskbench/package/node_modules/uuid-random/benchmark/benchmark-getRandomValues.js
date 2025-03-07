/*

	Benchmark public UUIDv4 libraries

	To run this benchmark, first install the following:

		npm install portable-uuid pure-uuid simply-uuid uuid uuid-v4 fast-uuid id128

*/

var crypto = require('crypto');

var buf, i, start, seconds, ops = 40000;

start = + new Date;
for (i = 0; i < ops; i++) crypto.randomBytes(4096);
seconds = ((+new Date) - start) / 1000;
console.log('crypto.randomBytes(4096)', (ops/seconds) + " ops/sec");

start = + new Date;
for (i = 0; i < ops; i++) crypto.randomBytes(2048);
seconds = ((+new Date) - start) / 1000;
console.log('crypto.randomBytes(2048)', (ops/seconds) + " ops/sec");

start = + new Date;
for (i = 0; i < ops; i++) crypto.randomBytes(1024);
seconds = ((+new Date) - start) / 1000;
console.log('crypto.randomBytes(1024)', (ops/seconds) + " ops/sec");

start = + new Date;
for (i = 0; i < ops; i++) crypto.randomBytes(512);
seconds = ((+new Date) - start) / 1000;
console.log('crypto.randomBytes(512)', (ops/seconds) + " ops/sec");