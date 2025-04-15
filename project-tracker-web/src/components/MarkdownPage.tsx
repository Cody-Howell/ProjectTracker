import React from 'react';

type MarkdownPageState = {
  projects: Array<string>, 
  
}

export class MarkdownPage extends React.Component<Record<string, never>, MarkdownPageState> {
  render() {
    return (
      <div className='displayPage'>
        <h1>Markdown Page</h1>
      </div>
    );
  }
}
