import React, { useContext } from 'react'
import { MyContext } from '../../Context';
import { Menu } from 'lucide-react';

export const Playlist = () => {
  const { selectedSong, currentSongIndex } = useContext(MyContext);
  console.log(selectedSong, currentSongIndex);
  
  return (
    <div className='p-4 bg-white flex-1/2 shadow-md '>
      <h2 className="text-xl font-bold mb-2">Playlist</h2>
      {selectedSong.length === 0 ? (
        <p className="text-gray-500">No songs selected.</p>
      ) : (
        <ul className=''>
          {selectedSong.map((song, idx) => (
            <li key={song.id || idx} className="mb-4 hover:shadow-xl flex items-center gap-3">
              <button className='rounded bg-gray-200 p-1 ml-2.5 hover:bg-gray-300 transition-colors'>
                <Menu  />
              </button>
              <div>
                <div className="font-semibold">{song.name}</div>
                <div className="text-sm text-gray-600">{song.artist_name}</div>
              </div>
            <span className='ml-auto'>{song && song.duration? new Date(song.duration * 1000).toISOString().substr(14, 5): '00:00'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}