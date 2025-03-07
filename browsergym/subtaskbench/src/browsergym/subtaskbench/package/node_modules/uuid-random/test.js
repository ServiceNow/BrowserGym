var assert = require('assert');
var uuid = require('./index');

// Check format
var i;
for (i = 0; i < 10000; i++) {
  assert(uuid.test(uuid()));
}

// Check the test function on known-[in]valid UUIDs
const healthyUuids = ['6514db12-0a68-4108-a8c9-3ddc6f489a26'];
const invalidUuids = [
  '920b70bf-168a-458d-c1ac-50e488e5976f',
  '633ca20d-1e9e-7b81-b725-82a595ce3515',
  'knuth',
  undefined,
  null,
  [],
  42,
];
for (const healthyUuid of healthyUuids) {
  assert(uuid.test(healthyUuid) === true);
  assert(uuid.test(healthyUuid.toUpperCase()) === true);
}
for (const invalidUuid of invalidUuids) {
  assert(uuid.test(invalidUuid) === false);
}

// Clear the buffer and change the randomBytes function to return 0s
uuid.clearBuffer();
uuid.randomBytes = function (length) {
  return new Array(length).fill(0, 0, length);
};
assert(uuid() === '00000000-0000-4000-8000-000000000000');
