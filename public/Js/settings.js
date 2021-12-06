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
auth.onAuthStateChanged((user) => {
  if (user) {
    logUserId = user.uid;
    // get all data from firebase and console.log it
    // const alldata = [];
    // thingsRef.doc(user.uid).collection("settings").doc("0")
    //   .get()
    //   .then((doc) => {
    //             console.log("Document data:", doc.data());
    //           });

    //   snapshot.docs.forEach((docs) => {
    //     console.log(docs.data());
    // //     alldata.push(doc.data());
    //   });
    // console.log(alldata);

    //     firebaseSettings = alldata[0].ListTodo;
    //     console.log(firebaseSettings);
    //   });

    // db.collection("users")
    // var messageRef = db.collection('users').doc('roomA')
    //             .collection('messages').doc('message1');

    // console.log(thingsRef);
    saveSettings.onclick = (event) => {
      console.log("ok");
      event.preventDefault();

      // const { serverTimestamp } = firebase.firestore.FieldValue;
      thingsRef.doc(user.uid).collection("settings").doc("0").update({
        Sound,
        Theme: themeselected,
        pomodoreTime: pomodoreTime.value,
        breakTime: breakTimeValue.value,
      });
    };
let myArray;
    // Query
    // .where("uid", "!=", user.uid)
    unsubscribe = thingsRef
      .doc(logUserId)
      .collection("settings")
      .onSnapshot((querySnapshot) => {
        // Map results to an array of li elements

        const items = querySnapshot.docs.map((doc) => {
          
          console.log(doc);
          return `<li>${doc.data().Sound},${doc.data().Theme},${doc.data().breakTime},</li>`;
          console.log(sounds)
        });
        console.log(items);
        console.log(myArray);
        // console.log(doc.data().pomodoreTime);

        thingsList.innerHTML = items.join("");
      });
    theme.innerHTML = `
<div class="switch-button">
  <!-- doc.data.Theme == "Dark" ? mo ze taja jibstryjcha  -->
  settingUser.Theme} == "Dark"
      ? '<input class="black switch-button-checkbox" type="checkbox"></input>'
      : '<input class="black switch-button-checkbox" checked type="checkbox"></input>'
  }
<label class="switch-button-label" for=""><span class="switch-button-label-span">Dark</span></label>
</div>
`;
  } else {
    unsubscribe && unsubscribe();
  }
});
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
		name="quantitybreak"
		min="1"
		max="60"
		/>
		<output name="break"  id="quantitybreak" class="breakTime" >${settingUser.breakTime} </output>
		</div>            
              </li>
			  `;

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

const pomodoreTime = document.getElementById("quantity");
const breakTimeValue = document.getElementById("quantitybreak");
export function saveOptions() {
  event.preventDefault();
  themesValue();
  const settings = {
    Theme: themeselected,
    Sound: settingUser.Sound,
    pomodoreTime: pomodoreTime.value,
    breakTime: breakTimeValue.value,
  };
  window.localStorage.setItem("settings", JSON.stringify(settings));
}
saveSettings.addEventListener("click", saveOptions);
let Sound = true;
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
  console.log(Sound);
  // window.localStorage.setItem("settings", JSON.stringify(settings));
}

window.appSounds = appSounds;
if (settingUser.Theme == "Light") {
  themeselected = "Light";
  container.classList.add("lightTheme");
} else {
  themeselected = "Dark";
  container.classList.remove("lightTheme");
}
// const thingsList = document.getElementById("thingsList");

export { logUserId };
