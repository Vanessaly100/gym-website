
// GUILD LINE

// origin: The direction the element comes from (top, right, bottom, left).
// distance: The distance the element travels before revealing (50px, 100px, 5rem, etc.).
// duration: How long the animation lasts (in milliseconds).
// delay: The delay before the animation starts (in milliseconds).
// easing: The timing function of the animation. You can use values like 'ease-in', 'ease-out', 'ease-in-out', etc.
// reset: If true, the element will reset and re-animate every time you scroll back up.
// rotate: Rotate the element in degrees ({x: 0, y: 0, z: 0}).
// scale: Scale the element (1.0 is the default).
// mobile: Whether animations should run on mobile devices (true or false).


//ScrollReveal().reveal('.from-top', { origin: 'top' });
// ScrollReveal().reveal('.from-right', { origin: 'right' });
// ScrollReveal().reveal('.from-bottom', { origin: 'bottom' });
// ScrollReveal().reveal('.from-left', { origin: 'left' });




ScrollReveal().reveal('.my-element', {
  origin: 'left',  // Direction the element will come from ('top', 'right', 'bottom', 'left')
  distance: '50px', // How far the element moves before revealing
  duration: 1000,   // Duration of the animation in milliseconds
  delay: 200,       // Delay before the animation starts (in ms)
  easing: 'ease-in-out', // Type of animation easing
  reset: true       // Whether the animation should reset when you scroll back
});

ScrollReveal().reveal('.from-left', {
  origin: 'left',
  distance: '100px',
  duration: 1500
});

ScrollReveal().reveal('.from-right', {
  origin: 'right',
  distance: '100px',
  duration: 1000,
  delay: 300
});

ScrollReveal().reveal('.fade-in', {
  opacity: 0,      // Starts from transparent
  duration: 2000,
  delay: 500
});


//==================HEADER=================
ScrollReveal().reveal('.menu-item', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 300
});
ScrollReveal().reveal('.slider-text', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 300
});
ScrollReveal().reveal('#HeroLearnmLink', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal( 'h1', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal('h2', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal( 'h3', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal( 'h4', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal( 'h5', {
  origin: 'top',
  distance: '100px',
  duration: 1000,
  delay: 200
});
// ScrollReveal().reveal( 'p', {
//   origin: 'right',
//   distance: '100px',
//   duration: 1000,
//   delay: 150
// });


// section one

ScrollReveal().reveal( '.about-left-col', {
  origin: 'left',
  distance: '100px',
  duration: 1000,
  delay: 150
});



{/* <div data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500">
</div> */}




// =====================ABOUT SECTION=================================
ScrollReveal().reveal( '.item-right', {
  origin: 'left',
  distance: '100px',
  duration: 1000,
  delay: 150
});
