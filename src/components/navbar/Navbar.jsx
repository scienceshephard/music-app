import { NavLink } from "react-router-dom";
import accountImage from '../../assets/images/account-pin-circle-fill.svg';
import { Grip, Heart, Settings, Headphones, LogOutIcon } from "lucide-react";


export default function Navbar() {
  return (
    <nav className=" grow-0 p-[20px] flex-col gap-5 bg-[#FAFAFA] w-fit shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] hidden lg:flex lg:w-[80px] sm:w-[60px] md:w-[70px]">
      
      <a href="/" className="flex justify-center border-b text-center pb-[10px] border-gray-400">
        <Grip
          fontSize={52}
        />
      </a>
        <NavLink to="account">
          <img src={ accountImage } alt="User Icon" />
        </NavLink>
      <NavLink
        to="music"
        className={({ isActive }) =>
          ` p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <Headphones 
          width={42}
          height={50}
          className="text-gray-400 hover:text-gray-900"
          />
      </NavLink>
      <NavLink to="favourite"
        className={({ isActive }) =>
          ` p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }>
        <Heart
          width={42}
          height={50}
          className="text-gray-400 hover:text-gray-900"
        />
      </NavLink>
      <div className="mt-auto flex flex-col gap-5">
        <NavLink to="settings">
          <Settings
          width={42}
          height={50}
          className="text-gray-400 hover:text-gray-900"
        />
        </NavLink>
        <NavLink to="log-out">
          <LogOutIcon
          width={42}
          height={50}
          className="text-gray-400 hover:text-gray-900"
        />
        </NavLink>
      </div>
    </nav>
  );
}
