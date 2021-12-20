const auth = firebase.auth();
const db = firebase.firestore();
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const signInGoogle = document.getElementById("signInGoogle");
const signInFacebook = document.getElementById("signInFacebook");
const signInGithub = document.getElementById("signInGithub");
const signOutBtn = document.getElementById("signOutBtn");
const signInEmail = document.getElementById("signInEmail");
const userDetails = document.getElementById("userDetails");
const provider = new firebase.auth.GoogleAuthProvider();
const showSignIn = document.getElementById("showSignIn");
const providerFb = new firebase.auth.FacebookAuthProvider();
const providerGh = new firebase.auth.GithubAuthProvider();
const signupForm = document.querySelector("#signup-Form");
// const createAccound = document.querySelector("#createAccound");

const createAccound = document.getElementById("createAccound");
const signInForm = document.getElementById("signin");
const signUpForm = document.getElementById("signup");
createAccound.onclick = (event) => {
  event.preventDefault();
  signUpForm.classList.remove("none");
  signInForm.classList.add("none");
};
showSignIn.onclick = (event) => {
  event.preventDefault();
  signUpForm.classList.add("none");
  signInForm.classList.remove("none");
};
const providerEmail = new firebase.auth.EmailAuthProvider();
signInGithub.onclick = (event) => {
  auth.signInWithPopup(providerGh);
  event.preventDefault();
};

signInFacebook.onclick = (event) => {
  auth.signInWithPopup(providerFb);
  console.log("działamfb");
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

// Create account
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup to user

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    // let fireuser = db.collection("users").doc(user.uid);
    // add user document and first Todo to firestore
    db.collection("users").doc(user.uid).collection("ListTodo").doc("0").set({
      id: 0,
      text: "First Todo 🪴 ",
      done: false,
      data: "31.1.21",
    });

    db.collection("users").doc(user.uid).collection("settings").doc("0").set({
      Sound: true,
      Theme: "Dark",
      breakTime: "5",
      pomodoreTime: "25",
    });

    db.collection("users").doc(user.uid).collection("Actual").doc("0").set({
      id: 0,
    });

    db.collection("users").doc(user.uid).collection("Items").doc("0").set({
      id: 0,
      done: false,
      focus: 0,
      note: "Note text..",
      project: "Mindfulness",
      repeatday: "1",
      repeatpartoftime: "day",
      text: "Meditate🧘",
    });
    db.collection("users").doc(user.uid).collection("History").doc("0").set({
      id: 0,
      done: true,
      focus: 0,
      note: "Note text..",
      project: "Mindfulness",
      repeatday: "1",
      repeatpartoftime: "day",
      text: "Log in to the app",
    });
    db.collection("users").doc(user.uid).collection("Project").doc("0").set({
      id: 0,
      color: "#666666",
      name: "Studies🧱 ",
    });
    db.collection("users").doc(user.uid).collection("Current").doc("0").set({
      id: 0,
      name: "No Current :(",
    });
    db.collection("users").doc(user.uid).collection("Notes").doc("0").set({
      id: 0,
      note: "Butter chicken is a modern Indian dish, originating—according to Madhur Jaffrey (and we always defer to her!)—at the Moti Mahal restaurant in Delhi in the 1950s. But in just a few decades, it has fast become a globally beloved dish. After one bite of the generously spiced, savory tomato-cream sauce and the tender chicken that’s cooked in it, it’s not hard to understand why butter chicken has had such a stratospheric rise from kitchen experiment to absolute staple. We’re crazy for this dish. We’ve even adapted the recipe to be made in a slow-cooker. But today, we’re focused on an equally simple way of making this dish—say hello to your beloved butter chicken, cooked quickly and easily in a skillet on the stovetop! The whole thing takes under 30 minutes to make, and (of course) only requires you to dirty one pan.",
      title: "Butter chicken🍗",
      date: "31.1.21",
    });
    db.collection("users").doc(user.uid).collection("STat").doc("0").set({
      comp: 2,
      complete: 0,
      elapsed: 0,
      estimated: "0.28",
    });

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
