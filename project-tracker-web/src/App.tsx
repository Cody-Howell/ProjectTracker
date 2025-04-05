import React from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { MarkdownPage } from './components/MarkdownPage'
import { SettingsPage } from './components/SettingsPage'
import { SessionPage } from './components/SessionPage'

class App extends React.Component {
  render() {
    return (
      <div id='app'>
        <BrowserRouter>
          <Sidebar />
          <div id='webpage'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/sessions' element={<SessionPage />} />
              <Route path='/markdown' element={<MarkdownPage />} />
              <Route path='/settings' element={<SettingsPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

class Sidebar extends React.Component {
  render() {
    return (
      <div id='sidebar'>
        <Link to="/">Home</Link>
        <Link to="/sessions">Sessions</Link>
        <Link to="/markdown">Markdown</Link>
        <Link to="/settings">Settings</Link>
      </div>
    )
  }
}

export default App
