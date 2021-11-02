/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
export const openNote = document.getElementById("noteButton");
export const closeNote = document.getElementById("closeNotebtn");
export const closeoneNote = document.getElementById("closethisNote");
export const closebtn = document.querySelectorAll(".closeNotebtn");
export const noteCard = document.querySelector(".noteCard");
export const tilesNote = document.querySelector(".tiles__note");
export const tiles = document.querySelector(".tiles");
export const deleteNote = document.getElementById("deleteNote");
// const noteButton = document.getElementById('noteButton');

let notes = JSON.parse(localStorage.getItem("Notes"));

if (notes == null) {
  notes = [
    {
      id: 0,
      title: "Shopping List  🛒",
      date: "2021-07-02",
      note: " - Coconut oil \n- Nuts\n- Beets\n- Berries\n- Oats\n- Oranges\n- Pears\n- Potatoes",
    },
    {
      id: 1,
      title: "Greek Pasta Salad",
      date: "2021-07-03",
      note: "sd",
    },
    {
      id: 3,
      title: "8 morning stretches to help kick-start your day",
      date: "2021-07-03",
      note: "Seated trapezius stretch\n- Shoulder stretch\n- Triceps stretch\n-Lower back\n-Hip flexor stretch in three planes\n-Hamstring stretch\n-Quadriceps stretch\n- Calf stretch",
    },
    {
      id: 4,
      title: "Marcus Aurelius Quotes",
      date: "2021-09-03",
      note: "-The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take care that you entertain no notions unsuitable to virtue and reasonable nature.\n -When you arise in the morning, think of what a precious privilege it is to be alive  to breathe, to think, to enjoy, to love.\n -The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane",
    },
  ];

  window.localStorage.setItem("Notes", JSON.stringify(notes));
} else {
  notes = JSON.parse(localStorage.getItem("Notes"));
}

export function closeNoteCard() {
  noteCard.classList.remove("active");
  // overlay.classList.remove('active');
}
// openNote.addEventListener('click', openNoteCard);
// closeNote.addEventListener('click', closeNoteCard);
const createNote = document.querySelector(".tiles__add");
const onenoteCard = document.querySelector(".tiles__note");
export function addNote() {
  tilesNote.innerHTML = `  
<button class="tiles__savebtn" onClick="saveNote()"id="saveNote">Save</button>
<button class="tiles__deletebtn closeNotebtn" onClick="deleteyourNote()" id="deleteNote">Delete Last Note</button>
<button  id="closethisNote" class="modal__closebutton" onClick='closeonenoteCard()'><i class="fas x-note fa-times"></i></button>
<input class="tiles__noteHeader" id="noteHeader" placeholder="Title" type="text" value=""></input>
<p class="date" value=dateToday>
${dateToday} 

</p>
<textarea name="message"  type="textarea" id="textarea" placeholder="Type something..." class="tiles__textarea">
`;
  onenoteCard.classList.remove("none");
  noteCard.classList.add("overlayNote");
}

export function saveNote() {
  const noteHeader = document.getElementById("noteHeader");
  const noteText = document.getElementById("textarea");
  let lastNoteId = 0;
  notes.forEach((ele) => {
    if (ele.id > lastNoteId) {
      lastNoteId = ele.id;
    }
  });
  const person = {
    id: (lastNoteId += 1),

    title: `${(noteHeader.value = null
      ? ` Note ${(lastNoteId += 1)} `
      : noteHeader.value)}`,
    date: dateToday,

    note: noteText.value,
  };
  notes.push(person);
  window.localStorage.setItem("Notes", JSON.stringify(notes));
  notesrender();
}
export function closeonenoteCard() {
  tilesNote.classList.add("none");
  noteCard.classList.remove("overlayNote");
}
export function closeSingleNote() {
  onenoteCard.classList.add("none");
  noteCard.classList.remove("overlayNote");
}
createNote.addEventListener("click", addNote);
export function deleteyourNote() {
  notes.pop();
  window.localStorage.setItem("Notes", JSON.stringify(notes));
  notesrender();
}
window.noteOpen = noteOpen;
window.saveEditNote = saveEditNote;
window.closeSingleNote = closeSingleNote;
window.removeNote = removeNote;
window.closeonenoteCard = closeonenoteCard;

export function notesrender() {
  tiles.innerHTML = notes

    .map(
      (note, i) => `
 <div class="tiles__tile" value=${note.title}  id="${i}" onClick='noteOpen(this.id)'>
<h3>${note.title}</h3>
<div class="tiles__smallNote">${note.note}
</div>
<div class="tiles__date">${note.date} </div>
</div>
</div>
`
    )
    .join("");
}
notesrender();
let click;
export function noteOpen(clicked_id) {
  notes = JSON.parse(localStorage.getItem("Notes")) || [];
  click = clicked_id;
  onenoteCard.classList.remove("none");
  onenoteCard.innerHTML = `
	<textarea class="tiles__noteHeader headerNote" id="noteHeader" value=${notes[clicked_id].title} type="text"/>${notes[clicked_id].title}</textarea>
	<p class="date" value=${notes[clicked_id].date}>${notes[clicked_id].date}</p>
	<textarea name="message"  id="textarea" placeholder="Type something..." class="tiles__textarea notetext" >${notes[clicked_id].note} </textarea>
	
	<button class="tiles__savebtn" id="saveNote" onClick='saveEditNote()'>Save</button>
	  <button class="tiles__deletebtn closeNotebtn" id="deleteNotes" onClick='removeNote()'>Delete Note</button>
	  <button   onclick='closeSingleNote()' class="modal__closebutton x-note "><i class="fas fa-times"></i></button>
	  `;
}
export function saveEditNote() {
  notes = JSON.parse(localStorage.getItem("Notes")) || [];
  const headerN = document.querySelector(".headerNote");
  const notetext = document.querySelector(".notetext");
  notes[click].title = headerN.value;
  notes[click].note = notetext.value;
  localStorage.setItem("Notes", JSON.stringify(notes));
  notesrender();
}
export function removeNote() {
  notes = JSON.parse(localStorage.getItem("Notes")) || [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title === notes[click].title) {
      notes.splice(i, 1);
    }
  }
  localStorage.setItem("Notes", JSON.stringify(notes));
  notesrender();
  onenoteCard.classList.add("none");
}
