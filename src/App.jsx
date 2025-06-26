import { Route, Routes } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Feeds from './pages/feeds/Feeds'
import Favourite from './pages/favorite/favorite'
import { Account } from './pages/account/Account'
import { ArtistInfo } from './components/artist/ArtistInfo'
import { MyContext } from './Context'
import { useEffect, useRef, useState } from 'react'
import { SignUp } from './pages/sign-up/Sign-Up'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/404/404'
import { Settings } from './pages/settings/Settings'
import { FeedsInfoPage} from './pages/feeds/FeedsPage'
import { Playlist } from './pages/trackList/Playlist'
function App() {
  
  //Navigateion states
  const[origin, setOrigin] = useState(null)

  //Data states
  const [allAlbums, setAllAlbums] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [allFeeds, setAllFeeds] = useState([])

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
  const [showMobileMusicPlayer, setShowMobileMusicPlayer] = useState(false);
  const [ songList, setSongList ] = useState([])

  //Animation states
  const [albumloading, setAlbumloading]=useState(true)


  const skipNext = () =>{
    const nextIndex = (currentSongIndex + 1 ) % selectedSong.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
    audioRef.current?.play().catch(err => console.error('Playback error: ', err));
  }
  const skipPrev = () =>{
    const prevIndex = (currentSongIndex - 1 + selectedSong.length ) % selectedSong.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
    audioRef.current?.play().catch(err => console.error('Playback error: ', err));
  }
  const togglePlay =() =>{
    setIsPlaying(prev =>!prev);
  }
  const shuffle =(tracks) =>{
    console.log(tracks);
  }
  const repeat =(tracks)=>{
    console.log(tracks);
  }
  const handleSeek = (e) =>{
    const audio = audioRef.current
    if(!audio || duration === 0) return;
    const percent = e.target.value;
    const newTime = (percent / 100 ) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }
  return (
    <MyContext.Provider value={{ togglePlay, handleSeek, shuffle, repeat, currentTime, skipPrev, skipNext, allFeeds, showMobileMusicPlayer, setShowMobileMusicPlayer, setAllFeeds, setCurrentTime, duration, setDuration, audioRef, currentSongIndex, setCurrentSongIndex, selectedSong, setSelectedSong, albumloading, setAlbumloading, origin, setOrigin, allAlbums, setAllAlbums, allTracks, setAllTracks, searchData, setSearchData, songList, setSongList, isPlaying, setIsPlaying, displayAudioPlayer, setDisplayAudioPlayer }}>
      <Routes >
          <Route path='/'element={<Home />}>
            <Route index element={<Feeds />} />
            <Route path='/artist/:name' element={<ArtistInfo />} />
            <Route path='playlist/:name' element={<Playlist/>} />
            <Route path='/library' element={<Favourite />} />
            <Route path='account' element= {<Account />} />
            <Route path='settings' element={ <Settings/> } />
            <Route path='feed/:id' element ={ <FeedsInfoPage /> } />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
  )}

export default App