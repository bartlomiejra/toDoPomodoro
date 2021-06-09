const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeSettings = document.querySelectorAll('[data-close-button ]');

const overlay = document.getElementById('overlay');

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    console.log(modal);
    openModal(modal);
  });
});

closeSettings.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    // const modal = document.getElementById('modal');
    console.log(button);
    console.log(modal);
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  console.log(modal);
  overlay.classList.remove('none');
  modal.classList.remove('none');
}
