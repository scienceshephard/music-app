
import { useContext } from 'react';
import { MyContext } from '../../Context';



export default function Music_Player() {
  
  const {albumloading, selectedSong} = useContext(MyContext)
  return (
    <div className='bg-[#FAFAFA] text-center border-1 border-solid p-[20px] border-gray-300 flex-1/2'>
        {/*Loading animation */}
      {
        albumloading &&
        <div className='space-y-2.5'>
          <div className='w-40 h-8 animate-pulse bg-gray-300 mx-auto'></div>
        <div className='h-[300px] w-[300px]  rounded-2xl animate-pulse bg-gray-300 mx-auto'></div>
        <div className='w-1/2 mx-auto  flex items-center justify-between'>
          {/* AddMusic Icon */}
          <svg className='w-8 animate-pulse' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
                <path fill="none" d="M0 0h24v24H0z"/>
                <path fill="gray" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
            </g>
          </svg>

            <div className='flex flex-col gap-3 items-center'>
                <span className='h-5 animate-pulse bg-gray-400 w-30'></span>
                <span className='h-5 animate-pulse bg-gray-400 w-25'></span>
            </div>
            {/* Favorite Icon */}
          <svg className='w-8 animate-pulse' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                  <path fill="none" d="M0 0H24V24H0z"/>
                  <path fill="gray" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
              </g>
          </svg>
          </div>
        </div>
      }
      {!albumloading &&
      <div>
        <h1 className='font-medium text-2xl'>Now Playing</h1>
        <div className='flex flex-col h-[300px] w-[300px] ml-auto mr-auto'>
          <div className='h-full'>
          <img src={ selectedSong?.image } alt={"image album"}  className='w-full h-full  rounded-2xl '/>
          </div>
          <div className='mt-auto flex items-center justify-between'>
              <button className='hover:cursor-pointer'>
              <svg className='w-8 fill-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
                  </g>
              </svg>
            </button>
              <div className='flex flex-col'>
                  <span className='text-2xl font-medium'>{ selectedSong?.name }</span>
                  <span>{ selectedSong?.artist_name }</span>
              </div>
            <button className='hover:cursor-pointer'>
              <svg className='w-8 stroke-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g>
                      <path fill="none" stroke='none' d="M0 0H24V24H0z"/>
                      <path fill="none"  strokeWidth="2" d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
                  </g>
              </svg>

            </button>
          </div>
        </div>
        <audio src="" controls></audio>
      </div>
      }
    </div>
  )
}