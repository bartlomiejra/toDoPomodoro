const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".addtaskButton");
const todoList = document.querySelector(".todolist");







//* this function adding new item todo
function addTodo(event) {
    event.preventDefault();
    console.log("addtask");
    const task = document.createElement("div");
    const newTodo = document.createElement('li');
    newTodo.innerText = "Hey Pomodorooo";
    newTodo.classList.add('todo-item');
    task.appendChild(newTodo);

    //* Adding Completed button to new item task
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-square"></i>';
    completedButton.classList.add("complete-btn");
    task.appendChild(completedButton);

    //* Add Delate button to new item task
    const delatedButton = document.createElement('button');
    delatedButton.innerHTML = '<i class="fas fa-trash"></i>';
    delatedButton.classList.add("delete-btn");
    task.appendChild(delatedButton);


    //* Add startTimer button
    const startTimerButton = document.createElement('button');
    startTimerButton.innerHTML = '<i class="fas fa-play"><i>';
    startTimerButton.classList.add("play-btn");
    task.appendChild(startTimerButton);

    //* Apend item to list ➕
    todoList.appendChild(task);

}






todoButton.addEventListener('click', addTodo);






/*
* Importand Information
! Deprecated method, do not use
? should this method be exposad in the public API
TODO: zrobić to i tamto
* @param myParam The parameter for this method





*/