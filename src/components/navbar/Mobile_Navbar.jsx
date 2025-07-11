import { NavLink } from 'react-router'
import { MyContext } from '../../Context';
import { CiHeart, } from 'react-icons/ci';
import { LuGrip } from 'react-icons/lu';
import { ImHeadphones } from 'react-icons/im';
import { RiAccountPinCircleFill } from 'react-icons/ri';

const Mobile_Navbar = () => {

  return (
    <div className='shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] justify-between mt-auto py-3 px-4 lg:hidden flex'>
      
      <NavLink
        to="account"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "text-green-700" : "text-gray-400"}`
        }
      >
        <RiAccountPinCircleFill
          fontSize={32}
        />
      </NavLink>      
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
      
    </div>
  )
}

export default Mobile_Navbar