// import { btnActtion } from './buttons.js';

// console.log(test);
/* eslint-disable no-use-before-define */
const todoInput = document.querySelector('.todoInput');
const addProjectbtn = document.querySelector('.addProjectBtn');
const addPr = document.querySelector('.Projects');
const todoButton = document.querySelector('.addtaskButton');
const todoList = document.querySelector('.todolist');

const clockTimer = document.querySelector('.clock');
const buttonscountdown = document.querySelector('.countdownButtons');
const pause = document.querySelector('.pauseButton');
const reset = document.querySelector('.resetButton');
const description = document.querySelector('.right');
// const breakdown = document.querySelector('.fa-coffee');
const resize = document.querySelector('.fa-window-restore');
// const detals = document.querySelectorAll('.detals');
const projectColor = document.getElementById('color');
const pomodoreList = document.querySelector('.pomodoreProjects');

const todos = JSON.parse(localStorage.getItem('Items')) || [];

let audio;

let timeInFocus;
const pomodoreDuration = 25;

let countdownTime;
const countdownTimer = document.getElementById('countdown');
let taskId = 0;

let dateToday;
// let taskToday = 0;
let tasks = JSON.parse(localStorage.getItem('Items')) || [];

// const objlines = 0;
let actualList = [];
// const idCounter = 0;
console.log(actualList);

