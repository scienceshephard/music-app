import React, { useContext } from 'react'
import { MyContext } from '../../Context';
import { Pause, Play, SkipBack, SkipForward, Repeat, Shuffle, } from 'lucide-react';
import Music_Player from './Music_Player';
export const Mobile_Music_Player = () => {
  const{ selectedSong} = useContext(MyContext);
  
  return (
    <div className='lg:hidden flex inset-shadow-green-900/50 inset-shadow-sm flex-col p-3'>
    {/* Loading Animtaion */}
    {
        selectedSong &&
        <div className='animate-pulse '>
            <div className='w-20 h-15 rounded-2xl bg-gray-500'></div>
        </div>
    }
    { !selectedSong &&
        <div className=' border hidden sm:block w-full'>
            <img
            src={selectedSong?.image || 'https://via.placeholder.com/50'}
            alt={selectedSong.name}
            className="w-20 h-15 object-cover rounded"
          />
        </div>
    }
    </div>
  )
}
