import { Album_Card } from "../album/Album_Card";
import { Track_Card } from "../album/Track_Card";

export const TopChart = ({
  sliderRef,
  trackListRef,
  allAlbums,
  loadingAlbums,
  allTracks,
  loadingTrack,
  error
}) => {
  return (
    <div className='h-full flex flex-col p-4'>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Top-chart</p>
      </div>

      {error && <div className="my-auto text-red-500"> {error} </div>}

      <div className="relative max-w-md w-full">
        <div
          ref={sliderRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-5 pb-4">
            {loadingAlbums && allAlbums.length === 0 && (
              <div className="flex justify-center overflow-hidden w-full">
                <div className="animate-pulse flex space-x-4">
                  {[1, 2, 3, 4].map(item => (
                    <div key={item} className="rounded-lg bg-gray-200 h-40 w-28"></div>
                  ))}
                </div>
              </div>
            )}

            {allAlbums.length > 0 ? (
              allAlbums.map(item => <Album_Card key={item.id} album={item} />)
            ) : (
              !loadingAlbums && <div>Error: <a href="/">Refresh page</a></div>
            )}

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

          {allTracks.length > 0 ? (
            allTracks.map(item => <Track_Card key={item.id} tracks={item} />)
          ) : (
            !loadingTrack && <div>Error: {error}</div>
          )}

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
