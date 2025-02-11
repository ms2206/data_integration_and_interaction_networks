-- test to populate some rows

------------------------
/* POPULATE ORGANISMS */
------------------------

-- truncate organisms
delete from organisms;

-- insert some organisms
insert into organisms (organisms_id, is_fungus) values ('Pseudomonas sp.', 0);

-- select from organisms
select * from organisms;

----------------------------
/* POPULATION EXPERIMENTS */
----------------------------

-- truncate experiments
delete from experiments;

-- insert some experiments
insert into experiments (experiments_id, organism_id, medium, temperature) values ('1', 'Pseudomonas sp.', 'CFC', 25);

-- select from experiments
select * from experiments;

-- select from experiments join organisms
select * from experiments join organisms on experiments.organism_id = organisms.organisms_id;

---------------------------
/* POPULATE DATAPOINTS */
---------------------------

-- truncate datapoints
delete from datapoints;

-- insert some datapoints
insert into datapoints (experiment_id, time, cfu) values ('1', 0, 0.0);

-- select from datapoints
select * from datapoints;

-- select from datapoints join experiments
select * from datapoints join experiments on datapoints.experiment_id = experiments.experiments_id;

-----------------------
/* POPULATE AUTHORS */
-----------------------

-- truncate authors
delete from authors;

-- insert some authors
insert into authors (name) values ('John Doe');

-- select from authors
select * from authors;

---------------------------
/* POPULATE AUTHORSHIP */
---------------------------

-- truncate authorship
delete from experiments_authors;

-- insert some authorship
insert into experiments_authors (author_id, experiment_id) values (1, 1);

-- select from authorship
select * from experiments_authors;

-- select from authorship join authors
select * from experiments_authors join authors on experiments_authors.author_id = authors.id;