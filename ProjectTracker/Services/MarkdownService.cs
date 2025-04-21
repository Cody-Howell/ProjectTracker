using ProjectTracker.Classes;

namespace ProjectTracker.Services;

public class MarkdownService {
    private readonly string _folderPath;

    public MarkdownService(IConfiguration config) {
        _folderPath = config["folderPath"] ?? throw new Exception("Please specify the folder path.");
    }

    public IEnumerable<string> GetDocuments(string project = "") {
        string[] files = Directory.GetFiles(_folderPath);
        IEnumerable<string> output = files.Select(a => Path.GetFileName(a));
        if (!string.IsNullOrEmpty(project)) {
            output = output.Where(a => a.StartsWith(project.Replace(' ', '-')));
        }
        return output;
    }

    public string GetDocumentContent(string filename) {
        string fullPath = Path.Combine(_folderPath, filename);

        if (!File.Exists(fullPath)) {
            throw new FileNotFoundException("File not found.");
        }

        return File.ReadAllText(fullPath);
    }

    public string CreateNewDocument(string project, string filename) {
        string finalName = project.Replace(' ', '-') + "_" + filename.Replace(' ', '-') + ".md";
        File.Create(Path.Combine(_folderPath, finalName.Trim())).Close();
        return finalName;
    }

    public void SaveDocument(MarkdownDocument doc) {
        File.WriteAllText(Path.Combine(_folderPath, doc.Filename), doc.MDText);
    }
}