import { NavLink } from "react-router-dom";
import { CiHeart, CiSettings } from 'react-icons/ci';
import { LuGrip } from 'react-icons/lu';
import { useContext } from "react";
import { MyContext } from "../../Context";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { RiAccountPinCircleFill } from "react-icons/ri";


export default function Navbar() {

 const {user, setShowAuthPage} = useContext(MyContext);
 console.log(user);
 
  return (
    <nav className=" grow-0 p-[20px] flex-col gap-5 bg-[#FAFAFA] w-fit shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] hidden lg:flex lg:w-[80px] sm:w-[60px] md:w-[70px]">
      
      <a href="/" className="flex justify-center border-b text-center pb-[10px] border-gray-400">
        <LuGrip
          fontSize={52}
        />
      </a>
        <NavLink to="account" 
        >
          <RiAccountPinCircleFill
            size={42}
            className="text-gray-400 hover:text-gray-900"
           />
        </NavLink>
      <NavLink to="library">
        <CiHeart
        size={42}
          className="text-gray-400 hover:text-gray-900"
        />
      </NavLink>
      <div className="mt-auto flex flex-col gap-5">
        <NavLink to="settings">
          <CiSettings
            size={42}
            className="text-gray-400 hover:text-gray-900"
        />
        </NavLink>
        <button
          className="cursor-pointer"
          type="button"
          aria-label="Log In/Log Out"
          onClick={()=>setShowAuthPage(true)}
        >
        {
        user?
            <AiOutlineLogin
              size={42}
              className="text-gray-400 hover:text-gray-900"
            />
          :
            <AiOutlineLogout
              size={42} 
              className="text-gray-400 hover:text-gray-900"
            />
        }
        </button>
      </div>
    </nav>
  );
}
