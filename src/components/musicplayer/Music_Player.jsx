
import { useContext, useEffect } from 'react';
import { MyContext } from '../../Context';
import { Pause, Play, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';



export default function Music_Player() {
  
  const { currentTime, setCurrentTime, duration, setDuration, isPlaying, setIsPlaying, audioRef, currentSongIndex, setCurrentSongIndex, albumloading, selectedSong} = useContext(MyContext)


  const togglePlay =() =>{
    setIsPlaying(prev =>!prev);
  }
  const shuffle =(tracks) =>{
    console.log(tracks);
  }
  const reapeat =(tracks)=>{
    console.log(tracks);
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
            <Shuffle size='32' className='animate-pulse'  color='grey' />
              <div className='flex flex-col gap-3 items-center'>
                  <span className='h-5 animate-pulse bg-gray-400 w-30'></span>
                  <span className='h-5 animate-pulse bg-gray-400 w-25'></span>
              </div>
            <Repeat size='32' className='animate-pulse' color='grey' />
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
            <Shuffle onClick={()=> shuffle(selectedSong)} className='hover:cursor-pointer hover:text-[#498000] text-[#008000]'  size='32' />
              <div className='flex flex-col'>
                  <span className='text-2xl font-medium'>{ selectedSong[currentSongIndex]?.name }</span>
                  <span>{ selectedSong[currentSongIndex]?.artist_name }</span>
              </div>
            <Repeat onClick={()=> reapeat(selectedSong)} className='hover:cursor-pointer hover:text-[#498000] text-[#008000]' size='32' />
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