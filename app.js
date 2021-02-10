const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.addtaskButton');
const todoList = document.querySelector('.todolist');
const clockTimer = document.querySelector('.clock');
const buttonscountdown = document.querySelector('.countdownButtons');
const pause = document.querySelector('.pauseButton');
const reset = document.querySelector('.resetButton');
// const task = document.querySelector('divT');
// const newTodo = document.querySelector('.todo-item');

const todos = JSON.parse(localStorage.getItem('Items')) || [];

//* TODO Rebuind addToDO add new function to create structur of task element like button etc.

//* this function adding new item todo

function lists(todolist = [], objlines) {
  objlines.innerHTML = todolist
    .map(
      (todo, i) => `${
        todo.done ? '<div class="divT completed">' : '<div class="divT " >'
      }
<li  class="todo-item" id="item${i}" >${todo.text} 
</li>
<button class="complete-btn" data-index=${i} id="item${i}" >
${
  todo.done
    ? `<i class="fas fa-check-circle" id="item${i}" aria-hidden="true"></i>`
    : `<i class="fas fa-circle" id="item${i}" aria-hidden="true"></i>`
} 
</button>
<button class="delete-btn" data-index=${i} id="item${i}">   <i class="fas fa-trash" aria-hidden="true"> </i>
</button>
<button class="play-btn"> <i class="fas fa-play" aria-hidden="true"></i></button>
</div>
`,
    )
    .join('');
}
const item = {
  text: todoInput.value,
  done: false,
  focus: 0,
};
function addTodo(event) {
  event.preventDefault();
  // const text = this.querySelector('[class=todoInput]');

  todos.push(item);
  lists(todos, todoList);
  localStorage.setItem('Items', JSON.stringify(todos));
  todoInput.value = '';
}

function statTask() {
  //* Wyliczanie statystyk czasu i ukończonych tasków
  let toBeCompleted = 0;
  let countCompleted = 0;
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].done === true) {
      countCompleted += 1;
    } else {
      toBeCompleted += 1;
    }
  }

  document.getElementById('completedTasks').innerHTML = countCompleted;
  document.getElementById('taskstobe').innerHTML = toBeCompleted;

  const estimated = toBeCompleted * 25;
  const minutesEs = estimated % 60;
  const hours = Math.floor(estimated / 60);
  const estimatedHM = `${hours}.${minutesEs < 10 ? '0' : ''}${minutesEs}`;
  document.getElementById('estimated').innerHTML = estimatedHM;
  const elapsed = countCompleted * 25;
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

//* functions buttons action delate play and completted task

let countdownTime;
const countdownTimer = document.getElementById('countdown');

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  countdownTimer.textContent = display;
  document.title = display;
}
const plays = document.querySelectorAll('.play-btn');
// const timeInFocus = 0;
function timer(seconds) {
  // after start timer clear any exsisting timers
  clearInterval(countdownTime);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdownTime = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    const timeInFocus = seconds - secondsLeft;
    if (secondsLeft < 0) {
      let { focus } = item;
      console.log(item);
      focus = +timeInFocus;
      console.log(focus);
      // const itemS = JSON.parse(localStorage.getItem('Items[2]'));
      const itemS = localStorage.getItem('Items[2]');
      console.log(itemS);

      clearInterval(countdownTime);
      clockTimer.classList.add('timerFinish');
      clockTimer.classList.remove('timerStart');
      lists(todos, todoList);
      buttonscountdown.classList.add('countdownButtonsNone');
      return;
    }
    let paused = false; // is the clock paused?

    function pausetimer() {
      // console.log(setinterval);
      // console.log(pause);
      const secsave = secondsLeft;
      // console.log('secsave :>> ', secsave);
      if (!paused) {
        paused = true;
        // console.log('zatrzymano timer');
        // console.log();
        this.firstElementChild.classList.remove('fa-pause');
        this.firstElementChild.classList.add('fa-play');
        // console.log('pausa');
        // console.log('.pauseButton');
        // this.firstElementChild.ClassList.add('fa-play');
        // console.dir(buttonscountdown);
        // this.firstElementChild.innerHTML = '';
        // this.firstElementChild.innerHTML = '<i class="fa fa-play"></i>';

        clearInterval(countdownTime);
      } else {
        this.firstElementChild.classList.remove('fa-play');
        this.firstElementChild.classList.add('fa-pause');
        // console.log('wznowiono timer');
        paused = false;
        displayTimeLeft(secsave);
        timer(secsave);
        // console.log(secsave);
        // console.log(this);

        // this.firstElementChild.ClassList.add('fa-play');
      }
      // https://codepen.io/yaphi1/pen/QbzrQP
    }

    function resetTimer() {
      const result = confirm('Are you realy like reset timer?');
      if (result === true) {
        clockTimer.classList.remove('timerFinish');
        clockTimer.classList.remove('timerStart');
        lists(todos, todoList);
        buttonscountdown.classList.add('countdownButtonsNone');
        clearInterval(countdownTime);
        displayTimeLeft(0);
      }
    }
    pause.addEventListener('click', pausetimer);
    reset.addEventListener('click', resetTimer);
    // console.log('secondsLeft :>> ', secondsLeft);
    // console.log('then :>> ', then);
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function btnActtion(e) {
  statTask();
  const item = e.target;
  if (item.classList[0] === 'delete-btn') {
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
    clearInterval(countdownTime);
    const seconds = 10;
    timer(seconds);
    clockTimer.classList.remove('timerFinish');
  }

  function countdownAnimation() {
    item.innerHTML = '<i class="fa fa-clock"></i>';

    buttonscountdown.classList.remove('countdownButtonsNone');
    clockTimer.classList.add('timerStart');
  }
  countdownAnimation(item);
}

//* funkcja lists wczytująca taski z localstore
lists(todos, todoList);

todoList.addEventListener('click', btnActtion);

/*
  * Importand Information
  ! Deprecated method, do not use
  ? should this method be exposad in the public API
  TODO: zrobić to i tamto
  * @param myParam The parameter for this method
*/
