import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "./pokemon_logo.png";

const Navbar = () => {
  return (
    <>
      <nav className="navbar shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand"><img src={logo} alt="logo" className="logo" /></NavLink>
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/details/1" className="nav-link">Pokemon detail</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link disabled">Contact</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
