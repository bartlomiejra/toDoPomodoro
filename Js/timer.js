import {
  buttonscountdown,
  todoList,
  actualList,
  lists,
  clockTimer,
  mobileWidth,
  pause,
  leftDiv,
  pomodorebreakTime,
  countdownTimer,
  audio,
} from "./app.js";

let paused = false;
let timeInFocus;
let countdownTime;
let secondsLeft;

function timer(seconds) {
  pause.firstElementChild.classList.remove('fa-coffee');
  pause.firstElementChild.classList.add('fa-pause');
  clearInterval(countdownTime);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdownTime = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    timeInFocus = seconds - secondsLeft;
    if (secondsLeft < 0) {
      endpomodoro();
      clearInterval(countdownTime);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function timerBreak() {
  pause.firstElementChild.classList.remove(
    'fa-play',
    'fa-play-circle',
    'fa-coffee',
    'fa-pause-circle',
    'fa-pause'
  );
  clearInterval(countdownTime);
  const now = Date.now();
  const then = now + shortBreak * 1000;
  displayTimeLeft(shortBreak);
  countdownTime = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 1) {
      audio = new Audio('Alerts/pauseEnd.mp3');
      audio.play();
      resetTimer();
      clearInterval(countdownTime);
      clockTimer.classList.remove('clock_fullscreen');

      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function pausetimer() {
  const secsave = secondsLeft;
  if (!paused) {
    paused = true;
    this.firstElementChild.classList.remove('fa-pause');
    this.firstElementChild.classList.add('fa-play-circle');
    clearInterval(countdownTime);
  } else {
    this.firstElementChild.classList.remove('fa-play-circle');
    this.firstElementChild.classList.add('fa-pause');

    paused = false;
    displayTimeLeft(secsave);
    timer(secsave);
  }
}

function resetTimer() {
  clockTimer.classList.remove(
    'clock_timerFinish',
    'clock_timerStart',
    'clock_clockVisible'
  );
  lists(actualList, todoList);
  buttonscountdown.classList.add('.countdownButtonsNone');
  clearInterval(countdownTime);

  displayTimeLeft(0);
  clockTimer.classList.remove('clock_fullscreen');

  // }
}

function endpomodoro() {
  todos = JSON.parse(localStorage.getItem('Items'));
  audio = new Audio('Alerts/taskEnd.mp3');
  audio.play();
  const itemS = JSON.parse(localStorage.getItem('Items'));
  const filtrr = itemS.filter((p) => p.id == taskId);
  const itemSelement = filtrr[0];
  itemSelement.focus += timeInFocus;
  localStorage.setItem('Items', JSON.stringify(itemS));

  lists(todos, todoList);
  pause.addEventListener('click', timerBreak);
  displayNotification();
  breakTime();
}

function resizeClock() {
  clockTimer.classList.add('clock_clockVisible');
  if (clockTimer.classList.contains('clock_fullscreen')) {
    clockTimer.classList.remove('clock_fullscreen');
    clockTimer.classList.add('centerclock');
  } else {
    clockTimer.classList.add('clock_fullscreen');
    clockTimer.classList.remove('centerclock');
  }
}

function breakTime() {
  clearInterval(countdownTime);
  console.log(countdownTime);
  clockTimer.classList.add('clock_timerFinish');

  pause.firstElementChild.classList.remove(
    'fa-play-circle',
    'fa-pause',
    'fa-pause-circle'
  );
  pause.firstElementChild.classList.add('fa-coffee');
  clockTimer.classList.remove('clock_timerStart');
  lists(todos, todoList);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  countdownTimer.textContent = display;
  document.title = display;
}
function countdownAnimation() {
  buttonscountdown.classList.remove('.countdownButtonsNone');
  clockTimer.classList.add('clock_timerStart');
}
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
