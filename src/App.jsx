import { Route, Routes } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Feeds from './pages/feeds/Feeds'
import Favourite from './pages/favorite/favorite'
import { Account } from './pages/account/Account'
import { ArtistInfo } from './components/artist/ArtistInfo'
import { MyContext } from './Context'
import { useState } from 'react'
import Playlist from './components/trackList/Playlist'
import { SignUp } from './pages/sign-up/Sign-Up'
import { Login } from './pages/login/Login'
import { NotFound } from './pages/404/404'
function App() {
  
  //Navigateion states
  const[origin,setOrigin] = useState(null)

  //Data states
  const [ artisteAlbum, setArtisteAlbum ] =useState([])
  const [ artisteTracks, setArtisteTracks ] =useState([])
  const [ searchData, setSearchData ] =useState([])

  //Audio  states
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayAudioPlayer, setDisplayAudioPlayer] = useState(false)
  
  // Filter Duration States
  const [selectedDuration, setselectedDuration] = useState("Today")

  const [ songList, setSongList ] = useState([])

  return (
    <MyContext.Provider value={{ origin, setOrigin, artisteAlbum, setArtisteAlbum, artisteTracks, setArtisteTracks, searchData, setSearchData, songList, setSongList, isPlaying, setIsPlaying, displayAudioPlayer, setDisplayAudioPlayer, selectedDuration, setselectedDuration }}>
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