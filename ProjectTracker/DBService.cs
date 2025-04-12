using ProjectTracker.Classes;
using System.Data;
using Dapper;

namespace ProjectTracker;

public class DBService(IDbConnection conn) {
    #region Projects
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

    public IEnumerable<IdAndTitleDTO> GetAllProjectNames() {
        string getProjectNames = """"
            select id, projectTitle from projects
            """";
        return conn.Query<IdAndTitleDTO>(getProjectNames);
    }

    public IEnumerable<Project> GetAllProjects() {
        string getProjects = """"
            select * from projects
            """";
        IEnumerable<Project> projects = conn.Query<Project>(getProjects);
        foreach (Project p in projects) {
            string types = """"
            select t.id, typename, color from types t 
            inner join project_type pt on (pt.typeid = t.id)
            where pt.projectid = @id
            """";
            p.Types = conn.Query<ProjectType>(types, new { id = p.Id }).ToList();
        }
        return projects;
    }

    public Project GetProject(int id) {
        string getProject = """"
            select * from projects where id = @id
            """";
        Project p = conn.QuerySingle<Project>(getProject, new { id });

        string types = """"
            select t.id, typename, color from types t 
            inner join project_type pt on (pt.typeid = t.id)
            where pt.projectid = @id
            """";
        p.Types = conn.Query<ProjectType>(types, new { id = p.Id }).ToList();
        return p;
    }

    public void UpdateProjectStatus(Project project) {
        string update = """"
            update projects p set projectstatus = @ProjectStatus, 
                percentcomplete = @PercentComplete 
                where p.id = @Id
            """";
        conn.Execute(update, new { project.Id, project.ProjectStatus, project.PercentComplete });
    }

    public int GetTotalSeconds(int projectId) {
        string allSeconds = """"
            select SUM(planningseconds) + SUM(implementingseconds) + SUM(debuggingseconds) + SUM(testingseconds)
            from sessions
            where projectid = @projectId
            group by projectid;
            """";
        return conn.QuerySingle<int>(allSeconds, new { projectId });
    }
    #endregion

    #region Types
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
    #endregion

    #region Sessions
    public IEnumerable<Session> GetSessions(int id) {
        string getSessions = """"
            select id, projectId, dateTracked, planningSeconds, implementingseconds, 
                debuggingseconds, testingseconds, documentationseconds, additionalnotes  
                from sessions s where projectId = @id
                order by 3 desc
            """";
        return conn.Query<Session>(getSessions, new { id });
    }

    public void AddSession(Session s) {
        string addSession = """"
            insert into sessions (projectId, dateTracked, planningSeconds, implementingseconds, 
                debuggingseconds, testingseconds, documentationseconds, additionalnotes)
                values
                (@projectId, @dateTracked, @planningSeconds, @implementingseconds, 
                @debuggingseconds, @testingseconds, @documentationseconds, @additionalnotes)
            """";
        conn.Execute(addSession, s);
    }
    #endregion
}
