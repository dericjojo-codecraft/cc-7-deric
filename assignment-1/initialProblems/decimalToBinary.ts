import assert from "assert";

// Convert a given decimal number to its binary format.

/**
 * convertBinaryToDecimal function converts a number value to its binary representation as a string
 * i.e, convertBinaryToDecimal(13) => "1101", convertBinaryToDecimal(4) => "100"
 * 
 * @param numInDecimal - represents the decimal number to be converted
 * @returns the binary representation of a number
 */
function convertToBinary(numInDecimal:number):string {
    let result = "";
    while(numInDecimal > 0) {
        let remainder = numInDecimal%2;
        result = remainder.toString()+result;
        numInDecimal = Math.floor(numInDecimal/2);
    }

    return result;
}

console.assert(convertToBinary(13) === "1101", "The binary conversion of 13 is 1101");
assert.deepStrictEqual(convertToBinary(201), "11001001");
assert.deepStrictEqual(convertToBinary(4), "100");