import { type Component, createSignal } from 'solid-js'

const Versions: Component = () => {
    const [versions] = createSignal(window.electron.process.versions)
    const [isDarkMode] = createSignal(window.api.windowControll.darkMode.state())
    let themeSource!: HTMLElement

    const handleOnToggle = (): void => {
        window.api.windowControll.darkMode.toggle()
    }

    const handleSystem = (): void => {
        window.api.windowControll.darkMode.system()
    }

    return (
        <>
            <ul class="versions">
                <li class="electron-version">Electron v{versions().electron}</li>
                <li class="chrome-version">Chromium v{versions().chrome}</li>
                <li class="node-version">Node v{versions().node}</li>
            </ul>
            <div class="darkmode">
                <p>
                    Current theme source: <strong ref={themeSource}>{isDarkMode()}</strong>
                </p>

                <button
                    class="'bg-blue-500/80 text-black hover:bg-blue-600/80"
                    id="toggle-dark-mode"
                    onClick={handleOnToggle}
                >
                    Toggle Dark Mode
                </button>

                <button id="reset-to-system" onClick={handleSystem}>
                    Reset to System Theme
                </button>
            </div>
        </>
    )
}

export default Versions
