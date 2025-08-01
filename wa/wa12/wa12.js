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
        displayQuote(json.message);
    } catch (err) {
        console.log(err);
        alert('failed to fetch new trivia');
    }
}

//  const answerBtn = document.querySelector('#js-tweet');
//  answerBtn.addEventListener('click', displayAnswer);



 function displayQuote(imageUrl) {
    const quoteText = document.querySelector('#js-quote-text');
    const answerText = document.querySelector('#js-answer-text');
     quoteText.innerHTML = ' ';

     //img element
     const img = document.createElement('img');
     img.src = imageUrl;
     img.alt = "Random dog picture";
     img.style.maxWidth = '100%';
     img.style.height = 'auto';
     img.style.borderRadius = '10px';
    
     quoteText.appendChild(img);

     const urlParts = imageUrl.split('/');
     const breedPart = urlParts[4];
     let breedName = breedPart;
    
     if (breedName.includes('-')) {
        breedName = breedName.split('-')[0];
     }
    
    answerText.textContent = breedName;
 }



//  function displayAnswer() {
//     const answerText = json.answer;
//      const answerArea = document.querySelector('#js-tweet');
//      answerArea.textContent = answerText;
//  }





// Add a new variable that holds the API endpoint: 
// https://trivia.cyberwisp.com/getrandomchristmasquestion
const endpoint = "https://dog.ceo/api/breeds/image/random";

getQuote();