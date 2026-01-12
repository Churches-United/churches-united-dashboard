import { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import OutreachToolbar from "./OutreachToolBar";
import { NavLink } from "react-router-dom";

import VolunteerList from "./Volunteer/VolunteerList";
import VolunteerForm from "./Volunteer/VolunteerForm";
import VolunteerEngagementList from "./Volunteer/VolunteerEngagementList";
import VolunteerEngagementForm from "./Volunteer/VolunteerEngagementForm";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "../../styles/toolbar.css";
import "./CommunityOutreach.css";
import "../../styles/modal.css";

export default function CommunityOutreachPage() {
  const fetchVolunteers = useStore((state) => state.fetchVolunteers);
  const fetchEngagements = useStore((state) => state.fetchEngagements);

  // Volunteer modal state
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  // Engagement modal state
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [editingEngagementId, setEditingEngagementId] = useState(null);

  // Accordion states
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [engagementOpen, setEngagementOpen] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    volunteerId: "",
    location: "",
    year: "",
    search: "",
  });

  // Fetch data on mount
  useEffect(() => {
    fetchVolunteers();
    fetchEngagements();
  }, [fetchVolunteers, fetchEngagements]);

  /** --- Handlers --- **/
  const handleAddVolunteer = () => {
    setEditingVolunteer(null);
    setShowVolunteerModal(true);
  };
  const handleEditVolunteer = (v) => {
    setEditingVolunteer(v);
    setShowVolunteerModal(true);
  };
  const handleAddEngagement = () => {
    setEditingEngagementId(null);
    setShowEngagementModal(true);
  };
  const handleEditEngagement = (id) => {
    setEditingEngagementId(id);
    setShowEngagementModal(true);
  };
  const closeVolunteerModal = () => setShowVolunteerModal(false);
  const closeEngagementModal = () => setShowEngagementModal(false);

  const handleClearFilters = () => {
    setFilters({
      volunteerId: "",
      location: "",
      year: "",
      search: "",
    });
  };

  return (
    <div className="hub-container">
      {/* Department Header */}
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink
              to="/outreach"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
            </NavLink>
            <NavLink
              to="/outreach/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Top Action Buttons */}
      <div className="toolbar-actions-top">
        <button onClick={handleAddVolunteer}>Add Volunteer</button>
        <button onClick={handleAddEngagement}>Add Engagement</button>
      </div>

      {/* Filters Toolbar */}
      <OutreachToolbar
        filters={filters}
        onFilterChange={setFilters}
        onClear={handleClearFilters}
      />

      {/* Volunteer Accordion */}
      <div className="accordion">
        <button
          className="accordion-header"
          onClick={() => setVolunteerOpen(!volunteerOpen)}
        >
          Volunteers {volunteerOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {volunteerOpen && (
          <div className="accordion-content">
            <VolunteerList onEdit={handleEditVolunteer} filters={filters} />
          </div>
        )}
      </div>

      {/* Volunteer Modal */}
      {showVolunteerModal && (
        <div className="modal-overlay" onClick={closeVolunteerModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeVolunteerModal}>
              &times;
            </button>
            <VolunteerForm
              volunteerToEdit={editingVolunteer}
              onFinish={closeVolunteerModal}
            />
          </div>
        </div>
      )}

      {/* Engagement Accordion */}
      <div className="accordion">
        <button
          className="accordion-header"
          onClick={() => setEngagementOpen(!engagementOpen)}
        >
          Volunteer Engagements{" "}
          {engagementOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {engagementOpen && (
          <div className="accordion-content">
            <VolunteerEngagementList
              onEdit={handleEditEngagement}
              filters={filters}
            />
          </div>
        )}
      </div>

      {/* Engagement Modal */}
      {showEngagementModal && (
        <div className="modal-overlay" onClick={closeEngagementModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeEngagementModal}>
              &times;
            </button>
            <VolunteerEngagementForm
              editId={editingEngagementId}
              setEditId={closeEngagementModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
