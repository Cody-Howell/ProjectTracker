import React, { ChangeEvent } from 'react';
import { getAllProjects, getSessions } from '../api';

type SessionPageState = {
  projects: Array<{ id: number, projectTitle: string }>,
  sessions: Array<Session>
  projectId: number,
  planningSeconds: number,
  implementingSeconds: number,
  debuggingSeconds: number,
  testingSeconds: number,
  additionalNotes: string,
}

export class SessionPage extends React.Component<Record<string, never>, SessionPageState> {
  state = {
    projects: [],
    sessions: [],
    projectId: 0,
    planningSeconds: 0,
    implementingSeconds: 0,
    debuggingSeconds: 0,
    testingSeconds: 0,
    additionalNotes: ""
  }

  async componentDidMount(): Promise<void> {
    this.setState({ projects: await getAllProjects() });
  }

  updateProjectSelector = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const projId = Number(e.target.value);
    const sessions = await getSessions(projId);
    this.setState({ projectId: projId, sessions: sessions });
  }

  render() {
    return (
      <div className='displayPage'>
        <h1>Sessions</h1>
        <p>Select what project you're going to add your session to, and once selected, you can
          scroll to the bottom and review all the sessions you've done so far on this project.
        </p>
        <select value={this.state.projectId} onChange={this.updateProjectSelector}>
          <option value={undefined}></option>
          {this.state.projects.map((v: { id: number, projectTitle: string }, i) => <option key={i} value={v.id}>{v.projectTitle}</option>)}
        </select>
        {this.state.projectId > 0 && (
          <>
            <h1>Sessions</h1>
            <p>inside here</p>

            <h2>Previous Sessions</h2>
            {this.state.sessions.map((v: Session, i) =>
              <div key={i + "session"} style={
                {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", 
                  border: "1px solid white", 
                  borderRadius: "10px",
                  maxWidth: "600px", 
                  gap: "5px", 
                  paddingLeft: "5px"
                }
              }>
                <p>Total Time (mins): {Math.round((v.planningSeconds + v.implementingSeconds + v.debuggingSeconds + v.testingSeconds) / 60)}</p>
                <p>Date Tracked: {new Date(v.dateTracked).toLocaleString()}</p>
                <p>Planning: {v.planningSeconds}</p>
                <p>Implementing: {v.implementingSeconds}</p>
                <p>Debugging: {v.debuggingSeconds}</p>
                <p>Testing: {v.testingSeconds}</p>
                <p style={{gridColumn: "span 2"}}>Notes: {v.additionalNotes}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
