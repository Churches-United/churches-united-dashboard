import axios from "axios";

const kitchenSlice = (set, get) => ({
// all state 
  kitchenRecords: [],
  weeklyReports: [],
  monthlyReports: [],
  loading: false,
  error: null,

  // Fetch all kitchen records
  fetchKitchenRecords: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/kitchen");
      const data = await res.json();
      set({ kitchenRecords: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch single kitchen record by id
  fetchKitchenRecord: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/kitchen/${id}`);
      if (!res.ok) {
        throw new Error('Record not found');
      }
      const data = await res.json();
      set({ loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // Add kitchen record
  addKitchenRecord: async (week_date, total_meals_served, notes) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/kitchen", {
        week_date,
        total_meals_served,
        notes,
      });
      set((state) => ({
        kitchenRecords: [response.data, ...state.kitchenRecords],
        loading: false,
      }));
    } catch (err) {
      console.error("addKitchenRecord error:", err);
      
      // Handle specific error messages from backend
      if (err.response?.status === 409) {
        set({ error: `A record for ${week_date} already exists`, loading: false });
      } else if (err.response?.status === 400) {
        set({ error: err.response.data.message, loading: false });
      } else {
        set({ error: "Failed to add kitchen record", loading: false });
      }
    }
  },

  // Edit kitchen record
  editKitchenRecord: async (id, total_meals_served, notes) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/kitchen/${id}`, {
        total_meals_served,
        notes,
      });
      set((state) => ({
        kitchenRecords: state.kitchenRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("editKitchenRecord error:", err);
      
      if (err.response?.status === 404) {
        set({ error: "Record not found", loading: false });
      } else if (err.response?.status === 400) {
        set({ error: err.response.data.message, loading: false });
      } else {
        set({ error: "Failed to edit kitchen record", loading: false });
      }
    }
  },

  // Delete kitchen record
  deleteKitchenRecord: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/kitchen/${id}`);
      set((state) => ({
        kitchenRecords: state.kitchenRecords.filter((record) => record.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("deleteKitchenRecord error:", err);
      
      if (err.response?.status === 404) {
        set({ error: "Record not found", loading: false });
      } else {
        set({ error: "Failed to delete kitchen record", loading: false });
      }
    }
  },

  // Fetch weekly reports
  fetchWeeklyReports: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/kitchen/reports/weekly");
      const data = await res.json();
      set({ weeklyReports: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch monthly reports
  fetchMonthlyReports: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/kitchen/reports/monthly");
      const data = await res.json();
      set({ monthlyReports: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Clear error
  clearKitchenError: () => set({ error: null }),
});

export default kitchenSlice;