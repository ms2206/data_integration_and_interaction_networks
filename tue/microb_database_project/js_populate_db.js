// load dependencies
const better_sqlite3 = require('better-sqlite3');
const { load } = require('csv-load-sync');

// input CSV file
const input_csv = 'microbial_growth_data_2025.csv';

// open a database connection
const db = better_sqlite3('db.sqlite');

// load all rows 
const rows = load(input_csv);

// create sets
const uniqueOrganismsFungusType = {};
const uniqueExperimentsOrganismMediumTemperature = {};

// safe mode
const safe_mode = true;

// loop over each row to get unique keys
rows.forEach(row => {
    

    // add unique organism to object
    uniqueOrganismsFungusType[row['Organism']] = row['Is Fungus'];

    // add unique experiment, organism, medium, temperate to object
    uniqueExperimentsOrganismMediumTemperature[row['Experiment']] = {
        organism: row['Organism'],
        medium: row['Medium'],
        temperature: row['Temperature']
    };
} );


// loop over uniqueOrganismsFungusType to update organisms table
Object.entries(uniqueOrganismsFungusType).forEach(([organism, isFungus]) => {

    // create query template
    const qry = 'insert into organisms (organisms_id, is_fungus) values (?, ?)';

    // run the query
    if (!safe_mode) {
        db.prepare(qry).run(organism, isFungus);
    } else {
        console.log(`Safe mode: Would insert into organisms (organisms_id, is_fungus) values (${organism}, ${isFungus})`);
    }
});

// loop over uniqueExperimentsOrganismMediumTemperature to update experiments table
Object.entries(uniqueExperimentsOrganismMediumTemperature).forEach(([experiment, {organism, medium, temperature}]) => {

    // create query template
    const qry = 'insert into experiments (experiment_id, organism_id, medium, temperature) values (?, ?, ?, ?)';

    // run the query
    if (!safe_mode) {
        db.prepare(qry).run(experiment, organism, medium, temperature);
    } else {
        console.log(`Safe mode: Would insert into experiments (experiment_id, organism_id, medium, temperature) values (${experiment}, ${organism}, ${medium}, ${temperature})`);
    }
});
