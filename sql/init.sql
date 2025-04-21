create table projects (
  id int generated always as identity unique not null, 
  projectTitle varchar(80) not null, 
  projectStatus varchar(20) not null, 
  percentComplete int not null, 
  professionalScore int not null, 
  personalScore int not null, 
  developmentScore int not null, 
  difficultyScore int not null, 
  hoursExpected int not null, 
	startdate date not null,
	expecteddate date not null
);

create table types (
  id int generated always as identity unique not null, 
  typeName varchar(80) not null, 
  color varchar(7) not null
);

create table project_type (
  id int generated always as identity unique not null, 
  projectId int references projects (id) not null, 
  typeId int references types (id) not null
);

create table sessions (
  id int generated always as identity unique not null, 
  projectId int references projects (id) not null, 
  dateTracked timestamp not null, 
  planningSeconds int not null, 
  implementingSeconds int not null, 
  debuggingSeconds int not null, 
  testingSeconds int not null,
  documentationSeconds int not null,
  additionalNotes varchar(300) null
);

insert into projects 
	(projecttitle, projectstatus, professionalScore, personalScore, developmentScore, difficultyScore, hoursexpected, expecteddate, startDate, percentComplete) values 
	('Local Circuit Builder', 'In Progress', 67, 30, 40, 14, 20, '2025-04-10', '2025-03-20', 15);
