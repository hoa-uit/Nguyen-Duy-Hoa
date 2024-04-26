const assert = require('assert');

// Brute force
var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Formula
var sum_to_n_b = function (n) {
    return n * (n + 1) / 2;
};

// Formula + Bitwise operation
var sum_to_n_c = function (n) {
    return (n * (n + 1)) >> 1;
};

assert.equal(sum_to_n_a(10), 55, "Test case 1 failed");
console.log('Test case 1 passed');

assert.equal(sum_to_n_b(10), 55, "Test case 2 failed");
console.log('Test case 2 passed');

assert.equal(sum_to_n_c(10), 55, "Test case 3 failed");
console.log('Test case 3 passed');
console.log('All test cases passed');