

const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});
signInButton.addEventListener('click', function () {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd2IsfwwWkg8iKI3gHNLDx8_9z09SotuI",
    authDomain: "project-form-312e0.firebaseapp.com",
    projectId: "project-form-312e0",
    storageBucket: "project-form-312e0.appspot.com",
    messagingSenderId: "265975838964",
    appId: "1:265975838964:web:d5f05f891269ae532786a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Form validation function
function validateForm(email, password, firstName, lastName) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    let isValid = true;

    // Clear previous errors
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('firstNameError').innerHTML = '';
    document.getElementById('lastNameError').innerHTML = '';

    // Email validation
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerHTML = 'Invalid email format.';
        isValid = false;
    }

    // Password validation
    if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 6 characters, contain at least one number, one uppercase, and one lowercase letter.';
        isValid = false;
    }

    // Name validation
    if(!firstName){
        document.getElementById('firstNameError').innerHTML = 'First  name is required.';
        isValid = false;
    }
    if (!lastName) {
        document.getElementById('lastNameError').innerHTML = ' last name is required.';
        isValid = false;
    }

    return isValid;
}

// Grab the sign-up button and add a click event
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();

    // Get form input values
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    // Validate form
    if (!validateForm(email, password, firstName, lastName)) {
        return;
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            };
            Swal.fire({
            title: 'Account Created Successfully!',
            text: 'You can now sign in with your account.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
            document.getElementById('rEmail').value = '';
            document.getElementById('rPassword').value = '';
            document.getElementById('fName').value = '';
            document.getElementById('lName').value = '';

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    signInForm.style.display = "block";
                    signUpForm.style.display = "none";
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                Swal.fire({
                title: 'Error!',
                text: 'Email Address Already Exists.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            } else {
                Swal.fire({
                title: 'Error!',
                text: 'Unable to create user.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            }
        });
});


 // allow user to login after acct is successful created
 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

    // const authentication will hold the instant of firebase authentication
    const auth=getAuth();

    // this service which is (signInWithEmailAndPassword) to authenticate a user using there email address and password
    signInWithEmailAndPassword(auth, email,password)
    //callback function if user is succeful
    .then((userCredential)=>{
        Swal.fire({
                title: 'Login Successful',
                text: 'Ready to see our website.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        const user=userCredential.user;

        // store userid of logged in user in the browser local storage it will be useful for tracking the user authentication state
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='./index.html';//./index.html
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            Swal.fire({
                title: 'Incorrect Email or Password',
                text: 'please fill in correct password.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
             Swal.fire({
                title: 'Account does not Exist',
                text: 'please sign up.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
 })



