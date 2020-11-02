const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".addtaskButton");
const todoList = document.querySelector(".todolist");
const clockTimer = document.querySelector(".clock");

todoList.addEventListener("click", btnActtion);
const todos = JSON.parse(localStorage.getItem('items')) || [];


//*TODO Rebuind addToDO add new function to create structur of task element like button etc.
//* this function adding new item todo
function addTodo(event) {
  event.preventDefault();
  const task = document.createElement("div");
  task.className = "divT";
  const newTodo = document.createElement("li"); 
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  const item = {
    text: todoInput.value,
    done: false
  };
  todos.push(item);
  lists(todos, todoList);
  // this.reset();


  //* converting object to stringa after add it to a localstore 
  localStorage.setItem('Items',JSON.stringify(todos));
  task.appendChild(newTodo);
  console.log(item);


  //* Adding Completed button to new item task
  // const completedButton = document.createElement("complete-btn");
  // completedButton.innerHTML = '<i class="fas fa-circle"></i>';
  completedButton.classList.add("complete-btn");
  task.appendChild(completedButton);
  //* Add Delate button to new item task
  const delatedButton = document.createElement("button");
  // delatedButton.innerHTML = '<i class="fas fa-trash"></i>';
  delatedButton.classList.add("delete-btn");
  task.appendChild(delatedButton);
  //* Add startTimer button
  const startTimerButton = document.createElement("button");
  // startTimerButton.innerHTML = '<i class="fas fa-play"><i>';
  startTimerButton.classList.add("play-btn");
  task.appendChild(startTimerButton);
  //* Apend item to list ➕
  todoList.appendChild(task);
  //*Clear input lebel to
  todoInput.value = "";
}

function lists(todolist = [], objlines ){
  objlines.innerHTML = todolist.map((todo, i) => {
return `<div class="divT">
<li class="todo-item">${todo.text}</li>
<button class="complete-btn"> <i class="fas fa-circle" aria-hidden="true"></i></button>
<button class="delete-btn">   <i class="fas fa-trash" aria-hidden="true"></i>
</button>
<button class="play-btn"> <i class="fas fa-play" aria-hidden="true"></i></button>
</div>
`;
  }).join('');
}


todoButton.addEventListener("click", addTodo);
 lists(todos, todoList);










//*functions buttons action delate play and completted task
function btnActtion(e) {
  const item = e.target;
  //DELATE
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })



    // * fall doesent workr corectly
  }

  //*complettet function
  if (item.classList[0] === "complete-btn") {
    const todoText = item.parentElement;
    //if not contain class completed when: 1. add this class, and add icon complett, else delate class and add icon no-completed.
    if (!todoText.classList.contains("completed")) {
      console.log("dodano compleat");
      todoText.classList.add('completed');
      item.innerHTML = '<i class="fas fa-check-circle"></i>';
      todoText.classList.add('animation');
    } else {
      todoText.classList.remove('completed');
      item.innerHTML = '<i class="fas fa-circle"></i>';
    }
    return;
  }


  //*timer start function
  if (item.classList[0] === "play-btn") {
    item.innerHTML = '<i class="fas fa-pause"></i>';
    const todo = item.parentElement;
    clockTimer.classList.add("timerStart");
    const startingMinutes = 0.1;
    let time = startingMinutes * 60;
    const countdownTimer = document.getElementById("countdown");
    const intervals = setInterval(updateCountdown, 1000);


    function updateCountdown() {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 1 ? "0" + seconds : seconds;
      countdownTimer.innerHTML = ` ${minutes} :${seconds} `;
      if (minutes > 0 || seconds > 0) {
        time--;
        console.log(item);
        if (item.classList.contains('fa-pause')) {
          console.log("pause");
          clearInterval(intervals);
          intervals = -1;
        }
      } else {
        console.log("End countdown");
        clearInterval(intervals);
        clockTimer.classList.add("timerFinish");
        todo.classList.add("iconClock");
        // item.innerHTML = '<i class="fas fa-clock"></i>';   - to będzie dodawać ikone zegarana koniec pomodore
      }




    }




  }






}



/*
  * Importand Information
  ! Deprecated method, do not use
  ? should this method be exposad in the public API
  TODO: zrobić to i tamto
  * @param myParam The parameter for this method
*/