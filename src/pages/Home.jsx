import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Music_Player from '../components/musicplayer/Music_Player'
import Playlist from '../components/trackList/Playlist'
import { Outlet } from 'react-router'
import NavgationButtons from '../components/navbar/NavgationButtons'

const Home = () => {

  return (
    <div className="h-screen w-screen flex">
        <Navbar />
        <div className='flex flex-col flex-1/3  p-[20px]'>
            <NavgationButtons />
            <Outlet />
        </div>
        <Music_Player />
        <Playlist />
    </div>
  )
}

export default Home