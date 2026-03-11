import assert from "node:assert"

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`

const items = purchases.split("\n").filter((line, index) => {
    if(index === 0) {return line};
    if(!line.includes("4")) {return line};
}).map((line) => {
    const [item, quantity] = line.split(" ");
    const newQuantity = (Number(quantity)+10).toString();
    return item+" "+newQuantity;
})

assert.strictEqual(items.length, 4, "Header + 3 items without '4' should remain");

assert.strictEqual(items[0], "items NaN", "Header quantity 'qty' becomes NaN when incremented");

assert.ok(!items.some(line => line.startsWith("apple")), "apple should be filtered (contains '4')");
assert.ok(!items.some(line => line.startsWith("guava")), "guava should be filtered (contains '4')");

assert.strictEqual(items[1], "mango 60", "mango qty 50 should become 60");
assert.strictEqual(items[2], "onion 41", "onion qty 31 should become 41");
assert.strictEqual(items[3], "water 20", "water qty 10 should become 20");

console.log("All assertions passed!");