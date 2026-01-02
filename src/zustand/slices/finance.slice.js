// ==========================================
// FINANCE WEEKLY SLICE - CRUD ONLY
// ==========================================

const financeWeeklySlice = (set, get) => ({
  
  // ==========================================
  // STATE
  // ==========================================
  finance: {
    records: [],
    currentRecord: null,
    loading: false,
    error: null,
  },
  
  // ==========================================
  // CRUD ACTIONS
  // ==========================================
  
  // Fetch all finance records
  fetchFinanceRecords: async (year) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const url = year 
        ? `/api/finance/weekly?year=${year}` 
        : '/api/finance/weekly';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch finance records');
      }
      
      const data = await response.json();
      
      set((state) => ({
        finance: {
          ...state.finance,
          records: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Fetch one finance record by ID
  fetchFinanceRecordById: async (id) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/${id}`);
      
      if (!response.ok) {
        throw new Error('Record not found');
      }
      
      const data = await response.json();
      
      set((state) => ({
        finance: {
          ...state.finance,
          currentRecord: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Create new finance record
  createFinanceRecord: async (formData) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch('/api/finance/weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create record');
      }
      
      const newRecord = await response.json();
      
      set((state) => ({
        finance: {
          ...state.finance,
          records: [newRecord, ...state.finance.records],
          loading: false,
        },
      }));
      
      return newRecord;
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Update finance record
  updateFinanceRecord: async (id, formData) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update record');
      }
      
      const updatedRecord = await response.json();
      
      set((state) => ({
        finance: {
          ...state.finance,
          records: state.finance.records.map((record) =>
            record.id === id ? updatedRecord : record
          ),
          currentRecord: updatedRecord,
          loading: false,
        },
      }));
      
      return updatedRecord;
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Delete finance record
  deleteFinanceRecord: async (id) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
      
      set((state) => ({
        finance: {
          ...state.finance,
          records: state.finance.records.filter((record) => record.id !== id),
          currentRecord: state.finance.currentRecord?.id === id ? null : state.finance.currentRecord,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Submit finance record
  submitFinanceRecord: async (id) => {
    set((state) => ({
      finance: {
        ...state.finance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/${id}/submit`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit record');
      }
      
      const submittedRecord = await response.json();
      
      set((state) => ({
        finance: {
          ...state.finance,
          records: state.finance.records.map((record) =>
            record.id === id ? submittedRecord : record
          ),
          currentRecord: submittedRecord,
          loading: false,
        },
      }));
      
      return submittedRecord;
      
    } catch (error) {
      set((state) => ({
        finance: {
          ...state.finance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // ==========================================
  // UTILITY ACTIONS
  // ==========================================
  
  // Clear current record
  clearFinanceCurrentRecord: () => {
    set((state) => ({
      finance: {
        ...state.finance,
        currentRecord: null,
      },
    }));
  },
  
  // Clear error
  clearFinanceError: () => {
    set((state) => ({
      finance: {
        ...state.finance,
        error: null,
      },
    }));
  },
});

export default financeWeeklySlice;