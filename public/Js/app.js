/* eslint-disable prettier/prettier */
import {
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
   import {
  showToDoCard,
  showProjectList,
  activeProject,
  centerDiv,
  showDiv,
} from "./showElements.js";
import { logUserId, thingsRef } from "./settings.js";

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
import * as firebase from "./firebase.js";

import { auth, db } from "./firebase.js";

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
const todos = JSON.parse(localStorage.getItem("Items"));
const countdownTimer = document.getElementById("countdown");
let clicked;
let timeInFocus;
let settings;
let countdownTime;
let taskId = 0;
let taskToday;
let audio;
let actualSelect;
let actualList = [];
let setting;
let Sound;
let pomodoreDuration;
let Theme;
let breakTimes;
let pomodoreTime;
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(logUserId).collection("Items");
    unsubscribe = thingsRef
      .doc(logUserId)
      .collection("settings")
      .onSnapshot((querySnapshot) => {
        allnotelist.length = 0;
        querySnapshot.docs.map((doc) => {
          Sound = doc.data().Sound;
          Theme = doc.data().Theme;
          breakTimes = doc.data().breakTime;
          pomodoreDuration = doc.data().pomodoreTime;
          setting = doc.data();
        });
      });
    }
  });
  const shortBreak = breakTimes * 60;
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
let allnotelist = [];
let oneTask;
let unsubscribe;
let Lista;

allnotelist.length = 0;
renderPomodoroTasks();
  auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(logUserId).collection("Items");
    unsubscribe = thingsRef
    .doc(logUserId)
    .collection("Items")
      .onSnapshot((querySnapshot) => {
        allnotelist.length = 0;
        querySnapshot.docs.map((doc) => {
          Lista = doc.data();
          actualList.push(Lista);
        });
        console.log(actualList);

     });
      } else {
    unsubscribe && unsubscribe();
  }
});


function renderPomodoroTasks(todolist = []) {
  const actualList = [];

  const ast = todoList;

  auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(logUserId).collection("Items");
    unsubscribe = thingsRef
    .doc(logUserId)
    .collection("Items")
      .onSnapshot((querySnapshot) => {
        allnotelist.length = 0;
        querySnapshot.docs.map((doc) => {
        let  Listas = doc.data();
          actualList.push(Listas);
        });
 db.collection("users").doc(logUserId).collection("Items");
    unsubscribe = thingsRef
    .doc(logUserId)
    .collection("Actual")
      .onSnapshot((querySnapshot) => {
        allnotelist.length = 0;
        actualList.length = 0;
        querySnapshot.docs.map((doc) => {
      Lista = doc.data();
          // allnotelist = Lista;
          actualList.push(Lista);
  if (actualList.length == 0) {
    emptyList.classList.remove("none");
  }
  if (actualList.length > 0) {
    emptyList.classList.add("none");
  }
  todoList.innerHTML = actualList
    .map(
      (todo) => `${todo.done
          ? '<li   class="center_divT completed">'
          : '<li class="center_divT " >'
        }    
<div  class="center_todo-item" id="item${todo.id}" >${todo.text} ${todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ""
        }

</div>
<div  class="center_clocks"> 

${todo.focus > [pomodoreDuration]
          ? '<i class="fas fa-clock  " aria-hidden="true"> </i>'
          : '<i class="fas fa-clock blur  " aria-hidden="true"> </i>'
        }
<div class="score"> 
${todo.focus / pomodoreDuration > 2
          ? ` x ${Math.floor(todo.focus / pomodoreDuration)}`
          : ""
        }
</div> 
</div>

<button tabindex="0" class="center_complete-btn" aria-label="Complete" data-index=${todo.id
        } id="item${todo.id}" >
${todo.done
          ? `<li class="fas fa-check-circle" id="item${todo.id}" aria-hidden="true">`
          : `<li class="fas fa-circle" id="item${todo.id}" aria-hidden="true">`
        } 
</button>




<button autofocus tabindex="0" class="center_delete-btn" aria-label="Delete" data-index=${todo.id
        } id="item${todo.id
        }">   <i class="fas fa-minus-circle" aria-hidden="true"> </i>
</button>
<button  tabindex="0"class="center_play-btn" aria-label="Play" data-index=${todo.id
        } id="${todo.id
        }"> <i class="fas fa-play-circle" aria-hidden="true"></i></button>
<button tabindex="0" class="center_des-btn" aria-label="Detals"  data-index=${todo.id
        } id="${todo.id}" onclick="showDiv(${todo.id
        })"  > <i class="fas fa-list-alt" 
aria-hidden="true"></i></button>
</li>
`,
    )

    .join("");
  });
      });
     });
      } else {
    unsubscribe && unsubscribe();
  }
});
}
//! creat new if item and login to connect from database and make virable logUserId
window.showDiv = showDiv;

