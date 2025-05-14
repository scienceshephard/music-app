import { useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetchMusic";
import { MyContext } from "../../Context";


export const TopChart = () => {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const client_id = "117e1348";
  const limit=10 
  const list = { "albums" : "albums", "artists" : "artists", "tracks" : "tracks", "playlists" : "playlists"};
  const offsetRef=  useRef(Math.floor(Math.random() * 1000))
  const offset = offsetRef.current;
  
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
    
  const url = `${list.albums}`;
  const trackUrl = `${list.tracks}`

  const { fetchedData: tracks }= useFetch(trackUrl)
  const { error, isloading, fetchedData: albums } = useFetch(url);
  
  return (
    <div className='h-full flex flex-col p-4'>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Top-chart</p>
        
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
            {isloading && <div className="flex justify-center overflow-hidden w-full">
                <div className="animate-pulse flex space-x-4 ">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-lg bg-gray-200 h-40 w-28"></div>
                  ))}
                </div>
            </div>}
            
            {/* Album cards */}
            {!isloading && albums && albums.length > 0 ? (
              albums.map(item => (
                <div key={item.id} className="flex flex-col bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
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
              !isloading && <div> erorr: <a href="/">Refresh page</a> </div>
            )}
          </div>
        </div>
        {/* <div className=""> */}
          <h1 className="font-medium text-2xl">You may also like</h1>
            <div className="flex gap-5 mt-4 pb-4 flex-col h-110  overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* isloading */}
              {isloading && <div className="h-[500px]  overflow-hidden w-full">
                            <div className="animate-pulse flex flex-col space-y-3">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className=" bg-gray-200 gap-3 h-[100px] p-2 flex w-full">
                                  <div className="bg-gray-600 w-24 h-full"></div>
                                  <div className="flex flex-col w-1/3 h-full justify-around ">
                                    <div className="bg-gray-500 w-full h-3"></div>
                                    <div className="bg-gray-500 w-full h-3"></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                </div>}
              {
                !isloading && tracks && tracks.length > 0 ? (
                  tracks.map(item => (
                    <div key={item.id} className="flex bg-gray-200 hover:bg-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow w-full">
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
                  !isloading && <div> erorr: { error }</div>
                )
              }
            </div>
        {/* </div> */}
      </div>
    </div>
  );
};