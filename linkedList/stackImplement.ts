import { LinkedList } from './linkedList.ts'

/**
 * The Stack class implements a stack structure using LinkedList.
 * The Stack class provides stack methods that are formed using the LinkedList's methods.
 */
class Stack<T> {
    private __items: LinkedList<T> | null;

    constructor(__items: LinkedList<T> = new LinkedList<T>()) {
        this.__items = __items;
    }

    getItems(): LinkedList<T> {
        return this.__items!;
    }

    push(item: T) {
        this.__items?.addAtEnd(item);
    };

    pop() {
        return this.__items?.removeFromEnd();
    };

    top(): T | "Stack is empty" {
        const tail = this.__items?.getTail();
        return tail ? tail.data : "Stack is empty";
    };
}

export { Stack };