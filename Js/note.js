/* eslint-disable no-undef */
const openNote = document.getElementById('noteButton');
const closeNote = document.getElementById('closeNotebtn');
let closeoneNote = document.getElementById('closethisNote');
let closebtn = document.querySelectorAll('closeNotebtn');
const noteCard = document.querySelector('.noteCard');
const tiles = document.querySelector('.tiles');
const deleteNote = document.getElementById('deleteNote');
const noteHeader = document.getElementById('noteHeader');
const noteText = document.getElementById('textarea');

let notes = [];
notes = JSON.parse(localStorage.getItem('Notes')) || [];

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

saveNote.addEventListener('click', (event) => {
      event.preventDefault();

      console.log('saveNote');
      const person = {
            title: noteHeader.value,
            date: dateToday,
            note: noteText.value,
      };
      //   noteslist.push(person);
      notes.push(person);
      //   this.reset();

      window.localStorage.setItem('Notes', JSON.stringify(notes));
      notesrender();
});

const deleteNotess = document.getElementById('deleteNotes');
function deleteyourNotes() {
      // notes.pop();
      // window.localStorage.setItem('Notes', JSON.stringify(notes));

      //   console.log(notes[clicked_id]);
      console.log('deleteNote');
      //   console.log(noteslist);
}
// deleteNotes.addEventListener('click', deleteyourNotes);

function deleteyourNote() {
      notes.pop();
      window.localStorage.setItem('Notes', JSON.stringify(notes));

      //   console.log(notes[clicked_id]);
      console.log('deleteNote');
      //   console.log(noteslist);
}

deleteNote.addEventListener('click', deleteyourNote);

function notesrender() {
      tiles.innerHTML = notes
            .map(
                  (note, i) => `

				  <div class="tiles__tile" value=${note.title}  id="${i}"onClick="noteOpen(this.id)">
				<h3>${note.title}</h3>
					
				<div class="tiles__date">${note.date} </div>
				</div>
</div>


`,
            )
            .join('');
}
notesrender();
function noteOpen() {
      closeoneNote.addEventListener('click', closeonenoteCard);

      addNote();
      onenoteCard.innerHTML = `
      <button class="tiles__savebtn" id="saveNote">Save</button>
					<button class="tiles__deletebtn closeNotebtn" id="deleteNotes">Delete Note</button>
					<button  id="closethisNote" class="modal__closebutton"><i class="fas fa-times"></i></button>
					<input class="tiles__noteHeader" id="noteHeader" placeholder=${notes[clicked_id].title} value=${notes[clicked_id].title} type="text">
					<p class="date" value=${notes[clicked_id].date}></p>
					<input type="textarea" rows="2" cols="20" wrap="hard" id="textarea" placeholder="Type something... &#13;" class="tiles__textarea" value=${notes[clicked_id].note} >

      `;

      console.log(clicked_id);
      console.log(notes[clicked_id].title);
}
// closebtn.addEventListener('click', deleteyourNotes);
console.log(closebtn);
console.log('git');
