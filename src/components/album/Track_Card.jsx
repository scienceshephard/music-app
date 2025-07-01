import React, { useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { MyContext } from '../../Context';
import { Ellipsis } from 'lucide-react';

let globalDropdownCloser = () => {};

export const Track_Card = ({ tracks, scrollContainer }) => {
  const { setSelectedSong, setAlbumloading, currentSongIndex, selectedSong } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  };

  const openDropdown = () => {
    globalDropdownCloser();
    globalDropdownCloser = () => setIsOpen(false);

    updateMenuPosition();
    setIsOpen(true);

    // Listen to horizontal scroll on the container
    scrollContainer?.current?.addEventListener('scroll', updateMenuPosition);
    window.addEventListener('resize', updateMenuPosition);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    scrollContainer?.current?.removeEventListener('scroll', updateMenuPosition);
    window.removeEventListener('resize', updateMenuPosition);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    isOpen ? closeDropdown() : openDropdown();
  };

  useEffect(() => {
    const handleClickOutside = () => closeDropdown();
    if (isOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleSelectedSong = (item) => {
    setTimeout(() => {
      setAlbumloading(false);
      setSelectedSong([item]);
      currentSongIndex(0);
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
        <button
          ref={buttonRef}
          className="cursor-pointer hover:text-gray-700 text-green-800 self-end"
          onClick={toggleDropdown}
          type="button"
        >
          <Ellipsis fontSize={18} />
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

      {isOpen &&
        createPortal(
          <div
            className="bg-white border border-gray-300 rounded shadow-lg z-[9999] w-fit"
            style={{
              position: 'absolute',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <span className="p-2.5 block text-sm hover:bg-gray-200">Add to favourite</span>
            <span className="p-2.5 block text-sm hover:bg-gray-200" 
            onClick={() => {
              const isAlreadyInQueue = selectedSong.find(song => song.id === tracks.id);
              if (!isAlreadyInQueue) {
                setSelectedSong(prev => [...prev, tracks]);
              }
              closeDropdown();
            }}
            >Add to queue</span>
            <span className="p-2.5 block text-sm hover:bg-gray-200">Share</span>
          </div>,
          document.getElementById('dropdown-root')
        )}
    </>
  );
};
