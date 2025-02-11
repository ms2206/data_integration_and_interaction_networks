const express = require('express');
const app = express();
const port = 3000;

const path_to_project = "./app";

app.use(express.static(path_to_project));

app.listen(port, function () {
    console.log(`Application deployed on port ${port}`);
});
