import { Album_Card } from "../album/Album_Card";
import { Track_Card } from "../album/Track_Card";

export const TopChart = ({
  sliderRef,
  trackListRef,
  allAlbums,
  loadingAlbums,
  allTracks,
  loadingTrack,
  error,
}) => {
  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">Top-chart</p>

      {error && <div className="my-auto text-red-500"> {error}</div>}

      <div>
        <div
          ref={sliderRef}
          className="overflow-x-auto scroll-smoothborder flex gap-5 mb-5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loadingAlbums && allAlbums.length === 0 && (
            <div className="flex overflow-hidden w-full">
              <div className="animate-pulse flex space-x-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-gray-200 h-40 w-28"
                  ></div>
                ))}
              </div>
            </div>
          )}

          {allAlbums.length > 0
            ? allAlbums.map((item) => <Album_Card key={item.id} album={item} />)
            : !loadingAlbums && (
                <div>
                  Error: <a href="/">Refresh page</a>
                </div>
              )}
        </div>
        <h1 className="font-medium text-3xl">You may also like</h1>
        <div
          className="flex gap-5 mt-4 pb-4  overflow-x-auto scroll-smooth"
          ref={trackListRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allTracks.length > 0
            ? allTracks.map((item) => (
                <Track_Card key={item.id} tracks={item} />
              ))
            : !loadingTrack && <div>Error: {error}</div>}
          {loadingTrack && allTracks.length === 0 && (
            <div className="animate-pulse w-full">
              <div className="gap-2 overflow-x-hidden  space-x-4 flex">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-200 h-50 rounded-2xl p-2 gap-5 flex flex-col"
                  >
                    <div className="bg-gray-600 rounded-2xl w-30 h-full "></div>
                    <div className="flex flex-col gap-1 h-fit">
                      <div className="bg-gray-500 w-1/2 h-3"></div>
                      <div className="bg-gray-500 w-1/2 h-3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
