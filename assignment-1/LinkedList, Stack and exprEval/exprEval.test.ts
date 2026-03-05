import { describe, test, expect } from "vitest";
import { evaluateExpression } from "./exprEval.ts";

describe("evaluateExpression", () => {

    describe("basic operations", () => {

        test("handles addition", () => {
            expect(evaluateExpression("2 + 3")).toBe(5);
        });

        test("handles subtraction", () => {
            expect(evaluateExpression("10 - 4")).toBe(6);
        });

        test("handles multiplication", () => {
            expect(evaluateExpression("3 * 4")).toBe(12);
        });

        test("handles division", () => {
            expect(evaluateExpression("12 / 4")).toBe(3);
        });

    });

    describe("operator precedence", () => {

        test("multiplication is evaluated before addition", () => {
            expect(evaluateExpression("2 * 5 + 3")).toBe(13);
        });

        test("division is evaluated before subtraction", () => {
            expect(evaluateExpression("10 - 6 / 2")).toBe(7);
        });

        test("handles mixed operators correctly", () => {
            expect(evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")).toBe(37);
        });

    });

    describe("parentheses", () => {

        test("parentheses override precedence", () => {
            expect(evaluateExpression("( 2 + 3 ) * 4")).toBe(20);
        });

        test("handles nested parentheses", () => {
            expect(evaluateExpression("( 2 + 3 ) * ( 4 - 1 )")).toBe(15);
        });

        test("handles multiple sets of parentheses", () => {
            expect(evaluateExpression("( 1 + 2 ) + ( 3 + 4 )")).toBe(10);
        });

    });

    describe("edge cases", () => {

        test("handles single number", () => {
            expect(evaluateExpression("5")).toBe(5);
        });

        test("returns undefined for empty string", () => {
            expect(evaluateExpression("")).toBe(undefined);
        });

        test("returns undefined for invalid token", () => {
            expect(evaluateExpression("a * 3")).toBe(undefined);
        });

        test("returns undefined for letter mixed with numbers", () => {
            expect(evaluateExpression("1 + a + 2")).toBe(undefined);
        });

    });

    describe("malformed expressions", () => {

        test("returns undefined for operator with no operands", () => {
            expect(evaluateExpression("+")).toBe(undefined);
        });

        test("returns undefined for operator with only one operand", () => {
            expect(evaluateExpression("5 +")).toBe(undefined);
        });

        test("returns undefined for expression starting with operator", () => {
            expect(evaluateExpression("* 5 + 3")).toBe(undefined);
        });

        test("returns undefined for mismatched parentheses with no operands", () => {
            expect(evaluateExpression("( + )")).toBe(undefined);
        });

        test("returns undefined for consecutive operators", () => {
            expect(evaluateExpression("5 + + 3")).toBe(undefined);
        });

        test("returns undefined for operator inside empty parentheses", () => {
            expect(evaluateExpression("( ) + 3")).toBe(undefined);
        });

    });

});