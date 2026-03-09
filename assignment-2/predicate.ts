/**
 * Imperatively checks whether **at least one** element in an array satisfies a predicate.
 * Short-circuits on the first match.
 *
 * @param items     - The array of numbers to search through.
 * @param predicate - An inline condition supplied at the call site, e.g. `n => n > 10`.
 * @returns `true` if at least one element passes the predicate; `false` otherwise.
 *
 * @example
 * someImperative([1, 3, 4], n => n % 2 === 0); // true
 * someImperative([1, 3, 5], n => n > 10);       // false
 */
function someImperative(
    items: Array<number>,
    predicate: (item: number) => boolean
): boolean {
    for (const item of items) {
        if (predicate(item)) return true;
    }
    return false;
}

/**
 * Uses `Array.prototype.reduce` to check whether **at least one** element in an array
 * satisfies a predicate.
 *
 * Accumulates a boolean flag starting at `false`. Once any element passes the predicate
 * the flag flips to `true` and stays `true` for the remainder of the iteration.
 *
 * @param items     - The array of numbers to search through.
 * @param predicate - An inline condition supplied at the call site, e.g. `n => n % 2 === 0`.
 * @returns `true` if at least one element passes the predicate; `false` otherwise.
 *
 */
function some(
    items: Array<number>,
    predicate: (item: number) => boolean
): boolean {
    return items.reduce((acc: boolean, curr: number) => {
        if (predicate(curr)) return true;
        return acc;
    }, false);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

type TestCase = {
    description: string;
    input: number[];
    predicate: (n: number) => boolean;
    expected: boolean;
};

const testCases: TestCase[] = [
    // Even-number predicate
    {
        description: "returns true when one element is even",
        input: [1, 2, 3],
        predicate: n => n % 2 === 0,
        expected: true,
    },
    {
        description: "returns true when all elements are even",
        input: [2, 4, 6],
        predicate: n => n % 2 === 0,
        expected: true,
    },
    {
        description: "returns true when only the last element is even",
        input: [1, 3, 5, 8],
        predicate: n => n % 2 === 0,
        expected: true,
    },
    {
        description: "returns false when no elements are even",
        input: [1, 3, 5],
        predicate: n => n % 2 === 0,
        expected: false,
    },
    // Greater-than predicate
    {
        description: "returns true when at least one element is greater than 10",
        input: [1, 5, 15],
        predicate: n => n > 10,
        expected: true,
    },
    {
        description: "returns false when no element is greater than 10",
        input: [1, 5, 9],
        predicate: n => n > 10,
        expected: false,
    },
    // Negative-number predicate
    {
        description: "returns true when at least one element is negative",
        input: [3, -1, 7],
        predicate: n => n < 0,
        expected: true,
    },
    {
        description: "returns false when all elements are positive",
        input: [1, 2, 3],
        predicate: n => n < 0,
        expected: false,
    },
    // Edge cases
    {
        description: "returns false for an empty array (any predicate)",
        input: [],
        predicate: n => n > 0,
        expected: false,
    },
    {
        description: "returns true for a single matching element",
        input: [8],
        predicate: n => n % 2 === 0,
        expected: true,
    },
    {
        description: "returns false for a single non-matching element",
        input: [7],
        predicate: n => n % 2 === 0,
        expected: false,
    },
];

function runTests(): void {
    const implementations: [string, typeof some][] = [
        ["some (reduce)",  some],
        ["someImperative", someImperative],
    ];

    let totalPassed = 0;
    let totalFailed = 0;

    for (const [name, fn] of implementations) {
        console.log(`\n── ${name} ──`);

        for (const { description, input, predicate, expected } of testCases) {
            const result = fn(input, predicate);
            const passed = result === expected;

            if (passed) {
                totalPassed++;
                console.log(`  ✅ PASS: ${description}`);
            } else {
                totalFailed++;
                console.log(`  ❌ FAIL: ${description}`);
                console.log(`       input:    [${input}]`);
                console.log(`       expected: ${expected}`);
                console.log(`       received: ${result}`);
            }
        }
    }

    const total = totalPassed + totalFailed;
    console.log(`\n─────────────────────────────────────`);
    console.log(`Results: ${totalPassed}/${total} tests passed`);
    if (totalFailed > 0) {
        console.log(`         ${totalFailed} test(s) failed`);
        process.exit(1);
    }
}

runTests();