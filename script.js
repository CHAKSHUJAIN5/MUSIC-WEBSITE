let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterplay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let currentSongName = document.getElementById("currentSongName");
let songItemContainer = document.querySelector(".songItemContainer");

let songs = [
  { songName: "Legion", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Trap", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  {
    songName: "Rich the kid",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Let me love you",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Safety Dance",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Back it up",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Shape of you",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "All the stars",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "True Love",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

function loadSongs() {
  songItemContainer.innerHTML = "";
  songs.forEach((song, i) => {
    songItemContainer.innerHTML += `
      <div class="songItem">
        <img src="${song.coverPath}" alt="${song.songName} Cover" />
        <span class="songName">${song.songName}</span>
        <span class="timestamp">
          <i class="far fa-play-circle fa-2x" data-index="${i}"></i>
        </span>
      </div>
    `;
  });
}
loadSongs();

function playSong(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  currentSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");
  updatePlayIcons();
}

function updatePlayIcons() {
  document.querySelectorAll(".timestamp i").forEach((icon) => {
    icon.classList.remove("fa-pause-circle");
    icon.classList.add("fa-play-circle");
  });
  let currentIcon = document.querySelector(
    `.timestamp i[data-index="${songIndex}"]`
  );
  if (currentIcon) {
    currentIcon.classList.remove("fa-play-circle");
    currentIcon.classList.add("fa-pause-circle");
  }
}

masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong(songIndex);
  } else {
    audioElement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    updatePlayIcons();
  }
});

document.querySelector(".songItemContainer").addEventListener("click", (e) => {
  let songItem = e.target.closest(".songItem");
  if (!songItem) return;

  let playIcon = songItem.querySelector(".timestamp i");
  if (!playIcon) return;

  let index = parseInt(playIcon.dataset.index);

  if (index === songIndex && !audioElement.paused) {
    audioElement.pause();
    playIcon.classList.remove("fa-pause-circle");
    playIcon.classList.add("fa-play-circle");
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  } else {
    playSong(index);
  }
});

audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
  }
});

myProgressBar.addEventListener("input", (e) => {
  if (audioElement.duration) {
    let seekTo = (e.target.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTo;
  }
});

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

audioElement.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});
