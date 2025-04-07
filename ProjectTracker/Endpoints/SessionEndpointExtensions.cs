using ProjectTracker.Classes;

namespace ProjectTracker.Endpoints;

public static class SessionEndpointExtensions {

    public static WebApplication AddSessionEndpoints(this WebApplication app) {
        app.MapGet("/api/sessions", (int id, DBService service) => service.GetSessions(id));



        return app;
    }

}
