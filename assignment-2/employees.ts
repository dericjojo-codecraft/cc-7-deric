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
        acc += curr.salary;
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
const getFullNames: Array<string> = employees.map((curr) => {
    return curr.firstName + " " + curr.lastName;
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

export { employees, totalSalaryAgeLessThan30, getFullNames, getEmails }