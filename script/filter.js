
// Create a copy of the exercises array and store it in filteredExercises.
let filteredExercises = [...exercises];

const exercisesContainer = document.querySelector('.exercises-container');

// Function to display the filtered exercises on the webpage.
const displayExercises = () => {
  if (filteredExercises.length < 1) {
    exercisesContainer.innerHTML = `<h6>Sorry, no Exercises matched your search</h6>`;
    return; 
  }

  // If there are exercises to display, map through each exercise object and generate HTML.
  exercisesContainer.innerHTML = filteredExercises
    .map((exercise) => {
      // Destructure the exercise object to get id, title, and image properties.
      const { id, title, image } = exercise;
      return `<article class="exercise" data-id="${id}">
          <img
            src="${image}"  
            class="exercise-img img"
            alt=""           
          />
          <footer>
            <h5 class="exercise-name">${title}</h5>  
          </footer>
        </article>`;
    })
    // Join the mapped HTML strings into one string and set it as the innerHTML of the container.
    .join('');
};

// Call the displayExercises function to show the exercises on the webpage when the page loads.
displayExercises();

// Select the form and search input elements for the text filter functionality.
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  
  // Filter the exercises array to find exercises that match the search input.
  filteredExercises = exercises.filter((exercise) => {
    return exercise.title.toLowerCase().includes(inputValue.toLowerCase());
  });
  displayExercises();
});

// Filter Buttons
// Select the element that will hold the category filter buttons.
const exerciseDOM = document.querySelector('.categories');

// Function to display category filter buttons.
const displayButtons = () => {
  const buttons = [
    'all',  // Add an 'all' button to show all exercises.
    ...new Set(exercises.map((exercise) => exercise.categories)),  // Use Set to get unique categories.
  ];

  // Generate the HTML for each button and add it to the exerciseDOM element.
  exerciseDOM.innerHTML = buttons
    .map((categories) => {
      // Create a button for each category.
      return `<button class='categories-btn' data-id="${categories}">${categories}</button>`;
    })
    .join(''); // Join the buttons together into a single string and insert into the DOM.
};

// Call displayButtons to show the filter buttons on the page.
displayButtons();

// Add an event listener to the companiesDOM element (button container).
exerciseDOM.addEventListener('click', (e) => {
  // Get the element that was clicked.
  const el = e.target;

  if (el.classList.contains('categories-btn')) {
    // If the 'all' button is clicked, show all exercises by copying the entire exercises array.
    if (el.dataset.id === 'all') {
      filteredExercises = [...exercises];
    } else {
      // Otherwise, filter the exercises based on the clicked category.
      filteredExercises = exercises.filter((exercise) => {
        return exercise.categories === el.dataset.id;
      });
    }

    // Clear the search input after a category button is clicked.
    searchInput.value = '';

    // Display the filtered exercises on the page.
    displayExercises();
  }
});
