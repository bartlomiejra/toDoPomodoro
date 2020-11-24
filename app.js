const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".addtaskButton");
const todoList = document.querySelector(".todolist");
const clockTimer = document.querySelector(".clock");
const task = document.querySelector("divT");
const newTodo = document.querySelector(".todo-item");


todoList.addEventListener("click", btnActtion);
const todos = JSON.parse(localStorage.getItem('Items')) || [];



//*TODO Rebuind addToDO add new function to create structur of task element like button etc.



//* this function adding new item todo
function addTodo(event) {
  event.preventDefault();
  // console.log(this);
  const text = this.querySelector('[class=todoInput]');
  const item = {
    text: todoInput.value,
    done: false
  };
  todos.push(item);
  lists(todos, todoList);
  localStorage.setItem('Items', JSON.stringify(todos));
  todoInput.value = "";
}


function lists(todolist = [], objlines) {
  objlines.innerHTML = todolist.map((todo, i) => {
    return `${todo.done  ? '<div class="divT completed">' : '<div class="divT " >'}
<li  class="todo-item" id="item${i}" >${todo.text} 
</li>
<button class="complete-btn" data-index=${i} id="item${i}" >
${todo.done  ?  '<i class="fas fa-check-circle" id="item${i}" aria-hidden="true"></i>': '<i class="fas fa-circle" id="item${i}" aria-hidden="true"></i>'} 
</button>
<button class="delete-btn">   <i class="fas fa-trash" aria-hidden="true"> </i>
</button>
<button class="play-btn"> <i class="fas fa-play" aria-hidden="true"></i></button>
</div>
`;
  }).join('');
  statTask();
}



function statTask(){  
//* Wyliczanie statystyk czasu i ukończonych tasków
let toBeCompleted = 0;
let countCompleted = 0;
for (let i = 0; i < todos.length; ++i) {
  if (todos[i]["done"] == true) {
    // todoText.classList.add('completed');
    countCompleted++;  
  } else {
    toBeCompleted++;
  }
}

document.getElementById("completedTasks").innerHTML = countCompleted;
document.getElementById("taskstobe").innerHTML = toBeCompleted;
let estimated = (toBeCompleted * 25);
var hours = Math.floor(estimated / 60);
var minutes = estimated % 60;
estimatedHM = hours + "." + minutes;
document.getElementById("estimated").innerHTML = estimatedHM;
let elapsed = (countCompleted * 25);
var hours = Math.floor(elapsed / 60);
var minutes = elapsed % 60;
elapsedHM = hours + "." + minutes;
// console.log('elapsed :>> ', elapsedHM);
document.getElementById("elapse").innerHTML = elapsedHM;
//* creating item class to store stats, i want to add this numbert to localstore. 
const statistics = JSON.parse(localStorage.getItem('STat')) || [];



const stat = {
  estimated: estimatedHM,
  comp: toBeCompleted,
  elapsed: elapsed,
  complete: countCompleted,
}


statistics.splice(0, 5 );
  statistics.push(stat);
  localStorage.setItem('STat', JSON.stringify(statistics));

// }

  
//   localStorage.removeItem("STat");
//   console.log("jest");
// } else {
//   console.log("nie ma");
  
  
// }
// if (localStorage.getItem("stat") == null) {
//   console.log('brak :>> ');
  
//   // statistics.push(stat);
// }else{

  // localStorage.removeItem('STat');
//   localStorage.key(STat);
//   // localStorage.removeItem(stat );
//   // console.log('statistics :>> ', stat);

// }



}







todoButton.addEventListener("click", addTodo);
lists(todos, todoList);


//*functions buttons action delate play and completted task
function btnActtion(e) {
  statTask();
  const item = e.target;
  //DELATE
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener('transitionend', function () {
      localStorage.removeItem("text");
      todo.remove();
      // console.log('item :>> ', item);
      console.log('todo :>> ', todo);

      //*tutaj powinno zachodzić usunięcie elementu
    })
  

    // * fall doesent workr corectly
  }
  // localStorage.setItem('items',JSON.stringify(items));
  // populateList([], itemsList)


  //*completed function
  if (item.classList[0] === "complete-btn") {
     
    const todoText = item.parentElement;
    const el = e.target;
    const index = el.dataset.index;
    if (!todoText.classList.contains("completed")) {
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
























  //*timer start function
  const todo = item.parentElement;
  const startingMinutes = 0.1;
  let time = startingMinutes * 60;
  

  const play = document.querySelector(".fa-play");
  const btnplay = document.querySelector(".play-btn");
  // console.log(play);
  // clastList.value
  // console.log(btnplay);
  console.log('item :>> ', item);
  console.log('item children :>> ', item.value);
  if (item.classList[0] === "play-btn") {
    // clearInterval(updateCountdown);
  


    // if(item.listChildren == (aax)){
    //   console.log("ten element to gej :))");
    // }else{
    //   console.log("nie gej jest to")
    // };
    item.innerHTML = '<i class="fas fa-pause"></i>';
    clockTimer.classList.add("timerStart");
    const countdownTimer = document.getElementById("countdown");
    const intervals = setInterval(updateCountdown, 1000);
    
    function updateCountdown() {
     
      clockTimer.classList.remove("timerFinish");
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
        clockTimer.classList.remove("timerStart");
        console.log('itemek :>> ', item);
        item.innerHTML = '<i class="fas fa-play"></i>';        
        
        // todo.classList.add("iconClock");
        // item.innerHTML = '<i class="fas fa-clock"></i>'; 
          // - to będzie dodawać ikone zegarana koniec pomodore
      }




    }

  }






}


//* funkcja lists wczytująca taski z localstore
lists(todos, todoList);

/*
  * Importand Information
  ! Deprecated method, do not use
  ? should this method be exposad in the public API
  TODO: zrobić to i tamto
  * @param myParam The parameter for this method
*/