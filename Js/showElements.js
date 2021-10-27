export{
	showToDoCard,
	showProjectList,
	activeProject,
	centerDiv,
  showDiv

}
import {
  actualList,
  todoList,
  lists,
mobileWidth,
pause,
leftDiv,
description,
pomodoreDuration
} from './app.js'
const centerDiv = document.querySelector('.center');
const menuLis = document.querySelectorAll('.nav_element');


function showToDoCard() {
  centerDiv.classList.remove('none');
  centerDiv.classList.add('active');
  if (mobileWidth.matches) {
    leftDiv.classList.add('none');
    leftDiv.classList.remove('active');
  }
  // ifmobile();
}
function showProjectList() {
  centerDiv.classList.add('none');
  centerDiv.classList.remove('center');
  leftDiv.classList.remove('leftnone');
  description.classList.add('none');
  centerDiv.classList.add('none');
}
function activeProject(clicked_id) {
  const sell = clicked_id.getAttribute('name');
  const sorts = document.querySelectorAll('.sortTask');
  for (const ele of sorts) {
    ele.classList.remove('select');
    if (ele.classList.contains(sell)) {
      ele.classList.add('select');
    }
  }

  // nameofProject =
}
window.activeProject=activeProject;
function showDiv(clickedId) {
  description.classList.remove('none');
  description.classList.add('right--active');
  renderdetals();
  function renderdetals() {
    const todoss = JSON.parse(localStorage.getItem('Items')) || [];
    const filter = todoss.filter((p) => p.id == clickedId);
    const taskDetails = filter[0];
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
            : ''
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
      taskDetails.note !== '' ? taskDetails.note : ''
    }
    </textarea>
</div>
`;
    const closeBtn = document.querySelector('.close-btn');
    const date = document.getElementById('date');
    const note = document.querySelector('.note');
    const timePart = document.querySelector('.partOfTime');
    const repeatDay = document.querySelector('.repeatDay');
  let  project = document.querySelector('.projectSelect');
    date.addEventListener('change', updateDetails);
    closeBtn.addEventListener('click', closeDiv);
    note.addEventListener('input', updateDetails);
    repeatDay.addEventListener('input', updateDetails);
    const projectSelect = document.getElementById('Project');
    projectSelect.addEventListener('click', () => {
      // const options = projectSelect.querySelectorAll('option');
      projectSelect.addEventListener('change', updateDetails);
    });
    const partTimeSelect = document.getElementById('partOfTime');
    partTimeSelect.addEventListener('click', () => {
      // const optionsTime = partTimeSelect.querySelectorAll('option');
      partTimeSelect.addEventListener('change', updateDetails);
    });
    function closeDiv() {
      description.classList.add('none');
      centerDiv.classList.add('active');
      centerDiv.classList.remove('none');
    }
    function updateDetails() {
      const proj = JSON.parse(localStorage.getItem('Items'));
      const filtrPr = proj.filter((p) => p.id == clickedId);
      const Idtoedit = filtrPr[0];
      Idtoedit.data = date.value;
      Idtoedit.project = project.value;
      Idtoedit.note = note.value;
      Idtoedit.repeatday = repeatDay.value;
      Idtoedit.repeatpartoftime = timePart.value;
      localStorage.setItem('Items', JSON.stringify(proj));
    }
    const divT = document.querySelector('.center_divT');
    divT.addEventListener('click', renderdetals);
    getSelectOptions();
    lists(actualList, todoList);
  }
  function getSelectOptions() {
    const projectList = JSON.parse(localStorage.getItem('Project')) || [];
    const projectt = document.querySelector('.projectSelect');
    for (let i = 0; i < projectList.length; i++) {
      const option = document.createElement('option');
      const txt = document.createTextNode(projectList[i].name);
      option.appendChild(txt);
      projectt.insertBefore(option, projectt.lastChild);
    }
  }
}

for (const nav of menuLis) {
  nav.addEventListener('click', function () {
    for (const nav of menuLis) {
      nav.classList.remove('selected');
    }
    
    this.classList.add('selected');
    description.classList.add('none');
  });
}