renderPomodoroTasks(actualList, todoList);

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

function addTodo(event) {
   auth.onAuthStateChanged((user) => {
     if (user) {
   let lastId;
   const todoInput = document.querySelector(".center_todoInput");

            let nextId;
   db.collection("users")
              .doc(user.uid)
              .collection("Items")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  lastId = doc.data().id;
                  lastId++;
                  nextId = lastId.toString();
                });

                db.collection("users")
                  .doc(logUserId)
                  .collection("Items")
                  .doc(nextId)
                  .set({
                   id: lastId,
    text: todoInput.value,
    done: false,
    focus: 0,
    project: currentProject,
    repeatday: "1",
    repeatpartoftime: "day",
    data: dateToday,
    note: "",
                  });
              });

  event.preventDefault();
  centerDiv.classList.add("active");
  centerDiv.classList.remove("none");
  // todoInput.value = "";
  // statTask();
} else {
  unsubscribe && unsubscribe();
}
});
}
statTask();
function statTask() {
    auth.onAuthStateChanged((user) => {
     if (user) {
  let dbtoBeCompleted = 0;
  let dbestimated = 0;
  let dbelapsed = 0;
  let dbcountCompleted = 0;
db.collection("users").doc(logUserId).collection("STat").onSnapshot((querySnapshot) => {
  const elements = querySnapshot.docs;

  const db = querySnapshot.docs.map((doc) => {
        });
});
let historyTasks;
let ListaStat = 0;
db.collection("users").doc(user.uid).collection("History")
.onSnapshot((querySnapshot) => {
  dbcountCompleted = 0;

       const historylist = [];
       historylist.length = 0;

  querySnapshot.docs.map((doc) => {
  ListaStat = doc.data();
          historylist.push(ListaStat);
  });
   for (let i = 0; i < historylist.length; i += 1) {
    if (historylist[i].done == true && historylist[i].data == dateToday) {
      dbcountCompleted += 1;
    }
  }
  //! get all task from Item and count Task to
  dbtoBeCompleted = 0;
  db.collection("users").doc(user.uid).collection("Items")
  .onSnapshot((querySnapshot) => {
      const todoListst = [];
      todoListst.length = 0;
  // Lista = 0;
  querySnapshot.docs.map((doc) => {
    ListaStat = doc.data();
    todoListst.push(ListaStat);
  });

dbtoBeCompleted = 0;
  for (let i = 0; i < todoListst.length; i += 1) {
    if (todoListst[i].done == false && todoListst[i].data == dateToday) {
      dbtoBeCompleted += 1;
    }
  }
  let focuscount = 0;
//! counting task from history where data is today or not??
   for (let i = 0; i < todoListst.length; i += 1) {
     const ast = todoListst[i].focus;
      focuscount += ast;
    }
    dbestimated = dbtoBeCompleted * pomodoreDuration;
    const minutesEs = dbestimated % 60;
    const hours = Math.floor(dbestimated / 60);
    const estimatedHM = `${hours}.${minutesEs < 10 ? "0" : ""}${minutesEs}`;
    document.getElementById("estimated").innerHTML = estimatedHM;
        dbelapsed = Math.floor(focuscount / 60);
    const minutes = dbelapsed % 60;
    const elapsedHM = `${dbelapsed}.${minutes < 10 ? "0" : ""}${minutes}`;
    document.getElementById("elapse").innerHTML = elapsedHM;
    document.getElementById("completedTasks").innerHTML = dbcountCompleted;
    document.getElementById("taskstobe").innerHTML = dbtoBeCompleted;
db.collection("users").doc(logUserId).collection("STat").doc("0")
                    .set({
comp: dbtoBeCompleted,
complete: dbcountCompleted,
estimated: dbestimated,
elapsed: dbelapsed,

                    });
    });
});
     } else {
    unsubscribe && unsubscribe();
  }
});
}

