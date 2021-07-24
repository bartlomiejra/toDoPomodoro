/* eslint-disable eqeqeq */
const centerDiv = document.querySelector('.center');
const leftDiv = document.querySelector('.left');
const projectIcon = document.querySelector('.Project');
const mobileWidth = window.matchMedia('(max-width: 895px)');
const todoInput = document.querySelector('.center_todoInput');
const addProjectbtn = document.querySelector('.left_addProjectBtn');
const addPr = document.querySelector('.left_Projects');
const todoButton = document.querySelector('.center_addtaskButton');
const todoList = document.querySelector('.center_todolist');
const showProject = document.querySelector('.Project');
const emptyList = document.querySelector('.center_emptyList');
const clockTimer = document.querySelector('.clock');
const buttonscountdown = document.querySelector('.countdownButtons');
const pause = document.querySelector('.center_pauseButton');
const reset = document.querySelector('.center_resetButton');
const description = document.querySelector('.right');
const resize = document.querySelector('.fa-window-restore');
const projectColor = document.getElementById('color');
const pomodoreList = document.querySelector('.left_pomodoreProjects');
let dateToday;

let dateTomorrow = 0;

console.log(dateToday);
const history = JSON.parse(localStorage.getItem('History'));

if (history == null) {
    console.log('history load ');
    const historylist = [
        {
            id: 0,
            text: 'Meditate',
            done: true,
            focus: 21,
            project: 'Mindfulness 🧘',
            repeatday: '1',
            repeatpartoftime: 'day',
            data: 4,
            note: ' 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ',
        },
    ];
    window.localStorage.setItem('History', JSON.stringify(historylist));
} else {
    console.log('history load');
}

let todos = JSON.parse(localStorage.getItem('Items'));
if (todos == null) {
    todos = [
        {
            id: 0,
            text: 'Meditate',
            done: false,
            focus: 0,
            project: 'Mindfulness 🧘',
            repeatday: '1',
            repeatpartoftime: 'day',
            data: dateToday,
            note: ' 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ',
        },
        {
            id: 1,
            text: 'Basic Spanish Words',
            done: false,
            focus: 0,
            project: 'Spanish Lesson 🇪🇸',
            repeatday: '1',
            repeatpartoftime: 'day',
            data: dateToday,
            note: ' Spanish Vocabulary Lists Organized by Topic\n Basic Spanish vocabulary: Greetings\n Basic Spanish vocabulary: Manners\n Basic Spanish vocabulary: Your first conversation\n Basic Spanish vocabulary: Family members\n Basic Spanish vocabulary: Food and drinks\n Intermediate Spanish vocabulary: Clothing\n Intermediate Spanish vocabulary: Dates and times\n',
        },
        {
            id: 4,
            text: ' Call grandma',
            data: dateToday,
            done: false,
            focus: 0,
            note: "don't forget your grandma!👵 ",
            project: 'SocialLive 🍹  ',
            repeatday: '1',
            repeatpartoftime: 'day',
        },
    ];
    window.localStorage.setItem('Items', JSON.stringify(todos));
} else {
    console.log('Itemki sa ');
}

let project = JSON.parse(localStorage.getItem('Project'));
console.log(project);
if (project == null) {
    project = [
        { id: 0, name: 'Studies 👨‍🎓', color: '#9ebb11' },
        { id: 1, name: 'Running 🏃', color: '#11bb44' },
        { id: 2, name: 'Reading 📚', color: '#bb1111' },
        { id: 3, name: 'SocialLive 🍹  ', color: '#989f65' },
        { id: 4, name: 'Mindfulness 🧘', color: '#00459e' },
        { id: 4, name: 'Spanish Lesson 🇪🇸', color: '#ff459e' },
    ];
    window.localStorage.setItem('Project', JSON.stringify(project));
} else {
    project = JSON.parse(localStorage.getItem('project'));
}

let audio;
let clicked;

