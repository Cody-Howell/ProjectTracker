import React, { ChangeEvent } from 'react';
import { deleteSession, getAllProjectNames, getSessions, submitSession } from '../api';

type SessionPageState = {
  projects: Array<{ id: number, projectTitle: string }>,
  sessions: Array<Session>
  projectId: number,
  planningSeconds: number,
  implementingSeconds: number,
  debuggingSeconds: number,
  testingSeconds: number,
  documentationSeconds: number,
  additionalNotes: string,
  currentTimer: CurrentTimer,
  timeStarted: Date | null
}

export class SessionPage extends React.Component<Record<string, never>, SessionPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      projects: [],
      sessions: [],
      projectId: 0,
      planningSeconds: 0,
      implementingSeconds: 0,
      debuggingSeconds: 0,
      testingSeconds: 0,
      documentationSeconds: 0,
      additionalNotes: "",
      currentTimer: "",
      timeStarted: null
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ projects: await getAllProjectNames() });
  }

  updateProjectSelector = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const projId = Number(e.target.value);
    const sessions = await getSessions(projId);
    this.setState({ projectId: projId, sessions: sessions });
  }



  clearNumbers = (): void => {
    this.setState({
      planningSeconds: 0,
      implementingSeconds: 0,
      debuggingSeconds: 0,
      testingSeconds: 0,
      documentationSeconds: 0
    })
  }

  startNewSection = (type: CurrentTimer): void => {
    if (this.state.timeStarted === null) { this.setState({ timeStarted: new Date(), currentTimer: type }); return; };

    const currentSeconds = Math.round((new Date().getTime() - this.state.timeStarted.getTime()) / 1000);
    this.updateSeconds(this.state.currentTimer, currentSeconds);

    // If the same, stop the timer.  
    if (type === this.state.currentTimer) {
      this.setState({ timeStarted: null, currentTimer: "" });
    } else {
      this.setState({ timeStarted: new Date(), currentTimer: type });
    }
  }

  updateSeconds = (type: CurrentTimer, seconds: number): void => {
    switch (type) {
      case "plan": this.setState({ planningSeconds: Math.round(this.state.planningSeconds + seconds) }); break;
      case "impl": this.setState({ implementingSeconds: Math.round(this.state.implementingSeconds + seconds) }); break;
      case "test": this.setState({ testingSeconds: Math.round(this.state.testingSeconds + seconds) }); break;
      case "debug": this.setState({ debuggingSeconds: Math.round(this.state.debuggingSeconds + seconds) }); break;
      case "docs": this.setState({ documentationSeconds: Math.round(this.state.documentationSeconds + seconds) }); break;
      default: throw new Error("Unexpected type in UpdateSeconds");
    }
  }

  updateNotes = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({additionalNotes: e.target.value});
  }

  submitSession = async (): Promise<void> => {
    const newSession: Session = {
      id: 0, 
      projectId: this.state.projectId, 
      dateTracked: new Date(), 
      planningSeconds: this.state.planningSeconds, 
      implementingSeconds: this.state.implementingSeconds, 
      debuggingSeconds: this.state.debuggingSeconds, 
      testingSeconds: this.state.testingSeconds, 
      documentationSeconds: this.state.documentationSeconds, 
      additionalNotes: this.state.additionalNotes
    }
    await submitSession(newSession);

    window.location.reload();
  }

  deleteSession = async (s: Session): Promise<void> => {
    await deleteSession(s);

    window.location.reload();
  }

  render() {
    let totalMinutes = 0;
    let planningMinutes = 0;
    let implMinutes = 0;
    let debugMinutes = 0;
    let testMinutes = 0;
    let docMinutes = 0;
    if (this.state.projectId > 0) {
      this.state.sessions.forEach((item: Session) => {
        totalMinutes += (item.planningSeconds + item.implementingSeconds + item.debuggingSeconds + item.testingSeconds);
        planningMinutes += item.planningSeconds;
        implMinutes += item.implementingSeconds;
        debugMinutes += item.debuggingSeconds;
        testMinutes += item.testingSeconds;
        docMinutes += item.documentationSeconds;
      });
      totalMinutes = Math.round(totalMinutes / 60);
      planningMinutes = Math.round(planningMinutes / 60);
      implMinutes = Math.round(implMinutes / 60);
      debugMinutes = Math.round(debugMinutes / 60);
      testMinutes = Math.round(testMinutes / 60);
      docMinutes = Math.round(docMinutes / 60);
    }
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
            <button onDoubleClick={this.clearNumbers}>Clear Numbers (double-click)</button> <br /> <br />
            <p style={{ 
              backgroundColor: this.state.currentTimer === "plan" ? "#004a00" : "#242424", 
              display: "inline", border: "1px solid white", borderRadius: "5px", padding: "5px", 
              userSelect: "none", cursor: "pointer" }}
              onDoubleClick={() => this.startNewSection("plan")}>Planning: {this.state.planningSeconds}</p>
            <p style={{ 
              backgroundColor: this.state.currentTimer === "impl" ? "#004a00" : "#242424", 
              display: "inline", border: "1px solid white", borderRadius: "5px", padding: "5px", 
              userSelect: "none", cursor: "pointer" }}
              onDoubleClick={() => this.startNewSection("impl")}>Implementing: {this.state.implementingSeconds}</p>
            <p style={{ 
              backgroundColor: this.state.currentTimer === "test" ? "#004a00" : "#242424", 
              display: "inline", border: "1px solid white", borderRadius: "5px", padding: "5px", 
              userSelect: "none", cursor: "pointer" }}
              onDoubleClick={() => this.startNewSection("test")}>Testing: {this.state.testingSeconds}</p>
            <p style={{ 
              backgroundColor: this.state.currentTimer === "debug" ? "#004a00" : "#242424", 
              display: "inline", border: "1px solid white", borderRadius: "5px", padding: "5px", 
              userSelect: "none", cursor: "pointer" }}
              onDoubleClick={() => this.startNewSection("debug")}>Debugging: {this.state.debuggingSeconds}</p>
            <p style={{ 
              backgroundColor: this.state.currentTimer === "docs" ? "#004a00" : "#242424", 
              display: "inline", border: "1px solid white", borderRadius: "5px", padding: "5px", 
              userSelect: "none", cursor: "pointer" }}
              onDoubleClick={() => this.startNewSection("docs")}>Documentation: {this.state.documentationSeconds}</p>

            <br /> <br />
            <textarea value={this.state.additionalNotes} onChange={this.updateNotes} style={{width: "50%"}}
              placeholder='Insert additional notes here'/>

            <br/>
            <button onDoubleClick={this.submitSession}>Submit (double-click)</button>

            <h2>Current Stats</h2>
            <p>Number of sessions: {this.state.sessions.length}</p>
            <p>Total time spent (in minutes): {totalMinutes}</p>
            <ul>
              <li>Planning minutes: {planningMinutes}</li>
              <li>Implementing minutes: {implMinutes}</li>
              <li>Debugging minutes: {debugMinutes}</li>
              <li>Testing minutes: {testMinutes}</li>
              <li>Documentation minutes: {docMinutes}</li>
            </ul>

            <h2>Previous Sessions</h2>
            {this.state.sessions.map((v: Session) =>
              <div key={v.id + "session"} className='sessionDisplay'>
                <p>Total Time (mins): {Math.round((v.planningSeconds + v.implementingSeconds + v.debuggingSeconds + v.testingSeconds) / 60)}</p>
                <p>Date Tracked: {new Date(v.dateTracked + "Z").toLocaleString()}</p>
                <p>Planning: {v.planningSeconds}</p>
                <p>Implementing: {v.implementingSeconds}</p>
                <p>Debugging: {v.debuggingSeconds}</p>
                <p>Testing: {v.testingSeconds}</p>
                <p style={{ gridColumn: "span 2" }}>Notes: {v.additionalNotes}</p>
                <button 
                  style={{gridColumn: "span 2", backgroundColor: "red"}}
                  onDoubleClick={() => this.deleteSession(v)}>Delete (double-click)</button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
