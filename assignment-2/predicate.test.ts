import { describe, expect, it } from "vitest";
import { someImperative, some } from "./predicate";

const working: [string, typeof some][] = [
    ["some (reduce)", some],
    ["someImperative", someImperative],
];

describe("some", () => {
    for (const [name, fn] of working) {
        // Even-number predicate
        it(`${name}: returns true when one element is even`, () => {
            expect(fn([1, 2, 3], n => n % 2 === 0)).toBe(true);
        });

        it(`${name}: returns true when all elements are even`, () => {
            expect(fn([2, 4, 6], n => n % 2 === 0)).toBe(true);
        });

        it(`${name}: returns true when only the last element is even`, () => {
            expect(fn([1, 3, 5, 8], n => n % 2 === 0)).toBe(true);
        });

        it(`${name}: returns false when no elements are even`, () => {
            expect(fn([1, 3, 5], n => n % 2 === 0)).toBe(false);
        });

        // Greater-than predicate
        it(`${name}: returns true when at least one element is greater than 10`, () => {
            expect(fn([1, 5, 15], n => n > 10)).toBe(true);
        });

        it(`${name}: returns false when no element is greater than 10`, () => {
            expect(fn([1, 5, 9], n => n > 10)).toBe(false);
        });

        // Negative-number predicate
        it(`${name}: returns true when at least one element is negative`, () => {
            expect(fn([3, -1, 7], n => n < 0)).toBe(true);
        });

        it(`${name}: returns false when all elements are positive`, () => {
            expect(fn([1, 2, 3], n => n < 0)).toBe(false);
        });

        // Edge cases
        it(`${name}: returns false for an empty array (any predicate)`, () => {
            expect(fn([], n => n > 0)).toBe(false);
        });

        it(`${name}: returns true for a single matching element`, () => {
            expect(fn([8], n => n % 2 === 0)).toBe(true);
        });

        it(`${name}: returns false for a single non-matching element`, () => {
            expect(fn([7], n => n % 2 === 0)).toBe(false);
        });
    }
});