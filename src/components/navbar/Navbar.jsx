import { NavLink } from "react-router-dom";
import accountImage from '../../assets/images/account-pin-circle-fill.svg';
import compassImage from '../../assets/images/compass.svg';
import MusicIcon from '../../assets/images/headphone-fill.svg';
import FavoriteIcon from '../../assets/images/heart-3-fill.svg';
import MusicListIcon from '../../assets/images/booklet-fill.svg';
import SettingsIcon from '../../assets/images/settings-5-fill.svg';
import LogoutIcon from '../../assets/images/logout-box-line.svg';
import { Grip, Heart, Settings, LogOut, LogOutIcon } from "lucide-react";


export default function Navbar() {
  return (
    <nav className="container border-r-2 border-white p-[20px] flex flex-col gap-5 bg-[#FAFAFA] w-fit shadow-xl/30 bg-linear-to-bl from-[#384B35] to-[#2D3249] ">
      
      <a href="/" className="flex justify-center border-b text-center pb-[10px] border-gray-400">
        <Grip
          fontSize={52}
        />
      </a>
        <NavLink to="account">
          <img src={ accountImage } alt="User Icon" />
        </NavLink>
      <NavLink
        to="discover"
        className={({ isActive }) =>
          `hidden p-2 rounded-md ${isActive ? "bg-green-700" : "bg-transparent"}`
        }
      >
        <img
          src={compassImage}
          alt="discover"
          width={"40px"}
        />
      </NavLink>
      <NavLink
        to="music"
        className={({ isActive }) => `hidden ${(isActive ? "bg-green-900" : "bg-none")}`}
      >
        <img
          src={MusicIcon}
          alt="music icon"
          width={"40px"}
        />
      </NavLink>
      <NavLink
        to="favourite">
        <Heart
          width={42}
          height={50}
          className="text-gray-400 hover:text-gray-900"
        />
      </NavLink>
      <NavLink
        to="list"
        className={({ isActive }) => `hidden ${(isActive ? "bg-amber-950" : "bg-none")}`}
      >
        <img src={MusicListIcon} alt="book" width={"40px"} />
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
