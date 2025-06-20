const audio = document.querySelector(".audio");
const video = document.querySelector(".video");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let currentTime = duration;
let timer;
let isPlaying = false;

// Format seconds into mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(currentTime);
}

function startTimer() {
  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playButton.textContent = "▶️";
      isPlaying = false;
      audio.pause();
      video.pause();
    }
  }, 1000);
}

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    playButton.textContent = "⏸️";
    audio.play();
    video.play();
    startTimer();
  } else {
    isPlaying = false;
    playButton.textContent = "▶️";
    audio.pause();
    video.pause();
    clearInterval(timer);
  }
});

timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mins = parseInt(btn.textContent);
    duration = mins * 60;
    currentTime = duration;
    updateDisplay();
    if (isPlaying) {
      clearInterval(timer);
      startTimer();
    }
  });
});

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


updateDisplay();
