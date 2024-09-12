const header = document.querySelector('.header');
const drag = document.getElementById('drag');
const minButton = document.querySelector('.minButton');
const content = document.querySelector('.content');

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
      // if (drag.classList.contains('minimized')) {
      //    drag.classList.remove('minimized');
      //    content.style.display = 'block';
      // } else {
      //    drag.classList.add('minimized');
      //    content.style.display = 'none';
      // }
      drag.classList.toggle('minimized');
      minButton.classList.add('enlarge');
    setTimeout(() => {
      minButton.classList.remove('enlarge');
    }, 50); // Match the duration of the animation
  });
