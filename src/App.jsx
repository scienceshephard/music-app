import './App.css'
import Discover from './components/Discover/Discover'
import Music_Player from './components/MusicPlayer/Music_Player'
import Navbar from './components/Navbar/Navbar'
import Playlist from './components/TrackList/Playlist'

function App() {
  
  return (
  <>
  <div className="h-screen w-screen flex">
    <Navbar/>
    <Discover/>
    <Music_Player />
    <Playlist />
  </div>
  </>  
  )}

export default App
