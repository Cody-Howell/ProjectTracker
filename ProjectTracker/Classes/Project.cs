namespace ProjectTracker.Classes;

public class Project {
    public int Id { get; set; }
    public string ProjectTitle { get; set; } = "";
    public string ProjectStatus { get; set; } = "";
    public int PercentComplete { get; set; }
    public int ProfessionalScore { get; set; }
    public int PersonalScore { get; set; }
    public int DevelopmentScore { get; set; }
    public int DifficultyScore { get; set; }
    public int HoursExpected { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ExpectedDate { get; set; }
    public List<ProjectType> Types { get; set; } = new();
}