let timeInFocus;
let pomodoreDuration;
let settings;
const settinglocal = JSON.parse(localStorage.getItem('settings'));
if (settinglocal == null) {
    settings = { Theme: 'Dark', pomodoreTime: 25 };

    window.localStorage.setItem('settings', JSON.stringify(settings));
} else {
    // console.log(settings);
    pomodoreDuration = settinglocal.pomodoreTime;
}
// console.log(pomodoreDuration);
let countdownTime;
const countdownTimer = document.getElementById('countdown');
let taskId = 0;
let taskToday;
// let taskToday = 0;
let tasks = JSON.parse(localStorage.getItem('Items')) || [];
// const objlines = 0;
// let actualList;
// console.log(actualList);
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
tasks = JSON.parse(localStorage.getItem('Items')) || [];
taskToday = tasks.filter((items) => items.data === dateToday);
let actualSelect;
let actualList;
actualList = JSON.parse(localStorage.getItem('Actual')) || [];
lists(actualList, todoList);
console.log(actualList);
if (actualList == 0) {
    actualSelect = [{ id: 0, name: 'Studies 👨‍🎓' }];
    window.localStorage.setItem('Actual', JSON.stringify(actualSelect));
} else {
    project = JSON.parse(localStorage.getItem('project'));
}
// todolist = JSON.parse(localStorage.getItem('Items')) || [];
function lists(todolist = []) {
    actualList = todolist;
    window.localStorage.setItem('Actual', JSON.stringify(actualList));
    console.log(actualList);

    // console.log(actualList);
    //   console.log(actualList.length);
    if (actualList.length == 0) {
        emptyList.classList.remove('none');
    }
    if (actualList.length > 0) {
        emptyList.classList.add('none');
    }
    todoList.innerHTML = actualList
        .map(
            (todo) => `${
                todo.done
                    ? '<li class="center_divT completed">'
                    : '<li class="center_divT " >'
            }    
<div  class="center_todo-item" id="item${todo.id}" >${todo.text} ${
                todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ''
            }

</div>
<div  class="center_clocks"> 

${
    todo.focus > [pomodoreDuration]
        ? '<i class="fas fa-clock  time" aria-hidden="true"> </i>'
        : '<i class="fas fa-clock blur  time" aria-hidden="true"> </i>'
}
<div class="score"> 
${
    todo.focus / pomodoreDuration > 2
        ? ` x ${Math.floor(todo.focus / pomodoreDuration)}`
        : ''
}
</div> 
</div>

<button class="center_complete-btn" aria-label="Complete" data-index=${
                todo.id
            } id="item${todo.id}" >
${
    todo.done
        ? `<li class="fas fa-check-circle" id="item${todo.id}" aria-hidden="true">`
        : `<li class="fas fa-circle" id="item${todo.id}" aria-hidden="true">`
} 
</button>




<button class="center_delete-btn" aria-label="Delete" data-index=${
                todo.id
            } id="item${
                todo.id
            }">   <i class="fas fa-minus-circle" aria-hidden="true"> </i>
</button>
<button class="center_play-btn" aria-label="Play" data-index=${todo.id} id="${
                todo.id
            }"> <i class="fas fa-play-circle" aria-hidden="true"></i></button>
<button class="center_des-btn" aria-label="Detals"  data-index=${todo.id} id="${
                todo.id
            }" onclick="showDiv(${todo.id})"  > <i class="fas fa-list-alt" 
aria-hidden="true"></i></button>
</li>
`,
        )

        .join('');
    if (mobileWidth.matches) {
        projectIcon.classList.remove('none');
        centerDiv.classList.remove('none');
        centerDiv.classList.add('center');
        leftDiv.classList.add('leftnone');
    } else {
        projectIcon.classList.add('none');
    }
    window.onresize = function resizeFun() {
        if (mobileWidth.matches) {
            projectIcon.classList.remove('none');
            centerDiv.classList.remove('none');
            centerDiv.classList.add('center');
            leftDiv.classList.add('leftnone');
        } else {
            projectIcon.classList.add('none');
        }
    };
}

