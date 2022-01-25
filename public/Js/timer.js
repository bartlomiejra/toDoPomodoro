import {
  buttonscountdown,
  todoList,
  actualList,
  renderPomodoroTasks,
  clockTimer,
  mobileWidth,
  pause,
  leftDiv,
  pomodorebreakTime,
  countdownTimer,
  audio,
  shortBreak,
  taskId,
} from "./app.js";
import { auth, db } from "./firebase.js";


import {displayNotification} from './notification.js'

// import { logUserId} from "./settings.js";

export {
  timer,
  timerBreak,
  pausetimer,
  resetTimer,
  resizeClock,
  breakTime,
  displayTimeLeft,
  pause,
  countdownAnimation,
};

let paused = false;
let timeInFocus;
let countdownTime;
let secondsLeft;
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  countdownTimer.textContent = display;
  document.title = display;
}

let setting;
let Sound;
let pomodoreDuration;
let Theme;
let breakTimes;
let pomodoreTime;

function timer(seconds) {
  pause.firstElementChild.classList.remove("fa-coffee");
  pause.firstElementChild.classList.add("fa-pause");
  clearInterval(countdownTime);
  const now = Date.now();
  const then = now + seconds * 1000;
  // displayTimeLeft(secondsLeft);
  countdownTime = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    timeInFocus = seconds - secondsLeft;
    if (secondsLeft < 0) {
      endpomodoro();
      let audio = new Audio("Alerts/taskEnd.mp3");
      audio.play();
       displayNotification();
         document.title = "Pomodoro End";


      clearInterval(countdownTime);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}
function timerBreak() {
  pause.firstElementChild.classList.remove(
    "fa-play",
    "fa-play-circle",
    "fa-coffee",
    "fa-pause-circle",
    "fa-pause"
  );
  clearInterval(countdownTime);
  let then;
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("settings")
        .onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            breakTimes = doc.data().breakTime;
            setting = doc.data();
          });
          const now = Date.now();

          then = now + breakTimes * 1000;
          displayTimeLeft(breakTimes);
        });
    }
  });

  countdownTime = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 1) {
      let audio = new Audio("Alerts/pauseEnd.mp3");
      audio.play();
      resetTimer();
      clearInterval(countdownTime);
      clockTimer.classList.remove("clock_fullscreen");

      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function pausetimer() {
  const secsave = secondsLeft;
  if (!paused) {
    paused = true;
    this.firstElementChild.classList.remove("fa-pause");
    this.firstElementChild.classList.add("fa-play-circle");
    clearInterval(countdownTime);
  } else {
    this.firstElementChild.classList.remove("fa-play-circle");
    this.firstElementChild.classList.add("fa-pause");

    paused = false;
    displayTimeLeft(secsave);
    timer(secsave);
  }
}
function resetTimer() {
  clockTimer.classList.remove(
    "clock_timerFinish",
    "clock_timerStart",
    "clock_clockVisible"
  );
  renderPomodoroTasks(actualList, todoList);
  buttonscountdown.classList.add(".countdownButtonsNone");
  clearInterval(countdownTime);

  displayTimeLeft(0);
  clockTimer.classList.remove("clock_fullscreen");

  // }
}

function endpomodoro() {
  let focusTaskTime; 
  let itemOne;
  let itemAll = [];
  let thisTask = [];
  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("Items")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        itemOne = doc.data();
        itemAll.push(itemOne);
      });
      thisTask = itemAll.filter((item) => item.id == taskId);
    let  focusTaskTime = thisTask[0].focus;
  let numberfocusTaskTime = focusTaskTime 
  let numbertimeInFocus = timeInFocus 
   numberfocusTaskTime += numbertimeInFocus;
  db.collection("users")
  .doc(auth.currentUser.uid)
  .collection("Items")
  .doc(taskId)
  
  .update({
      focus: numberfocusTaskTime
    });
});
  pause.addEventListener("click", timerBreak);
  displayNotification();
  breakTime();
}

function resizeClock() {
  clockTimer.classList.add("clock_clockVisible");
  if (clockTimer.classList.contains("clock_fullscreen")) {
    clockTimer.classList.remove("clock_fullscreen");
    clockTimer.classList.add("centerclock");
  } else {
    clockTimer.classList.add("clock_fullscreen");
    clockTimer.classList.remove("centerclock");
  }
}

function breakTime() {
  clearInterval(countdownTime);
  clockTimer.classList.add("clock_timerFinish");
  pause.firstElementChild.classList.remove(
    "fa-play-circle",
    "fa-pause",
    "fa-pause-circle"
  );
  pause.firstElementChild.classList.add("fa-coffee");
  clockTimer.classList.remove("clock_timerStart");
  // renderPomodoroTasks(todos, todoList);
}
function countdownAnimation() {
  buttonscountdown.classList.remove(".countdownButtonsNone");
  clockTimer.classList.add("clock_timerStart");
}
