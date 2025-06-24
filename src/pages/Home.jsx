import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'
import SideMusicPlayer from '../components/side_music_player/SideMusicPlayer'
import { Playlist } from './trackList/Playlist'

const Home = () => {
  
  return (
    <div className="w-screen h-screen flex lg:flex-col">
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
        <SideMusicPlayer />
    </div>
  )
}

export default Home