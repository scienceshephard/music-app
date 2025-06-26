import React, { useContext } from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'
import { Playlist } from './trackList/Playlist'
import { Mobile_Music_Player } from '../components/musicplayer/Mobile_Music_Player'
import Mobile_Navbar from '../components/navbar/Mobile_Navbar'
import { MyContext } from '../Context'
import { ArrowUp, ArrowDown } from 'lucide-react'

const Home = () => {
  const {showMobileMusicPlayer, selectedSong, setShowMobileMusicPlayer,} =useContext(MyContext);
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
        <div className='lg:hidden flex flex-col min-h-screen'>
          {!showMobileMusicPlayer && 
          <div className='flex flex-1 flex-col overflow-y-auto scroll-smoothborder'>
            <Outlet />
          </div>}
            {showMobileMusicPlayer && selectedSong &&
             <div className='flex flex-1 flex-col'><Music_Player /></div>
             }
            
          <footer className='bottom-0 flex flex-col sticky z-10 w-full'>
          {!showMobileMusicPlayer && <button className='border  p-2 bg-green-900 absolute left-[-10px] top-[-15px] w-fit text-white '>
            <ArrowUp onClick={()=> setShowMobileMusicPlayer(true)}/>
          </button>}
            {!showMobileMusicPlayer && <Mobile_Music_Player />}
            <Mobile_Navbar />
          </footer>
        </div>

    </div>
  )
}

export default Home