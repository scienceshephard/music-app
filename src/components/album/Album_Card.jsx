import React from 'react'
import { Link } from 'react-router'

export const Album_Card = ({album, handleSelectedSong}) => {
    

  return (
        <div key={album?.id} className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]"  onClick={ ()=> handleSelectedSong(album) }>
            <img 
            src={album?.image} 
            alt={`${album.name} album cover`} 
            className="w-full h-24 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
            loading="lazy"
            />
            <Link 
            to={`/artist/${album?.artist_id}`} 
            className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
            >
            {album?.artist_name}
            </Link>
            <span className="text-xs text-gray-700 truncate" title={album?.name}>
            {album?.name}
            </span>
        </div>
  )
}
