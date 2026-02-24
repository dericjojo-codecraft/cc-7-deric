import assert from "assert";

// create a blue heart pattern and use asserts to test them
/**
 * 💙
 * 💙 💙
 * 💙 💙 💙
 * 💙 💙 💙 💙
 * 💙 💙 💙 💙 💙
 * 💙 💙 💙 💙 💙 💙
 * 💙 💙 💙 💙 💙 💙 💙
 * 💙 💙 💙 💙 💙 💙 💙 💙
 */

function createBlueHearts(num:number):string {
    let result = "";
    for(let i = 0; i < num; i++) {
        result += "💙 ".repeat(i+1)+"\n"
    }

    return result;
}

console.assert(createBlueHearts(1) === "💙 \n", "This should have printed only 1 layer of 💙");

assert.strictEqual(createBlueHearts(4), "💙 \n💙 💙 \n💙 💙 💙 \n💙 💙 💙 💙 \n");

console.log(createBlueHearts(10));