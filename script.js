
const video = document.querySelector("video");
const audio = document.querySelector("audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600; 
let currentPlaying = false;


video.onerror = () => {
  console.error("Video failed to load. Please check the source path.");
};

audio.onerror = () => {
  console.error("Audio failed to load. Please check the source path.");
};


function updateDisplay(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function togglePlay() {
  if (!audio.src || !video.src) {
    console.error("Missing audio or video source.");
    return;
  }

  if (audio.paused) {
    audio.play();
    video.play();
    playButton.src = "./svg/pause.svg";
    currentPlaying = true;
  } else {
    audio.pause();
    video.pause();
    playButton.src = "./svg/play.svg";
    currentPlaying = false;
  }
}


timeButtons.forEach(button => {
  button.addEventListener("click", function () {
    fakeDuration = parseInt(this.getAttribute("data-time"));
    updateDisplay(fakeDuration);
    audio.currentTime = 0;
    video.currentTime = 0;
    if (currentPlaying) {
      audio.play();
      video.play();
    }
  });
});

soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    const sound = this.getAttribute("data-sound");
    const videoSrc = this.getAttribute("data-video");

    audio.src = sound;
    video.src = videoSrc;

    audio.currentTime = 0;
    video.currentTime = 0;

    if (currentPlaying) {
      audio.play();
      video.play();
    }
  });
});


audio.ontimeupdate = function () {
  const currentTime = audio.currentTime;
  const remaining = fakeDuration - currentTime;

  updateDisplay(remaining);

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    playButton.src = "./svg/play.svg";
    audio.currentTime = 0;
    video.currentTime = 0;
    updateDisplay(fakeDuration);
    currentPlaying = false;
  }
};

playButton.addEventListener("click", togglePlay);


updateDisplay(fakeDuration);
