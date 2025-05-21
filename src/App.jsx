import { Route, Routes } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Feeds from './pages/feeds/Feeds'
import Favourite from './pages/favorite/favorite'
import { Account } from './pages/account/Account'
import { ArtistInfo } from './components/artist/ArtistInfo'
import { MyContext } from './Context'
import { useRef, useState } from 'react'
import Playlist from './components/trackList/Playlist'
import { SignUp } from './pages/sign-up/Sign-Up'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/404/404'
function App() {
  
  //Navigateion states
  const[origin, setOrigin] = useState(null)

  //Data states
  const [ artisteAlbum, setArtisteAlbum ] =useState([])
  const [ artisteTracks, setArtisteTracks ] =useState([])
  
  //sarch qeury data
  const [ searchData, setSearchData ] =useState([])
  
  const selectedSong = useRef(null)

  //Audio  states
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayAudioPlayer, setDisplayAudioPlayer] = useState(false)

  const [ songList, setSongList ] = useState([])

  //Animation states
  const [albumloading, setAlbumloading]=useState(true)


  return (
    <MyContext.Provider value={{ selectedSong, albumloading, setAlbumloading, origin, setOrigin, artisteAlbum, setArtisteAlbum, artisteTracks, setArtisteTracks, searchData, setSearchData, songList, setSongList, isPlaying, setIsPlaying, displayAudioPlayer, setDisplayAudioPlayer }}>
      <Routes >
          <Route path='/'element={<Home />}>
            <Route index element={<Feeds />} />
            <Route path='/artist/:id/:name' element={<ArtistInfo />} />
            <Route path='playlist/:id/:name' element={<Playlist/>} />
            <Route path='/favourite' element={<Favourite />} />
            <Route path='account' element= {<Account />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
  )}

export default App