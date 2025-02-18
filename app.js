import { musicList } from "./data.js";
const audio = document.querySelector(".music");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const forwardBtn = document.querySelector("#forward");
const backwardBtn = document.querySelector("#backward");
const time = document.querySelector(".time");
const range = document.querySelector(".range");
const info = document.querySelector(".playerInfo");
let index = 0;

window.addEventListener("DOMContentLoaded", () => {
  addUi(index);
});
function addUi(i) {
  let mn = Math.trunc(musicList[i].duration / 60);
  let sn = Math.trunc(musicList[i].duration % 60);
  audio.src = `./assets/audios/${musicList[i].musicPath}`;
  info.innerHTML = `
    <img src="./assets/images/${musicList[i].imagePath}" alt="album" class="music-img">
    <div>
        <p class="music-name txt">${musicList[i].artistName}</p>
        <marquee class="music-desc txt" direction="right">${musicList[i].musicName}</marquee>
    </div>
    `;
  range.max = `${musicList[i].duration}`;
  // time.innerHTML = `${mn >= 10 ? mn : "0" + mn} :${
  //     sn >= 10 ? sn : "0" + sn
  //   }`
}
playBtn.addEventListener("click", () => {
  audio.play();
  pauseBtn.classList.remove("none");
  playBtn.classList.add("none");
});
pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.classList.add("none");
  playBtn.classList.remove("none");
});
forwardBtn.addEventListener("click", () => {
  if (musicList.length - 1 > index) {
    index++;
    addUi(index);
    audio.play();
  } else {
    index = 0;
    addUi(index);
    audio.play();
  }
});
backwardBtn.addEventListener("click", () => {
  if (0 < index) {
    index--;
    addUi(index);
    audio.play();
  } else {
    index = musicList.length - 1;
    addUi(index);
    audio.play();
  }
});
audio.addEventListener("timeupdate", () => {
  let mn = Math.trunc(audio.currentTime / 60);
  let sn = Math.trunc(audio.currentTime % 60);
  time.innerHTML = `${mn >= 10 ? mn : "0" + mn}:${sn >= 10 ? sn : "0" + sn}`;
  range.value = audio.currentTime;
});

range.addEventListener("input", (e) => {
  audio.currentTime = e.target.value;
});

audio.addEventListener("ended", () => {
  if (musicList.length - 1 > index) {
    index++;
    addUi(index);
    audio.play();
  } else {
    index = 0;
    addUi(index);
    audio.play();
  }
});
