import assert from "node:assert";

/**
 * Filters out items that contain the letters 'u' or 'g'.
 * @param items - Array of strings to filter
 * @returns A new array excluding any strings that contain 'u' or 'g'
 */
const items = ['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch'];

const filtered = items.filter((item) => !item.includes('u')).filter((item) => !item.includes('g'));

assert.strictEqual(filtered.length, 4, "Should return 4 items after filtering");

assert.ok(!filtered.includes('lunch'), "'lunch' should be removed — contains 'u'");
assert.ok(!filtered.includes('energy'), "'energy' should be removed — contains 'g'");

assert.ok(filtered.includes('browl'), "'browl' should remain");
assert.ok(filtered.includes('faaast'), "'faaast' should remain");
assert.ok(filtered.includes('stand'), "'stand' should remain");
assert.ok(filtered.includes('eat'), "'eat' should remain");

assert.ok(filtered.every(item => !item.includes('u') && !item.includes('g')), "No item should contain 'u' or 'g'");

console.log("All assertions passed!");