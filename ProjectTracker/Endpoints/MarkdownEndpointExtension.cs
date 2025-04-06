using ProjectTracker.Classes;
using System.Data;

public static class MarkdownEndpointExtension {
    public static WebApplication AddMarkdownEndpoints(this WebApplication app) {
        string folderPath = "/data";

        app.MapGet("/api/documents", (string projectName = "") => {
            string[] files = Directory.GetFiles(folderPath);
            IEnumerable<string> output = files.Select(a => Path.GetFileName(a));
            if (projectName != "") {
                output = output.Where(a => a.Contains(projectName));
            }
            return output;
        });

        app.MapGet("/api/doc", (string filename) => {
            string fullPath = Path.Combine(folderPath, filename);

            if (!File.Exists(fullPath)) {
                return Results.NotFound("File not found.");
            }

            string content = File.ReadAllText(fullPath);
            return Results.Content(content, "text/plain");
        });

        app.MapPost("api/doc", (MarkdownDocument doc) => {
            File.WriteAllText(Path.Combine(folderPath, doc.Filename), doc.MDText);
            return Results.Created();
        });

        return app;
    }
}
