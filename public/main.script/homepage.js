// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

// const firebaseConfig = {
//      apiKey: "AIzaSyDd2IsfwwWkg8iKI3gHNLDx8_9z09SotuI",
//     authDomain: "project-form-312e0.firebaseapp.com",
//     projectId: "project-form-312e0",
//     storageBucket: "project-form-312e0.appspot.com",
//     messagingSenderId: "265975838964",
//     appId: "1:265975838964:web:d5f05f891269ae532786a1"
//   };
 
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   const auth=getAuth();
//   const db=getFirestore();

//   onAuthStateChanged(auth, (user)=>{
//     const loggedInUserId=localStorage.getItem('loggedInUserId');
//     if(loggedInUserId){
//         console.log(user);
//         const docRef = doc(db, "users", loggedInUserId);
//         getDoc(docRef)
//         .then((docSnap)=>{
//             if(docSnap.exists()){
//                 const userData=docSnap.data();
//                 document.getElementById('loggedUserFName').innerText=userData.firstName;
//                 document.getElementById('loggedUserEmail').innerText=userData.email;
//                 document.getElementById('loggedUserLName').innerText=userData.lastName;

//             }
//             else{
//                 console.log("no document found matching id")
//             }
//         })
//         .catch((error)=>{
//             console.log("Error getting document");
//         })
//     }
//     else{
//         console.log("User Id not Found in Local storage")
//     }
//   })


// ===============================================================
//      PROGRESS BAR

window.addEventListener('scroll', function () {
  let bar = document.querySelectorAll('.bar');

  bar.forEach((progress) => {
    let progressPosition = progress.getBoundingClientRect().top;
     //to gets the height of the visible part of the browser window 
    let screenPosition = window.innerHeight;

    // Check if the progress bar is within the visible part of the screen and hasn't animated yet
    if (progressPosition < screenPosition && !progress.classList.contains('animated')) {
      let value = progress.getAttribute('data-value');
      let count = 0;

      // Add a class to mark the bar as animated
      progress.classList.add('animated');

      // Start the animation
      let progressAnimation = setInterval(() => {
        count++;
        progress.style.width = `${count}%`;
        progress.setAttribute('data-text', `${count}%`);
        if (count >= value) {
          clearInterval(progressAnimation);
        }
      }, 15);
    }
  });
});







