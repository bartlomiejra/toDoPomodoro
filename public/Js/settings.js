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

const pomodoreTime = document.getElementById("quantity");
const breakTimeValue = document.getElementById("quantitybreak");
export function saveOptions() {
  event.preventDefault();
  themesValue();

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

// firebase

const auth = firebase.auth();
const db = firebase.firestore();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();
console.log(provider);
auth.onAuthStateChanged((user) => {
  console.log(user.uid);;
  db.collection("users")
    .doc(user.uid)
    .set({
      user: user.uid,
      Actual: "[]",
      Current: [{ id: 0, name: 0  }],

      ListTodo: [
        {
          id: 0,
          text: "First 🥇",
          done: false,
        data: "30.1.21",
        },
        {
          id: 1,
          text: "water the plants 🪴",
          done: false,
        data: "30.7.21",
        },
        {
          id: 2,
          text: "stay focused ✨",
          done: true,
        data: "30.2.21",
        },,
      ],
      History: [
        {
          id: 0,
          text: "Meditate",
          done: true,
          focus: 21,
          project: "Mindfulness🧘",
          repeatday: "1",
          repeatpartoftime: "day",
          data: 4,
        note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
        },,
      ],
      settings: [
        {
          Theme: "Dark",
          pomodoreTime: "67",
          breakTime: "5",,
        },
      ],

      Items: [
        {
          id: 0,
          text: "Meditate",
          done: false,
          focus: 0,
          project: "Mindfulness🧘",
          repeatday: "1",
          repeatpartoftime: "day",
        note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
        },
        {
          id: 1,
          text: "Basic Spanish Words",
          done: false,
          focus: 0,
          project: "Spanish Lesson🇪🇸",
          repeatday: "1",
          repeatpartoftime: "day",
          note: " Spanish Vocabulary Lists Organized by Topic\n Basic Spanish vocabulary: Greetings\n Basic Spanish vocabulary: Manners\n Basic Spanish vocabulary: Your first conversation\n Basic Spanish vocabulary: Family members\n Basic Spanish vocabulary: Food and drinks\n Intermediate Spanish vocabulary: Clothing\n Intermediate Spanish vocabulary: Dates and times\n",,
        },
        {
          id: 4,
          text: " Call grandma",
          done: false,
          focus: 0,
          note: "don't forget your grandma!👵 ",
          project: "SocialLive 🍹  ",
          repeatday: "1",
        repeatpartoftime: "day",
        },,
      ],
      STat: [
        {
          estimated: "0.00",
          comp: 0,
          elapsed: 0,
        complete: 0,
        },,
      ],
      Actual: [],
      Current: [
        {
          id: 0,
          name: 0,,
        },,
      ],
      Project: [
        {
          id: 0,
          name: "Studies👨‍🎓",
          color: "#9ebb11",,
        },
        {
          id: 1,
          name: "Running🏃",
        color: "#11bb44",
        },
        {
          id: 2,
          name: "Reading📚",
        color: "#bb1111",
        },
        {
          id: 3,
          name: "SocialLive🍹",
        color: "#989f65",
        },
        {
          id: 4,
          name: "Mindfulness🧘",
        color: "#00459e",
        },
        {
          id: 4,
          name: "Spanish Lesson🇪🇸",
        color: "#ff459e",
        },,
      ],
      Notes: [
        {
          id: 0,
          title: "Shopping List  🛒",
          date: "2021-07-02",
        note: " - Coconut oil \n- Nuts\n- Beets\n- Berries\n- Oats\n- Oranges\n- Pears\n- Potatoes",
        },
        {
          id: 1,
          title: "Greek Pasta Salad",
          date: "2021-07-03",
        note: "sd",
        },
        {
          id: 3,
          title: "8 morning stretches to help kick-start your daytyutyu\n",
          date: "2021-07-03",
          note: "Seated trapezius stretch\n- Shoulder stretch\n- Triceps stretch\n-Lower back\n-Hip flexor stretch in three planes\n-Hamstring stretch\n-Quadriceps stretch\n- Calf stretch ",,
        },
        {
          id: 4,
          title: "Marcus Aurelius Quotes",
          date: "2021-09-03",
        note: "-The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take care that you entertain no notions unsuitable to virtue and reasonable nature.\n -When you arise in the morning, think of what a precious privilege it is to be alive  to breathe, to think, to enjoy, to love.\n -The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane",
        },
      ],
    });
});




// })
/// Sign in event handlers

console.log(signInBtn);
signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<p>Hi ${user.displayName}!</p>`;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = "";
  }
});

const createThing = document.getElementById("createThing");
const thingsList = document.getElementById("thingsList");

let thingsRef;
let unsubscribe;
auth.onAuthStateChanged((user) => {
  if (user) {
    // Database Reference
    thingsRef = db.collection("users");
    console.log(thingsRef);

    createThing.onclick = (event) => {
      event.preventDefault();

      // const { serverTimestamp } = firebase.firestore.FieldValue;

      thingsRef.doc(user.uid).collection("settings").update({
        Sound,
        Theme: themeselected,
        pomodoreTime: pomodoreTime.value,
        breakTime: breakTimeValue.value,
      });
      console.log(thingsRef);
    };

    // Query
    unsubscribe = thingsRef
      .where("Theme", "==", user.Theme)
      .onSnapshot((querySnapshot) => {
        // Map results to an array of li elements
        console.log("ok");

        const items = querySnapshot.docs.map(
          (doc) => `<li>${doc.data().Theme}</li>`,
        );

        thingsList.innerHTML = items.join("");
      });
  } else {
    // Unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});
