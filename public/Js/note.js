import { auth, db } from "./firebase.js";

import { logUserId,  thingsRef } from "./settings.js";
export const openNote = document.getElementById("noteButton");
export const closeNote = document.getElementById("closeNotebtn");
export const closeoneNote = document.getElementById("closethisNote");
export const closebtn = document.querySelectorAll(".closeNotebtn");
export const noteCard = document.querySelector(".noteCard");
export const tilesNote = document.querySelector(".tiles__note");
export const tiles = document.querySelector(".tiles");
export const deleteNote = document.getElementById("deleteNote");

let unsubscribe;
let Lista;
// const noteButton = document.getElementById('noteButton');
let noteid; let notenote; let noteTitle; let 
notedate;
let dateToday;
function actualDateTime() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // month is zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const ddTomorrow = String(date.getDate() + 1).padStart(2, "0");
  dateToday = `${yyyy}-${mm}-${dd}`;
}
actualDateTime();
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("users").doc(logUserId).collection("Notes");
    unsubscribe = thingsRef
      .doc(logUserId)
      .collection("Notes")
      .onSnapshot((querySnapshot) => {
        const allnotelist = [];
        querySnapshot.docs.map((doc) => {
          Lista = doc.data();
          allnotelist.push(Lista);
          noteid = doc.data().id;
          noteTitle = doc.data().title;
          notedate = doc.data().date;
          notenote = doc.data().note;

        });
  tiles.innerHTML = allnotelist
          .map(
            (note, i) => `
 <div class="tiles__tile" tabindex="0" value=${note.title}  id="${note.id}"  onClick='noteOpen(this.id)'>
<h3>${note.title}</h3>
<div class="tiles__smallNote">${note.note}
</div>
<div class="tiles__date">${note.date} </div>
</div>
</div>
`,
          )
          .join("");
  });
  } else {
    unsubscribe && unsubscribe();
  }
});
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
  let lastId;
  let nextId;
  db.collection("users")
    .doc(logUserId)
    .collection("Notes")
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
        .collection("Notes")
        .doc(nextId)
        .set({
          id: lastId,

          note: textarea.value,
          title: noteHeader.value,
          date: dateToday,
        });
    });
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

window.saveNote = saveNote;
window.noteOpen = noteOpen;
window.closeSingleNote = closeSingleNote;
window.closeonenoteCard = closeonenoteCard;
let listsnote;
let click;
let items;

let notes;
export function noteOpen(clicked_id) {
  db.collection("users")
    .doc(logUserId)
    .collection("Notes")
    .doc(clicked_id)
    .onSnapshot((querySnapshot) => {
      notes = querySnapshot.data();
    
      click = clicked_id;
      onenoteCard.innerHTML = `
<textarea class="tiles__noteHeader headerNote" id="noteHeader" value=${notes.title} type="text"/>${notes.title}
</textarea>
<p class="date" value=${notes.date}>${notes.date}</p>
<textarea name="message"  id="textarea" placeholder="Type something..." class="tiles__textarea notetext" >${notes.note} </textarea><button class="tiles__savebtn" id="saveNote" onClick='saveEditNote()'>Save</button><button class="tiles__deletebtn closeNotebtn" id="deleteNotes" onClick='removeNote()'>Delete Note</button><button   onclick='closeSingleNote()' class="modal__closebutton x-note "><i class="fas fa-times"></i></button>`;
      onenoteCard.classList.remove("none");
    });;
  window.saveEditNote = saveEditNote;
}
function saveEditNote(clicked_id) {
  const headerN = document.querySelector(".headerNote");
  const notetext = document.querySelector(".notetext");

  db.collection("users").doc(logUserId).collection("Notes").doc(click).update({
    note: notetext.value,
    title: headerN.value,
  });
   }
window.removeNote = removeNote;
export function removeNote() {

  db.collection("users").doc(logUserId).collection("Notes").doc(click).delete();

  onenoteCard.classList.add("none");
}
