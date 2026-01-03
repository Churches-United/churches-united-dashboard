import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';

const WeeklyPantryRecordForm = () => {
  const addPantryRecord = useStore((state) => state.addPantryRecord);
  const error = useStore((state) => state.error);
  const loading = useStore((state) => state.loading);

  const [formData, setFormData] = useState({
    week_date: getCurrentWeekMonday(),
    first_time_households: 0,
    returning_households: 0,
    adults: 0,
    children: 0,
    seniors: 0,
    total_pounds: 0
  });

  // Calculate current week's Monday (start of week)
  function getCurrentWeekMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPantryRecord(formData);
    
    if (!error) {
      // Reset form on success
      setFormData({
        week_date: getCurrentWeekMonday(),
        first_time_households: 0,
        returning_households: 0,
        adults: 0,
        children: 0,
        seniors: 0,
        total_pounds: 0
      });
    }
  };

  return (
    <div>
      <h2>Weekly Pantry Record</h2>
      
      {error && <div>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Week Period</label>
          <input
            type="text"
            value={`Auto-calculated: Monday-Sunday (${formData.week_date})`}
            disabled
          />
        </div>

        <div>
          <label>First-Time Households</label>
          <input
            type="number"
            name="first_time_households"
            value={formData.first_time_households}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Returning Households</label>
          <input
            type="number"
            name="returning_households"
            value={formData.returning_households}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Adults</label>
          <input
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Children</label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Seniors (55+)</label>
          <input
            type="number"
            name="seniors"
            value={formData.seniors}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Total Pounds Distributed</label>
          <input
            type="number"
            step="0.01"
            name="total_pounds"
            value={formData.total_pounds}
            onChange={handleNumberChange}
            min="0"
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Weekly Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeeklyPantryRecordForm;