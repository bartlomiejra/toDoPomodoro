const closeSettings = document.querySelectorAll("[data-close-button ]");
const saveButton = document.getElementById("saveSettingUser");
const theme = document.querySelector(".modal__themes");
const settingsDiv = document.querySelector(".settings");
const settingButton = document.getElementById("settingButton");
const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const sounds = document.querySelector(".sounds");
const SetTimes = document.querySelector(".SetTimes");
const settingUser = JSON.parse(localStorage.getItem("settings")) || {
  Theme: "Dark",
  Sound: true,
  pomodoreTime: "25",
  breakTime: "5",
};


theme.innerHTML = `
<div class="switch-button">
${
  settingUser.Theme == "Dark"
    ? '<input class="black switch-button-checkbox" type="checkbox"></input>'
    : '<input class="black switch-button-checkbox" checked type="checkbox"></input>'
}
<label class="switch-button-label" for=""><span class="switch-button-label-span">Dark</span></label>
</div>
`;
SetTimes.innerHTML = `
  <li class="duration optionsBox"  >
                <label for="quantity">Pomodore duration:</label>
				<div class="time">

                <input
				 oninput="this.nextElementSibling.value = value"
				 type="range"
                  class="numberOfTime"
                  value="25"
                  name="quantity"
                  min="5"
                  max="100"
				  />
				  <output name="duration"  class="durationTime" id="quantity">${settingUser.pomodoreTime}</output>
				  </div>
				  </li>
				  <li class="duration optionsBox">
				  <label for="quantitybreak">Pomodore break:</label>
				  
				  <div class="time">
				  
				  <input
                 
		oninput="this.nextElementSibling.value = value"
		
		type="range"
		class="numberOfTime"
		id="quantitybreak"
		value="5"
		name="quantitybreak"
		min="1"
		max="60"
		/>
		<output name="break"  id="quantitybreak" class="breakTime" >${settingUser.breakTime} </output>
		</div>            
              </li>
			  `;
export function closeModal(modal) {
  if (modal == null) return;
  settingsDiv.classList.remove("active");
}
closeSettings.forEach((span) => {
  span.addEventListener("click", () => {
    const modal = span.closest(".modal");
    closeModal(modal);
  });
});

let themeselected = settingUser.Theme;
// const themes = document.getElementsByName('theme');
export function themesValue() {
  const switchbutton = document.querySelector(".black");
  console.log(switchbutton);
  if (switchbutton.checked == true) {
    themeselected = "Light";
    container.classList.add("lightTheme");
  } else {
    themeselected = "Dark";
    container.classList.remove("lightTheme");
  }
}

export function saveOptions() {
  event.preventDefault();
  themesValue();
  const pomodoreTime = document.getElementById("quantity");
  const breakTimeValue = document.getElementById("quantitybreak");

  console.log(pomodoreTime.value);
  console.log(breakTimeValue.value);
  const settings = {
    Theme: themeselected,
    Sound: settingUser.Sound,
    pomodoreTime: pomodoreTime.value,
    breakTime: breakTimeValue.value,
  };
  window.localStorage.setItem("settings", JSON.stringify(settings));
}
saveButton.addEventListener("click", saveOptions);
export function appSounds(clickedid) {
  console.log(this);
  if (clickedid.classList.contains("mute")) {
    clickedid.classList.add("unmute");
    clickedid.classList.remove("mute");
    settingUser.Sound == true;
  } else {
    clickedid.classList.remove("unmute");
    clickedid.classList.add("mute");
    settingUser.Sound == false;
  }
}

window.appSounds = appSounds;


 if ( settingUser.Theme == "Light") {
    themeselected = "Light";
    container.classList.add("lightTheme");
  } else {
    themeselected = "Dark";
    container.classList.remove("lightTheme");
  }


  