// import {
//  collectionGroup, query, where, getDocs,
// } from "firebase/firestore";
import {
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  where,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

const closeSettings = document.querySelectorAll("[data-close-button ]");
// const saveButton = document.getElementById("saveSettingUser");
const theme = document.querySelector(".modal__themes");
const settingsDiv = document.querySelector(".settings");
const settingButton = document.getElementById("settingButton");
const overlay = document.getElementById("overlay");
const container = document.querySelector(".container");
const sounds = document.querySelector(".sounds");
const SetTimes = document.querySelector(".SetTimes");
let firebaseSettings;
const settingUser = JSON.parse(localStorage.getItem("settings")) || {
  Theme: "Dark",
  Sound: true,
  pomodoreTime: "25",
  breakTime: "5",
};
let thingsRef;
let unsubscribe;
let logUserId;
const thingsList = document.getElementById("thingsList");
const saveSettings = document.getElementById("saveSettingUser");

thingsRef = db.collection("users");
let firestoreTheme;
let firestorepomodoreTime;
let firestoreBreakTime;
let firestoreSound;
auth.onAuthStateChanged((user) => {
  if (user) {
    logUserId = user.uid;

    saveSettings.onclick = (event) => {
      const pomodoreTime = document.getElementById("quantity");
      const breakTimeValue = document.getElementById("quantitybreak");
      console.log("ok");
      event.preventDefault();
      thingsRef.doc(user.uid).collection("settings").doc(logUserId).update({
        Sound: true,
        Theme: themeselected,
        pomodoreTime: pomodoreTime.value,
        breakTime: breakTimeValue.value,
      });
    };
    // Query
    unsubscribe = thingsRef
      .doc(logUserId)
      .collection("settings")
      .onSnapshot((querySnapshot) => {
        // Map results to an array of li elements
        const elements = querySnapshot.docs;
        const items = querySnapshot.docs.map((doc) => {
          firestoreTheme = doc.data().Theme;
          firestorepomodoreTime = doc.data().pomodoreTime;
          firestoreBreakTime = doc.data().breakTime;
          firestoreSound = doc.data().Sound;
        });

        // thingsList.innerHTML = items.join("");
        console.log(firestoreTheme);
        theme.innerHTML = `
<div class="switch-button">
  
  ${
    firestoreTheme == "Dark"
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
                  name="quantity"
                  min="5"
                  max="100"
				  />
				  <output name="duration"  class="durationTime" id="quantity">${firestorepomodoreTime}</output>
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
		name="quantitybreak"
		min="1"
		max="60"
		/>
		<output name="break"  id="quantitybreak" class="breakTime" >${firestoreBreakTime} </output>
		</div>            
              </li>
			  `;
      });
  } else {
    unsubscribe && unsubscribe();
  }
});
console.log(logUserId);
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

let themeselected = firestoreTheme;
console.log(firestoreTheme);
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
export function appSounds(clickedid) {
  console.log(this);
  if (clickedid.classList.contains("mute")) {
    clickedid.classList.add("unmute");
    clickedid.classList.remove("mute");
    Sound = true;
  } else {
    clickedid.classList.remove("unmute");
    clickedid.classList.add("mute");
    Sound = false;
  }
  firestoreSound = Sound;
}
export function saveOptions() {
  event.preventDefault();
  themesValue();
}
saveSettings.addEventListener("click", saveOptions);
let Sound = true;

window.appSounds = appSounds;
if (firestoreTheme == "Light") {
  themeselected = "Light";
  container.classList.add("lightTheme");
} else {
  themeselected = "Dark";
  container.classList.remove("lightTheme");
}
// const thingsList = document.getElementById("thingsList");

export{ logUserId, unsubscribe, thingsRef};