// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('on');
  document.body.classList.toggle('light');
});

// Background audio: always on, looping.
// Browsers block autoplay-with-sound until the user interacts with the page,
// so we force playback on the first click/keypress/touch anywhere on the page
// as a fallback in case autoplay was blocked on load.
const bgAudio = document.getElementById('bgAudio');

function ensurePlaying() {
  if (bgAudio && bgAudio.paused) {
    bgAudio.play().catch(() => {});
  }
}

window.addEventListener('load', ensurePlaying);
['click', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, ensurePlaying, { once: true });
});