function addTodo(event) {
    let currentProject = JSON.parse(localStorage.getItem('Current')) || [];
    if (currentProject == 0) {
        currentProject = 'No Project';
    } else {
        currentProject = currentProject[0].name;
    }

    todos = JSON.parse(localStorage.getItem('Items'));

    // find last id number
    let last = 0;
    todos.forEach((task) => {
        if (task.id > last) {
            last = task.id;
        }
    });
    console.log(clicked);
    event.preventDefault();
    const item = {
        id: ++last,
        text: todoInput.value,
        done: false,
        focus: 0,
        project: currentProject,
        repeatday: '1',
        repeatpartoftime: 'day',
        data: dateToday,
        note: '',
    };
    todoInput.value = '';
    todos.push(item);
    localStorage.setItem('Items', JSON.stringify(actualList));
    lists(todos, todoList);
    lists(actualList, todoList);
    statTask();
}
function statTask() {
    let toBeCompleted = 0;
    let countCompleted = 0;
    let estimated = 0;
    //* counting statiscics
    const history = JSON.parse(localStorage.getItem('History'));

    taskToday = history.filter((items) => items.data === dateToday);
    for (let i = 0; i < taskToday.length; i += 1) {
        if (taskToday[i].done === true) {
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

    estimated = toBeCompleted * pomodoreDuration;
    const minutesEs = estimated % 60;
    const hours = Math.floor(estimated / 60);
    console.log(minutesEs);
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
    buttonscountdown.classList.remove('.countdownButtonsNone');
    clockTimer.classList.add('clock_timerStart');
}

// * functions buttons action delate play and completted task
function btnActtion(e) {
    statTask();

    const item = e.target;
    console.log(e.target.dataset);
    console.log(item);
    if (item.classList[0] === 'center_delete-btn') {
        audio = new Audio('Alerts/deleteTask.mp3');
        audio.play();
        const { ...index } = e.target.dataset;
        console.log(index);

        const todo = item.parentElement;
        todo.classList.add('fall');
        todos.splice(index, 1);
        console.log(todos);

        localStorage.setItem('Items', JSON.stringify(todos));
        todo.addEventListener('transitionend', () => {
            todo.remove();
            resetTimer();
        });
        statTask();
        actualList = todos;
        lists(actualList, todoList);

        return;
    }

    //* completed function
    if (item.classList[0] === 'center_complete-btn') {
        const todoText = item.parentElement;
        const el = e.target;
        const { index } = el.dataset;

        if (!todoText.classList.contains('completed')) {
            todos = JSON.parse(localStorage.getItem('Items'));

            const History = JSON.parse(localStorage.getItem('History'));

            const filtr = todos.filter((p) => p.id == index);
            const todosFiltr = filtr[0];
            // console.log(todosFiltr.id);
            const idtego = todosFiltr.id;

            // console.log(todos);
            // console.log(todos[todosFiltr.id]);
            // console.log(todos[todosFiltr.id]);
            todosFiltr.done = true;
            // console.log(todos[todosFiltr.id]);
            todosFiltr.id = History.length;
            const historytask = todosFiltr;
            History.push(historytask);
            localStorage.setItem('History', JSON.stringify(History));
            console.log(todos);
            localStorage.setItem('Items', JSON.stringify(todos));
            todoText.classList.add('completed');
            item.innerHTML = '<i class="fas fa-check-circle"></i>';
            todoText.classList.add('animation');
            console.log(todos);

            const ten = todos.find((element, x) => element == todosFiltr);
            console.log(ten);

            //
            if (todosFiltr.repeatday == 0) {
            } else {
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
                newIndex.id = ++lastId;
                newIndex.done = false;
                // newIndex.completiondate = dateToday;

                const dateString = newIndex.data;
                newIndex.data = moment(dateString)
                    .add(newIndex.repeatday, newIndex.repeatpartoftime)
                    .format('YYYY-MM-DD');
                todos.push(newIndex);
            }
            const newtodos = JSON.parse(JSON.stringify(todos));
            const isLargeNumber = (element) => element == todosFiltr;
            const idcurrent = todos.findIndex(isLargeNumber);
            audio = new Audio('Alerts/deleteTask.mp3');
            audio.play();
            const todo = item.parentElement;
            todo.classList.add('fall');
            todos.splice(idcurrent, 1);

            localStorage.setItem('Items', JSON.stringify(todos));
            todo.addEventListener('transitionend', () => {
                todo.remove();
                resetTimer();
            });
            actualList = todos;
            statTask();

            return;
        }
    }

    //* timer start function
    if (item.classList[0] === 'center_play-btn') {
        resizeClock();
        resize.classList.remove('.countdownButtonsNone');

        pause.removeEventListener('click', timerBreak);
        const { index } = e.target.id;
        taskId = e.target.id;
        timer();
        clearInterval(countdownTime);
        const seconds = 4;
        timer(seconds);
        clockTimer.classList.remove('clock_timerFinish');
        countdownAnimation(item);
        item.innerHTML = '<i class="fa fa-clock"></i>';
    }
    // localStorage.setItem('Items', JSON.stringify(todos));
    lists(actualList, todoList);
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

//* funkcja lists wczytująca taski z localstore
function breakTime() {
    clearInterval(countdownTime);
    clockTimer.classList.add('clock_timerFinish');

    pause.firstElementChild.classList.remove(
        'fa-play-circle',
        'fa-pause',
        'fa-pause-circle',
    );
    pause.firstElementChild.classList.add('fa-coffee');
    clockTimer.classList.remove('clock_timerStart');
    lists(todos, todoList);
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
    breakTime();
}
function resizeClock() {
    clockTimer.classList.add('clock_clockVisible');
    if (clockTimer.classList.contains('clock_fullscreen')) {
        clockTimer.classList.remove('clock_fullscreen');
    } else {
        clockTimer.classList.add('clock_fullscreen');
    }
}

// eslint-disable-next-line no-unused-vars
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
                <li> <input type="date" id="date" value="${
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
                <li>Repeat: Every</li> <li> <input type="number" class="repeatDay" value="${
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
        const project = document.querySelector('.projectSelect');
        const timePart = document.querySelector('.partOfTime');
        const repeatDay = document.querySelector('.repeatDay');
        date.addEventListener('change', updateDetails);
        closeBtn.addEventListener('click', closeDiv);
        note.addEventListener('input', updateDetails);
        repeatDay.addEventListener('input', updateDetails);
        const projectSelect = document.getElementById('Project');
        projectSelect.addEventListener('click', () => {
            const options = projectSelect.querySelectorAll('option');
            projectSelect.addEventListener('change', updateDetails);
        });
        const partTimeSelect = document.getElementById('partOfTime');
        partTimeSelect.addEventListener('click', () => {
            const optionsTime = partTimeSelect.querySelectorAll('option');
            partTimeSelect.addEventListener('change', updateDetails);
            console.log(optionsTime);
        });
        function closeDiv() {
            description.classList.add('none');
        }
        function updateDetails() {
            const proj = JSON.parse(localStorage.getItem('Items'));
            console.log(proj);

            console.log(proj[clickedId]);

            const filtrPr = proj.filter((p) => p.id == clickedId);
            const Idtoedit = filtrPr[0];
            console.log(Idtoedit);

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
        console.log(projectList);
        // console.log(projectList[1].name);
        const projectt = document.querySelector('.projectSelect');
        for (let i = 0; i < projectList.length; i++) {
            const option = document.createElement('option');
            const txt = document.createTextNode(projectList[i].name);
            option.appendChild(txt);
            projectt.insertBefore(option, projectt.lastChild);
        }
    }
}
function addProject(event) {
    project = JSON.parse(localStorage.getItem('Project')) || [];

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
    // console.log(Project);
    localStorage.setItem('Project', JSON.stringify(project));
    addPr.value = '';
    renderProjects();
}
//! napisać funkcje która będzie zliczać ile razy nazwa danego projektu
//! wystopiła w localhost w taskach i na tej podstawie podaje liczbe tesków i przewidywany czas.
function renderProjects() {
    const proj = JSON.parse(localStorage.getItem('Project')) || [];
    pomodoreList.innerHTML = proj
        .map(
            (proje, i) => `
<li class="left_projectItem">
 <div class="projectList" onclick="sortingProject(this)"  value="${proje.name}" name="${proje.name}">
  <span class="circle" style="background-color: ${proje.color};">
  </span>
  ${proje.name} 
  </div>
  <button class="projectDelete" aria-label="delete"  onClick="deleteProject()" id=${proje.id} >  <i class="fas fa-minus-circle" 
  aria-hidden="true" id=${proje.id} name=${proje.name}></i></button>
  </li>
`,
        )
        .join('');
}
renderProjects();

// eslint-disable-next-line no-unused-vars
function sortingProject(clicked_id) {
    const clicked = clicked_id.getAttribute('name');
    console.log(clicked);

    let currentProject;
    currentProject = JSON.parse(localStorage.getItem('Current')) || [];
    console.log(currentProject);
    if ((currentProject = 0)) {
        currentProject = [{ id: 0, name: clicked }];
        window.localStorage.setItem('Current', JSON.stringify(currentProject));
    } else {
        project = JSON.parse(localStorage.getItem('Current'));
    }

    currentProject = [{ id: 0, name: clicked }];
    window.localStorage.setItem('Current', JSON.stringify(currentProject));

    tasks = JSON.parse(localStorage.getItem('Items')) || [];
    const tasksProject = tasks.filter((item) => item.project == clicked);
    lists(tasksProject, todoList);
    return tasksProject;
}

function sortingProjectDays(e) {
    taskToday = 0;
    let taskTomorrow = 0;
    let taskSomeday = 0;
    const clicked = e.target.id;
    tasks = JSON.parse(localStorage.getItem('Items')) || [];
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
            lists(taskSomeday, todoList);
            break;
        case 'history':
            const history = JSON.parse(localStorage.getItem('History'));
            if (history.length == 0) {
                emptyList.classList.remove('none');
            }
            if (history.length > 0) {
                emptyList.classList.add('none');
            }
            todoList.innerHTML = history
                .map(
                    (
                        todo,
                    ) => `<li class="center_divT completed"><div  class="center_todo-item" id="item${
                        todo.id
                    }" >${todo.text} ${
                        todo.repeatday != 0 ? "<i class='fas fa-redo'></i>" : ''
                    }
</div>
<div class="center_clocks">
<i class="fas fa-clock time"> </i>  
<div class="scores"> 
${todo.focus > 0 ? ` = ${todo.focus} min` : 0}
</div> 
</div>
<button class="center_complete-btn" aria-label="Complete>
<i class="fas fa-check-circle" id="item${todo.id}" aria-hidden="true"></i>
</button>
</li>
`,
                )

                .join('');
            break;
        default:
            break;
    }
}
document.querySelectorAll('.left_day').forEach((e) => {
    e.addEventListener('click', sortingProjectDays);
});
function deleteProject() {
    //   console.log(e);
    console.log(event.currentTarget.id);
    const click = event.currentTarget.id;
    project = JSON.parse(localStorage.getItem('Project')) || [];
    const deleteProj = project.filter((item) => item.id != click);
    localStorage.setItem('Project', JSON.stringify(deleteProj));
    renderProjects();
}
function showProjectList() {
    centerDiv.classList.add('none');
    centerDiv.classList.remove('center');
    leftDiv.classList.remove('leftnone');
    description.classList.add('none');
}
function ifmobile() {
    if (mobileWidth.matches) {
        showProjectList();
    }
}
addProjectbtn.addEventListener('click', addProject);
pause.addEventListener('click', pausetimer);
reset.addEventListener('click', resetTimer);
todoList.addEventListener('click', btnActtion);
showProject.addEventListener('click', ifmobile);

/*
  * Importand Information
    ! Deprecated method, do not user
    ? should this method be exposad in the public API
    TODO: zrobić to i tamto
      * @param myParam The parameter for this method

    */

function repeatTasks() {
    const Items = JSON.parse(localStorage.getItem('Items'));

    for (let i = 0; i < Items.length; i += 1) {
        const dateString = Items[i].data;

        if (dateToday > Items[i].data) {
            Items[i].data = moment(dateString)
                .add(Items[i].repeatday, Items[i].repeatpartoftime)
                .format('YYYY-MM-DD');

            localStorage.setItem('Items', JSON.stringify(Items));
        } else {
        }
    }
}
repeatTasks();
