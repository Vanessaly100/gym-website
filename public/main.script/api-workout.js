// ======================TIMER===========================
const start = document.getElementById('start');
const reset = document.getElementById('reset');

let timeInHour = document.getElementById("hour");
let timeInMinute= document.getElementById("minute");
let timeInSeconds = document.getElementById("sec");

// Store a reference to the startTimer variable
let startTimer = null;

start.addEventListener('click', function() {
    // Check if any of the inputs have non-zero values
    if (timeInHour.value > 0 || timeInMinute.value > 0 || timeInSeconds.value > 0) {
        startInterval();
    } else {
        alert("Please enter a time greater than 0.");
    }
});

reset.addEventListener('click', function() {
    timeInHour.value = 0;
    timeInMinute.value = 0;
    timeInSeconds.value = 0;
    // Stop the timer after pressing "reset"
    stopInterval();
});

function startInterval() {
    // Clear any existing interval to prevent multiple timers from running
    stopInterval();
    
    startTimer = setInterval(function() {
        timer();
    }, 1000);
}

function timer() {
    if (timeInSeconds.value > 0) {
        timeInSeconds.value--;
    } else if (timeInMinute.value > 0) {
        timeInSeconds.value = 59;
       timeInMinute.value--;
    } else if (timeInHour.value > 0) {
        timeInMinute.value = 59;
        timeInHour.value--;
    }
}

// Stop the function after pressing the reset button
// So the time won't go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}




// ================================================================
// // Define API options

const exerciseOptions = {
method: 'GET',
headers: {
'X-RapidAPI-Key': '366088462dmsha02250f4a02e988p14bc88jsndecc5d1954ba', // Replace with your actual RapidAPI Key
'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
}
};

const url = 'https://exercisedb.p.rapidapi.com/exercises';  // Replace with the correct endpoint


// Function to fetch data
const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Display fetched exercises with videos in the browser
const displayExercisesWithVideos = (exercises) => {
    const container = document.getElementById('exercise-container');
    exercises.forEach((exercise, index) => {
        // Create a new div for each exercise
        const exerciseDiv = document.createElement('div');
        exerciseDiv.classList.add('exercise');

        // Create elements to display exercise name, type, and video
        const name = document.createElement('h3');
        name.textContent = `Exercise: ${exercise.name}`;
        
        const type = document.createElement('p');
        type.classList.add('exercise-type');
        type.textContent = `Type: ${exercise.bodyPart}`; // Use bodyPart or appropriate API field

        const video = document.createElement('img');
        video.src = exercise.gifUrl; // Assuming the API returns a URL to an exercise video or GIF

        // Create a button to view the video and instructions in detail
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View Details';
        viewBtn.classList.add('btn-view');
        viewBtn.onclick = () => openModal(exercise.name, exercise.bodyPart, exercise.gifUrl, exercise.instructions);

        // Append elements to the exercise div
        exerciseDiv.appendChild(name);
        exerciseDiv.appendChild(type); // Append type of exercise
        exerciseDiv.appendChild(video);
        exerciseDiv.appendChild(viewBtn);

        // Append the exercise div to the container
        container.appendChild(exerciseDiv);
    });
};

// Modal functionality
const modal = document.getElementById('myModal');
const modalTitle = document.getElementById('modal-title');
const modalType = document.getElementById('modal-type'); // Check if element exists
const modalVideo = document.getElementById('modal-video');
const modalInstructions = document.getElementById('modal-instructions');
const closeModal = document.getElementsByClassName('close');//[0];

// Open the modal and display selected video and instructions
const openModal = (title, type, videoUrl, instructions) => {
    modalTitle.textContent = title;
    
    // If modalType element exists, display the type
    if (modalType) {
        modalType.textContent = `Type: ${type}`; // Display type of exercise
    }
    
    modalVideo.src = videoUrl;

    // Clear previous instructions
    modalInstructions.innerHTML = '';

    // Check if instructions are available
    if (instructions && Array.isArray(instructions)) {
        instructions.forEach((instruction) => {
            const listItem = document.createElement('li');
            listItem.textContent = instruction;
            modalInstructions.appendChild(listItem);
        });
    } else {
        const noInstructions = document.createElement('li');
        noInstructions.textContent = 'No instructions available';
        modalInstructions.appendChild(noInstructions);
    }

    modal.style.display = 'flex'; // Show the modal
};

