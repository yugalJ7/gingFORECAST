import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="navbar flex justify-around items-center py-3">
      <NavLink to={"/"}>
        <div className="navbarLogo flex items-center">
          <img src="/assets/logo.png" alt="logo" className="w-8 h-8" />
          <span className="text-gray-200 text-2xl app_name text-transparent bg-clip-text font-semibold">
            gingForecast
          </span>
        </div>
      </NavLink>
      <div className="navbarSearchBar flex bg-[#1E1E1E] w-[27rem] py-2 rounded-full px-3 gap-2 max-[624px]:w-56 max-[375px]:w-48">
        <CiSearch size={25} color="white" />
        <input
          placeholder="Search city..."
          className="searchBar text-sm focus:outline-none bg-[#1E1E1E]  placeholder:text-white text-white placeholder:font-extralight"
        />
      </div>
    </div>
  );
};

export default Navbar;
