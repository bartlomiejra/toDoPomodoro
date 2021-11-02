/* eslint-disable prettier/prettier */

import {
	showToDoCard,
	showProjectList,
	activeProject,
  centerDiv,
  showDiv,
} from "./showElements.js";
import {
	timer,
	timerBreak,
	pausetimer,
	resetTimer,
  resizeClock,
  breakTime,
  countdownAnimation,
} from "./timer.js";
import * as todo from "./todo.js";
import * as note from "./note.js";
import { displayNotification } from "./notification.js";
import * as settingss from "./settings.js";
// import * as settingsfile from './settings.js';
window.openNoteCard = openNoteCard;
window.resizeClock = resizeClock;
export let pomodorebreakTime;

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */

const leftDiv = document.querySelector(".left");

const projectIcon = document.querySelector(".Project");
let currentProject;
const mobileWidth = window.matchMedia("(max-width: 895px)");
const todoInput = document.querySelector(".center_todoInput");
const addProjectbtn = document.querySelector(".left_addProjectBtn");
const buttonscountdown = document.querySelector(".countdownButtons");
const addPr = document.querySelector(".left_Projects");
const todoButton = document.querySelector(".center_addtaskButton");
const todoList = document.querySelector(".center_todolist");
const showProject = document.querySelector(".Project");
const emptyList = document.querySelector(".center_emptyList");
const clockTimer = document.querySelector(".clock");
const pause = document.querySelector(".center_pauseButton");
const reset = document.querySelector(".center_resetButton");
const description = document.querySelector(".right");
const resize = document.querySelector(".fa-window-restore");
const projectColor = document.getElementById("color");
const pomodoreList = document.querySelector(".left_pomodoreProjects");
const title = document.querySelector(".titlebar");
let dateToday;
let dateTomorrow = 0;
const history = JSON.parse(localStorage.getItem("History"));
let statistics = JSON.parse(localStorage.getItem("STat"));
let todos = JSON.parse(localStorage.getItem("Items"));
let project = JSON.parse(localStorage.getItem("Project"));
const settinglocal = JSON.parse(localStorage.getItem("settings"));
const countdownTimer = document.getElementById("countdown");
let tasks = JSON.parse(localStorage.getItem("Items")) || [];
let clicked;
let timeInFocus;
let pomodoreDuration;
let settings;
let countdownTime;
let taskId = 0;
let taskToday;
let audio;
let actualSelect;
let actualList;

// empty state
if (history == null) {
  const historylist = [
    {
      id: 0,
      text: "Meditate",
      done: true,
      focus: 21,
      project: "Mindfulness🧘",
      repeatday: "1",
      repeatpartoftime: "day",
      data: 4,
      note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
    },
  ];
  window.localStorage.setItem("History", JSON.stringify(historylist));
}
if (statistics == null) {
	statistics = [
    {
      estimated: "0.00",
      comp: 1,
      elapsed: "0.00",
      complete: 0,
    },
];
window.localStorage.setItem("STat", JSON.stringify(statistics));
 statistics = JSON.parse(localStorage.getItem("STat"));
}

if (todos == null) {
  todos = [
    {
      id: 0,
      text: "Meditate",
      done: false,
      focus: 0,
      project: "Mindfulness🧘",
      repeatday: "1",
      repeatpartoftime: "day",
      data: dateToday,
      note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
    },
    {
      id: 1,
      text: "Basic Spanish Words",
      done: false,
      focus: 0,
      project: "Spanish Lesson🇪🇸",
      repeatday: "1",
      repeatpartoftime: "day",
      data: dateToday,
      note: " Spanish Vocabulary Lists Organized by Topic\n Basic Spanish vocabulary: Greetings\n Basic Spanish vocabulary: Manners\n Basic Spanish vocabulary: Your first conversation\n Basic Spanish vocabulary: Family members\n Basic Spanish vocabulary: Food and drinks\n Intermediate Spanish vocabulary: Clothing\n Intermediate Spanish vocabulary: Dates and times\n",
    },
    {
      id: 4,
      text: " Call grandma",
      data: dateToday,
      done: false,
      focus: 0,
      note: "don't forget your grandma!👵 ",
      project: "SocialLive 🍹  ",
      repeatday: "1",
      repeatpartoftime: "day",
    },
  ];
  window.localStorage.setItem("Items", JSON.stringify(todos));
}

