export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

const link = 'https://jsonplaceholder.typicode.com/posts/';

const cache = new Map();

export async function fetchPost(id = 1) {
    if (cache.has(id)) {
      return cache.get(id);
    }

    const response = await fetch(link + id);
    if (!response.ok) { throw new Error(`Couldn't get post: ${response.status}`); }
    const data = await response.json();
    cache.set(id, data);
    return data;
}

export async function fetchComments(id = 1, count = 2) {
    const response = await fetch(link + id + "/comments");
    if (!response.ok) { throw new Error(`Couldn't get comments: ${response.status}`); }
    const data = await response.json();
    return data.slice(0, Math.min(count, data.length));
}