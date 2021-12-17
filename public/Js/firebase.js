// firebase
// import {} from "firebase/auth";
// firebase
const auth = firebase.auth();
const db = firebase.firestore();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
// const whenSignedOut = document.getElementById("whenSignedOut");

const signInGoogle = document.getElementById("signInGoogle");
const signInFacebook = document.getElementById("signInFacebook");
const signInGithub = document.getElementById("signInGithub");
const signOutBtn = document.getElementById("signOutBtn");
const signInEmail = document.getElementById("signInEmail");
const createAccound = document.getElementById("createAccound");

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();
const providerFb = new firebase.auth.FacebookAuthProvider();
const providerGh = new firebase.auth.GithubAuthProvider();
// const providerMial = new firebase.auth.createUserWithEmailAndPassword();

const providerEmail = new firebase.auth.EmailAuthProvider();
console.log(provider);

createAccound.onClick = (event) => {
  auth.signInWithPopup(providerGh);
  event.preventDefault();
  // whenSignedIn.hidden = false;
  whenSignedOut.hidden = true;
};

signInGithub.onclick = (event) => {
  auth.signInWithPopup(providerGh);
  event.preventDefault();
};

const signupForm = document.querySelector("#signup-Form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // getu user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  console.log(email, password);

  // signup to user

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
  });
});
auth.onAuthStateChanged((user) => {
  console.log(user.uid);
  db.collection("users")
  .set(
    doc(user.uid)
    )
    

  
   
});

// auth.onAuthStateChanged((user) => {
//   console.log(user.uid);
//   db.collection("users")
//     .doc(user.uid).
//     .set({
//       user: user.uid,
//       Actual: "[]",
//       Current: [{ id: 0, name: 0 }],

//       ListTodo: [
//         {
//           id: 0,
//           text: "First 🥇",
//           done: false,
//           data: "30.1.21",
//         },
//         {
//           id: 1,
//           text: "water the plants 🪴",
//           done: false,
//           data: "30.7.21",
//         },
//         {
//           id: 2,
//           text: "stay focused ✨",
//           done: true,
//           data: "30.2.21",
//         },
//       ],
//       History: [
//         {
//           id: 0,
//           text: "Meditate",
//           done: true,
//           focus: 21,
//           project: "Mindfulness🧘",
//           repeatday: "1",
//           repeatpartoftime: "day",
//           data: 4,
//           note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
//         },
//       ],
//       settings: [
//         {
//           Theme: "Dark",
//           Sound: true,
//           pomodoreTime: "67",
//           breakTime: "5",
//         },
//       ],

//       Items: [
//         {
//           id: 0,
//           text: "Meditate",
//           done: false,
//           focus: 0,
//           project: "Mindfulness🧘",
//           repeatday: "1",
//           repeatpartoftime: "day",
//           note: " 4-7-8 Breathing\n\nClose your mouth and inhale quietly through your nose to a mental count of four.\nHold your breath for a count of seven.\nExhale completely through your mouth, making a whoosh sound to a count of eight.\nNow inhale again and repeat the cycle three more times for a total of four breaths.\n\n      \n      ",
//         },
//         {
//           id: 1,
//           text: "Basic Spanish Words",
//           done: false,
//           focus: 0,
//           project: "Spanish Lesson🇪🇸",
//           repeatday: "1",
//           repeatpartoftime: "day",
//           note: " Spanish Vocabulary Lists Organized by Topic\n Basic Spanish vocabulary: Greetings\n Basic Spanish vocabulary: Manners\n Basic Spanish vocabulary: Your first conversation\n Basic Spanish vocabulary: Family members\n Basic Spanish vocabulary: Food and drinks\n Intermediate Spanish vocabulary: Clothing\n Intermediate Spanish vocabulary: Dates and times\n",
//         },
//         {
//           id: 4,
//           text: " Call grandma",
//           done: false,
//           focus: 0,
//           note: "don't forget your grandma!👵 ",
//           project: "SocialLive 🍹  ",
//           repeatday: "1",
//           repeatpartoftime: "day",
//         },
//       ],
//       STat: [
//         {
//           estimated: "0.00",
//           comp: 0,
//           elapsed: 0,
//           complete: 0,
//         },
//       ],
//       Project: [
//         {
//           id: 0,
//           name: "Studies👨‍🎓",
//           color: "#9ebb11",
//         },
//         {
//           id: 1,
//           name: "Running🏃",
//           color: "#11bb44",
//         },
//         {
//           id: 2,
//           name: "Reading📚",
//           color: "#bb1111",
//         },
//         {
//           id: 3,
//           name: "SocialLive🍹",
//           color: "#989f65",
//         },
//         {
//           id: 4,
//           name: "Mindfulness🧘",
//           color: "#00459e",
//         },
//         {
//           id: 4,
//           name: "Spanish Lesson🇪🇸",
//           color: "#ff459e",
//         },
//       ],
//       Notes: [
//         {
//           id: 0,
//           title: "Shopping List  🛒",
//           date: "2021-07-02",
//           note: " - Coconut oil \n- Nuts\n- Beets\n- Berries\n- Oats\n- Oranges\n- Pears\n- Potatoes",
//         },
//         {
//           id: 1,
//           title: "Greek Pasta Salad",
//           date: "2021-07-03",
//           note: "sd",
//         },
//         {
//           id: 3,
//           title: "8 morning stretches to help kick-start your daytyutyu\n",
//           date: "2021-07-03",
//           note: "Seated trapezius stretch\n- Shoulder stretch\n- Triceps stretch\n-Lower back\n-Hip flexor stretch in three planes\n-Hamstring stretch\n-Quadriceps stretch\n- Calf stretch ",
//         },
//         {
//           id: 4,
//           title: "Marcus Aurelius Quotes",
//           date: "2021-09-03",
//           note: "-The happiness of your life depends upon the quality of your thoughts: therefore, guard accordingly, and take care that you entertain no notions unsuitable to virtue and reasonable nature.\n -When you arise in the morning, think of what a precious privilege it is to be alive  to breathe, to think, to enjoy, to love.\n -The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane",
//         },
//       ],
//     });
// });

// })
/// Sign in event handlers

signInFacebook.onclick = (event) => {
  auth.signInWithPopup(providerFb);
  event.preventDefault();
};

signInGoogle.onclick = (event) => {
  auth.signInWithPopup(provider);
  event.preventDefault();
};

signOutBtn.onclick = (event) => {
  auth.signOut();
  event.preventDefault();
};
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;

    whenSignedOut.setAttribute("display", "none");
    userDetails.innerHTML = `<p>Hi ${user.displayName}!</p>`;
  } else {
    // not signed in
    whenSignedOut.setAttribute("display", "block");

    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;

    userDetails.innerHTML = "";
  }
});

export { auth, db };
