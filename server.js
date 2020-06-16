// Variables
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require('cors');
app.use(Cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=> console.log(`Running on localhost: ${port}`));

// Post request to fetch weather data and client feelings
app.post('/weather', (req, res) => {
    projectData = req.body;
    console.log(req.body);
});

// Get request to send weather data and feelings to UI
app.get('/UIData', (req, res) => {
    return projectData;
});
