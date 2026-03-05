import assert from "node:assert";

const strings = [
    "CraftCode is a nice company",
    "We love CraftCode",
    "We are working in CraftCode",
    "Where is CraftCode?"
];

const newStrings = strings.map((str) => str.replaceAll("CraftCode", "CodeCraft"));

assert.strictEqual(newStrings[0], "CodeCraft is a nice company", "Should replace CraftCode at the start");
assert.strictEqual(newStrings[1], "We love CodeCraft", "Should replace CraftCode at the end");
assert.strictEqual(newStrings[2], "We are working in CodeCraft", "Should replace CraftCode in the middle");
assert.strictEqual(newStrings[3], "Where is CodeCraft?", "Should replace CraftCode before punctuation");

assert.ok(newStrings.every(str => !str.includes("CraftCode")), "No string should contain CraftCode");
assert.ok(newStrings.every(str => str.includes("CodeCraft")), "Every string should contain CodeCraft");

console.log("All assertions passed!");