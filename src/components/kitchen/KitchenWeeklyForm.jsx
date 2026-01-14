import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function KitchenWeeklyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { kitchenRecords, addKitchenRecord, editKitchenRecord, fetchKitchenRecords, kitchenLoading } = useStore();

  const [formData, setFormData] = useState({
    week_date: '',
    total_meals_served: '',
    notes: ''
  });

  useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  useEffect(() => {
    if (id && kitchenRecords) {
      const record = kitchenRecords.find(r => r.id === parseInt(id));
      if (record) {
        setFormData({
          week_date: record.week_date?.split('T')[0] || '',
          total_meals_served: record.total_meals_served || '',
          notes: record.notes || ''
        });
      }
    }
  }, [id, kitchenRecords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await editKitchenRecord(
          id,
          formData.total_meals_served,
          formData.notes
        );
      } else {
        await addKitchenRecord(
          formData.week_date,
          formData.total_meals_served,
          formData.notes
        );
      }
      navigate('/kitchen/weekly');
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Failed to save record. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{id ? 'Edit' : 'Add New'} Kitchen Weekly Record</h2>
        <Link to="/kitchen/weekly" className="btn btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card p-4">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Week Date *</label>
            <input
              type="date"
              name="week_date"
              className="form-control"
              value={formData.week_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Total Meals Served *</label>
            <input
              type="number"
              name="total_meals_served"
              className="form-control"
              value={formData.total_meals_served}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            className="form-control"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes or observations..."
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={kitchenLoading}>
            {kitchenLoading ? 'Saving...' : (id ? 'Update' : 'Create')} Record
          </button>
          <Link to="/kitchen/weekly" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}