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
  auth
    .signInWithPopup(providerGh)
    .then((cred) => {
      console.log(cred.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // window.alert("Login Failed!", error);

      console.log(errorCode, errorMessage);
    });
  event.preventDefault();
};

signInFacebook.onclick = (event) => {
  auth.signInWithPopup(providerFb).then(
    (cred) => (
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("7")
        .set({
          id: 7,
          color: "#ffffff",
          name: " Fb user add",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("8")
        .set({
          id: 8,
          color: "#ffffff",
          name: " Fb user add 2",
        })
    )
  );

  console.log("działamfb");
  event.preventDefault();
};

signInGoogle.onclick = (event) => {
  auth.signInWithPopup(provider).then(
    (cred) => (
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("ListTodo")
        .doc("0")
        .set({
          id: 0,
          text: "First Todo :OOO 🪴 ",
          done: false,
          data: "31.1.21",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("settings")
        .doc("0")
        .set({
          Sound: true,
          Theme: "Dark",
          breakTime: "5",
          pomodoreTime: "25",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Actual")
        .doc("0")

        .set({
          id: 0,
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Items")
        .doc("0")

        .set({
          id: 0,
          done: false,
          focus: 0,
          data: "2022-01-08",
          note: "Note text..",
          project: "Mindfulness🧘‍♀️",
          repeatDay: "2",
          repeatpartoftime: "day",
          text: "Meditate🧘",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("History")
        .doc("0")
        .set({
          id: 0,
          done: true,
          focus: 0,
          note: "Try to log and use the app",
          project: "Studies🧱",
          repeatDay: "10",
          repeatpartoftime: "day",
          text: "Log in to the app",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("0")
        .set({
          id: 0,
          color: "#A267AC",
          name: "Studies🧱 ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("1")
        .set({
          id: 1,
          color: "#35589A",
          name: "Running 🏃 ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("2")
        .set({
          id: 2,
          color: "#F14A16",
          name: "Reading📚 ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("3")
        .set({
          id: 3,
          color: "#EC255A",
          name: "Relation with people 💁‍♂️ ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("4")
        .set({
          id: 4,
          color: "#9AE66E",
          name: "Health 💊 ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("5")
        .set({
          id: 5,
          color: "#88E0EF",
          name: "Learning to juggle 🎯 ",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("6")
        .set({
          id: 6,
          color: "#ddd666",
          name: " Daily routine ☕ 🕓",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Project")
        .doc("7")
        .set({
          id: 7,
          color: "#ddd666",
          name: " Mindfulness🧘‍♀️",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Notes")
        .doc("0")

        .set({
          id: 0,
          note: "Butter chicken is a modern Indian dish, originating—according to Madhur Jaffrey (and we always defer to her!)—at the Moti Mahal restaurant in Delhi in the 1950s. But in just a few decades, it has fast become a globally beloved dish. After one bite of the generously spiced, savory tomato-cream sauce and the tender chicken that’s cooked in it, it’s not hard to understand why butter chicken has had such a stratospheric rise from kitchen experiment to absolute staple. We’re crazy for this dish. We’ve even adapted the recipe to be made in a slow-cooker. But today, we’re focused on an equally simple way of making this dish—say hello to your beloved butter chicken, cooked quickly and easily in a skillet on the stovetop! The whole thing takes under 30 minutes to make, and (of course) only requires you to dirty one pan.",
          title: "Butter chicken🍗",
          date: "31.1.21",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Notes")
        .doc("1")

        .set({
          id: 1,
          note: "Bakery and Bread Meat and SeafoodPasta and RiceOils, Sauces, Salad Dressingsand Condiments.Cereals and Breakfast FoodsSoups and Canned Goods.Frozen Foods.Dairy Cheese, and Eggs",
          title: "Grocery Shopping",
          date: "31.1.21",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("Notes")
        .doc("2")

        .set({
          id: 1,
          note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
          title: "Full body daily stretching routine",
          date: "31.1.21",
        }),
      db
        .collection("users")
        .doc(cred.user.uid)
        .collection("STat")
        .doc("0")
        .set({
          comp: 2,
          complete: 0,
          elapsed: 0,
          estimated: "0.28",
        })
    )
  );

  // .then(() => res.status(200).json("Success: new user created."));

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
    .then(
      (cred) => (
        // console.log(cred.user);

        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("ListTodo")
          .doc("0")
          .set({
            id: 0,
            text: "Water your plants 🪴 ",
            done: false,
            data: "31.1.21",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("ListTodo")
          .doc("1")
          .set({
            id: 1,
            text: "Don't forget to hydrate yourself 💧 ",
            done: false,
            data: "31.1.21",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("ListTodo")
          .doc("2")
          .set({
            id: 2,
            text: "Check emails 📧 ",
            done: false,
            data: "31.1.22",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("settings")
          .doc("0")
          .set({
            Sound: true,
            Theme: "Dark",
            breakTime: "5",
            pomodoreTime: "25",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Actual")
          .doc("0")

          .set({
            id: 0,
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Items")
          .doc("0")

          .set({
            id: 0,
            done: false,
            focus: 0,
            data: "2022-01-08",
            note: "Note text..",
            project: "Mindfulness",
            repeatDay: "1",
            repeatpartoftime: "day",
            text: "Meditate🧘",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Items")
          .doc("1")

          .set({
            id: 1,
            done: false,
            focus: 0,
            data: "2022-01-08",
            note: "Note text..",
            project: "Relations  💁‍♂️ ",
            repeatDay: "1",
            repeatpartoftime: "day",
            text: "Call your Grandma",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("History")
          .doc("0")
          .set({
            id: 0,
            done: true,
            focus: 0,
            note: "Note text..",
            project: "Mindfulness",
            repeatDay: "1",
            repeatpartoftime: "day",
            text: "Log in to the app",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Items")
          .doc("0")

          .set({
            id: 0,
            done: false,
            focus: 0,
            data: "2022-01-08",
            note: "Note text..",
            project: "Mindfulness🧘‍♀️",
            repeatDay: "2",
            repeatpartoftime: "day",
            text: "Meditate🧘",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("History")
          .doc("0")
          .set({
            id: 0,
            done: true,
            focus: 0,
            note: "Try to log and use the app",
            project: "Studies🧱",
            repeatDay: "10",
            repeatpartoftime: "day",
            text: "Log in to the app",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("0")
          .set({
            id: 0,
            color: "#ed2345",
            name: "Studies 🖊️",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("1")
          .set({
            id: 1,
            color: "#35589A",
            name: " Daily routine ☕ 🕓",
          }),
          db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("2")
          .set({
            id: 2,
            color: "#F14A16",
            name: "Reading📚 ",
          }),
        db
        .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("3")
          .set({
            id: 3,
            color: "#EC255A",
            name: "Juggle 🎯 ",
          }),
          db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("4")
          .set({
            id: 4,
            color: "#9AE66E",
            name: "Health 💊 ",
          }),
          db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("5")
          .set({
            id: 5,
            color: "#88E0EF",
            name: "Relations  💁‍♂️ ",
          }),
        db
        .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("6")
          .set({
            id: 6,
            color: "#ddd666",
            name: "Running 🏃 ",
          }),
          db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Project")
          .doc("7")
          .set({
            id: 7,
            color: "#32a86d",
            name: " Mindfulness🧘‍♀️",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Notes")
          .doc("0")

          .set({
            id: 0,
            note: "Butter chicken is a modern Indian dish, originating—according to Madhur Jaffrey (and we always defer to her!)—at the Moti Mahal restaurant in Delhi in the 1950s. But in just a few decades, it has fast become a globally beloved dish. After one bite of the generously spiced, savory tomato-cream sauce and the tender chicken that’s cooked in it, it’s not hard to understand why butter chicken has had such a stratospheric rise from kitchen experiment to absolute staple. We’re crazy for this dish. We’ve even adapted the recipe to be made in a slow-cooker. But today, we’re focused on an equally simple way of making this dish—say hello to your beloved butter chicken, cooked quickly and easily in a skillet on the stovetop! The whole thing takes under 30 minutes to make, and (of course) only requires you to dirty one pan.",
            title: "Butter chicken🍗",
            date: "31.1.21",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Notes")
          .doc("1")

          .set({
            id: 1,
            note: "Bakery and Bread Meat and SeafoodPasta and RiceOils, Sauces, Salad Dressingsand Condiments.Cereals and Breakfast FoodsSoups and Canned Goods.Frozen Foods.Dairy Cheese, and Eggs",
            title: "Grocery Shopping",
            date: "31.1.21",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Notes")
          .doc("2")

          .set({
            id: 2,
            note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
            title: "Full body daily stretching routine",
            date: "31.1.21",
          }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Notes")
          .doc("2")

          .set({
            id: 2,
            note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
            title: "Full body daily stretching routine",
            date: "31.1.21",
          }),
          db
          .collection("users")
          .doc(cred.user.uid)
          .collection("Notes")
          .doc("3")
          .set({
          id: 3,
          note: "As someone who has had to overcome my fear of rejection and fear of saying no, as well as a tendency to justify my failures because I “wasn’t trying anyway,” this realization has been really helpful for me. I mention these because they all tie in to a simple principle: You have to be in the game to score. A lot of the time, we may talk ourselves out of asking that attractive person out, asking for a raise, negotiating the best possible deal on a house, etc. We let our fears give us a million reasons why we shouldn’t even risk rejection. Alternatively, we may refrain from telling the waiter that they got our order wrong, or reminding a friend that they owe us money, etc. We wish to avoid conflict or ‘being rude,’ even though we’re simply advocating for ourselves. We pass up the opportunity to audition for a role in the big show, to try out for the varsity football team, or to apply for that big job. We think to ourselves, “oh, I’ll never get that,” so we don’t even try, just to avoid failure. But why live this way? Why be so passive that we never get what we want, and what we know deep down we really deserve? Wouldn’t you rather get what you want in life? You may not get what you want, but wouldn’t you rather be able to say you at least tried to attain what it is that makes you happy? You have to let go of your fears. You have to be assertive. To be assertive is to stand up for yourself without violating the rights of another. So ask that girl out, audition for that play, and get that $50 back from your buddy. The only way to get what you want is to go for it. * TL;DR: You miss 100% of the shots you don’t take.",
          title:
            "You don’t get what you deserve in life, you get what you negotiate. Always go for what you want without fear.",
          date: "31.1.21",
        }),
        db
          .collection("users")
          .doc(cred.user.uid)
          .collection("STat")
          .doc("0")
          .set({
            comp: 2,
            complete: 0,
            elapsed: 0,
            estimated: "0.28",
          })
      ),
    )
    // .then(() => res.status(200).json("Success: new user created."));
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // window.alert("Login Failed!", error);

      console.log(errorCode, errorMessage);
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    // let fireuser = db.collection("users").doc(user.uid);
    // add user document and first Todo to firestore

    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;

    whenSignedOut.setAttribute("display", "none");
    if(user.displayName != null){

      userDetails.innerHTML = `<p>Hi ${user.displayName}!</p>`;
    }
  } else {
    // not signed in
    whenSignedOut.setAttribute("display", "block");

    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;

    userDetails.innerHTML = "";
  }
});

export { auth, db };