// Close the modal
// closeModal.addEventListener('click', function(){
//     modal.style.display = 'none';
// })
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Close modal if user clicks anywhere outside the modal content
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Example usage for fetching and displaying exercise videos
const getExercises = async () => {
    const url = 'https://exercisedb.p.rapidapi.com/exercises';
    const exerciseData = await fetchData(url, exerciseOptions);

    // If the data is successfully fetched, display it on the page
    if (exerciseData) {
        displayExercisesWithVideos(exerciseData);
    }
};

// Call the function to fetch and display exercise videos
getExercises();




// =======================YOUTUBE VIDEO=========================

// An object containing YouTube video URLs for each exercise.
// Each exercise name is the key, and the corresponding YouTube video URL is the value.
const youtubeExerciseVideos = {
    'Push Up': "https://www.youtube.com/embed/1FjAoO5McVI",
    'Squat': 'https://www.youtube.com/embed/-gYNZsANX_8',
    'Pull Up': 'https://www.youtube.com/embed/dlEdmF8szqI',
    'yoga': 'https://www.youtube.com/embed/JqyHToMWl3E?si=RT37osUzY_9WAVNQ',
    'Jumping Jacks': 'https://www.youtube.com/embed/qhy7VjMqsck?si=xwixJLapUAM-_b3K',
    'Jump Rope': 'https://www.youtube.com/embed/MqUhcwDV_fc?si=dSuhQGJQhOvNZPgk'
};

// An array of exercise objects, each containing a name and a description.
// This is a sample list of exercises to be displayed on the page.
const filteredExercises = [
    { name: 'Push Up', description: 'Great for upper body strength, targeting the chest, shoulders, and triceps.' },
    { name: 'Squat', description: 'Excellent for building lower body strength, targeting the quadriceps, hamstrings, and glutes.' },
    { name: 'Pull Up', description: 'A basic pull-up exercise.' },
    { name: 'yoga', description: 'Incorporates poses like Downward Dog, Warrior, and Child’s Pose for flexibility and relaxation.' },
    { name: 'Jumping Jacks', description: 'Great for warming up and getting the heart rate up.' },
    { name: 'Jump Rope', description: 'Excellent for coordination and cardiovascular conditioning.' }
]; // Sample exercises

// Function to display each exercises with their YouTube videos.
// It takes an array of exercises (exercisesYoutubes) as a parameter.
const displayExercises = (exercisesYoutubes) => {
    // Select the container where exercises and YouTube videos will be displayed.
    const youtubeExercisesContainer = document.querySelector('.exercisesYoutube-container');
    
    // Clear the container and then map over each exercise to generate the HTML for each one.
    youtubeExercisesContainer.innerHTML = exercisesYoutubes
        .map(exercisesYoutube => {
            // Get the YouTube video URL for the exercise from the youtubeExerciseVideos object.
            const youtubeVideoUrl = youtubeExerciseVideos[exercisesYoutube.name] || '';
            
            // Return an HTML string that creates an article with the exercise's name, description, and YouTube video (if available).
            return `
            <article class="youtubeExercise">
              <h4>${exercisesYoutube.name}</h4>
              <p>${exercisesYoutube.description}</p>
              ${youtubeVideoUrl ? `<iframe width="100%" height="300" src="${youtubeVideoUrl}" rel=0&autoplay=0&loop=0&playlist=" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ''}
            </article>`;
        })
        
         //It combines (or "joins") all the exercises together so they show up on the screen as one big list.
        .join('');
};

// Search functionality for exercises.
// This adds an event listener to the search input field to filter exercises based on the user's input.
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup', () => {
    // Get the value entered by the user in the search input and convert it to lowercase.
    const inputValue = searchInput.value.toLowerCase();
    
    // Filter the exercises array to include only those exercises whose names contain the search input.
    const filtered = filteredExercises.filter(exercisesYoutube =>
        exercisesYoutube.name.toLowerCase().includes(inputValue)
    );
    
    // Display the filtered exercises on the page.
    displayExercises(filtered);
});

// Display all exercises initially when the page loads.
displayExercises(filteredExercises);
