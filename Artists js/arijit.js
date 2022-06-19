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
    img: "../images/1.png",
    name: "Bachhe Ki Jaan",
    artist: "Swayam",
    music: "../music/Bachhe Ki Jaan.mp3",
  },
  {
    img: "../images/1.png",
    name: "Dil Hi Toh Hai",
    artist: "Swayam",
    music: "../music/Dil Hi Toh Hai.mp3",
  },
  {
    img: "../images/1.png",
    name: "Haareya",
    artist: "Swayam",
    music: "../music/Haareya.mp3",
  },
  {
    img: "../images/1.png",
    name: "Har Har Gange",
    artist: "Swayam",
    music: "../music/Har Har Gange.mp3",
  },
  {
    img: "../images/1.png",
    name: "Hawayein",
    artist: "Swayam",
    music: "../music/Hawayein.mp3",
  },
  {
    img: "../images/1.png",
    name: "Kesariya Tera Ishq Hai Piya",
    artist: "Swayam",
    music: "../music/Kesariya Tera Ishq Hai Piya.mp3",
  },
  {
    img: "../images/1.png",
    name: "Mehram",
    artist: "Swayam",
    music: "../music/Mehram.mp3",
  },
  {
    img: "../images/1.png",
    name: "Musafir (Reprise)",
    artist: "Swayam",
    music: "../music/Musafir (Reprise).mp3",
  },
  {
    img: "../images/1.png",
    name: "Pal",
    artist: "Swayam",
    music: "../music/Pal.mp3",
  },
  {
    img: "../images/1.png",
    name: "Pataakha",
    artist: "Swayam",
    music: "../music/Pataakha.mp3",
  },
  {
    img: "../images/1.png",
    name: "Raabta",
    artist: "Swayam",
    music: "../music/Raabta.mp3",
  },
  {
    img: "../images/1.png",
    name: "Raazi",
    artist: "Swayam",
    music: "../music/Raazi 2018 - Raazi.mp3",
  },
  {
    img: "../images/1.png",
    name: "Shayad",
    artist: "Swayam",
    music: "../music/Shayad.mp3",
  },
  {
    img: "../images/1.png",
    name: "Soch Na Sake",
    artist: "Swayam",
    music: "../music/Soch Na Sake.mp3",
  },
  {
    img: "../images/1.png",
    name: "Sooraj Dooba",
    artist: "Swayam",
    music: "../music/Sooraj Dooba.mp3",
  },
  {
    img: "../images/1.png",
    name: "Tere Bina",
    artist: "Swayam",
    music: "../music/Tere Bina.mp3",
  },
  {
    img: "../images/1.png",
    name: "Ullu Ka Pattha",
    artist: "Swayam",
    music: "../music/Ullu Ka Pattha.mp3",
  },

  {
    img: "../images/1.png",
    name: "Woh Din",
    artist: "Swayam",
    music: "../music/Woh Din.mp3",
  },

  {
    img: "../images/1.png",
    name: "Yaariyan(Reprise)",
    artist: "Swayam",
    music: "../music/Yaariyan(Reprise).mp3",
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
    "Arijit Singh " + (track_index + 1) + " / " + music_list.length;

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
