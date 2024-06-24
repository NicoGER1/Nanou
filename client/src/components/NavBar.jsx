import { NavLink } from "react-router-dom";

import calendar from "../assets/images/calend_icon.png";
import child from "../assets/images/child_icon.png";
import parents from "../assets/images/parent_icon.png";
import infos from "../assets/images/info_icon.png";
import logo from "../assets/images/logo.png";
import menu from "../assets/images/menu.png";

function NavBar() {
  return (
    <>
      <section className="navbar-logo-container">
        <nav>
          <menu>
            <li>
              <NavLink to="/">
                <img
                  src={calendar}
                  alt="Icône calendrier"
                  className="navIcon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink to="/children">
                <img src={child} alt="page profil" className="navIcon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/parents">
                <img
                  src={parents}
                  alt="ajouter un street art"
                  className="navIcon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink to="/emergency">
                <img src={infos} alt="page emergency" className="navIcon" />
              </NavLink>
            </li>
          </menu>
        </nav>
      </section>
      <section className="navbar-desktop">
        <nav className="navbarTop">
          <li className="navbarDrawer">
            <img src={menu} alt="bouton de menu" />
          </li>
          <li className="navbarLogo">
            <img src={logo} alt="logo du site" />
          </li>
        </nav>
      </section>
    </>
  );
}

export default NavBar;
