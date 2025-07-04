import { useContext, useState } from 'react';
import { MyContext } from '../../Context';
import { Playlist } from '../../pages/trackList/Playlist';
import { LuLoaderCircle, LuRepeat1 } from 'react-icons/lu';
import { FiAlertCircle } from 'react-icons/fi';
import { FaMinus, FaPause } from 'react-icons/fa';
import { IoIosSkipForward, IoMdRepeat, IoMdSkipBackward } from 'react-icons/io';
import { CiPlay1, CiShuffle } from 'react-icons/ci';
import { CgRepeat } from 'react-icons/cg';
import { RiMenuFold2Fill } from 'react-icons/ri';
import { IoShareSocial } from 'react-icons/io5';

export default function Music_Player() {
  const { 
    currentTime,  
    duration, 
    isPlaying, 
    togglePlay, 
    handleSeek, 
    shuffle, 
    repeat, 
    currentSongIndex, 
    skipPrev, 
    skipNext,
    selectedSong, 
    showMobileMusicPlayer, 
    audioLoading,
    audioError,
    formatTime,
    repeatMode
  } = useContext(MyContext);
  const handleCopyLink =(link) =>{
    navigator.clipboard.writeText(link)
      .then(()=>{
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }).catch(err=>{
        console.error('Failed to copy link:', err);
        
      })
  }
  const [showMessage, setShowMessage] =useState(false);
  const [showPlayList, setshowPlayList] = useState(false);
  const [animatePlaylist, setAnimatePlaylist] = useState(false); 
  // Don't render if no songs are selected
  if (!selectedSong || selectedSong.length === 0) {
    return (
      <div className='bg-[#FAFAFA] h-dvh transition-all duration-300 text-center mb-20 lg:mb-0 flex-col lg:border-2 p-[20px] border-gray-300 flex-1/2'>
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-lg">No songs selected</p>
          <p className="text-sm">Choose a song to start playing</p>
        </div>
      </div>
    );
  }

  const currentSong = selectedSong[currentSongIndex];

  return (
    <div className='bg-[#FAFAFA] h-dvh transition-all duration-300 lg:text-center flex-col border-2 px-[20px] lg:border-gray-300 flex-1/2'>
      

      {/* Loading animation */}
      {audioLoading && (
        <div className='space-y-2.5 h-full animate-pulse'>
          <div className='w-1/3 h-8 bg-gray-300 mx-auto rounded'></div>
          <div className='h-[300px] w-[50%] rounded-2xl bg-gray-300 mx-auto'></div>
          <div className='w-1/2 mx-auto flex items-center justify-between'>
            <CiShuffle color='grey' />
            <div className='flex flex-col gap-3 w-[60%] items-center'>
              <span className='h-5 bg-gray-400 w-[100%] rounded'></span>
              <span className='h-5 bg-gray-400 w-[60%] rounded'></span>
            </div>
            <IoMdRepeat color='grey' />
          </div>
        </div>
      )}

      {/* Main player content */}
      {!audioLoading && (
        <div className={`${showMobileMusicPlayer ? 'h-dvh  flex flex-col pt-5 ' : ''}`}>
          <h1 className='font-medium text-2xl mb-4 text-center'>Now Playing</h1>
          
          <div className='flex flex-col w-[80%]  mx-auto'>
            {/* Album artwork */}
            <div className='h-[40vh] flex justify-center relative'>
              <img 
                src={currentSong?.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                alt={currentSong?.name || "Album image"}  
                className='w-fit h-full rounded-2xl object-contain'
              />
              
              {/* Audio loading overlay */}
              {audioLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                  <LuLoaderCircle className="animate-spin text-white"  />
                </div>
              )}
              
              {/* Audio error overlay */}
              {audioError && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-75 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <FiAlertCircle  className="mx-auto mb-2" />
                    <p className="text-sm">{audioError}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Song info and controls */}
            <div className='mt-4 flex items-center justify-between'>
              <button>
                <CiShuffle
                  onClick={() => shuffle(selectedSong)} 
                  className='hover:cursor-pointer hover:text-[#498000] text-[#008000] transition-colors'   
                />
              </button>
              <div className='flex flex-col text-center flex-1 mx-4 sm:mx-4 min-w-0'>
                <span className='text-base sm:text-lg md:text-xl font-medium truncate' title={currentSong?.name}>
                  {currentSong?.name || 'Unknown Song'}
                </span>
                <span className='text-xs sm:text-sm md:text-base text-gray-600 truncate' title={currentSong?.artist_name}>
                  {currentSong?.artist_name || 'Unknown Artist'}
                </span>
              </div>
              <button
                onClick={() => {
                  console.log(repeatMode);
                  repeat();
                }}
              >
                {(() => {
                  switch (repeatMode) {
                    case "one":
                      return (
                        <LuRepeat1
                          className="hover:cursor-pointer hover:text-[#498000] text-green-700 transition-colors"
                        />
                      );
                    case "all":
                      return (
                        <CgRepeat
                          className="hover:cursor-pointer hover:text-[#498000] text-green-700 transition-colors"
                        />
                      );
                    case "off":
                      return (
                        <IoMdRepeat
                          className="hover:cursor-pointer hover:text-[#498000] text-gray-500 transition-colors"
                        />
                      );
                    default: return;
                  }
                })()}
              </button>
            </div>

            {/* Progress bar */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={duration ? (currentTime / duration) * 100 : 0} 
              onChange={handleSeek} 
              disabled={audioLoading || audioError}
              style={{
                background: `linear-gradient(to right, #498000 0%, #498000 ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb 100%)`
              }}
              className="w-full h-2 bg-gray-300 rounded mb-2 appearance-none cursor-pointer disabled:cursor-not-allowed hover:bg-gray-400 transition-colors" 
            />
            
            {/* Time display */}
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>{audioLoading? '00:00' : formatTime(currentTime)}</span>
              <span>{audioLoading? '00:00' : formatTime(duration)}</span>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={skipPrev} 
                disabled={audioLoading ||selectedSong.length <= 1}
                className="cursor-pointer hover:text-[#498000] text-[#008000] transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <IoMdSkipBackward  />
              </button>
              
              <button
                onClick={togglePlay}
                disabled={audioError}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-4 rounded-full transition-colors disabled:cursor-not-allowed cursor-pointer"
              >
                {audioLoading ? (
                  <LuLoaderCircle className="animate-spin" />
                ) : isPlaying ? (
                  <FaPause />
                ) : (
                  <CiPlay1 />
                )}
              </button>
              
              <button 
                onClick={skipNext} 
                disabled={audioLoading ||selectedSong.length <= 1}
                className="cursor-pointer hover:text-[#498000] text-[#008000] transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <IoIosSkipForward  />
              </button>
            </div>

            {/* Track info */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Track {currentSongIndex + 1} of {selectedSong.length}
            </div>
          </div>
          <div className='lg:hidden relative text-green-400 flex items-center justify-between p-2 mt-10'>
            <button onClick={()=> handleCopyLink(currentSong?.shareurl)} className=' p-2 w-fit cursor-pointer'>
              <IoShareSocial />
            </button>
            {showMessage && <span className='absolute bottom-full text-white px-2 py-1 rounded-xl -rotate-25 bg-black '>Copied to clipboard!!</span>}
            <button onClick={()=> {
                setshowPlayList(true)
                setAnimatePlaylist(true);
                }
              } className=' p-2 w-fit cursor-pointer'>
              <RiMenuFold2Fill />
            </button>
          </div>
            {showPlayList && showMobileMusicPlayer && selectedSong && (
            <div 
              className={`
                fixed bottom-0 left-0 w-full z-30 bg-white border-t border-green-500 rounded-t-xl transition-transform duration-500 ease-in-out
                ${animatePlaylist ? 'translate-y-0' : 'translate-y-full'}
              `}
              onTransitionEnd={() => {
                if (!animatePlaylist) setshowPlayList(false); // Only hide after animation ends
              }}
            >
              <button 
                onClick={() => setAnimatePlaylist(false)}
                className='w-full text-green-700'
              >
                <FaMinus style={{ width: '100%', height: '48px', display: 'block' }} />
              </button>
              <Playlist />
            </div>
          )}

        </div>
      )}
    </div>
  );
}