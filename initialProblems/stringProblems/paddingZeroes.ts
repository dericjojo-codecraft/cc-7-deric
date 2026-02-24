import assert from "assert";

// Write a function that will pad zeros before a number to ensure it has a specified number of digits. If the provided number already contains more than the required digits, simply return the number string as is.

/**
 * padZerosBeforeNumber function produces a number that meets the criteria of the minimum number of digits required
 * padZerosBeforeNumber(233, 6) => "000233", padZerosBeforeNumber(333333445, 4) => "333333445"
 * 
 * @param num represents the original number
 * @param numOfDigits represents the minimum number of digits that should be in the string
 * @returns a string with padding if the original number doesn't meet the criteria
 */
function padZerosBeforeNumber(num:number, numOfDigits:number):string {
    let result = "", currSize = num.toString().length;
    
    if(currSize >= numOfDigits) {
        return num.toString();
    } else {
        return "0".repeat(numOfDigits - currSize)+num.toString();
    }
}
console.assert(padZerosBeforeNumber(233, 6) === "000233", "This should return 000233");
assert.deepStrictEqual(padZerosBeforeNumber(333333445, 4), "333333445");
assert.deepStrictEqual(padZerosBeforeNumber(123, 4), "0123");