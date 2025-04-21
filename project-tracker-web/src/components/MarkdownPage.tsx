import React, { ChangeEvent } from 'react';
import { createDocument, getAllProjectNames, getDocument, getProjectDocs, updateDocument } from '../api';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import csharp from 'highlight.js/lib/languages/csharp';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('csharp', csharp);

type MarkdownPageState = {
  projects: Array<{
    id: number;
    projectTitle: string
  }>,
  projectId: number,
  fileNames: Array<string>,
  currentFile: string | null,
  currentText: string | null,
  displayMarkdown: boolean, 
  updatedApi: boolean, 
  newTitle: string
}

export default class MarkdownPage extends React.Component<Record<string, never>, MarkdownPageState> {
  state = {
    projects: [],
    projectId: 0,
    fileNames: [],
    currentFile: null,
    currentText: null,
    displayMarkdown: false, 
    updatedApi: false, 
    newTitle: ""
  }

  //#region Functions
  async componentDidMount(): Promise<void> {
    this.setState({ projects: await getAllProjectNames() })
  }

  updateProjectSelector = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const projId = Number(e.target.value);
    const projects: Array<{ id: number, projectTitle: string }> = this.state.projects;
    const projName: string | undefined = projects.find((a) => a.id == projId)?.projectTitle;

    if (projName === undefined) return;

    const fileNames = await getProjectDocs(projName);
    this.setState({ projectId: projId, fileNames: fileNames });
  }

  updateCurrentProject = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const filename = e.target.value;

    if (filename === "") {
      this.setState({ currentFile: null, currentText: null });
      return;
    }

    const fileText = await getDocument(filename);
    this.setState({ currentFile: filename, currentText: fileText });
  }

  createNewDoc = async (): Promise<void> => {
    const projects: Array<{ id: number, projectTitle: string }> = this.state.projects;
    const projName: string | undefined = projects.find((a) => a.id == this.state.projectId)?.projectTitle;

    if (projName === undefined) return;

    await createDocument(projName, this.state.newTitle);

    window.location.reload();
  }

  toggleDisplay = (): void => {
    this.setState({ displayMarkdown: !this.state.displayMarkdown });
  }

  updateFile = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ currentText: e.target.value });
  }

  updateAPIFile = async (): Promise<void> => {
    if (this.state.currentFile === null || this.state.currentText === null) return;

    await updateDocument(this.state.currentFile, this.state.currentText);
    this.setState({updatedApi: true});
    setTimeout(() => {
      this.setState({updatedApi: false});
    }, 2000);
  }

  updateNewTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({newTitle: e.target.value});
  }
  //#endregion

  render() {
    const md = markdownit({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(str, { language: lang }).value;
        }

        return ''; // use external default escaping
      }
    });
    let result: string = "";
    if (this.state.currentText !== null) {
      result = md.render(this.state.currentText)
    }

    return (
      <div className='displayPage'>
        <h1>Markdown Page</h1>

        <select value={this.state.projectId} onChange={this.updateProjectSelector}>
          <option value={undefined}></option>
          {this.state.projects.map((v: { id: number, projectTitle: string }, i) => <option key={i} value={v.id}>{v.projectTitle}</option>)}
        </select>
        <br />
        {this.state.fileNames.length > 0 && (
          <>
          <select value={this.state.currentFile ?? undefined} onChange={this.updateCurrentProject}>
            <option value={undefined}></option>
            {this.state.fileNames.map((v: string, i) => <option key={i} value={v}>{v}</option>)}
          </select><br />
          <input type='text' value={this.state.newTitle} onChange={this.updateNewTitle} placeholder='File title WITHOUT .md'/>
          <button onDoubleClick={this.createNewDoc}>Create New Doc (double-click)</button>
          </>
        )}


        {this.state.currentFile !== null && this.state.currentText !== null && (
          <>
            <hr />
            <p>Current file: {this.state.currentFile}</p>
            <button onClick={this.toggleDisplay} style={{padding: "6px"}}>{this.state.displayMarkdown ? "Edit" : "Display"}</button> <br />
            <hr />
            {this.state.displayMarkdown ? (
              <div dangerouslySetInnerHTML={{ __html: result }} />
            ) : (
              <>
                <textarea value={this.state.currentText}
                  style={{ height: "300px", width: "80%", fontFamily: "Inter" }}
                  onChange={this.updateFile} />
                <br />
                <button onClick={this.updateAPIFile}>Update File</button>
                {this.state.updatedApi && (<p>File updated!</p>)}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