function lists(todolist = [], objlines) {
  console.log(actualList);
  actualList = todolist;

  if (actualList.length < 1) {
    console.log('brak');
    innerHTML = '<h1>Hi there and greetings!</h1>';
  }

  objlines.innerHTML = actualList
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
  ${
    todo.focus / pomodoreDuration > 2
      ? ` x ${Math.floor(todo.focus / pomodoreDuration)}`
      : ''
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
<button class="des-btn"  data-index=${i} id="${i}" onclick="showDiv(this.id)"  > <i class="fas fa-list-alt" 
aria-hidden="true"></i></button>
</div>
`,
    )
    .join('');
}

function addTodo(event) {
  event.preventDefault();
  const item = {
    text: todoInput.value,
    done: false,
    focus: 0,
    project: 'No Project',
    repeatday: '0',
    repeatpartoftime: 'day',
    data: dateToday,
    note: '',
  };
  // push and add task to localstorage
  todos.push(item);
  lists(todos, todoList);
  // lists(actualList, todoList);

  // localStorage.setItem('Items', JSON.stringify(todos));

  todoInput.value = '';
  statTask();
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
lists(actualList, todoList);

function countdownAnimation() {
  buttonscountdown.classList.remove('countdownButtonsNone');
  clockTimer.classList.add('timerStart');
}

// * functions buttons action delate play and completted task
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
      resetTimer();
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
    // console.log(item);
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
  // localStorage.setItem('Items', JSON.stringify(todos));
  // lists(actualList, todoList);
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
  lists(actualList, todoList);
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
  // console.log(itemS);
  const itemS = JSON.parse(localStorage.getItem('Items'));
  itemS[taskId].focus += timeInFocus;
  localStorage.setItem('Items', JSON.stringify(itemS));
  lists(todos, todoList);
  pause.addEventListener('click', timerBreak);
  breakTime();
}

function resizeClock() {
  if (clockTimer.classList.contains('clock-fullscreen')) {
    clockTimer.classList.remove('clock-fullscreen');
  } else {
    clockTimer.classList.add('clock-fullscreen');
  }
}

function showDiv(clickedId) {
  // ! czemu tutaj pobieram projetky a nie Itemy ????
  const itemS = JSON.parse(localStorage.getItem('Items') || []);
  //! Poniżej id tasku
  description.classList.remove('none');
  console.log(itemS[clickedId]);
  console.log(itemS);

  renderdetals();

  function renderdetals() {
    let todoss = JSON.parse(localStorage.getItem('Items')) || [];
    console.log('coolest');

    console.log(todoss);

    const taskDetails = todoss[clickedId];
    console.log(taskDetails);

    console.log(taskDetails.note);
    description.innerHTML = `
      <button class="close-btn"  data-index=${clickedId} id="${clickedId}" >
       <i class="fas fa-times"
      aria-hidden="true"></i></button>
      <div class="divT ">
      <div  class="todo-item" id="item" >
       ${taskDetails.text}</div>
          </div>
   <div class="detals">

            <ul>
                <li>Pomodoro:     ${
                  taskDetails.focus > pomodoreDuration
                    ? '<i class="fas fa-clock " aria-hidden="true"> </i>'
                    : '<i class="fas fa-clock blur " aria-hidden="true"> </i>'
                }
                  ${
                    taskDetails.focus / pomodoreDuration > 1
                      ? ` x ${Math.floor(taskDetails.focus / pomodoreDuration)}`
                      : ''
                  }</li>
                <li>Due date: <input type="date" id="date" value="${
                  taskDetails.data
                }" name="trip-start"></li>
                <li>Project:   <select name="Project" value="${
                  taskDetails.project
                }" id="Project"class="projectSelect" placeholder="${
      taskDetails.project
    }" value="${taskDetails.project}">
                 <option value="${
                   taskDetails.project
                 }"  selected disabled hidden>
                 ${taskDetails.project}
         </option>

              </select></li>
                <li></i>Repeat: Every <input type="number" class="repeatDay" value="${
                  taskDetails.repeatday
                }"  min="0" max="10" id="days">

                </input>
                <select name="partOfTime"
                  class="partOfTime"
                  id="partOfTime"
                  value="${taskDetails.repeatpartoftime}"
                  placeholder=${taskDetails.repeatpartoftime}"
                  id="${taskDetails.repeatpartoftime}"
                  >
                  <option value="${
                    taskDetails.repeatpartoftime
                  }"  selected disabled hidden>
                  ${taskDetails.repeatpartoftime}
                  </option>
                  // <option value="days">Days</option>
                  // <option value="weeks">Weeks</option>
                  // <option value="months">Month</option>
                </select>

                </ul>
                <textarea  placeholder="Note to your task" class="note" id=${clickedId} name="note" >${
      taskDetails.note !== '' ? taskDetails.note : ''
    }
      </textarea>
      </div>

      `;

    const closeBtn = document.querySelector('.close-btn');
    const date = document.getElementById('date');
    const note = document.querySelector('.note');
    const project = document.querySelector('.projectSelect');
    const timePart = document.querySelector('.partOfTime');
    const repeatDay = document.querySelector('.repeatDay');

    date.addEventListener('input', updateDetails);
    closeBtn.addEventListener('click', closeDiv);

    note.addEventListener('input', updateDetails);
    repeatDay.addEventListener('input', updateDetails);

    const projectSelect = document.getElementById('Project');
    projectSelect.addEventListener('click', () => {
      const options = projectSelect.querySelectorAll('option');
      projectSelect.addEventListener('change', updateDetails);
      //! console.log(options);
    });

    const partTimeSelect = document.getElementById('partOfTime');
    partTimeSelect.addEventListener('click', () => {
      const optionsTime = partTimeSelect.querySelectorAll('option');
      partTimeSelect.addEventListener('change', updateDetails);
      console.log(optionsTime);
    });

    function closeDiv() {
      console.log('elo');
      description.classList.add('none');
    }

    function updateDetails() {
      const proj = JSON.parse(localStorage.getItem('Items')) || [];
      console.log(proj);
      console.log(proj);
      console.log(proj[clickedId].data);
      proj[clickedId].data = date.value;
      proj[clickedId].project = project.value;
      proj[clickedId].note = note.value;
      proj[clickedId].repeatday = repeatDay.value;
      proj[clickedId].repeatpartoftime = timePart.value;
      localStorage.setItem('Items', JSON.stringify(proj));

      console.log('oki działa');
    }

    const divT = document.querySelector('.divT');

    // divT.addEventListener('click', renderdetals);
    // getSelectOptions();
  }

  function sortingProject(e) {
    const clicked = e.target.getAttribute('name');
    // console.log(e.target);
    // console.log(clicked);
    tasks = JSON.parse(localStorage.getItem('Items')) || [];
    // console.log(tasks);
    const tasksProject = tasks.filter((items) => items.project === clicked);
    // console.log(tasks);
    // console.log(tasksProject);
    lists(tasksProject, todoList);
    return tasksProject;
  }

  let dateTomorrow = 0;

  function actualDateTime() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // month is zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const ddTomorrow = String(date.getDate() + 1).padStart(2, '0');
    dateToday = `${yyyy}-${mm}-${dd}`;
    dateTomorrow = `${yyyy}-${mm}-${ddTomorrow}`;
  }
  actualDateTime();

  document.querySelectorAll('.projectListDays').forEach((e) => {
    e.addEventListener('click', sortingProjectDays);
  });

  document.querySelectorAll('.projectList').forEach((e) => {
    e.addEventListener('click', sortingProject);
  });

  function sortingProjectDays(e) {
    let taskToday = 0;
    let taskTomorrow = 0;
    let taskSomeday = 0;
    const clicked = e.target.id;
    // console.log(clicked);

    const tasks = JSON.parse(localStorage.getItem('Items')) || [];
    switch (clicked) {
      case 'today':
        taskToday = tasks.filter((items) => items.data === dateToday);
        lists(taskToday, todoList);
        break;

      case 'tomorrow':
        taskTomorrow = tasks.filter((items) => items.data === dateTomorrow);
        // renderProjects();
        lists(taskTomorrow, todoList);
        break;

      case 'someday':
        console.log(dateTomorrow);
        taskSomeday = tasks.filter(
          (items) => items.data !== dateTomorrow || dateToday,
        );

        console.log(taskSomeday);
        lists(taskSomeday, todoList);
        break;
      default:
    }
  }
  // function getSelectOptions() {
  //   const projectList = JSON.parse(localStorage.getItem('Project')) || [];
  //   console.log(projectList);
  //   // console.log(projectList[1].name);
  //   const projectt = document.querySelector('.projectSelect');
  //   for (let i = 0; i < projectList.length; i++) {
  //     const option = document.createElement('option');
  //     txt = document.createTextNode(projectList[i].name);
  //     option.appendChild(txt);
  //     projectt.insertBefore(option, projectt.lastChild);
  //   }
  // }
}

// const project = JSON.parse(localStorage.getItem('Project')) || [];

function addProject(event) {
  const project = JSON.parse(localStorage.getItem('Project')) || [];
  console.log('ok');
  event.preventDefault();
  console.log(project);
  const Project = {
    id: project.length,
    name: addPr.value,
    color: projectColor.value,
  };

  project.push(Project);
  // console.log(Project);
  localStorage.setItem('Project', JSON.stringify(project));
  addPr.value = '';
  renderProjects();
}

function renderProjects() {
  const proj = JSON.parse(localStorage.getItem('Project')) || [];
  console.log(proj);

  pomodoreList.innerHTML = proj
    .map(
      (proje, i) => `
