using ProjectTracker.Classes;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration["DOTNET_DATABASE_STRING"] ?? throw new InvalidOperationException("Connection string for database not found.");
Console.WriteLine("Connection String: " + connString);
var dbConnector = new DatabaseConnector(connString);
builder.Services.AddSingleton<IDbConnection>(provider =>
{
    return dbConnector.ConnectWithRetry();
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();


string folderPath = "/data";
app.MapGet("/api/documents", () =>
{
    string[] files = Directory.GetFiles(folderPath);
    IEnumerable<string> output = files.Select(a => Path.GetFileName(a));
    return output;
});

app.MapGet("/api/doc", (string filename) =>
{
    string fullPath = Path.Combine(folderPath, filename);

    if (!File.Exists(fullPath)) {
        return Results.NotFound("File not found.");
    }

    string content = File.ReadAllText(fullPath);
    return Results.Content(content, "text/plain");
});


app.MapFallbackToFile("index.html");

app.Run();

