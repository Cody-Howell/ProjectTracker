using ProjectTracker;
using ProjectTracker.Classes;
using ProjectTracker.Services;

public static class TypeEndpointExtensions { 
    public static WebApplication AddTypeEndpoints(this WebApplication app) {
        app.MapGet("/api/types", (DBService service) => service.GetAllTypes());

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

        return app;
    }
}
