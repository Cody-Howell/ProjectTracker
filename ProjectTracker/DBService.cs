using ProjectTracker.Classes;
using System.Data;
using Dapper;

namespace ProjectTracker;

public class DBService(IDbConnection conn) {
    public void CreateProject(Project project) {
        string projectAddition = """"
            insert into projects 
            (projecttitle, projectstatus, scoreprofessional, scorepersonal, scoredevelopment, scoredifficulty, hoursexpected, expecteddate, startdate) 
            values (@projecttitle, @projectstatus, @scoreprofessional, @scorepersonal, @scoredevelopment, @scoredifficulty, @hoursexpected, @expecteddate, @startdate)
            returning id
            """";
        // Added to the query above to return the id of the inserted project
        int newId = conn.QuerySingle<int>(projectAddition, new {
            projecttitle = project.ProjectTitle,
            projectstatus = project.ProjectStatus,
            scoreprofessional = project.ProfessionalScore,
            scorepersonal = project.PersonalScore,
            scoredevelopment = project.DevelopmentScore,
            scoredifficulty = project.DifficultyScore,
            hoursexpected = project.HoursExpected,
            expecteddate = project.ExpectedDate,
            startdate = project.StartDate
        });
        foreach (int id in project.Types.Select(a => a.Id)) {
            string taskAddition = """"
                insert into project_type (projectId, typeId) values (@newId, @typeId)
                """";
            conn.Execute(taskAddition, new { newId, typeId = id });
        }
    }

    public IEnumerable<string> GetAllProjectNames() {
        string getProjectNames = """"
            select projectTitle from projects
            """";
        return conn.Query<string>(getProjectNames);
    }

    public Project GetProject(string projectTitle) {
        string getProject = """"
            select * from projects where projecttitle = @projectTitle
            """";
        Project p = conn.QuerySingle<Project>(getProject, new { projectTitle });

        string types = """"
            select t.id, typename, color from types t 
            inner join project_type pt on (pt.typeid = t.id)
            where pt.projectid = @id
            """";
        p.Types = conn.Query<ProjectType>(types, new { id = p.Id }).ToList();
        return p;
    }

    public void CreateType(ProjectType type) {
        string createType = """"
            insert into types (typeName, color) values (@typeName, @color)
            """";
        conn.Execute(createType, type);
    }

    public IEnumerable<ProjectType> GetAllTypes() {
        string getTypes = """"
            select id, typename, color from types
            """";
        return conn.Query<ProjectType>(getTypes);
    }

    public void UpdateType(ProjectType type) {
        string updateType = """"
            update types t 
            set typename = @typename, 
            color = @color
            where id = @id
            """";
        conn.Execute(updateType, type);
    }

    public void DeleteType(ProjectType type) {
        string deleteType = """"
            delete from types where id = @id
            """";
        conn.Execute(deleteType, type);
    }
}
