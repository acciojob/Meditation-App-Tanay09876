const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 minutes
let timer;
let isPlaying = false;

// Update time display
function updateDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Toggle play/pause
playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    playButton.textContent = "Pause";
    isPlaying = true;

    const start = Date.now();
    timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const timeLeft = duration - elapsed;
      if (timeLeft <= 0) {
        clearInterval(timer);
        audio.pause();
        audio.currentTime = 0;
        video.pause();
        video.currentTime = 0;
        playButton.textContent = "Play";
        isPlaying = false;
        updateDisplay(duration);
      } else {
        updateDisplay(timeLeft);
      }
    }, 1000);
  } else {
    audio.pause();
    video.pause();
    playButton.textContent = "Play";
    clearInterval(timer);
    isPlaying = false;
  }
});

// Change duration
timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    duration = parseInt(btn.getAttribute("data-time"));
    updateDisplay(duration);
  });
});

// Switch sounds/videos
soundButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newSound = btn.getAttribute("data-sound");
    const newVideo = btn.getAttribute("data-video");

    audio.src = newSound;
    video.src = newVideo;

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

// Initial display
updateDisplay(duration);
