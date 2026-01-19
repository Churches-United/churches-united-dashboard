import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import "./Nav.css";

function Nav() {
  const user = useStore((store) => store.user);
  const logOut = useStore((store) => store.logOut);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="header-container">
      <header className="nav-header">
        {/* LEFT: Logo + Title */}
        <div className="nav-left">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img
              src="/img/cu-heart.png"
              alt="Churches United Logo"
              className="nav-logo-img"
            />
          </Link>
          <h4 className="nav-title">Churches United Dashboard</h4>
        </div>

        {/* HAMBURGER (mobile) */}
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>

        {/* RIGHT: Navigation Links */}
        <nav className={`nav-right ${menuOpen ? "open" : ""}`}>
          <ul>
            {/* Guest links */}
            {!user?.id && (
              <li>
                <NavLink to="/login" onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
            )}

            {/* Logged-in user links */}
            {user?.id && (
              <>
                <li>
                  <NavLink to="/" onClick={closeMenu}>
                    Home
                  </NavLink>
                </li>


                {/* User settings visible to all logged-in users */}
                <li>
                  <NavLink to="/reporting" onClick={closeMenu}>
                    Reporting
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user/settings" onClick={closeMenu}>
                    Settings
                  </NavLink>
                </li>

                {/* Admin-only links */}
                {user.role === "admin" && (
                  <>
                    <li>
                      <NavLink to="/admin" onClick={closeMenu}>
                        Admin
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Logout */}
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
