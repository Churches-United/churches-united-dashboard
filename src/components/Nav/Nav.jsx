import { NavLink, Link, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import "./Nav.css";

function Nav() {
  const user = useStore((store) => store.user);
  const logOut = useStore((store) => store.logOut);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOut();
    navigate("/login");
  };

  return (
    <div className="header-container">
      <header className="nav-header">
        {/* LEFT: Logo + Title */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img
              src="/img/cu-heart.png"
              alt="Churches United Logo"
              className="nav-logo-img"
            />
          </Link>
          <h4 className="nav-title">Churches United Dashboard</h4>
        </div>

        {/* RIGHT: Navigation Links */}
        <nav className="nav-right">
          <ul>
            {!user.id && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/registration">Register</NavLink>
                </li>
              </>
            )}

            {user.id && (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            )}

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
