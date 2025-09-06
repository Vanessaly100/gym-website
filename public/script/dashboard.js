

// ==============workout progress==================
// ===========================================================
// Fetch workouts from localStorage
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// DOM elements for displaying data
const totalWorkoutsElement = document.getElementById('total-workouts');
const totalCaloriesElement = document.getElementById('total-calories');

// ===================================================
const goalsListElement = document.getElementById('goals-list');
const exerciseSuggestionsElement = document.getElementById('exercise-suggestions');

// Define goals
const goals = [
  { name: 'Complete 20 workouts', target: 20, current: 0 },
  { name: 'Burn 2000 calories', target: 2000, current: 0 }
];

// Function to update goals
const updateGoals = () => {
  goals[0].current = workouts.length; // Update completed workouts
  goals[1].current = workouts.reduce((total, workout) => total + workout.calories, 0); // Update total calories burned
};

// Function to display the dashboard data
const displayDashboard = () => {
  // 1. Total workouts
  //This counts how many workouts you’ve done and displays that number on the page.
  const totalWorkouts = workouts.length;
  totalWorkoutsElement.innerHTML = totalWorkouts;

  // 2. Total calories burned
  const totalCalories = workouts.reduce((total, workout) => total + workout.calories, 0);
  totalCaloriesElement.innerHTML = totalCalories;

  // 3. Goals Achieved
  updateGoals(); // Update goal progress
  goalsListElement.innerHTML = ''; // Clear previous goals
  goals.forEach(goal => {
    const listItem = document.createElement('li');
    listItem.textContent = `${goal.name}: ${goal.current} / ${goal.target}`;
    goalsListElement.appendChild(listItem);
  });

  // 4. Fetch real exercise suggestions from Wger API
  fetch('https://wger.de/api/v2/exercise/?language=2&limit=5') // Fetch exercises in English
    .then(response => response.json())
    .then(data => {
      // Clear previous suggestions
      exerciseSuggestionsElement.innerHTML = '';

      // Extract exercise data and display it
      const exercises = data.results;
      exercises.forEach(exercise => {
        const listItem = document.createElement('li');
        listItem.textContent = exercise.name; // Use exercise name
        exerciseSuggestionsElement.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
      exerciseSuggestionsElement.innerHTML = '<li>Could not fetch exercise suggestions.</li>';
    });

  // 5. Display workout progress using Chart.js
  const progressData = workouts.map(workout => workout.calories); // Example data: calories burned per workout
  const workoutLabels = workouts.map((workout, index) => `Workout ${index + 1}`); // Labels for each workout

  const ctx = document.getElementById('progressChart').getContext('2d');
  const progressChart = new Chart(ctx, {
    type: 'bar', // You can also use 'line' or other chart types
    data: {
      labels: workoutLabels,
      datasets: [{
        label: 'Calories Burned',
        data: progressData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true // Y-axis starts at 0
        }
      }
    }
  });
};

// Call the function to display dashboard data
displayDashboard();




// ======================CALENDER===============================

//FULLCALENDER LIBRARY
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('workout-calendar');
    const workoutModal = document.getElementById('workout-modal');
    const workoutForm = document.getElementById('workout-form');
    const openModalButton = document.getElementById('open-modal');
    const scheduledWorkoutsEl = document.getElementById('scheduled-workouts');
    let selectedDate = null;

    //import from fullcalender library
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      editable: true,

      // Open the modal when a date is selected
      select: function(info) {
        selectedDate = info.startStr;
        workoutModal.style.display = 'block';
        calendar.unselect();
      },

      // Load saved workouts from localStorage
      //if saved any workouts from before. If we did, load them onto the calendar."
      events: JSON.parse(localStorage.getItem('scheduledWorkouts')) || []
    });

    // show the calender
    calendar.render();

    // Open modal on button click
    openModalButton.addEventListener('click', () => {
    workoutModal.style.display = 'block';
    });

    // Handle form submission
    workoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const workoutName = document.getElementById('workout-name').value;
      const calories = document.getElementById('calories-burned').value;
      const duration = document.getElementById('duration').value;

      //  Save the Workout
      if (selectedDate && workoutName && calories && duration) {
        const newWorkout = {
          title: workoutName,
          start: selectedDate,
          extendedProps: {
            calories: parseInt(calories),
            duration: parseInt(duration)
          }
        };

        // Add workout to calendar
        calendar.addEvent(newWorkout);

        // Save to localStorage
        const savedWorkouts = JSON.parse(localStorage.getItem('scheduledWorkouts')) || [];
        savedWorkouts.push(newWorkout);
        localStorage.setItem('scheduledWorkouts', JSON.stringify(savedWorkouts));

        // Display the workout below the calendar
        displayScheduledWorkouts();

        // Clear the form and hide the modal
        workoutForm.reset();
        workoutModal.style.display = 'none';
      }
    });

    // Function to display workouts below the calendar
    function displayScheduledWorkouts() {
      const savedWorkouts = JSON.parse(localStorage.getItem('scheduledWorkouts')) || [];
      scheduledWorkoutsEl.innerHTML = '';

      savedWorkouts.forEach((workout, index) => {
        const workoutDiv = document.createElement('div');
        workoutDiv.innerHTML = `
          <p><strong>${workout.title}</strong> - ${workout.extendedProps.calories} calories - ${workout.extendedProps.duration} minutes on ${workout.start}</p>
          <button  class= "deleteBtn" onclick="deleteWorkout(${index})">Delete</button>
        `;
        scheduledWorkoutsEl.appendChild(workoutDiv);
      });
    }

    // Delete workout function
    window.deleteWorkout = function(index) {
      let savedWorkouts = JSON.parse(localStorage.getItem('scheduledWorkouts')) || [];
      savedWorkouts.splice(index, 1);
      localStorage.setItem('scheduledWorkouts', JSON.stringify(savedWorkouts));
      displayScheduledWorkouts();
    };

    // Display the workouts when the page loads
    displayScheduledWorkouts();
  });









 