

// ================================================================
// Array to store workouts in localStorage
//parse convert a string into an object for us to be able to save in local storage
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

// Form and workout list DOM elements
const logWorkoutForm = document.getElementById('log-workout-form');
const workoutList = document.getElementById('workout-list');

// Delete a workout
const deleteWorkout = (index) => {
  workouts.splice(index, 1);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  displayWorkouts();
};

// Function to display saved workouts
const displayWorkouts = () => {
  workoutList.innerHTML = ''; // Clear existing list
  workouts.forEach((workout, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${workout.name} - ${workout.calories} calories - ${workout.duration} minutes
    `;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteWorkout(index));
    listItem.appendChild(deleteButton);
    workoutList.appendChild(listItem);
  });
};

// Save new workout
logWorkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const workoutName = document.getElementById('workout-name').value;
  const caloriesBurned = document.getElementById('calories-burned').value;
  const duration = document.getElementById('duration').value;

  const newWorkout = {
    name: workoutName,
    calories: parseInt(caloriesBurned),//parseInt is a function that converts text to a number
    duration: parseInt(duration),
  };

  // Add workout to array and localStorage
  workouts.push(newWorkout);
  localStorage.setItem('workouts', JSON.stringify(workouts));

  // Clear form
  logWorkoutForm.reset();

  // Display updated workout list
  displayWorkouts();
});

// Display workouts when the page loads
displayWorkouts();




// =========================BMI FORM==============================



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const weightError = document.getElementById('weightError');
    const heightError = document.getElementById('heightError');
    const clearDataBtn = document.getElementById('clearData');
    
    let bmiChart;

    // Load chart on page load
    updateChart();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const weight = parseFloat(weightInput.value);//parseFloat() helps convert them to numbers, even if you typed them in as text.
        const heightInFeet = parseFloat(heightInput.value); // Input as feet

        // Convert height from feet to meters
        const height = heightInFeet * 0.3048; // Now in meters

        // Validation
        let valid = true;
        if (isNaN(weight) || weight <= 0) {
            weightError.textContent = "Please enter a valid weight.";
            weightError.style.display = 'block';
            valid = false;
        } else {
            weightError.style.display = 'none';
        }

        if (isNaN(heightInFeet) || heightInFeet <= 0) {
            heightError.textContent = "Please enter a valid height in feet.";
            heightError.style.display = 'block';
            valid = false;
        } else {
            heightError.style.display = 'none';
        }

        if (!valid) return;

        // BMI Calculation
        const bmi = (weight / (height * height)).toFixed(2);  // Using height in meters now
        let status = '';
        if (bmi < 18.5) {
            status = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            status = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            status = 'Overweight';
        } else {
            status = 'Obesity';
        }

        // Display BMI result
        bmiResult.innerHTML = `Your BMI is: ${bmi}<br>Status: ${status}`;

        // Save to local storage
        saveBMIData(bmi);

        // Clear input fields
        weightInput.value = '';
        heightInput.value = '';

        // Update the chart
        updateChart();
    });

    // Save BMI data to local storage
    function saveBMIData(bmi) {
        //Grabs all the old BMI data from localStorage (if it exists).
        let bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];
        let currentDate = new Date().toLocaleDateString();

        // Adds the new BMI result, along with the current date.
        bmiData.push({ date: currentDate, bmi: parseFloat(bmi) });
        localStorage.setItem('bmiData', JSON.stringify(bmiData));
    }

    // Update Chart.js with BMI data
    function updateChart() {
        let bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];
        let dates = bmiData.map(entry => entry.date);
        let bmis = bmiData.map(entry => entry.bmi);

        //from chart js
        let ctx = document.getElementById('bmiChart').getContext('2d');
        if (bmiChart) {
            bmiChart.destroy(); // Clear previous chart
        }

        bmiChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Underweight', 'Normal weight', 'Overweight', 'Obesity'],
                datasets: [{
                    label: 'BMI Progress',
                   data: bmis.length > 0 ? bmis : [0, 0, 0, 0],  // Handle empty data scenario
                backgroundColor: function(context) {
                    // Default background color if value is 0
                    let value = context.dataset.data[context.dataIndex];
                    return value === 0 
                        ? 'rgba(200, 200, 200, 0.3)'   // Default color for no value
                        : context.dataset.colors[context.dataIndex];
                },
                borderColor: [
                    'rgba(255, 99, 132, 1)',     // Border color for Red
                    'rgba(54, 162, 235, 1)',     // Border color for Blue
                    'rgba(255, 206, 86, 1)',     // Border color for Yellow
                    'rgba(75, 192, 192, 1)'      // Border color for Green
                ],
                borderWidth: 2, // Thickness of the borders
                hoverOffset: 4,
                colors: [
                    'rgb(255, 99, 132)',  // Red
                    'rgb(54, 162, 235)',  // Blue
                    'rgb(255, 205, 86)',  // Yellow
                    'rgba(255, 159, 64, 0.2)'  // Orange
                ],
            borderWidth: 2 ,// Thickness of the borders
                    hoverOffset: 4
                }]
            },
            options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
        }
    },
    
     options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white',  // Change legend label color to blue
                }
            }
        },
        },
    });
    }

    // Clear all data from local storage and update chart
    clearDataBtn.addEventListener('click', function () {
        localStorage.removeItem('bmiData');
        updateChart();
        bmiResult.innerHTML = '';
    });
});





