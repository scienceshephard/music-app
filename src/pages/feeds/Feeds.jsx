import { useState, useRef, useEffect, useContext } from "react";
import { TopChart } from '../../components/Top-Chart/TopChart';
import useFetch from "../../hooks/useFetchMusic";
import { MyContext } from "../../Context";
import { FeedsComponent } from "./FeedsComponent";

function Feeds() {
  const sliderRef = useRef(null);
  const trackListRef = useRef(null);
  const feedsOff = useRef(Math.floor(Math.random() * 100))
  const list = { albums: "albums", artists: "artists", feeds: "feeds", tracks: "tracks", playlists: "playlists" };
  const [offset, setOffset] = useState(Math.floor(Math.random() * 1000));

  const albumUrl = `${list.albums}`;
  const trackUrl = `${list.tracks}`;
  const feedsUrl = `${list.feeds}`;

  const {
    error: feedsError,
    isloading: offsetLoading,
    fetchedData: feeds,
  } = useFetch(feedsUrl, feedsOff.current);

  const {
    fetchedData: tracks,
    isloading: loadingTrack,
    hasMore: moreTracks
  } = useFetch(trackUrl, offset);

  const {
    error,
    isloading: loadingAlbums,
    fetchedData: albums,
    hasMore: moreAlbums
  } = useFetch(albumUrl, offset);

  const { allAlbums, setAllAlbums, allTracks, setAllTracks, allFeeds, setAllFeeds } = useContext(MyContext);

  useEffect(() => {
    if (albums?.length > 0) {
      setAllAlbums(prev => {
        const newAlbums = albums.filter(album => !prev.some(a => a.id === album.id));
        return [...prev, ...newAlbums];
      });
    }
    if (tracks?.length > 0) {
      setAllTracks(prev => {
        const newTracks = tracks.filter(track => !prev.some(t => t.id === track.id));
        return [...prev, ...newTracks];
      });
    }
    if(feeds?.length >0){
      setAllFeeds(prev =>{
        const newFeeds = feeds.filter(feed => !prev.some(t => t.id === feed.id));
        return [...prev, ...newFeeds];
      })
    }
  }, [albums, tracks, feeds]);
  


  useEffect(() => {
    const slide = sliderRef.current;
    if (!slide) return;

    const handleScroll = () => {
      if (
        slide.scrollLeft + slide.clientWidth >= slide.scrollWidth - 20 &&
        moreAlbums &&
        !loadingAlbums
      ) {
        setOffset(prev => prev + 10);
      }
    };

    slide.addEventListener("scroll", handleScroll);
    return () => slide.removeEventListener("scroll", handleScroll);
  }, [moreAlbums, loadingAlbums]);

  useEffect(() => {
    const trackDiv = trackListRef.current;
    if (!trackDiv) return;

    const handleScroll = () => {
      if (
        trackDiv.scrollTop + trackDiv.clientHeight >= trackDiv.scrollHeight - 20 &&
        moreTracks &&
        !loadingTrack
      ) {
        setOffset(prev => prev + 10);
      }
    };

    trackDiv.addEventListener("scroll", handleScroll);
    return () => trackDiv.removeEventListener("scroll", handleScroll);
  }, [moreTracks, loadingTrack]);

  useEffect(() => {
    const feedDiv = sliderRef.current;
    if (!feedDiv) return;

    const handleScroll = () => {
      if (
        feedDiv.scrollTop + feedDiv.clientHeight >= feedDiv.scrollHeight - 20 &&
        moreTracks &&
        !loadingTrack
      ) {
        setOffset(prev => prev + 10);
      }
    };

    feedDiv.addEventListener("scroll", handleScroll);
    return () => feedDiv.removeEventListener("scroll", handleScroll);
  }, [moreTracks, loadingTrack]);

  return (
    <div className="overclow-auto scroll-smoothborder">
      <h1 className="border-l-1 border-solid border-white text-3xl font-semibold">
        Discover <br /> New music
      </h1>
      <TopChart
        sliderRef={sliderRef}
        trackListRef={trackListRef}
        allAlbums={allAlbums}
        loadingAlbums={loadingAlbums}
        allTracks={allTracks}
        loadingTrack={loadingTrack}
        error={error}
      />
      <h1 className="text-3xl font-semibold">Latest music gist</h1>
      <>
        <FeedsComponent
          feedsError ={feedsError}
          offsetLoading ={offsetLoading}
          feeds = {allFeeds}
        />
      </>
   
    </div>
  );
}

export default Feeds;
