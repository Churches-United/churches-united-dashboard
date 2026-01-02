import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';

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
    total_assets: 0,
    operating_account_balance: 0,
    bills_paid: 0,
    payroll_paid: 0,
    revenue_received: 0,
    major_expenses: '',
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
        total_assets: currentRecord.total_assets || 0,
        operating_account_balance: currentRecord.operating_account_balance || 0,
        bills_paid: currentRecord.bills_paid || 0,
        payroll_paid: currentRecord.payroll_paid || 0,
        revenue_received: currentRecord.revenue_received || 0,
        major_expenses: currentRecord.major_expenses || '',
        notes: currentRecord.notes || ''
      });
    }
  }, [currentRecord, isEditMode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For number inputs (currency), allow decimals
    if (name !== 'date' && name !== 'major_expenses' && name !== 'notes') {
      // Allow numbers and decimal point
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue === '' ? 0 : parseFloat(numericValue) || 0
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
      navigate('/finance');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div>Loading...</div>;
  if (error && isEditMode) return <div style={{ color: 'red' }}>Error: {error}</div>;
  
  return (
    <div>
      <h2>{isEditMode ? 'Edit' : 'New'} Finance Weekly Report</h2>
      
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
          <legend>Financial Position</legend>
          
          <div>
            <label>Total Assets ($):</label>
            <input
              type="text"
              inputMode="decimal"
              name="total_assets"
              value={formData.total_assets}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label>Operating Account Balance ($):</label>
            <input
              type="text"
              inputMode="decimal"
              name="operating_account_balance"
              value={formData.operating_account_balance}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Weekly Activity</legend>
          
          <div>
            <label>Revenue Received ($):</label>
            <input
              type="text"
              inputMode="decimal"
              name="revenue_received"
              value={formData.revenue_received}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label>Bills Paid ($):</label>
            <input
              type="text"
              inputMode="decimal"
              name="bills_paid"
              value={formData.bills_paid}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label>Payroll Paid ($):</label>
            <input
              type="text"
              inputMode="decimal"
              name="payroll_paid"
              value={formData.payroll_paid}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
        </fieldset>
        
        <fieldset>
          <legend>Additional Information</legend>
          
          <div>
            <label>Major Expenses:</label>
            <textarea
              name="major_expenses"
              value={formData.major_expenses}
              onChange={handleChange}
              rows="3"
              style={{ width: '100%' }}
              placeholder="e.g., New HVAC system - $5000"
            />
          </div>
          
          <div>
            <label>Notes:</label>
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
            onClick={() => navigate('/finance')}
            style={{ padding: '10px 20px', background: '#999', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FinanceWeeklyForm;