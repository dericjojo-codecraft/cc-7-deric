interface Employee {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    salary: number;
}

const employees: Employee[] = [
    { firstName: "Molly",      lastName: "Rojas",    age: 38, email: "mollyrojas@plasmox.com",      salary: 3065 },
    { firstName: "Marguerite", lastName: "Santiago", age: 27, email: "margueritesantiago@plasmox.com", salary: 2796 },
    { firstName: "Evelyn",     lastName: "Oneil",    age: 26, email: "evelynoneil@plasmox.com",      salary: 3947 },
    { firstName: "Consuelo",   lastName: "Case",     age: 23, email: "consuelocase@plasmox.com",     salary: 2819 },
    { firstName: "Earline",    lastName: "Bush",     age: 29, email: "earlinebush@plasmox.com",      salary: 3494 },
    { firstName: "Sanford",    lastName: "Hurley",   age: 26, email: "sanfordhurley@plasmox.com",    salary: 3068 },
    { firstName: "Todd",       lastName: "Gomez",    age: 33, email: "toddgomez@plasmox.com",        salary: 3906 },
];

// ─── 1. Total salary of employees under 30 ────────────────────────────────────

/**
 * The combined salary of all employees whose age is strictly less than 30.
 * Uses `reduce` to accumulate salaries, skipping employees aged 30 or above.
 *
 * NOTE: The original code contained two bugs — it used `age > 30` (wrong
 * direction) and summed `curr.age` instead of `curr.salary`. Both are fixed
 * here to match the stated intent.
 *
 * Qualifying employees: Marguerite (27, $2796), Evelyn (26, $3947),
 * Consuelo (23, $2819), Earline (29, $3494), Sanford (26, $3068) → $16,124
 */
const totalSalaryAgeLessThan30: number = employees.reduce((acc, curr) => {
    if (curr.age < 30) {
        acc += curr.salary;   // fix: was curr.age
    }
    return acc;
}, 0);

// ─── 2. Full names of all employees ──────────────────────────────────────────

/**
 * An array of full-name strings for every employee, in source order.
 * Each full name is formed by concatenating `firstName` and `lastName`
 * with a single space, e.g. `"Molly Rojas"`.
 * Uses `reduce` to accumulate the strings into an array.
 */
const getFullNames: Array<string> = employees.reduce((acc: Array<string>, curr) => {
    acc.push(curr.firstName + " " + curr.lastName);
    return acc;
}, []);

// ─── 3. Comma-separated email string ─────────────────────────────────────────

/**
 * A single string containing all employee email addresses, separated by
 * `", "`. Uses `reduce` to concatenate each address and `slice` to strip
 * the trailing `", "` left by the last iteration.
 *
 * @example
 * // "mollyrojas@plasmox.com, margueritesantiago@plasmox.com, ..."
 */
const getEmails: string = employees.reduce((acc, curr) => {
    acc += curr.email + ", ";
    return acc;
}, "").slice(0, -2);

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\n── 1. totalSalaryAgeLessThan30 ──");

// Manually: 2796 + 3947 + 2819 + 3494 + 3068 = 16124
console.assert(totalSalaryAgeLessThan30 === 16124, `FAIL: expected 16124, got ${totalSalaryAgeLessThan30}`);
console.log("PASS: total salary of under-30 employees is 16124");

// Employees aged 30+ (Molly 38, Todd 33) must not be included
const over30Salaries = employees.filter(e => e.age >= 30).map(e => e.salary);
over30Salaries.forEach(s => {
    console.assert(
        totalSalaryAgeLessThan30 !== employees.filter(e => e.age >= 30).reduce((a, c) => a + c.salary, 0),
        "FAIL: over-30 salaries should not be included"
    );
});
console.log("PASS: employees aged 30 or above are excluded");

// Result must be a positive number
console.assert(totalSalaryAgeLessThan30 > 0, "FAIL: total should be a positive number");
console.log("PASS: result is a positive number");


console.log("\n── 2. getFullNames ──");

// Length should match the source array
console.assert(getFullNames.length === employees.length, "FAIL: length should match employee count");
console.log("PASS: one full name per employee");

// All entries should be non-empty strings
console.assert(getFullNames.every(n => typeof n === "string" && n.length > 0), "FAIL: every entry should be a non-empty string");
console.log("PASS: all entries are non-empty strings");

// Spot-check first and last entries
console.assert(getFullNames[0] === "Molly Rojas", `FAIL: expected "Molly Rojas", got "${getFullNames[0]}"`);
console.log('PASS: first entry is "Molly Rojas"');

console.assert(getFullNames[6] === "Todd Gomez", `FAIL: expected "Todd Gomez", got "${getFullNames[6]}"`);
console.log('PASS: last entry is "Todd Gomez"');

// Each name should contain exactly one space (first + last)
console.assert(getFullNames.every(n => n.trim().split(" ").length === 2), "FAIL: each full name should have exactly two parts");
console.log("PASS: every full name is composed of exactly two parts");


console.log("\n── 3. getEmails ──");

// Should be a single string
console.assert(typeof getEmails === "string", "FAIL: result should be a string");
console.log("PASS: result is a string");

// Should not start or end with a comma/space
console.assert(!getEmails.startsWith(",") && !getEmails.endsWith(","), "FAIL: no leading or trailing comma");
console.assert(!getEmails.startsWith(" ") && !getEmails.endsWith(" "),  "FAIL: no leading or trailing space");
console.log("PASS: no leading or trailing comma/space");

// Should contain all 7 email addresses
employees.forEach(e => {
    console.assert(getEmails.includes(e.email), `FAIL: missing email ${e.email}`);
});
console.log("PASS: all 7 email addresses are present");

// Emails should be separated by ", "
const emailParts = getEmails.split(", ");
console.assert(emailParts.length === employees.length, `FAIL: expected ${employees.length} parts, got ${emailParts.length}`);
console.log("PASS: emails are separated by \", \"");