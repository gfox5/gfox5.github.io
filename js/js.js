 // Variables
 let phoneNumber = "";
 let noCount = 0;
 let editCount = 0;
 const maxEditCount = 5;
 const noThreshold = 5;  // How many "No" clicks before allowing edits
 let extraAttemptsUsed = 0;
 const maxExtraAttempts = 3;
 let timerActive = false;
 let editingEnabled = false;
 
 // DOM Elements
 const phoneDisplay = document.getElementById("phone-display");
 const yesBtn = document.getElementById("yes-btn");
 const noBtn = document.getElementById("no-btn");
 const editContainer = document.getElementById("edit-container");
 const digitSelector = document.getElementById("digit-selector");
 const newDigit = document.getElementById("new-digit");
 const applyBtn = document.getElementById("apply-btn");
 const noCountDisplay = document.getElementById("no-count");
 const editCountDisplay = document.getElementById("edit-count");
 const errorMessage = document.getElementById("error-message");
 const extraAttemptsInfo = document.getElementById("extra-attempts-info");
 const modal = document.getElementById("modal");
 const closeModal = document.querySelector(".close-modal");
 const timerContainer = document.getElementById("timer-container");
 const secondsLeft = document.getElementById("seconds-left");
 const timerProgress = document.getElementById("timer-progress");
 const finalNumber = document.getElementById("final-number");
 
 // Initialize
 function initialize() {
     generateRandomNumber();
     populateDigitSelector();
     setupEventListeners();
     updateDisplay();
 }
 
 // Generate random 10-digit number
 function generateRandomNumber() {
     phoneNumber = "";
     for (let i = 0; i < 10; i++) {
         phoneNumber += Math.floor(Math.random() * 10).toString();
     }
 }
 
 // Format phone number for display
 function formatPhoneNumber(number) {
     return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
 }
 
 // Populate digit selector dropdown
 function populateDigitSelector() {
     digitSelector.innerHTML = '<option value="">Select which digit to change...</option>';
     for (let i = 0; i < 10; i++) {
         const option = document.createElement("option");
         option.value = i;
         option.textContent = `Digit ${i+1}: ${phoneNumber[i]}`;
         digitSelector.appendChild(option);
     }
 }
 
 // Update display elements
 function updateDisplay() {
     phoneDisplay.textContent = formatPhoneNumber(phoneNumber);
     noCountDisplay.textContent = noCount;
     editCountDisplay.textContent = editCount;
     
     // Show extra attempts info if we have used any
     if (extraAttemptsUsed > 0) {
         extraAttemptsInfo.style.display = "block";
         extraAttemptsInfo.textContent = `Extra attempts used: ${extraAttemptsUsed} / ${maxExtraAttempts}`;
     } else {
         extraAttemptsInfo.style.display = "none";
     }
 }
 
 // Show error message
 function showError(message) {
     errorMessage.textContent = message;
     errorMessage.style.display = "block";
     
     // Clear error after 3 seconds
     setTimeout(() => {
         errorMessage.style.display = "none";
     }, 3000);
 }
 
 // Highlight a digit in the phone display
 function highlightDigit(index) {
     const formattedNumber = formatPhoneNumber(phoneNumber);
     let displayHTML = "";
     
     // Account for formatting characters in the string
     let actualIndex = index;
     if (index >= 3) actualIndex += 1; // After first parenthesis
     if (index >= 6) actualIndex += 1; // After second parenthesis
     if (index >= 6) actualIndex += 1; // After the space
     
     for (let i = 0; i < formattedNumber.length; i++) {
         if (i === actualIndex) {
             displayHTML += `<span class="digit-highlight">${formattedNumber[i]}</span>`;
         } else {
             displayHTML += formattedNumber[i];
         }
     }
     
     phoneDisplay.innerHTML = displayHTML;
     
     // Clear highlight after 2 seconds
     setTimeout(() => {
         phoneDisplay.textContent = formattedNumber;
     }, 2000);
 }
 
 // Apply shake animation to element
 function shakeElement(element) {
     element.classList.add("shake");
     
     // Remove the class after the animation completes
     setTimeout(() => {
         element.classList.remove("shake");
     }, 500);
 }
 
 // Start timer for extra attempt
 function startTimer(seconds) {
     if (timerActive) return; // Prevent multiple timers
     
     timerActive = true;
     timerContainer.style.display = "block";
     secondsLeft.textContent = seconds;
     timerProgress.style.width = "0%";
     
     let timeLeft = seconds;
     const interval = 100; // Update every 100ms 
     const steps = seconds * (1000 / interval);
     let currentStep = 0;
     
     const timer = setInterval(() => {
         currentStep++;
         const progress = (currentStep / steps) * 100;
         timerProgress.style.width = progress + "%";
         
         if (currentStep % (1000 / interval) === 0) {
             timeLeft--;
             secondsLeft.textContent = timeLeft;
         }
         
         if (currentStep >= steps) {
             clearInterval(timer);
             timerContainer.style.display = "none";
             timerActive = false;
             
             // Grant an extra edit attempt
             if (extraAttemptsUsed < maxExtraAttempts) {
                 extraAttemptsUsed++;
                 editCount--; // Decrease edit count to give an extra attempt
                 updateDisplay();
                 showError("You got an extra attempt!");
                 
                 // Re-enable edit container if it was hidden
                 editContainer.style.display = "block";
             }
         }
     }, interval);
 }
 
 // Reset everything
 function resetPhoneNumber() {
     noCount = 0;
     editCount = 0;
     extraAttemptsUsed = 0;
     editingEnabled = false;
     generateRandomNumber();
     populateDigitSelector();
     updateDisplay();
     editContainer.style.display = "none";
 }
 
 // Setup event listeners
 function setupEventListeners() {
     // Yes button
     yesBtn.addEventListener("click", function() {
         // Show success message and end the app
         finalNumber.textContent = `Phone Number: ${formatPhoneNumber(phoneNumber)}`;
         modal.style.display = "flex";
     });
     
     // No button
     noBtn.addEventListener("click", function() {
         noCount++;
         updateDisplay();
         
         if (noCount % noThreshold === 0) {
             // Every 5 no clicks, show edit container
             editingEnabled = true;
             editContainer.style.display = "block";
             showError("You can now edit a digit in the phone number.");
         } else {
             // Shake the display to show rejection
             shakeElement(phoneDisplay);
             
             // Generate a new random number
             generateRandomNumber();
             populateDigitSelector();
             updateDisplay();
         }
     });
     
     // Apply button for editing a digit
     applyBtn.addEventListener("click", function() {
         if (!editingEnabled) {
             showError("Editing is not enabled yet. Press 'No' more times.");
             return;
         }
         
         const selectedIndex = digitSelector.value;
         const newValue = newDigit.value;
         
         if (selectedIndex === "" || !/^[0-9]$/.test(newValue)) {
             showError("Please select a digit position and enter a valid digit (0-9).");
             return;
         }
         
         // Update the phone number
         let updatedNumber = phoneNumber.split('');
         updatedNumber[selectedIndex] = newValue;
         phoneNumber = updatedNumber.join('');
         
         // Highlight the changed digit
         highlightDigit(parseInt(selectedIndex));
         
         // Update UI
         populateDigitSelector();
         
         // Increment edit count
         editCount++;
         updateDisplay();
         
         // Clear inputs
         digitSelector.selectedIndex = 0;
         newDigit.value = "";
         
         // Check if we've reached the max edit count
         if (editCount >= maxEditCount) {
             // Check if we can offer an extra attempt
             if (extraAttemptsUsed < maxExtraAttempts) {
                 // Offer a waiting period for an extra attempt
                 showError("You've used all your attempts. Wait for an extra one!");
                 startTimer(10); // 10 second wait
                 
                 // Hide edit container until extra attempt is granted
                 editContainer.style.display = "none";
             } else {
                 // No more extra attempts available, reset everything
                 editContainer.style.display = "none";
                 showError("You've used all your edit attempts including extras. Starting over with a new number.");
                 
                 // After a short delay, reset everything
                 setTimeout(() => {
                     resetPhoneNumber();
                 }, 2000);
             }
         }
     });
     
     // Digit selector change
     digitSelector.addEventListener("change", function() {
         if (this.value !== "") {
             // Highlight the selected digit
             highlightDigit(parseInt(this.value));
             
             // Focus on the input field
             newDigit.focus();
         }
     });
     
     // Close modal
     closeModal.addEventListener("click", function() {
         modal.style.display = "none";
         // Reset the application
         resetPhoneNumber();
     });
     
     // New digit input validation and auto-apply
     newDigit.addEventListener("input", function() {
         this.value = this.value.replace(/[^0-9]/g, '');
         
         // Auto-apply if a digit is entered and a position is selected
         if (this.value.length === 1 && digitSelector.value !== "") {
             applyBtn.click();
         }
     });
     
     // Allow Enter key to apply changes
     newDigit.addEventListener("keydown", function(e) {
         if (e.key === "Enter" && this.value.length === 1 && digitSelector.value !== "") {
             applyBtn.click();
         }
     });
 }
 
 // Initialize on page load
 window.onload = initialize;