if (project == null) {
  project = [
    { id: 0, name: "Studies👨‍🎓", color: "#9ebb11" },
    { id: 1, name: "Running🏃", color: "#11bb44" },
    { id: 2, name: "Reading📚", color: "#bb1111" },
    { id: 3, name: "SocialLive🍹", color: "#989f65" },
    { id: 4, name: "Mindfulness🧘", color: "#00459e" },
    { id: 4, name: "Spanish Lesson🇪🇸", color: "#ff459e" },
  ];
  window.localStorage.setItem("Project", JSON.stringify(project));
} else {
  project = JSON.parse(localStorage.getItem("project"));
}

if (settinglocal == null) {
  settings = { Theme: "Dark", pomodoreTime: 25, breakTime: 5 };

  window.localStorage.setItem("settings", JSON.stringify(settings));
} else {
  pomodoreDuration = settinglocal.pomodoreTime;
  pomodorebreakTime = settinglocal.breakTime;
}
// let taskToday = 0;
// const objlines = 0;
// let actualList;
function actualDateTime() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // month is zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const ddTomorrow = String(date.getDate() + 1).padStart(2, "0");
  dateToday = `${yyyy}-${mm}-${dd}`;
  dateTomorrow = `${yyyy}-${mm}-${ddTomorrow}`;
}

actualDateTime();
tasks = JSON.parse(localStorage.getItem("Items")) || [];
taskToday = tasks.filter((items) => items.data === dateToday);
actualList = JSON.parse(localStorage.getItem("Actual")) || [];
if (actualList == 0) {
  actualSelect = [{ id: 0, name: "Studies 👨‍🎓" }];
  window.localStorage.setItem("Actual", JSON.stringify(actualSelect));
} else {
  project = JSON.parse(localStorage.getItem("project"));
}

function lists(todolist = []) {
  console.log("render");
  // console.log(currentProject);
   actualList = todolist;

  window.localStorage.setItem("Actual", JSON.stringify(actualList));

  if (actualList.length == 0) {
    emptyList.classList.remove("none");
  }
  if (actualList.length > 0) {
    emptyList.classList.add("none");
  }
  todoList.innerHTML = actualList
    .map(
      (todo) => `${
        todo.done
          ? '<li   class="center_divT completed">'
          : '<li class="center_divT " >'
      }    
<div  class="center_todo-item" id="item${todo.id}" >${todo.text} ${
        todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ""
      }

</div>
<div  class="center_clocks"> 

${
  todo.focus > [pomodoreDuration]
    ? '<i class="fas fa-clock  " aria-hidden="true"> </i>'
    : '<i class="fas fa-clock blur  " aria-hidden="true"> </i>'
}
<div class="score"> 
${
  todo.focus / pomodoreDuration > 2
    ? ` x ${Math.floor(todo.focus / pomodoreDuration)}`
    : ""
}
</div> 
</div>

<button tabindex="0" class="center_complete-btn" aria-label="Complete" data-index=${
        todo.id
      } id="item${todo.id}" >
${
  todo.done
    ? `<li class="fas fa-check-circle" id="item${todo.id}" aria-hidden="true">`
    : `<li class="fas fa-circle" id="item${todo.id}" aria-hidden="true">`
} 
</button>




<button autofocus tabindex="0" class="center_delete-btn" aria-label="Delete" data-index=${
        todo.id
      } id="item${
        todo.id
      }">   <i class="fas fa-minus-circle" aria-hidden="true"> </i>
</button>
<button  tabindex="0"class="center_play-btn" aria-label="Play" data-index=${
        todo.id
      } id="${
        todo.id
      }"> <i class="fas fa-play-circle" aria-hidden="true"></i></button>
<button tabindex="0" class="center_des-btn" aria-label="Detals"  data-index=${
        todo.id
      } id="${todo.id}" onclick="showDiv(${
        todo.id
      })"  > <i class="fas fa-list-alt" 
aria-hidden="true"></i></button>
</li>
`,
    )

    .join("");
}
window.showDiv = showDiv;

