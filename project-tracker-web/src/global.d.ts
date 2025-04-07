type Project = {
  id: number, 
  projectTitle: string, 
  projectStatus: string, 
  scoreProfessional: number, 
  scorePersonal: number, 
  scoreDevelopment: number, 
  scoreDifficulty: number, 
  hoursExpected: number, 
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
  additionalNotes: number
}
