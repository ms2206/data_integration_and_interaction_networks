const express = require('express');
const sqlite3 = require('sqlite3');
const rscript = require('r-script');

const db = new sqlite3.Database('/Users/mspriggs/Library/CloudStorage/OneDrive-Illumina,Inc./Documents/Applied_Bioinformatics/modules/data_integration_and_interaction_networks/wed/database_interface_prac/src/microdb.sqlite');

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

// make endpoint for getting all experiment ids
micobe_router.get('/experiment-ids', function(req, res) {
    const query = 'SELECT experiment_id FROM experiments';
    db.all(query, [], function(err, rows) {
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

// make endpoint for getting all datapoints per experiment
micobe_router.get('/datapoints/:experiment_id', function(req, res) {
    const query = 'SELECT * FROM datapoints WHERE experiment_id = ?';
    db.all(query, [req.params.experiment_id], function(err, rows) {
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


// endpoint  reporting growth rate for a specific experiment
micobe_router.get('/fit/growth/:experiment_id', function(req, res) {
    const query = 'SELECT time, cfu FROM datapoints '
        + 'WHERE experiment_id = ? '
        + 'ORDER BY time';
        
        const parameters = [req.params.experiment_id];

        db.all(query, parameters, function(err, rows) 
        {
            if (err) {
                console.log(err);
                throw err;
            }
            const r_input = {
                times: [],
                cfus: []
            };

            for(let i = 0; i < rows.length; i++) {
                r_input.times.push(rows[i].time);
                r_input.cfus.push(rows[i].cfu);
            };

            rscript('../client_side/fit_model.R').data(r_input)
            .call(function(err, growth_coef) {
                if (err) {
                    console.log(err.toString());
                    
                    throw err;
                }

                const output = {
                    experiment_id: req.params.experiment_id,
                    growth_coefficient: growth_coef
                };

                res.json(output);
                              
            });
        });
});


module.exports = micobe_router;
