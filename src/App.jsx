import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css' 
import Home from './pages/Home'
import Feeds from './pages/feeds/Feeds'
import Favourite from './pages/favorite/favorite'
import { Account } from './pages/account/Account'
import { ArtistInfo } from './components/artist/ArtistInfo'
import { MyContext } from './Context'
import { useEffect, useRef, useState } from 'react'
import { NotFound } from './pages/404/404'
import { FeedsInfoPage} from './pages/feeds/FeedsPage'
import { onAuthStateChanged, signInWithPopup, } from 'firebase/auth'
import { auth, googleProvider } from './config/firebase'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Playlist } from './components/tracklist/Playlist'

function App() {

  //Autentication
  const [user, setUser] = useState({});
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [Autherror, setAuthError] = useState('');
    const navigate = useNavigate();
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    })
    return ()=>unsubscribe()
  }, []);

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      if( user && user._tokenResponse && user._tokenResponse.isNewUser) {
        setShowAuthPage(false);
        navigate('/account');
      }else{
        setShowAuthPage(false);
      }
    } catch (err) {
      console.error(err.message)
      setAuthError(err.message)
    }
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setShowAuthPage(false);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  

  //Navigation states
  const[origin, setOrigin] = useState(null)

  //Data states
  const [allAlbums, setAllAlbums] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [allFeeds, setAllFeeds] = useState([])

  //search query data
  const [ searchData, setSearchData ] = useState([])
  
  const [selectedSong, setSelectedSong] = useState([])

  //Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayAudioPlayer, setDisplayAudioPlayer] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  const [showMobileMusicPlayer, setShowMobileMusicPlayer] = useState(false);

  // Favourites
  const [favourite, setFavourite] = useState([])

  //Animation states
  const [albumloading, setAlbumloading] = useState(true)

  // Audio event handlers
  const handleAudioLoad = () => {
    setAudioLoading(false);
    setAudioError(null);
  };

  const handleAudioError = (error) => {
    if(error?.name === 'AbortError') return;
    setAudioLoading(false);
    setAudioError('Failed to load audio');
    setIsPlaying(false);
    console.error('Audio error:', error);
  };

  const handleAudioEnded = () => {
    if (repeatMode === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeatMode === "all") {
      skipNext(); // it already wraps to start
    } else {
      if (currentSongIndex < selectedSong.length - 1) {
        skipNext();
      } else {
        setIsPlaying(false); // Stop at end
      }
    }
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
    const audio = audioRef.current;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if(audio.readyState >= 3){
        audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Playback error:', err);
          handleAudioError(err);
        });
      }
      else{
        setIsPlaying(true);
      }
    }
  }

  const shuffle = () => {
   if (selectedSong.length <= 1) return;

  const current = selectedSong[currentSongIndex];
  
  // Exclude the current song
  const rest = selectedSong.filter((_, index) => index !== currentSongIndex);

  // Shuffle the rest
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  // Place current song at index 0
  const shuffledList = [current, ...rest];

  setSelectedSong(shuffledList);
  setCurrentSongIndex(0); // start from the current song
  
  }
  
  const [repeatMode, setRepeatMode] = useState("off");
  const repeat = () => {
    const nextMode = repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off";
    setRepeatMode(nextMode);
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return;
    
    const percent = e.target.value;
    const newTime = (percent / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  // Effect for handling current song changes - SINGLE VERSION
  useEffect(() => {
    if (!audioRef.current || selectedSong.length === 0) return;
    
    const audio = audioRef.current;
    const newSrc = selectedSong[currentSongIndex]?.audio || '';
    
    setAudioLoading(true);
    setAudioError(null);
    
    // Only load if the source is actually different
    if (audio.src !== newSrc) {
      audio.src = newSrc;
      audio.load();
      
      // Set a timeout as fallback to clear loading state
      const loadingTimeout = setTimeout(() => {
        setAudioLoading(false);
      }, 5000); // 5 second timeout
      
      const handleCanPlayOnce = () => {
        clearTimeout(loadingTimeout);
        setAudioLoading(false);
        audio.removeEventListener('canplay', handleCanPlayOnce);
        
        if (isPlaying) {
          audio.play().catch(err => handleAudioError(err));
        }
      };
      
      audio.addEventListener('canplay', handleCanPlayOnce);
      
      return () => {
        clearTimeout(loadingTimeout);
        audio.removeEventListener('canplay', handleCanPlayOnce);
      };
    } else {
      // Same source, just clear loading
      setAudioLoading(false);
    }
  }, [currentSongIndex, selectedSong]);

  // Effect for setting up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      const newDuration = audio.duration || 0;
      setDuration(newDuration);

    };
    
    const handleLoadStart = () => {
      setAudioLoading(true);
    };
    
    const handleCanPlay = () => {
      handleAudioLoad();
    };
    
    const handleLoadedData = () => {
      handleAudioLoad();
    };
    
    const handleError = (e) => handleAudioError(e);
    const handleEnded = () => handleAudioEnded();

    // Add event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration); // Additional duration event
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    // Set initial duration if already loaded
    if (audio.readyState >= 1) {
      updateDuration();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef.current]);

  const reorderSelectedSongs = (newOrder) => {
    setSelectedSong(newOrder);
  };

  const contextValue = {
    // Authentication state
    user,
    showAuthPage,
    setShowAuthPage,
    reorderSelectedSongs,
    Autherror,
    setAuthError,
    loginGoogle,
    handleSignOut,

    // Audio controls
    togglePlay,
    handleSeek,
    shuffle,
    repeatMode,
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
    
    //Favourites
    favourite, 
    setFavourite,

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

      {/* Preload the next song (hidden) */}
      {selectedSong.length > 1 && (
        <audio
          src={selectedSong[(currentSongIndex + 1) % selectedSong.length]?.audio}
          preload="auto"
          style={{ display: 'none' }}
        />
      )}
      
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={
              <Feeds />
          } />
          <Route path='/artist/:name' element={<ArtistInfo />} />
          <Route path='playlist/:name' element={
          <ProtectedRoute>           
              <Playlist/>
            </ProtectedRoute>
            } />
          <Route path='/library' element={
            <ProtectedRoute>
              <Favourite />
            </ProtectedRoute>
            } />
          <Route path='account' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
            } />
          <Route path='feed/:id' element={<FeedsInfoPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </MyContext.Provider>
  )
}

export default App