statTask();
todoButton.addEventListener("click", addTodo);
renderPomodoroTasks(actualList, todoList);
// * functions buttons action delate play and completted task
// ! allTasklist w tej zmiennej zbieraj wszystkie taski z bazy danych i na jej podstawie ustawaj i zaznaczaj taski wykonane owrapuj wszystkie ify tą funkcją żeby była ona dostępna
function btnActtion(e) {
  const allTasklist = [];
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users").doc(logUserId).collection("Items");
      unsubscribe = thingsRef
      .doc(logUserId)
      .collection("Items")
        .onSnapshot((querySnapshot) => {
          allnotelist.length = 0;
          allTasklist.length = 0;
          querySnapshot.docs.map((doc) => {
            Lista = doc.data();
            // allTasklist = Lista;
            allTasklist.push(Lista);
          });
        });
      } else {
        unsubscribe && unsubscribe();
      }
    });

  statTask();

  const item = e.target;
   let StrThisItem;
  if (item.classList[0] === "center_delete-btn") {
    audio = new Audio("Alerts/deleteTask.mp3");
    audio.play();
    const { ...index } = e.target.dataset;
    const todo = item.parentElement;
    todo.classList.add("fall");

let thisItem = [];
console.log(actualList);
//! zmieniłem tutaj na actualList i usuwanie wciąż nie działa,
actualList.forEach((ele) => {
  if (ele.id == index.index) {
    thisItem = ele.id;
  }
  console.log(thisItem);
            StrThisItem = JSON.stringify(thisItem);
});
toString(StrThisItem);
db.collection("users").doc(logUserId).collection("Items");
unsubscribe = thingsRef
.doc(logUserId)
.collection("Items").doc(StrThisItem).delete();
    const thisitem = todos.findIndex((char) => char.id == index.index);
    todos.splice(thisitem, 1);
    todo.addEventListener("transitionend", () => {
      todo.remove();
      resetTimer();
    });
    statTask();
    // actualList = todos;
    renderPomodoroTasks();

    return;
  }

  //* completed function
  if (item.classList[0] === "center_complete-btn") {
    const todoText = item.parentElement;
    const el = e.target;
       const { ...index } = e.target.dataset;

let thisItem = [];
let clickedTodo;
console.log(allnotelist)
console.log(actualList)
actualList.forEach((ele) => {
  if (ele.id == index.index) {
    thisItem = ele.id;
    clickedTodo = ele;
  }
            StrThisItem = JSON.stringify(thisItem);
            toString(StrThisItem);
});
let lastIdHistory;
let nextIdHistory;
// get last id
           db.collection("users")

.doc(logUserId)

              .collection("History")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              // oblicz ostatnie id z historii
.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  lastIdHistory = doc.data().id;
                  lastIdHistory++;
                  nextIdHistory = lastIdHistory.toString();
                  db.collection("users")
                  .doc(logUserId)
                  .collection("History")
                  .doc(nextIdHistory)
                  .set(clickedTodo);
                });
                db.collection("users")
               .doc(logUserId)
               .collection("History")
               .doc(nextIdHistory)
               .update({ id: nextIdHistory });
                         db.collection("users")
                         .doc(logUserId)
.collection("History").doc(nextIdHistory)
.update({
  done: true,
});
});
// usuń startego taska z listy
unsubscribe = thingsRef
.doc(logUserId)
.collection("Items").doc(StrThisItem).delete();

    if (!todoText.classList.contains("completed")) {
      todoText.classList.add("completed");
      item.innerHTML = '<i class="fas fa-check-circle"></i>';
      todoText.classList.add("animation");

      if (clickedTodo.repeatday != 0) {
         let lastId;

            let nextId;

   db.collection("users")
              .doc(logUserId)
              .collection("Items")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  lastId = doc.data().id;
                  lastId++;
                  nextId = lastId.toString();
                });

                const rep = clickedTodo.repeatday;
                const repTime = clickedTodo.repeatpartoftime;

              const newData = moment(clickedTodo.data).add(rep, repTime).format("YYYY-MM-DD");

                db.collection("users")
                .doc(logUserId)
                  .collection("Items")
                  .doc(nextId)
                  .set(clickedTodo);

                   db.collection("users")
                  .doc(logUserId)
                  .collection("Items")
                  .doc(nextId)
                  .update({
data: newData,
done: false,

                  });
                });
      }

      audio = new Audio("Alerts/deleteTask.mp3");
      audio.play();
      const todo = item.parentElement;
      todo.classList.add("fall");

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
  renderPomodoroTasks(actualList, todoList);
}

