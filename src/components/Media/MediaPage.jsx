import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import MediaForm from "./MediaForm";
import MediaTable from "./MediaTable";

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
    <div className="media-page">
      <h2>Media Records</h2>
      <MediaForm editRecord={editRecord} setEditRecord={setEditRecord} />
      <MediaTable records={sortedRecords} setEditRecord={setEditRecord} />
    </div>
  );
}
