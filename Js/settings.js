// const openModalButtons = document.getElementById('settingsButton');
const closeSettings = document.querySelectorAll('[data-close-button ]');
const saveButton = document.getElementById('saveSettingUser');
const pomodoreTime = document.getElementById('quantity');
const breakTimeValue = document.getElementById('quantitybreak');
const theme = document.querySelector('.modal__themes');
const settingsDiv = document.querySelector('.settings');
// const noteCard = document.querySelector('.noteCard');
// const leftDiv = document.querySelector('.left');
const settingButton = document.getElementById('settingButton');

const overlay = document.getElementById('overlay');
const container = document.querySelector('.container');
const settingUser = JSON.parse(
    localStorage.getItem('settings') || {
        Theme: 'Dark',
        pomodoreTime: '25',
        breakTime: '5',
    },
);

// theme.innerHTML = `
// <li>
// <input type="radio" class="radio" id="Light"   name="theme" value="Light"
// ${settingUser.Theme === 'Light' ? 'checked' : ''}
// >
// <label for="Light" >Light Theme </label>
// </li>
// <li>
// <input type="radio" class="radio" id="Dark" name="theme" value="Dark"
// ${settingUser.Theme === 'Dark' ? 'checked' : ''}
// >
// <label for="Dark">Dark Theme</label></li>




// `;
function closeModal(modal) {
    if (modal == null) return;
    settingsDiv.classList.remove('active');

    // overlay.classList.remove('active');
}
closeSettings.forEach((span) => {
    span.addEventListener('click', () => {
        const modal = span.closest('.modal');
        closeModal(modal);
    });
});

let themeselected = settingUser.Theme;

const themes = document.getElementsByName('theme');

function themesValue() {
    if (themeselected === 'Light') {
        container.classList.add('lightTheme');
    } else {
        container.classList.remove('lightTheme');
    }
}

function saveOptions() {
	event.preventDefault();
    let i;

    for (i = 0; i < themes.length; i += 1) {
        if (themes[i].checked) {
            themeselected = themes[i].value;
        }
    }
    const settings = {
        Theme: themeselected,
        pomodoreTime: pomodoreTime.value,
        breakTime: breakTimeValue.value,
    };
    window.localStorage.setItem('settings', JSON.stringify(settings));
    // themesValue();
	console.log("all rightt");	
}
saveButton.addEventListener('click', saveOptions);
themesValue();

// fetch('https://stoicquotesapi.com/v1/api/quotes/random')
// .then(response => response.text())
//  document.querySelector('.quote').innerHTML = response;

	// .then(data => console.log(data.body))
	// .catch(err => console.error(err));

const checkbox = document.querySelector('.switch-button')
	function themecheck(){
		console.log("ok")
	
		
	}
	themecheck();
	checkbox.addEventListener('change', themecheck)