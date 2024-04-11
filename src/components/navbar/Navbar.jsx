const Navbar = () => {
  return (
    <div className="navbar flex justify-around">
      <div className="navbarLogo">Logo</div>
      <div className="navbarSearchBar">
        <input placeholder="Enter city name" className="searchBar" />
      </div>
    </div>
  );
};

export default Navbar;
