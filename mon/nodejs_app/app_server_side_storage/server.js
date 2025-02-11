const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const path_to_project = "./app";

const messages = [
    {
        author: 'Tom',
        message: 'This is the first message in our app!'
    },
    {
        author: 'Tom',
        message: 'This is another message!'
    }
];

app.use(express.static(path_to_project));

app.get('/messages', function (request, response) {
    response.json(messages);
});

app.post('/sendmessage', function (request, response) {
    messages.push(request.body);
    response.send(request.body); // echo the request
});

app.listen(port, function () {
    console.log(`Application deployed on port ${port}`);
});
