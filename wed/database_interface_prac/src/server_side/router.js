const express = require('express');

const micobe_router = express.Router();
micobe_router.use(function(req, res, next) {
    console.log('Recieved at Time:', Date.now());
    next();
});

micobe_router.get('/greeting/:name/:lastname?', function(req, res) {
    if (req.params.lastname) {
        res.send(`Hello, ${req.params.name} ${req.params.lastname}`);
    } else {
        res.send(`Hello, ${req.params.name}`);
    }
});



module.exports = micobe_router;
