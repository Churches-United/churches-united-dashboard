import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';

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
    if (isEditMode) {
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
    
    // For number inputs, filter non-digits and convert to number
    if (name !== 'date' && name !== 'notes') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue === '' ? 0 : parseInt(numericValue)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
  
  if (loading && isEditMode) return <div>Loading...</div>;
  if (error && isEditMode) return <div style={{ color: 'red' }}>Error: {error}</div>;
  
  return (
    <div>
      <h2>{isEditMode ? 'Edit' : 'New'} Shelter Weekly Report</h2>
      
      <form onSubmit={handleSubmit}>
        
        <fieldset>
          <legend>Week Information</legend>
          
          <div>
            <label>Week Of (Monday):</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Guest Categories</legend>
          
          <div>
            <label>Single Men:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="single_men"
              value={formData.single_men}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Housing Men:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="housing_men"
              value={formData.housing_men}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Single Women:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="single_women"
              value={formData.single_women}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Housing Women:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="housing_women"
              value={formData.housing_women}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Families:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="families"
              value={formData.families}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Hybrid/VA Holdover:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="hybrid_va_holdover"
              value={formData.hybrid_va_holdover}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Operations & Outreach</legend>
          
          <div>
            <label>Incident Reports:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="incident_reports"
              value={formData.incident_reports}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Community Members Served:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="community_members_served"
              value={formData.community_members_served}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
          
          <div>
            <label>Nights Found Sleeping Outside:</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="nights_found_sleeping_outside"
              value={formData.nights_found_sleeping_outside}
              onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Notes</legend>
          
          <div>
            <label>Additional Notes:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%' }}
            />
          </div>
        </fieldset>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isEditMode ? 'Update' : 'Create'} Report
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate('/shelter')}
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShelterWeeklyForm;