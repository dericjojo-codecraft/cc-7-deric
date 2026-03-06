import assert from "node:assert";

/**
 * Can you find the food items that do not contain sugar here? // ["idli", "paneer masala"]
Food items that contain both chilli and oil ?  // ["pizza"]
We need to also generate another array, that will have objects where key is the food name, and value will be  ‘safe’  or ‘unsafe’.   Foods that contain sugar are unsafe, rest are safe.  // [{"idli": "safe"}, {"chapathi": "unsafe"}, {"pizza": "unsafe"}, {"paneer masala": "safe"}]
 */

const foods = [
    { idli: ['rice', 'urad', 'oil', 'cashew', 'water'] },
    { chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
    { pizza: ['maida', 'sugar', 'oil', 'chiili', 'flakes', 'sause'] },
    { 'paneer masala': ['paneer', 'onion', 'tomato', 'garlic', 'oil'] },
];

/**
 * Filters out food items that contain sugar, returning only sugar-free food names.
 * @returns Array of food names that do not contain sugar as an ingredient
 * @example // Returns ['idli', 'paneer masala']
 */
const sugarFree = foods.filter(item => {
    return !Object.values(item).flat().includes('sugar');
}).map((item) => Object.keys(item)[0]);

// sugarFree tests
assert.strictEqual(sugarFree.length, 2, "Should return 2 sugar-free foods");
assert.ok(sugarFree.includes('idli'), "'idli' has no sugar — should be included");
assert.ok(sugarFree.includes('paneer masala'), "'paneer masala' has no sugar — should be included");
assert.ok(!sugarFree.includes('chapathi'), "'chapathi' contains sugar — should be excluded");
assert.ok(!sugarFree.includes('pizza'), "'pizza' contains sugar — should be excluded");

/**
 * Finds food items that contain both chilli and oil as ingredients.
 * @returns Array of food names that contain both 'chiili' and 'oil'
 * @example // Returns ['pizza']
 */
const chilliAndOil = foods.filter(
    item => Object.values(item).flat().includes('chiili')
).filter(item => Object.values(item).flat().includes('oil')).map(item => Object.keys(item)[0]);

// chilliAndOil tests
assert.strictEqual(chilliAndOil.length, 1, "Should return 1 food with both chilli and oil");
assert.ok(chilliAndOil.includes('pizza'), "'pizza' has both chiili and oil — should be included");
assert.ok(!chilliAndOil.includes('idli'), "'idli' has oil but no chilli — should be excluded");

/**
 * Classifies each food item as 'safe' or 'unsafe' based on sugar content.
 * Foods without sugar are 'safe', foods with sugar are 'unsafe'.
 * @returns Array of objects where each key is a food name and value is 'safe' or 'unsafe'
 * @example // Returns [{ idli: 'safe' }, { chapathi: 'unsafe' }, { pizza: 'unsafe' }, { 'paneer masala': 'safe' }]
 */
const safeUnsafe = foods.map(item => {
    const [entry] = Object.entries(item) || [];
    
    if (!entry) return {}; // Safety check

    const [foodName, ingredients] = entry;
    const isSafe = !ingredients.includes('sugar');
    
    return { [foodName]: isSafe ? 'safe' : 'unsafe' };
});

// safeUnsafe tests
assert.strictEqual(safeUnsafe.length, 4, "Should classify all 4 food items");
assert.deepStrictEqual(safeUnsafe[0], { idli: 'safe' }, "'idli' should be safe");
assert.deepStrictEqual(safeUnsafe[1], { chapathi: 'unsafe' }, "'chapathi' should be unsafe");
assert.deepStrictEqual(safeUnsafe[2], { pizza: 'unsafe' }, "'pizza' should be unsafe");
assert.deepStrictEqual(safeUnsafe[3], { 'paneer masala': 'safe' }, "'paneer masala' should be safe");

console.log("All assertions passed!");