import { describe, test, expect } from "vitest";
import { createNode, createLinkedList } from "./linkedList.js";

describe("LinkedList", () => {

  test("addAtEnd returns correct index", () => {
    
    const list = createLinkedList();
    list.addAtEnd(90);
    list.addAtEnd(100);

    expect(list.tail?.data).toBe(100);
  });

  test("removeFromEnd correctly removed a node from the end", () => {
    const list = createLinkedList();
    list.addAtEnd(90);
    list.addAtEnd(100);
    list.removeFromEnd();

    expect(list.tail?.data).toBe(90);
  });

  test("addAtHead correctly adds a node to the head", () => {
    const list = createLinkedList();
    list.addAtHead(90);
    list.addAtHead(100);

    expect(list.head?.data).toBe(100);
  });

  test("removeFromHead correctly removed a node from the head", () => {
    const list = createLinkedList();
    list.addAtHead(90);
    list.addAtHead(100);
    list.removeFromHead();

    expect(list.head?.data).toBe(90);
  });
  
  test("searchFor returns correct index", () => {
    const list = createLinkedList();
    list.addAtHead(90);
    list.addAtHead(100);

    expect(list.head?.data).toBe(90);
  });

  test("length correctly removed a node from the end", () => {
    const list = createLinkedList();
    list.addAtHead(90);
    list.addAtHead(100);

    expect(list.length()).toBe(2);
  });

});