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

export {someImperative, some}