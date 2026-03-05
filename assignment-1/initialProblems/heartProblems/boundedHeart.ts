import assert from "assert";

/**
 * 💚
 * 💚 💚
 * 💚 💙 💚
 * 💚 💙 💙 💚
 * 💚 💙 💙 💙 💚
 * 💚 💙 💙 💙 💙 💚
 * 💚 💚 💚 💚 💚 💚 💚
 */

function boundedHeart(layers: number):string {
    let result = "";
    for(let i = 1; i <= layers; i++) {
        if(i < 3) {
            result += "💚 ".repeat(i)+"\n";
        } else if (i > 2 && i < layers) {
            result += "💚 "+"💙 ".repeat(i-2)+"💚 \n";
        } else if(i === layers) {
            result += "💚 ".repeat(i)+"\n";
        }
    }

    return result;
}

console.assert(boundedHeart(1) === "💚 \n", "This should have printed only 1 layer of 💚");

assert.strictEqual(boundedHeart(4), "💚 \n💚 💚 \n💚 💙 💚 \n💚 💚 💚 💚 \n");

console.log(boundedHeart(10));