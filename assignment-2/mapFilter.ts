import assert from "node:assert";

/**
 * 
 * @param numbers - Array of numbers to transform and filter
 * @returns A new array of numbers, each incremented by 10, that are divisible by 4
 */
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];
const filtered = numbers
    .map((item) => item + 10)    // [44, 55, 12, 63, 94, 552, 41, 33]
    .filter((item) => item % 4 === 0); // keeps 44, 12, 552


assert.strictEqual(filtered.length, 3, "Should return 3 numbers divisible by 4");

assert.ok(filtered.includes(44), "34 + 10 = 44, divisible by 4 — should be included");
assert.ok(filtered.includes(12), "2 + 10 = 12, divisible by 4 — should be included");
assert.ok(filtered.includes(552), "542 + 10 = 552, divisible by 4 — should be included");

assert.ok(!filtered.includes(55), "45 + 10 = 55, not divisible by 4 — should be excluded");
assert.ok(!filtered.includes(94), "84 + 10 = 94, not divisible by 4 — should be excluded");

assert.ok(filtered.every(item => item % 4 === 0), "Every item in result should be divisible by 4");
assert.ok(filtered.every(item => numbers.includes(item - 10)), "Every item should correspond to an original number incremented by 10");

console.log("All assertions passed!");