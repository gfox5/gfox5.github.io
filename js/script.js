let gameStarted = false;
let currentPosition = 0;
let enteredNumber = [];
let activeNumbers = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNumber() {
      if (!gameStarted) return;

      const numberBtn = document.createElement('button');
      numberBtn.className = 'number-button';

      const digit = random(0, 9).toString();
      numberBtn.textContent = digit;

      // random position on screen
      const x = random(50, window.innerWidth - 100);
      const y = random(150, window.innerHeight - 150);

      numberBtn.style.left = x + 'px';
      numberBtn.style.top = y + 'px';

      numberBtn.onclick = function() {
          clickNumber(digit, numberBtn);
      };
      
      document.body.appendChild(numberBtn);
      activeNumbers.push(numberBtn);

      // remove number after 2 seconds
      setTimeout(() => {
          if (numberBtn.parentNode) {
              document.body.removeChild(numberBtn);
              activeNumbers = activeNumbers.filter(btn => btn !== numberBtn);
          }
      }, 2000);
  }


  function clickNumber(digit, button) {
      // any digit clicked gets added to the phone number
      button.style.background = '#44ff44';
      enteredNumber.push(digit);
      currentPosition++;
      updateDisplay();

      // remove this button immediately
      setTimeout(() => {
          if (button.parentNode) {
              document.body.removeChild(button);
              activeNumbers = activeNumbers.filter(btn => btn !== button);
          }
      }, 200);

      // check if done (10 digits)
      if (currentPosition >= 10) {
          const phoneNumber = enteredNumber.join('');
          alert(`Thank you! Your phone number ${phoneNumber} has been submitted!`);
          resetGame();
      }
  }

  function updateDisplay() {
      let progressText = '';
      for (let i = 0; i < 10; i++) {
          if (i < enteredNumber.length) {
              progressText += enteredNumber[i] + ' ';
          } else {
              progressText += '_ ';
          }
      }
      document.getElementById('progress').textContent = progressText;
  }

  function startGame() {
      gameStarted = true;
      currentPosition = 0;
      updateDisplay();
      
      // spawn numbers every 800ms
      gameInterval = setInterval(createNumber, 800);
  }

  function resetGame() {
      gameStarted = false;
      currentPosition = 0;
      enteredNumber = [];
      clearInterval(gameInterval);

      // remove all active number buttons
      activeNumbers.forEach(btn => {
          if (btn.parentNode) {
              document.body.removeChild(btn);
          }
      });
      activeNumbers = [];
      
      updateDisplay();
  }



  updateDisplay();