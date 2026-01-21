import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import MediaToolBar from "./MediaToolBar";
import MediaList from "./MediaList";
import MediaForm from "./MediaForm";
import "./Media.css";

export default function MediaPage() {
  const mediaRecords = useStore((state) => state.mediaRecords);
  const fetchMediaRecords = useStore((state) => state.fetchMediaRecords);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Filters / search
  const [platformFilter, setPlatformFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Derive dynamic filter options from store
  const platformOptions = Array.from(
    new Set(mediaRecords.map((r) => r.platform))
  ).sort();
  const yearOptions = Array.from(
    new Set(mediaRecords.map((r) => new Date(r.month_date).getFullYear()))
  ).sort((a, b) => b - a);

  // Filtered records
  const filteredRecords = mediaRecords
    .filter((r) => {
      if (platformFilter && r.platform !== platformFilter) return false;
      if (yearFilter && new Date(r.month_date).getFullYear() !== +yearFilter)
        return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const combined = `${r.platform ?? ""} ${r.notes ?? ""}`.toLowerCase();
        if (!combined.includes(term)) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.month_date) - new Date(a.month_date));

  // Fetch records on mount
  useEffect(() => {
    fetchMediaRecords();
  }, [fetchMediaRecords]);

  /** --- Handlers --- **/
  const handleAddMedia = () => {
    setEditingRecord(null);
    setShowForm(true);
  };

  const handleClearFilters = () => {
    setPlatformFilter("");
    setYearFilter("");
    setSearchTerm("");
  };

  return (
    <div className="hub-container media">
      <DepartmentHeader
        title="Media Records"
        actions={
          <>
            <NavLink to="/media" end>
              Department Home
            </NavLink>
            <NavLink to="/media/reports">Reports</NavLink>
          </>
        }
      />

      {/* todo - toolbar scale to make sense on page */}
      {/* todo - check toolbar color */}
      <div className="toolbar-wrapper volunteer">
        {/* Toolbar */}
        <div className="media-toolbar">
          <MediaToolBar
            filters={{
              platform: {
                label: "Platform",
                value: platformFilter,
                options: platformOptions,
                onChange: setPlatformFilter,
              },
              year: {
                label: "Year",
                value: yearFilter,
                options: yearOptions,
                onChange: setYearFilter,
                type: "number",
              },
            }}
            search={{ value: searchTerm, onChange: setSearchTerm }}
            onClear={handleClearFilters}
          />
        </div>
        <div className="toolbar-action-button">
          <button onClick={handleAddMedia}>Add Media</button>
        </div>
      </div>

      {/* Table */}
      <MediaList
        records={filteredRecords}
        onEdit={(row) => {
          setEditingRecord(row);
          setShowForm(true);
        }}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close-btn"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <MediaForm
              editRecord={editingRecord}
              setEditRecord={setEditingRecord}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
