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
const uniqueExperimentsOrganismMediaTemperature = {};

// safe mode
const safe_mode = true;

// loop over each row to get unique keys
rows.forEach(row => {
    console.log(typeof(row))

    // add unique organism to object
    // uniqueOrganismsFungusType.set(row['Organism'], row['Is Fungus']);
    uniqueOrganismsFungusType[row['Organism']] = row['Is Fungus'];


    // add unique experiment, organism, media, temperate to map
    // uniqueExperimentsOrganismMediaTemperature.set(row['Experiment'], row['Organism'], row['Medium'], row['Temperature']);

} );

console.log(uniqueOrganismsFungusType);
// loop over uniqueOrganismsFungusType to update organisms table
uniqueOrganismsFungusType.forEach((isFungus, organism) => {

    const qry = 'insert into organisms (organisms_id, is_fungus) values (?, ?)';
    
    if (!safe_mode) {
        db.prepare(qry).run(organism, isFungus);
    } else {
        console.log(`Safe mode: Would insert into organisms (organisms_id, is_fungus) values (${organism}, ${isFungus})`);
    }
});

// loop over uniqueExperimentsOrganismMediaTemperature to update experiments table


// close the database connection
db.close();




    // // create query template
    // const qry= 'insert into organisms (organisms_id, is_fungus) values (?, ?)';

    // // run the query
    // log = `db.prepare(qry).run(${row['Organism']}, ${row['Is Fungus']};`
    // console.log(log);

    // // db.prepare(experiments_qry).run(row['Experiment'], row['Is Organism'], row['Medium'], row['Temperature']);