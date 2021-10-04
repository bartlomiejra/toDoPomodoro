const closeSettings = document.querySelectorAll('[data-close-button ]');
const saveButton = document.getElementById('saveSettingUser');
const pomodoreTime = document.getElementById('quantity');
const breakTimeValue = document.getElementById('quantitybreak');
const theme = document.querySelector('.modal__themes');
const settingsDiv = document.querySelector('.settings');
const settingButton = document.getElementById('settingButton');
const overlay = document.getElementById('overlay');
const container = document.querySelector('.container');
const sounds = document.querySelector('.sounds');
const settingUser = JSON.parse(
	localStorage.getItem('settings') || {
        Theme: 'Dark',
		Sound: true,
        pomodoreTime: '25',
        breakTime: '5',
    },
	);
theme.innerHTML = `
<div class="switch-button">
${settingUser.Theme == 'Dark' ?


'<input class="black switch-button-checkbox" type="checkbox"></input>'
:
'<input class="black switch-button-checkbox" checked type="checkbox"></input>'
}
<label class="switch-button-label" for=""><span class="switch-button-label-span">Dark</span></label>
  </div>
  `

function closeModal(modal) {
	if (modal == null) return;
    settingsDiv.classList.remove('active');
}
closeSettings.forEach((span) => {
	span.addEventListener('click', () => {
		const modal = span.closest('.modal');
        closeModal(modal);
    });
});

let themeselected = settingUser.Theme;
// const themes = document.getElementsByName('theme');
function themesValue() {
	const switchbutton = document.querySelector('.black')
	console.log(switchbutton);
	if (switchbutton.checked == true) {
		themeselected = 'Light';
		container.classList.add('lightTheme')
    } else {
		themeselected = 'Dark';
		container.classList.remove('lightTheme');
    }
}

function saveOptions() {
	event.preventDefault();
	themesValue();
    const settings = {
        Theme: themeselected,
        pomodoreTime: pomodoreTime.value,
        breakTime: breakTimeValue.value,
    };
    window.localStorage.setItem('settings', JSON.stringify(settings));
}
saveButton.addEventListener('click', saveOptions);

// fetch('https://stoicquotesapi.com/v1/api/quotes/random')
// .then(response => response.text())
//  document.querySelector('.quote').innerHTML = response;

// .then(data => console.log(data.body))
// .catch(err => console.error(err));
function appSounds(clickedid){
	console.log(this);
	if(clickedid.contains.mute){
		
		clickedid.classList.add("unmute")
		clickedid.classList.remove("mute")
		console.log(clickedid);
		
	} else {
		clickedid.classList.remove("unmute")
		clickedid.classList.add("mute")
		console.log(clickedid);

	}


}