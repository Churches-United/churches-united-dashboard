import { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import VolunteerEngagementForm from "./VolunteerEngagementForm";

export default function VolunteerEngagementPage() {
  const fetchEngagements = useStore((state) => state.fetchEngagements);
  const engagements = useStore((state) => state.engagements);
  const loadingEngagements = useStore((state) => state.loadingEngagements);
  const errorEngagements = useStore((state) => state.errorEngagements);
  const deleteEngagement = useStore((state) => state.deleteEngagement);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEngagements();
  }, [fetchEngagements]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this engagement?")) {
      await deleteEngagement(id);
    }
  };

  if (loadingEngagements) return <p>Loading engagements...</p>;
  if (errorEngagements) return <p>Error: {errorEngagements}</p>;

  return (
    <div>
      <h2>Volunteer Engagements</h2>

      <VolunteerEngagementForm editId={editId} setEditId={setEditId} />

      {engagements.length === 0 ? (
        <p>No engagements logged.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Volunteer</th>
              <th>Event Date</th>
              <th>Location</th>
              <th>Number of Volunteers</th>
              <th>Software Signups</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {engagements.map((e) => (
              <tr key={e.id}>
                <td>{e.volunteer_name}</td>
                <td>{new Date(e.event_date).toLocaleDateString()}</td>
                <td>{e.location}</td>
                <td>{e.number_volunteers}</td>
                <td>{e.software_signups || 0}</td>
                <td>
                  <button onClick={() => setEditId(e.id)}>Edit</button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
