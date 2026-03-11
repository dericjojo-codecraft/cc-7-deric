// Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

const vow = ["a","e","i","o","u"];
// const alphabets = "Hello world".split("");
const alphabets = Array(26).fill('').map((curr, indx) => String.fromCharCode(indx+97));

const sortedObj = alphabets.reduce((acc, curr) => {
    if(vow.includes(curr.toLowerCase())) {acc.vowels.push(curr)}
    else {acc.consonants.push(curr)}
    return acc;
}, { vowels: [] as string[], consonants: []  as string[]})

console.log(sortedObj)