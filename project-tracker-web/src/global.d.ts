type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type DateKeys<T> = {
  [K in keyof T]: T[K] extends Date ? K : never;
}[keyof T];

type Project = {
  id: number;
  projectTitle: string;
  projectStatus: string;
  percentComplete: number;
  professionalScore: number;
  personalScore: number;
  developmentScore: number;
  difficultyScore: number;
  hoursExpected: number;
  startDate: Date;
  expectedDate: Date;
  types: Array<ProjectType>;
};

type ProjectType = {
  id: number;
  typeName: string;
  color: sring;
};

type Session = {
  id: number;
  projectId: number;
  dateTracked: Date;
  planningSeconds: number;
  implementingSeconds: number;
  debuggingSeconds: number;
  testingSeconds: number;
  documentationSeconds: number;
  additionalNotes: string;
};

type MarkdownDocument = {
  filename: string;
  MDText: string;
};

type CurrentTimer = "" | "plan" | "impl" | "debug" | "test" | "docs";
