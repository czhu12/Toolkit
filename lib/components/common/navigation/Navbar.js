import { logout } from "../../accounts/utils";
import NavbarLogo from "./NavbarLogo";

export function Navbar({container=true, dark=false}) {
  return (
    <nav className={`navbar ${dark && "is-black"}`}>
      <div className={`container ${"is-fluid"}`}>
        <div className="navbar-brand">
          <div className="navbar-item px-0">
            <NavbarLogo />
            <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setBarActive(!barActive)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Settings
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Documentation
              </a>
              <hr class="navbar-divider"/>
              <a class="navbar-item" onClick={logout}>
                Logout
              </a>
            </div>

          </div>

        </div>
      </div>
    </nav>
  )
}