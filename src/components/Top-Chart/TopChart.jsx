import { useState, useRef, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetchMusic";
import { Album_Card } from "../album/Album_Card";
import { Track_Card } from "../album/Track_Card";
import { MyContext } from "../../Context";

export const TopChart = () => {
  const sliderRef = useRef(null);
  const trackListRef = useRef(null);
  const list = { "albums" : "albums", "artists" : "artists", "tracks" : "tracks", "playlists" : "playlists"};
  // Use separate offsets for albums and tracks
  const [albumOffset, setAlbumOffset] = useState(Math.floor(Math.random() * 1000));
  const [trackOffset, setTrackOffset] = useState(Math.floor(Math.random() * 1000));
  

    
  const albumUrl = `${list.albums}`;
  const trackUrl = `${list.tracks}`;

  // Use separate fetch hooks for albums and tracks with their own offsets
  const {
    fetchedData: tracks,
    isloading: loadingTrack,
    hasMore: moreTracks
  } = useFetch(trackUrl, trackOffset);
  
  const { 
    error, 
    isloading: loadingAlbums, 
    fetchedData: albums, 
    hasMore: moreAlbums 
  } = useFetch(albumUrl, albumOffset);

  // Track previous data to append new items
  const { allAlbums, setAllAlbums, allTracks, setAllTracks } = useContext(MyContext)

  // Update accumulated data when new data arrives
  useEffect(() => {
    if (albums && albums.length > 0) {
      setAllAlbums(prev => {
        // Filter out duplicates based on id
        const newAlbums = albums.filter(
          album => !prev.some(existingAlbum => existingAlbum.id === album.id)
        );
        return [...prev, ...newAlbums];
      });
    }
  }, [albums]);

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setAllTracks(prev => {
        // Filter out duplicates based on id
        const newTracks = tracks.filter(
          track => !prev.some(existingTrack => existingTrack.id === track.id)
        );
        return [...prev, ...newTracks];
      });
    }
  }, [tracks]);

  // Horizontal scrolling for albums
  useEffect(() => {
    const slide = sliderRef.current;
    if (!slide) return;

    const handleScroll = () => {
      if (
        slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - 20 && 
        moreAlbums && 
        !loadingAlbums
      ) {
        setAlbumOffset(prev => prev + 10);
      }
    };

    slide.addEventListener('scroll', handleScroll);
    return () => slide.removeEventListener('scroll', handleScroll);
  }, [moreAlbums, loadingAlbums]);

  // Vertical scrolling for tracks
  useEffect(() => {
    const trackDiv = trackListRef.current;
    if (!trackDiv) return;

    const handleScroll = () => {
      if (
        trackDiv.scrollTop + trackDiv.clientHeight >= trackDiv.scrollHeight - 20 && 
        moreTracks && 
        !loadingTrack
      ) {
        setTrackOffset(prev => prev + 10);
      }
    };

    trackDiv.addEventListener('scroll', handleScroll);
    return () => trackDiv.removeEventListener('scroll', handleScroll);
  }, [moreTracks, loadingTrack]);

  return (
    <div className='h-full flex flex-col p-4'>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Top-chart</p>
      </div>

      {error && <div className="my-auto text-red-500"> {error} </div>}
      
      {/* Slider wrapper with fixed width - adjust the max-w-md (medium) to your needs */}
      <div className="relative max-w-md w-full">
        {/* Slider container */}
        <div 
          ref={sliderRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5 pb-4">
            {/* Loading animation */}
            {loadingAlbums && allAlbums.length === 0 && (
              <div className="flex justify-center overflow-hidden w-full">
                <div className="animate-pulse flex space-x-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-lg bg-gray-200 h-40 w-28"></div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Album cards */}
            {allAlbums.length > 0 ? (
              allAlbums.map(item => (
                <Album_Card key={item.id} album={item} />
              ))
            ) : (
              !loadingAlbums && <div>Error: <a href="/">Refresh page</a></div>
            )}
            
            {/* Loading indicator at the end of albums */}
            {loadingAlbums && allAlbums.length > 0 && (
              <div className="flex justify-center">
                <div className="rounded-lg bg-gray-200 h-40 w-28 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        <h1 className="font-medium text-2xl">You may also like</h1>
        <div 
          className="flex gap-5 mt-4 pb-4 flex-col h-110 overflow-y-auto scroll-smooth" 
          ref={trackListRef} 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Initial loading */}
          {loadingTrack && allTracks.length === 0 && (
            <div className="h-[500px] overflow-hidden w-full">
              <div className="animate-pulse flex flex-col space-y-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-gray-200 gap-3 h-[100px] p-2 flex w-full">
                    <div className="bg-gray-600 w-24 h-full"></div>
                    <div className="flex flex-col w-1/3 h-full justify-around">
                      <div className="bg-gray-500 w-full h-3"></div>
                      <div className="bg-gray-500 w-full h-3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Track list */}
          {allTracks.length > 0 ? (
            allTracks.map(item => ( <Track_Card key={item.id} tracks ={ item } />)
          )
          ) : (
            !loadingTrack && <div>Error: {error}</div>
          )}
          
          {/* Loading indicator at the end of tracks */}
          {loadingTrack && allTracks.length > 0 && (
            <div className="bg-gray-200 gap-3 h-[100px] p-2 flex w-full animate-pulse">
              <div className="bg-gray-600 w-24 h-full"></div>
              <div className="flex flex-col w-1/3 h-full justify-around">
                <div className="bg-gray-500 w-full h-3"></div>
                <div className="bg-gray-500 w-full h-3"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};