// pomodoreDuration;

let secondsLeft;
const paused = false; // is the clock paused?
// eslint-disable-next-line no-unused-vars
let projectList;
let titleProject;
let id;
let color;

auth.onAuthStateChanged((user) => {
  if (user) {
       db.collection("users").doc(logUserId).collection("Project");

unsubscribe = thingsRef.doc(logUserId).collection("Project").onSnapshot((querySnapshot) => {
  const allprojects = [];
  querySnapshot.docs.map((doc) => {
    projectList = doc.data();
    allprojects.push(projectList);
    titleProject = doc.data().name;
    id = doc.data().id;
    color = doc.data().color;
});
  pomodoreList.innerHTML = allprojects
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
  });
       } else {
      unsubscribe && unsubscribe();
    }
});
addProjectbtn.addEventListener("click", addProject);

function addProject(event) {
 let lastIdProject;
            let nextIdProject;
            db.collection("users")
              .doc(logUserId)
              .collection("Project")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  lastIdProject = doc.data().id;
                  lastIdProject++;
                });
                nextIdProject = lastIdProject.toString();
                    db.collection("users").doc(logUserId).collection("Project").doc(nextIdProject)
                    .set({

                      id: nextIdProject,
                      name: addPr.value,
                      color: projectColor.value,
                      // project.push(Project);
                    });
                    addPr.value = "";
                  });
                  event.preventDefault();
}

