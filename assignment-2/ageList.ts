import assert from "node:assert";

const people = [
    { name: 'John', age: 13 },
    { name: 'Mark', age: 56 },
    { name: 'Rachel', age: 45 },
    { name: 'Nate', age: 67 },
    { name: 'Jeniffer', age: 65 }
];

// list of all the ages from the object
const ages = people.map(person => person.age);

assert.strictEqual(ages.length, 5, "Should return one age per person");

assert.strictEqual(ages[0], 13, "John's age should be 13");
assert.strictEqual(ages[1], 56, "Mark's age should be 56");
assert.strictEqual(ages[2], 45, "Rachel's age should be 45");
assert.strictEqual(ages[3], 67, "Nate's age should be 67");
assert.strictEqual(ages[4], 65, "Jeniffer's age should be 65");

assert.ok(ages.every(age => typeof age === 'number'), "All ages should be numbers");
assert.deepStrictEqual(ages, people.map(p => p.age), "Order of ages should match order of people");

console.log("All assertions passed!");