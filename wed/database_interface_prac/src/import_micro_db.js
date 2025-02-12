const fs = require('fs');
const better_sqlite3 = require('better-sqlite3');
const {load} = require('csv-load-sync');

// SQLite3 database filename
const input_db_file = './microdb.sqlite';

// SQL schema creation script
const schema_script_file = './micro_db_schema.sql';

// Input CSV file
const input_csv_file = './data/microbial_growth_data.csv';

// Key-value pair of saved authors-ids to avoid inserting the same author twice
const known_author_ids = {};
// Set of saved organisms to avoid inserting the same organism twice
const known_organisms = new Set();
// Set of saved experiements to avoid inserting the same experiment twice
const known_experiments = new Set();

function import_row(db, row) {
    // Split authors by comma and trim whitespace
    const author_names = row['Authors'].split(',').map((x) => x.trim());
    insert_authors(db, author_names);
    insert_organism(db, row['Organism'], row['Is Fungus']);
    insert_experiment(
        db,
        row['Experiment'],
        author_names,
        row['Organism'],
        row['Medium'],
        row['Temperature']
    );
    insert_datapoint(db, row['Experiment'], row['Time'], row['CFU']);
}

function insert_authors(db, author_names) {
    author_names.forEach((author_name) => {
        // Skip known authors
        if (author_name in known_author_ids) return;
        // Insert author name and retrieve assigned ID
        const query = 'INSERT INTO authors (name) VALUES (?)';
        const info = db.prepare(query).run(author_name);
        // Save ID of inserted author
        known_author_ids[author_name] = info.lastInsertRowid;
    });
}

function insert_organism(db, organism, is_fungus) {
    // Skip known organisms
    if (known_organisms.has(organism)) return;
    // Insert organism
    const query = 'INSERT INTO organisms (organism, is_fungus) VALUES (?, ?)';
    db.prepare(query).run(organism, is_fungus);
    known_organisms.add(organism);
}

function insert_experiment(db, exp_id, author_names, organism, medium, temp) {
    // Skip known experiments
    if (known_experiments.has(exp_id)) return;
    // Insert experiment
    const query = 'INSERT INTO experiments (experiment_id, organism, medium, temperature) VALUES (?, ?, ?, ?)';
    db.prepare(query).run(exp_id, organism, medium, temp);
    known_experiments.add(exp_id);
    // Inserting authorship information for each author
    author_names.forEach((author_name) => {
        const query = 'INSERT INTO experiments_authors (experiment_id, author_id) VALUES (?, ?)';
        const author_id = known_author_ids[author_name];
        db.prepare(query).run(exp_id, author_id);
    });
}

function insert_datapoint(db, exp_id, time, cfu) {
    const query = 'INSERT INTO datapoints (experiment_id, time, cfu) VALUES (?, ?, ?)';
    db.prepare(query).run(exp_id, time, cfu);
}

// Open database
const db = better_sqlite3(input_db_file);

// (re-)Create schema
const schema_script = fs.readFileSync(schema_script_file, 'utf-8');
db.exec(schema_script);

// Load all rows (synchronously)
const rows = load(input_csv_file);
rows.forEach((row) => {
    import_row(db, row);
});

// Close database
db.close();
