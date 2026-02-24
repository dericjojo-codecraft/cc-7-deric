// Write a function to return the first n perfect squares.

import assert from "assert";

/**
 * generateFirstSquares function produces an array of n number of squares
 * generateFirstSquares(4) => [1, 4, 9, 16], generateFirstSquares(9) => [1, 4, 9, 16, 25, 36, 49, 64, 81]
 * 
 * @param n represents the number of squares to find
 * @returns an array of n number of squares
 */
function generateFirstSquares(n:number):Array<number> {
    let squares:Array<number> = [];

    for(let i = 1; i <= n; i++) {
        squares.push(i*i);
    }
    return squares;
}

assert.deepStrictEqual(generateFirstSquares(4), [1, 4, 9, 16]);

assert.deepStrictEqual(generateFirstSquares(9), [1, 4, 9, 16, 25, 36, 49, 64, 81]);