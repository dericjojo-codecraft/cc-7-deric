import { describe, expect, it } from "vitest";
import { employees, totalSalaryAgeLessThan30, getFullNames, getEmails } from './employees';

describe("employees", () => {
    // ── 1. totalSalaryAgeLessThan30 ──
    it("totalSalaryAgeLessThan30: total salary of under-30 employees is 16124", () => {
        expect(totalSalaryAgeLessThan30).toBe(16124);
    });

    it("totalSalaryAgeLessThan30: employees aged 30 or above are excluded", () => {
        const over30Total = employees.filter(e => e.age >= 30).reduce((a, c) => a + c.salary, 0);
        expect(totalSalaryAgeLessThan30).not.toBe(over30Total);
    });

    it("totalSalaryAgeLessThan30: result is a positive number", () => {
        expect(totalSalaryAgeLessThan30).toBeGreaterThan(0);
    });

    // ── 2. getFullNames ──
    it("getFullNames: one full name per employee", () => {
        expect(getFullNames).toHaveLength(employees.length);
    });

    it("getFullNames: all entries are non-empty strings", () => {
        expect(getFullNames.every(n => typeof n === "string" && n.length > 0)).toBe(true);
    });

    it('getFullNames: first entry is "Molly Rojas"', () => {
        expect(getFullNames[0]).toBe("Molly Rojas");
    });

    it('getFullNames: last entry is "Todd Gomez"', () => {
        expect(getFullNames[6]).toBe("Todd Gomez");
    });

    it("getFullNames: every full name is composed of exactly two parts", () => {
        expect(getFullNames.every(n => n.trim().split(" ").length === 2)).toBe(true);
    });

    // ── 3. getEmails ──
    it("getEmails: result is a string", () => {
        expect(typeof getEmails).toBe("string");
    });

    it("getEmails: no leading or trailing comma", () => {
        expect(getEmails.startsWith(",")).toBe(false);
        expect(getEmails.endsWith(",")).toBe(false);
    });

    it("getEmails: no leading or trailing space", () => {
        expect(getEmails.startsWith(" ")).toBe(false);
        expect(getEmails.endsWith(" ")).toBe(false);
    });

    it("getEmails: all 7 email addresses are present", () => {
        employees.forEach(e => expect(getEmails).toContain(e.email));
    });

    it('getEmails: emails are separated by ", "', () => {
        expect(getEmails.split(", ")).toHaveLength(employees.length);
    });
});