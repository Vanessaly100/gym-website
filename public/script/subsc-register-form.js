
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCuq1eoWpoDn12NyQS84escA1fsAj3Rjcw",
authDomain: "subscribe-form-e15d9.firebaseapp.com",
projectId: "subscribe-form-e15d9",
storageBucket: "subscribe-form-e15d9.appspot.com",
messagingSenderId: "83363193162",
appId: "1:83363193162:web:ba6da293d1c7cc0fb3e1b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Function to handle form submission
async function handleSubscribe(event) {
event.preventDefault(); // Prevent default form submission

const emailInput = document.querySelector('.newsletter input[type="email"]').value;
const errorMessage = document.querySelector('.error-message');

// Reset error message
errorMessage.style.display = 'none';

// Basic email validation (optional)
if (validate_email(emailInput) == false ) {
errorMessage.textContent = 'Please enter a valid email address.'; // Set the error message
errorMessage.style.display = 'block'; // Display the error message
return;
// Don't continue running the code
}

try {
    // Store email into Firestore
    await addDoc(collection(db, 'subscribers'), {
        email: emailInput,
        subscribedAt: serverTimestamp() // Use serverTimestamp for Firestore
    });

    // Clear the input field after successful submission
    document.querySelector('.newsletter input[type="email"]').value = '';

    // Success alert using SweetAlert2
    Swal.fire({
        title: 'Subscribed!',
        text: 'Thank you for subscribing!',
        icon: 'success',
        confirmButtonText: 'OK'
    });
} catch (error) {
    console.error('Error adding document: ', error);
    errorMessage.textContent = 'Something went wrong. Please try again.';
    errorMessage.style.display = 'block';
}
}

// Add event listener to the button
document.addEventListener('DOMContentLoaded', () => {
const subscribeBtn = document.getElementById('subscribeBtn');
subscribeBtn.addEventListener('click', handleSubscribe);
});


// Validate Functions
function validate_email(emailInput) {
const expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(emailInput) == true) {
// Email is good
return true
} else {
// Email is not good
return false
}
}




// ==========================REGISTER MODAL=============================
const registerBtn = document.querySelectorAll('.register-btn');
const closeModal = document.getElementById('closebtn');
const contentContainer = document.getElementById('content_container');



registerBtn.forEach(button => {
    button.addEventListener('click', function() {

        // Your form submission logic here
        console.log("Submit button clicked");
    contentContainer.style.display = 'flex';

    });
});

// Close the modal when clicking the "fa times" button
closeModal.addEventListener('click', function() {
    contentContainer.style.display = 'none';
});

// Optional: Close the modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === contentContainer) {
        contentContainer.style.display = 'none';
    }
});
