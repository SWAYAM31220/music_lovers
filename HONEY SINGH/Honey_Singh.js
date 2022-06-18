let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let volume_slider = document.querySelector(".volume_slider");
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "1.png",
    name: "Aata Majhi Satakli",
    artist: "Swayam",
    music: "../music/music/Aata Majhi Satakli.mp3",
  },
  {
    img: "1.png",
    name: "Birthday Bash",
    artist: "Swayam",
    music: "../music/music/Birthday Bash.mp3",
  },
  {
    img: "1.png",
    name: "Blue Eyes",
    artist: "Swayam",
    music:
      "../music/music/Blue Eyes Full Video Song Yo Yo Honey Singh  Blockbuster Song Of 2013.mp3",
  },
  {
    img: "1.png",
    name: "Brown Rang",
    artist: "Swayam",
    music: "../music/music/Brown Rang.mp3",
  },

  {
    img: "1.png",
    name: "Care Ni Karda",
    artist: "Swayam",
    music: "../music/music/Care Ni Karda.mp3",
  },
  {
    img: "1.png",
    name: "Chaar Bottle Vodka ",
    artist: "Swayam",
    music: "../music/music/Chaar Bottle Vodka.mp3",
  },
  {
    img: "1.png",
    name: "Chhote Chhote Peg",
    artist: "Swayam",
    music: "../music/music/Chhote Chhote Peg.mp3",
  },
  {
    img: "1.png",
    name: "Dil Chori",
    artist: "Swayam",
    music: "../music/music/Dil Chori.mp3",
  },
  {
    img: "1.png",
    name: "Dheere Dheere",
    artist: "Swayam",
    music: "../music/music/Dheere Dheere.mp3",
  },
  {
    img: "1.png",
    name: "First Kiss",
    artist: "Swayam",
    music: "../music/music/First Kiss.mp3",
  },
  {
    img: "1.png",
    name: "Fugly Fugly Kya Hai",
    artist: "Swayam",
    music: "../music/music/Fugly Fugly Kya Hai.mp3",
  },
  {
    img: "1.png",
    name: "High Heels",
    artist: "Swayam",
    music: "../music/music/High Heels.mp3",
  },
  {
    img: "1.png",
    name: "Jingle Bell",
    artist: "Swayam",
    music: "../music/music/Jingle Bell.mp3",
  },
  {
    img: "1.png",
    name: "Love Dose",
    artist: "Swayam",
    music: "../music/music/Love Dose.mp3",
  },
  {
    img: "1.png",
    name: "Lungi Dance",
    artist: "Swayam",
    music: "../music/music/Lungi Dance.mp3",
  },

  {
    img: "1.png",
    name: "Makhna",
    artist: "Swayam",
    music: "../music/music/Makhna.mp3",
  },
  {
    img: "1.png",
    name: "Manali Trance",
    artist: "Swayam",
    music: "../music/music/Manali Trance.mp3",
  },
  {
    img: "1.png",
    name: "One Bottle Down",
    artist: "Swayam",
    music: "../music/music/One Bottle Down.mp3",
  },
  {
    img: "1.png",
    name: "Party With Bhoothnath",
    artist: "Swayam",
    music: "../music/music/Party With Bhoothnath.mp3",
  },
  {
    img: "1.png",
    name: "Shor Machega",
    artist: "Swayam",
    music: "../music/music/Shor Machega.mp3",
  },
  {
    img: "1.png",
    name: "Sunny Sunny",
    artist: "Swayam",
    music: "../music/music/Sunny Sunny.mp3",
  },
  {
    img: "1.png",
    name: "Urvashi",
    artist: "Swayam",
    music: "../music/music/Urvashi.mp3",
  },
  {
    img: "1.png",
    name: "Yaariyan",
    artist: "Swayam",
    music: "../music/music/Yaariyan.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Honey Singh " + (track_index + 1) + " / " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

  // Set the background to the new color
  document.body.style.background = bgColor;
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = curr_track.duration / 100;
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
}
function pauseRandom() {
  isRandom = false;
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
}
function setUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
