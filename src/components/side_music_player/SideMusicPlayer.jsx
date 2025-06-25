import { Grip, Headphones, Heart, Settings, ListMusic } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

const SideMusicPlayer = () => {
  return (
    <div className='fixed shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] bottom-0 left-0 w-full justify-between mt-auto py-3 px-4 lg:hidden sm:flex'>
      <button className="p-2 border-red border rounded-md">
        <Headphones
          fontSize={52}
        />
      </button>
      <NavLink
        to="music"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Grip
          fontSize={52}
        />
      </NavLink>
      <NavLink
        to="music"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Heart
          fontSize={52}
        />
      </NavLink>
      <NavLink
        to="music"
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

export default SideMusicPlayer