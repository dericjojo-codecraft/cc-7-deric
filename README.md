# cc-7-deric

> A hands-on TypeScript curriculum repo documenting the journey through data structures, algorithms, functional programming, async patterns, and a full Vite web app — built during the **CodeCraft** programme.

[![CI](https://github.com/dericjojo-codecraft/cc-7-deric/actions/workflows/ci.yaml/badge.svg)](https://github.com/dericjojo-codecraft/cc-7-deric/actions/workflows/ci.yaml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vitest](https://img.shields.io/badge/tested%20with-vitest-6e9f18?logo=vitest)
![ESLint](https://img.shields.io/badge/linted%20with-eslint-4B32C3?logo=eslint)
![Node](https://img.shields.io/badge/node-%3E%3D20-green?logo=node.js)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Assignment Breakdown](#-assignment-breakdown)
- [Data Structures](#-data-structures)
- [Dijkstra's Two-Stack Evaluator](#-dijkstras-two-stack-evaluator)
- [Post Browser App](#-post-browser-app)
- [Javascript Drumkit](#-javascript-drumkit)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Tech Stack](#-tech-stack)

---

## 🗺 Overview

This repo tracks a structured progression across three assignments:

| Assignment | Focus | Key Concepts |
|---|---|---|
| `assignment-1` | Foundations + Data Structures | Arrays, strings, LinkedList, Stack, expression evaluation |
| `assignment-2` | Functional Programming | `map`, `filter`, `reduce`, HOFs, closures, predicates |
| `assignment-3` | Async, DOM & Apps | Promises, `async/await`, fs API, fetch, Post Browser, Drumkit |

---

## 📂 Assignment Breakdown

<details>
<summary><strong>Assignment 1 — Foundations & Data Structures</strong></summary>

### Initial Problems
A set of warm-up exercises covering core TypeScript patterns:

- **`oddOrEven.ts`** — generate n odd or even numbers
- **`decimalToBinary.ts`** — decimal → binary string conversion
- **`dayOfWeek.ts`** — map 3-char day names to index 0–6
- **`nonRepeatSubs.ts`** — first non-repeating character substring
- **`paddingZeroes.ts`** — zero-pad numbers to a minimum digit width
- **`addArray.ts`** — element-wise addition with unequal length support
- **`perfectSquares.ts`** — generate first n perfect squares
- **Heart patterns** — triangle generators using `💚` and `💙` emojis

### LinkedList & Stack

Full class-based implementations using private fields (`#head`, `#tail`, `#__items`) with comprehensive Vitest test suites covering construction, mutation, edge cases, and generics.

### Expression Evaluator

Dijkstra's Two-Stack Algorithm — see [dedicated section below](#-dijkstras-two-stack-evaluator).

</details>

<details>
<summary><strong>Assignment 2 — Functional Programming</strong></summary>

Focused on mastering higher-order functions through real-world data manipulation:

| File | What it does |
|---|---|
| `employees.ts` | Salary totals, full names, email strings via `reduce` |
| `quotes.ts` | Group by author, case-insensitive search, deduplication |
| `mapFilterUsingReduce.ts` | Custom `map` and `filter` built entirely on `reduce` |
| `predicate.ts` | `some()` implemented both imperatively and functionally |
| `secondLargest.ts` | Second largest with `forEach` and `reduce` |
| `fruits.ts` | Filter + transform multi-line string data |
| `fibo.ts` | Fibonacci values via `map` |
| `hof.ts` | Closure-based cutoff function (higher-order function) |
| `alphabets.ts` | Split alphabet into vowels/consonants with `reduce` |
| `emails.ts` | Regex-based email extraction and normalisation |
| `nutritionOfFood.ts` | Filter, classify, and cross-reference food ingredients |

</details>

<details>
<summary><strong>Assignment 3 — Async, Promises & Web Apps</strong></summary>

### Promise & async/await patterns

Three progressive implementations of the same file-system API:

| File | Style |
|---|---|
| `filesBasedPromises.ts` | Callback-based `fs` wrapped in Promises |
| `filesBasedPromises2.ts` | Promise chaining with `.then()` |
| `asyncAwait.ts` | Clean `async/await` style |

All three implement `getFileType`, `getContents`, and `getSize` — fully tested in `asyncTest.test.ts` using a temp directory created with `beforeAll`.

### Fetch & Users

`users.ts` — `getUsers()` fetches from JSONPlaceholder with a configurable delay, mock-tested with `vi.stubGlobal`.

### Post Browser (Vite App)

See [Post Browser App section](#-post-browser-app) below.

### Javascript Drumkit

See [Javascript Drumkit section](#-javascript-drumkit) below.

</details>

---

## 🛠 Data Structures

### LinkedList

```ts
const list = new LinkedList<number>();
list.addAtEnd(10);
list.addAtHead(5);
list.valueAtHead();               // 5
list.valueAtTail();               // 10
list.searchFor(10, (a, b) => a === b); // 1
list.length();                    // 2
list.removeFromHead();            // 5
```

```mermaid
graph LR
  HEAD["Head: 5"] --> N1["Node: 10"] --> TAIL["null"]
```

| Method | Description | Complexity |
|---|---|---|
| `addAtHead(t)` | Prepend a node | O(1) |
| `addAtEnd(t)` | Append a node | O(1) |
| `removeFromHead()` | Remove & return head value | O(1) |
| `removeFromEnd()` | Remove & return tail value | O(n) |
| `searchFor(t, fn)` | Find index by comparator | O(n) |
| `valueAtIndex(i)` | Get value at position | O(n) |
| `length()` | Count all nodes | O(n) |

### Stack

Built on top of `LinkedList` using a private field `#__items`:

```ts
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.top();  // 2  ← peek without removing
stack.pop();  // 2
stack.top();  // 1
```

```mermaid
graph TB
  T["top = 2"] --> N2["2 - last pushed"]
  N2 --> N1["1 - first pushed"]
  N1 --> B["base"]
```

| Method | Description | Complexity |
|---|---|---|
| `push(item)` | Add to top | O(1) |
| `pop()` | Remove & return top | O(1) |
| `top()` | Peek at top without removing | O(1) |

---

## 🧮 Dijkstra's Two-Stack Evaluator

Evaluates arithmetic expressions respecting operator precedence and parentheses — using two stacks internally.

### Algorithm flow

```mermaid
flowchart TD
  A[Read next token] --> B{Token type?}
  B -->|Number| C[Push to numStack]
  B -->|Operator| D{Higher-precedence op on opStack?}
  D -->|Yes| E[Apply that op first then push new op]
  D -->|No| F[Push to opStack]
  B -->|Open paren| G[Push open-paren to opStack]
  B -->|Close paren| H[Apply ops until open-paren then discard it]
  C --> J{More tokens?}
  E --> J
  F --> J
  G --> J
  H --> J
  J -->|Yes| A
  J -->|No| K[Apply remaining ops]
  K --> L[numStack top = result]
```

### Worked example

```
Expression:  5 * ( 6 + 2 ) - 12 / 4

numStack   opStack   Action
─────────────────────────────────────
[5]        [*]       read 5, then *
[5]        [*, (]    read (
[5,6]      [*, (, +] read 6, then +
[5,6,2]    [*, (, +] read 2
[5,8]      [*]       ) triggers: 6+2=8, pop (
[40]       [-]       * applied: 5*8=40, then read -
[40,12]    [-, /]    read 12, then / (higher prec than -)
[40,3]     [-]       / applied: 12/4=3
[37]       []        end: - applied: 40-3=37

Result: 37 ✓
```

### Usage

```ts
evaluateExpression("2 + 3")                    // 5
evaluateExpression("( 2 + 3 ) * 4")            // 20
evaluateExpression("5 * ( 6 + 2 ) - 12 / 4")  // 37
evaluateExpression("a * 3")                    // undefined — invalid token
evaluateExpression("5 +")                      // undefined — malformed
evaluateExpression("")                         // undefined — empty string
```

---

## 🥁 Javascript Drumkit

A TypeScript drumkit application built around a **pure reducer** for state management and a **`Player` class** for timeline playback — including pause-aware scheduling.

### Core types (`types.ts`)

```ts
// A recorded keypress
interface Beat {
  type: "BEAT";
  key: string;
  timestamp: number;
}

// Bookend a recorded pause
type Pause = {
  type: "PAUSE_START" | "PAUSE_STOP";
  timestamp: number;
}

// A full recording session
interface Session {
  beats: (Beat | Pause)[];
}
```

### State machine — `reducer.ts`

The app state is managed by a pure reducer with five modes:

```mermaid
stateDiagram-v2
  [*] --> NORMAL
  NORMAL --> RECORDING_PROGRESS : START_RECORDING
  RECORDING_PROGRESS --> NORMAL : STOP_RECORDING
  RECORDING_PROGRESS --> RECORDING_PAUSED : PAUSE_RECORDING
  RECORDING_PAUSED --> RECORDING_PROGRESS : CONTINUE_RECORDING
  NORMAL --> PLAYBACK_PROGRESS : START_PLAYBACK
  PLAYBACK_PROGRESS --> NORMAL : STOP_PLAYBACK
  PLAYBACK_PROGRESS --> PLAYBACK_PAUSED : PAUSE_PLAYBACK
  PLAYBACK_PAUSED --> PLAYBACK_PROGRESS : CONTINUE_PLAYBACK
```

The `BEAT` action only appends to the session when in `RECORDING_PROGRESS` — all other modes are no-ops, keeping recordings immutable and predictable.

### Timeline playback — `player.ts`

The `Player` class handles scheduling beats in real time, stripping out pause durations so playback sounds identical to the original performance.

```ts
const player = new Player(session, (beat) => {
  playSound(beat.key); // your audio engine
});

player.playTimeline();   // start / resume
player.pauseTimeline();  // freeze, preserves beat index
player.resetTimeline();  // return to beginning
```

**How pause-stripping works:**

```mermaid
flowchart LR
  A["Beat A\nt=1000ms"] --> PS["PAUSE_START\nt=5000ms"]
  PS --> PE["PAUSE_STOP\nt=10000ms"]
  PE --> B["Beat B\nt=11000ms"]

  A2["Beat A fires\nat 1000ms"] --> B2["Beat B fires\nat 6000ms\nnot 11000ms"]
```

The `normalize()` method skips the `PAUSE_START → PAUSE_STOP` gap (5000ms here) when calculating `setTimeout` delays, so Beat B fires 1000ms after Beat A rather than 10000ms.

### Observer pattern

`Player` supports multiple listeners via `subscribe` / `unsubscribe` — useful for updating UI progress bars or beat indicators:

```ts
player.subscribe((beatIndex, totalBeats) => {
  updateProgressBar(beatIndex / totalBeats);
});
```

### File overview

| File | Role |
|---|---|
| `types.ts` | Shared interfaces — `Beat`, `Pause`, `Session`, `Action`, `ApplicationState` |
| `reducer.ts` | Pure state machine — handles all mode transitions and beat recording |
| `player.ts` | Timeline scheduler — normalises pause gaps, manages timers and observers |

---

## 🌐 Post Browser App

A Vite + TypeScript single-page app that browses posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com).

**Live demo:** [post-browser-nine.vercel.app](https://post-browser-nine.vercel.app)

### Features

- Browse all 100 posts with **Previous / Next** navigation
- **Jump to any post** by number with input validation (1–100)
- **View Comments** for the current post on demand
- **Refresh** clears the cache and forces a live re-fetch
- **5-minute TTL cache** via `ModelManager` — avoids redundant API hits

### Architecture

```mermaid
graph LR
  DOM["main.ts DOM controller"] -->|fetchPost| MM["ModelManager"]
  DOM -->|fetchComments| MM
  MM -->|cache hit| CACHE["In-memory Map"]
  MM -->|cache miss| API["JSONPlaceholder API"]
  API --> MM
  MM --> DOM
```

### Run locally

```bash
cd assignment-3/post-browser-vite
npm install
npm run dev      # dev server
npm run build    # production build
npm run preview  # preview production build
```

---

## 🚦 Getting Started

**Prerequisites:** Node.js ≥ 20, TypeScript

```bash
git clone https://github.com/dericjojo-codecraft/cc-7-deric.git
cd cc-7-deric
npm install
```

Run any assignment file directly:

```bash
node assignment-1/initialProblems/oddOrEven.ts
node assignment-2/employees.ts
node assignment-3/users.ts
```

---

## 🧪 Running Tests

```bash
# Watch mode (default)
npx vitest

# Single run with coverage
npx vitest --coverage
```

Tests are written with **Vitest** and cover all major modules including LinkedList, Stack, the expression evaluator, async file utilities, employee/quotes data transforms, the fetch mock, the Drumkit reducer, and the `Player` timeline scheduler. The CI pipeline (GitHub Actions on Node 20) runs lint + tests on every push and PR to `main`.

---

## 🧰 Tech Stack

| Tool | Version | Role |
|---|---|---|
| TypeScript | 5.9 | Primary language |
| Vitest | 4.x | Unit testing framework |
| ESLint + typescript-eslint | 10.x / 8.x | Linting & type-aware rules |
| ts-node | 10.x | Run `.ts` files without compiling |
| Vite | 8.x | Post Browser bundler & dev server |
| Node.js | ≥ 20 | Runtime |