window.sortingProject = sortingProject;
window.deleteProject = deleteProject;
// eslint-disable-next-line no-unused-vars
let allProject;
let tasksProject;
// sortingProject();
const prospor = [];
function sortingProject(clicked_id) {
  clicked = clicked_id.getAttribute("name");
  currentProject = clicked;
  db.collection("users").doc(logUserId).collection("Current").doc("0")
  .set({

    id: 0,
    name: clicked,

  });
const allTasklist = [];
   auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(logUserId).collection("Items");
    unsubscribe = thingsRef
    .doc(logUserId)
    .collection("Items")
      .onSnapshot((querySnapshot) => {
        allnotelist.length = 0;
        querySnapshot.docs.map((doc) => {
          Lista = doc.data();
          allTasklist.push(Lista);
          actualList = allTasklist;
        });
 tasksProject = actualList.filter((item) => item.project == clicked);
 db.collection("users")
.doc(logUserId)
.collection("Actual")
  .get()
  .then((res) => {
    res.forEach((element) => {
      element.ref.delete();
    });

    for (let i = 0; i < tasksProject.length; i++) {
      const temporaryId = tasksProject[i].id;
      const stringtemporaryId = temporaryId.toString();
    db.collection("users")
    .doc(logUserId)
    .collection("Actual")
    .doc(stringtemporaryId)
    .set(tasksProject[i]);
    }
  });
  renderPomodoroTasks(tasksProject, todoList);
      });
            } else {
    unsubscribe && unsubscribe();
  }
});
  showToDoCard();
  titleName();
}
//
function sortingProjectDays(e) {
  const history = [];
  let historyTodo;
  taskToday = 0;
  let taskTomorrow = 0;
  let taskSomeday = 0;
  const allProjectList = [];
  let taskone;
  clicked = e.target.id;
   db.collection("users")
    .doc(logUserId)
    .collection("Items")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        taskone = doc.data();
allProjectList.push(taskone);
      });
  switch (clicked) {
    case "Today":
      taskToday = allProjectList.filter((items) => items.data === dateToday);
//! add all selected task to list with actual tasks
db.collection("users")
.doc(logUserId)
.collection("Actual")
  .get()
  .then((res) => {
    res.forEach((element) => {
      element.ref.delete();
    });

    for (let i = 0; i < taskToday.length; i++) {
      const temporaryId = taskToday[i].id;
      const stringtemporaryId = temporaryId.toString();
    db.collection("users")
    .doc(logUserId)
    .collection("Actual")
    .doc(stringtemporaryId)
    .set(taskToday[i]);
    }
  });

 db.collection("users")
                 .doc(logUserId)
                 .collection("Current")
                 .doc("0")
                 .set({
   name: "Today",
                 });

      renderPomodoroTasks();
      break;
    case "Tomorrow":
      taskTomorrow = allProjectList.filter((items) => items.data === dateTomorrow);
//! save selectet data to Actual list in the database
db.collection("users")
.doc(logUserId)
.collection("Actual")
  .get()
  .then((res) => {
    res.forEach((element) => {
      element.ref.delete();
    });

    for (let i = 0; i < taskTomorrow.length; i++) {
      const temporaryId = taskTomorrow[i].id;
      const stringtemporaryId = temporaryId.toString();
    db.collection("users")
    .doc(logUserId)
    .collection("Actual")
    .doc(stringtemporaryId)
    .set(taskTomorrow[i]);
    }
  });

      //! add all selected task to list with actual tasks
       db.collection("users")
                 .doc(logUserId)
                 .collection("Current")
                 .doc("0")
                 .set({
   name: "Tomorrow",
                 });
      renderPomodoroTasks(taskTomorrow, todoList);
      break;
    case "Someday":
      taskSomeday = allProjectList.filter(
        (items) => items.data !== dateTomorrow || dateToday,
      );

      db.collection("users")
.doc(logUserId)
.collection("Actual")
  .get()
  .then((res) => {
    res.forEach((element) => {
      element.ref.delete();
    });

    for (let i = 0; i < taskSomeday.length; i++) {
      const temporaryId = taskSomeday[i].id;
      const stringtemporaryId = temporaryId.toString();
    db.collection("users")
    .doc(logUserId)
    .collection("Actual")
    .doc(stringtemporaryId)
    .set(taskSomeday[i]);
    }
  });
       db.collection("users")
                 .doc(logUserId)
                 .collection("Current")
                 .doc("0")
                 .set({
   name: "Someday",
                 });

      renderPomodoroTasks();
      break;
    case "Completed":
      db.collection("users").doc(logUserId).collection("History").get()
.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
  historyTodo = doc.data();
history.push(historyTodo);
      });
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
          ) => `<li class="center_divT completed"><div  class="center_todo-item" id="item${todo.id
          }" >${todo.text} ${todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ""
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
});

break;
default:
  break;

      showToDoCard();
  }

titleName();
showToDoCard();
});
}
if ((clicked = null)) {
  clicked = "Today";

  db.collection("users")
                 .doc(logUserId)
                 .collection("Current")
                 .doc("0")
                 .set({
   name: clicked,
                 });
}
document.querySelectorAll(".left_day").forEach((e) => {
  e.addEventListener("click", sortingProjectDays);
});

//

function deleteProject() {
  const click = event.currentTarget.id;
 db.collection("users")
    .doc(logUserId)
    .collection("Project")
    .doc(click)
    .delete();
}

function ifmobile() {
  if (mobileWidth.matches) {
    showProjectList();
  }
}
pause.addEventListener("click", pausetimer);
reset.addEventListener("click", resetTimer);
todoList.addEventListener("click", btnActtion);
showProject.addEventListener("click", ifmobile);

function repeatTasks() {
  // console.log(allProjectList);
  for (let i = 0; i < actualList.length; i += 1) {
    const dateString = actualList[i].data;
    if (dateToday > actualList[i].data) {
      actualList[i].data = moment(dateString)
        .add(actualList[i].repeatday, actualList[i].repeatpartoftime)
        .format("YYYY-MM-DD");
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
   let itemOne;
  const itemAll = [];
  db.collection("users").doc(logUserId).collection("Project").get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      itemOne = doc.data();
      itemAll.push(itemOne);
    });
});

   currentProject = itemAll;
  if (currentProject == null) {
    currentProject.name = "Today";
  }

  title.innerHTML = currentProject
    .map((title) => ` ${title.name}`)

    .join("");
}
titleName();
export {
actualDateTime,
  dateToday,
  renderPomodoroTasks,
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
  allnotelist,
  shortBreak,
};
