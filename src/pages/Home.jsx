import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'
import SideMusicPlayer from '../components/side_music_player/SideMusicPlayer'
import { Playlist } from './trackList/Playlist'
import { Mobile_Music_Player } from '../components/musicplayer/Mobile_Music_Player'

const Home = () => {
  
  return (
    <div className="w-screen h-screen sm:pb-[90px] lg:pb-0 flex flex-col">
        {/* Desktop design */}
        <div className='flex h-full'>
          <Navbar />
          <div className='w-[40%] overflow-y-auto scroll-smoothborder p-[20px]'>
              <NavgationButtons />
              {/* {i} */}
              <Outlet />
          </div>
          <Music_Player />
          <Playlist />
        </div>
        {/* Mobile design */}
        {/* <div className='hidden lg:flex w-full h-[60px] bg-[#FAFAFA] shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249]'>
          <NavgationButtons />
        </div> */}
        <Mobile_Music_Player />
        <SideMusicPlayer />
    </div>
  )
}

export default Home