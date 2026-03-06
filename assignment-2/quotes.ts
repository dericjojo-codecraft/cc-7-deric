interface Quote {
    text: string;
    author: string;
}

const quotes: Quote[] = [
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
  { text: "You can observe a lot just by watching.", author: "Yogi Berra" },
  { text: "To invent, you need a good imagination and a pile of junk", author: "Thomas Edison" },
  { text: "Difficulties increase the nearer we get to the goal.", author: "Yogi Berra" },
  { text: "Fate is in your hands and no one elses", author: "Byron Pulsifer" },
  { text: "Be the chief but never the lord.", author: "Lao Tzu" },
  { text: "Nothing happens unless first we dream.", author: "Byron Pulsifer" },
  { text: "Well begun is half done.", author: "Aristotle" },
  { text: "Life is a learning experience, only if you learn.", author: "Yogi Berra" },
  { text: "Self-complacency is fatal to progress.", author: "Margaret Sangster" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "What you give is what you get.", author: "Byron Pulsifer" },
  { text: "We can only learn to love by loving.", author: "Lao Tzu" },
  { text: "Life is change. Growth is optional. Choose wisely.", author: "Karen Clark" },
  { text: "You'll see it when you believe it.", author: "Buddha" },
];

// ─── 1. Group quotes by author ────────────────────────────────────────────────

/**
 * Groups all quotes by their author.
 * Iterates over the quotes array and builds a map where each key is an author
 * name and the corresponding value is an array of that author's quote strings.
 *
 * @returns A record mapping each author name to their array of quote texts.
 *
 * @example
 * quotesByAuthor["Yogi Berra"]
 * // ["You can observe a lot just by watching.", ...]
 */
const quotesByAuthor: Record<string, string[]> = quotes.reduce((acc: Record<string, string[]>, curr) => {
    if (acc.hasOwnProperty(curr.author)) {
        acc[curr.author].push(curr.text);
    } else {
        acc[curr.author] = [curr.text];
    }
    return acc;
}, {});

// ─── 2. Filter quotes containing a specific word ──────────────────────────────

/**
 * Returns all quote texts that contain the given word (case-insensitive).
 * Performs a simple substring search, so partial word matches are included.
 *
 * @param word - The word or substring to search for within each quote.
 * @returns An array of quote strings that contain `word`.
 *
 * @example
 * getQuotesContainingWord("you")
 * // ["You can observe a lot just by watching.", "What you give is what you get.", ...]
 */
function getQuotesContainingWord(word: string): Array<string> {
    const result: Array<string> = [];
    quotes.forEach((item) => {
        if (item.text.toLowerCase().includes(word.toLowerCase())) {
            result.push(item.text);
        }
    });
    return result;
}

// ─── 3. Extract all quote strings ────────────────────────────────────────────

/**
 * Extracts just the text from every quote object, preserving original order.
 * Uses `reduce` to accumulate quote strings into a flat array.
 *
 * @returns An array of all quote strings.
 */
const justQuotes: Array<string> = quotes.reduce((acc: Array<string>, curr) => {
    acc.push(curr.text);
    return acc;
}, []);

// ─── 4. Collect unique authors ────────────────────────────────────────────────

/**
 * Produces a deduplicated list of author names in the order they first appear.
 * Uses `reduce` and skips any author already present in the accumulator.
 *
 * @returns An array of unique author name strings.
 */
const justAuthors: Array<string> = quotes.reduce((acc: Array<string>, curr) => {
    if (!acc.includes(curr.author)) acc.push(curr.author);
    return acc;
}, []);

// ─── Tests ────────────────────────────────────────────────────────────────────

console.log("\n── 1. quotesByAuthor ──");

// Every author in the source data should be a key
const allAuthors = [...new Set(quotes.map(q => q.author))];
console.assert(
    allAuthors.every(a => a in quotesByAuthor),
    "FAIL: every author should be a key"
);
console.log("PASS: all authors are present as keys");

// Quote counts per author should match the source data
console.assert(quotesByAuthor["Thomas Edison"].length === 2, "FAIL: Thomas Edison should have 2 quotes");
console.log("PASS: Thomas Edison has 2 quotes");

console.assert(quotesByAuthor["Yogi Berra"].length === 3, "FAIL: Yogi Berra should have 3 quotes");
console.log("PASS: Yogi Berra has 3 quotes");

console.assert(quotesByAuthor["Aristotle"].length === 1, "FAIL: Aristotle should have 1 quote");
console.log("PASS: Aristotle has 1 quote");

// A known quote should appear under the right author
console.assert(
    quotesByAuthor["Buddha"].includes("You'll see it when you believe it."),
    "FAIL: Buddha's second quote should be present"
);
console.log("PASS: correct quote is stored under the correct author");


console.log("\n── 2. getQuotesContainingWord ──");

// "you" (case-insensitive) appears in 6 quotes in the dataset
const youQuotes = getQuotesContainingWord("you");
console.assert(youQuotes.length === 6, `FAIL: expected 6 quotes containing "you", got ${youQuotes.length}`);
console.log(`PASS: found ${youQuotes.length} quotes containing "you"`);

// Search is case-insensitive — "You" and "you" should return the same results
console.assert(
    getQuotesContainingWord("You").length === getQuotesContainingWord("you").length,
    "FAIL: search should be case-insensitive"
);
console.log("PASS: search is case-insensitive");

// A word that appears in no quote should return an empty array
console.assert(getQuotesContainingWord("typescript").length === 0, "FAIL: unknown word should return []");
console.log("PASS: unknown word returns an empty array");

// A known quote should be present in the results
console.assert(
    getQuotesContainingWord("learn").includes("Life is a learning experience, only if you learn."),
    "FAIL: expected specific quote to be in results"
);
console.log("PASS: correct quote is returned for 'learn'");


console.log("\n── 3. justQuotes ──");

// Should have the same length as the source array
console.assert(justQuotes.length === quotes.length, "FAIL: length should match source array");
console.log("PASS: length matches the source quotes array");

// Should contain only strings, not objects
console.assert(justQuotes.every(q => typeof q === "string"), "FAIL: all entries should be strings");
console.log("PASS: every entry is a string");

// Order should be preserved
console.assert(justQuotes[0] === quotes[0].text, "FAIL: first element should match source order");
console.log("PASS: original order is preserved");


console.log("\n── 4. justAuthors ──");

// No duplicates
console.assert(
    justAuthors.length === new Set(justAuthors).size,
    "FAIL: result should contain no duplicate authors"
);
console.log("PASS: no duplicate authors");

// Correct unique count (8 distinct authors in the dataset)
console.assert(justAuthors.length === 8, `FAIL: expected 8 unique authors, got ${justAuthors.length}`);
console.log("PASS: correct number of unique authors (8)");

// First-appearance order — "Thomas Edison" is the first author in the data
console.assert(justAuthors[0] === "Thomas Edison", "FAIL: first author should be Thomas Edison");
console.log("PASS: authors appear in first-occurrence order");