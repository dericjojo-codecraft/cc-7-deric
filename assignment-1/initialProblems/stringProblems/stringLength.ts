import assert from "assert";
// Write a function to compute the length of the string (do not use the built-in string.length property)

/**
 * lengthOfString function finds the length of a string without using the inbuilt length method
 * i.e, lengthOfString("hello") => 5, lengthOfString("John miller") => 11
 * 
 * @param str represents the string to find the length of
 * @returns the length of the string
 */
function lengthOfString(str:string):number {
    let length = 0, i = 0;

    while(str[i] !== undefined) {
        length += 1;
        i += 1;
    }

    return length;
}

console.assert(lengthOfString("hello") === 5, "The length of \"hello\" is 5");
assert.deepStrictEqual(lengthOfString("John miller"), 11);
assert.deepStrictEqual(lengthOfString("good morning"));