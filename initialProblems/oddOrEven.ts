import assert from "assert";

type EvenOrOdd = "even" | "odd";

/**
 * printNumbers function provides an array of n numbers of a specified type,
 * i.e, printNumbers(1, "odd") => [1], printNumbers(4, "even") => [2, 4, 6, 8]
 * 
 * @param n represents the number of numbers required
 * @param evenOrOdd represents the type of the numbers required
 * @returns an array containing n number of odd or even numbers
 */
function printNumbers(n:number, evenOrOdd:EvenOrOdd):Array<number>|number {
    let arr = [], i = 1;
    while(arr.length !== n) {
        if(evenOrOdd === "even" && i%2 === 0) {
            arr.push(i);
        } else if(evenOrOdd === "odd" && i%2 === 1) {
            arr.push(i)
        }
        i++;
    }
    return arr;
}

assert.deepStrictEqual(printNumbers(1, "odd"), [1]);
assert.deepStrictEqual(printNumbers(4, "even"), [2, 4, 6, 8]);
assert.deepStrictEqual(printNumbers(7, "even"), [2, 4, 6, 8, 10, 12, 14]);