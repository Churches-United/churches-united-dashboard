// ==========================================
// COMPLIANCE REPORTS SLICE
// ==========================================

const complianceReportsSlice = (set, get) => ({
  
  // ==========================================
  // STATE
  // ==========================================
  complianceReports: {
    monthlyReport: [],
    yearlyReport: null,
    demographics: null,
    dashboard: null,
    loading: false,
    error: null,
  },
  
 
  
  // Fetch monthly report
  fetchComplianceMonthlyReport: async (year) => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/reports/monthly/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch monthly report');
      }
      
      const data = await response.json();
      
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          monthlyReport: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch yearly summary
  fetchComplianceYearlyReport: async (year) => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/reports/yearly/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch yearly report');
      }
      
      const data = await response.json();
      
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          yearlyReport: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch demographics report
  fetchComplianceDemographics: async (year) => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/reports/demographics/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch demographics');
      }
      
      const data = await response.json();
      
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          demographics: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch dashboard data
  fetchComplianceDashboard: async (year) => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/compliance/weekly/reports/dashboard/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
          dashboard: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        complianceReports: {
          ...state.complianceReports,
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
  clearComplianceReportsError: () => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        error: null,
      },
    }));
  },
  
  // Clear all reports (useful when changing years)
  clearAllComplianceReports: () => {
    set((state) => ({
      complianceReports: {
        ...state.complianceReports,
        monthlyReport: [],
        yearlyReport: null,
        demographics: null,
        dashboard: null,
      },
    }));
  },
});

export default complianceReportsSlice;