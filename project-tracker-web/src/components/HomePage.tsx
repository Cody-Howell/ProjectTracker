import React from 'react';
import { getAllProjects } from '../api';
import func from '../function.ts';
import { TimeAfter } from '../funcs/TimeAfter.ts';

export class HomePage extends React.Component<Record<string, never>, { projects: Array<Project> }> {
  state = {
    projects: []
  }

  async componentDidMount(): Promise<void> {
    this.setState({ projects: await getAllProjects() })
  }

  render() {
    return (
      <div className='displayPage'>
        <h1>Home Page</h1>
        <p>Welcome to the project tracker! This page will allow you to see and update all the current projects.
          Markdown will allow you to update doc files for each of your project, and create new ones. Settings allows
          you to customize the Types displayed in the database and what function you want to use to calculate score.
          Go to <a href='https://wiki.codyhowell.dev'>this page</a> to read more about this project.
        </p>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Tags</th>
              <th>Calculated Score</th>
              <th>Percent Complete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((v: Project, i) =>
              <tr>
                <td>{v.projectTitle}</td>
                <td>{v.projectStatus}</td>
                <td>{v.types.map((v2: ProjectType, i2) => 
                  <p key={i * 1000 + i2} style={{backgroundColor: `${v2.color}`, border: "1px solid white", borderRadius: "5px", padding: "5px", margin: "1px"}}>{v2.typeName}</p>
                  )}</td>
                <td>{func.returnValue(v.professionalScore, v.personalScore, v.developmentScore, v.difficultyScore, TimeAfter(new Date(v.startDate)), TimeAfter(new Date(v.expectedDate)))}</td>
                <td>{v.percentComplete}%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

