import { useState, useRef, useEffect, useContext } from "react";
import { TopChart } from '../../components/Top-Chart/TopChart';
import useFetch from "../../hooks/useFetchMusic";
import { MyContext } from "../../Context";

function Feeds() {
  const sliderRef = useRef(null);
  const trackListRef = useRef(null);

  const list = { albums: "albums", artists: "artists", tracks: "tracks", playlists: "playlists" };
  const [albumOffset, setAlbumOffset] = useState(Math.floor(Math.random() * 1000));
  const [trackOffset, setTrackOffset] = useState(Math.floor(Math.random() * 1000));

  const albumUrl = `${list.albums}`;
  const trackUrl = `${list.tracks}`;

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

  const { allAlbums, setAllAlbums, allTracks, setAllTracks } = useContext(MyContext);

  useEffect(() => {
    if (albums?.length > 0) {
      setAllAlbums(prev => {
        const newAlbums = albums.filter(album => !prev.some(a => a.id === album.id));
        return [...prev, ...newAlbums];
      });
    }
  }, [albums]);

  useEffect(() => {
    if (tracks?.length > 0) {
      setAllTracks(prev => {
        const newTracks = tracks.filter(track => !prev.some(t => t.id === track.id));
        return [...prev, ...newTracks];
      });
    }
  }, [tracks]);

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
        setTrackOffset(prev => prev + 10);
      }
    };

    trackDiv.addEventListener("scroll", handleScroll);
    return () => trackDiv.removeEventListener("scroll", handleScroll);
  }, [moreTracks, loadingTrack]);

  return (
    <div className='flex flex-col flex-1/3'>
      <h1 className="border-l-1 border-solid border-white text-4xl font-semibold">
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
    </div>
  );
}

export default Feeds;
