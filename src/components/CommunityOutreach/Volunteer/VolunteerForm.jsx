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

    const payload = {
      name: name.trim(),
      type,
    };

    try {
      if (volunteerToEdit) {
        console.log("Editing volunteer", {
          id: volunteerToEdit.id,
          ...payload,
        });
        await editVolunteer(volunteerToEdit.id, payload);
      } else {
        console.log("Adding volunteer", payload);
        await addVolunteer(payload);
      }

      // reset form
      setName("");
      setType("Individual");
      if (onFinish) onFinish();
    } catch (err) {
      console.error("VolunteerForm handleSubmit error:", err);
    }
  };

  if (loading) return <p className="table-loading">Loading...</p>;
  if (error) return <p className="table-error">Error: {error}</p>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="grid-form">
        <h3>{volunteerToEdit ? "Edit Volunteer" : "Add Volunteer"}</h3>

        <label>
          Name
          <input
            type="text"
            placeholder="Volunteer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Individual">Individual</option>
            <option value="Group">Group</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="primary">
            {volunteerToEdit ? "Update" : "Add"}
          </button>
          {volunteerToEdit && (
            <button type="button" className="secondary" onClick={onFinish}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