lists(actualList, todoList);

if (mobileWidth.matches) {
  centerDiv.classList.remove("active");
  centerDiv.classList.add("none");
  leftDiv.classList.add("leftnone");
} else {
  centerDiv.classList.add("active");
  leftDiv.classList.remove("none");
  leftDiv.classList.add("active");
}
window.onresize = function resizeFun() {
  if (mobileWidth.matches) {
    if (leftDiv.classList.contains("active")) {
      centerDiv.classList.remove("active");
      centerDiv.classList.add("none");
    }
    centerDiv.classList.add("center");
  } else if (leftDiv.classList.contains("active")) {
    centerDiv.classList.add("active");
    centerDiv.classList.remove("none");
  }
};
  const shortBreak = pomodorebreakTime * 60;
function addTodo(event) {
   currentProject = JSON.parse(localStorage.getItem("Current")) || [];
  if (currentProject == 0) {
    currentProject = "No Project";
  } else {
    currentProject = currentProject[0].name;
  }

  todos = JSON.parse(localStorage.getItem("Items"));

  // find last id number
  let last = 0;
  todos.forEach((task) => {
    if (task.id > last) {
      last = task.id;
    }
  });
  event.preventDefault();
  const item = {
    id: (last += 1),
    text: todoInput.value,
    done: false,
    focus: 0,
    project: currentProject,
    repeatday: "1",
    repeatpartoftime: "day",
    data: dateToday,

    note: "",
  };
  todoInput.value = "";
  todos.push(item);
  localStorage.setItem("Items", JSON.stringify(todos));
  lists(todos, todoList);
  lists(actualList, todoList);
  statTask();
  centerDiv.classList.add("active");
  centerDiv.classList.remove("none");
  // centerDiv.add.classList("active");
}
function statTask() {
  let toBeCompleted = 0;
  let countCompleted = 0;
  let estimated = 0;
  //* counting statiscics
  const history = JSON.parse(localStorage.getItem("History"));
  let historytaskToday;
  historytaskToday = history.filter((items) => items.data === dateToday);
  for (let i = 0; i < historytaskToday.length; i += 1) {
    if (historytaskToday[i].done === true) {
      countCompleted += 1;
    } else {
      toBeCompleted += 1;
    }
  }

  taskToday = todos.filter((items) => items.data === dateToday);
  for (let i = 0; i < taskToday.length; i += 1) {
    if (taskToday[i].done === true) {
      countCompleted += 1;
    } else {
      toBeCompleted += 1;
    }
  }

  document.getElementById("completedTasks").innerHTML = countCompleted;
  document.getElementById("taskstobe").innerHTML = toBeCompleted;
  const totalfocustime = JSON.parse(localStorage.getItem("Items"));
  let focuscount = 0;
  if (totalfocustime != null) {
    totalfocustime.forEach((element) => {
      const ast = element.focus;
      focuscount += ast;
    });
  }

  estimated = toBeCompleted * pomodoreDuration;
  const minutesEs = estimated % 60;
  const hours = Math.floor(estimated / 60);
  const estimatedHM = `${hours}.${minutesEs < 10 ? "0" : ""}${minutesEs}`;
  document.getElementById("estimated").innerHTML = estimatedHM;
  const elapsed = Math.floor(focuscount / 60);
  const hoursel = Math.floor(elapsed / 60);
  const minutes = elapsed % 60;
  const elapsedHM = `${hoursel}.${minutes < 10 ? "0" : ""}${minutes}`;
  document.getElementById("elapse").innerHTML = elapsedHM;
  //* creating item class to store stats, i want to add this number to localstore.
  const statistics = JSON.parse(localStorage.getItem("STat")) || [];
  const stat = {
    estimated: estimatedHM,
    comp: toBeCompleted,
    elapsed,
    complete: countCompleted,
  };
  statistics.splice(0, 5);
  statistics.push(stat);
  localStorage.setItem("STat", JSON.stringify(statistics));
}
statTask();
todoButton.addEventListener("click", addTodo);
lists(actualList, todoList);

