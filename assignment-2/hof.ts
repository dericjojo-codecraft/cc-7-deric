import assert from 'node:assert'

/**
 * Write a Higher Order function(HOF):
 * This function should return, another function which takes a number as its argument and should return if the number is within cutoff value that it closes over its containing function.
 */

/**
 * Creates a function that checks if a number is below a given cutoff value.
 * @param cutOffValue - The threshold to compare numbers against
 * @returns A function that takes a number and returns true if it is less than the cutoff, false otherwise
 */
function createCutOff(cutOffValue: number) {
    return function(num: number): boolean {
        return num < cutOffValue;
    }
}

const cutOff10 = createCutOff(10);

assert.strictEqual(cutOff10(5), true, 'Numbers below cutoff should return true');
assert.strictEqual(cutOff10(10), false, 'The cutoff value itself should return false');
assert.strictEqual(cutOff10(15), false, 'Numbers above cutoff should return false');