PRAGMA foreign_keys = true;

/* Dropping in reverse order of creating. */
DROP TABLE IF EXISTS experiments_authors;
DROP TABLE IF EXISTS datapoints;
DROP TABLE IF EXISTS experiments;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS organisms;

CREATE TABLE IF NOT EXISTS organisms (
  organism TEXT NOT NULL,
  is_fungus BOOLEAN NOT NULL,
  PRIMARY KEY (organism)
);

CREATE TABLE IF NOT EXISTS authors (
  author_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (author_id)
);

CREATE TABLE IF NOT EXISTS experiments (
  experiment_id TEXT NOT NULL,
  organism TEXT NOT NULL,
  medium TEXT NOT NULL,
  temperature REAL NOT NULL,
  PRIMARY KEY (experiment_id),
  FOREIGN KEY (organism)
    REFERENCES organisms (organism)
);

CREATE TABLE IF NOT EXISTS datapoints (
  datapoint_id INTEGER NOT NULL,
  experiment_id TEXT NOT NULL DEFAULT '',
  time REAL NOT NULL,
  cfu REAL NOT NULL,
  PRIMARY KEY (datapoint_id),
  FOREIGN KEY (experiment_id)
    REFERENCES experiments (experiment_id)
);

CREATE TABLE IF NOT EXISTS experiments_authors (
  author_id INTEGER NOT NULL,
  experiment_id TEXT NOT NULL,
  PRIMARY KEY (author_id, experiment_id),
  FOREIGN KEY (author_id)
    REFERENCES authors (author_id),
  FOREIGN KEY (experiment_id)
    REFERENCES experiments (experiment_id)
);
