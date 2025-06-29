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
  
  //Navigation states
  const[origin, setOrigin] = useState(null)

  //Data states
  const [allAlbums, setAllAlbums] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [allFeeds, setAllFeeds] = useState([])

  //search query data
  const [ searchData, setSearchData ] = useState([])
  
  const [selectedSong, setSelectedSong] = useState(()=>{
    const storedSong = localStorage.getItem('selectedSong')
    return storedSong? JSON.parse(storedSong): [];
  })

  useEffect(() => {
    localStorage.setItem('selectedSong', JSON.stringify(selectedSong));
  }, [selectedSong]);

  //Audio states
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayAudioPlayer, setDisplayAudioPlayer] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  const [showMobileMusicPlayer, setShowMobileMusicPlayer] = useState(false);
  const [ songList, setSongList ] = useState([])

  //Animation states
  const [albumloading, setAlbumloading] = useState(true)

  // Audio event handlers
  const handleAudioLoad = () => {
    setAudioLoading(false);
    setAudioError(null);
  };

  const handleAudioError = (error) => {
    setAudioLoading(false);
    setAudioError('Failed to load audio');
    setIsPlaying(false);
    console.error('Audio error:', error);
  };

  const handleAudioEnded = () => {
    skipNext();
  };

  const skipNext = () => {
    if (selectedSong.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % selectedSong.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  }

  const skipPrev = () => {
    if (selectedSong.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + selectedSong.length) % selectedSong.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  }

  const togglePlay = () => {
    if (!audioRef.current || selectedSong.length === 0) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Playback error:', err);
          handleAudioError(err);
        });
    }
  }

  const shuffle = (tracks) => {
    console.log('Shuffle:', tracks);
    // TODO: Implement shuffle functionality
  }

  const repeat = (tracks) => {
    console.log('Repeat:', tracks);
    // TODO: Implement repeat functionality
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return;
    
    const percent = e.target.value;
    const newTime = (percent / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  // Effect for handling current song changes
  useEffect(() => {
    if (!audioRef.current || selectedSong.length === 0) return;
    
    const audio = audioRef.current;
    setAudioLoading(true);
    setAudioError(null);
    
    // Update audio source
    audio.src = selectedSong[currentSongIndex]?.audio || '';
    audio.load(); // Force reload of the audio element
    
    // If we should be playing, start playback after load
    if (isPlaying) {
      audio.play()
        .catch(err => handleAudioError(err));
    }
  }, [currentSongIndex, selectedSong]);

  // Effect for setting up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleLoadStart = () => setAudioLoading(true);
    const handleCanPlay = () => handleAudioLoad();
    const handleError = (e) => handleAudioError(e);
    const handleEnded = () => handleAudioEnded();

    // Add event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    // Set initial duration if already loaded
    if (audio.readyState >= 1) {
      updateDuration();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Effect for play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || selectedSong.length === 0) return;

    if (isPlaying && audio.paused) {
      audio.play().catch(err => handleAudioError(err));
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying]);

  const contextValue = {
    // Audio controls
    togglePlay,
    handleSeek,
    shuffle,
    repeat,
    skipPrev,
    skipNext,
    
    // Audio state
    currentTime,
    duration,
    audioRef,
    currentSongIndex,
    setCurrentSongIndex,
    selectedSong,
    setSelectedSong,
    isPlaying,
    setIsPlaying,
    audioLoading,
    audioError,
    
    // UI state
    albumloading,
    setAlbumloading,
    displayAudioPlayer,
    setDisplayAudioPlayer,
    showMobileMusicPlayer,
    setShowMobileMusicPlayer,
    
    // Navigation
    origin,
    setOrigin,
    
    // Data
    allAlbums,
    setAllAlbums,
    allTracks,
    setAllTracks,
    allFeeds,
    setAllFeeds,
    searchData,
    setSearchData,
    songList,
    setSongList,
    
    // Time utilities
    formatTime: (time) => {
      if (!time || isNaN(time)) return '00:00';
      return new Date(time * 1000).toISOString().substr(14, 5);
    }
  };
  
  return (
    <MyContext.Provider value={contextValue}>
      {/* Centralized Audio Element - Hidden */}
      {selectedSong.length > 0 && (
        <audio
          ref={audioRef}
          preload="metadata"
          style={{ display: 'none' }}
        />
      )}
      
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Feeds />} />
          <Route path='/artist/:name' element={<ArtistInfo />} />
          <Route path='playlist/:name' element={<Playlist/>} />
          <Route path='/library' element={<Favourite />} />
          <Route path='account' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='feed/:id' element={<FeedsInfoPage />} />
        </Route>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MyContext.Provider>
  )
}

export default App