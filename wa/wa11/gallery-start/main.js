const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['cave-drawing.jpg', 'clouds.jpg', 'cows.jpg', 'flowers.jpg', 'tree.jpg'];
/* Declaring the alternative text for each image file */
const altTexts = {
    'cave-drawing.jpg': 'cave drawings in moab',
    'clouds.jpg': 'white clouds against a blue sky',
    'cows.jpg': 'cows walking through the desert',
    'flowers.jpg': 'pink flower bunch',
    'tree.jpg': 'big oak tree'
  };

/* Looping through images */
for (let i = 0; i < imageFilenames.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${imageFilenames[i]}`);
    newImage.setAttribute('alt', altTexts[imageFilenames[i]]);
    thumbBar.appendChild(newImage);

  // Add click event listener to each thumbnail
  newImage.addEventListener('click', function(e) {
    displayedImage.setAttribute('src', e.target.getAttribute('src'));
    displayedImage.setAttribute('alt', e.target.getAttribute('alt'));
  });
}


/* Darken/Lighten button */
btn.addEventListener('click', function() {
    const currentClass = btn.getAttribute('class');
    
    if (currentClass === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });