const openModalButtons = document.getElementById('settingsButton');
const closeSettings = document.querySelectorAll('[data-close-button ]');
const saveButton = document.getElementById('saveSettingUser');
const pomodoreTime = document.getElementById('quantity');

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
let themeselected = 0;

function openSettings() {
      // eslint-disable-next-line no-undef
      modal.classList.add('active');
      overlay.classList.add('active');
}

openModalButtons.addEventListener('click', openSettings);
const themes = document.getElementsByName('theme');
console.log(themes);

saveButton.addEventListener('click', save);
function save() {
      for (i = 0; i < themes.length; i++) {
            if (themes[i].checked) {
                  themeselected = themes[i].value;

                  console.log(themeselected);
            }
      }

      const settingUser = JSON.parse(localStorage.getItem('settings')) || [];
      console.log(pomodoreTime);
      const settings = {
            Theme: themeselected,
            pomodoreTime: pomodoreTime.value,
      };
      settingUser.push(settings);

      window.localStorage.setItem('settings', JSON.stringify(settingUser));
      console.log(settings);
}
