const express = require('express');

const app = express();
const port = 3000;
app.listen(port, function() {
    console.log(`Server is running on http://localhost:${port}`);
    });

const router = require('./router');

app.use('/api', router);
