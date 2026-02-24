import assert from "assert";

// Return a substring containing all characters in a string until you see a character that is repeating

/**
 * getStringSpecial function is used to find the first instance of a substring withing a sentence that doesnt contain a duplicate character
 *  i.e, getStringSpecial("Hello world") => "Hel", getStringSpecial("unparliamentary") => "unparli"
 * 
 * @param str represents the input sentence
 * @returns a string in which there are no repeating characters
 */
function getStringSpecial(str:string):string {
    let result = "";
    for(const letter of str) {
        if(result.includes(letter)) {
            return result
        }
        result += letter;
    }
    
    return result;
}

console.assert(getStringSpecial("Hello world") === "Hel", "The function should return Hel");
assert.deepStrictEqual(getStringSpecial("unparliamentary"), "unparli");
assert.deepStrictEqual(getStringSpecial("a dream that is"), "a dre");