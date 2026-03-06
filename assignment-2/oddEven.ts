// ─── 1. Array generator ───────────────────────────────────────────────────────

/**
 * Generates an array of the first `n` natural numbers, starting from 1.
 *
 * @param n - How many natural numbers to generate. Must be a positive integer.
 * @returns An array `[1, 2, 3, ..., n]`.
 *
 * @example
 * generateArray(5); // [1, 2, 3, 4, 5]
 */
const generateArray = (n: number): number[] => {
    const result: number[] = [];
    for (let i = 1; i <= n; i++) result.push(i);
    return result;
};

// ─── 2. Partition into odd / even arrays ─────────────────────────────────────

const arr: number[] = generateArray(100);

/**
 * Partitions the first 100 natural numbers into separate odd and even arrays.
 * - `odd`  contains all numbers where `n % 2 !== 0` (1, 3, 5, … 99)
 * - `even` contains all numbers where `n % 2 === 0` (2, 4, 6, … 100)
 */
const obj: { odd: number[]; even: number[] } = { odd: [], even: [] };

arr.forEach((value) => {
    if (value % 2 === 0) obj.even.push(value);
    else                 obj.odd.push(value);
});

// ─── 3. Sum of odd / even numbers ────────────────────────────────────────────

/**
 * Transforms the partitioned arrays into their respective sums.
 * - `odd`  becomes the sum of all odd numbers  from 1 to 100  → 2500
 * - `even` becomes the sum of all even numbers from 1 to 100  → 2550
 *
 * The two-step process mirrors the original: first accumulate values into
 * arrays, then reduce each array down to a single sum.
 */
const newObj: { odd: number[] | number; even: number[] | number } = { odd: [], even: [] };

arr.forEach((value: number) => {
    if (value % 2 === 0) (newObj.even as number[]).push(value);
    else                 (newObj.odd  as number[]).push(value);
});

newObj.even = (newObj.even as number[]).reduce((acc, curr) => acc + curr, 0);
newObj.odd  = (newObj.odd  as number[]).reduce((acc, curr) => acc + curr, 0);

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\n── 1. generateArray ──");

// Length should equal n
console.assert(generateArray(10).length === 10, "FAIL: length should equal n");
console.log("PASS: length equals n");

// First element is always 1
console.assert(generateArray(5)[0] === 1, "FAIL: first element should be 1");
console.log("PASS: first element is 1");

// Last element equals n
console.assert(generateArray(7)[6] === 7, "FAIL: last element should equal n");
console.log("PASS: last element equals n");

// n = 0 returns an empty array
console.assert(generateArray(0).length === 0, "FAIL: n=0 should return an empty array");
console.log("PASS: n=0 returns an empty array");


console.log("\n── 2. obj (odd / even partition) ──");

// Together they should account for all 100 numbers
console.assert(obj.odd.length + obj.even.length === 100, "FAIL: combined length should be 100");
console.log("PASS: odd and even arrays together cover all 100 numbers");

// Exactly 50 odd and 50 even numbers in 1..100
console.assert(obj.odd.length  === 50, `FAIL: expected 50 odd numbers, got ${obj.odd.length}`);
console.assert(obj.even.length === 50, `FAIL: expected 50 even numbers, got ${obj.even.length}`);
console.log("PASS: 50 odd and 50 even numbers");

// Every value in odd is actually odd
console.assert(obj.odd.every(n => n % 2 !== 0), "FAIL: odd array contains an even number");
console.log("PASS: every entry in odd[] is odd");

// Every value in even is actually even
console.assert(obj.even.every(n => n % 2 === 0), "FAIL: even array contains an odd number");
console.log("PASS: every entry in even[] is even");


console.log("\n── 3. newObj (sums) ──");

// Sum of odd numbers 1+3+…+99 = 50² = 2500
console.assert(newObj.odd === 2500, `FAIL: expected odd sum 2500, got ${newObj.odd}`);
console.log("PASS: sum of odd numbers is 2500");

// Sum of even numbers 2+4+…+100 = 50×51 = 2550
console.assert(newObj.even === 2550, `FAIL: expected even sum 2550, got ${newObj.even}`);
console.log("PASS: sum of even numbers is 2550");

// Sanity check: odd + even = sum of 1..100 = 5050
console.assert((newObj.odd as number) + (newObj.even as number) === 5050, "FAIL: odd + even should equal 5050");
console.log("PASS: odd sum + even sum equals the total sum of 1..100 (5050)");