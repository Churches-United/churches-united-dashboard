import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import MediaForm from "./MediaForm";
import MediaTable from "./MediaTable";

export default function MediaPage() {
  const [editRecord, setEditRecord] = useState(null);

  const fetchMediaRecords = useStore((state) => state.fetchMediaRecords);
  const mediaRecords = useStore((state) => state.mediaRecords);

  useEffect(() => {
    fetchMediaRecords();
  }, [fetchMediaRecords]);

  return (
    <div className="media-page">
      <h2>Media Records</h2>
      {!editRecord && (
        <MediaForm editRecord={null} setEditRecord={setEditRecord} />
      )}
      {editRecord && (
        <div className="edit-form-section">
          <h3>
            Editing {editRecord.platform} -{" "}
            {new Date(editRecord.month_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </h3>
          <MediaForm editRecord={editRecord} setEditRecord={setEditRecord} />
        </div>
      )}
      <MediaTable records={mediaRecords} setEditRecord={setEditRecord} />
    </div>
  );
}
