// Select the new quote button using a querySelector. Assign it to a new variable.
const newQuote = document.querySelector("#js-new-quote");
// Write an event listener to check if the button is clicked. When the button is clicked, run a function called "getQuote".
newQuote.addEventListener('click', getQuote);
// Write the function declaration, and check the button click works by returning a message in the console everytime the button is clicked.
let json = ' ';
async function getQuote() {
    // console.log("testing getQuote");
    try {
        //await says wait for the fetch, if we get something we can add it to response
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }

        json = await response.json();
        //console.log(json.question);
        //console.log(json.answer);
        displayQuote(json.question);
    } catch (err) {
        console.log(err);
        alert('failed to fetch new trivia');
    }
}

const answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', displayAnswer);

// async function getAnswer() {
//     // console.log("testing getQuote");
//     try {
//         //await says wait for the fetch, if we get something we can add it to response
//         const response = await fetch(endpoint);
//         if (!response.ok) {
//             throw Error(response.statusText);
//         }

//         const json = await response.json();
//         //console.log(json.question);
//         //console.log(json.answer);
//         displayQuote(json.answer);
//     } catch (err) {
//         console.log(err);
//         alert('failed to fetch new trivia');
//     }
// }

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

// function displayAnswer(tweet) {
//     const quoteText = document.querySelector('#js-tweet');
//     quoteText.textContent = tweet;
// }

function displayAnswer() {
    const answerText = json.answer;
    const answerArea = document.querySelector('#js-tweet');
    answerArea.textContent = answerText;
}




// Add a new variable that holds the API endpoint: 
// https://trivia.cyberwisp.com/getrandomchristmasquestion
const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion"

// Change the getQuote function to use the fetch method to get a random quote from that endpoint.

// If successful, output the quote to the console

// If it fails, output an error message to the console AND via alert

// Write a second function called "displayQuote" that will display the text of a fetched quote in the HTML element with an id of js-quote-text.

// Adjust getQuote to run displayQuote at the proper place in the code.

// Notice when you refresh that a quote isn't displayed. Fix that.
