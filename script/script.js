
// FIREBASE FORM

// const signUpButton=document.getElementById('signUpButton');
// const signInButton=document.getElementById('signInButton');
// const signInForm=document.getElementById('signIn');
// const signUpForm=document.getElementById('signup');

// signUpButton.addEventListener('click',function(){
//     signInForm.style.display="none";
//     signUpForm.style.display="block";
// })
// signInButton.addEventListener('click', function(){
//     signInForm.style.display="block";
//     signUpForm.style.display="none";
// })








// ======================================================

// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels


// ===========================active link===========================
// Wait for the DOM to fully load
  document.addEventListener('DOMContentLoaded', function() {
    // Get all the menu links
    const menuLinks = document.querySelectorAll('.main-menu a, #mobile-menu a');

    // Get the current URL
    const currentUrl = window.location.href;

    // Loop through each link
    menuLinks.forEach(link => {
      // Check if the link's href matches the current URL
      if (link.href === currentUrl) {
        // Add the 'active' class
        link.classList.add('active');
      }
    });
  });

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear()
// =============================================
// hand burger
const mobileBtn = document.getElementById('hamburger-icon');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuicon = document.querySelector('#hamburger-icon i');

mobileBtn.addEventListener('click', () => {
  // Toggle mobile menu
  mobileMenu.classList.toggle("active");

  // If menu is open → show X
  if (mobileMenu.classList.contains("active")) {
    mobileMenuicon.classList.remove("fa-bars");
    mobileMenuicon.classList.add("fa-xmark");
  } 
  // If menu is closed → show bars
  else {
    mobileMenuicon.classList.remove("fa-xmark");
    mobileMenuicon.classList.add("fa-bars");
  }
});







// // ********** fixed navbar ************
const navBar = document.querySelector(".header");
// const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navBar.classList.add('fixed-nav')
    }else{
        navBar.classList.remove('fixed-nav')
    }
});


// ================================================================


// ANIMATED WORDS
const textElement = document.getElementById('animated-text');
const textArray = ["Aerobic Classes", "Yoga Classes", "Body Weight Classes", "Judo Classes", "Cardio Classes"];
let textIndex = 0;
let charIndex = 0;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000; // Delay between texts

function type() {
  if (charIndex < textArray[textIndex].length) {
    textElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () { // Wait until the DOM is fully loaded
  setTimeout(type, newTextDelay + 250);
});



// ================================
//SCROLL TO TOP PROGRESS

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");

  let progressValue = document.getElementById("progress-value");

  // Get the current vertical scroll position of the document
  let pos = document.documentElement.scrollTop;

  // Calculate the total scrollable height (document height - viewport height)
  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // Calculate the scroll progress as a percentage
  let scrollValue = Math.round((pos * 100) / calcHeight);

  // If the scroll position is more than 100px from the top, display the progress element
  if (pos > 100) {
    scrollProgress.style.display = "grid";  // Shows the progress bar
  } else {
    scrollProgress.style.display = "none";  // Hides the progress bar when near the top
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;  // Smoothly scroll back to the top of the page
  });
  // The percentage of the gradient filled in red corresponds to the scroll progress
  scrollProgress.style.background = `conic-gradient(#EA1B29 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};

// Call the calcScrollValue function on every scroll event to update the progress bar
window.onscroll = calcScrollValue;

// Call the calcScrollValue function when the window is loaded to initialize the progress bar
window.onload = calcScrollValue;


// =================================
//SECTION THREE FREQUENT ASK QUESTION
//using selectors inside the element
const questions = document.querySelectorAll(".question");

questions.forEach(function (question) {
  const btn = question.querySelector(".question-btn");
  // console.log(btn);

  btn.addEventListener("click", function () {
    // console.log(question);

    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});



// ======================LINK NAVS AND BUTTONS=================================
//===HERO PAGE HOME=======
const btnIds = ['classBtnW1', 'classBtnW2', 'classBtnW3', 'classBtnW4', 'classBtnW5', 'classBtnW6'];

function reflinks() {
  window.location.href = '/public/workout.html'; // Redirect to the desired page
}

btnIds.forEach(btnId => {
  const button = document.getElementById(btnId); // Get the button element by ID
  if (button) { // Check if the button exists
    button.addEventListener('click', reflinks); // Add event listener to each button
  }
});




//===HERO PAGE HOME contact=======
document.getElementById('HeroContactLink').addEventListener('click', function() {
    window.location.href = '../contact.html'; // Redirect to the desired page
  });



// ======================================
// swiper

$(document).ready(function(){
  $('#slider-area').owlCarousel({
    items: 1,  // One item per slide
    loop: true,  // Infinite loop
    autoplay: true,  // Autoplay enabled
    autoplayTimeout: 5000,  // Delay for autoplay
    // nav: true,  // Navigation arrows
    dots: true,  // Pagination dots
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"]  // Custom arrows
  });
});





// ===================================================
const reviewSwiper = new Swiper('.review-slider', {
  // Optional parameters
  spaceBetween: 20, // Add some space between the slides
  direction: 'horizontal',
  loop: true,
autoplay: {
   delay: 5000,
 },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Enable clickable pagination
  },

 breakpoints: {
    960: {
      slidesPerView: 2, // 2 slides per view for screens wider than 960px
      spaceBetween: 20, // Space between slides
    },
    0: {
      slidesPerView: 1, // 1 slide per view for smaller screens (width < 960px)
      spaceBetween: 10, // Smaller space between slides on smaller screens
    },
  },

});




// =========================PRELOADER================================


// JavaScript to hide the preloader and show the content when loading is done
window.addEventListener("load", function() {
    const preloader = document.getElementById('Home-preloader');
    
setTimeout(function() {
        preloader.style.display = 'none';  
    }, 3000);
});











