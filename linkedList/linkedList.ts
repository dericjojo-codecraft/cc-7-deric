// Implement a LinkedList class implementation that conforms to the following interface:

type ListNode<T> = {
  data: T;
  next: ListNode<T> | null;
};

interface LinkedListInterface<T> {
 head?: ListNode<T> | null;
 tail?: ListNode<T> | null;
 addAtEnd(t: T): void;
 removeFromEnd(): T | null;
 addAtHead(t: T): void;
 removeFromHead(): T | null;
 searchFor(t: T): number | string;
 length(): number;
}

/**
 * 
 * @param data - represents the value of a the node
 * @param next - represents the pointer to the next node in the LinkedList or null if it is the tail
 */
function createNode<T>(data:T, next:ListNode<T> | null) {
    return {
        data, next
    }
}

/**
 * 
 * @param headNode? - head of the linkedList
 * @param tailNode? - tail of the linkedList
 */
function createLinkedList<T>(headNode?:ListNode<T> | null, tailNode?:ListNode<T> | null) {
    const list:LinkedListInterface<T> = {
        head: headNode ?? null,
        tail: tailNode ?? null,

        // method to add at the end of the list
        addAtEnd(t:T) {
            let temp = createNode(t, null);

            if(this.head === null) {
                this.head = temp; this.head.next = null;
                this.tail = temp; this.tail.next = null;
            } else if(this.tail) {
                this.tail.next = temp;
                this.tail = temp;
            } else {
                let temp1 = this.head;
                while(temp1?.next != null) {
                    temp1.next = temp1.next.next
                }
                this.tail = temp;

            }
        },

        // method to remove from end of the list
        removeFromEnd() {
            if(this.head === null) return null;

            if(this.head?.next === null) {
                const val = this.head.data;
                this.head = null;
                this.tail = null;
                return val;
            }

            let temp = this.head;

            while(temp!.next && temp!.next.next !== null) {
                temp = temp!.next;
            }

            const temp1 = temp!.next;
            temp!.next = null;
            this.tail = temp;

            return temp1!.data;
        },

        // method to add to the start of the list
        addAtHead(t: T) {
            let temp = createNode(t, null);

            if(this.head !== null) {
                temp.next = this.head!;
                this.head = temp;
            } else {
                this.head = temp;
                this.tail = temp;
            }
        },

        // method to remove from the start of the list
        removeFromHead() {
            if(this.head === null) { return null }

            const temp = this.head;
            this.head = this.head!.next;

            let val = temp!.data;
            
            if(this.head === null) { this.tail = null }

            return val;
        },

        // method to return the index for an node given value
        searchFor(t: T) {
            let index = 0;
            let temp = this.head;

            while (temp !== null) {
                if (temp!.data === t) {
                    return index;
                }
                temp = temp!.next;
                index++;
            }

            return "index not found";
        },

        // method to get the length of the list
        length() {
            let len = 0;
            let temp = this.head;

            if(this.head === null) {
                return 0;
            }

            while(temp !== null) {
                len += 1;
                temp = temp!.next;
            }
            
            return len;
        }
    }

    return list;
}

export {createNode, createLinkedList}