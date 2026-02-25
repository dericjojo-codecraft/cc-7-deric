import { describe, test, expect } from "vitest";
import { Stack } from "./stackImplement.ts";

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