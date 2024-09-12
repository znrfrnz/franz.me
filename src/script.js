const header = document.querySelector('.header');
const drag = document.getElementById('drag');
const minButton = document.querySelector('.minButton');
const content = document.querySelector('.content');
// intro draggable and hide //
    header.addEventListener('mousedown', function(e) {
      e.preventDefault();
      
      const offsetX = e.clientX - drag.getBoundingClientRect().left;
      const offsetY = e.clientY - drag.getBoundingClientRect().top;

      function onMouseMove(e) {
        drag.style.left = `${e.clientX - offsetX}px`;
        drag.style.top = `${e.clientY - offsetY}px`;
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    minButton.addEventListener('click', function() {
      if (drag.classList.contains('minimized')) {
         drag.classList.remove('minimized');
         content.style.display = 'block';
      } else {
         drag.classList.add('minimized');
         content.style.display = 'none';
      }
   });

//dangerBTN drag//
const dangerBTN = document.getElementById('danger');
const bsod = document.getElementById('bsod');

   if (localStorage.getItem('bsodShown') === 'false') {
      bsod.style.display = 'flex';
      enterFullscreen(bsod);
   }

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
      
   dangerBTN.addEventListener('click', function() {
         bsod.style.display = 'flex';
         localStorage.setItem('bsodShown', 'true');
         enterFullscreen(bsod);
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