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
        <h2>Churches United Dashboard</h2>
      </div>

      {/* RIGHT: Navigation Links */}
      <nav className="nav-right">
        <ul>
          {
            // User is not logged in, render these links:
            !user.id && (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/registration">Register</NavLink>
                </li>
              </>
            )
          }

          {
            // User is logged in, render these links:
            user.id && (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </>
            )
          }

          {/* Show these links regardless of auth status: */}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
