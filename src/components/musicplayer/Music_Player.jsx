import FavoriteIcon from '../../assets/images/heart-3-fill.svg';
import AddMusic from '../../assets/images/add-line.svg';



export default function Music_Player() {
  return (
    <div className='bg-[#FAFAFA] text-center border-1 border-solid p-[20px] border-gray-300 flex-1/2'>
        <h1 className='font-medium text-2xl'>Now Playing</h1>
        <div className='flex flex-col h-[300px] w-[300px] ml-auto mr-auto'>
          <div className='h-full'>
          <img src={"h"} alt={"image album"}  className='w-full border h-full  rounded-2xl '/>
          </div>
          <div className='mt-auto flex items-center justify-between'>
            <button className='hover:cursor-pointer'><img src={ AddMusic } width={'30px'}  alt="Add music" /></button>
            <div className='flex flex-col'>
                <span className='text-2xl font-medium'>title</span>
                <span>artist</span>
            </div>
            <button className='hover:cursor-pointer'><img src={ FavoriteIcon } width={'30px'} alt="Favourite music" /> </button>
          </div>
        </div>
        <div className='mt-auto '>
          {
            
          }
        </div>
    </div>
  )
}