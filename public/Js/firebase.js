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
    // add user document and first Todo to firestore
    db.collection("users").doc(user.uid).collection("ListTodo").doc("0").set({
      id: 0,
      text: "First Todo",
      done: false,
      data: "31.1.21",
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