// * functions buttons action delate play and completted task
function btnActtion(e) {
  statTask();

  const item = e.target;
  if (item.classList[0] === "center_delete-btn") {
	console.log(item);
    audio = new Audio("Alerts/deleteTask.mp3");
    audio.play();
    const { ...index } = e.target.dataset;
    console.log(index);
    const todo = item.parentElement;
    console.log(todo);
	console.log(todo);
    todo.classList.add("fall");
    todos.splice(index, 1);

    localStorage.setItem("Items", JSON.stringify(todos));
    todo.addEventListener("transitionend", () => {
      todo.remove();
      resetTimer();
    });
    statTask();
    actualList = todos;
    lists(actualList, todoList);

    return;
  }

  //* completed function
  if (item.classList[0] === "center_complete-btn") {
    const todoText = item.parentElement;
    const el = e.target;
    const { index } = el.dataset;

    if (!todoText.classList.contains("completed")) {
      todos = JSON.parse(localStorage.getItem("Items"));

      const History = JSON.parse(localStorage.getItem("History"));
      const filtr = todos.filter((p) => p.id == index);
      const todosFiltr = filtr[0];
      const idtego = todosFiltr.id;
      todosFiltr.done = true;
      todosFiltr.id = History.length;
      const historytask = todosFiltr;
      History.push(historytask);
      localStorage.setItem("History", JSON.stringify(History));
      localStorage.setItem("Items", JSON.stringify(todos));
      todoText.classList.add("completed");
      item.innerHTML = '<i class="fas fa-check-circle"></i>';
      todoText.classList.add("animation");
      const ten = todos.find((element) => element == todosFiltr);
      if (todosFiltr.repeatday != 0) {
        const isLargeNumber = (element) => element == todosFiltr;
        // const newtodos = [...todos];
        const newtodos = JSON.parse(JSON.stringify(todos));
        const idcurrent = todos.findIndex(isLargeNumber);
        const idtesku = idcurrent;
        const newIndex = newtodos[idtesku];
        let lastId = 0;
        todos.forEach((ele) => {
          if (ele.id > lastId) {
  lastId = ele.id;
          }
        });
        // eslint-disable-next-line no-plusplus
        newIndex.id = ++lastId;
        newIndex.done = false;
        // newIndex.completiondate = dateToday;

        const dateString = newIndex.data;
        // eslint-disable-next-line no-undef
        newIndex.data = moment(dateString)
          .add(newIndex.repeatday, newIndex.repeatpartoftime)
          .format("YYYY-MM-DD");
        todos.push(newIndex);
      }
      const newtodos = JSON.parse(JSON.stringify(todos));
      const isLargeNumber = (element) => element == todosFiltr;
      const idcurrent = todos.findIndex(isLargeNumber);
      audio = new Audio("Alerts/deleteTask.mp3");
      audio.play();
      const todo = item.parentElement;
      todo.classList.add("fall");
      todos.splice(idcurrent, 1);

      localStorage.setItem("Items", JSON.stringify(todos));
      todo.addEventListener("transitionend", () => {
        todo.remove();
        resetTimer();
      });
      centerDiv.classList.add("active");
      centerDiv.classList.add("center");
      centerDiv.classList.remove("none");
      actualList = todos;
      statTask();

      return;
      centerDiv.classList.add("active");
    }
  }
  //* timer start function
  if (item.classList[0] === "center_play-btn") {
    resizeClock();
    resize.classList.remove(".countdownButtonsNone");

    pause.removeEventListener("click", timerBreak);
    const { index } = e.target.id;
    taskId = e.target.id;
    timer();
    clearInterval(countdownTime);
    const seconds = pomodoreDuration * 60;
    timer(seconds);
    clockTimer.classList.remove("clock_timerFinish");
    countdownAnimation(item);
    item.innerHTML = '<i class="fa fa-clock"></i>';
  }
  localStorage.setItem("Items", JSON.stringify(todos));
  lists(actualList, todoList);
}
// pomodoreDuration;

