import { NavLink } from "react-router-dom";

import calendar from "../assets/images/calend_icon.png";
import child from "../assets/images/child_icon.png";
import parents from "../assets/images/parent_icon.png";
import infos from "../assets/images/info_icon.png";

function NavBar() {
  return (
    <section className="navbar-logo-container">
      <nav>
        <menu>
          <li>
            <NavLink to="/">
              <img
                src={calendar}
                alt="Icône calendrier"
                className="calendIcon"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profil">
              <img src={child} alt="page profil" className="childIcon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/add">
              <img
                src={parents}
                alt="ajouter un street art"
                className="parentIcon"
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="/classement">
              <img src={infos} alt="page emergency" className="emergIcon" />
            </NavLink>
          </li>
        </menu>
      </nav>
    </section>
  );
}

export default NavBar;
