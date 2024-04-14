// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');
const path = require('path'); // ImportING the 'path' module

// Start up an instance of app
const app = express();


// check , why 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Serve the index.html file
/*
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname,'index.html');
    console.log('File path:', indexPath); // Log the file path to debug
    res.sendFile(indexPath);
}); */



// Set the root directory for static files
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Reference to app.js
app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Reference to CSS file
app.get('/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'css', 'style.css'));
});



















// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// GET Route to return projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});


// POST Route to add data to projectData
app.post('/add', (req, res) => {
    const newData = req.body;
    projectData = {
        ...projectData,
        ...newData
    };
    res.send(projectData);
});
