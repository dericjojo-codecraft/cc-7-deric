import { LinkedList } from "./linkedList.ts";

class Stack<T> {
  #__items: LinkedList<T>;
  constructor(__items: LinkedList<T> = new LinkedList<T>()) {
    this.#__items = __items;
  }

  push(item: T): T {
    this.#__items.addAtHead(item);
    return item;
  }

  pop(): T | null {
    const popedItem = this.#__items.removeFromHead();
    return popedItem;
  }

  top(): T | null {
    const item = this.#__items.valueAtHead() ?? null;
    return item;
  }
}

export {Stack}