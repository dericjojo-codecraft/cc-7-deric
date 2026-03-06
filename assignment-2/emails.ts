/**
 * Extracts and lowercases all valid emails from an array of address strings.
 * A valid email matches the pattern: word@word.word
 * Addresses with missing or malformed emails are excluded from the result.
 * 
 * @param addresses - Array of address strings that may contain emails
 * @returns A new array of lowercased valid email addresses
 */
const addresses = [
    "34, brighten street, email: BS@sft.com",
    "Behind hotel paragon, rode street, micHel@sun.it",
    "ulef court, cown street, email:cown@street",
    "CodeCraft"
];

const emailRegex = /[a-zA-Z]+@[a-zA-Z]+\.[a-z]{2,}/;

const filtered = addresses
    .map(ad => {
        const match = ad.match(emailRegex);
        return match ? match[0].toLowerCase() : null;
    }).filter(email => email !== null);

import assert from "node:assert";

assert.strictEqual(filtered.length, 2, "Should extract 2 valid emails");

assert.ok(filtered.includes("bs@sft.com"), "BS@sft.com should be extracted and lowercased");
assert.ok(filtered.includes("michel@sun.it"), "micHel@sun.it should be extracted and lowercased");

assert.ok(!filtered.includes("cown@street"), "'cown@street' has no valid TLD — should be excluded");
assert.ok(!filtered.some(e => e === null), "No nulls should remain after filter");

assert.ok(filtered.every(email => email === email.toLowerCase()), "All emails should be lowercase");
assert.ok(filtered.every(email => email.includes("@")), "All results should contain '@'");

console.log("All assertions passed!");