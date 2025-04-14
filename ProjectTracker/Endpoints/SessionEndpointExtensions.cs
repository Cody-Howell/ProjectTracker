using ProjectTracker.Classes;

namespace ProjectTracker.Endpoints;

public static class SessionEndpointExtensions {

    public static WebApplication AddSessionEndpoints(this WebApplication app) {
        app.MapGet("/api/sessions", (int id, DBService service) => service.GetSessions(id));
        app.MapPost("/api/sessions", (Session s, DBService service) => service.AddSession(s));
        app.MapDelete("/api/sessions", (int id, DBService service) => service.DeleteSession(id));

        return app;
    }

}
