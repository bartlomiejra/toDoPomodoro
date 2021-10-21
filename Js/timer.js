export {

	timer,
	timerBreak,
	pausetimer,
	resetTimer,
}
import {

pomodorebreakTime
} from './app.js';



function timer(seconds) {
	pause.firstElementChild.classList.remove('fa-coffee');
	pause.firstElementChild.classList.add('fa-pause');
	clearInterval(countdownTime);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	countdownTime = setInterval(() => {
	  secondsLeft = Math.round((then - Date.now()) / 1000);
	  timeInFocus = seconds - secondsLeft;
	  if (secondsLeft < 0) {
		endpomodoro();
		clearInterval(countdownTime);
		return;
	  }
  
	  displayTimeLeft(secondsLeft);
	}, 1000);
  }
  const shortBreak = pomodorebreakTime * 60;
  
  function timerBreak() {
	pause.firstElementChild.classList.remove(
	  'fa-play',
	  'fa-play-circle',
	  'fa-coffee',
	  'fa-pause-circle',
	  'fa-pause',
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
	  'clock_clockVisible',
	);
	lists(actualList, todoList);
	buttonscountdown.classList.add('.countdownButtonsNone');
	clearInterval(countdownTime);
  
	displayTimeLeft(0);
	clockTimer.classList.remove('clock_fullscreen');
  
	// }
  }