const introHeader = document.querySelector('.introHeader');
const introTXT = document.getElementById('introTXT');
const minButton = document.querySelector('.minButton');
const contentIntro = document.querySelector('.contentIntro');
// intro introTXTgable and hide //
    introHeader.addEventListener('mousedown', function(e) {
      e.preventDefault();
      
      const offsetX = e.clientX - introTXT.getBoundingClientRect().left;
      const offsetY = e.clientY - introTXT.getBoundingClientRect().top;

      function onMouseMove(e) {
        introTXT.style.left = `${e.clientX - offsetX}px`;
        introTXT.style.top = `${e.clientY - offsetY}px`;
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    minButton.addEventListener('click', function() {
      if (introTXT.classList.contains('minimized')) {
         introTXT.classList.remove('minimized');
         contentIntro.style.display = 'block';
      } else {
         introTXT.classList.add('minimized');
         contentIntro.style.display = 'none';
      }
   });

//dangerBTN introTXT//
const dangerBTN = document.getElementById('danger');
const bsod = document.getElementById('bsod');
const bsodMusic = document.getElementById('bsodmsc'); // Add this line

// Show BSOD function with music
function showBSOD() {
  bsod.style.display = 'flex';
  enterFullscreen(bsod);
  bsodMusic.play(); // Play the music
}

// Check local storage and show BSOD if needed
if (localStorage.getItem('bsodShown') === 'false') {
  showBSOD();
}

// Handle drag functionality for the danger button
dangerBTN.addEventListener('mousedown', function(e) {
  e.preventDefault();
  
  const offsetX = e.clientX - dangerBTN.getBoundingClientRect().left;
  const offsetY = e.clientY - dangerBTN.getBoundingClientRect().top;

  function onMouseMove(e) {
    dangerBTN.style.left = `${e.clientX - offsetX}px`;
    dangerBTN.style.top = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Handle BSOD display on button click
dangerBTN.addEventListener('click', function() {
  showBSOD();
  localStorage.setItem('bsodShown', 'true');
});

// Optional: Handle hiding BSOD and stopping music (if needed)
bsod.addEventListener('click', function() {
  bsod.style.display = 'none';
  bsodMusic.pause(); // Pause the music
  bsodMusic.currentTime = 0; // Reset the music to the start
});


   // bsod.addEventListener('click', function() {
   // });

   function enterFullscreen(element) {
      if (element.requestFullscreen) {
         element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
         element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { 
         element.webkitRequestFullscreen();
       } else if (element.msRequestFullscreen) {
         element.msRequestFullscreen();
       }
     }

// About me // 
const storyHdr = document.querySelector('.storyHdr');
const storyTXT = document.getElementById('storyTXT'); // Correct selector
const minButton2 = document.querySelector('.minButton2');
const contentStory = document.querySelector('.contentStory');

// Story draggable functionality
storyHdr.addEventListener('mousedown', function(e) {
  e.preventDefault();
  
  const offsetX = e.clientX - storyTXT.getBoundingClientRect().left;
  const offsetY = e.clientY - storyTXT.getBoundingClientRect().top;
  
  function onMouseMove(e) {
    storyTXT.style.left = `${e.clientX - offsetX}px`;
    storyTXT.style.top = `${e.clientY - offsetY}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Minimize functionality for storyTXT
minButton2.addEventListener('click', function() {
  if (storyTXT.classList.contains('minimized')) {
    storyTXT.classList.remove('minimized');
    contentStory.style.display = 'block';
  } else {
    storyTXT.classList.add('minimized');
    contentStory.style.display = 'none';
  }
});