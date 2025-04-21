using ProjectTracker;
using ProjectTracker.Classes;
using ProjectTracker.Services;

public static class ProjectEndpointExtensions { 
    public static WebApplication AddProjectEndpoints(this WebApplication app) {
        app.MapGet("/api/projects/names", (DBService service) => service.GetAllProjectNames());
        app.MapGet("/api/projects", (DBService service) => service.GetAllProjects());
        app.MapGet("/api/project", (int id, DBService service) => service.GetProject(id));


        app.MapPost("/api/project", (string project, DBService service, MarkdownService mdService) => {
            service.CreateProject(project);
            mdService.CreateNewDocument(project, "Default");
            return Results.Created();
        });

        app.MapPatch("/api/project", (Project project, DBService service) => {
            service.UpdateProject(project);
            return Results.Ok();
        });

        app.MapPost("/api/project/type", (int pId, int tId, DBService service) => {
            service.AddTypeToProject(pId, tId);
            return Results.Ok();
        });


        app.MapDelete("/api/project/type", (int pId, int tId, DBService service) => {
            service.RemoveTypeFromProject(pId, tId);
            return Results.Ok();
        });

        return app;
    }
}
