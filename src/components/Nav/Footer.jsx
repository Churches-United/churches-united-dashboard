import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-divider" />
      <nav className="footer-nav">
        <NavLink to="/compliance">Compliance</NavLink>
        <NavLink to="/outreach">Community Outreach</NavLink>
        <NavLink to="/development">Development</NavLink>
        <NavLink to="/finance">Finance</NavLink>
        <NavLink to="/housing">Housing</NavLink>
        <NavLink to="/hr">Human Resources</NavLink>
        <NavLink to="/kitchen">Kitchen</NavLink>
        <NavLink to="/media">Media</NavLink>
        <NavLink to="/pantry">Pantry</NavLink>
        <NavLink to="/shelter">Shelter</NavLink>
        <NavLink to="/reporting">Reporting</NavLink>
      </nav>
      <div className="copyright">
        <small>
          <p>Copyright © {new Date().getFullYear()}</p>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
