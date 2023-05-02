const workDetails = document.getElementById('work-details');
const playGif = document.getElementById('play-gif');

workDetails.addEventListener('toggle', () => {
  if (workDetails.open) {
    playGif.style.display = 'block';

    setTimeout(() => {
      window.location.href = 'mywork.html';
    }, 6000);
  } else {
    playGif.style.display = 'none';
  }
});
