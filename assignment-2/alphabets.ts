// Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

const vow = ["a","e","i","o","u"];
const alphabets = ['a', 'b', 'c', 'd', 'e'];
let obj:{vowels: Array<string>, consonants: Array<string>} = {
    vowels: [],
    consonants: []
}

alphabets.forEach(alpha => {
    if(vow.includes(alpha)) {
        obj.vowels.push(alpha)
    } else {
        obj.consonants.push(alpha);
    }
})

//console.log(obj)