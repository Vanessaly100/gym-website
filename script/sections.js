// =========================ABOUT PAGE=======================

// const scrollRevealOption = {
//     distance: "50px",
//     origin: "bottom",
//     duration: 1000
// }
// // ..... (is called spread operator, it is use to extract some items)
// ScrollReveal().reveal(".header__image img", {
//     ...scrollRevealOption,
//     origin: "right"
// })


// Scroll Reveal 

import {CountUp} from 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.8.0/countUp.min.js'

ScrollReveal().reveal(".counter",{
    // interval: 200,
    afterReveal: function(el){
        const countEl = el.querySelector(".count");
        const targetValue = countEl.getAttribute("data-target")

        // initializing countupjs and start counting
        const countUp = new CountUp(countEl.id, targetValue, { duration: 2,
           suffix: '+'  // Add "+" at the end of the number
        })
        if(!countUp.error){
            countUp.start()
        }else{
            console.log(CountUp.error)
        }
    }
})


// =================active header===================
// const links = document.querySelectorAll('.header ul li a');

// // Loop through each link and add a click event listener
// links.forEach(link => {
//   link.addEventListener('click', function() {
//     // Remove the active class from all links
//     links.forEach(link => link.classList.remove('active'));

//     // Add the active class to the clicked link
//     this.classList.add('active');
//   });
// });
