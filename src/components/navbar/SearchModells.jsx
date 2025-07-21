import { createPortal } from "react-dom";
import { useContext } from "react";
import { MyContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchModal = ({ open, onClose, searchData, query }) => {
  const { setSelectedSong, setCurrentSongIndex, setAlbumloading, setShowMobileMusicPlayer } = useContext(MyContext);
  const navigate = useNavigate();

  if (!open) return null;

  // Remove duplicates by type+id
  const uniqueResults = [];
  const seen = new Set();
  for (const item of searchData) {
    const key = `${item.type}-${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueResults.push(item);
    }
  }

  // Handler for clicking a search result
  const handleItemClick = async (item) => {
    if (item.type === "tracks") {
      setAlbumloading(true);
      setSelectedSong([item]);
      setCurrentSongIndex(0);
      setShowMobileMusicPlayer(true);
      setAlbumloading(false);
      onClose();
    } else if (item.type === "albums") {
      setAlbumloading(true);
      try {
        const res = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
          params: {
            client_id: '117e1348',
            format: 'jsonpretty',
            album_id: item.id
          }
        });
        const tracks = res.data.results;
        if (tracks.length > 0) {
          setSelectedSong(tracks);
          setCurrentSongIndex(0);
          setShowMobileMusicPlayer(true);
        }
      } catch (error) {
        console.error('Error fetching album tracks:', error);
      } finally {
        setAlbumloading(false);
        onClose();
      }
    } else if (item.type === "artists") {
      onClose();
      navigate(`/artist/${item.name}`);
    }
  };
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-24">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Results for "{query}"</h2>
        {uniqueResults.length === 0 ? (
          <div className="text-gray-500">No results found.</div>
        ) : (
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
            {uniqueResults.map((item, idx) => (
              <li
                key={`${item.type}-${item.id || idx}`}
                className="border-b flex py-2 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleItemClick(item)}
              >
                <div>
                  <span className="text-xs text-gray-400 uppercase">{item.type}</span>
                  <div className="font-semibold">{item.name}</div>
                  {item.artist_name && (
                    <div className="text-xs text-gray-600">{item.artist_name}</div>
                  )}
                </div>
                <img src={item.image || 'https://www.w3schools.com/howto/img_avatar.png'} alt="image search" className="ml-auto w-20" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.getElementById("searchmodel")
  );
};

export default SearchModal;