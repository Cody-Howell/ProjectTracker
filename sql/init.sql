create table projects (
  id int generated always as identity not null, 
  projectTitle varchar(80) not null, 
  projectStatus varchar(20) not null, 
  scoreProfessional int not null, 
  scorePersonal int not null, 
  scoreDevelopment int not null, 
  scoreDifficulty int not null, 
  hoursExpected int not null, 
  expectedDate timestamp not null
);

create table type (
  id int generated always as identity not null, 
  typeName varchar(80) not null, 
  color varchar(6) not null
)

create table project_type (
  id int generated always as identity not null, 
  projectId references projects (id) not null, 
  typeId references types (id) not null
);

create table sessions (
  id int generated always as identity not null, 
  projectId references projects (id) not null, 
  dateTracked timestamp not null, 
  planningSeconds int not null, 
  implementingSeconds int not null, 
  debuggingSeconds int not null, 
  testingSeconds int not null
  additionalNotes varchar(300) null
);


