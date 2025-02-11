-- force primary key constraint
PRAGMA foreign_keys = true;

-- Create table for organisms
CREATE TABLE IF NOT EXISTS organisms (
    organisms_id text check(organisms_id IN ('Pseudomonas sp.', 'Lactic acid bacteria', 'Brochothrix thermosphacta', 'Enterobacteriaceae', 'Yeasts-moulds', 'Staphylococcus aureus')) primary key,
    is_fungus boolean not null
);

-- Create table for experiments
CREATE TABLE IF NOT EXISTS experiments (
    experiments_id text PRIMARY KEY,
    organism_id text check(organism_id IN ('Pseudomonas sp.', 'Lactic acid bacteria', 'Brochothrix thermosphacta', 'Enterobacteriaceae', 'Yeasts-moulds', 'Staphylococcus aureus')),
    medium text check(medium IN ('CFC', 'MRS', 'STAA', 'VRBD', 'YGC', 'TSA', 'BPA')) not null,
    temperature integer not null,
    foreign key (organism_id) references organisms(organisms_id)
);

-- Create table for datapoints
CREATE TABLE IF NOT EXISTS datapoints (
    experiment_id text not null,
    time integer not null,
    cfu float not null,
    primary key (experiment_id, time),
    foreign key (experiment_id) references experiments(experiments_id)
);

-- Create table for authors
CREATE TABLE IF NOT EXISTS authors (
    id integer primary key AUTOINCREMENT,
    name text not null
);

-- Create table for authorship
CREATE TABLE IF NOT EXISTS experiments_authors (
    author_id integer not null,
    experiment_id text not null,
    primary key (author_id, experiment_id),
    foreign key (author_id) references authors(id),
    foreign key (experiment_id) references experiments(experiments_id)
);

