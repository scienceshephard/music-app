import { Grip, Headphones, Heart, Settings, ListMusic } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

const Mobile_Navbar = () => {
  return (
    <div className='shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] justify-between mt-auto py-3 px-4 lg:hidden flex'>
      <button className="p-2 border-red border rounded-md">
        <Headphones
          fontSize={52}
        />
      </button>
      <a
        href="/"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Grip
          fontSize={52}
        />
      </a>
      <NavLink
        to="favorite"
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