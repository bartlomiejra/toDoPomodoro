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

const userDetails = document.getElementById("userDetails");

const provider = new firebase.auth.GoogleAuthProvider();
var providerFb = new firebase.auth.FacebookAuthProvider();
var providerGh = new firebase.auth.GithubAuthProvider();

const providerEmail = new firebase.auth.EmailAuthProvider();

console.log(provider);


signInEmail.onclick = (event) => {

  auth.signInWithPopup(providerEmail);
  event.preventDefault();
};
signInGithub.onclick = (event) => {

  auth.signInWithPopup(providerGh);
  event.preventDefault();
};


// Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then((result) => {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch((error) => {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}

// auth.onAuthStateChanged((user) => {



//   console.log(user.uid);
//   db.collection("users")
//     .doc(user.uid).collection("ListTodo").doc("0")
//     .set({
//       data: "30.1.21",
//       title: "tisssst",
//       id: 0,
//       done: false
//     }).doc("1").set(

//       {
//         data: "30.1.21",
//         title: "tesst",
//         id: 1,
//         done: false
        
//       }
//       )
//   });

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

console.log(signInGoogle);
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
    
    whenSignedOut.setAttribute('display','none');
    userDetails.innerHTML = `<p>Hi ${user.displayName}!</p>`;
  } else {
    // not signed in
    whenSignedOut.setAttribute('display','block');
    
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    
    userDetails.innerHTML = "";
  }
});

export { auth, db };
