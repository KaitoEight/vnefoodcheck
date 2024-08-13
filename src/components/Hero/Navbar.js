import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../App.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const showSidebar = () => setSidebar(!sidebar);
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to="/"  style={{ textDecoration: 'none' }}>
            <div className="Name"> Lashma</div>
          </Link>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
              <>
                <Link to="/login" className="login-button">Login</Link>
                <Link to="/register" className="register-button">Register</Link>
              </>
            )}
          </div>
        </div >

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineCloseCircle />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                isAuthenticated || item.title === "Home" ? (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ) : null
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider >
    </>
  );
}

export default Navbar;
