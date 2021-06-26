/* eslint-disable no-undef */
const openModalButtons = document.getElementById('settingsButton');
const closeSettings = document.querySelectorAll('[data-close-button ]');
const saveButton = document.getElementById('saveSettingUser');
const pomodoreTime = document.getElementById('quantity');
const theme = document.querySelector('.modal__themes');
const overlay = document.getElementById('overlay');
const container = document.querySelector('.container');

const settingUser = JSON.parse(
      localStorage.getItem('settings') || { Theme: 'Dark', pomodoreTime: '25' },
);
theme.innerHTML = `
<li>
<input type="radio" class="radio" id="Light"   name="theme" value="Light"
${settingUser.Theme === 'Light' ? 'checked' : ''}>
<label for="Light" >Light Theme </label>
</li>
<li>
<input type="radio" class="radio" id="Dark" name="theme" value="Dark"
${settingUser.Theme === 'Dark' ? 'checked' : ''}
>
<label for="Dark">Dark Theme</label></li>
`;
function closeModal(modal) {
      if (modal == null) return;
      modal.classList.remove('active');
      overlay.classList.remove('active');
}
closeSettings.forEach((span) => {
      span.addEventListener('click', () => {
            const modal = span.closest('.modal');
            closeModal(modal);
      });
});

let themeselected = settingUser.Theme;

function openSettings() {
      // eslint-disable-next-line no-undef
      modal.classList.add('active');
      overlay.classList.add('active');
}
openModalButtons.addEventListener('click', openSettings);
const themes = document.getElementsByName('theme');

function themesValue() {
      if (themeselected === 'Light') {
            container.classList.add('lightTheme');
      } else {
            container.classList.remove('lightTheme');
      }
}

function save() {
      for (i = 0; i < themes.length; i += 1) {
            if (themes[i].checked) {
                  themeselected = themes[i].value;
            }
      }

      //   const settingUser = JSON.parse(localStorage.getItem('settings')) || [];
      const settings = {
            Theme: themeselected,
            pomodoreTime: pomodoreTime.value,
      };

      window.localStorage.setItem('settings', JSON.stringify(settings));
      themesValue();
}

saveButton.addEventListener('click', save);
themesValue();
