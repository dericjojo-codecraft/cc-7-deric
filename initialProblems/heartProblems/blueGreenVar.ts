import assert from "assert";

// create a blue heart pattern and use asserts to test them
/**
 * 💚 
 * 💚 💙
 * 💚 💙 💚
 * 💚 💙 💚 💙
 * 💚 💙 💚 💙 💚
 * 💚 💙 💚 💙 💚 💙
 * 💚 💙 💚 💙 💚 💙 💚
 * 💚 💙 💚 💙 💚 💙 💚 💙
 */

/**
 * createGreenAndBlueHearts function produces a triangle of a required size
 * i.e, createGreenAndBlueHearts(1) => "💙 \n", createGreenAndBlueHearts(2) => "💙 \n💚 💚 \n"
 * 
 * @param num represents the number of layers/levels required
 * @returns a string that is in the structure required
 */
function createGreenAndBlueHearts(num:number):string {
    let result = "", row = "";
    for(let i = 1; i <= num; i++) {
        for(let j = 1; j <= i; j++) {
            if(j%2 !== 0) {
                row += "💚 "
            } else {
                row += "💙 "
            }
        }
        result += row+"\n";
        row = "";
    }

    return result;
}


console.assert(createGreenAndBlueHearts(1) === "💚 \n", "This should have printed only 1 layer of 💚");
assert.strictEqual(createGreenAndBlueHearts(4), "💚 \n💚 💙 \n💚 💙 💚 \n💚 💙 💚 💙 \n");
assert.deepStrictEqual(createGreenAndBlueHearts(10), "💚 \n💚 💙 \n💚 💙 💚 \n💚 💙 💚 💙 \n💚 💙 💚 💙 💚 \n💚 💙 💚 💙 💚 💙 \n💚 💙 💚 💙 💚 💙 💚 \n💚 💙 💚 💙 💚 💙 💚 💙 \n💚 💙 💚 💙 💚 💙 💚 💙 💚 \n💚 💙 💚 💙 💚 💙 💚 💙 💚 💙")