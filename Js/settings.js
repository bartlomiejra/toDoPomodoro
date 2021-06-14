const openModalButtons = document.getElementById('settingsButton');
const closeSettings = document.querySelectorAll('[data-close-button ]');

const overlay = document.getElementById('overlay');

closeSettings.forEach((span) => {
  span.addEventListener('click', () => {
    // const modal = button.closest('modal');
    const modal = span.closest('.modal');
    closeModal(modal);
  });
});

// function openModal(modal) {
//   if (modal == null) return;
// }

function closeModal(modal) {
  if (modal == null) return;

  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function openSettings() {
  modal.classList.add('active');
  overlay.classList.add('active');
}

openModalButtons.addEventListener('click', openSettings);
