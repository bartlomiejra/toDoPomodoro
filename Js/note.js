const openNote = document.getElementById('noteButton');
const closeNote = document.getElementById('closeNotebtn');
const noteCard = document.querySelector('.noteCard');

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
