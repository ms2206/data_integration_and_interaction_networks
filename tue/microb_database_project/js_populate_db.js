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
            known_author_ids[author_name] = info.lastInsertRowid;

        } else {
            console.log(`Safe mode: Would insert into authors (name) values (${author_name})`);}
        }
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



// Object.entries(known_organisms).forEach(([organism, isFungus]) => {

//     // create query template
//     const qry = 'insert into organisms (organisms_id, is_fungus) values (?, ?)';

//     // run the query
//     if (!safe_mode) {
//         db.prepare(qry).run(organism, isFungus);
//     } else {
//         console.log(`Safe mode: Would insert into organisms (organisms_id, is_fungus) values (${organism}, ${isFungus})`);
//     }
// });

// // loop over uniqueExperimentsOrganismMediumTemperature to update experiments table
// Object.entries(known_experiments).forEach(([experiment, {organism, medium, temperature}]) => {

//     // create query template
//     const qry = 'insert into experiments (experiment_id, organism_id, medium, temperature) values (?, ?, ?, ?)';

//     // run the query
//     if (!safe_mode) {
//         db.prepare(qry).run(experiment, organism, medium, temperature);
//     } else {
//         console.log(`Safe mode: Would insert into experiments (experiment_id, organism_id, medium, temperature) values (${experiment}, ${organism}, ${medium}, ${temperature})`);
//     }
// });
