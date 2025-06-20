import React, { useContext } from 'react'
import { Link } from 'react-router';
import { MyContext } from '../../Context';

export const Track_Card = ({ tracks }) => {

    //Selected song
    const { setSelectedSong ,setAlbumloading, currentSongIndex } = useContext(MyContext);
    const handleSelectedSong = (item) => {
      setTimeout(() => {
        setAlbumloading(false)
        setSelectedSong([item])
        currentSongIndex(0)
        
      }, 500);
    }

return (
        <div key={tracks.id} className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
            <img 
                src={tracks.image} 
                alt={`${tracks.name} album cover`} 
                className="w-28 h-28 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
                loading="lazy"
                onClick={() => handleSelectedSong(tracks)}
            />
            <div className="flex flex-col justify-around ml-2 overflow-hidden">
                <Link 
                to={`/artist/${tracks?.artist_name}`} 
                className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
                >
                {tracks?.artist_name}
                </Link>
                <span className="text-xs text-gray-700 truncate" title={tracks.name}>
                {tracks.name}
                </span>
            </div>
        </div>
  )
}
