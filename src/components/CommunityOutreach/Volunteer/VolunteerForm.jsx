import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerForm({ volunteerToEdit, onFinish }) {
  const addVolunteer = useStore((state) => state.addVolunteer);
  const editVolunteer = useStore((state) => state.editVolunteer);
  const volunteers = useStore((state) => state.volunteers);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const [name, setName] = useState("");
  const [type, setType] = useState("Individual");

  useEffect(() => {
    if (volunteerToEdit) {
      setName(volunteerToEdit.name);
      setType(volunteerToEdit.type);
    } else {
      setName("");
      setType("Individual");
    }
  }, [volunteerToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // prevent duplicates
    const nameExists = volunteers.some(
      (v) => v.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (!volunteerToEdit && nameExists) {
      alert("A volunteer with this name already exists.");
      return;
    }

    if (volunteerToEdit) {
      await editVolunteer(volunteerToEdit.id, name, type);
    } else {
      await addVolunteer(name, type);
    }

    setName("");
    setType("Individual");

    if (onFinish) onFinish();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Individual">Individual</option>
        <option value="Group">Group</option>
      </select>
      <button type="submit">{volunteerToEdit ? "Update" : "Add"}</button>
      {volunteerToEdit && (
        <button
          type="button"
          onClick={onFinish}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
