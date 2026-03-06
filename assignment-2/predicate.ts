/**
 * Predicate function that checks whether a number is even.
 * @param item - The number to test.
 * @returns `true` if `item` is even, `false` otherwise.
 */
function predicate(item: number): boolean {
    return item % 2 === 0;
}

/**
 * Imperative implementation of `some`.
 * Iterates over `items` and returns `true` as soon as any element satisfies
 * the predicate, short-circuiting the rest of the loop.
 *
 * @param items     - The array of numbers to search.
 * @param predicate - A function that tests each element.
 * @returns `true` if at least one element passes the predicate, `false` otherwise.
 */
function someImperative(items: Array<number>, predicate: (item: number) => boolean): boolean {
    for (const item of items) {
        if (predicate(item)) return true;
    }
    return false;
}

/**
 * `reduce`-based implementation of `some`.
 * Accumulates a boolean result across all elements; once `true`, the
 * accumulator stays `true` regardless of subsequent elements.
 *
 * @param items     - The array of numbers to search.
 * @param predicate - A function that tests each element.
 * @returns `true` if at least one element passes the predicate, `false` otherwise.
 */
function someReduce(items: Array<number>, predicate: (item: number) => boolean): boolean {
    return items.reduce((acc: boolean, curr: number) => {
        if (predicate(curr)) return true;
        return acc;
    }, false);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

type TestFn = (items: Array<number>, predicate: (item: number) => boolean) => boolean;

function runTests(label: string, some: TestFn): void {
    console.log(`\n── ${label} ──`);

    // At least one even number → true
    console.assert(some([1, 3, 4, 7], predicate) === true,  "FAIL: should return true when one even exists");
    console.log("PASS: returns true when at least one even number is present");

    // All odd numbers → false
    console.assert(some([1, 3, 5, 7], predicate) === false, "FAIL: should return false when all are odd");
    console.log("PASS: returns false when no even numbers are present");

    // All even numbers → true
    console.assert(some([2, 4, 6], predicate) === true,     "FAIL: should return true when all are even");
    console.log("PASS: returns true when all numbers are even");

    // Empty array → false
    console.assert(some([], predicate) === false,            "FAIL: should return false for an empty array");
    console.log("PASS: returns false for an empty array");

    // Single matching element → true
    console.assert(some([2], predicate) === true,            "FAIL: should return true for a single even number");
    console.log("PASS: returns true for a single matching element");

    // Single non-matching element → false
    console.assert(some([1], predicate) === false,           "FAIL: should return false for a single odd number");
    console.log("PASS: returns false for a single non-matching element");
}

runTests("Imperative", someImperative);
runTests("Reduce",     someReduce);