import './App.css'
import { Routers } from './routers/Routers'
import { VideoProvider } from './context/VideoContext'

function App() {

  return (
    <VideoProvider>
      <Routers />
    </VideoProvider>
  )
}

export default App
