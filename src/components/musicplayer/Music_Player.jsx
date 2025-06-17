
import { useContext, useEffect } from 'react';
import { MyContext } from '../../Context';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';



export default function Music_Player() {
  
  const { currentTime, setCurrentTime, duration, setDuration, isPlaying, setIsPlaying, audioRef, currentSongIndex, setCurrentSongIndex, albumloading, selectedSong} = useContext(MyContext)


  const togglePlay =() =>{
    setIsPlaying(prev =>!prev);
  }

  const skipNext = () =>{
    const nextIndex = (currentSongIndex + 1 ) % selectedSong.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
    audioRef.current?.play().catch(err => console.error('Playback error: ', err));
  }
  const skipPrev = () =>{
    const prevIndex = (currentSongIndex - 1 + selectedSong.length ) % selectedSong.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
    audioRef.current?.play().catch(err => console.error('Playback error: ', err));
  }
  const handleSeek = (e) =>{
    const audio = audioRef.current
    if(!audio || duration === 0) return;
    const percent = e.target.value;
    const newTime = (percent / 100 ) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }
  useEffect(()=>{
    const audio = audioRef.current;
    if(!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    if(audio.readyState >= 1)
      updateDuration();

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSongIndex])
  useEffect(()=>{
    const audio = audioRef.current;
    if(isPlaying && audio)
      audio.play()
    else if(audio)
      audio.pause();
  }, [currentSongIndex, isPlaying])

  return (
    <div className='bg-[#FAFAFA] text-center border-1 border-solid p-[20px] border-gray-300 flex-1/2'>
        {/*Loading animation */}
      {
        albumloading &&
        <div className='space-y-2.5'>
          <div className='w-40 h-8 animate-pulse bg-gray-300 mx-auto'></div>
        <div className='h-[300px] w-[300px]  rounded-2xl animate-pulse bg-gray-300 mx-auto'></div>
        <div className='w-1/2 mx-auto  flex items-center justify-between'>
          {/* AddMusic Icon */}
          <svg className='w-8 animate-pulse' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
                <path fill="none" d="M0 0h24v24H0z"/>
                <path fill="gray" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
            </g>
          </svg>

            <div className='flex flex-col gap-3 items-center'>
                <span className='h-5 animate-pulse bg-gray-400 w-30'></span>
                <span className='h-5 animate-pulse bg-gray-400 w-25'></span>
            </div>
            {/* Favorite Icon */}
          <svg className='w-8 animate-pulse' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                  <path fill="none" d="M0 0H24V24H0z"/>
                  <path fill="gray" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
              </g>
          </svg>
          </div>
        </div>
      }
      {!albumloading &&
      <div>
        <h1 className='font-medium text-2xl'>Now Playing</h1>
        <div className='flex flex-col h-[300px] w-[300px] ml-auto mr-auto'>
          <div className='h-full'>
          <img src={ selectedSong?.[currentSongIndex]?.image } alt={ selectedSong?.[currentSongIndex]?.name || "Album image"}  className='w-full h-full  rounded-2xl '/>
          </div>
          <div className='mt-auto flex items-center justify-between'>
              <button className='hover:cursor-pointer'>
              <svg className='w-8 fill-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                  </g>
              </svg>
            </button>
              <div className='flex flex-col'>
                  <span className='text-2xl font-medium'>{ selectedSong[currentSongIndex]?.name }</span>
                  <span>{ selectedSong[currentSongIndex]?.artist_name }</span>
              </div>
            <button className='hover:cursor-pointer'>
              <svg className='w-8 stroke-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                      <path fill="none" stroke='none' d="M0 0H24V24H0z"/>
                      <path fill="none"  strokeWidth="2" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
                  </g>
              </svg>

            </button>
          </div>
          <audio src={selectedSong[currentSongIndex]?.audio} ref={audioRef}  preload='metadata' />
          <input type="range" min={"0"} max={"100"} value={ duration ? (currentTime /duration) *100: 0} onChange={handleSeek} className="w-full h-2 bg-gray-600 rounded mb-4 appearance-none cursor-pointer" />
          <div className="flex justify-between text-xs text-gray-400 mb-4">
            <span>{duration? new Date(currentTime * 1000).toISOString().substr(14, 5): '00:00'}</span>
            <span>{duration? new Date(duration * 1000).toISOString().substr(14, 5): '00:00'}</span>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button onClick={skipPrev} className="hover:text-blue-400">
              <SkipBack size={32} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={skipNext} className="hover:text-blue-400">
              <SkipForward size={32} />
            </button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}