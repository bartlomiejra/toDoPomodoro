const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.addtaskButton');
const todoList = document.querySelector('.todolist');
const clockTimer = document.querySelector('.clock');

const buttonscountdown = document.querySelector('.countdownButtons');
const pause = document.querySelector('.pauseButton');
const reset = document.querySelector('.resetButton');
const description = document.querySelector('.right');
const breakdown = document.querySelector('.fa-coffee');
const resize = document.querySelector('.fa-window-restore');

// const task = document.querySelector('divT');
// const newTodo = document.querySelector('.todo-item');

const todos = JSON.parse(localStorage.getItem('Items')) || [];

// virable to audio file
let audio;
// virable to break time (5 minut defoult)

let timeInFocus;
const pomodoreDuration = 25;
let countdownTime;
const countdownTimer = document.getElementById('countdown');
let taskId = 0;

//* TODO Rebuind addToDO add new function to create structur of task element like button etc.

//* this function adding new item todo

function lists(todolist = [], objlines) {
  objlines.innerHTML = todolist
    .map(
      (todo, i) => `${
        todo.done ? '<div class="divT completed">' : '<div class="divT " >'
      }
      
<div  class="todo-item" id="item${i}" >${todo.text} 
</div>
<div  class="clocks"> 
${
  todo.focus > [pomodoreDuration]
    ? '<i class="fas fa-clock " aria-hidden="true"> </i>'
    : '<i class="fas fa-clock blur " aria-hidden="true"> </i>'
}

</div>


<button class="complete-btn" data-index=${i} id="item${i}" >
${
  todo.done
    ? `<i class="fas fa-check-circle" id="item${i}" aria-hidden="true"></i>`
    : `<i class="fas fa-circle" id="item${i}" aria-hidden="true"></i>`
} 
</button>

<button class="delete-btn" data-index=${i} id="item${i}">   <i class="fas fa-minus-circle" aria-hidden="true"> </i>
</button>

<button class="play-btn"  data-index=${i} id="${i}"> <i class="fas fa-play-circle" aria-hidden="true"></i></button>

<button class="des-btn"  data-index=${i} id="${i}" onclick="showDiv(this.id)"> <i class="fas fa-list-alt" 

aria-hidden="true"></i></button>


</div>
`,
    )
    .join('');
}

// function printcoś() {
//   console.log('to');
// }

function addTodo(event) {
  event.preventDefault();

  const item = {
    text: todoInput.value,
    done: false,
    focus: 0,
  };
  // push and add task to localstorage
  todos.push(item);
  lists(todos, todoList);
  localStorage.setItem('Items', JSON.stringify(todos));
  todoInput.value = '';
}

function statTask() {
  let toBeCompleted = 0;
  let countCompleted = 0;

  //* counting statiscics
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].done === true) {
      countCompleted += 1;
    } else {
      toBeCompleted += 1;
    }
  }
  // let totalfocustime = 0;

  document.getElementById('completedTasks').innerHTML = countCompleted;
  document.getElementById('taskstobe').innerHTML = toBeCompleted;
  const totalfocustime = JSON.parse(localStorage.getItem('Items'));
  let focuscount = 0;
  if (totalfocustime != null) {
    totalfocustime.forEach((element) => {
      const ast = element.focus;
      focuscount += ast;
    });
  }
  const estimated = toBeCompleted * pomodoreDuration;
  const minutesEs = estimated % 60;
  const hours = Math.floor(estimated / 60);
  const estimatedHM = `${hours}.${minutesEs < 10 ? '0' : ''}${minutesEs}`;
  document.getElementById('estimated').innerHTML = estimatedHM;
  const elapsed = Math.floor(focuscount / 60);
  const hoursel = Math.floor(elapsed / 60);
  const minutes = elapsed % 60;
  const elapsedHM = `${hoursel}.${minutes < 10 ? '0' : ''}${minutes}`;
  document.getElementById('elapse').innerHTML = elapsedHM;
  //* creating item class to store stats, i want to add this number to localstore.
  const statistics = JSON.parse(localStorage.getItem('STat')) || [];
  const stat = {
    estimated: estimatedHM,
    comp: toBeCompleted,
    elapsed,
    complete: countCompleted,
  };
  statistics.splice(0, 5);
  statistics.push(stat);
  localStorage.setItem('STat', JSON.stringify(statistics));
}
statTask();
todoButton.addEventListener('click', addTodo);
lists(todos, todoList);

