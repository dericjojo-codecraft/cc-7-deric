import { describe, expect, it } from "vitest";
import { quotes, getQuotesContainingWord, quotesByAuthor, justAuthors, justQuotes } from './quotes';

describe("quotes", () => {
    // ── 1. quotesByAuthor ──
    it("quotesByAuthor: all authors are present as keys", () => {
        const allAuthors = [...new Set(quotes.map(q => q.author))];
        expect(allAuthors.every(a => a in quotesByAuthor)).toBe(true);
    });

    it("quotesByAuthor: Thomas Edison has 2 quotes", () => {
        expect(quotesByAuthor["Thomas Edison"]).toHaveLength(2);
    });

    it("quotesByAuthor: Yogi Berra has 3 quotes", () => {
        expect(quotesByAuthor["Yogi Berra"]).toHaveLength(3);
    });

    it("quotesByAuthor: Aristotle has 1 quote", () => {
        expect(quotesByAuthor["Aristotle"]).toHaveLength(1);
    });

    it("quotesByAuthor: correct quote is stored under the correct author", () => {
        expect(quotesByAuthor["Buddha"]).toContain("You'll see it when you believe it.");
    });

    // ── 2. getQuotesContainingWord ──
    it('getQuotesContainingWord: finds 6 quotes containing "you"', () => {
        expect(getQuotesContainingWord("you")).toHaveLength(6);
    });

    it("getQuotesContainingWord: search is case-insensitive", () => {
        expect(getQuotesContainingWord("You")).toHaveLength(getQuotesContainingWord("you").length);
    });

    it("getQuotesContainingWord: unknown word returns an empty array", () => {
        expect(getQuotesContainingWord("typescript")).toHaveLength(0);
    });

    it('getQuotesContainingWord: correct quote is returned for "learn"', () => {
        const results = getQuotesContainingWord("learn");
        expect(results.some(q => q.text === "Life is a learning experience, only if you learn.")).toBe(true);
    });

    // ── 3. justQuotes ──
    it("justQuotes: length matches the source quotes array", () => {
        expect(justQuotes).toHaveLength(quotes.length);
    });

    it("justQuotes: every entry is a string", () => {
        expect(justQuotes.every(q => typeof q === "string")).toBe(true);
    });
    
    // ── 4. justAuthors ──
    it("justAuthors: no duplicate authors", () => {
        expect(justAuthors.length).toBe(new Set(justAuthors).size);
    });

    it("justAuthors: correct number of unique authors (8)", () => {
        expect(justAuthors).toHaveLength(8);
    });

    it("justAuthors: authors appear in first-occurrence order", () => {
        expect(justAuthors[0]).toBe("Thomas Edison");
    });
});