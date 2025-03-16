import React from 'react'

export default function Navbar() {
  return (
    <div className='container border-r-2 border-white p-[20px] flex flex-col gap-5 bg-[#FAFAFA] w-fit '>
      <div className=" border-b-1 flex flex-col pb-[10px] gap-5 border-gray-400">
        <img src='/images/web_icon.svg' alt=" Image Icon" className='w-[70px]'  />
        <a href="#account"><img src="/images/account-pin-circle-fill.svg" alt="User Icon"/></a>
      </div>
      <a href="#discover"> <img src="/images/compass.svg" alt="discover"  /> </a>
      <a href="#music"> <img src="/images/headphone-fill.svg" alt="" /> </a>
      <a href="#favourite"> <img src="/images/heart-3-fill.svg" alt="Favourite songs" /></a>
      <a href="#list"> <img src="/images/booklet-fill.svg" alt="book" /></a>
      <div className='mt-auto flex flex-col gap-5'>
        <a href="#settings"><img src="/images/settings-5-fill.svg" alt="settings" /></a>
        <a href="#log-out"><img src="/images/logout-box-line.svg" alt="logout" /></a>
      </div>
    </div>
  )
}
