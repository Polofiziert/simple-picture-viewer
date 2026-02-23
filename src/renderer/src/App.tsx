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
    <div class="grid max-w-md grid-cols-3 gap-4">
      <Button onClick={ipcHandle}>Primary</Button>
      <Button onClick={ipcHandle} variant="secondary">Secondary</Button>
      <Button onClick={ipcHandle} variant="destructive">Destructive</Button>
      <Button onClick={ipcHandle} variant="outline">Outline</Button>
      <Button onClick={ipcHandle} variant="ghost">Ghost</Button>
      <Button onClick={ipcHandle} variant="link">Link</Button>
    </div>

    </>
  )
}

export default App
