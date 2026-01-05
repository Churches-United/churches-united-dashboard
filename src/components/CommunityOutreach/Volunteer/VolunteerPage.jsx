import useStore from "../../../zustand/store";
import { useEffect, useState } from "react";
import VolunteerForm from "./VolunteerForm";
import VolunteerList from "./VolunteerList";

export default function VolunteerPage() {
  const fetchVolunteers = useStore((state) => state.fetchVolunteers);
  const loading = useStore((state) => state.loading);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Volunteers</h2>

      <VolunteerForm
        volunteerToEdit={editingVolunteer}
        onFinish={() => setEditingVolunteer(null)}
      />

      <VolunteerList onEdit={(v) => setEditingVolunteer(v)} />
    </div>
  );
}
