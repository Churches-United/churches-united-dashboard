import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../../zustand/store";
import "./Housing.css";

const initialState = {
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
};

export default function HousingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingRecord = location.state?.record || null;

  const housingBuildings = useStore((state) => state.housingBuildings);
  const fetchHousingBuildings = useStore(
    (state) => state.fetchHousingBuildings
  );
  const addHousingRecord = useStore((state) => state.addHousingRecord);
  const updateHousingRecord = useStore((state) => state.updateHousingRecord);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    fetchHousingBuildings();
  }, [fetchHousingBuildings]);

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        ...editingRecord,
        month_date: editingRecord.month_date.slice(0, 7),
        id: editingRecord.id,
        housing_building_id: editingRecord.housing_building_id.toString(),
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
      housing_building_id: parseInt(formData.housing_building_id, 10),
      month_date: formData.month_date ? formData.month_date + "-01" : null,
    };

    if (formData.id) {
      await updateHousingRecord(
        payload.housing_building_id,
        payload.month_date,
        payload
      );
    } else {
      await addHousingRecord(payload);
    }

    await fetchHousingRecords();

    // Reset form and navigate back to table page
    setFormData(initialState);
    navigate("/housing");
  };

  return (
    <form className="housing-form-container" onSubmit={handleSubmit}>
      {/* Header */}
      <div className="form-header">
        <h3>{formData.id ? "Edit Housing Record" : "Add Housing Record"}</h3>
      </div>

      {/* Top Row */}
      <div className="top-row">
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
              <option key={b.id} value={b.id.toString()}>
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
      </div>

      {/* Numeric Grid */}
      <div className="form-grid">
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
      </div>

      {/* Notes + Buttons */}
      <div className="notes-actions-row">
        <label className="notes-label">
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <div className="form-buttons">
          <button type="submit" className="primary">
            {formData.id ? "Update Record" : "Add Record"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setFormData(initialState);
              navigate("/housing");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
