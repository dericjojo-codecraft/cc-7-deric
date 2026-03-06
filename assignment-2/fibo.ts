import assert from "node:assert";

const indexes = [2, 1, 5, 40];

/**
 * 
 * @returns A new array containing the fibonacci number at each given index
 */
const fibo = indexes.map((idx) => {
    let a = 0, b = 1, current = 0;
    if (idx === 0) return a;
    if (idx === 1) return b;
    for (let i = 2; i <= idx; i++) {
        current = a + b;
        a = b;
        b = current;
    }
    return current;
});

assert.strictEqual(fibo.length, 4, "Should return one fibonacci number per index");

assert.strictEqual(fibo[0], 1, "fib(2) should be 1");
assert.strictEqual(fibo[1], 1, "fib(1) should be 1");
assert.strictEqual(fibo[2], 5, "fib(5) should be 5");
assert.strictEqual(fibo[3], 102334155, "fib(40) should be 102334155");

// boundary cases
assert.strictEqual(fibo[1], fibo[0], "fib(1) and fib(2) should both be 1");
assert.ok(fibo.every(num => num > 0), "All results for these indices should be positive");

console.log("All assertions passed!");