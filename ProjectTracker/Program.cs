using ProjectTracker;
using ProjectTracker.Classes;
using ProjectTracker.Endpoints;
using ProjectTracker.Services;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration["DOTNET_DATABASE_STRING"] ?? throw new InvalidOperationException("Connection string for database not found.");
Console.WriteLine("Connection String: " + connString);
var dbConnector = new DatabaseConnector(connString);
builder.Services.AddSingleton<IDbConnection>(provider => {
    return dbConnector.ConnectWithRetry();
});

builder.Services.AddSingleton<DBService>();
builder.Services.AddSingleton<MarkdownService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapGet("/api/health", () => "Hello");

app.AddMarkdownEndpoints()
    .AddProjectEndpoints()
    .AddTypeEndpoints()
    .AddSessionEndpoints();

app.MapFallbackToFile("index.html");

app.Run();
