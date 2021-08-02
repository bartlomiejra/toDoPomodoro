/* eslint-disable no-undef */
const openTodo = document.getElementById('todoButton');
const closeTodo = document.getElementById('closeTodobtn');
const todoCard = document.querySelector('.todoCard');
function openTodoCard() {
    todoCard.classList.add('active');
    overlay.classList.add('active');
}
function closeTodoCard() {
    todoCard.classList.remove('active');
    overlay.classList.remove('active');
}
openTodo.addEventListener('click', openTodoCard);
closeTodo.addEventListener('click', closeTodoCard);
