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

console.log(known_authors);

// loop over file again and insert into database
rows.forEach(row => {

    // add author to database
    // create query template
    const author_qry = 'insert into authors (name) values (?)';

    if (!known_authors.has(row['Authors'].split(',').map((x) => x.trim()))) {
        // run the query
        if (!safe_mode) {
            console.log(`Author ${row['Authors']} does not exist`);
            //db.prepare(author_qry).run(row['Authors']);
        } 
    } else {
        console.log(`Author ${row['Authors']} already exists`);}
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
