import { describe, test, expect } from "vitest";
import { Stack } from "./stackImplement.ts";
import { evaluateExpression } from "./exprEval.ts";

describe("Stack", () => {

  test("push properly adds items to the top of the stack", () => {
    
    const stack = new Stack();
    stack.push(10);
    stack.push(20);

    expect(stack.top()).toBe(20);
  });

  test("pop properly removes items from the top of the stack", () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.pop();

    expect(stack.top()).toBe(10);
  });

  test("top properly displays the top item of the stack", () => {
    const stack = new Stack();
    stack.push(10);
    stack.push(20);

    expect(stack.top()).toBe(20);
  });
});

describe("Expression Evaluation", () => {

  test("evaluateExpression evaluates simple expression", () => {

    expect(evaluateExpression("2 * 5 + 3")).toBe(13);
  });

  test("evaluateExpression evaluates complex expression", () => {

    expect(evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")).toBe(37);
  });

  test("evaluateExpression does not evaluate invalid expression", () => {

    expect(evaluateExpression("a * 3")).toBe(undefined);
  });

  test("evaluateExpression handles division", () => {
    expect(evaluateExpression("12 / 4")).toBe(3);
});

test("evaluateExpression handles nested parentheses", () => {
    expect(evaluateExpression("( 2 + 3 ) * ( 4 - 1 )")).toBe(15);
});

test("evaluateExpression handles single number", () => {
    expect(evaluateExpression("5")).toBe(5);
});

test("evaluateExpression returns undefined for empty string", () => {
    expect(evaluateExpression("")).toBe(undefined);
});
})