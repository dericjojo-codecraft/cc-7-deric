import assert from "assert";

// Write a function that will return the day of the week (0 for Sunday, 1 for Monday, etc.) given a short string representation of the day's name. The day's name will be a 3-character long, case-insensitive string (e.g., 'mon', 'MON', or 'Mon' all mean Monday). If an unknown string is passed, the function should return -1.

/**
 * getDayOfWeek function return a number value representing the day of the week
 * i.e, getDayOfWeek("sun") => 0, getDayOfWeek("sat") => 6
 * 
 * @param dayName - represents the shorthand for the day of the week
 * @returns a number value from the range 0-6
 */
function getDayOfWeek(dayName:string):number | "Day not found" {
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    let val = -1;

    return dayNames.indexOf(dayName) ? dayNames.indexOf(dayName) : "Day not found";
}

console.assert(getDayOfWeek("sun") === 0, "The result should be 0");
assert.deepStrictEqual(getDayOfWeek("fri"), 5);
assert.deepStrictEqual(getDayOfWeek("yes"), "Day not found");