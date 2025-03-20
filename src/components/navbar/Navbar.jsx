import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='container border-r-2 border-white p-[20px] flex flex-col gap-5 bg-[#FAFAFA] w-fit '>
      <div className=" border-b-1 flex flex-col pb-[10px] gap-5 border-gray-400">
          <img src='/images/web_icon.svg' alt=" Image Icon" className='w-[70px]'  />
          <Link to="account"><img src="/images/account-pin-circle-fill.svg" alt="User Icon"/></Link>
        </div>
        <Link to="/discover"> <img src="/images/compass.svg" alt="discover"  /> </Link>
        <Link to="/music"> <img src="/images/headphone-fill.svg" alt="" /> </Link>
        <Link to="/favourite"> <img src="/images/heart-3-fill.svg" alt="Favourite songs" /></Link>
        <Link to="/list"> <img src="/images/booklet-fill.svg" alt="book" /></Link>
        <div className='mt-auto flex flex-col gap-5'>
          <Link to="/settings"><img src="/images/settings-5-fill.svg" alt="settings" /></Link>
          <Link to="/log-out"><img src="/images/logout-box-line.svg" alt="logout" /></Link>
        </div>
    </nav>
  )
}
