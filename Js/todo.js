/* eslint-disable no-undef */
const openTodo = document.getElementById('todoButton');
const closeTodo = document.getElementById('closeTodobtn');
const todoCard = document.querySelector('.todoCard');
const note = document.querySelector('note');
const todoBut = document.getElementById('todoButton');

function openTodoCard() {
    todoCard.classList.add('active');
    // note.classList.add('none');
    todoBut.classList.add('buttonOn');
    noteCard.classList.remove('active');
    // overlay.classList.add('active');
    leftDiv.classList.add('none');
    centerDiv.classList.add('none');
    settingsDiv.classList.add('none');
    settingsDiv.classList.remove('active');
}

openTodo.addEventListener('click', openTodoCard);
