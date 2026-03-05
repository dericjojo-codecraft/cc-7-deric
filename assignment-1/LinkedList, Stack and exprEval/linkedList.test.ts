import { describe, test, expect } from "vitest";
import { ListNode, LinkedList } from "./linkedList.ts";

describe("ListNode", () => {

    test("constructor correctly sets data", () => {
        const node = new ListNode(10, null);
        expect(node.data).toBe(10);
    });

    test("constructor correctly sets next to null", () => {
        const node = new ListNode(10, null);
        expect(node.next).toBeNull();
    });

    test("constructor correctly sets next to another node", () => {
        const node2 = new ListNode(20, null);
        const node1 = new ListNode(10, node2);
        expect(node1.next).toBe(node2);
    });

    test("node data can be updated", () => {
        const node = new ListNode(10, null);
        node.data = 99;
        expect(node.data).toBe(99);
    });

    test("node next can be updated", () => {
        const node1 = new ListNode(10, null);
        const node2 = new ListNode(20, null);
        node1.next = node2;
        expect(node1.next).toBe(node2);
    });

    test("works with string data type", () => {
        const node = new ListNode("hello", null);
        expect(node.data).toBe("hello");
    });

    test("works with object data type", () => {
        const data = { name: "Alice", age: 30 };
        const node = new ListNode(data, null);
        expect(node.data).toEqual({ name: "Alice", age: 30 });
    });

    test("can chain multiple nodes", () => {
        const node3 = new ListNode(30, null);
        const node2 = new ListNode(20, node3);
        const node1 = new ListNode(10, node2);

        expect(node1.next?.data).toBe(20);
        expect(node1.next?.next?.data).toBe(30);
        expect(node1.next?.next?.next).toBeNull();
    });
});

describe("LinkedList", () => {

    describe("constructor", () => {

        test("creates an empty list by default", () => {
            const list = new LinkedList();
            expect(list.valueAtHead()).toBeNull();
            expect(list.valueAtTail()).toBeNull();
        });

    });

    describe("valueAtHead", () => {

        test("returns null on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.valueAtHead()).toBeNull();
        });

        test("returns the head value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.valueAtHead()).toBe(10);
        });

        test("updates after addAtHead", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtHead(5);
            expect(list.valueAtHead()).toBe(5);
        });

        test("updates after removeFromHead", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.removeFromHead();
            expect(list.valueAtHead()).toBe(20);
        });

    });

    describe("valueAtTail", () => {

        test("returns null on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.valueAtTail()).toBeNull();
        });

        test("returns the tail value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.valueAtTail()).toBe(20);
        });

        test("updates after addAtEnd", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.valueAtTail()).toBe(20);
        });

        test("updates after removeFromEnd", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.removeFromEnd();
            expect(list.valueAtTail()).toBe(10);
        });

    });

    describe("addAtEnd", () => {

        test("adds a node to an empty list", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            expect(list.valueAtHead()).toBe(10);
            expect(list.valueAtTail()).toBe(10);
        });

        test("adds multiple nodes and tail is updated correctly", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            expect(list.valueAtTail()).toBe(30);
        });

        test("head remains the same after multiple additions", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.valueAtHead()).toBe(10);
        });

    });

    describe("addAtHead", () => {

        test("adds a node to an empty list", () => {
            const list = new LinkedList<number>();
            list.addAtHead(10);
            expect(list.valueAtHead()).toBe(10);
            expect(list.valueAtTail()).toBe(10);
        });

        test("adds multiple nodes and head is updated correctly", () => {
            const list = new LinkedList<number>();
            list.addAtHead(10);
            list.addAtHead(20);
            list.addAtHead(30);
            expect(list.valueAtHead()).toBe(30);
        });

        test("tail remains the same after multiple additions", () => {
            const list = new LinkedList<number>();
            list.addAtHead(10);
            list.addAtHead(20);
            expect(list.valueAtTail()).toBe(10);
        });

    });

    describe("removeFromEnd", () => {

        test("returns null on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.removeFromEnd()).toBeNull();
        });

        test("removes the only node and sets head and tail to null", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.removeFromEnd();
            expect(list.valueAtHead()).toBeNull();
            expect(list.valueAtTail()).toBeNull();
        });

        test("returns the correct value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.removeFromEnd()).toBe(20);
        });

        test("updates tail correctly after removal", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            list.removeFromEnd();
            expect(list.valueAtTail()).toBe(20);
        });

    });

    describe("removeFromHead", () => {

        test("returns null on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.removeFromHead()).toBeNull();
        });

        test("removes the only node and sets head and tail to null", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.removeFromHead();
            expect(list.valueAtHead()).toBeNull();
            expect(list.valueAtTail()).toBeNull();
        });

        test("returns the correct value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.removeFromHead()).toBe(10);
        });

        test("updates head correctly after removal", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            list.removeFromHead();
            expect(list.valueAtHead()).toBe(20);
        });

    });

    describe("searchFor", () => {

        test("returns correct index for existing value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            expect(list.searchFor(20)).toBe(1);
        });

        test("returns 0 for head node", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            expect(list.searchFor(10)).toBe(0);
        });

        test("returns 'index not found' for missing value", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            expect(list.searchFor(99)).toBe("index not found");
        });

        test("returns 'index not found' on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.searchFor(10)).toBe("index not found");
        });

    });

    describe("length", () => {

        test("returns 0 for empty list", () => {
            const list = new LinkedList<number>();
            expect(list.length()).toBe(0);
        });

        test("returns correct length after additions", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            expect(list.length()).toBe(3);
        });

        test("updates correctly after removal", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.removeFromEnd();
            expect(list.length()).toBe(1);
        });

        test("returns 0 after all nodes removed", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.removeFromEnd();
            expect(list.length()).toBe(0);
        });

    });

    describe("valueAtIndex", () => {

        test("returns correct value at index 0", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            expect(list.valueAtIndex(0)).toBe(10);
        });

        test("returns correct value at middle index", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            list.addAtEnd(20);
            list.addAtEnd(30);
            expect(list.valueAtIndex(1)).toBe(20);
        });

        test("returns 'Index out of bound' for out of range index", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            expect(list.valueAtIndex(5)).toBe("Index out of bound");
        });

        test("returns 'Index out of bound' for negative index", () => {
            const list = new LinkedList<number>();
            list.addAtEnd(10);
            expect(list.valueAtIndex(-1)).toBe("Index out of bound");
        });

        test("returns 'Index out of bound' on empty list", () => {
            const list = new LinkedList<number>();
            expect(list.valueAtIndex(0)).toBe("Index out of bound");
        });

    });

});