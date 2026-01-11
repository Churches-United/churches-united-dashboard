import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';
import './ComplianceWeekly.css';

function ComplianceWeeklyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const currentRecord = useStore((state) => state.compliance.currentRecord);
  const loading = useStore((state) => state.compliance.loading);
  const error = useStore((state) => state.compliance.error);
  const fetchRecordById = useStore((state) => state.fetchComplianceRecordById);
  const createRecord = useStore((state) => state.createComplianceRecord);
  const updateRecord = useStore((state) => state.updateComplianceRecord);
  const clearCurrentRecord = useStore((state) => state.clearComplianceCurrentRecord);
  
  const [formData, setFormData] = useState({
    date: '',
    hh_without_children: 0,
    hh_with_children: 0,
    adults: 0,
    children: 0,
    seniors_55_plus: 0,
    female: 0,
    male: 0,
    other_gender: 0,
    white: 0,
    black_african_american: 0,
    native_american: 0,
    other_race: 0,
    multi_racial: 0,
    one_condition: 0,
    two_conditions: 0,
    three_plus_conditions: 0,
    total_exits: 0
  });

  const [validationError, setValidationError] = useState('');
  
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
        hh_without_children: currentRecord.hh_without_children || 0,
        hh_with_children: currentRecord.hh_with_children || 0,
        adults: currentRecord.adults || 0,
        children: currentRecord.children || 0,
        seniors_55_plus: currentRecord.seniors_55_plus || 0,
        female: currentRecord.female || 0,
        male: currentRecord.male || 0,
        other_gender: currentRecord.other_gender || 0,
        white: currentRecord.white || 0,
        black_african_american: currentRecord.black_african_american || 0,
        native_american: currentRecord.native_american || 0,
        other_race: currentRecord.other_race || 0,
        multi_racial: currentRecord.multi_racial || 0,
        one_condition: currentRecord.one_condition || 0,
        two_conditions: currentRecord.two_conditions || 0,
        three_plus_conditions: currentRecord.three_plus_conditions || 0,
        total_exits: currentRecord.total_exits || 0
      });
    }
  }, [currentRecord, isEditMode]);
  
  const calculateTotals = () => {
    const totalAge = formData.adults + formData.children + formData.seniors_55_plus;
    const totalGender = formData.female + formData.male + formData.other_gender;
    const totalRace = formData.white + formData.black_african_american + formData.native_american + 
                      formData.other_race + formData.multi_racial;
    
    return { totalAge, totalGender, totalRace };
  };

  const totals = calculateTotals();
  const allMatch = totals.totalAge === totals.totalGender && totals.totalAge === totals.totalRace;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
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
    
    setValidationError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { totalAge, totalGender, totalRace } = calculateTotals();
    
    if (totalAge !== totalGender || totalAge !== totalRace || totalGender !== totalRace) {
      const errorMsg = `Demographics validation failed:\n` +
                      `Age Total: ${totalAge}\n` +
                      `Gender Total: ${totalGender}\n` +
                      `Race Total: ${totalRace}\n\n` +
                      `All three totals must match!`;
      setValidationError(errorMsg);
      alert(errorMsg);
      return;
    }
    
    try {
      if (isEditMode) {
        await updateRecord(id, formData);
        alert('Record updated successfully!');
      } else {
        await createRecord(formData);
        alert('Record created successfully!');
      }
      navigate('/compliance');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="loading-state">Loading...</div>;
  if (error && isEditMode) return <div className="error-state">Error: {error}</div>;
  
  return (
    <div className="weekly-reports-container">
      <div className="weekly-reports-form">
        <h2>{isEditMode ? 'Edit' : 'New'} Compliance Weekly Report</h2>
        
        <button className="back-button" onClick={() => navigate('/compliance')}>
          ← Back to List
        </button>

        {/* Validation Summary */}
        <div className="validation-summary">
          <h3>Demographics Totals (Must Match)</h3>
          <div className="totals-row">
            <div className="total-item">
              <strong>Age Total:</strong>
              <span className={`total-value ${allMatch ? 'valid' : 'invalid'}`}>
                {totals.totalAge}
              </span>
            </div>
            <div className="total-item">
              <strong>Gender Total:</strong>
              <span className={`total-value ${allMatch ? 'valid' : 'invalid'}`}>
                {totals.totalGender}
              </span>
            </div>
            <div className="total-item">
              <strong>Race Total:</strong>
              <span className={`total-value ${allMatch ? 'valid' : 'invalid'}`}>
                {totals.totalRace}
              </span>
            </div>
          </div>
          {!allMatch && totals.totalAge > 0 && (
            <p className="message error">
              ⚠️ Totals do not match! Please adjust your numbers before submitting.
            </p>
          )}
          {allMatch && totals.totalAge > 0 && (
            <p className="message success">
              ✅ All totals match!
            </p>
          )}
        </div>

        {validationError && (
          <div className="error-state" style={{ marginBottom: '16px' }}>
            {validationError}
          </div>
        )}
        
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
            <legend>Households</legend>
            <label>
              Households without Children:
              <input
                type="text"
                inputMode="numeric"
                name="hh_without_children"
                value={formData.hh_without_children}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Households with Children:
              <input
                type="text"
                inputMode="numeric"
                name="hh_with_children"
                value={formData.hh_with_children}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Age Demographics</legend>
            <div className="section-total">Total: {totals.totalAge}</div>
            
            <label>
              Adults:
              <input
                type="text"
                inputMode="numeric"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Children:
              <input
                type="text"
                inputMode="numeric"
                name="children"
                value={formData.children}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Seniors (55+):
              <input
                type="text"
                inputMode="numeric"
                name="seniors_55_plus"
                value={formData.seniors_55_plus}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Gender Demographics</legend>
            <div className="section-total">Total: {totals.totalGender}</div>
            
            <label>
              Female:
              <input
                type="text"
                inputMode="numeric"
                name="female"
                value={formData.female}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Male:
              <input
                type="text"
                inputMode="numeric"
                name="male"
                value={formData.male}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Other Gender:
              <input
                type="text"
                inputMode="numeric"
                name="other_gender"
                value={formData.other_gender}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Race Demographics</legend>
            <div className="section-total">Total: {totals.totalRace}</div>
            
            <label>
              White:
              <input
                type="text"
                inputMode="numeric"
                name="white"
                value={formData.white}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Black/African American:
              <input
                type="text"
                inputMode="numeric"
                name="black_african_american"
                value={formData.black_african_american}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Native American:
              <input
                type="text"
                inputMode="numeric"
                name="native_american"
                value={formData.native_american}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Other Race:
              <input
                type="text"
                inputMode="numeric"
                name="other_race"
                value={formData.other_race}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Multi-Racial:
              <input
                type="text"
                inputMode="numeric"
                name="multi_racial"
                value={formData.multi_racial}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Health Conditions</legend>
            <label>
              One Condition:
              <input
                type="text"
                inputMode="numeric"
                name="one_condition"
                value={formData.one_condition}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Two Conditions:
              <input
                type="text"
                inputMode="numeric"
                name="two_conditions"
                value={formData.two_conditions}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Three+ Conditions:
              <input
                type="text"
                inputMode="numeric"
                name="three_plus_conditions"
                value={formData.three_plus_conditions}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Other Metrics</legend>
            <label>
              Total Exits:
              <input
                type="text"
                inputMode="numeric"
                name="total_exits"
                value={formData.total_exits}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update' : 'Create'} Report
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/compliance')}
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

export default ComplianceWeeklyForm;