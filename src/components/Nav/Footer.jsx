import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-divider" />

      <nav className="footer-nav">
        {/* Desktop-only department links */}
        <NavLink to="/" className="desktop-only">
          Home 
        </NavLink>
        <NavLink to="/compliance" className="desktop-only">
          Compliance
        </NavLink>
        <NavLink to="/outreach" className="desktop-only">
          Community Outreach
        </NavLink>
        <NavLink to="/development" className="desktop-only">
          Development
        </NavLink>
        <NavLink to="/finance" className="desktop-only">
          Finance
        </NavLink>
        <NavLink to="/housing" className="desktop-only">
          Housing
        </NavLink>
        <NavLink to="/hr" className="desktop-only">
          Human Resources
        </NavLink>
        <NavLink to="/kitchen" className="desktop-only">
          Kitchen
        </NavLink>
        <NavLink to="/media" className="desktop-only">
          Media
        </NavLink>
        <NavLink to="/pantry" className="desktop-only">
          Pantry
        </NavLink>
        <NavLink to="/shelter" className="desktop-only">
          Shelter
        </NavLink>

        {/* Always show on all screens */}
        <NavLink to="/" className="mobile-home">
          Home
        </NavLink>
        <NavLink to="/reporting" className="mobile-home">
          Reporting
        </NavLink>
      </nav>

      <div className="copyright">
        <small>Copyright © 2026</small>
      </div>
    </footer>
  );
}

export default Footer;
