import {
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  where,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { pomodorebreakTime, countdownTime } from "./app.js";
import { auth, db } from "./firebase.js";
import { logUserId } from "./settings.js";

let firebaseListTodo;
firebaseListTodo = db.collection("users");
export const last = 0;
export const DivToDo = document.querySelector(".todo_List");
let unsubscribe;
window.checkFunction = checkFunction;
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

window.deleteTodo = deleteTodo;
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
          } else {
            // get last index
            let lastId;
            let nextId;
            db.collection("users")
              .doc(logUserId)
              .collection("ListTodo")
              .orderBy("id", "asc")
              .limitToLast(1)
              .get()
              .then((querySnapshot) => {
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
            const dragItems = document.querySelectorAll(".dragitem");
          }
        };

        querySnapshot.docs.map((doc) => {
          Lista = doc.data();
          arrList.push(Lista);
          const { id } = doc.data();
          const { done } = doc.data();
          const { data } = doc.data();
          const { text } = doc.data();
        });

        itemTodos.innerHTML = arrList
          .map(
            (todo) => `  
      ${
        todo.done
          ? `<div class="todo_item completed dragitem" onClick='checkFunction(this.id)'
           id=${todo.id} data-index=${todo.id}>    
          ${todo.text}      
          <button class="todo_delete" id=${todo.id} data-index=${todo.id} onClick="deleteTodo(this.id)">
          Delete
    </button>
    </div>`
          : `<div class="todo_item dragitem" onClick='checkFunction(this.id)' 	  
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

    unsubscribe = thingsRef.onSnapshot((querySnapshot) => {});
    todoTitle.value = "";
  } else {
    unsubscribe && unsubscribe();
  }
});
function deleteTodo(ClickedId) {
  db.collection("users")
    .doc(logUserId)
    .collection("ListTodo")
    .doc(ClickedId)
    .delete();

  event.stopPropagation();
}

function checkFunction(clicked_id) {
  console.log("esss");
  let thisId;
  
  db.collection("users")
  .doc(logUserId)
  .collection("ListTodo")
  .doc(clicked_id)
  // .onSnapshot((querySnapshot) => {
  // // .get()
  // // .then((querySnapshot) => {

  //       .then(querySnapshot.forEach((doc) => {
  //                 thisId = doc.data();
                 
  //               }));
  //               console.log(thisId);
  //             // }
  // // })
  // // })
  //             });
  db.collection("users")
    .doc(logUserId)
    .collection("ListTodo")
    .doc(clicked_id)
    .update({
      done: !db
        .collection("users")
        .doc(logUserId)
        .collection("ListTodo")
        .doc(clicked_id).done,
    })
    .then(() => {})
    .catch((error) => {});
  const lasts = db.collection("users").doc(logUserId).collection("ListTodo");
  // const objIndex = ListOfToDo.findIndex((obj) => obj.id == clicked_id);
  event.stopPropagation();
  // console.log(
  //   db.collection("users").doc(logUserId).collection("ListTodo").doc(clicked_id)
  //     .id
  // );
}
