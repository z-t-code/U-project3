// Event listener for the button click
document.getElementById('generate').addEventListener('click', performAction);

// Function to execute when the button is clicked
function performAction() {
    // Get the values of zip code
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // add code to func
    fetchWeatherData(zipCode)
        .then(weatherData => {
            // Create an objec
            const data = {
                temperature: weatherData.main.temp, // Extract temperature from weather data
                date: new Date().toLocaleString(), // Get current date and time
                userResponse: feelings 
            };

            // Call the postData function to send data to the server
            postData('/add', data)
                .then(updateUI); // Call the updateUI function after posting data
        })
        .catch(error => console.log('Error:', error)); 
}

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData(zipCode) {
    const apiKey = '2424b4cbe56a1e6d7aedc3089ac165bb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    
    console.log('API URL:', apiUrl); 
    const response = await fetch(apiUrl); // Fetch weather data from the API
    console.log('Response:', response); 
    const data = await response.json(); // Parse the JSON response
    console.log('Weather Data:', data); 
    return data; 
}

// Function to post data to the server
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // HTTP POST method
        credentials: 'same-origin', // check ?
        headers: {
            'Content-Type': 'application/json' // Specify JSON content type
        },
        body: JSON.stringify(data) // Convert data to JSON format
    });
    return await response.json(); // Return the JSON response
}

// Function to update the UI with the fetched data
async function updateUI() {
    const request = await fetch('/all'); // Fetch all data from the server
    const allData = await request.json(); // Parse the JSON response
    // Update the HTML elements with the fetched data
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°C`;
    document.getElementById('content').innerHTML = `User response: ${allData.userResponse}`;
}
