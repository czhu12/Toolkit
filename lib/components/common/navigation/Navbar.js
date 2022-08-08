import React, { useState } from "react";
import { logout, useAuth } from "../../accounts/utils";
import ProfileSettings from "../../accounts/ProfileSettings";
import NavbarLogo from "./NavbarLogo";

export function Navbar({container=true, dark=false}) {
  const { currentUser } = useAuth();
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  return (
    <nav className={`navbar ${dark && "is-black"}`}>
      <div className={`container ${!container && "is-fluid"}`}>
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
            <a className="navbar-link">
              Settings
            </a>

            <div className="navbar-dropdown">
              {currentUser && 
                <a className="navbar-item" onClick={() => setShowProfileSettings(true)}>
                  Profile Settings
                </a>
              }
              <a href="/s/docs" className="navbar-item">
                Documentation
              </a>
              <hr className="navbar-divider"/>
              <a className="navbar-item" onClick={logout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProfileSettings  show={showProfileSettings} setShow={setShowProfileSettings} />
    </nav>
  )
}