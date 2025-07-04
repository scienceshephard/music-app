import React, { useContext } from 'react'
import { MyContext } from '../../Context';
import { LuLoaderCircle } from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
import { FaArrowUp, FaPause } from 'react-icons/fa';
import { IoIosSkipForward, IoMdSkipBackward } from 'react-icons/io';
import { CiPlay1 } from 'react-icons/ci';

export const Mobile_Music_Player = () => {
  const { 
    selectedSong, 
    albumloading, 
    currentSongIndex, 
    duration, 
    handleSeek, 
    currentTime,
    isPlaying,
    togglePlay,
    skipNext,
    skipPrev,
    setShowMobileMusicPlayer,
    audioLoading,
    audioError,
    formatTime
  } = useContext(MyContext);

  // Don't render if no songs are selected
  if (!selectedSong || selectedSong.length === 0) {
    return null;
  }

  const currentSong = selectedSong[currentSongIndex];

  return (
    <div className='lg:hidden flex flex-col p-3 bg-white border-t border-gray-200 shadow-lg'>
    
      {/* Player Content */}
      {!albumloading && (
        <div className='space-y-2'>
          {/* Song info and basic controls */}
          <div className='flex items-center space-x-3'>
            {/* Album artwork */}
            <div className='relative'>
              <img
                src={currentSong?.image || 'https://via.placeholder.com/48x48?text=♪'}
                alt={currentSong?.name || 'Current song'}
                className="w-12 h-12 object-cover rounded"
              />
              
              {/* Loading/Error overlay */}
              {audioLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                  <LuLoaderCircle className="animate-spin text-white" size={16} />
                </div>
              )}
              
              {audioError && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-75 rounded flex items-center justify-center">
                  <FiAlertCircle className="text-white" size={16} />
                </div>
              )}
            </div>

            {/* Song details */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-sm font-medium truncate' title={currentSong?.name}>
                {currentSong?.name || 'Unknown Song'}
              </h3>
              <p className='text-xs text-gray-500 truncate' title={currentSong?.artist_name}>
                {currentSong?.artist_name || 'Unknown Artist'}
              </p>
            </div>

            {/* Quick controls */}
            <div className='flex items-center space-x-2'>
              <button 
                onClick={skipPrev}
                disabled={audioLoading || selectedSong.length <= 1}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoMdSkipBackward size={20} />
              </button>
              
              <button
                onClick={togglePlay}
                disabled={audioError}
                className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full transition-colors"
              >
                {audioLoading ? (
                  <LuLoaderCircle className="animate-spin" size={16} />
                ) : isPlaying ? (
                  <FaPause size={16} />
                ) : (
                  <CiPlay1 size={16} />
                )}
              </button>
              
              <button 
                onClick={skipNext}
                disabled={audioLoading ||selectedSong.length <= 1}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosSkipForward size={20} />
              </button>

              {/* Expand button */}
              <button 
                onClick={() => setShowMobileMusicPlayer(true)}
                className="p-1 hover:bg-gray-100 rounded ml-2"
              >
                <FaArrowUp size={20} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className='space-y-1'>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={duration ? (currentTime / duration) * 100 : 0} 
              onChange={handleSeek}
              disabled={audioLoading || audioError}
              className="w-full h-1 bg-gray-300 rounded appearance-none cursor-pointer disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #498000 0%, #498000 ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb 100%)`
              }} 
            />
            
            {/* Time display */}
            <div className="flex justify-between text-xs text-gray-400">
              <span>
                {
                  audioLoading? '00:00' : formatTime(currentTime)
                }
              </span>
              <span className="text-center">
                {selectedSong.length > 1 && `${currentSongIndex + 1}/${selectedSong.length}`}
              </span>
              <span>
                {
                  audioLoading? '00:00': formatTime(duration)
                }
              </span>
            </div>
          </div>

          {/* Error message */}
          {audioError && (
            <div className="text-xs text-red-500 text-center py-1">
              {audioError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}