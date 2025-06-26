import { Grip, Headphones, Heart, Settings, ListMusic } from 'lucide-react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { MyContext } from '../../Context';

const Mobile_Navbar = () => {

  const {setShowMobileMusicPlayer, showMobileMusicPlayer} = useContext(MyContext);

  return (
    <div className='shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] justify-between mt-auto py-3 px-4 lg:hidden flex'>
      <button className="p-2 focus:bg-green-700 rounded-md" onClick={()=> setShowMobileMusicPlayer(!showMobileMusicPlayer)}>
        <Headphones
          fontSize={52}
        />
      </button>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Grip
          fontSize={52}
        />
      </NavLink>
      <NavLink
        to="library"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Heart
          fontSize={52}
        />
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Settings
          fontSize={52}
        />
      </NavLink>
    </div>
  )
}

export default Mobile_Navbar