function countdownAnimation() {
  buttonscountdown.classList.remove('countdownButtonsNone');
  clockTimer.classList.add('timerStart');
}

//* functions buttons action delate play and completted task
function btnActtion(e) {
  statTask();
  const item = e.target;
  if (item.classList[0] === 'delete-btn') {
    audio = new Audio('Alerts/deleteTask.mp3');
    audio.play();
    const { index } = e.target.dataset;
    const todo = item.parentElement;
    todo.classList.add('fall');
    todos.splice(index, 1);
    localStorage.setItem('Items', JSON.stringify(todos));
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
    statTask();
    return;
  }

  //* completed function
  if (item.classList[0] === 'complete-btn') {
    const todoText = item.parentElement;
    const el = e.target;
    const { index } = el.dataset;
    if (!todoText.classList.contains('completed')) {
      todos[index].done = true;
      localStorage.setItem('Items', JSON.stringify(todos));
      todoText.classList.add('completed');
      item.innerHTML = '<i class="fas fa-check-circle"></i>';
      // todoText.classList.add('animation');
    } else {
      todoText.classList.remove('completed');
      item.innerHTML = '<i class="fas fa-circle"></i>';
      todos[index].done = false;
      localStorage.setItem('Items', JSON.stringify(todos));
    }
    statTask();
    return;
  }

  //* timer start function
  if (item.classList[0] === 'play-btn') {
    resizeClock();
    resize.classList.remove('countdownButtonsNone');
    pause.removeEventListener('click', timerBreak);
    // resetTimer();
    console.log(item);
    const { index } = e.target.id;
    taskId = e.target.id;
    timer();
    clearInterval(countdownTime);
    const seconds = 4;
    timer(seconds);
    clockTimer.classList.remove('timerFinish');
    countdownAnimation(item);
    item.innerHTML = '<i class="fa fa-clock"></i>';
  }

  if (item.classList[0] === 'des-btn') {
  }
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
let secondsLeft;
let paused = false; // is the clock paused?

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
const shortBreak = 5;

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
      clockTimer.classList.remove('clock-fullscreen');

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
  clockTimer.classList.remove('timerFinish', 'timerStart');
  lists(todos, todoList);
  buttonscountdown.classList.add('countdownButtonsNone');
  clearInterval(countdownTime);
  displayTimeLeft(0);
  clockTimer.classList.remove('clock-fullscreen');
  // }
}

//* funkcja lists wczytująca taski z localstore
function breakTime() {
  clearInterval(countdownTime);
  clockTimer.classList.add('timerFinish');

  pause.firstElementChild.classList.remove(
    'fa-play-circle',
    'fa-pause',
    'fa-pause-circle',
  );
  pause.firstElementChild.classList.add('fa-coffee');
  clockTimer.classList.remove('timerStart');

  lists(todos, todoList);
}

function endpomodoro() {
  audio = new Audio('Alerts/taskEnd.mp3');
  audio.play();
  //* convert string to js object
  const itemS = JSON.parse(localStorage.getItem('Items'));
  console.log(itemS);
  itemS[taskId].focus += timeInFocus;
  localStorage.setItem('Items', JSON.stringify(itemS));
  lists(todos, todoList);
  pause.addEventListener('click', timerBreak);
  breakTime();
}

function showDiv(clicked_id) {
  //! Poniżej id tasku

  const itemS = JSON.parse(localStorage.getItem('Items'));
  console.log(itemS[clicked_id]);

  if (description.classList.contains('none')) {
    description.classList.remove('none');
  } else {
    description.classList.add('none');
  }
}

pause.addEventListener('click', pausetimer);
reset.addEventListener('click', resetTimer);
todoList.addEventListener('click', btnActtion);
// showDetals.addEventListener('click', showDiv);
lists(todos, todoList);

function resizeClock() {
  if (clockTimer.classList.contains('clock-fullscreen')) {
    clockTimer.classList.remove('clock-fullscreen');
  } else {
    clockTimer.classList.add('clock-fullscreen');
  }
}

/*
      * Importand Information
      ! Deprecated method, do not use
      ? should this method be exposad in the public API
      TODO: zrobić to i tamto
      * @param myParam The parameter for this method
    */
