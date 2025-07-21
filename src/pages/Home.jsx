import React, { useContext } from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'
import { Playlist } from '../components/tracklist/Playlist'
import { Mobile_Music_Player } from '../components/musicplayer/Mobile_Music_Player'
import Mobile_Navbar from '../components/navbar/Mobile_Navbar'
import { MyContext } from '../Context'
import { createPortal } from 'react-dom'
import { AuthPage } from '../auth/auth'

const Home = () => {
  const {showMobileMusicPlayer, selectedSong, showAuthPage} =useContext(MyContext);
  return (
    <div className="lg:pb-0">
        {/* Desktop design */}
        <div className='lg:flex w-screen h-screen hidden'>
          <Navbar />
          <div className='w-[40%] overflow-y-auto scroll-smoothborder p-[20px]'>
              <NavgationButtons />
              {/* {i} */}
              <Outlet />
          </div>
          <Music_Player />
          <Playlist />
        </div>
        {/* Mobile Design */}
        <div className='lg:hidden flex flex-col min-h-dvh'>
          {!showMobileMusicPlayer && 
          <div className='flex p-5 flex-1 flex-col overflow-y-auto scroll-smoothborder'>
            <NavgationButtons />
            <Outlet />
          </div>}
            {showMobileMusicPlayer && selectedSong &&
             <div className='flex flex-1 flex-col'>
                <Music_Player />
              </div>
             }
          <footer className='bottom-0 flex flex-col fixed z-10 w-full'>
            {!showMobileMusicPlayer && <Mobile_Music_Player />}
            <Mobile_Navbar />
          </footer>
        </div>
        {/* Auth Page */}
        {showAuthPage && createPortal(
          <div className='border w-screen h-screen bg-gray-900/50 flex justify-center items-center absolute top-0 left-0 z-50'
          >
            <AuthPage />
          </div>
          , document.getElementById('auth-root'))
        }
    </div>
  )
}

export default Home