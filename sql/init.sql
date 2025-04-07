create table projects (
  id int generated always as identity unique not null, 
  projectTitle varchar(80) not null, 
  projectStatus varchar(20) not null, 
  percentComplete int not null, 
  scoreProfessional int not null, 
  scorePersonal int not null, 
  scoreDevelopment int not null, 
  scoreDifficulty int not null, 
  hoursExpected int not null, 
  startDate timestamp not null,
  expectedDate timestamp not null
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
  additionalNotes varchar(300) null
);

insert into projects 
	(projecttitle, projectstatus, scoreprofessional, scorepersonal, scoredevelopment, scoredifficulty, hoursexpected, expecteddate, startDate, percentComplete) values 
	('Lorem Project', 'Planning', 67, 30, 40, 14, 20, '2025-04-01 15:00:00', '2025-03-01 15:00:00', 0);
insert into projects 
	(projecttitle, projectstatus, scoreprofessional, scorepersonal, scoredevelopment, scoredifficulty, hoursexpected, expecteddate, startDate, percentComplete) values 
	('Project 2', 'In Progress', 67, 30, 40, 14, 20, '2025-04-01 15:00:00', '2025-03-01 15:00:00', 15);
insert into types (typeName, color) values ('Lorem', '#fe0000');
insert into project_type (projectId, typeId) values (1, 1);
insert into sessions 
  (projectId, dateTracked, planningSeconds, implementingSeconds, debuggingSeconds, testingSeconds, additionalNotes) values 
  (1, '2025-04-05 15:00:00', 1600, 300, 10, 1, null);
insert into sessions 
  (projectId, dateTracked, planningSeconds, implementingSeconds, debuggingSeconds, testingSeconds, additionalNotes) values 
  (2, '2025-04-05 15:00:00', 1600, 3040, 274, 1098, 'null');
