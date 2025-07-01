import { useContext } from 'react';
import { MyContext } from '../../Context';
import { Pause, Play, SkipBack, SkipForward, Repeat, Shuffle, ArrowDown, AlertCircle, Loader } from 'lucide-react';
import { Playlist } from '../../pages/trackList/Playlist';

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
    albumloading, 
    selectedSong, 
    showMobileMusicPlayer, 
    setShowMobileMusicPlayer,
    audioLoading,
    audioError,
    formatTime
  } = useContext(MyContext);
  // Don't render if no songs are selected
  if (!selectedSong || selectedSong.length === 0) {
    return (
      <div className='bg-[#FAFAFA] transition-all duration-300 text-center mb-20 lg:mb-0 h-full flex-col border-2 p-[20px] border-gray-300 flex-1/2'>
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-lg">No songs selected</p>
          <p className="text-sm">Choose a song to start playing</p>
        </div>
      </div>
    );
  }

  const currentSong = selectedSong[currentSongIndex];

  return (
    <div className='bg-[#FAFAFA] transition-all duration-300 text-center mb-20 lg:mb-0 h-full flex-col border-2 p-[20px] border-gray-300 flex-1/2'>
      {/* Mobile close button */}
      {showMobileMusicPlayer && (
        <button className='transition shadow-sm shadow-green-900 absolute left-[-10px] top-[-1px] p-2 bg-green-900 w-fit text-white rounded-br-lg'>
          <ArrowDown onClick={() => setShowMobileMusicPlayer(false)} />
        </button>
      )}

      {/* Loading animation */}
      {albumloading && (
        <div className='space-y-2.5 h-full animate-pulse'>
          <div className='w-1/3 h-8 bg-gray-300 mx-auto rounded'></div>
          <div className='h-[300px] w-[50%] rounded-2xl bg-gray-300 mx-auto'></div>
          <div className='w-1/2 mx-auto flex items-center justify-between'>
            <Shuffle size='32' color='grey' />
            <div className='flex flex-col gap-3 w-[60%] items-center'>
              <span className='h-5 bg-gray-400 w-[100%] rounded'></span>
              <span className='h-5 bg-gray-400 w-[60%] rounded'></span>
            </div>
            <Repeat size='32' color='grey' />
          </div>
        </div>
      )}

      {/* Main player content */}
      {!albumloading && (
        <div className={`${showMobileMusicPlayer ? 'h-full flex flex-col justify-center' : ''}`}>
          <h1 className='font-medium text-2xl mb-4'>Now Playing</h1>
          
          <div className='flex flex-col h-[300px] w-[300px] ml-auto mr-auto'>
            {/* Album artwork */}
            <div className='h-full relative'>
              <img 
                src={currentSong?.image || 'https://via.placeholder.com/300x300?text=No+Image'} 
                alt={currentSong?.name || "Album image"}  
                className='w-full h-full rounded-2xl object-cover'
              />
              
              {/* Audio loading overlay */}
              {audioLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                  <Loader className="animate-spin text-white" size={32} />
                </div>
              )}
              
              {/* Audio error overlay */}
              {audioError && (
                <div className="absolute inset-0 bg-red-500 bg-opacity-75 rounded-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <AlertCircle size={32} className="mx-auto mb-2" />
                    <p className="text-sm">{audioError}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Song info and controls */}
            <div className='mt-4 flex items-center justify-between'>
              <Shuffle 
                onClick={() => shuffle(selectedSong)} 
                className='hover:cursor-pointer hover:text-[#498000] text-[#008000] transition-colors'  
                size='32' 
              />
              <div className='flex flex-col text-center flex-1 mx-4'>
                <span className='text-xl font-medium truncate' title={currentSong?.name}>
                  {currentSong?.name || 'Unknown Song'}
                </span>
                <span className='text-gray-600 truncate' title={currentSong?.artist_name}>
                  {currentSong?.artist_name || 'Unknown Artist'}
                </span>
              </div>
              <Repeat 
                onClick={() => repeat(selectedSong)} 
                className='hover:cursor-pointer hover:text-[#498000] text-[#008000] transition-colors' 
                size='32' 
              />
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
                className="hover:text-blue-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <SkipBack size={32} />
              </button>
              
              <button
                onClick={togglePlay}
                disabled={audioError}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-4 rounded-full transition-colors disabled:cursor-not-allowed"
              >
                {audioLoading ? (
                  <Loader className="animate-spin" size={24} />
                ) : isPlaying ? (
                  <Pause size={24} />
                ) : (
                  <Play size={24} />
                )}
              </button>
              
              <button 
                onClick={skipNext} 
                disabled={audioLoading ||selectedSong.length <= 1}
                className="hover:text-blue-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <SkipForward size={32} />
              </button>
            </div>

            {/* Track info */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Track {currentSongIndex + 1} of {selectedSong.length}
            </div>
          </div>
        </div>
      )}
      {/* { <Playlist />} */}
    </div>
  );
}