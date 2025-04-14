type Project = {
  id: number, 
  projectTitle: string, 
  projectStatus: string, 
  percentComplete: number,
  professionalScore: number, 
  personalScore: number, 
  developmentScore: number, 
  difficultyScore: number, 
  hoursExpected: number, 
  startDate: Date,
  expectedDate: Date, 
  types: Array<ProjectType>
}

type ProjectType = {
  id: number, 
  typeName: string, 
  color: sring
}

type Session = {
  id: number,
  projectId: number, 
  dateTracked: Date, 
  planningSeconds: number, 
  implementingSeconds: number, 
  debuggingSeconds: number, 
  testingSeconds: number, 
  documentationSeconds: number, 
  additionalNotes: string
}

type MarkdownDocument = {
    filename: string,
    MDText: string
}

type CurrentTimer = "" | "plan" | "impl" | "debug" | "test" | "docs";