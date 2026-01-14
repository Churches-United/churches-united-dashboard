import { useState, useEffect } from "react";
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

export default function HousingForm({ record, onClose }) {
  const [formData, setFormData] = useState(initialState);

  const housingBuildings = useStore((state) => state.housingBuildings);
  const fetchHousingBuildings = useStore(
    (state) => state.fetchHousingBuildings
  );
  const addHousingRecord = useStore((state) => state.addHousingRecord);
  const updateHousingRecord = useStore((state) => state.updateHousingRecord);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  useEffect(() => {
    fetchHousingBuildings();
  }, [fetchHousingBuildings]);

  useEffect(() => {
    if (record) {
      setFormData({
        ...record,
        month_date: record.month_date?.slice(0, 7),
        housing_building_id: record.housing_building_id.toString(),
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      housing_building_id: parseInt(formData.housing_building_id, 10),
      month_date: formData.month_date ? `${formData.month_date}-01` : null,
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
    setFormData(initialState);
    onClose();
  };

  return (
    <div className="hub-container housing">
      <form className="housing-form-container" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>{formData.id ? "Edit Housing Record" : "Add Housing Record"}</h3>
        </div>

        <div className="top-row">
          <label>
            Building
            <select
              name="housing_building_id"
              value={formData.housing_building_id}
              onChange={handleChange}
            >
              <option value="">Select Building</option>
              {housingBuildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Month
            <input
              type="month"
              name="month_date"
              value={formData.month_date}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* ---------- Numeric Grid ---------- */}
        <div className="form-grid">
          <label>
            Occupancy %
            <input
              type="number"
              name="occupancy_percent"
              value={formData.occupancy_percent}
              onChange={handleChange}
            />
          </label>

          <label>
            Operational Reserves
            <input
              type="number"
              name="operational_reserves"
              value={formData.operational_reserves}
              onChange={handleChange}
            />
          </label>

          <label>
            Replacement Reserves
            <input
              type="number"
              name="replacement_reserves"
              value={formData.replacement_reserves}
              onChange={handleChange}
            />
          </label>

          <label>
            Current Vacancies
            <input
              type="number"
              name="current_vacancies"
              value={formData.current_vacancies}
              onChange={handleChange}
            />
          </label>

          <label>
            Upcoming Vacancies
            <input
              type="number"
              name="upcoming_vacancies"
              value={formData.upcoming_vacancies}
              onChange={handleChange}
            />
          </label>

          <label>
            New Leases
            <input
              type="number"
              name="upcoming_new_leases"
              value={formData.upcoming_new_leases}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="notes-actions-row">
          <label className="notes-label">
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          <div className="form-buttons">
            <button type="submit" className="primary">
              Save
            </button>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
