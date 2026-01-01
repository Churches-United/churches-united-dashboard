// ==========================================
// SHELTER WEEKLY SLICE - CRUD ONLY
// ==========================================

const shelterWeeklySlice = (set, get) => ({
  
  // ==========================================
  // STATE
  // ==========================================
  shelter: {
    records: [],
    currentRecord: null,
    loading: false,
    error: null,
  },
  
  // ==========================================
  // CRUD ACTIONS
  // ==========================================
  
  // Fetch all shelter records
  fetchShelterRecords: async (year) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const url = year 
        ? `/api/shelter?year=${year}` 
        : '/api/shelter';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch shelter records');
      }
      
      const data = await response.json();
      
      set((state) => ({
        shelter: {
          ...state.shelter,
          records: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Fetch one shelter record by ID
  fetchShelterRecordById: async (id) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/${id}`);
      
      if (!response.ok) {
        throw new Error('Record not found');
      }
      
      const data = await response.json();
      
      set((state) => ({
        shelter: {
          ...state.shelter,
          currentRecord: data,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
          error: error.message,
          loading: false,
        },
      }));
    }
  },
  
  // Create new shelter record
  createShelterRecord: async (formData) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch('/api/shelter', {
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
        shelter: {
          ...state.shelter,
          records: [newRecord, ...state.shelter.records],
          loading: false,
        },
      }));
      
      return newRecord;
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Update shelter record
  updateShelterRecord: async (id, formData) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/${id}`, {
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
        shelter: {
          ...state.shelter,
          records: state.shelter.records.map((record) =>
            record.id === id ? updatedRecord : record
          ),
          currentRecord: updatedRecord,
          loading: false,
        },
      }));
      
      return updatedRecord;
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Delete shelter record
  deleteShelterRecord: async (id) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
      
      set((state) => ({
        shelter: {
          ...state.shelter,
          records: state.shelter.records.filter((record) => record.id !== id),
          currentRecord: state.shelter.currentRecord?.id === id ? null : state.shelter.currentRecord,
          loading: false,
        },
      }));
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Submit shelter record
  submitShelterRecord: async (id) => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/${id}/submit`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit record');
      }
      
      const submittedRecord = await response.json();
      
      set((state) => ({
        shelter: {
          ...state.shelter,
          records: state.shelter.records.map((record) =>
            record.id === id ? submittedRecord : record
          ),
          currentRecord: submittedRecord,
          loading: false,
        },
      }));
      
      return submittedRecord;
      
    } catch (error) {
      set((state) => ({
        shelter: {
          ...state.shelter,
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
  clearShelterCurrentRecord: () => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        currentRecord: null,
      },
    }));
  },
  
  // Clear error
  clearShelterError: () => {
    set((state) => ({
      shelter: {
        ...state.shelter,
        error: null,
      },
    }));
  },
});

export default shelterWeeklySlice;