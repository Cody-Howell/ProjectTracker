﻿using ProjectTracker;
using ProjectTracker.Classes;
using System.Drawing;

public static class ProjectEndpointExtensions { 
    public static WebApplication AddProjectEndpoints(this WebApplication app) {
        app.MapGet("/api/projects/names", (DBService service) => service.GetAllProjectNames());
        app.MapGet("/api/projects", (DBService service) => service.GetAllProjects());
        app.MapGet("/api/types", (DBService service) => service.GetAllTypes());
        app.MapGet("/api/project", (int id, DBService service) => service.GetProject(id));


        app.MapPost("/api/project", (Project project, DBService service) => {
            service.CreateProject(project);
            return Results.Created();
        });

        app.MapPost("/api/types", (ProjectType type, DBService service) => {
            service.CreateType(type);
            return Results.Created();
        });

        app.MapPatch("/api/types", (ProjectType type, DBService service) => {
            service.UpdateType(type);
            return Results.Ok();
        });

        app.MapPost("/api/types/delete", (ProjectType type, DBService service) => {
            service.DeleteType(type);
            return Results.Ok();
        });

        app.MapPatch("/api/projects", (Project project, DBService service) => {
            service.UpdateProjectStatus(project);
            return Results.Ok();
        });

        return app;
    }
}
