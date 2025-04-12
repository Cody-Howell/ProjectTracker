namespace ProjectTracker.Classes;

public class Session {
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public DateTime DateTracked { get; set; }
    public int PlanningSeconds { get; set; }
    public int ImplementingSeconds { get; set; }
    public int DebuggingSeconds { get; set; }
    public int TestingSeconds { get; set; }
    public int DocumentationSeconds { get; set; }
    public string AdditionalNotes { get; set; } = "";
}
