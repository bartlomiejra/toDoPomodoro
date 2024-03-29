const auth = firebase.auth();
const db = firebase.firestore();
const signupInfo = document.getElementById('signup_info');
const signinInfo = document.getElementById('signin_info');
// const email = document.getElementById("email");
// const password = document.getElementById("password");
const formlog = document.getElementById('signin-form');
const signinMail = document.getElementById('signup_info');
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInGoogle = document.getElementById('signInGoogle');
const signOutBtn = document.getElementById('signOutBtn');
const signInEmail = document.getElementById('signInEmail');
const userDetails = document.getElementById('userDetails');
const provider = new firebase.auth.GoogleAuthProvider();
// const providerEmailPassword = new firebase.auth.signInWithEmailAndPasswordProvider();
const showSignIn = document.getElementById('showSignIn');
const signupForm = document.querySelector('#signup-Form');
const createAccound = document.getElementById('createAccound');
const signInForm = document.getElementById('signin');
const signUpForm = document.getElementById('signup');
let TodayTime;
let TomorrowTime;
const providerEmail = new firebase.auth.EmailAuthProvider();
function actualDate() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // month is zero-based
  const dd = String(date.getDate()).padStart(2, '0');
  const ddTomorrow = String(date.getDate() + 1).padStart(2, '0');

  TodayTime = `${yyyy}-${mm}-${dd}`;
  TomorrowTime = `${yyyy}-${mm}-${ddTomorrow}`;
}
actualDate();
createAccound.onclick = (event) => {
  event.preventDefault();
  signUpForm.classList.remove('none');
  signInForm.classList.add('none');
};
showSignIn.onclick = (event) => {
  event.preventDefault();
  signUpForm.classList.add('none');
  signInForm.classList.remove('none');
};

