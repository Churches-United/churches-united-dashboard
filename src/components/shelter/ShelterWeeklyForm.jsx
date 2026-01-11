import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';
import './Shelter.css';

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
      navigate('/shelter');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="loading-state">Loading...</div>;
  if (error && isEditMode) return <div className="error-state">Error: {error}</div>;
  
  return (
    <div className="weekly-reports-container">
      <div className="weekly-reports-form">
        <h2>{isEditMode ? 'Edit' : 'New'} Shelter Weekly Report</h2>
        
        <button className="back-button" onClick={() => navigate('/shelter')}>
          ← Back to List
        </button>
        
        <form onSubmit={handleSubmit}>
          
          <fieldset>
            <legend>Report Date</legend>
            <label>
              Week Date: *
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <span className="form-helper-text">Select any day in the week (will be converted to Monday)</span>
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Guest Categories</legend>
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
          </fieldset>
          
          <fieldset>
            <legend>Operations & Outreach</legend>
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
          </fieldset>
          
          <fieldset>
            <legend>Notes</legend>
            <label>
              Additional Notes:
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
              />
            </label>
          </fieldset>
          
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update' : 'Create'} Report
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/shelter')}
              className="btn btn-secondary"
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