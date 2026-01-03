import { useState } from "react";

const HouseholdRegistrationForm = () => {
  const [formData, setFormData] = useState({
    household_name: "",
    household_type: "First-Time",
    num_adults: 0,
    num_children: 0,
    num_seniors: 0,
    contact_info: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Household registered: ${formData.household_name}`);

    // Reset form
    setFormData({
      household_name: "",
      household_type: "First-Time",
      num_adults: 0,
      num_children: 0,
      num_seniors: 0,
      contact_info: "",
    });
  };

  const handleCancel = () => {
    setFormData({
      household_name: "",
      household_type: "First-Time",
      num_adults: 0,
      num_children: 0,
      num_seniors: 0,
      contact_info: "",
    });
  };

  return (
    <div>
      <h2>Household Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Household ID</label>
          <input type="text" value="Auto-generated" disabled />
        </div>

        <div>
          <label>Head of Household Name</label>
          <input
            type="text"
            name="household_name"
            value={formData.household_name}
            onChange={handleChange}
            placeholder="Enter name here"
            required
          />
        </div>

        <div>
          <label>Household Type</label>
          <select
            name="household_type"
            value={formData.household_type}
            onChange={handleChange}
            required
          >
            <option value="First-Time">First-Time</option>
            <option value="Returning">Returning</option>
          </select>
        </div>

        <div>
          <label>Number of Adults</label>
          <input
            type="number"
            name="num_adults"
            value={formData.num_adults}
            onChange={handleNumberChange}
            min="0"
          />
        </div>

        <div>
          <label>Number of Children</label>
          <input
            type="number"
            name="num_children"
            value={formData.num_children}
            onChange={handleNumberChange}
            min="0"
          />
        </div>

        <div>
          <label>Number of Seniors 55+</label>
          <input
            type="number"
            name="num_seniors"
            value={formData.num_seniors}
            onChange={handleNumberChange}
            min="0"
          />
        </div>

        <div>
          <label>Contact Information</label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            placeholder="(Optional)"
          />
        </div>

        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Save Household</button>
        </div>
      </form>
    </div>
  );
};

export default HouseholdRegistrationForm;
