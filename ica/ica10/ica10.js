let box = document.querySelector('.box');
box.addEventListener('click', changeColor);
box.addEventListener('click', moveHello);
        
function randomNumber(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
            
        return('rgb(' + r + ', ' + g + ', ' + b + ')');
    }
        
function changeColor() {
        let col = randomNumber();
        let colString = "background-color: " + col + ";";
        console.log(colString);
        box.style = colString;
    }

    function moveHello() {
        // get the string
        let hello = document.querySelector('.name');
        
        // get screen dimensions to keep the element on screen
        let maxX = window.innerWidth - hello.offsetWidth;
        let maxY = window.innerHeight - hello.offsetHeight;
        
        // generate random positions within the window boundaries
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        
        // position
        hello.style.position = 'absolute';
        hello.style.left = randomX + 'px';
        hello.style.top = randomY + 'px';
        
        // transition 
        hello.style.transition = 'all 0.5s ease';
    }