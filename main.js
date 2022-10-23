let text = "Ever since I left the city, you, you, you You and me we just don't get along";
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function parseText(text) {
    return ((text.toLowerCase()).replaceAll(regex, '')).split(" ");
    
    // possibly easier to read version:
    // let copy = text.toLowerCase();
    // copy = copy.replaceAll(regex, '');
    // const arr = copy.split(" ");
    // return arr;
}

console.log(parseText(text))

function generateWordPairs(text) {
    //create array of words from given text (removing capitalization and punctuation)
    const keys = parseText(text);
    const wordPairs = {};

    // iterate through the keys array except for the last element,
    // adding the word at each index as keys of the wordPairs object we created with an assigned value of an array containing the word at the next index of the keys array,
    // while also checking to see if the word at the current index of the keys array is already a key of the wordPairs object,
    // and if it is, add the word at the next index of keys to the existing array at wordPairs[currentKey] with the .push method
    // to change how many words deep the Markov Chain goes, just change the 1 in 'i < keys.length - 1' & 'keys[i + 1]' in this function to the number of words deep you want to go
    for (let i = 0; i < keys.length - 1; i++) {
        let currentKey = keys[i];
        let value = keys[i + 1];
        if (wordPairs[currentKey]) {
            wordPairs[currentKey].push(value)
        } else {
            wordPairs[currentKey] = [value];
        }
    }
    return wordPairs;
}

let wordPairs = generateWordPairs(text);
console.log(wordPairs);
    
function writeLine(markovChain, n) {
    let poemLine = '';
    // make an array of the keys from the provided markovChain object
    let keys = Object.keys(markovChain);
    // choose a random word from those keys to start at
    let currentKey = keys[Math.floor(Math.random() * (keys.length))];

    // helper function that checks if the given word is a key of the given markovChain object and if it is, returns a random word inside the array at that key,
    // else it chooses a new random word from the keys of the given markovChain until it has a different word from the word given when the randomize() function was called and returns that new word
    function randomize(word) {
        let randomIndex;
        if (markovChain[word]) {
            randomIndex = Math.floor(Math.random() * markovChain[word].length)
            return markovChain[word][randomIndex];
        } else {
            let newWord = keys[Math.floor(Math.random() * (keys.length))];
            while (newWord === word) {
                newWord =  keys[Math.floor(Math.random() * (keys.length))];
            }
            // for loop alternative:
            // for (let i = newWord; i === word; i = keys[Math.floor(Math.random() * (keys.length))]) {}
            // the while loop felt cleaner in this case
            return newWord
        }
    }

    // chooses a random word from amongst the words in the array at the currentKey of the given markovChain, concatenates the word to the poemLine string variable, then changes the currentKey to the chosen word,
    // repeats n number of times to create a poemLine with n number of words
    for (let i = 0; i < n; i++) {
        let currentWord = randomize(currentKey)
        if (i === n - 1) {
            poemLine += currentWord
        } else {
            poemLine += currentWord + ' ';
        }
        currentKey = currentWord;
    }
    return poemLine;
}

console.log((writeLine(wordPairs, 7)) + '\n');

function generatePoem(wordCorpus, numLines) {
    //creates a Markov Chain object named wordPairs from the given wordCorpus
    let wordPairs = generateWordPairs(wordCorpus);
    let poem = '';

    // chooses random number between 4 and 9 and uses that number as the number of words to give the writeLine() function and concatenates the result plus a line break to the poem string variable,
    // repeats until it reaches the last line based on the given numLines value at which point it still concatenates the new line but not the line break
    for (let i = 0; i < numLines; i++) {
        let numWords = Math.floor(Math.random() * 6) + 4;
        if (i === numLines - 1) {
            poem += writeLine(wordPairs, numWords); 
        } else {
            poem += writeLine(wordPairs, numWords) + '\n';
        }
    }
    return poem
}

debugger;
console.log((generatePoem(text, 5)) + '\n');
console.log(generatePoem('This is some random text to do some testing of this poem generator. Is it okay to add other punctuations like this:;!?', 7));
