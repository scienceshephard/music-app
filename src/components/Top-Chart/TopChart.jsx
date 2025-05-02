import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetchMusic";
import { MyContext } from "../../Context";
import dayjs from 'dayjs'


export const TopChart = () => {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const client_id = "117e1348";
  const limit=10 
  const list = { "albums" : "albums", "artists" : "artists", "tracks" : "tracks", "playlists" : "playlists"};
  const offset= Math.floor(Math.random() * 1000)
  
  // format trach duration
  const formatTrackDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  //Scrollbutton
  const scroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    const newPosition = direction === 'left' 
      ? Math.max(scrollPosition - scrollAmount, 0)
      : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  const hasMoreToScroll = () => {
    const container = sliderRef.current;
    if (!container) return false;
    
    return scrollPosition < (container.scrollWidth - container.clientWidth);
  };

  const hasScrolledSome = () => {
    return scrollPosition > 0;
  };

  //Latest albums
  const {selectedDuration, setselectedDuration} = useContext(MyContext)
  const getDateRange = () => {
    const today = dayjs().format("YYYY-MM-DD");
    if (selectedDuration === "Today") {
      return `${today}_${today}`;
    } else if (selectedDuration === "Week") {
      const weekAgo = dayjs().subtract(7, 'day').format("YYYY-MM-DD");
      return `${weekAgo}_${today}`;
    } else if (selectedDuration === "Month") {
      const monthAgo = dayjs().subtract(30, 'day').format("YYYY-MM-DD");
      return `${monthAgo}_${today}`;
    }
    return "";
  };
  const dateRange= getDateRange()
  
  const url = `${list.albums}?client_id=${client_id}&format=jsonpretty&limit=${limit}&offset=${offset}&datebetween=${dateRange}`;
  const trackUrl = `${list.tracks}?client_id=${client_id}&format=jsonpretty&limit=${limit}&offset=${offset}&datebetween=${dateRange}`
  useEffect(() => {}, [offset])
  
  const { fetchedData: tracks }= useFetch(trackUrl)
  const { error, isloading, fetchedData: albums } = useFetch(url);
  

  return (
    <div className='h-full flex flex-col p-4'>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Top-chart</p>
        <select 
          name="duration" 
          value={selectedDuration} 
          onChange={(event)=>{setselectedDuration(event.target.value)}} 
          className='ml-auto border-2 rounded-3xl p-2 text-gray-600 hover:cursor-pointer'
        >
          <option value="Today" >Today</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>

      {error && <div className="my-auto text-red-500"> {error} </div>}
      
      {/* Slider wrapper with fixed width - adjust the max-w-md (medium) to your needs */}
      <div className="relative  max-w-md w-full">
        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          <div className="flex gap-5 pb-4">
            {/* Loading animation */}
            {isloading && (
              <div className="flex justify-center w-full">
                <div className="animate-pulse flex space-x-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-lg bg-gray-200 h-40 w-28"></div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Album cards */}
            {!isloading && albums && albums.length > 0 ? (
              albums.map(item => (
                <div key={item.id} className="flex flex-col border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
                  <img 
                    src={item.image} 
                    alt={`${item.name} album cover`} 
                    className="w-full h-24 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
                    loading="lazy"
                  />
                  <Link 
                    to={`/artist/${item.artist_id}`} 
                    className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
                  >
                    {item.artist_name}
                  </Link>
                  <span className="text-xs text-gray-700 truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>
              ))
            ) : (
              !isloading && <div className="w-full text-center text-gray-500">Network error. Refresh you browser</div>
            )}
          </div>
        </div>
        <div className="">
          <h1 className="font-medium text-2xl">You may also like</h1>
            <div className="flex gap-5 mt-4 pb-4 flex-col h-96  overflow-y-auto">
              {
                tracks && tracks.length > 0 ? (
                  tracks.map(item => (
                    <div key={item.id} className="flex border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow w-full">
                      <img 
                        src={item.image} 
                        alt={`${item.name} album cover`} 
                        className="w-24 h-24 object-cover rounded-md mb-2 hover:blur-[2px] hover:cursor-pointer" 
                        loading="lazy"
                      />
                      <div className="flex flex-col justify-around ml-2 overflow-hidden">
                        <Link 
                          to={`/artist/${item.artist_id}`} 
                          className="text-blue-600 hover:text-blue-950 text-sm font-medium truncate"
                        >
                          {item.artist_name}
                        </Link>
                        <span className="text-xs text-gray-700 truncate" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 ml-auto self-center">{formatTrackDuration(item.duration)}</span>
                    </div>
                  ))
                ) : (
                  !isloading && (
                    <div className="animate-pulse h-[500px] flex flex-col w-full gap-2.5">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                              <div key={item} className=" bg-gray-200 gap-3 h-[500px] p-2 flex w-full">
                                <div className="bg-gray-600 w-24 h-full"></div>
                                <div className="flex flex-col w-1/3 h-full justify-around ">
                                  <div className="bg-gray-500 w-full h-3"></div>
                                  <div className="bg-gray-500 w-full h-3"></div>
                                </div>
                              </div>
                            ))}
                    </div>
                  )
                )
              }
            </div>
        </div>
      </div>
    </div>
  );
};