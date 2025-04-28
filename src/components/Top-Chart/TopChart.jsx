import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetchMusic";

export const TopChart = () => {
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const api_key = "e623445a9ab6e9e34add831c86022146";

  const web_url = "http://ws.audioscrobbler.com/2.0"

  const apiUrl= `${web_url}?method=chart.gettoptracks&api_key=${api_key}&format=json&limit`;

  const { setselectedDuration, selectedDuration, error, isloading, dataTopChartList } = useFetch(apiUrl);

  const handleSelectedDuration = (event) => {
    setselectedDuration(event.target.value);
  };

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

  return (
    <div className='h-full flex flex-col p-4'>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Top-chart</p>
        <select 
          name="duration" 
          value={selectedDuration} 
          onChange={handleSelectedDuration} 
          className='ml-auto border-2 rounded-3xl p-2 text-gray-600 hover:cursor-pointer'
        >
          <option value="Today">Today</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>

      {error && <div className="my-auto text-red-500"> {error} </div>}
      
      {/* Slider wrapper with fixed width - adjust the max-w-md (medium) to your needs */}
      <div className="relative mt-5 max-w-md w-full">
        {/* Slider navigation buttons */}
        {hasScrolledSome() && (
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        { !error && (hasMoreToScroll() && (
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))
        }
        
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
            {!isloading && dataTopChartList && dataTopChartList.length > 0 ? (
              dataTopChartList.map(item => (
                <div key={item.id} className="flex flex-col border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow min-w-[110px] max-w-[110px]">
                  <img 
                    src={item.image} 
                    alt={`${item.name} album cover`} 
                    className="w-full h-24 object-cover rounded-md mb-2" 
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
              !isloading && <div className="w-full text-center text-gray-500">No albums found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};