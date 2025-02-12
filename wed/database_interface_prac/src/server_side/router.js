const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../microdb.sqlite');


const micobe_router = express.Router();
micobe_router.use(function(req, res, next) {
    console.log('Recieved at Time:', Date.now());
    next();
});

micobe_router.get('/authors', function(req, res) {
    const query = 'SELECT * FROM authors';
    db.all(query, [], function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(rows);
    });
});



module.exports = micobe_router;
