import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function HRWeeklyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const hrRecords = useStore((state) => state.hrRecords);
  const addHRRecord = useStore((state) => state.addHRRecord);
  const editHRRecord = useStore((state) => state.editHRRecord);
  const hrLoading = useStore((state) => state.hrLoading);

  const [formData, setFormData] = useState({
    weekDate: '',
    totalPositions: '',
    openPositions: '',
    newHires: '',
    turnover: '',
    evaluations: '',
    notes: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const record = hrRecords.find((r) => r.id === parseInt(id));
      if (record) {
        setFormData({
          weekDate: record.week_date?.split('T')[0] || '',
          totalPositions: record.total_positions || '',
          openPositions: record.open_positions || '',
          newHires: record.new_hires_this_week || '',
          turnover: record.employee_turnover || '',
          evaluations: record.evaluations_due || '',
          notes: record.notes || ''
        });
      }
    }
  }, [id, isEditMode, hrRecords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await editHRRecord(
        parseInt(id),
        formData.totalPositions,
        formData.openPositions,
        formData.newHires,
        formData.turnover,
        formData.evaluations,
        formData.notes
      );
    } else {
      await addHRRecord(
        formData.weekDate,
        formData.totalPositions,
        formData.openPositions,
        formData.newHires,
        formData.turnover,
        formData.evaluations,
        formData.notes
      );
    }

    navigate('/hr/weekly');
  };

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Human Resources - {isEditMode ? 'Edit Record' : 'New Record'}</h2>
        <div className="department-actions">
          <Link to="/hr/weekly" className="active">Data Entry</Link>
          <Link to="/hr/reports">Reports</Link>
        </div>
      </div>

      <div className="form-container">
        <h3>{isEditMode ? 'Edit HR Record' : 'Add New HR Record'}</h3>

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
              Total Positions <span style={{ color: 'var(--danger)' }}>*</span>
              <input
                type="number"
                name="totalPositions"
                value={formData.totalPositions}
                onChange={handleChange}
                required
                min="0"
              />
            </label>

            <label>
              Open Positions <span style={{ color: 'var(--danger)' }}>*</span>
              <input
                type="number"
                name="openPositions"
                value={formData.openPositions}
                onChange={handleChange}
                required
                min="0"
              />
            </label>

            <label>
              New Hires This Week
              <input
                type="number"
                name="newHires"
                value={formData.newHires}
                onChange={handleChange}
                min="0"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Employee Turnover
              <input
                type="number"
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Evaluations Due
              <input
                type="number"
                name="evaluations"
                value={formData.evaluations}
                onChange={handleChange}
                min="0"
              />
            </label>

            <div></div>
          </div>

          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes or comments..."
              rows="4"
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="primary"
              disabled={hrLoading}
            >
              {hrLoading ? 'Saving...' : isEditMode ? 'Update Record' : 'Add Record'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => navigate('/hr/weekly')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}