<li>
 <div class="projectList" value="${proje.name}" name="${proje.name}">
  <div class="circle" style="background-color: ${proje.color};">

  </div>
  ${proje.name} 
  </div>
  <button class="projectDelete" id=${proje.name} > <i class="fas fa-minus-circle" 
  aria-hidden="true" id=${proje.id} name=${proje.name}></i></button>
  </li>
`,
    )
    .join('');
}
renderProjects();

function deleteProject(e) {
  console.log(e);
  console.log('siema');
  const click = e.target.id;
  const project = JSON.parse(localStorage.getItem('Project')) || [];
  console.log(project);
  const deleteProj = project.filter((item) => item.id != click);
  console.log(deleteProj);
  console.log(click);
  console.log(deleteProj);
  localStorage.setItem('Project', JSON.stringify(deleteProj));
  // renderProjects();
}

document.querySelectorAll('.projectDelete').forEach((e) => {
  e.addEventListener('click', deleteProject);
});

addProjectbtn.addEventListener('click', addProject);
pause.addEventListener('click', pausetimer);
reset.addEventListener('click', resetTimer);
todoList.addEventListener('click', btnActtion);
/*
      * Importand Information
      ! Deprecated method, do not user
      ? should this method be exposad in the public API
      TODO: zrobić to i tamto
      * @param myParam The parameter for this method
    */
