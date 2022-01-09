import {
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  where,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import {
  actualList,
  todoList,
  renderPomodoroTasks,
  mobileWidth,
  pause,
  leftDiv,
  description,
  pomodoreDuration,
  allnotelist,
} from "./app.js";

export {
 showToDoCard, showProjectList, activeProject, centerDiv, showDiv 
};
let unsubscribe;

const centerDiv = document.querySelector(".center");
const menuLis = document.querySelectorAll(".nav_element");

function showToDoCard() {
  centerDiv.classList.remove("none");
  centerDiv.classList.add("active");
  if (mobileWidth.matches) {
    leftDiv.classList.add("none");
    leftDiv.classList.remove("active");
  }
  // ifmobile();
}
function showProjectList() {
  centerDiv.classList.add("none");
  centerDiv.classList.remove("center");
  leftDiv.classList.remove("leftnone");
  description.classList.add("none");
  centerDiv.classList.add("none");
}
function activeProject(clicked_id) {
  const sell = clicked_id.getAttribute("name");
  const sorts = document.querySelectorAll(".sortTask");
  for (const ele of sorts) {
    ele.classList.remove("select");
    if (ele.classList.contains(sell)) {
      ele.classList.add("select");
    }
  }

  // nameofProject =
}
window.activeProject = activeProject;


const todox = [];
todox.length = 0;
console.log(todox);
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .collection("Project")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          const Lista = doc.data();
          todox.push(Lista);
        });
      });
  } else {
    unsubscribe && unsubscribe();
  }
});

function showDiv(clickedId) {
  description.classList.remove("none");
  description.classList.add("right--active");
  // renderdetals();

  let taskDetails = [];
  console.log(allnotelist);
  allnotelist.forEach((ele) => {
    if (ele.id == clickedId) {
      taskDetails = ele;
    }
  });
  console.log(taskDetails);
  renderdetals();
  function renderdetals() {
    // const todoss = JSON.parse(localStorage.getItem("Items")) || [];
    // const filter = todoss.filter((p) => p.id == clickedId);
    // const taskDetails = filter;
    description.innerHTML = `
<button class="close-btn"  data-index=${clickedId} id="${clickedId}" >
<i class="fas fa-times"
    aria-hidden="true"></i></button>
    <div class="right_divT ">
    <div  class="center_todo-item" id="item" >
    ${taskDetails.text}</div>
        </div>
<div class="right_detals">
<ul class="right_list">
                <li class="right_list--item center_clocks">Pomodoro:     ${
                  taskDetails.focus > pomodoreDuration
                    ? '<i class="fas fa-clock time " aria-hidden="true"> </i>'
                    : '<i class="fas fa-clock blur " aria-hidden="true"> </i>'
                }
        ${
          taskDetails.focus / pomodoreDuration > 1
            ? ` x ${Math.floor(taskDetails.focus / pomodoreDuration)}`
            : ""
        }
    </li>
                <li>
                Due date: </li>
                <li> <input type="date" class="numberOfTime" id="date" value="${
                  taskDetails.data
                }" name="trip-start"></li>
			
<li>   Project:</li>
             <li>
<select name="Project" value="${
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
                <li>Repeat: Every</li> <li> <input type="number" class="repeatDay numberOfTime" value="${
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
   <option value="${taskDetails.repeatpartoftime}"  selected disabled hidden>
   ${taskDetails.repeatpartoftime}
   </option>
                  // <option value="days">Days</option>
                  // <option value="weeks">Weeks</option>
                  // <option value="months">Month</option>
                </select>
                </ul>
                <textarea  placeholder="Note to your task" class="note textareaDetals" id=${clickedId} name="note" >${
      taskDetails.note !== "" ? taskDetails.note : ""
    }
    </textarea>
</div>
`;
    const closeBtn = document.querySelector(".close-btn");
    const date = document.getElementById("date");
    const note = document.querySelector(".note");
    const timePart = document.querySelector(".partOfTime");
    const repeatDay = document.querySelector(".repeatDay");
    const project = document.querySelector(".projectSelect");
    date.addEventListener("change", updateDetails);
    closeBtn.addEventListener("click", closeDiv);
    note.addEventListener("input", updateDetails);
    repeatDay.addEventListener("input", updateDetails);
    const projectSelect = document.getElementById("Project");
    projectSelect.addEventListener("click", () => {
      // const options = projectSelect.querySelectorAll('option');
      projectSelect.addEventListener("change", updateDetails);
    });
    const partTimeSelect = document.getElementById("partOfTime");
    partTimeSelect.addEventListener("click", () => {
      // const optionsTime = partTimeSelect.querySelectorAll('option');
      partTimeSelect.addEventListener("change", updateDetails);
    });
    function closeDiv() {
      description.classList.add("none");
      centerDiv.classList.add("active");
      centerDiv.classList.remove("none");
    }
    function updateDetails() {
      // const proj = JSON.parse(localStorage.getItem("Items"));
      // const filtrPr = proj.filter((p) => p.id == clickedId);
      // const Idtoedit = filtrPr[0];
      taskDetails.data = date.value;
      taskDetails.project = project.value;
      taskDetails.note = note.value;
      taskDetails.repeatday = repeatDay.value;
      taskDetails.repeatpartoftime = timePart.value;
      // localStorage.setItem("Items", JSON.stringify(proj));
      auth.onAuthStateChanged((user) => {
        if (user) {
          const ClickedTaskId = JSON.stringify(clickedId);
          console.log(ClickedTaskId);
          // console.log(ajdi);
          db.collection("users")
            .doc(user.uid)
            .collection("Items")
            .doc(ClickedTaskId)
            .update({
              data: date.value,
              project: project.value,
              note: note.value,
              repeatDay: repeatDay.value,
              repeatpartoftime: timePart.value,
            });
        }
      });
    }

    const divT = document.querySelector(".center_divT");
    divT.addEventListener("click", renderdetals);
    getSelectOptions();

    renderPomodoroTasks(actualList, todoList);
  }
// let option;
// let optionList = [];
  function getSelectOptions() {

    // db.collection("users").doc(user.uid).collection("Project").onSnapshot((snapshot) => {
// db.collection("users").doc("logUserId").collection("Items")
// .onSnapshot((querySnapshot) => {
//   Lista = 0;
//   const todoList = [];
//   todoList.length = 0;
//   console.log(todoList);
//   querysSnapshot.docs.map((doc) => {
//     option = doc.data();
//     OptionList.push(Lista);
//   });
// });
    const projectList = JSON.parse(localStorage.getItem("Project")) || [];
    console.log("elo");
    const projectt = document.querySelector(".projectSelect");

    for (let i = 0; i < todox.length; i++) {
      console.log(todox);
      const option = document.createElement("option");
      const txt = document.createTextNode(todox[i].name);
      option.appendChild(txt);
      projectt.insertBefore(option, projectt.lastChild);
    }
  }
}

for (const nav of menuLis) {
  nav.addEventListener("click", function () {
    for (const nav of menuLis) {
      nav.classList.remove("selected");
    }

    this.classList.add("selected");
    description.classList.add("none");
  });
}
