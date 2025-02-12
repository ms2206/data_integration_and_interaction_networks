// load dependencies
const better_sqlite3 = require('better-sqlite3');
const { load } = require('csv-load-sync');

// safe mode
const safe_mode = false;

// input CSV file
const input_csv = 'microbial_growth_data_2025.csv';

// open a database connection
const db = better_sqlite3('db.sqlite');

// load all rows 
const rows = load(input_csv);

// create sets
const known_organisms = new Set();
const known_experiments = new Set();
const known_authors = new Set();
const known_author_ids = {};


// loop over each row to get unique keys
rows.forEach(row => {
    

    // add unique organism to object
    known_organisms.add(row['Organism']);

    // add unique experiment to object
    known_experiments.add(row['Experiment']);

    // add unique author to object
    const author_names = row['Authors'].split(',').map((x) => x.trim());

    author_names.forEach(author_name => {
            known_authors.add(author_name);
        });
} );



// loop over known_authors and insert into database
known_authors.forEach(author_name => {

    // check if author is already in the database
    const author_check_qry = 'select count(*) as count from authors where name = ?';
    const author_check = db.prepare(author_check_qry).get(author_name);
    // if author is already in the database, skip
    if (author_check['count'] > 0) {
    }
    else {
        // add author to authors table
        // create query template
        const author_qry = 'insert into authors (name) values (?)';

        // run the query
        if (!safe_mode) {
            const info = db.prepare(author_qry).run(author_name);
            //known_author_ids[author_name] = info.lastInsertRowid;

        } else {
            console.log(`Safe mode: Would insert into authors (name) values (${author_name})`);}
        }
});

// populate known_author_ids
// get the author names and ids from database
const author_name_id_qry = 'select * from authors'
const author_name_id = db.prepare(author_name_id_qry).all();

// append to known_author_ids
author_name_id.forEach(author => {
    known_author_ids[author['name']] = author['id'];
});


// loop over csv file and insert organism into database
rows.forEach(row => {
    // check if organism is already in the database
    const organisms_check_qry = 'select count(*) as count from organisms where organisms_id = ?';
    const organisms_check = db.prepare(organisms_check_qry).get(row['Organism']);

    // if author is already in the database, skip
    if (organisms_check['count'] > 0) {
    }
    else {
        // insert organism into database
        // create query template
        const organism_qry = 'insert into organisms (organisms_id, is_fungus) values (?, ?)';
        // run the query
        if (!safe_mode) {
            db.prepare(organism_qry).run(row['Organism'], row['Is Fungus']);
        } else {
            console.log(`Safe mode: Would insert into organisms (organisms_id, is_fungus) values (${row['Organism']}, ${row['IsFungus']})`);
        }
    }

});

// loop over csv file and insert experiment (and experiment_authors) into database
rows.forEach(row => {
    // check if experiment is already in the database
    const experiment_check_qry = 'select count(*) as count from experiments where experiment_id = ?';
    const experiment_check = db.prepare(experiment_check_qry).get(row['Experiment']);

    // if experiment is already in the database, skip
    if (experiment_check['count'] > 0) {
    }
    else {
        // insert experiment into database
        // create query template
        const experiment_qry = 'insert into experiments (experiment_id, organism_id, medium, temperature) values (?, ?, ?, ?)';
        // run the query
        if (!safe_mode) {
            // update experiments table
            db.prepare(experiment_qry).run(row['Experiment'], row['Organism'], row['Medium'], row['Temperature']);
            
            // experiment_id author_id map
            const authors = row['Authors'].split(',').map((x) => x.trim());

            for (const a of authors) {
                // update experiment_id_author_id_map with 

                // use a to get autor id from database
                const author_id_retreive_qry = 'select id from authors where name = ?';
                const author_id = db.prepare(author_id_retreive_qry).get(a);
                
                // make object linking author_id to experiment_id
                const experiment_id_author_id_map = {author_id: author_id.id, author_name: a, experiment: row['Experiment']};
                
                
                // update experiments_authors table
                // check if experiment_id
                const experiment_author_qry = 'insert into experiments_authors (experiment_id, author_id) values (?, ?)';
                db.prepare(experiment_author_qry).run(experiment_id_author_id_map.experiment, experiment_id_author_id_map.author_id);



            }
            // const experiment_id_author_id_map = {[row['Authors']]: known_author_ids[row['Authors']]};
            // console.log(experiment_id_author_id_map)

        } else {
            console.log(`Safe mode: Would insert into experiments (experiment_id, organism_id, medium, temperature) values (${row['Experiment']}, ${row['Organism']}, ${row['Medium']}, ${row['Temperature']})`);
        }
    }
});

// insert datapoints into database
rows.forEach(row => {
    // create query template
    const data_qry = 'insert into datapoints (experiment_id, time, cfu) values (?, ?, ?)';
    // run the query
    if (!safe_mode) {
        // console.log(row['Experiment'], row['Time'], row['CFU']);
        db.prepare(data_qry).run(row['Experiment'], row['Time'], row['CFU']);
    } else {
        console.log(`Safe mode: Would insert into data (experiment_id, time, cfu) values (${row['Experiment']}, ${row['Time']}, ${row['CFU']})`);
    }
});
