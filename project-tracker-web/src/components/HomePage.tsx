import React from 'react';

export class HomePage extends React.Component {
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
              <th>Lorem</th>
              <th>Lorem</th>
              <th>Lorem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem</td>
              <td>Lorem</td>
              <td>Lorem</td>
              <td>Lorem</td>
              <td>Lorem</td>
              <td>Lorem</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
