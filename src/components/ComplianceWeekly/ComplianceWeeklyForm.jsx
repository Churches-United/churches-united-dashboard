import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
    total_households: 0,
    total_individuals: 0,
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
    condition1: 0,
    condition2: 0,
    condition3: 0,
    total_exits: 0,
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
        total_households: currentRecord.total_households || 0,
        total_individuals: currentRecord.total_individuals || 0,
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
        condition1: currentRecord.condition1 || 0,
        condition2: currentRecord.condition2 || 0,
        condition3: currentRecord.condition3 || 0,

        total_exits: currentRecord.total_exits || 0,
  
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
  
  // Calculate totals for validation
  const calculateTotals = () => {
    const totalAge = formData.adults + formData.children + formData.seniors_55_plus;
    const totalGender = formData.female + formData.male + formData.other_gender;
    const totalRace = formData.white + formData.black_african_american + 
                      formData.native_american + formData.other_race + formData.multi_racial;
    return { totalAge, totalGender, totalRace };
  };

  const totals = calculateTotals();
  const allMatch = totals.totalAge === totals.totalGender && totals.totalAge === totals.totalRace;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate totals match
    if (!allMatch) {
      alert('Demographics totals must match! Please check Age, Gender, and Race totals.');
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
      navigate('/compliance/weekly');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="table-loading">Loading...</div>;
  if (error && isEditMode) return <div className="table-error">Error: {error}</div>;
  
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Compliance - {isEditMode ? 'Edit' : 'New'} Weekly Report</h2>
        <div className="department-actions">
          <Link to="/compliance" className="active">Data Entry</Link>
          <Link to="/compliance/reports">Reports</Link>
        </div>
      </div>

      <div className="form-container">
        <button 
          className="secondary" 
          onClick={() => navigate('/compliance/weekly')}
          style={{ marginBottom: '16px' }}
        >
          ← Back to List
        </button>
        
        {/* Validation Summary */}
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px',
          border: `2px solid ${allMatch ? '#28a745' : '#dc3545'}`,
          borderRadius: '4px',
          backgroundColor: allMatch ? '#d4edda' : '#f8d7da'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Demographics Totals (Must Match)</h4>
          <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
            <span style={{ color: allMatch ? '#28a745' : '#dc3545' }}>
              Age Total: {totals.totalAge}
            </span>
            <span style={{ color: allMatch ? '#28a745' : '#dc3545' }}>
              Gender Total: {totals.totalGender}
            </span>
            <span style={{ color: allMatch ? '#28a745' : '#dc3545' }}>
              Race Total: {totals.totalRace}
            </span>
          </div>
          {allMatch ? (
            <p style={{ margin: '10px 0 0 0', color: '#28a745' }}>✓ All totals match!</p>
          ) : (
            <p style={{ margin: '10px 0 0 0', color: '#dc3545' }}>✗ Totals must match to submit</p>
          )}
        </div>
        
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
          
          {/* Basic Counts */}
          <h4 style={{ marginTop: '16px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Household Information
          </h4>
          <div className="form-row">
            <label>
              Total Households:
              <input
                type="text"
                inputMode="numeric"
                name="total_households"
                value={formData.total_households}
                onChange={handleChange}
              />
            </label>
            
            <label>
              Total Individuals:
              <input
                type="text"
                inputMode="numeric"
                name="total_individuals"
                value={formData.total_individuals}
                onChange={handleChange}
              />
            </label>
          </div>
          
          {/* Age Demographics */}
          <h4 style={{ 
            marginTop: '24px', 
            color: 'var(--brand-primary)', 
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Age Demographics</span>
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              color: totals.totalAge === totals.totalGender && totals.totalAge === totals.totalRace ? '#28a745' : '#dc3545'
            }}>
              Total: {totals.totalAge}
            </span>
          </h4>
          <div className="form-row">
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
              Seniors 55+:
              <input
                type="text"
                inputMode="numeric"
                name="seniors_55_plus"
                value={formData.seniors_55_plus}
                onChange={handleChange}
              />
            </label>
          </div>
          
          {/* Gender Demographics */}
          <h4 style={{ 
            marginTop: '24px', 
            color: 'var(--brand-primary)', 
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Gender Demographics</span>
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              color: totals.totalAge === totals.totalGender && totals.totalAge === totals.totalRace ? '#28a745' : '#dc3545'
            }}>
              Total: {totals.totalGender}
            </span>
          </h4>
          <div className="form-row">
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
          </div>
          
          {/* Race Demographics */}
          <h4 style={{ 
            marginTop: '24px', 
            color: 'var(--brand-primary)', 
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Race Demographics</span>
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              color: totals.totalAge === totals.totalGender && totals.totalAge === totals.totalRace ? '#28a745' : '#dc3545'
            }}>
              Total: {totals.totalRace}
            </span>
          </h4>
          <div className="form-row">
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
          </div>
          
          {/*  Conditions */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Conditions
          </h4>
          <div className="form-row">
            <label>
              1_Condition:
              <input
                type="text"
                inputMode="numeric"
                name="condition1"
                value={formData.condition1}
                onChange={handleChange}
              />
            </label>
            
            <label>
              2_Condition:
              <input
                type="text"
                inputMode="numeric"
                name="condition2"
                value={formData.condition2}
                onChange={handleChange}
              />
            </label>
            
            <label>
              3_Condition:
              <input
                type="text"
                inputMode="numeric"
                name="condition3"
                value={formData.condition3}
                onChange={handleChange}
              />
            </label>
            
          </div>
          
          {/* Exit Destinations */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Exit Destinations
          </h4>
          <div className="form-row">
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
              onClick={() => navigate('/compliance/weekly')}
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

export default ComplianceWeeklyForm;