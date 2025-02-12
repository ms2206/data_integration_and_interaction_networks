const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../microdb.sqlite');


const micobe_router = express.Router();

micobe_router.use(function(req, res, next) {
    console.log('Recieved at Time:', Date.now());
    next();
});

// make endpoint for getting all authors
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

// make endpoint for getting all experiments
micobe_router.get('/experiments', function(req, res) {
    const query = 'SELECT * FROM experiments';
    db.all(query, [], function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(rows);
    });
});

// make endpoint for getting experiments per experiment
micobe_router.get('/experiments/:experiment_id', function(req, res) {
    const query = 'SELECT * FROM experiments WHERE experiment_id = ?';
    db.all(query, [req.params.experiment_id], function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(rows);
    });
});

// make endpoint for getting all datapoints
micobe_router.get('/datapoints', function(req, res) {
    const query = 'SELECT * FROM datapoints';
    db.all(query, [], function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(rows);
    });
});

// make endpoint for organisms
micobe_router.get('/organisms', function(req, res) {
    const query = 'SELECT * FROM organisms';
    db.all(query, [], function(err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(rows);
    });
});




module.exports = micobe_router;
