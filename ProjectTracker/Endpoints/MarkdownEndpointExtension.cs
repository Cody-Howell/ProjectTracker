﻿using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Classes;
using System.Data;

public static class MarkdownEndpointExtension {
    public static WebApplication AddMarkdownEndpoints(this WebApplication app) {
        string folderPath = app.Configuration["folderPath"] ?? throw new Exception("Please specify the folder path.");

        app.MapGet("/api/documents", (string project = "") => {
            string[] files = Directory.GetFiles(folderPath);
            IEnumerable<string> output = files.Select(a => Path.GetFileName(a));
            if (project != "") {
                output = output.Where(a => a.Contains(project.Replace(' ', '-')));
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

        app.MapPost("/api/doc/new", (string filename, string project) => {
            string finalName = filename.Replace(' ', '-') + "_" + project.Replace(' ', '-') + ".md";

            // Create file here, then close the stream
            File.Create(Path.Combine(folderPath, finalName.Trim())).Close();
            return Results.Ok(finalName);
        });

        app.MapPost("api/doc", (MarkdownDocument doc) => {
            File.WriteAllText(Path.Combine(folderPath, doc.Filename), doc.MDText);
            return Results.Ok();
        });

        return app;
    }
}
