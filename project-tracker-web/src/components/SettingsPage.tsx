import React, { ChangeEvent } from 'react';
import func from '../function.ts';
import { addType, deleteType, getAllTypes, updateType } from '../api.ts';

export class SettingsPage extends React.Component<Record<string, never>, { function: Array<number>, saved: boolean }> {
  state = {
    function: func.scoreFunction,
    saved: false,
  }


  updateFunction = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const values = this.state.function;
    values[index] = Number(e.target.value);
    this.setState({ function: values });
  }

  updateDisplayFunction = () => {
    func.updateFunction(this.state.function);
    this.setState({ saved: true });
    setTimeout(() => {
      this.setState({ saved: false });
    }, 3000);
  }

  render() {
    const functionNumbers: Array<Array<number>> = [
      [100, 100, 100, 100, 0, 0],
      [100, 100, 100, 0, 0, 0],
      [50, 50, 50, 50, 0, 0],
      [64, 98, 92, 28, 22, 1],
      [75, 55, 78, 31, 2, 1],
      [80, 74, 81, 32, 14, 4],
      [92, 76, 64, 44, 46, 6],
      [75, 62, 92, 17, 16, 8],
      [53, 82, 79, 22, 50, 30]
    ];
    const functionDisplay: React.ReactNode[] = functionNumbers.map((v, index) => {
      return (<tr key={index}>
        <td>{v[0]}</td>
        <td>{v[1]}</td>
        <td>{v[2]}</td>
        <td>{v[3]}</td>
        <td>{v[4]}</td>
        <td>{v[5]}</td>
        <td>{Math.round(func.returnValue(v[0], v[1], v[2], v[3], v[4], v[5]))}</td>
      </tr>);
    })


    return (
      <div className='displayPage'>
        <h1>Settings</h1>
        <p>Here, adjust two properties: first, you can write a custom score calculator, and second,
          what tags you have (and what color they display as).
        </p>
        <h2>Score Function</h2>
        <p>You have 6 things you can read off of, variables: </p>
        <ol>
          <li><span className='code'>PrS</span> - Professional score listed in Project</li>
          <li><span className='code'>PeS</span> - Personal score listed in Project</li>
          <li><span className='code'>DeS</span> - Development score listed in Project</li>
          <li><span className='code'>DiS</span> - Difficulty score listed in Project</li>
          <li><span className='code'>SD</span> - Days after start date</li>
          <li><span className='code'>ED</span> - Days after end date</li>
        </ol>
        <p>Update your function in the boxes below. It uses a weight system, so you can assign values for each score and it will
          compute the result. You can make either negative or positive numbers, depending on what you want that score to represent. <br />
          You can determine whether a higher score means you should do it, or a lower (or negative score) does. Make sure to
          save your weights with the button to persist to the other page (and across sessions; this is only stored locally).
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 2fr" }}>

          <label htmlFor='prs'>Professional Score</label>
          <input type='number' name='prs' value={this.state.function[0]} onChange={(e) => this.updateFunction(0, e)} /> <br />
          <label htmlFor='pes'>Personal Score</label>
          <input type='number' name='pes' value={this.state.function[1]} onChange={(e) => this.updateFunction(1, e)} /> <br />
          <label htmlFor='des'>Development Score</label>
          <input type='number' name='des' value={this.state.function[2]} onChange={(e) => this.updateFunction(2, e)} /> <br />
          <label htmlFor='dis'>Difficulty Score</label>
          <input type='number' name='dis' value={this.state.function[3]} onChange={(e) => this.updateFunction(3, e)} /> <br />
          <label htmlFor='sd'>Starting Date</label>
          <input type='number' name='sd' value={this.state.function[4]} onChange={(e) => this.updateFunction(4, e)} /> <br />
          <label htmlFor='ed'>Ending Date</label>
          <input type='number' name='ed' value={this.state.function[5]} onChange={(e) => this.updateFunction(5, e)} /> <br />
        </div>

        <button onClick={this.updateDisplayFunction}>Save Display Function</button>
        {this.state.saved && (<p style={{ color: "green" }}>Saved!</p>)}
        <table>
          <thead>
            <tr>
              <td>Professional</td>
              <td>Personal</td>
              <td>Development</td>
              <td>Difficulty</td>
              <td>Days after Start Date</td>
              <td>Days after End Date</td>
              <td>Computed Score</td>
            </tr>
          </thead>
          <tbody>
            {functionDisplay}
          </tbody>
        </table>

        <hr />
        <h2>Tags</h2>
        <p>Here are all your current tags; you can choose to delete them, which will remove all references in
          existing projects, update them directly (color and/or name), and you can also make new ones using the inputs below.
        </p>
        <TagHandler />
      </div>
    );
  }
}

class TagHandler extends React.Component<Record<string, never>, { types: Array<ProjectType>, newColor: string, newTitle: string }> {
  state = {
    types: [],
    newColor: "#ffffff",
    newTitle: ""
  }

  async componentDidMount(): Promise<void> {
    const types = await getAllTypes();
    this.setState({ types: types });
  }

  updateNewColor = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newColor: e.target.value });
  }

  updateNewText = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ newTitle: e.target.value });
  }

  updateTypeName = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const types: Array<ProjectType> = this.state.types;
    types[index].typeName = e.target.value;
    this.setState({types: types});
  }

  updateColor = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const types: Array<ProjectType> = this.state.types;
    types[index].color = e.target.value;
    this.setState({ types: types });
  }

  sendUpdate = (index: number) => {
    const types: Array<ProjectType> = this.state.types;
    updateType(types[index]);

    const currentText = this.state.newTitle;
    this.setState({newTitle: "Update sent!"});
    setTimeout(() => {
      this.setState({ newTitle: currentText });
    }, 2000);
  }

  sendDelete = (index: number) => {
    const types: Array<ProjectType> = this.state.types;
    deleteType(types[index]);

    types.splice(index, 1);
    this.setState({types: types});
  }

  createType = async (): Promise<void> => {
    const newType: ProjectType = {
      id: 0,
      typeName: this.state.newTitle,
      color: this.state.newColor
    };
    await addType(newType);
    const currentTypes: Array<ProjectType> = this.state.types;
    currentTypes.push(newType);
    this.setState({ types: currentTypes });
  }

  render() {
    return (
      <>
        <h3>Create New Tag</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 1fr", width: "50%" }}>
          <input type='text' onChange={this.updateNewText} value={this.state.newTitle} />
          <input type='color' onChange={this.updateNewColor} value={this.state.newColor} />
          <button onClick={this.createType}>Create Tag</button>
        </div>
        <hr/>
        {this.state.types.map((value: ProjectType, index) => <div key={index} style={{ width: "50%", display: "grid", gridTemplateColumns: "1fr 50px 100px 100px" }}>
          <input type='text' value={value.typeName} onChange={(e) => this.updateTypeName(e, index)} />
          <input type='color' value={value.color} onChange={(e) => this.updateColor(e, index)} />
          <button style={{ backgroundColor: "green" }} onClick={() => this.sendUpdate(index)}>Update</button>
          <button style={{ backgroundColor: "red" }} onClick={() => this.sendDelete(index)}>Remove</button>
        </div>)}
      </>
    )
  }
}
