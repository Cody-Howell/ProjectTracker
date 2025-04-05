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

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();


app.MapGet("/", () => "Hello world.");

app.Run();

