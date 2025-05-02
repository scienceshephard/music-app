import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import Playlist from '../components/trackList/Playlist'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'
import SideMusicPlayer from '../components/side_music_player/SideMusicPlayer'

const Home = () => {

  return (
    <div className="w-screen h-screen flex justify-between lg:flex-col sm:flex-row">
        <div className='flex border h-full'>
          <Navbar />
          <div className='flex flex-col flex-1/3  p-[20px]'>
              <NavgationButtons />
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