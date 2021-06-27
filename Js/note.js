/* eslint-disable no-undef */
const openNote = document.getElementById('noteButton');
const closeNote = document.getElementById('closeNotebtn');
let closeoneNote = document.getElementById('closethisNote');
let closebtn = document.querySelectorAll('.closeNotebtn');
const noteCard = document.querySelector('.noteCard');
const tilesNote = document.querySelector('.tiles__note');
const tiles = document.querySelector('.tiles');
const deleteNote = document.getElementById('deleteNote');

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
      console.log(tilesNote);
      tilesNote.innerHTML = `
        	  <button class="tiles__savebtn" onClick='saveNote()' id="saveNote">Save</button>
        	  <button class="tiles__deletebtn closeNotebtn" onClick="deleteyourNote()" id="deleteNote">Delete Last Note</button>
        	  <button  id="closethisNote" class="modal__closebutton onClick='closeonenoteCard()'"><i class="fas fa-times"></i></button>
        	  <input class="tiles__noteHeader" id="noteHeader" placeholder="Title" type="text">
        	  <p class="date" value=dateToday>
			  ${dateToday} 
			 
			  </p>
        	  <input type="textarea" rows="2" cols="20" wrap="hard" id="textarea" placeholder="Type something... &#13;" class="tiles__textarea">

          `;

      console.log('oki działam');
      onenoteCard.classList.remove('none');
      noteCard.classList.add('overlayNote');

      const noteHeader = document.getElementById('noteHeader');
      const noteText = document.getElementById('textarea');
      saveNote(noteText);

      function saveNote(e) {
            event.preventDefault();

            console.log('saveNote');
            const person = {
                  title: noteHeader.value,
                  date: dateToday,
                  note: noteText.value,
            };
            notes.push(person);

            window.localStorage.setItem('Notes', JSON.stringify(notes));
            notesrender();
      }
}

function closeonenoteCard() {
      console.log('oki działam');
      onenoteCard.classList.add('none');
      noteCard.classList.remove('overlayNote');
}

function closeSingleNote() {
      onenoteCard.classList.add('none');
      noteCard.classList.remove('overlayNote');
}

createNote.addEventListener('click', addNote);

// const saveNote = document.getElementById('saveNote');

function deleteyourNotes() {
      console.log('deleteNote');
}

function deleteyourNote() {
      notes.pop();
      window.localStorage.setItem('Notes', JSON.stringify(notes));

      console.log('deleteNote');
}

// deleteNote.addEventListener('click', deleteyourNote);

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

let click;
function noteOpen(clicked_id) {
      notes = JSON.parse(localStorage.getItem('Notes')) || [];

      addNote();
      onenoteCard.innerHTML = `
      <button class="tiles__savebtn" id="saveNote" onClick='saveEditNote()'>Save</button>
					<button class="tiles__deletebtn closeNotebtn" id="deleteNotes" onClick='removeNote()'>Delete Note</button>
					<button   onclick='closeSingleNote()' class="modal__closebutton "><i class="fas fa-times"></i></button>
					<input class="tiles__noteHeader headerNote" id="noteHeader" value=${notes[clicked_id].title} type="text">
					<p class="date" value=${notes[clicked_id].date}></p>
					<input type="textarea" rows="2" cols="20" wrap="hard" id="textarea" placeholder="Type something... &#13;" class="tiles__textarea notetext" value=${notes[clicked_id].note} >

      `;

      console.log(clicked_id);
      click = clicked_id;
      console.log(notes[clicked_id].title);
}
function saveEditNote() {
      notes = JSON.parse(localStorage.getItem('Notes')) || [];
      headerN = document.querySelector('.headerNote');
      notetext = document.querySelector('.notetext');
      notes[click].title = headerN.value;
      notes[click].note = notetext.value;

      localStorage.setItem('Notes', JSON.stringify(notes));

      notesrender();
}

function removeNote() {
      notes = JSON.parse(localStorage.getItem('Notes')) || [];
      for (let i = 0; i < notes.length; i++) {
            if (notes[i].title === notes[click].title) {
                  notes.splice(i, 1);
            }
      }
      localStorage.setItem('Notes', JSON.stringify(notes));
      notesrender();
}
