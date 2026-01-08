import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import MediaForm from "./MediaForm";
import MediaTable from "./MediaTable";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

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

      <MediaForm editRecord={editRecord} setEditRecord={setEditRecord} />
      <MediaTable records={sortedRecords} setEditRecord={setEditRecord} />
    </div>
  );
}
