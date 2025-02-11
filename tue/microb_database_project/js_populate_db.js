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
const uniqueOrganismsFungusType = new Map();
const uniqueExperiments = new Set();



// loop over each row
rows.forEach(row => {

    // add unique organism to set
    uniqueOrganismsFungusType.set(row['Organism'], row['Is Fungus']);

} );

// loop over uniqueOrganismsFungusType to update organisms table
uniqueOrganismsFungusType.forEach((isFungus, organism) => {
    // console.log(organism, isFungus);
    const qry = 'insert into organisms (organisms_id, is_fungus) values (?, ?)';
    
    // console.log(qry);
    db.prepare(qry).run(organism, isFungus);
});

// close the database connection
db.close();




    // // create query template
    // const qry= 'insert into organisms (organisms_id, is_fungus) values (?, ?)';

    // // run the query
    // log = `db.prepare(qry).run(${row['Organism']}, ${row['Is Fungus']};`
    // console.log(log);

    // // db.prepare(experiments_qry).run(row['Experiment'], row['Is Organism'], row['Medium'], row['Temperature']);