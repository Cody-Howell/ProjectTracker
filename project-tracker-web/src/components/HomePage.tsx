import React, { ChangeEvent } from 'react';
import { addTypeToProject, createProject, getAllProjects, getAllTypes, removeTypeFromProject, updateProject } from '../api';
import func from '../function.ts';
import { TimeAfter } from '../funcs/TimeAfter.ts';
import { GetInputString } from '../funcs/GetInputString.tsx';

export class HomePage extends React.Component<Record<string, never>, { projects: Array<Project>, newProjectTitle: string, tags: Array<ProjectType> }> {
  state = {
    projects: [],
    newProjectTitle: "",
    tags: []
  }

  async componentDidMount(): Promise<void> {
    this.setState({ projects: await getAllProjects(), tags: await getAllTypes() })
  }

  updateProjectTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newProjectTitle: e.target.value });
  }

  createProject = async (): Promise<void> => {
    await createProject(this.state.newProjectTitle);

    window.location.reload();
  }

  updateProject = async (project: Project): Promise<void> => {
    await updateProject(project);
  }

  //#region Update Project Specifics
  updateProjectText = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: StringKeys<Project>
  ): Promise<void> => {
    const value = e.target.value;

    const updatedProjects: Array<Project> = this.state.projects;
    const projectToUpdate: Project = updatedProjects[index];
    projectToUpdate[field] = value;
    updatedProjects[index] = projectToUpdate;
    this.setState({ projects: updatedProjects });

    await this.updateProject(projectToUpdate);
  };

  updateProjectNumber = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: NumberKeys<Project>
  ): Promise<void> => {
    const value = Number(e.target.value);

    const updatedProjects: Array<Project> = this.state.projects;
    const projectToUpdate: Project = updatedProjects[index];
    projectToUpdate[field] = value;
    updatedProjects[index] = projectToUpdate;
    this.setState({ projects: updatedProjects });

    await this.updateProject(projectToUpdate);
  };


  updateProjectDate = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: DateKeys<Project>
  ): Promise<void> => {
    const value = new Date(e.target.value);

    const updatedProjects: Array<Project> = this.state.projects;
    const projectToUpdate: Project = updatedProjects[index];
    projectToUpdate[field] = value;
    updatedProjects[index] = projectToUpdate;
    await this.updateProject(projectToUpdate);
    // stupid trickery
    value.setDate(value.getDate() + 1);
    projectToUpdate[field] = value;
    updatedProjects[index] = projectToUpdate;

    this.setState({ projects: updatedProjects });
  };
  //#endregion

  addProjectType = async (e: ChangeEvent<HTMLSelectElement>, projectId: number): Promise<void> => {
    const typeId = Number(e.target.value);

    await addTypeToProject(projectId, typeId);

    const updatedProjects: Array<Project> = this.state.projects;
    const types: Array<ProjectType> = this.state.tags;
    const projectIndex: number = updatedProjects.findIndex(a => a.id === projectId);
    const newType: ProjectType | undefined = types.find(a => a.id === typeId);

    if (projectIndex < 0) throw new Error("Project should never be undefined");
    if (newType === undefined) throw new Error("Type should never be undefined");

    updatedProjects[projectIndex].types.push(newType);
    this.setState({ projects: updatedProjects });
  }

  removeProjectType = async (projId: number, typeId: number): Promise<void> => {
    await removeTypeFromProject(projId, typeId);


    const updatedProjects: Array<Project> = this.state.projects;
    const types: Array<ProjectType> = this.state.tags;
    const projectIndex: number = updatedProjects.findIndex(a => a.id === projId);
    const newType: number = types.findIndex(a => a.id === typeId);

    if (projectIndex < 0) throw new Error("Project should never be undefined");
    if (newType < 0) throw new Error("Type should never be undefined");

    updatedProjects[projectIndex].types.splice(newType, 1);
    this.setState({ projects: updatedProjects });

  }

  render() {
    return (
      <div className='displayPage'>
        <h1>Home Page</h1>
        <p>Welcome to the project tracker! This page will allow you to see and update all the current projects.
          Markdown will allow you to update doc files for each of your project, and create new ones. Settings allows
          you to customize the Types displayed in the database and what function you want to use to calculate score.
          Go to <a href='https://wiki.codyhowell.dev'>this page (add more here)</a> to read more about this project.
        </p>

        <input type='text' value={this.state.newProjectTitle} onChange={this.updateProjectTitle} placeholder='Create Project' />
        <button onDoubleClick={this.createProject}>Create (double-click)</button>
        <br/>
        <br/>
        <p>Current count: {this.state.projects.length}</p>

        <hr />
        <div id='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Personal</th>
                <th>Professional</th>
                <th>Development</th>
                <th>Difficulty</th>
                <th>Calculated Score</th>
                <th>Hours Expected</th>
                <th>Percent Complete</th>
                <th>Start Date</th>
                <th>Expected Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((v: Project, i) =>
                <tr key={i}>
                  <td>{v.projectTitle}</td>
                  <td>
                    <select value={v.projectStatus} onChange={(e) => this.updateProjectText(e, i, "projectStatus")}>
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Finished">Finished</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <select value={undefined} onChange={(e) => this.addProjectType(e, v.id)}>
                      <option value={undefined}></option>
                      {this.state.tags.map((v: ProjectType) =>
                        <option value={v.id}>{v.typeName}</option>
                      )}
                    </select>
                    {v.types.map((v2: ProjectType, i2) =>
                      <p key={i * 1000 + i2} style={{ backgroundColor: `${v2.color}`, border: "1px solid white", borderRadius: "5px", padding: "5px", margin: "1px" }}>{v2.typeName}
                        <button onDoubleClick={() => this.removeProjectType(v.id, v2.id)}>X</button></p>
                    )}</td>
                  <td><input type='number' className='scoreValues' value={v.personalScore} onChange={(e) => this.updateProjectNumber(e, i, "personalScore")} /></td>
                  <td><input type='number' className='scoreValues' value={v.professionalScore} onChange={(e) => this.updateProjectNumber(e, i, "professionalScore")} /></td>
                  <td><input type='number' className='scoreValues' value={v.developmentScore} onChange={(e) => this.updateProjectNumber(e, i, "developmentScore")} /></td>
                  <td><input type='number' className='scoreValues' value={v.difficultyScore} onChange={(e) => this.updateProjectNumber(e, i, "difficultyScore")} /></td>
                  <td>{func.returnValue(v.professionalScore, v.personalScore, v.developmentScore, v.difficultyScore, TimeAfter(new Date(v.startDate)), TimeAfter(new Date(v.expectedDate)))}</td>
                  <td><input type='number' className='scoreValues' value={v.hoursExpected} onChange={(e) => this.updateProjectNumber(e, i, "hoursExpected")} /></td>
                  <td><input type='number' className='scoreValues' value={v.percentComplete} onChange={(e) => this.updateProjectNumber(e, i, "percentComplete")} />%</td>
                  <td><input type='date' value={GetInputString(new Date(v.startDate))} onChange={(e) => this.updateProjectDate(e, i, "startDate")} /></td>
                  <td><input type='date' value={GetInputString(new Date(v.expectedDate))} onChange={(e) => this.updateProjectDate(e, i, "expectedDate")} /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

