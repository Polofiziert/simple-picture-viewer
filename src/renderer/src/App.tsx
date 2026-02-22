import type { Component } from 'solid-js'
import Versions from './components/Versions'

const App: Component = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div id="Hello">Hello World</div>
        <a target="_blank" rel="noreferrer" onClick={ipcHandle}>PING</a>
      <Versions />
    </>
  )
}

export default App
