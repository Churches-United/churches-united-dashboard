import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
      navigate('/finance/weekly');
    } catch (err) {
      alert(`Failed to ${isEditMode ? 'update' : 'create'} record: ${err.message}`);
    }
  };
  
  if (loading && isEditMode) return <div className="table-loading">Loading...</div>;
  if (error && isEditMode) return <div className="table-error">Error: {error}</div>;
  
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Finance - {isEditMode ? 'Edit' : 'New'} Weekly Report</h2>
        <div className="department-actions">
          <Link to="/finance" className="active">Data Entry</Link>
          <Link to="/finance/reports">Reports</Link>
        </div>
      </div>

      <div className="form-container">
        <button 
          className="secondary" 
          onClick={() => navigate('/finance/weekly')}
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
          
          {/* Financial Position */}
          <h4 style={{ marginTop: '16px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Financial Position
          </h4>
          <div className="form-row">
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
          </div>
          
          {/* Weekly Activity */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Weekly Activity
          </h4>
          <div className="form-row">
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
          </div>
          
          {/* Additional Information */}
          <h4 style={{ marginTop: '24px', color: 'var(--brand-primary)', gridColumn: '1 / -1' }}>
            Additional Information
          </h4>
          <label style={{ gridColumn: '1 / -1' }}>
            Major Expenses:
            <textarea
              name="major_expenses"
              value={formData.major_expenses}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., New HVAC system - $5000"
            />
          </label>
          
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
              onClick={() => navigate('/finance/weekly')}
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

export default FinanceWeeklyForm;