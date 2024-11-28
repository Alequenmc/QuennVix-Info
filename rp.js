
const volumeSlider = document.getElementById('volumeSlider');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
let isPlaying = false;

volumeSlider.addEventListener('input', (e) => {
const value = e.target.value;
e.target.style.background = `linear-gradient(to right, #4a90e2 0%, #4a90e2 ${value}%, #374151 ${value}%, #374151 100%)`;
});

playPauseBtn.addEventListener('click', () => {
isPlaying = !isPlaying;
if (isPlaying) {
    playPauseIcon.classList.remove('ri-pause-line');
    playPauseIcon.classList.add('ri-play-line');
} else {
    playPauseIcon.classList.remove('ri-play-line');
    playPauseIcon.classList.add('ri-pause-line');
}
});
volumeSlider.style.background = `linear-gradient(to right, #4a90e2 0%, #4a90e2 50%, #374151 50%, #374151 100%)`;