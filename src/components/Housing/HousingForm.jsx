import useStore from "../../zustand/store";
import { useState, useEffect } from "react";

export default function HousingForm({ editingRecord, setEditingRecord }) {
  const housingBuildings = useStore((state) => state.housingBuildings);
  const addHousingRecord = useStore((state) => state.addHousingRecord);
  const updateHousingRecord = useStore((state) => state.updateHousingRecord);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  const [formData, setFormData] = useState({
    id: null,
    housing_building_id: "",
    month_date: "",
    occupancy_percent: "",
    operational_reserves: "",
    replacement_reserves: "",
    current_vacancies: "",
    upcoming_vacancies: "",
    upcoming_new_leases: "",
    notes: "",
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        ...editingRecord,
        month_date: editingRecord.month_date.slice(0, 7),
        id: editingRecord.id,
      });
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      month_date: formData.month_date ? formData.month_date + "-01" : null,
    };

    if (formData.id) {
      await updateHousingRecord(
        formData.housing_building_id,
        payload.month_date,
        payload
      );
    } else {
      await addHousingRecord(payload);
    }

    await fetchHousingRecords();

    setFormData({
      id: null,
      housing_building_id: "",
      month_date: "",
      occupancy_percent: "",
      operational_reserves: "",
      replacement_reserves: "",
      current_vacancies: "",
      upcoming_vacancies: "",
      upcoming_new_leases: "",
      notes: "",
    });

    setEditingRecord(null); // Reset editing mode
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{formData.id ? "Edit Housing Record" : "Add Housing Record"}</h3>
      <label>
        Building:
        <select
          name="housing_building_id"
          value={formData.housing_building_id}
          onChange={handleChange}
          required
        >
          <option value="">Select a building</option>
          {housingBuildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Month:
        <input
          type="month"
          name="month_date"
          value={formData.month_date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Occupancy %:
        <input
          type="number"
          name="occupancy_percent"
          value={formData.occupancy_percent}
          onChange={handleChange}
          min="0"
          max="100"
          step="0.01"
          required
        />
      </label>

      <label>
        Operational Reserves ($):
        <input
          type="number"
          name="operational_reserves"
          value={formData.operational_reserves}
          onChange={handleChange}
          step="0.01"
        />
      </label>

      <label>
        Replacement Reserves ($):
        <input
          type="number"
          name="replacement_reserves"
          value={formData.replacement_reserves}
          onChange={handleChange}
          step="0.01"
        />
      </label>

      <label>
        Current Vacancies:
        <input
          type="number"
          name="current_vacancies"
          value={formData.current_vacancies}
          onChange={handleChange}
        />
      </label>

      <label>
        Upcoming Vacancies:
        <input
          type="number"
          name="upcoming_vacancies"
          value={formData.upcoming_vacancies}
          onChange={handleChange}
        />
      </label>

      <label>
        Upcoming New Leases:
        <input
          type="number"
          name="upcoming_new_leases"
          value={formData.upcoming_new_leases}
          onChange={handleChange}
        />
      </label>

      <label>
        Notes:
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      <button type="submit">
        {formData.id ? "Update Record" : "Add Record"}
      </button>
    </form>
  );
}
