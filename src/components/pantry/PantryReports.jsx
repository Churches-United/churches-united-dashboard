import { useState } from "react";
import { Link } from "react-router-dom";
import PantryWeeklyReport from "./Reports/PantryWeeklyReport.jsx";
import PantryMonthlyReport from "./Reports/PantryMonthlyReport.jsx";
import PantryStatsReport from "./Reports/PantryStatsReport.jsx";

export default function PantryReports() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [filters, setFilters] = useState({
    year: "",
    search: "",
  });

  const tabs = {
    weekly: <PantryWeeklyReport filters={filters} />,
    monthly: <PantryMonthlyReport filters={filters} />,
    stats: <PantryStatsReport filters={filters} />,
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Pantry Reports & Analytics</h2>
        <Link to="/pantry" className="btn btn-secondary">
          Back to Pantry Home
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Filter by Year</label>
              <select
                className="form-select"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              >
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search notes..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          className={`btn ${activeTab === "weekly" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setActiveTab("weekly")}
        >
          Weekly Report
        </button>
        <button
          className={`btn ${activeTab === "monthly" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly Report
        </button>
        <button
          className={`btn ${activeTab === "stats" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("stats")}
        >
          Statistics & Charts
        </button>
      </div>

      <div>{tabs[activeTab]}</div>
    </div>
  );
}