let token;
signInGoogle.onclick = (event) => {
  let isNewUser;
  function user(result) {
    token = result.credential.accessToken;
    console.log(token);
    const { user } = result;
    isNewUser = result.additionalUserInfo.isNewUser;
  }
  // user(result);

  // if (isNewUser) {
  auth.signInWithPopup(provider).then(
    (cred) => (
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('0')
        .set({
          id: 0,
          text: 'Water your plants 🪴 ',
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('1')
        .set({
          id: 1,
          text: "Don't forget to hydrate yourself 💧 ",
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('2')
        .set({
          id: 2,
          text: 'Check emails 📧 ',
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('3')
        .set({
          id: 3,
          text: 'Buy Cake 🎂 ',
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('4')
        .set({
          id: 4,
          text: 'Set out the garbage 🗑 ',
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('5')
        .set({
          id: 5,
          text: 'Buy a tickets 🎫 ',
          done: false,
          data: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('ListTodo')
        .doc('6')
        .set({
          id: 6,
          text: 'Prepere a presentation 📑 ',
          done: false,
          data: TodayTime,
        }),
      //! Setting List
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('settings')
        .doc('0')
        .set({
          Sound: true,
          Theme: 'Dark',
          breakTime: '5',
          pomodoreTime: '25',
        }),
      //! Actual Lista Task
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Actual')
        .doc('0')

        .set({
          id: 0,
        }),
      //! Items Pomodoro LIst
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('0')

        .set({
          id: 0,
          done: false,
          focus: 0,
          data: TodayTime,

          note: '',
          project: 'Mindfulness 🧘‍♀️ ',
          repeatDay: '1',
          repeatpartoftime: 'day',
          text: 'Meditate🧘',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('1')

        .set({
          id: 1,
          done: false,
          focus: 0,
          data: TodayTime,

          note: '⌛',
          project: 'Relations 💁‍♂️ ',
          repeatDay: '1',
          repeatpartoftime: 'day',
          text: 'Call your Grandma',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('2')
        .set({
          id: 2,
          done: false,
          focus: 0,
          data: TodayTime,

          note: 'Quotes: “To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language).” ',
          project: 'Reading 📚 ',
          repeatDay: '1',
          repeatpartoftime: 'day',
          text: '12 Rules for Life',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('3')
        .set({
          id: 3,
          done: false,
          focus: 0,
          data: TodayTime,

          note: 'Step 1: Inhale slowly through your nose while/n mentally counting to four. Concentrate on filling your lungs and abdomen with air. Let your body feel how air is filling your lungs. Step 2: Take a deep breath. Hold your breath and mentally count to four again. Step 3:Exhale slowly through your mouth while mentally counting to four. Concentrate on getting all the air out of your lungs at once. Step 4: Take a deep breath.Hold your breath and mentally count to four again.',
          project: 'Mindfulness 🧘‍♀️ ',
          repeatDay: '1',
          repeatpartoftime: 'day',
          text: 'Tactical Breathing 😮‍💨',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('4')

        .set({
          id: 4,
          done: false,
          focus: 25,
          data: TodayTime,

          note: 'Start passing one ball from one hand to the other. Also practice selfies –– these are throws you catch with the throwing hand. The ball should come to eye-height or higher. Your hands should not move very much, so aim to keep your elbows at your hips.',
          project: 'New skills 🎯 ',
          repeatDay: '2',
          repeatpartoftime: 'day',
          text: 'Juggle',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('5')

        .set({
          id: 5,
          done: false,
          focus: 43,
          data: TodayTime,

          note: 'Note text..',
          project: 'Mindfulness 🧘‍♀️',
          repeatDay: '2',
          repeatpartoftime: 'day',
          text: 'Create List',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('6')

        .set({
          id: 6,
          done: false,
          focus: 43,
          data: TodayTime,

          note: 'Blood tests have multiple benefits, including: Determining your risk status for disease and conditions Checking treatment success Early diagnosis of some conditions before symptoms or complications develop Identifying treatment side effects Monitoring chronic disease status and progression',
          project: 'Health 💊 ',
          repeatDay: '10',
          repeatpartoftime: 'day',
          text: 'Blood test',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('7')

        .set({
          id: 7,
          done: false,
          focus: 0,
          data: TodayTime,

          note: '',
          project: 'Relations 💁‍♂️ ',
          repeatDay: '7',
          repeatpartoftime: 'day',
          text: 'Call a friend and arrange a coffee',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Items')
        .doc('8')

        .set({
          id: 8,
          done: false,
          focus: 0,
          data: TodayTime,
          note: 'Prepare to run a marathon',
          project: 'Running 🏃 ',
          repeatDay: '4',
          repeatpartoftime: 'day',
          text: 'Runing Interval',
        }),
      //! History List
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('History')
        .doc('0')
        .set({
          id: 0,
          done: true,
          focus: 0,
          note: 'Try to log and use the app',
          project: 'Studies 🖊️ ',
          repeatDay: '10',
          repeatpartoftime: 'day',
          text: 'Lessons',
        }),
      //! Project list
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('0')
        .set({
          id: 0,
          color: '#ed2345',
          name: 'Studies 🖊️ ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('1')
        .set({
          id: 1,
          color: '#35589A',
          name: ' Daily routine ☕ 🕓 ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('2')
        .set({
          id: 2,
          color: '#F14A16',
          name: 'Reading 📚 ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('3')
        .set({
          id: 3,
          color: '#EC255A',
          name: 'New skills 🎯 ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)

        .collection('Project')
        .doc('4')
        .set({
          id: 4,
          color: '#9AE66E',
          name: 'Health 💊 ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('5')
        .set({
          id: 5,
          color: '#88E0EF',
          name: 'Relations 💁‍♂️ ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('6')
        .set({
          id: 6,
          color: '#ddd666',
          name: 'Running 🏃 ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Project')
        .doc('7')
        .set({
          id: 7,
          color: '#32a86d',
          name: 'Mindfulness 🧘‍♀️ ',
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Notes')
        .doc('0')

        .set({
          id: 0,
          note: 'Butter chicken is a modern Indian dish, originating—according to Madhur Jaffrey (and we always defer to her!)—at the Moti Mahal restaurant in Delhi in the 1950s./n But in just a few decades, it has fast become a globally beloved dish. After one bite of the generously spiced, savory tomato-cream sauce and the tender chicken that’s cooked in it, it’s not hard to understand why butter chicken has had such a stratospheric rise from kitchen experiment to absolute staple./n We’re crazy for this dish. We’ve even adapted the recipe to be made in a slow-cooker. But today, we’re focused on an equally simple way of making this dish—say hello to your beloved butter chicken, cooked quickly and easily in a skillet on the stovetop! The whole thing takes under 30 minutes to make, and (of course) only requires you to dirty one pan.',
          title: 'Butter chicken🍗',
          date: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Notes')
        .doc('1')

        .set({
          id: 1,
          note: 'Bakery and Bread Meat and SeafoodPasta and RiceOils, Sauces, Salad Dressingsand Condiments.Cereals and Breakfast FoodsSoups and Canned Goods.Frozen Foods.Dairy Cheese, and Eggs',
          title: 'Grocery Shopping',
          date: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Notes')
        .doc('2')

        .set({
          id: 2,
          note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
          title: 'Full body daily stretching routine',
          date: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Notes')
        .doc('2')

        .set({
          id: 2,
          note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
          title: 'Full body daily stretching routine',
          date: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('Notes')
        .doc('3')
        .set({
          id: 3,
          note: 'As someone who has had to overcome my fear of rejection and fear of saying no, as well as a tendency to justify my failures because I “wasn’t trying anyway,” this realization has been really helpful for me. I mention these because they all tie in to a simple principle: You have to be in the game to score. A lot of the time, we may talk ourselves out of asking that attractive person out, asking for a raise, negotiating the best possible deal on a house, etc. We let our fears give us a million reasons why we shouldn’t even risk rejection. Alternatively, we may refrain from telling the waiter that they got our order wrong, or reminding a friend that they owe us money, etc. We wish to avoid conflict or ‘being rude,’ even though we’re simply advocating for ourselves. We pass up the opportunity to audition for a role in the big show, to try out for the varsity football team, or to apply for that big job. We think to ourselves, “oh, I’ll never get that,” so we don’t even try, just to avoid failure. But why live this way? Why be so passive that we never get what we want, and what we know deep down we really deserve? Wouldn’t you rather get what you want in life? You may not get what you want, but wouldn’t you rather be able to say you at least tried to attain what it is that makes you happy? You have to let go of your fears. You have to be assertive. To be assertive is to stand up for yourself without violating the rights of another. So ask that girl out, audition for that play, and get that $50 back from your buddy. The only way to get what you want is to go for it. * TL;DR: You miss 100% of the shots you don’t take.',
          title:
            'You don’t get what you deserve in life, you get what you negotiate. Always go for what you want without fear.',
          date: TodayTime,
        }),
      db
        .collection('users')
        .doc(cred.user.uid)
        .collection('STat')
        .doc('0')
        .set({
          comp: 2,
          complete: 0,
          elapsed: 0,
          estimated: '0.28',
        })
    ),
  );
  // } else {
  auth.signInWithPopup(provider).then();
  console.log(`user ${user.email} does exist!`);
  // }
};

formlog.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email);
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      signinInfo.innerHTML = errorMessage;
    });
});

signOutBtn.onclick = (event) => {
  auth.signOut();
  event.preventDefault();
};

// Create account
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // signup to user

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(
      (cred) => (
        //! todoList task
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('0')
          .set({
            id: 0,
            text: 'Water your plants 🪴 ',
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('1')
          .set({
            id: 1,
            text: "Don't forget to hydrate yourself 💧 ",
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('2')
          .set({
            id: 2,
            text: 'Check emails 📧 ',
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('3')
          .set({
            id: 3,
            text: 'Buy Cake 🎂 ',
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('4')
          .set({
            id: 4,
            text: 'Set out the garbage 🗑 ',
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('5')
          .set({
            id: 5,
            text: 'Buy a tickets 🎫 ',
            done: false,
            data: TodayTime,
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('ListTodo')
          .doc('6')
          .set({
            id: 6,
            text: 'Prepere a presentation 📑 ',
            done: false,
            data: TodayTime,
          }),
        //! Setting List
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('settings')
          .doc('0')
          .set({
            Sound: true,
            Theme: 'Dark',
            breakTime: '5',
            pomodoreTime: '25',
          }),
        //! Actual Lista Task
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Actual')
          .doc('0')

          .set({
            id: 0,
          }),
        //! Items Pomodoro LIst
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('0')

          .set({
            id: 0,
            done: false,
            focus: 0,
            data: TomorrowTime,
            note: '',
            project: 'Mindfulness 🧘‍♀️ ',
            repeatDay: '1',
            repeatpartoftime: 'day',
            text: 'Meditate🧘',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('1')

          .set({
            id: 1,
            done: false,
            focus: 0,
            data: TomorrowTime,
            note: '⌛',
            project: 'Relations 💁‍♂️ ',
            repeatDay: '1',
            repeatpartoftime: 'day',
            text: 'Call your Grandma',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('2')
          .set({
            id: 2,
            done: false,
            focus: 0,
            data: TodayTime,

            note: 'Quotes: “To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language).” ',
            project: 'Reading 📚 ',
            repeatDay: '1',
            repeatpartoftime: 'day',
            text: '12 Rules for Life',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('3')
          .set({
            id: 3,
            done: false,
            focus: 0,
            data: TodayTime,

            note: 'Step 1: Inhale slowly through your nose while/n mentally counting to four. Concentrate on filling your lungs and abdomen with air. Let your body feel how air is filling your lungs. Step 2: Take a deep breath. Hold your breath and mentally count to four again. Step 3:Exhale slowly through your mouth while mentally counting to four. Concentrate on getting all the air out of your lungs at once. Step 4: Take a deep breath.Hold your breath and mentally count to four again.',
            project: 'Mindfulness 🧘‍♀️ ',
            repeatDay: '1',
            repeatpartoftime: 'day',
            text: 'Tactical Breathing 😮‍💨',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('4')

          .set({
            id: 4,
            done: false,
            focus: 25,
            data: TodayTime,
            note: 'Start passing one ball from one hand to the other. Also practice selfies –– these are throws you catch with the throwing hand. The ball should come to eye-height or higher. Your hands should not move very much, so aim to keep your elbows at your hips.',
            project: 'New skills 🎯 ',
            repeatDay: '2',
            repeatpartoftime: 'day',
            text: 'Juggle',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('5')

          .set({
            id: 5,
            done: false,
            focus: 43,
            data: TodayTime,
            note: 'Note text..',
            project: 'Mindfulness 🧘‍♀️',
            repeatDay: '2',
            repeatpartoftime: 'day',
            text: 'Create List',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('6')

          .set({
            id: 6,
            done: false,
            focus: 43,
            data: TodayTime,
            note: 'Blood tests have multiple benefits, including: Determining your risk status for disease and conditions Checking treatment success Early diagnosis of some conditions before symptoms or complications develop Identifying treatment side effects Monitoring chronic disease status and progression',
            project: 'Health 💊 ',
            repeatDay: '10',
            repeatpartoftime: 'day',
            text: 'Blood test',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('7')

          .set({
            id: 7,
            done: false,
            focus: 0,
            data: TodayTime,
            note: '',
            project: 'Relations 💁‍♂️ ',
            repeatDay: '7',
            repeatpartoftime: 'day',
            text: 'Call a friend and arrange a coffee',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Items')
          .doc('8')

          .set({
            id: 8,
            done: false,
            focus: 0,
            data: TodayTime,
            note: 'Prepare to run a marathon',
            project: 'Running 🏃 ',
            repeatDay: '4',
            repeatpartoftime: 'day',
            text: 'Runing Interval',
          }),
        //! History List
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('History')
          .doc('0')
          .set({
            id: 0,
            done: true,
            focus: 0,

            note: 'Try to log and use the app',
            project: 'Studies 🖊️ ',
            repeatDay: '10',
            repeatpartoftime: 'day',
            text: 'Logging to app ',
          }),
        //! Project list
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('0')
          .set({
            id: 0,
            color: '#ed2345',
            name: 'Studies 🖊️ ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('1')
          .set({
            id: 1,
            color: '#35589A',
            name: ' Daily routine ☕ 🕓 ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('2')
          .set({
            id: 2,
            color: '#F14A16',
            name: 'Reading 📚 ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('3')
          .set({
            id: 3,
            color: '#EC255A',
            name: 'New skills 🎯 ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('4')
          .set({
            id: 4,
            color: '#9AE66E',
            name: 'Health 💊 ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('5')
          .set({
            id: 5,
            color: '#88E0EF',
            name: 'Relations 💁‍♂️ ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('6')
          .set({
            id: 6,
            color: '#ddd666',
            name: 'Running 🏃 ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Project')
          .doc('7')
          .set({
            id: 7,
            color: '#32a86d',
            name: 'Mindfulness 🧘‍♀️ ',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Notes')
          .doc('0')

          .set({
            id: 0,
            note: 'Butter chicken is a modern Indian dish, originating—according to Madhur Jaffrey (and we always defer to her!)—at the Moti Mahal restaurant in Delhi in the 1950s./n But in just a few decades, it has fast become a globally beloved dish. After one bite of the generously spiced, savory tomato-cream sauce and the tender chicken that’s cooked in it, it’s not hard to understand why butter chicken has had such a stratospheric rise from kitchen experiment to absolute staple./n We’re crazy for this dish. We’ve even adapted the recipe to be made in a slow-cooker. But today, we’re focused on an equally simple way of making this dish—say hello to your beloved butter chicken, cooked quickly and easily in a skillet on the stovetop! The whole thing takes under 30 minutes to make, and (of course) only requires you to dirty one pan.',
            title: 'Butter chicken🍗',
            date: '31.1.21',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Notes')
          .doc('1')

          .set({
            id: 1,
            note: 'Bakery and Bread Meat and SeafoodPasta and RiceOils, Sauces, Salad Dressingsand Condiments.Cereals and Breakfast FoodsSoups and Canned Goods.Frozen Foods.Dairy Cheese, and Eggs',
            title: 'Grocery Shopping',
            date: '31.1.21',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Notes')
          .doc('2')

          .set({
            id: 2,
            note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
            title: 'Full body daily stretching routine',
            date: '31.1.21',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Notes')
          .doc('2')

          .set({
            id: 2,
            note: "    Neck roll. Stand up straight with the feet shoulder-width apart and the arms loose. ...Shoulder roll. Stand up straight with the arms loose. ...Behind-head tricep stretch. ...Standing hip rotation. ...Standing hamstring stretch. ...Quadriceps stretch. ...Ankle roll. ...Child's Pose.",
            title: 'Full body daily stretching routine',
            date: '31.1.21',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('Notes')
          .doc('3')
          .set({
            id: 3,
            note: 'As someone who has had to overcome my fear of rejection and fear of saying no, as well as a tendency to justify my failures because I “wasn’t trying anyway,” this realization has been really helpful for me. I mention these because they all tie in to a simple principle: You have to be in the game to score. A lot of the time, we may talk ourselves out of asking that attractive person out, asking for a raise, negotiating the best possible deal on a house, etc. We let our fears give us a million reasons why we shouldn’t even risk rejection. Alternatively, we may refrain from telling the waiter that they got our order wrong, or reminding a friend that they owe us money, etc. We wish to avoid conflict or ‘being rude,’ even though we’re simply advocating for ourselves. We pass up the opportunity to audition for a role in the big show, to try out for the varsity football team, or to apply for that big job. We think to ourselves, “oh, I’ll never get that,” so we don’t even try, just to avoid failure. But why live this way? Why be so passive that we never get what we want, and what we know deep down we really deserve? Wouldn’t you rather get what you want in life? You may not get what you want, but wouldn’t you rather be able to say you at least tried to attain what it is that makes you happy? You have to let go of your fears. You have to be assertive. To be assertive is to stand up for yourself without violating the rights of another. So ask that girl out, audition for that play, and get that $50 back from your buddy. The only way to get what you want is to go for it. * TL;DR: You miss 100% of the shots you don’t take.',
            title:
              'You don’t get what you deserve in life, you get what you negotiate. Always go for what you want without fear.',
            date: '31.1.21',
          }),
        db
          .collection('users')
          .doc(cred.user.uid)
          .collection('STat')
          .doc('0')
          .set({
            comp: 2,
            complete: 0,
            elapsed: 0,
            estimated: '0.28',
          })
      ),
    )
    .catch((error) => {
      const errorMessage = error.message;
      signupInfo.innerHTML = errorMessage;
    });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    // let fireuser = db.collection("users").doc(user.uid);

    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;

    whenSignedOut.setAttribute('display', 'none');
    if (user.displayName != null) {
      userDetails.innerHTML = `<p>Hi ${user.displayName}!</p>`;
    }
  } else {
    // not signed in
    whenSignedOut.setAttribute('display', 'block');

    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;

    userDetails.innerHTML = '';
  }

  // const errorCode = error.code;
  // const errorMessage = error.message;
  // console.log(errorMessage);
  //  signupInfo.innerHTML = errorMessage;
});

export { auth, db };
