const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".addtaskButton");
const todoList = document.querySelector(".todolist");
const clockTimer = document.querySelector(".clock");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", btnActtion);

//* this function adding new item todo
function addTodo(event) {
  event.preventDefault();
  console.log("addtask");
  const task = document.createElement("div");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  task.appendChild(newTodo);

  //* Adding Completed button to new item task
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-circle"></i>';
  completedButton.classList.add("complete-btn");
  task.appendChild(completedButton);

  //* Add Delate button to new item task
  const delatedButton = document.createElement("button");
  delatedButton.innerHTML = '<i class="fas fa-trash"></i>';
  delatedButton.classList.add("delete-btn");
  task.appendChild(delatedButton);

  //* Add startTimer button
  const startTimerButton = document.createElement("button");
  startTimerButton.innerHTML = '<i class="fas fa-play"><i>';
  startTimerButton.classList.add("play-btn");
  task.appendChild(startTimerButton);

  //* Apend item to list ➕
  todoList.appendChild(task);

  //*Clear input lebel to
  todoInput.value = "";
}

//*functions buttons action delate play and completted task
function btnActtion(e) {
  const item = e.target;
  //DELATE
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.remove();
  }

  //*complettet function
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    item.innerHTML = '<i class="fas fa-check-circle"></i>';
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
      } else {
        console.log("End countdown")
        clearInterval(intervals);
        clockTimer.classList.add("timerFinish");
      }




      // TODO 


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