let secondsLeft;
const paused = false; // is the clock paused?

// eslint-disable-next-line no-unused-vars

function addProject(event) {
  project = JSON.parse(localStorage.getItem("Project")) || [];

  let lastId = 0;
  project.forEach((ele) => {
    if (ele.id > lastId) {
      lastId = ele.id;
    }
  });
  event.preventDefault();
  const Project = {
    id: ++lastId,
    name: addPr.value,
    color: projectColor.value,
  };
  project.push(Project);
  localStorage.setItem("Project", JSON.stringify(project));
  addPr.value = "";
  renderProjects();
}

window.sortingProject = sortingProject;
window.deleteProject = deleteProject;
function renderProjects() {
  const proj = JSON.parse(localStorage.getItem("Project")) || [];
  pomodoreList.innerHTML = proj
    .map(
      (proje) => `
<li class=" sortTask ${proje.name} left_projectItem"   value="${proje.name}" name="${proje.name}" >
 <div class="projectList " tabindex="0"  onclick="sortingProject(this); activeProject(this);"   value="${proje.name}" name="${proje.name}">
  <span class="circle" style="background-color: ${proje.color};">
  </span>
  ${proje.name} 
  </div>
  <button class="projectDelete" aria-label="delete"  onClick="deleteProject()" id=${proje.id} >  <i class="fas fa-minus-circle" 
  aria-hidden="true" id=${proje.id} name=${proje.name}></i></button>
  </li>
`,
    )
    .join("");
}
renderProjects();

