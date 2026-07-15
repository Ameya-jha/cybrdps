const audio = document.getElementById('bg-audio');
const toggleBtn = document.getElementById('audio-toggle');
const playIcon = toggleBtn.querySelector('.icon-play');
const pauseIcon = toggleBtn.querySelector('.icon-pause');

toggleBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {
      // Placeholder file may not exist yet — swap in a real audio file to enable playback.
      console.warn('Add a real audio file at audio/placeholder.mp3 (or update the src) to enable playback.');
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  toggleBtn.setAttribute('aria-pressed', 'true');
  toggleBtn.setAttribute('aria-label', 'Pause audio');
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
});

audio.addEventListener('pause', () => {
  toggleBtn.setAttribute('aria-pressed', 'false');
  toggleBtn.setAttribute('aria-label', 'Play audio');
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
});
