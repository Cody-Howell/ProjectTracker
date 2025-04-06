import React, { ChangeEvent } from 'react';
import func from '../function.ts';

export class SettingsPage extends React.Component<Record<string, never>, {function: string}> {
  state = {
    function: func.scoreFunction
  }

  updateFunction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({function: e.target.value});
  }

  updateDisplayFunction = () => {
    func.updateFunction(this.state.function);
    this.setState({});
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
      [53, 82, 79, 22, 26, 8]
    ];
    const functionDisplay: React.ReactNode[] = functionNumbers.map((value, index) => {
      return(<tr key={index}>
        <td>{value[0]}</td>
        <td>{value[1]}</td>
        <td>{value[2]}</td>
        <td>{value[3]}</td>
        <td>{value[4]}</td>
        <td>{value[5]}</td>
        <td>{func.returnValue(value[0], value[1], value[2], value[3], value[4], value[5])}</td>
      </tr>);
    })


    return (
      <div className='displayPage'>
        <h1>Settings</h1>
        <p>Here, adjust two properties: first, what tags you have (and what color they display as), and second, 
          you can write a custom score calculator. 
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
        <p>Update your function in the below text box. It must be read by JavaScript, and it will find and replace 
          all the letters with values. You can check the values of a couple of random outcomes just below the text box. Each line 
          has function parameters that are in the same order as the above list. <br/>
          You can determine whether a higher score means you should do it, or a lower (or negative score) does. 
        </p>
        <textarea id='function' onChange={this.updateFunction} value={this.state.function} style={{width: "400px"}}/>
        <p>Current function: "{this.state.function}"</p>
        <button onClick={this.updateDisplayFunction}>Update Display Function</button>
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

        <hr/>
        <h2>Tags</h2>
      </div>
    );
  }
}
