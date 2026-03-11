/**
 * Filters out items that start with 'mang' or end with 'fy'.
 * @param items - Array of strings to filter
 * @returns A new array excluding strings that start with 'mang' or end with 'fy'
 */
const items = ['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy'];

const filtered = items
    .filter((item) => !item.startsWith('mang'))
    .filter((item) => !item.endsWith('fy'));

import assert from "node:assert";

assert.strictEqual(filtered.length, 3, "Should return 3 items after filtering");

assert.ok(!filtered.includes('mangalore'), "'mangalore' should be removed — starts with 'mang'");
assert.ok(!filtered.includes('mangala'), "'mangala' should be removed — starts with 'mang'");
assert.ok(!filtered.includes('verify'), "'verify' should be removed — ends with 'fy'");
assert.ok(!filtered.includes('rectify'), "'rectify' should be removed — ends with 'fy'");

assert.ok(filtered.includes('semangin'), "'semangin' should remain — contains 'mang' but doesn't start with it");
assert.ok(filtered.includes('2 lonely'), "'2 lonely' should remain");
assert.ok(filtered.includes('notifyy'), "'notifyy' should remain — ends with 'fyy', not 'fy'");

assert.ok(filtered.every(item => !item.startsWith('mang') && !item.endsWith('fy')), "No item should start with 'mang' or end with 'fy'");

console.log("All assertions passed!");