import { pomodorebreakTime, countdownTime } from "./app.js";

export let last = 0;

export const DivToDo = document.querySelector(".todo_List");
// const CategoryTo = document.querySelector('.dropcategory');

export const divCategory = document.querySelector(".todo_category");
export const todoTitle = document.querySelector(".todo_input");
export const categoryTitle = document.querySelector(".category_input");
export const colorCategory = document.querySelector(".todo_color");
export const openPopup = document.querySelector(".openpopup");
export const menugui = document.getElementsByClassName("gui-popup");
export const todoCard = document.querySelector(".todoCard");
export const taskCategory = document.querySelector(".taskCategory");
export const itemTodos = document.querySelector(".itemTodos");

//! Empty State

export let ListOfToDo = JSON.parse(localStorage.getItem("ListTodo"));
if (ListOfToDo == null) {
  ListOfToDo = [
    {
      id: 0,
      text: "First 🥇",
      done: false,
      data: "30.1.21",
    },
    {
      id: 1,
      text: "water the plants 🪴",
      done: false,
      data: "30.7.21",
    },
    {
      id: 2,
      text: "stay focused ✨",
      done: true,
      data: "30.2.21",
    },
    {
      id: 3,
      text: "don't forget to stretch 🧘",
      done: false,
      data: "30.2.21",
    },
  ];
}
localStorage.setItem("ListTodo", JSON.stringify(ListOfToDo));
window.addNewTodo = addNewTodo;

export function addNewTodo(event) {
  if (todoTitle.value === "") {
  } else {
    ListOfToDo = JSON.parse(localStorage.getItem("ListTodo"));

    // find last id number
    ListOfToDo.forEach((items) => {
      if (items.id > last) {
        last = items.id;
      }
    });
    const ToDoNew = {
      id: (last += 1),
      text: todoTitle.value,
      done: false,
      data: "31.1.21",
    };
    //   todoInput.value = '';
    ListOfToDo.push(ToDoNew);
    // console.log(ListOfToDo);
    localStorage.setItem("ListTodo", JSON.stringify(ListOfToDo));

    todoTitle.value = "";

    renderTodos();
    const dragItems = document.querySelectorAll(".dragitem");
  }
}

renderTodos();

window.deleteTodo = deleteTodo;
window.checkFunction = checkFunction;
export function renderTodos() {
  ListOfToDo = JSON.parse(localStorage.getItem("ListTodo"));
  itemTodos.innerHTML = ListOfToDo.map(
    (todo) => `
		

		${
      todo.done
        ? `<div class="todo_item completed dragitem" onClick='checkFunction(this.id)
' id=${todo.id} data-index=${todo.id}  >
			
	${todo.text}





  <button class="todo_delete" id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
  
  Delete
  </button>

  

 </div>`
        : `<div class="todo_item dragitem" onClick='checkFunction(this.id) 	  
' id=${todo.id} data-index=${todo.id}  >
			
	${todo.text}





  <button class="todo_delete" id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
  
  Delete
  </button>

  

 </div>`
    } 
		

			`
  ).join("");
}

export function deleteTodo(ClickedId) {
  const { ...index } = ClickedId.dataset;
  const newListOfToDo = ListOfToDo.filter((todo) => todo.id != ClickedId.id);
  localStorage.setItem("ListTodo", JSON.stringify(newListOfToDo));
  renderTodos();
  event.stopPropagation();
}

export function checkFunction(clicked_id) {
  ListOfToDo = JSON.parse(localStorage.getItem("ListTodo"));

  // const { ...index } = clicked_id.dataset;
  // let newListOfToDo = ListOfToDo.filter(todo => todo.id != clicked_id);
  const objIndex = ListOfToDo.findIndex((obj) => obj.id == clicked_id);
  console.log(objIndex);
  // myArray[objIndex].name = "Laila"

  if (ListOfToDo[objIndex].done == true) {
    ListOfToDo[objIndex].done = false;
  } else {
    ListOfToDo[objIndex].done = true;
  }
  localStorage.setItem("ListTodo", JSON.stringify(ListOfToDo));
  console.log(ListOfToDo);

  // this.stopPropagation();
  // clicked_id.stopPropagation();
  event.stopPropagation();

  renderTodos();
}
