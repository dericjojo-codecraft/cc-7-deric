import { describe, test, expect } from "vitest";
import { Stack } from "./stackImplement.ts";

describe("Stack", () => {

    describe("constructor", () => {

        test("creates an empty stack by default", () => {
            const stack = new Stack();
            expect(stack.top()).toBeNull();
        });

    });

    describe("push", () => {

        test("adds an item to an empty stack", () => {
            const stack = new Stack<number>();
            stack.push(10);
            expect(stack.top()).toBe(10);
        });

        test("returns the pushed item", () => {
            const stack = new Stack<number>();
            expect(stack.push(10)).toBe(10);
        });

        test("adds multiple items and top is updated correctly", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.push(20);
            stack.push(30);
            expect(stack.top()).toBe(30);
        });

        test("works with string type", () => {
            const stack = new Stack<string>();
            stack.push("hello");
            expect(stack.top()).toBe("hello");
        });

        test("works with object type", () => {
            const stack = new Stack<{ name: string }>();
            stack.push({ name: "Alice" });
            expect(stack.top()).toEqual({ name: "Alice" });
        });

    });

    describe("pop", () => {

        test("returns null on empty stack", () => {
            const stack = new Stack<number>();
            expect(stack.pop()).toBeNull();
        });

        test("returns the top item", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.push(20);
            expect(stack.pop()).toBe(20);
        });

        test("removes the top item", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.push(20);
            stack.pop();
            expect(stack.top()).toBe(10);
        });

        test("removing the only item results in empty stack", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.pop();
            expect(stack.top()).toBeNull();
        });

        test("returns null after all items are removed", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.pop();
            expect(stack.pop()).toBeNull();
        });

    });

    describe("top", () => {

        test("returns null on empty stack", () => {
            const stack = new Stack<number>();
            expect(stack.top()).toBeNull();
        });

        test("returns the top item without removing it", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.push(20);
            expect(stack.top()).toBe(20);
            expect(stack.top()).toBe(20); // calling again confirms item was not removed
        });

        test("updates correctly after push", () => {
            const stack = new Stack<number>();
            stack.push(10);
            expect(stack.top()).toBe(10);
            stack.push(20);
            expect(stack.top()).toBe(20);
        });

        test("updates correctly after pop", () => {
            const stack = new Stack<number>();
            stack.push(10);
            stack.push(20);
            stack.pop();
            expect(stack.top()).toBe(10);
        });

    });

});