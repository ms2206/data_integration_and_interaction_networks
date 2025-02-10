// Import dependencies
const express = require('express');

// Initialize the app
const app = express();

// Define constants
const PORT = 3000;
const path_to_project = '/Users/mspriggs/Library/CloudStorage/OneDrive-Illumina,Inc./Documents/Applied_Bioinformatics/modules/data_integration_and_interaction_networks/mon/nodejs_app';

// Serve static files
app.use(express.static(path_to_project));

// Sample data
const messages = [
    {
        author: 'Matthew',
        messages: 'Hello'
    },
    {
        author: 'Jo',
        messages: 'Hi'
    }
];

// Define routes
app.get('/messages', function(req, res) {
    res.json(messages);
});

// Start the server
app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Add post request to server
app.post('/sendmessage', function(req, res) {
    messages.push(req.body);
    res.send(req.body); // echo the request
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

