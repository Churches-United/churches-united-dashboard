// ==========================================
// FINANCE REPORTS SLICE
// ==========================================

const financeReportsSlice = (set, get) => ({
  
  // ==========================================
  // STATE
  // ==========================================
  financeReports: {
    summary: null,
    metrics: null,
    cashflow: null,
    loading: false,
    error: null,
  },
  
  // ==========================================
  // REPORTING ACTIONS
  // ==========================================
  
  // Fetch summary (all weeks for the year)
  fetchFinanceSummary: async (year) => {
    set((state) => ({
      financeReports: {
        ...state.financeReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/summary/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch finance summary');
      }
      
      const data = await response.json();
      
      set((state) => ({
        financeReports: {
          ...state.financeReports,
          summary: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        financeReports: {
          ...state.financeReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch financial metrics
  fetchFinanceMetrics: async (year) => {
    set((state) => ({
      financeReports: {
        ...state.financeReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/metrics/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch finance metrics');
      }
      
      const data = await response.json();
      
      set((state) => ({
        financeReports: {
          ...state.financeReports,
          metrics: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        financeReports: {
          ...state.financeReports,
          error: error.message,
          loading: false,
        },
      }));
      throw error;
    }
  },
  
  // Fetch cash flow data
  fetchFinanceCashflow: async (year) => {
    set((state) => ({
      financeReports: {
        ...state.financeReports,
        loading: true,
        error: null,
      },
    }));
    
    try {
      const response = await fetch(`/api/finance/weekly/cashflow/${year}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cash flow data');
      }
      
      const data = await response.json();
      
      set((state) => ({
        financeReports: {
          ...state.financeReports,
          cashflow: data,
          loading: false,
        },
      }));
      
      return data;
      
    } catch (error) {
      set((state) => ({
        financeReports: {
          ...state.financeReports,
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
  clearFinanceReportsError: () => {
    set((state) => ({
      financeReports: {
        ...state.financeReports,
        error: null,
      },
    }));
  },
  
  // Clear all reports
  clearAllFinanceReports: () => {
    set((state) => ({
      financeReports: {
        ...state.financeReports,
        summary: null,
        metrics: null,
        cashflow: null,
      },
    }));
  },
});

export default financeReportsSlice;