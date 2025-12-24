import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store'; 

function ComplianceWeeklyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // Get state and actions from store
  const loading = useStore((state) => state.compliance.loading);
  const error = useStore((state) => state.compliance.error);
  const createRecord = useStore((state) => state.createComplianceRecord);
  const updateRecord = useStore((state) => state.updateComplianceRecord);
  const fetchRecordById = useStore((state) => state.fetchComplianceRecordById);
  const currentRecord = useStore((state) => state.compliance.currentRecord);
  
  // Form state
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
    total_exits: 0,
  });
  
  const [validationError, setValidationError] = useState(null);
  
  // Load record for editing
  useEffect(() => {
    if (isEditMode && id) {
      fetchRecordById(id);
    }
  }, [isEditMode, id, fetchRecordById]);
  
  // Populate form when editing
  useEffect(() => {
    if (isEditMode && currentRecord) {
      setFormData({
        date: currentRecord.date,
        hh_without_children: currentRecord.hh_without_children,
        hh_with_children: currentRecord.hh_with_children,
        adults: currentRecord.adults,
        children: currentRecord.children,
        seniors_55_plus: currentRecord.seniors_55_plus,
        female: currentRecord.female,
        male: currentRecord.male,
        other_gender: currentRecord.other_gender,
        white: currentRecord.white,
        black_african_american: currentRecord.black_african_american,
        native_american: currentRecord.native_american,
        other_race: currentRecord.other_race,
        multi_racial: currentRecord.multi_racial,
        one_condition: currentRecord.one_condition,
        two_conditions: currentRecord.two_conditions,
        three_plus_conditions: currentRecord.three_plus_conditions,
        total_exits: currentRecord.total_exits,
      });
    }
  }, [isEditMode, currentRecord]);
  
  // Calculate totals
  const totalHouseholds = formData.hh_without_children + formData.hh_with_children;
  const totalIndividuals = formData.adults + formData.children + formData.seniors_55_plus;
  const totalGender = formData.female + formData.male + formData.other_gender;
  const totalRace = formData.white + formData.black_african_american + formData.native_american + formData.other_race + formData.multi_racial;
  const totalConditions = formData.one_condition + formData.two_conditions + formData.three_plus_conditions;
  
  // Validate demographics
  const isValid = totalGender === totalRace && totalGender === totalIndividuals;
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'date' ? value : Number(value),
    });
    setValidationError(null);
  };
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValid) {
      setValidationError(
        `Demographics don't match! Gender (${totalGender}) must equal Race (${totalRace}) and Individuals (${totalIndividuals})`
      );
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
    } catch (error) {
      console.error('Submit error:', error);
    }
  };
  
  const handleCancel = () => {
    if (window.confirm('Discard changes?')) {
      navigate('/compliance');
    }
  };
  
  return (
    <div>
      <h2>{isEditMode ? 'Edit' : 'New'} Compliance Weekly Report</h2>
      
      <button onClick={handleCancel}>← Back to List</button>
      
      {error && <div style={{ color: 'red' }}>❌ {error}</div>}
      {validationError && <div style={{ color: 'red' }}>⚠️ {validationError}</div>}
      
      <form onSubmit={handleSubmit}>
        
        <fieldset>
          <legend>Report Date</legend>
          <div>
            <label>Week Date: *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <br />
            <small>Select any day in the week (will be converted to Monday)</small>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Households</legend>
          <div>
            <label>Without Children:</label>
            <input
              type="number"
              name="hh_without_children"
              value={formData.hh_without_children}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>With Children:</label>
            <input
              type="number"
              name="hh_with_children"
              value={formData.hh_with_children}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <strong>Total Households: {totalHouseholds}</strong>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Age Demographics</legend>
          <div>
            <label>Adults:</label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Children:</label>
            <input
              type="number"
              name="children"
              value={formData.children}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Seniors (55+):</label>
            <input
              type="number"
              name="seniors_55_plus"
              value={formData.seniors_55_plus}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <strong>Total Individuals: {totalIndividuals}</strong>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Gender Demographics</legend>
          <div>
            <label>Female:</label>
            <input
              type="number"
              name="female"
              value={formData.female}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Male:</label>
            <input
              type="number"
              name="male"
              value={formData.male}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Other:</label>
            <input
              type="number"
              name="other_gender"
              value={formData.other_gender}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <strong style={{ color: totalGender !== totalIndividuals ? 'red' : 'green' }}>
              Total Gender: {totalGender} {totalGender !== totalIndividuals && '⚠️'}
            </strong>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Race Demographics</legend>
          <div>
            <label>White:</label>
            <input
              type="number"
              name="white"
              value={formData.white}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Black/African American:</label>
            <input
              type="number"
              name="black_african_american"
              value={formData.black_african_american}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Native American:</label>
            <input
              type="number"
              name="native_american"
              value={formData.native_american}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Other Race:</label>
            <input
              type="number"
              name="other_race"
              value={formData.other_race}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Multi-racial:</label>
            <input
              type="number"
              name="multi_racial"
              value={formData.multi_racial}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <strong style={{ color: totalRace !== totalIndividuals ? 'red' : 'green' }}>
              Total Race: {totalRace} {totalRace !== totalIndividuals && '⚠️'}
            </strong>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Health Conditions</legend>
          <div>
            <label>One Condition:</label>
            <input
              type="number"
              name="one_condition"
              value={formData.one_condition}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Two Conditions:</label>
            <input
              type="number"
              name="two_conditions"
              value={formData.two_conditions}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <label>Three+ Conditions:</label>
            <input
              type="number"
              name="three_plus_conditions"
              value={formData.three_plus_conditions}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div>
            <strong>Total Conditions: {totalConditions}</strong>
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Exits</legend>
          <div>
            <label>Total Exits:</label>
            <input
              type="number"
              name="total_exits"
              value={formData.total_exits}
              onChange={handleChange}
              min="0"
            />
          </div>
        </fieldset>
        
        <fieldset style={{ background: isValid ? '#e8f5e9' : '#ffebee' }}>
          <legend>Validation Check</legend>
          <div>
            <p>Total Individuals (Age): <strong>{totalIndividuals}</strong></p>
            <p>Total Gender: <strong>{totalGender}</strong></p>
            <p>Total Race: <strong>{totalRace}</strong></p>
            {isValid ? (
              <p style={{ color: 'green' }}>✅ All demographics match!</p>
            ) : (
              <p style={{ color: 'red' }}>⚠️ Demographics must match to submit</p>
            )}
          </div>
        </fieldset>
        
        <div>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
          
          <button type="submit" disabled={loading || !isValid}>
            {loading ? 'Saving...' : (isEditMode ? 'Update Report' : 'Create Report')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComplianceWeeklyForm;