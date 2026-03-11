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
        acc[curr.author]!.push(curr.text);
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
 */
const getQuotesContainingWord = (word:string) => quotes.filter(curr => {
    return curr.text.toLowerCase().includes(word.toLowerCase())
})

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

export { quotes, getQuotesContainingWord, quotesByAuthor, justAuthors, justQuotes }