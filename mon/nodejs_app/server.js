const express = require('express');
const app - express();

const PORT = 3000;
const pasth_to_project = '/Users/mspriggs/Library/CloudStorage/OneDrive-Illumina,Inc./Documents/Applied_Bioinformatics/modules/data_integration_and_interaction_networks/mon/nodejs_app';
app.use(express.static(path_to_project));

app.listen(PORT, function() {
    console.log(`Server is running on http://localhost:${PORT}`);
});

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