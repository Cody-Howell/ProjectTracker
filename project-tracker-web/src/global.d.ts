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

