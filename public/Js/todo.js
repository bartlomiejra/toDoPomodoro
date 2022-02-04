/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import { auth, db } from "./firebase.js";
import { logUserId } from "./settings.js";

export const last = 0;
export const DivToDo = document.querySelector(".todo_List");
let unsubscribe;

const addNewTodo = document.getElementById("addNewTodo");
export const divCategory = document.querySelector(".todo_category");
export const todoTitle = document.querySelector(".todo_input");
export const categoryTitle = document.querySelector(".category_input");
export const colorCategory = document.querySelector(".todo_color");
export const openPopup = document.querySelector(".openpopup");
export const menugui = document.getElementsByClassName("gui-popup");
export const todoCard = document.querySelector(".todoCard");
export const taskCategory = document.querySelector(".taskCategory");
export const itemTodos = document.querySelector(".itemTodos");
const thingsRef = db.collection("users");

let Lista;
auth.onAuthStateChanged((user) => {
  if (user) {
    unsubscribe = thingsRef
      .doc(logUserId)
      .collection("ListTodo")
      .orderBy("id", "asc")
      .onSnapshot((querySnapshot) => {
        const arrList = [];
        addNewTodo.onclick = (event) => {
          event.preventDefault();
          if (todoTitle.value === "") {
            // get last index
            let lastId;
            let nextId;
            db.collection("users")
              .doc(logUserId)
              .collection("ListTodo")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              .then(() => {
                querySnapshot.forEach((doc) => {
                  lastId = doc.data().id;
                  lastId++;
                  nextId = lastId.toString();
                });

                db.collection("users")
                  .doc(logUserId)
                  .collection("ListTodo")
                  .doc(nextId)
                  .set({
                    id: lastId,
                    text: todoTitle.value,
                    done: false,
                    data: "31.1.21",
                  });
              });
          }
        };

        querySnapshot.docs.map((doc) => {
          Lista = doc.data();
          arrList.push(Lista);
        });

        itemTodos.innerHTML = arrList
          .map(
            (todo) => `  
      ${
        todo.done
          ? `<div class="todo_item completed " tabindex="0" onClick='checkFunction(this.id)' onClick='event.stopPropagation()'
           id=${todo.id} data-index=${todo.id}>    
          ${todo.text}      
          <button class="todo_delete" id=${todo.id} data-index=${todo.id} onClick='deleteTodo(this.id)' >
          Delete
    </button>
    </div>`
          : `<div class="todo_item" tabindex="0" onClick='checkFunction(this.id)'  onClick='event.stopPropagation()' 
           id=${todo.id} data-index=${todo.id}  >     
          ${todo.text}
          <button class="todo_delete" id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this)">
    Delete
    </button>
    </div>`
      }`,
          )
          .join("");
      });
    //

    unsubscribe = thingsRef.onSnapshot(() => {});
    todoTitle.value = "";
  } else {
    unsubscribe();
  }
});
function deleteTodo(ClickedId) {
  db.collection("users")
    .doc(logUserId)
    .collection("ListTodo")
    .doc(ClickedId)
    .delete();
}

function checkFunction(clicked_id) {
  db.collection("users")
    .doc(logUserId)
    .collection("ListTodo")
    .doc(clicked_id)
    .get()

    .then((doc) => {
      db.collection("users")
        .doc(logUserId)
        .collection("ListTodo")
        .doc(clicked_id)
        .update({
          done: !doc.data().done,
        })
        .then(() => {});
    });
}
window.deleteTodo = deleteTodo;
window.checkFunction = checkFunction;
