import React, { useContext } from 'react'
import { MyContext } from '../../Context';
import { MdRemove } from 'react-icons/md';

const Favorite = () => {

  const {favourite, setFavourite} = useContext(MyContext);

  if(!favourite || favourite.length === 0)
    return(
      <div className='border h-dvh lg:h-fit flex items-center justify-center lg:text-5xl text-3xl'>
        No favourites
      </div>
    )
  return (
    <div className='sm:p-4 lg:p-0 '>
      <h1 className='text-4xl'>Your favourite songs</h1>
      <div>
        {favourite.map((song, index) => (
          <div key={index} className="flex shadow-xl items-center space-x-3 p-2 hover:bg-gray-100">
            <img src={song.image || 'https://via.placeholder.com/48x48?text=♪'} alt={song.name} className="w-12 h-12 object-cover rounded" />
            <div>
              <h2 className="text-sm font-semibold">{song.name}</h2>
              <p className="text-xs text-gray-500">{song.artist}</p>
            </div>
            <button title='remove' onClick={() => setFavourite(fav => fav.filter(favSong => favSong.id !== song.id))} className="ml-auto text-white bg-red-900 p-1.5 rounded-4xl font-bold hover:text-red-700">
              <MdRemove />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorite