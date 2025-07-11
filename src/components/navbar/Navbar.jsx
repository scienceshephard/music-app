import { NavLink } from "react-router-dom";
import { CiHeart, } from 'react-icons/ci';
import { LuGrip } from 'react-icons/lu';
import { useContext } from "react";
import { MyContext } from "../../Context";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { RiAccountPinCircleFill } from "react-icons/ri";

export default function Navbar() {

  const { user, setShowAuthPage } = useContext(MyContext);

  return (
    <nav className="grow-0 p-[20px] flex-col gap-5 bg-[#FAFAFA] w-fit shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] hidden lg:flex lg:w-[80px] sm:w-[60px] md:w-[70px]">
      
      <NavLink 
        to="/" 
        className={({ isActive }) =>
          `flex justify-center border-b text-center pb-[10px] border-gray-400 ${isActive ? "text-white" : "text-gray-400 hover:text-gray-900"}`
        }
      >
        <LuGrip fontSize={52} />
      </NavLink>

      <NavLink 
        to="account" 
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-400 hover:text-gray-900"
        }
      >
        <RiAccountPinCircleFill size={42} />
      </NavLink>

      <NavLink 
        to="library" 
        className={({ isActive }) =>
          isActive ? "text-white" : "text-gray-400 hover:text-gray-900"
        }
      >
        <CiHeart size={42} />
      </NavLink>
        <button
          className=" mt-auto cursor-pointer"
          type="button"
          title={ user ?"Log Out" : "Log In"}
          onClick={() => setShowAuthPage(true)}
        >
          {
            user ? (
              <AiOutlineLogin
                size={42}
                className="text-gray-400 hover:text-gray-900"
              />
            ) : (
              <AiOutlineLogout
                size={42}
                className="text-gray-400 hover:text-gray-900"
              />
            )
          }
        </button>
    </nav>
  );
}
