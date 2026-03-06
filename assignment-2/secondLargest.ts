/**
 * Find the second largest number in a given array first by using an imperative approach without using reduce.
 * Use a forEach HOF to iterate over items and figure out the second largest item.
 * Also give a solution using reduce method.
 */


/**
 * Finds the second largest number in an array using an imperative forEach approach.
 * * @param nums - An array of numbers.
 * @returns The second largest number, or -Infinity if the array has fewer than 2 unique numbers.
 */
const getSecondLargestImperative = (nums: number[]): number => {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    nums.forEach((num) => {
        if (num > largest) {
            // Shift current largest to second before updating largest
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            // Update second largest only if it's smaller than num and not equal to largest
            secondLargest = num;
        }
    });

    return secondLargest;
};

/**
 * Finds the second largest number in an array using the reduce method.
 * * @param nums - An array of numbers.
 * @returns An object containing the final largest and second largest numbers.
 */
const getSecondLargestFunctional = (nums: number[]) => {
    return nums.reduce((acc, curr) => {
        if (curr > acc.largest) {
            return { largest: curr, secondLargest: acc.largest };
        } else if (curr > acc.secondLargest && curr !== acc.largest) {
            return { ...acc, secondLargest: curr };
        }
        return acc;
    }, { largest: -Infinity, secondLargest: -Infinity });
};

const testArr = [1, 2, 3, 4, 5, 15, 23, 10];
const duplicateArr = [10, 20, 20, 15];
const smallArr = [5];

console.log("--- Testing Imperative ---");
console.log(getSecondLargestImperative(testArr));       // Expected: 15
console.log(getSecondLargestImperative(duplicateArr));  // Expected: 15 (Ignores 20 duplicate)
console.log(getSecondLargestImperative(smallArr));      // Expected: -Infinity

console.log("--- Testing Functional ---");
console.log(getSecondLargestFunctional(testArr).secondLargest);       // Expected: 15
console.log(getSecondLargestFunctional(duplicateArr).secondLargest);  // Expected: 15