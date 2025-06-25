import React, { useContext, useState } from 'react'
import { Link } from 'react-router';
import { MyContext } from '../../Context';
import { EllipsisVertical } from 'lucide-react';

export const Track_Card = ({ tracks }) => {
    const { setSelectedSong, setAlbumloading, currentSongIndex } = useContext(MyContext);
    const [showMenu, setShowMenu] = useState(false);

    const handleSelectedSong = (item) => {
      setTimeout(() => {
        setAlbumloading(false)
        setSelectedSong([item])
        currentSongIndex(0)
      }, 500);
    }

    const handleMenuToggle = (e) => {
      e.stopPropagation();
      setShowMenu((prev) => !prev);
    };

    // Optional: Hide menu when clicking outside
    React.useEffect(() => {
      const handleClickOutside = () => setShowMenu(false);
      if (showMenu) {
        document.addEventListener('click', handleClickOutside);
      }
      return () => document.removeEventListener('click', handleClickOutside);
    }, [showMenu]);

    return (
        <div key={tracks.id} className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
            <img 
                src={tracks.image} 
                alt={`${tracks.name} album cover`} 
                className="w-28 h-28 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
                loading="lazy"
                onClick={() => handleSelectedSong(tracks)}
            />
                <div className="relative  w-fit inline-flex">
                  <button
                    className="cursor-pointer hover:text-gray-700 text-green-800"
                    onClick={handleMenuToggle}
                    type="button"
                  >
                    <EllipsisVertical fontSize={18} />
                  </button>
                  {showMenu && (
                    <div className="absolute left-0 top-full mt-1 min-w-[100px] bg-white border border-gray-300 rounded shadow-lg p-2 z-[999]">
                      <a href="#" className="px-1.5 block text-[13px]">Add</a>
                      <a href="#" className="py-1.5 block text-[13px]">Sub</a>
                    </div>
                  )}
                </div>
            <div className="flex flex-col justify-around ml-2 ">
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