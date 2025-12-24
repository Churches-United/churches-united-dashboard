

const complianceWeeklySlice = (set, get) => ({
  
  compliance: {
    records: [],
    currentRecord: null,
    loading: false,
    error: null,
  },
  
 
  
  // Fetch all compliance records
  fetchComplianceRecords: async (year) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const url = year 
        ? `/api/compliance/weekly?year=${year}` 
        : '/api/compliance/weekly';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch compliance records');
      }
      
      const data = await response.json();
      
      set((state) => ({
        compliance: {
          ...state.compliance,
          records: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Fetch one compliance record by ID
  fetchComplianceRecordById: async (id) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/${id}`);
      
      if (!response.ok) {
        throw new Error('Record not found');
      }
      
      const data = await response.json();
      
      set((state) => ({
        compliance: {
          ...state.compliance,
          currentRecord: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Create new compliance record
  createComplianceRecord: async (formData) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch('/api/compliance/weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Failed to create record');
      }
      
      const newRecord = await response.json();
      
      set((state) => ({
        compliance: {
          ...state.compliance,
          records: [newRecord, ...state.compliance.records],
          loading: false,
        },
      }));
      
      return newRecord;
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Update compliance record
  updateComplianceRecord: async (id, formData) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/${id}`, {
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
        compliance: {
          ...state.compliance,
          records: state.compliance.records.map((record) =>
            record.id === id ? updatedRecord : record
          ),
          currentRecord: updatedRecord,
          loading: false,
        },
      }));
      
      return updatedRecord;
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Delete compliance record
  deleteComplianceRecord: async (id) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
      
      set((state) => ({
        compliance: {
          ...state.compliance,
          records: state.compliance.records.filter((record) => record.id !== id),
          currentRecord: state.compliance.currentRecord?.id === id ? null : state.compliance.currentRecord,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Submit compliance record
  submitComplianceRecord: async (id) => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/${id}/submit`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit record');
      }
      
      const submittedRecord = await response.json();
      
      set((state) => ({
        compliance: {
          ...state.compliance,
          records: state.compliance.records.map((record) =>
            record.id === id ? submittedRecord : record
          ),
          currentRecord: submittedRecord,
          loading: false,
        },
      }));
      
      return submittedRecord;
      
    } catch (error) {
      set((state) => ({
        compliance: {
          ...state.compliance,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Clear current record
  clearComplianceCurrentRecord: () => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        currentRecord: null,
      },
    }));
  },
  
  // Clear error
  clearComplianceError: () => {
    set((state) => ({
      compliance: {
        ...state.compliance,
        error: null,
      },
    }));
  },
});

export default complianceWeeklySlice;