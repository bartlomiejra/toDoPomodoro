const openNote = document.getElementById('noteButton');
const closeNote = document.getElementById('closeNotebtn');
// const noteCard = document.getElementsByClassName('noteCard');
// const overlay = document.getElementById('overlay');

// // const overlay = document.getElementById('overlay');

// closeNote.forEach((span) => {
//   span.addEventListener('click', () => {
//     // const modal = button.closest('modal');
//     const modal = span.closest('.modal');
//     closeModal(modal);
//   });
// });

// // function openModal(modal) {
// //   if (modal == null) return;
// // }

// function closeModal(modal) {
//   if (modal == null) return;

//   modal.classList.remove('active');
//   overlay.classList.remove('active');
// }

function openNoteCard() {
  console.log('działa note');
  openNote.classList.add('noteCard');
  overlay.classList.add('active');
}

openNote.addEventListener('click', openNoteCard);
