import React, { useContext } from 'react'
import { MyContext } from '../../Context';

export const Mobile_Music_Player = () => {
  const{selectedSong} = useContext(MyContext);
  
  return (
    <>
    {selectedSong &&
        <div className='border lg:hidden w-full'>
            s
              {/* <img
                src={selectedSong?.image || 'https://via.placeholder.com/50'}
                alt={selectedSong.name}
                className="w-12 h-12 object-cover rounded"
              /> */}
        </div>
    }
    </>
  )
}
