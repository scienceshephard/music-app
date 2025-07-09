import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { MyContext } from '../../Context';
import { CiHeart, CiSettings } from 'react-icons/ci';
import { LuGrip } from 'react-icons/lu';
import { ImHeadphones } from 'react-icons/im';

const Mobile_Navbar = () => {

  const {setShowMobileMusicPlayer, showMobileMusicPlayer} = useContext(MyContext);

  return (
    <div className='shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] justify-between mt-auto py-3 px-4 lg:hidden flex'>
      <button className="p-2 text-gray-400 rounded-md" onClick={()=> setShowMobileMusicPlayer(!showMobileMusicPlayer)}>
        <ImHeadphones
          fontSize={32}
        />
      </button>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "text-green-700" : "text-gray-400"}`
        }
      >
        <LuGrip
          fontSize={32}
        />
      </NavLink>
      <NavLink
        to="library"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "text-green-700" : "text-gray-400"}`
        }
      >
        <CiHeart
          fontSize={32}
        />
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "text-green-700" : "text-gray-400"}`
        }
      >
        <CiSettings
          fontSize={32}
        />
      </NavLink>
    </div>
  )
}

export default Mobile_Navbar