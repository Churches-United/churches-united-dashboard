import { Link } from "react-router-dom";
import React from "react";

export default function DevelopmentHome() {
  const sections = [
    { path: "/development/donors", label: "Donors" },
    { path: "/development/donations", label: "Donations" },
    { path: "/development/upcoming-events", label: "Upcoming Events" },
  ];

  return (
    <div>
      <h2>Development Dashboard</h2>
      <ul>
        {sections.map((s) => (
          <li key={s.path}>
            <Link to={s.path}>{s.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}