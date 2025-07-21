import React, { useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { MyContext } from '../../Context';
import { FaEllipsisH } from 'react-icons/fa';
import { DropdownMenu } from './DropdownMenu';


export const Track_Card = ({ tracks, scrollContainer }) => {
  const { favourite, setFavourite, setSelectedSong, setAlbumloading, setCurrentSongIndex, selectedSong } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const menuItems= [
    {
      label: "Add to favourite",
      onClick: ()=>{
        const isAlreadyInFavourite = favourite?.find(song => song.id === tracks.id);
        if (!isAlreadyInFavourite) setFavourite(prev => [...prev, tracks]);
      }
    },
    {
      label: "Add to queue",
      onClick: () => {
        const isAlreadyInQueue = selectedSong.find(song => song.id === tracks.id);
        if (!isAlreadyInQueue) setSelectedSong(prev => [...prev, tracks]);
      },
    },
    {
      label: "Share",
      onClick: () => {
        // Implement share logic here
      },
    },
  ]

  const handleSelectedSong = (item) => {
    setTimeout(() => {
      setAlbumloading(false);
      setSelectedSong([item]);
      setCurrentSongIndex(0);
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
        <button
          ref={buttonRef}
          className="cursor-pointer hover:text-gray-700 text-green-800"
          onClick={e=>{
            e.stopPropagation();
            setIsOpen(prev => !prev)
          }}
          type="button"
        >
          <FaEllipsisH fontSize={22} />
        </button>
        <img
          src={tracks.image}
          alt={`${tracks.name} album cover`}
          className="w-28 h-28 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer"
          loading="lazy"
          onClick={() => handleSelectedSong(tracks)}
        />
        <div className="flex flex-col justify-around ml-2">
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
      <DropdownMenu buttonRef={buttonRef} isOpen={isOpen} menuItems={menuItems} menuPosition={menuPosition} scrollContainer={scrollContainer} setMenuPosition={setMenuPosition} setIsOpen={setIsOpen} nppm/>
    </>
  );
};
