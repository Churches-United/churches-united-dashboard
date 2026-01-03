import axios from "axios";

const pantrySlice = (set, get) => ({
  pantryRecords: [],
  pantryWeeklyReports: [], // ← ADD THIS
  pantryMonthlyReports: [],
  loading: false,
  error: null,
  // get all records
  fetchPantryRecords: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/pantry");
      set({ pantryRecords: res.data, loading: false });
    } catch (err) {
      console.error("fetchPantryRecords error:", err);
      set({ error: "Failed to fetch pantry records", loading: false });
    }
  },

  // Add pantry record
  addPantryRecord: async (recordData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/pantry", recordData);
      set((state) => ({
        pantryRecords: [response.data, ...state.pantryRecords],
        loading: false,
      }));
    } catch (err) {
      console.error("addPantryRecord error:", err);

      if (err.response?.status === 409) {
        set({
          error: `A record for ${recordData.week_date} already exists`,
          loading: false,
        });
      } else if (err.response?.status === 400) {
        set({ error: err.response.data.message, loading: false });
      } else {
        set({ error: "Failed to add pantry record", loading: false });
      }
    }
  },

  // Edit pantry record
  editPantryRecord: async (id, recordData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/pantry/${id}`, recordData);
      set((state) => ({
        pantryRecords: state.pantryRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("editPantryRecord error:", err);

      if (err.response?.status === 404) {
        set({ error: "Record not found", loading: false });
      } else if (err.response?.status === 400) {
        set({ error: err.response.data.message, loading: false });
      } else {
        set({ error: "Failed to edit pantry record", loading: false });
      }
    }
  },

  // Delete pantry record
  deletePantryRecord: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/pantry/${id}`);
      set((state) => ({
        pantryRecords: state.pantryRecords.filter((record) => record.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("deletePantryRecord error:", err);

      if (err.response?.status === 404) {
        set({ error: "Record not found", loading: false });
      } else {
        set({ error: "Failed to delete pantry record", loading: false });
      }
    }
  },

  // Fetch weekly pantry reports
  fetchPantryWeeklyReports: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/pantry/reports/weekly");
      set({ pantryWeeklyReports: res.data, loading: false });
    } catch (err) {
      console.error("fetchPantryWeeklyReports error:", err);
      set({ error: "Failed to fetch weekly pantry reports", loading: false });
    }
  },

  // Fetch monthly pantry reports
  fetchPantryMonthlyReports: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/pantry/reports/monthly");
      set({ pantryMonthlyReports: res.data, loading: false });
    } catch (err) {
      console.error("fetchPantryMonthlyReports error:", err);
      set({ error: "Failed to fetch monthly pantry reports", loading: false });
    }
  },

  // Clear error
  clearPantryError: () => set({ error: null }),
});

export default pantrySlice;
