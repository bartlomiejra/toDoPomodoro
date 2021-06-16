const openModalButtons = document.getElementById('settingsButton');
const closeSettings = document.querySelectorAll('[data-close-button ]');

const overlay = document.getElementById('overlay');

function closeModal(modal) {
      if (modal == null) return;

      modal.classList.remove('active');
      overlay.classList.remove('active');
}
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

function openSettings() {
      // eslint-disable-next-line no-undef
      modal.classList.add('active');
      overlay.classList.add('active');
}

openModalButtons.addEventListener('click', openSettings);
