import assert from "assert";

// Write a function called addArrays that will generate a result array where it contains the sum of corresponding numbers in the source arrays. If arrays are of different lengths, assume missing elements are 0.

/**
 * addArrays function adds the items of two arrays at each index.
 * addArrays([2, 2], [4, 5, 6]) => [6, 7, 6], addArrays([2, 3, 5], [5, 6, 4]) => [7, 9, 9]
 * 
 * @param a represents the first array
 * @param b represents the second array
 * @returns an array of items that represent the sum at each index
 */
function addArrays(a:Array<number>, b:Array<number>):Array<number> {
    let arr:Array<number> = [], index = 0, minSize;

    minSize = a.length >= b.length ? b.length:a.length;

    for(let i = 0; i < minSize; i++) {
        arr.push(a[i]! + b[i]!);
    }
    index = minSize;

    if(a.length > b.length) {
      for(let i = index; i < a.length; i++) {
        arr.push(a[i]!);
      }
    } else {
      for(let i = index; i < b.length; i++) {
        arr.push(b[i]!);
      }
    }

    return arr;
}

assert.deepStrictEqual(addArrays([2, 2], [4, 5, 6]), [6, 7, 6]);
assert.deepStrictEqual(addArrays([2, 3, 5], [5, 6, 4]), [7, 9, 9]);