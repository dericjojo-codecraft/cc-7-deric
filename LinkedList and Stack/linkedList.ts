// Implement a LinkedList class implementation that conforms to the following interface:

/**
 * The ListNode class implements a node structure to be part of a LinkedList structure.
 * The ListNode class holds a data of a specified datatype and a pointer to the next node or null if there node is a tail node.
 */
class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data:T, next:ListNode<T> | null) {
        this.data = data;
        this.next = next;
    }
}

/**
 * The LinkedListInterface interface provides a structure for the LinkedList class generator.
 */
interface LinkedListInterface<T> {
    valueAtHead(): T | null;
    valueAtTail(): T | null;
    addAtEnd(t: T): void;
    removeFromEnd(): T | null;
    addAtHead(t: T): void;
    removeFromHead(): T | null;
    searchFor(t: T): number | string;
    length(): number;
    valueAtIndex(index: number): T | "Index out of bound";
}

/**
 * The LinkedList class uses ListNodes to make a list.
 * Optionally contains a head and tail.
 */
class LinkedList<T> implements LinkedListInterface<T> {
    #head: ListNode<T> | null = null;
    #tail: ListNode<T> | null = null;

    valueAtHead(): T | null {
        return this.#head ? this.#head.data : null;
    }

    valueAtTail(): T | null {
        return this.#tail ? this.#tail.data : null;
    }

    constructor() {
        this.#head = this.#head;
        this.#tail = this.#tail;
    }

    // method to add at the end of the list
    addAtEnd(t:T) {
        let temp = new ListNode(t, null);

        if(this.#head === null) {
            this.#head = temp; this.#head.next = null;
            this.#tail = temp; this.#tail.next = null;
        } else if(this.#tail) {
            this.#tail.next = temp;
            this.#tail = temp;
        }
    };

    // method to remove from end of the list
    removeFromEnd() {
        if(this.#head === null) return null;

        if(this.#head?.next === null) {
            const val = this.#head.data;
            this.#head = null;
            this.#tail = null;
            return val;
        }

        let temp = this.#head;

        while(temp!.next && temp!.next.next !== null) {
            temp = temp!.next;
        }

        const temp1 = temp!.next;
        temp!.next = null;
        this.#tail = temp;

        return temp1!.data;
    };

    // method to add to the start of the list
    addAtHead(t: T) {
        let temp = new ListNode(t, null);

        if(this.#head !== null) {
            temp.next = this.#head!;
            this.#head = temp;
        } else {
            this.#head = temp;
            this.#tail = temp;
        }
    };
    
    // method to remove from the start of the list
    removeFromHead() {
        if(this.#head === null) { return null }

        const temp = this.#head;
        this.#head = this.#head!.next;

        let val = temp!.data;
        
        if(this.#head === null) { this.#tail = null }

        return val;
    };

    // method to return the index for an node given value
    searchFor(t: T) {
        let index = 0;
        let temp = this.#head;

        while (temp !== null) {
            if (temp!.data === t) {
                return index;
            }
            temp = temp!.next;
            index++;
        }

        return "index not found";
    };

    // method to get the length of the list
    length() {
        let len = 0;
        let temp = this.#head;

        if(this.#head === null) {
            return 0;
        }

        while(temp !== null) {
            len += 1;
            temp = temp!.next;
        }
        
        return len;
    }

    valueAtIndex(index: number) {
        if(index >= this.length() || index < 0) return "Index out of bound";

        let checkIndex = 0, temp = this.#head;
        while(checkIndex !== index) {
            checkIndex += 1;
            temp = temp!.next;
        }
        return temp!.data;
    }
}

export {ListNode, LinkedList}