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

import "./CommunityOutreach.css";
import "../../styles/modal.css";

export default function CommunityOutreachPage() {
  // Zustand actions
  const fetchVolunteers = useStore((state) => state.fetchVolunteers);
  const fetchEngagements = useStore((state) => state.fetchEngagements);

  // Volunteer modal state
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  // Engagement modal state
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [editingEngagementId, setEditingEngagementId] = useState(null);

  // Accordion states
  const [volunteerOpen, setVolunteerOpen] = useState(false); // closed by default
  const [engagementOpen, setEngagementOpen] = useState(true); // open by default

  // Toolbar filters
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

  // Handlers for opening modals
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

  // Handlers for closing modals
  const closeVolunteerModal = () => {
    setEditingVolunteer(null);
    setShowVolunteerModal(false);
  };
  const closeEngagementModal = () => {
    setEditingEngagementId(null);
    setShowEngagementModal(false);
  };

  return (
    <div className="hub-container">
      {/* Header with nav links */}
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

      {/* Action buttons above the toolbar */}
      <div className="toolbar-actions-top">
        <button className="primary-outline" onClick={handleAddVolunteer}>
          Add Volunteer
        </button>
        <button className="primary-outline" onClick={handleAddEngagement}>
          Add Engagement
        </button>
      </div>

      {/* Toolbar with filters */}
      <OutreachToolbar filters={filters} onFilterChange={setFilters} />

      {/* Volunteer Accordion */}
      <div className="accordion">
        <button
          className="accordion-header"
          onClick={() => setVolunteerOpen(!volunteerOpen)}
        >
          Volunteers
          {volunteerOpen ? <FaChevronUp /> : <FaChevronDown />}
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
          Volunteer Engagements
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
