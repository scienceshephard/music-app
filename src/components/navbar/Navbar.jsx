import { NavLink } from "react-router-dom";
import accountImage from '../../assets/images/account-pin-circle-fill.svg';
import compassImage from '../../assets/images/compass.svg';
import MusicIcon from '../../assets/images/headphone-fill.svg';
import FavoriteIcon from '../../assets/images/heart-3-fill.svg';
import MusicListIcon from '../../assets/images/booklet-fill.svg';
import SettingsIcon from '../../assets/images/settings-5-fill.svg';
import LogoutIcon from '../../assets/images/logout-box-line.svg';

export default function Navbar() {
  return (
    <nav className="container border-r-2 border-white p-[20px] flex flex-col gap-5 bg-[#FAFAFA] w-fit shadow-xl/30 ">
      <div className=" border-b-1 flex flex-col pb-[10px] border-gray-400">
        <a href="/">
          <img
            src="/web_icon.svg"
            alt=" Image Icon"
            width={"40px"}
          />
        </a>
      </div>
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
        to="favourite"
        className={({ isActive }) =>
          `p-2 rounded-md ${isActive ? "" : "bg-transparent"}`
        }
      >
        <img
          src={FavoriteIcon}
          alt="Favourite songs"
          width={"40px"}
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
          <img src={SettingsIcon} alt="settings" width={"40px"} />
        </NavLink>
        <NavLink to="log-out">
          <img src={ LogoutIcon } alt="logout" width={"40px"} />
        </NavLink>
      </div>
    </nav>
  );
}
