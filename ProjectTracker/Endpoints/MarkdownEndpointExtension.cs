using ProjectTracker.Classes;
using ProjectTracker.Services;

public static class MarkdownEndpointExtension {
    public static WebApplication AddMarkdownEndpoints(this WebApplication app) {
        app.MapGet("/api/documents", (MarkdownService mdService, string project = "") => {
            return mdService.GetDocuments(project);
        });

        app.MapGet("/api/doc", (string filename, MarkdownService mdService) => {
            try {
                string content = mdService.GetDocumentContent(filename);
                return Results.Content(content, "text/plain");
            } catch (FileNotFoundException) {
                return Results.NotFound("File not found.");
            }
        });

        app.MapPost("/api/doc/new", (string project, string filename, MarkdownService mdService) => {
            string finalName = mdService.CreateNewDocument(project, filename);
            return Results.Ok(finalName);
        });

        app.MapPost("/api/doc", (MarkdownDocument doc, MarkdownService mdService) => {
            mdService.SaveDocument(doc);
            return Results.Ok();
        });

        return app;
    }
}
