import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';
import './Finance.css';

function FinanceWeeklyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const currentRecord = useStore((state) => state.finance.currentRecord);
  const loading = useStore((state) => state.finance.loading);
  const error = useStore((state) => state.finance.error);
  const fetchRecordById = useStore((state) => state.fetchFinanceRecordById);
  const createRecord = useStore((state) => state.createFinanceRecord);
  const updateRecord = useStore((state) => state.updateFinanceRecord);
  const clearCurrentRecord = useStore((state) => state.clearFinanceCurrentRecord);
  
  const [formData, setFormData] = useState({
    date: '',
    total_assets: '',
    operating_account_balance: '',
    bills_paid: '',
    payroll_paid: '',
    revenue_received: '',
    major_expenses: '',
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
        total_assets: currentRecord.total_assets?.toString() || '',
        operating_account_balance: currentRecord.operating_account_balance?.toString() || '',
        bills_paid: currentRecord.bills_paid?.toString() || '',
        payroll_paid: currentRecord.payroll_paid?.toString() || '',
        revenue_received: currentRecord.revenue_received?.toString() || '',
        major_expenses: currentRecord.major_expenses || '',
        notes: currentRecord.notes || ''
      });
    }
  }, [currentRecord, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      date: formData.date,
      total_assets: parseFloat(formData.total_assets) || 0,
      operating_account_balance: parseFloat(formData.operating_account_balance) || 0,
      bills_paid: parseFloat(formData.bills_paid) || 0,
      payroll_paid: parseFloat(formData.payroll_paid) || 0,
      revenue_received: parseFloat(formData.revenue_received) || 0,
      major_expenses: formData.major_expenses,
      notes: formData.notes
    };
    
    try {
      if (isEditMode) {
        await updateRecord(id, submitData);
        alert('Record updated successfully!');
      } else {
        await createRecord(submitData);
        alert('Record created successfully!');
      }
      navigate('/finance');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="loading-state">Loading...</div>;
  if (error && isEditMode) return <div className="error-state">Error: {error}</div>;
  
  return (
    <div className="weekly-reports-container">
      <div className="weekly-reports-form">
        <h2>{isEditMode ? 'Edit' : 'New'} Finance Weekly Report</h2>
        
        <button className="back-button" onClick={() => navigate('/finance')}>
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
            <legend>Financial Position</legend>
            <label>
              Total Assets ($):
              <input
                type="number"
                step="0.01"
                name="total_assets"
                value={formData.total_assets}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
            
            <label>
              Operating Account Balance ($):
              <input
                type="number"
                step="0.01"
                name="operating_account_balance"
                value={formData.operating_account_balance}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Weekly Activity</legend>
            <label>
              Revenue Received ($):
              <input
                type="number"
                step="0.01"
                name="revenue_received"
                value={formData.revenue_received}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
            
            <label>
              Bills Paid ($):
              <input
                type="number"
                step="0.01"
                name="bills_paid"
                value={formData.bills_paid}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
            
            <label>
              Payroll Paid ($):
              <input
                type="number"
                step="0.01"
                name="payroll_paid"
                value={formData.payroll_paid}
                onChange={handleChange}
                placeholder="0.00"
              />
            </label>
          </fieldset>
          
          <fieldset>
            <legend>Additional Information</legend>
            <label>
              Major Expenses:
              <textarea
                name="major_expenses"
                value={formData.major_expenses}
                onChange={handleChange}
                rows="3"
                placeholder="e.g., New HVAC system - $5000"
              />
            </label>
            
            <label>
              Notes:
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
              onClick={() => navigate('/finance')}
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

export default FinanceWeeklyForm;
