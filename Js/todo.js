/* eslint-disable no-undef */
const openTodo = document.getElementById('todoButton');
const closeTodo = document.getElementById('closeTodobtn');
const todoCard = document.querySelector('.todoCard');
const note = document.querySelector('note');

function openTodoCard() {
    todoCard.classList.add('active');
    // note.classList.add('none');

    noteCard.classList.remove('active');
    // overlay.classList.add('active');
    leftDiv.classList.add('none');
    centerDiv.classList.add('none');
    settingsDiv.classList.add('none');
    // todoCard.classList.add('none');

    settingsDiv.classList.remove('active');
    // todoCard.classList.remove('active');
    // overlay.classList.add('active');
}
function closeTodoCard() {
    todoCard.classList.remove('active');
    // overlay.classList.remove('active');
}
openTodo.addEventListener('click', openTodoCard);
closeTodo.addEventListener('click', closeTodoCard);
