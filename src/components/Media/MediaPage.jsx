import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";

import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import MediaToolBar from "./MediaToolBar";
import MediaTable from "./MediaTable";
import MediaForm from "./MediaForm";
import "./Media.css";

export default function MediaPage() {
  const [editRecord, setEditRecord] = useState(null);

  const mediaRecords = useStore((state) => state.mediaRecords);
  const fetchMediaRecords = useStore((state) => state.fetchMediaRecords);

  useEffect(() => {
    fetchMediaRecords();
  }, [fetchMediaRecords]);

  const sortedRecords = [...mediaRecords].sort(
    (a, b) => new Date(b.month_date) - new Date(a.month_date)
  );

  return (
    <div className="hub-container">
      <DepartmentHeader
        title="Media Records"
        actions={
          <>
            <NavLink
              to="/media"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
            </NavLink>
            <NavLink
              to="/media/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Feature Toolbar */}
      <MediaToolBar onAdd={() => setEditRecord({})} />

      {/* Primary Content */}
      <MediaTable records={sortedRecords} setEditRecord={setEditRecord} />

      {/* Add / Edit Modal */}
      {editRecord && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                {editRecord.platform ? "Edit Media Record" : "Add Media Record"}
              </h2>
              <button
                className="btn btn-icon"
                onClick={() => setEditRecord(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <MediaForm
                editRecord={editRecord}
                setEditRecord={setEditRecord}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
