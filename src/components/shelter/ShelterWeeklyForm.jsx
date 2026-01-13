import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useStore from '../../zustand/store';
//import './Shelter.css';

function ShelterWeeklyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const currentRecord = useStore((state) => state.shelter.currentRecord);
  const loading = useStore((state) => state.shelter.loading);
  const error = useStore((state) => state.shelter.error);
  const fetchRecordById = useStore((state) => state.fetchShelterRecordById);
  const createRecord = useStore((state) => state.createShelterRecord);
  const updateRecord = useStore((state) => state.updateShelterRecord);
  const clearCurrentRecord = useStore((state) => state.clearShelterCurrentRecord);
  
  const [formData, setFormData] = useState({
    date: '',
    single_men: 0,
    housing_men: 0,
    single_women: 0,
    housing_women: 0,
    families: 0,
    hybrid_va_holdover: 0,
    incident_reports: 0,
    community_members_served: 0,
    nights_found_sleeping_outside: 0,
    notes: ''
  });
  
  useEffect(() => {
    if (isEditMode && id) {
      fetchRecordById(id);
    }
    
    return () => {
      clearCurrentRecord();
    };
  }, [id, isEditMode, fetchRecordById, clearCurrentRecord]);
  
  useEffect(() => {
    if (currentRecord && isEditMode) {
      setFormData({
        date: currentRecord.date ? currentRecord.date.split('T')[0] : '',
        single_men: currentRecord.single_men || 0,
        housing_men: currentRecord.housing_men || 0,
        single_women: currentRecord.single_women || 0,
        housing_women: currentRecord.housing_women || 0,
        families: currentRecord.families || 0,
        hybrid_va_holdover: currentRecord.hybrid_va_holdover || 0,
        incident_reports: currentRecord.incident_reports || 0,
        community_members_served: currentRecord.community_members_served || 0,
        nights_found_sleeping_outside: currentRecord.nights_found_sleeping_outside || 0,
        notes: currentRecord.notes || ''
      });
    }
  }, [currentRecord, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'date' || name === 'notes') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue === '' ? 0 : parseInt(numericValue, 10)
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        await updateRecord(id, formData);
        alert('Record updated successfully!');
      } else {
        await createRecord(formData);
        alert('Record created successfully!');
      }
      navigate('/shelter/weekly');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="table-loading">Loading...</div>;
  if (error && isEditMode) return <div className="table-error">Error: {error}</div>;
  
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Shelter - {isEditMode ? 'Edit' : 'New'} Weekly Report</h2>
        <div className="department-actions">
          <Link to="/shelter" className="active">Data Entry</Link>
          <Link to="/shelter/reports">Reports</Link>
        </div>
      </div>

      <div className="form-container">
        <button 
          className="secondary" 
          onClick={() => navigate('/shelter/weekly')}
          style={{ marginBottom: '16px' }}
        >
          ← Back to List
        </button>
        
        <form onSubmit={handleSubmit} className="grid-form">
          
          {/* Week Date */}
          <label>
            Week Date: *
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          
          {/* Guest Categories */}
          <h4 style={{ marginTop: '16px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Guest Categories
          </h4>
          <div className="form-row">
            <label>
              Single Men:
              <input
                type="text"
                inputMode="numeric"
                name="single_men"
                value={formData.single_men}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Housing Men:
              <input
                type="text"
                inputMode="numeric"
                name="housing_men"
                value={formData.housing_men}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Single Women:
              <input
                type="text"
                inputMode="numeric"
                name="single_women"
                value={formData.single_women}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Housing Women:
              <input
                type="text"
                inputMode="numeric"
                name="housing_women"
                value={formData.housing_women}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Families:
              <input
                type="text"
                inputMode="numeric"
                name="families"
                value={formData.families}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Hybrid/VA Holdover:
              <input
                type="text"
                inputMode="numeric"
                name="hybrid_va_holdover"
                value={formData.hybrid_va_holdover}
                onChange={handleChange}
              />
            </label>
          </div>
          
          {/* Operations & Outreach */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Operations & Outreach
          </h4>
          <div className="form-row">
            <label>
              Incident Reports:
              <input
                type="text"
                inputMode="numeric"
                name="incident_reports"
                value={formData.incident_reports}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Community Members Served:
              <input
                type="text"
                inputMode="numeric"
                name="community_members_served"
                value={formData.community_members_served}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Nights Found Sleeping Outside:
              <input
                type="text"
                inputMode="numeric"
                name="nights_found_sleeping_outside"
                value={formData.nights_found_sleeping_outside}
                onChange={handleChange}
              />
            </label>
          </div>
          
          {/* Notes */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Additional Notes
          </h4>
          <label style={{ gridColumn: '1 / -1' }}>
            Notes:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />
          </label>
          
          <div className="form-actions" style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
            <button type="submit" className="primary">
              {isEditMode ? 'Update' : 'Create'} Report
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/shelter/weekly')}
              className="secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShelterWeeklyForm;