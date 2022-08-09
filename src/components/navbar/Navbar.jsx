import { ArrowDropDown, Notifications, Search, MenuOutlined } from "@material-ui/icons";
// import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom"
import "./navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const navRef = useRef(null);

  const openNav = () => {
    navRef.current.style.width = `${240}px`;
  };
  const closeNav = () => {
    navRef.current.style.width = `${0}px`;
  };
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = async () => {
    await localStorage.clear()
    await navigate("/login")
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/movies" className="link">

            <span>New and Popular</span>
          </Link>
          <Link to="/movies" className="link">

            <span>My List</span>
          </Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src={user?.profilePic}
            alt=""
          />
          <div className="profile">
            <MenuOutlined onClick={openNav} className="icon nav-icon" />
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          </div>

        </div>
        <div id="mySidebar" className="sidebar" ref={navRef}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a> <br />
          <Link to="/" onClick={closeNav} className="link">
            <span>Homepage</span>
          </Link> <br />
          <Link to="/series" onClick={closeNav} className="link">
            <span>Series</span>
          </Link> <br />
          <Link to="/movies" onClick={closeNav} className="link">
            <span>Movies</span>
          </Link> <br />
          <Link to="/movies" onClick={closeNav} className="link">

            <span>New and Popular</span>
          </Link> <br />
          <Link to="/movies" onClick={closeNav} className="link">

            <span>My List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
