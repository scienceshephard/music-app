import { Route, Routes } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Feeds from './pages/feeds/Feeds'
import Favourite from './pages/favorite/favorite'
import { Account } from './pages/account/Account'
import { ArtistInfo } from './components/artist/ArtistInfo'
import { MyContext } from './Context'
import { useEffect, useRef, useState } from 'react'
import Playlist from './components/trackList/Playlist'
import { SignUp } from './pages/sign-up/Sign-Up'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/404/404'
import { Settings } from 'lucide-react'
function App() {
  
  //Navigateion states
  const[origin, setOrigin] = useState(null)

  //Data states
  const [allAlbums, setAllAlbums] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  
  //search qeury data
  const [ searchData, setSearchData ] =useState([])
  
  const [selectedSong, setSelectedSong] = useState(()=>{
    const storedSong = localStorage.getItem('selectedSong')
    return storedSong? JSON.parse(storedSong): [];
  })
useEffect(() => {
  localStorage.setItem('selectedSong', JSON.stringify(selectedSong));
}, [selectedSong]);
  //Audio  states
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayAudioPlayer, setDisplayAudioPlayer] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const [ songList, setSongList ] = useState([])

  //Animation states
  const [albumloading, setAlbumloading]=useState(true)


  return (
    <MyContext.Provider value={{ currentTime, setCurrentTime, duration, setDuration, audioRef, currentSongIndex, setCurrentSongIndex, selectedSong, setSelectedSong, albumloading, setAlbumloading, origin, setOrigin, allAlbums, setAllAlbums, allTracks, setAllTracks, searchData, setSearchData, songList, setSongList, isPlaying, setIsPlaying, displayAudioPlayer, setDisplayAudioPlayer }}>
      <Routes >
          <Route path='/'element={<Home />}>
            <Route index element={<Feeds />} />
            <Route path='/artist/:name' element={<ArtistInfo />} />
            <Route path='playlist/:name' element={<Playlist/>} />
            <Route path='/favourite' element={<Favourite />} />
            <Route path='account' element= {<Account />} />
            <Route path='settings' element={ <Settings/> } />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
  )}

export default App