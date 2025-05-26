import React from 'react'
import { Link } from 'react-router';

export const Track_Card = ({ handleSelectedSong, tracks }) => {

  // format track duration
  const formatTrackDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
return (
        <div key={tracks.id} onClick={() => handleSelectedSong(tracks)} className="flex bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow w-full">
            <img 
                src={tracks.image} 
                alt={`${tracks.name} album cover`} 
                className="w-24 h-24 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
                loading="lazy"
            />
            <div className="flex flex-col justify-around ml-2 overflow-hidden">
                <Link 
                to={`/artist/${tracks.artist_id}`} 
                className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
                >
                {tracks.artist_name}
                </Link>
                <span className="text-xs text-gray-700 truncate" title={tracks.name}>
                {tracks.name}
                </span>
            </div>
            <span className="text-sm text-gray-700 ml-auto self-center">
                {formatTrackDuration(tracks.duration)}
            </span>
        </div>
  )
}
