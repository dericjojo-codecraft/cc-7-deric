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

/**
 * Partitions the first 10 natural numbers into odd and even groups in a
 * single `reduce` pass.
 * - `odd`  collects numbers where `n % 2 !== 0` → [1, 3, 5, 7, 9]
 * - `even` collects numbers where `n % 2 === 0` → [2, 4, 6, 8, 10]
 */
const arr: number[] = generateArray(10);

const obj: { odd: number[] | number; even: number[] | number } = arr.reduce(
    (acc, curr) => {
        if (curr % 2 === 0) acc.even.push(curr);
        else                acc.odd.push(curr);
        return acc;
    },
    { odd: [] as number[], even: [] as number[] }
);

// ─── 3. Sum of odd / even numbers ────────────────────────────────────────────

/**
 * Collapses each partitioned array into its total sum using `reduce`.
 * - `obj.odd`  → sum of [1,3,5,7,9]   = 25
 * - `obj.even` → sum of [2,4,6,8,10]  = 30
 *
 * The union type `number[] | number` on `obj` allows the values to be
 * reassigned from arrays to their computed sums in place.
 */
obj.even = (obj.even as number[]).reduce((acc, curr) => acc + curr, 0);
obj.odd  = (obj.odd  as number[]).reduce((acc, curr) => acc + curr, 0);

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\n── 1. generateArray ──");

console.assert(generateArray(10).length === 10, "FAIL: length should equal n");
console.log("PASS: length equals n");

console.assert(generateArray(5)[0] === 1, "FAIL: first element should be 1");
console.log("PASS: first element is 1");

console.assert(generateArray(5)[4] === 5, "FAIL: last element should equal n");
console.log("PASS: last element equals n");

console.assert(generateArray(0).length === 0, "FAIL: n=0 should return an empty array");
console.log("PASS: n=0 returns an empty array");


console.log("\n── 2. obj (partition) ──");

// Re-derive a fresh partition to test against (obj.odd/even are now numbers)
const freshPartition = generateArray(10).reduce(
    (acc, curr) => {
        if (curr % 2 === 0) acc.even.push(curr);
        else                acc.odd.push(curr);
        return acc;
    },
    { odd: [] as number[], even: [] as number[] }
);

console.assert(freshPartition.odd.length + freshPartition.even.length === 10, "FAIL: combined length should be 10");
console.log("PASS: odd and even arrays together cover all 10 numbers");

console.assert(freshPartition.odd.length  === 5, `FAIL: expected 5 odd numbers, got ${freshPartition.odd.length}`);
console.assert(freshPartition.even.length === 5, `FAIL: expected 5 even numbers, got ${freshPartition.even.length}`);
console.log("PASS: 5 odd and 5 even numbers");

console.assert(freshPartition.odd.every(n  => n % 2 !== 0), "FAIL: odd array contains an even number");
console.log("PASS: every entry in odd[] is odd");

console.assert(freshPartition.even.every(n => n % 2 === 0), "FAIL: even array contains an odd number");
console.log("PASS: every entry in even[] is even");


console.log("\n── 3. obj (sums) ──");

console.assert(obj.odd  === 25, `FAIL: expected odd sum 25, got ${obj.odd}`);
console.log("PASS: sum of odd numbers is 25");

console.assert(obj.even === 30, `FAIL: expected even sum 30, got ${obj.even}`);
console.log("PASS: sum of even numbers is 30");

console.assert((obj.odd as number) + (obj.even as number) === 55, "FAIL: odd + even should equal 55");
console.log("PASS: odd sum + even sum equals total sum of 1..10 (55)");