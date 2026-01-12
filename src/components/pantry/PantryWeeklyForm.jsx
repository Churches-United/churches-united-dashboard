import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function PantryWeeklyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const pantryRecords = useStore((state) => state.pantryRecords);
  const addPantryRecord = useStore((state) => state.addPantryRecord);
  const editPantryRecord = useStore((state) => state.editPantryRecord);
  const pantryLoading = useStore((state) => state.pantryLoading);

  const [formData, setFormData] = useState({
    weekDate: getCurrentWeekMonday(),
    firstTimeHouseholds: '',
    returningHouseholds: '',
    totalAdults: '',
    totalChildren: '',
    totalSeniors: '',
    totalPounds: ''
  });

  function getCurrentWeekMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split('T')[0];
  }

  useEffect(() => {
    if (isEditMode) {
      const record = pantryRecords.find((r) => r.id === parseInt(id));
      if (record) {
        setFormData({
          weekDate: record.week_date?.split('T')[0] || '',
          firstTimeHouseholds: record.first_time_households || '',
          returningHouseholds: record.returning_households || '',
          totalAdults: record.total_adults || '',
          totalChildren: record.total_children || '',
          totalSeniors: record.total_seniors || '',
          totalPounds: record.total_pounds_distributed || ''
        });
      }
    }
  }, [id, isEditMode, pantryRecords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      week_date: formData.weekDate,
      first_time_households: parseInt(formData.firstTimeHouseholds) || 0,
      returning_households: parseInt(formData.returningHouseholds) || 0,
      total_adults: parseInt(formData.totalAdults) || 0,
      total_children: parseInt(formData.totalChildren) || 0,
      total_seniors: parseInt(formData.totalSeniors) || 0,
      total_pounds_distributed: parseFloat(formData.totalPounds) || 0
    };

    if (isEditMode) {
      await editPantryRecord(parseInt(id), payload);
    } else {
      await addPantryRecord(payload);
    }

    navigate('/pantry/weekly');
  };

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Pantry Distribution - {isEditMode ? 'Edit Record' : 'New Record'}</h2>
        <div className="department-actions">
          <Link to="/pantry/weekly" className="active">Data Entry</Link>
          <Link to="/pantry/reports">Reports</Link>
        </div>
      </div>

      <div className="form-container">
        <h3>{isEditMode ? 'Edit Pantry Record' : 'Add New Pantry Record'}</h3>

        <form onSubmit={handleSubmit} className="grid-form">
          <label>
            Week Date <span style={{ color: 'var(--danger)' }}>*</span>
            <input
              type="date"
              name="weekDate"
              value={formData.weekDate}
              onChange={handleChange}
              required
              disabled={isEditMode}
            />
          </label>

          <div className="form-row">
            <label>
              First-Time Households <span style={{ color: 'var(--danger)' }}>*</span>
              <input
                type="number"
                name="firstTimeHouseholds"
                value={formData.firstTimeHouseholds}
                onChange={handleChange}
                required
                min="0"
              />
            </label>

            <label>
              Returning Households <span style={{ color: 'var(--danger)' }}>*</span>
              <input
                type="number"
                name="returningHouseholds"
                value={formData.returningHouseholds}
                onChange={handleChange}
                required
                min="0"
              />
            </label>

            <label>
              Total Adults
              <input
                type="number"
                name="totalAdults"
                value={formData.totalAdults}
                onChange={handleChange}
                min="0"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Total Children
              <input
                type="number"
                name="totalChildren"
                value={formData.totalChildren}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Total Seniors (55+)
              <input
                type="number"
                name="totalSeniors"
                value={formData.totalSeniors}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Total Pounds <span style={{ color: 'var(--danger)' }}>*</span>
              <input
                type="number"
                step="0.01"
                name="totalPounds"
                value={formData.totalPounds}
                onChange={handleChange}
                required
                min="0"
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary"
              disabled={pantryLoading}
            >
              {pantryLoading ? 'Saving...' : isEditMode ? 'Update Record' : 'Add Record'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => navigate('/pantry/weekly')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}