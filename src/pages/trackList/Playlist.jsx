import React, { useContext } from 'react'
import { MyContext } from '../../Context';

export const Playlist = () => {
  const { selectedSong, currentSongIndex } = useContext(MyContext);
  console.log(selectedSong, currentSongIndex);
  
  return (
    <div className='p-4 bg-white shadow-md w-full max-w-md'>
      <h2 className="text-xl font-bold mb-2">Playlist</h2>
      {selectedSong.length === 0 ? (
        <p className="text-gray-500">No songs selected.</p>
      ) : (
        <ul className=''>
          {selectedSong.map((song, idx) => (
            <li key={song.id || idx} className="mb-4 border flex items-center gap-3">
              <img
                src={song.image || 'https://via.placeholder.com/50'}
                alt={song.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <div className="font-semibold">{song.name}</div>
                <div className="text-sm text-gray-600">{song.artist_name}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}