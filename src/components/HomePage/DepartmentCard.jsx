import { Link } from "react-router-dom";
import "./DepartmentCard.css";

export default function DepartmentCard({ section }) {
  return (
    <Link to={section.path} className="card-link-wrapper">
      <div className="dashboard-card">
        <div className="card-image-wrapper">
          <img
            src={section.image || "/img/placeholder.jpg"}
            alt={section.label}
          />
          <div className="card-overlay"></div>
        </div>
        <div className="card-text text-center">
          <h5>{section.label}</h5>
          <p className="card-description">{section.description}</p>
        </div>
      </div>
    </Link>
  );
}
