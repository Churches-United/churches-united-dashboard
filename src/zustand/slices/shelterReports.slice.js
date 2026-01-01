// ==========================================
// SHELTER REPORTS SLICE
// ==========================================

const shelterReportsSlice = (set, get) => ({
  
  // ==========================================
  // STATE
  // ==========================================
  shelterReports: {
    summary: null,
    guests: null,
    incidents: null,
    loading: false,
    error: null,
  },
  
  // ==========================================
  // REPORTING ACTIONS
  // ==========================================
  
  // Fetch summary (all weeks for the year)
  fetchShelterSummary: async (year) => {
    set((state) => ({
      shelterReports: {
        ...state.shelterReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/summary/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch shelter summary');
      }
      
      const data = await response.json();
      
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
          summary: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch guest breakdown
  fetchShelterGuests: async (year) => {
    set((state) => ({
      shelterReports: {
        ...state.shelterReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/guests/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch guest breakdown');
      }
      
      const data = await response.json();
      
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
          guests: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch incidents & outreach
  fetchShelterIncidents: async (year) => {
    set((state) => ({
      shelterReports: {
        ...state.shelterReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/shelter/incidents/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch incidents data');
      }
      
      const data = await response.json();
      
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
          incidents: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        shelterReports: {
          ...state.shelterReports,
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
  
  // Clear error
  clearShelterReportsError: () => {
    set((state) => ({
      shelterReports: {
        ...state.shelterReports,
        error: null,
      },
    }));
  },
  
  // Clear all reports
  clearAllShelterReports: () => {
    set((state) => ({
      shelterReports: {
        ...state.shelterReports,
        summary: null,
        guests: null,
        incidents: null,
      },
    }));
  },
});

export default shelterReportsSlice;