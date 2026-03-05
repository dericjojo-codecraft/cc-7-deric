# cc-7-deric

A dedicated repository for mastering data structures and algorithms during the **CodeCraft** curriculum. This project documents the transition from basic functional logic to robust, class-based implementations in TypeScript.

---

## 🚀 Overview

This repository contains my solutions and practice problems, focusing on clean code, object-oriented principles, and efficient data structures.

### Key Features
* **Class-Based Architecture:** Full implementation of `ListNode`, `LinkedList`, and `Stack` using modern TypeScript classes.
* **Encapsulation:** Utilizes private class fields (`#items`) to ensure data integrity.
* **Expression Evaluation:** A practical implementation of **Dijkstra’s Two-Stack Algorithm** to parse and solve mathematical expressions.

---

## 🛠️ Data Structures Implemented

| Structure | Key Methods | Complexity |
| :--- | :--- | :--- |
| **LinkedList** | `addAtHead`, `removeFromHead`, `valueAtTail` | O(1) for head ops |
| **Stack** | `push`, `pop`, `peek`, `isEmpty` | O(1) LIFO |

---

## 🧮 Expression Evaluation

The project includes an evaluator that uses two stacks (one for operands and one for operators) to process expressions.

**Algorithm Logic:**
1. **Value Stack:** Pushes numbers onto the stack.
2. **Operator Stack:** Pushes operators (+, -, *, /).
3. **Evaluation:** When a closing parenthesis `)` is encountered, it pops the operator and two values, performs the calculation, and pushes the result back onto the value stack.

---

## 🚦 Getting Started

### Prerequisites
* **Node.js** (v24.x or higher recommended)
* **TypeScript**

### Installation
```bash
git clone [https://github.com/DericJojo/cc-7-deric.git](https://github.com/DericJojo/cc-7-deric.git)
cd cc-7-deric
