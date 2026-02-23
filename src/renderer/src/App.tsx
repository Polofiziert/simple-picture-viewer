import type { Component } from 'solid-js'
import Versions from './components/Versions'
import { Button } from "~/components/ui/button"


import electronLogo from './assets/electron.svg'

const App: Component = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>

          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
      <Versions />
            <Button>Click me</Button>

    </>
  )
}

export default App
