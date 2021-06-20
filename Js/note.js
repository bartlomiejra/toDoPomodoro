/* eslint-disable no-undef */
const openNote = document.getElementById('noteButton');
const closeNote = document.getElementById('closeNotebtn');
const closeoneNote = document.getElementById('closethisNote');
const noteCard = document.querySelector('.noteCard');
const deleteNote = document.getElementById('deleteNote');
const noteHeader = document.getElementById('noteHeader');
const noteText = document.getElementById('textarea');

function openNoteCard() {
      noteCard.classList.add('active');
      overlay.classList.add('active');
}

function closeNoteCard() {
      noteCard.classList.remove('active');
      overlay.classList.remove('active');
}
openNote.addEventListener('click', openNoteCard);
closeNote.addEventListener('click', closeNoteCard);

const createNote = document.querySelector('.tiles__add');
const onenoteCard = document.querySelector('.tiles__note');

function addNote() {
      console.log('oki działam');
      onenoteCard.classList.remove('none');
      noteCard.classList.add('overlayNote');
}

function closeonenoteCard() {
      console.log('oki działam');
      onenoteCard.classList.add('none');
      noteCard.classList.remove('overlayNote');
}

createNote.addEventListener('click', addNote);
closeoneNote.addEventListener('click', closeonenoteCard);

const saveNote = document.getElementById('saveNote');

saveNote.addEventListener('click', () => {
      console.log('saveNote');
      const person = {
            title: noteHeader.value,
            note: noteText.value,
      };
      window.localStorage.setItem('user', JSON.stringify(person));
});

function deleteyourNote() {
      console.log('deleteNote');
}

deleteNote.addEventListener('click', deleteyourNote);
