-- force primary key constraint
PRAGMa foreign_keys = true;

-- create students table
create table if not exists students (
    id text primary key,
    first_name text not null,
    last_name text not null
);

-- create marks table
create table if not exists marks (
    students_id text not null,
    module text not null,
    mark integer,
    primary key (students_id, module),
    foreign key (students_id) references students(id) on delete cascade
);



-- insert some data
-- insert into students values ('S430452', 'John', 'Doe');
-- insert into students values ('S430453', 'Jane', 'Doe');
-- insert into marks values ('S430452', 'Maths', 90);
-- insert into marks values ('S430452', 'English', 80);
-- insert into marks values ('S430453', 'Maths', 70);
-- insert into marks values ('S430453', 'English', 60);

SELECT
 students.first_name,
 students.last_name,
 marks.module,
 marks.mark

FROM marks
JOIN students
ON marks.students_id = students.id
WHERE marks.students_id = 'S430452';

update marks set mark = 100 where students_id = 'S430452' and module = 'Maths';


SELECT
 students.first_name,
 students.last_name,
 marks.module,
 marks.mark

FROM marks
JOIN students
ON marks.students_id = students.id
WHERE marks.students_id = 'S430452';