// eslint-disable-next-line no-unused-vars
function sortingProject(clicked_id) {
  clicked = clicked_id.getAttribute("name");
  let currentProject;
  currentProject = JSON.parse(localStorage.getItem("Current")) || [];
  if (currentProject == 0) {
    currentProject = [{ id: 0, name: clicked }];
    window.localStorage.setItem("Current", JSON.stringify(currentProject));
} else {
    project = JSON.parse(localStorage.getItem("Current"));
  }

  currentProject = [{ id: 0, name: clicked }];
  window.localStorage.setItem("Current", JSON.stringify(currentProject));

  tasks = JSON.parse(localStorage.getItem("Items")) || [];
  const tasksProject = tasks.filter((item) => item.project == clicked);
  // showToDoCard();
  lists(tasksProject, todoList);
  showToDoCard();
  titleName();
  return tasksProject;
}
//
function sortingProjectDays(e) {
  taskToday = 0;
  let taskTomorrow = 0;
  let taskSomeday = 0;
  clicked = e.target.id;
  tasks = JSON.parse(localStorage.getItem("Items")) || [];
  switch (clicked) {
    case "Today":
		taskToday = tasks.filter((items) => items.data === dateToday);

      lists(taskToday, todoList);
      break;
    case "Tomorrow":
      taskTomorrow = tasks.filter((items) => items.data === dateTomorrow);
      // renderProjects();
	  console.log(taskTomorrow);
      lists(taskTomorrow, todoList);
      break;
    case "Someday":
      taskSomeday = tasks.filter(
        (items) => items.data !== dateTomorrow || dateToday,
      );
      lists(taskSomeday, todoList);
      break;
    case "Completed":
      // const history = JSON.parse(localStorage.getItem('History'));
      if (history.length == 0) {
        emptyList.classList.remove("none");
      }
      if (history.length > 0) {
        emptyList.classList.add("none");
      }
      todoList.innerHTML = history
        .map(
          (
            todo,
          ) => `<li class="center_divT completed"><div  class="center_todo-item" id="item${
            todo.id
          }" >${todo.text} ${
            todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ""
          }
</div>
<div class="center_clocks">
<i class="fas fa-clock time"> </i>  
<div class="scores"> 
${todo.focus > 0 ? `  ${todo.focus} min` : 0}
</div> 
</div>
<button class="center_complete-btn" aria-label="Complete>
<i class="fas fa-check-circle" id="item${todo.id}" aria-hidden="true"></i>
</button>
</li>
`,
        )

        .join("");
      // lists(taskSomeday, todoList);

      break;
    default:
		break;

		showToDoCard();
	}


  let currentProject = JSON.parse(localStorage.getItem("Current"));

  if (
clicked = 0
    ) {
      clicked = "Today";
    }
	currentProject[0].name = clicked;
	console.log(currentProject);
// currentProject.push(clicked);
// clicked = currentProject
    // window.localStorage.setItem('Current', JSON.stringify(clicked));
	   window.localStorage.setItem("Current", JSON.stringify(currentProject));
	currentProject = JSON.parse(localStorage.getItem("Current"));

	console.log(currentProject);
	titleName();
  showToDoCard();
}
document.querySelectorAll(".left_day").forEach((e) => {
  e.addEventListener("click", sortingProjectDays);
});
function deleteProject() {
  const click = event.currentTarget.id;
  project = JSON.parse(localStorage.getItem("Project")) || [];
  const deleteProj = project.filter((item) => item.id != click);
  localStorage.setItem("Project", JSON.stringify(deleteProj));
  renderProjects();
}
function ifmobile() {
  if (mobileWidth.matches) {
    showProjectList();
  }
}
addProjectbtn.addEventListener("click", addProject);
pause.addEventListener("click", pausetimer);
reset.addEventListener("click", resetTimer);
todoList.addEventListener("click", btnActtion);
showProject.addEventListener("click", ifmobile);

function repeatTasks() {
  const Items = JSON.parse(localStorage.getItem("Items"));
  for (let i = 0; i < Items.length; i += 1) {
    const dateString = Items[i].data;
    if (dateToday > Items[i].data) {
      Items[i].data = moment(dateString)
        .add(Items[i].repeatday, Items[i].repeatpartoftime)
        .format("YYYY-MM-DD");
      localStorage.setItem("Items", JSON.stringify(Items));
    }
  }
}
repeatTasks();

window.activeProject = activeProject;
function openNoteCard(clicked_id) {
  const clicked = clicked_id.getAttribute("name");
  const modals = document.querySelectorAll(".modal");
  for (const ele of modals) {
    ele.classList.remove("active");
    ele.classList.add("none");
    if (ele.classList.contains(clicked)) {
      ele.classList.add("active");
      ele.classList.remove("none");
    }
    if (clicked == "pomodoreCard" && mobileWidth.matches) {
      centerDiv.classList.add("none");
      centerDiv.classList.remove("active");
      leftDiv.classList.add("leftnone");
    }
  }
}
window.openNoteCard = openNoteCard;
	function titleName() {
 const currentProject = JSON.parse(localStorage.getItem("Current"));
 if (currentProject == null) {
   currentProject[0].name = Today;
 }
   console.log(currentProject);

	title.innerHTML = currentProject.map(
		(title) => ` ${title.name}`,
)

        .join("");
}
titleName();
// push notification
Notification.requestPermission((status) => {
    console.log("Notification permission status:", status);
	// displayNotification();
});

export {
  lists,
  actualList,
  paused,
  mobileWidth,
  pause,
  leftDiv,
  description,
  countdownTime,
  secondsLeft,
  timeInFocus,
  clockTimer,
  todoList,
  buttonscountdown,
  countdownTimer,
  pomodoreDuration,
  audio,
};
