
const app = document.getElementById("app");
const video = document.querySelector(".video");
const audio = document.querySelector(".sound");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; 
let currentTime = duration;
let timer;
let isPlaying = false;


audio.src = "Sounds/beach.mp3";
video.src = "Sounds/beach.mp4";
video.play();


playButton.addEventListener("click", () => {
  if (!isPlaying) {
    playMeditation();
  } else {
    pauseMeditation();
  }
});

function playMeditation() {
  isPlaying = true;
  playButton.textContent = "Pause";
  audio.play();
  video.play();

  timer = setInterval(() => {
    currentTime--;
    updateDisplay();
    if (currentTime <= 0) {
      pauseMeditation();
      currentTime = duration;
    }
  }, 1000);
}

function pauseMeditation() {
  isPlaying = false;
  playButton.textContent = "Play";
  audio.pause();
  video.pause();
  clearInterval(timer);
}

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "smaller-mins") duration = 120;
    if (button.id === "medium-mins") duration = 300;
    if (button.id === "long-mins") duration = 600;

    currentTime = duration;
    updateDisplay();
  });
});


soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const videoSrc = button.getAttribute("data-video");

    audio.src = sound;
    video.src = videoSrc;

    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});


updateDisplay();
