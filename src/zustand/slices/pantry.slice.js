import axios from "axios";

const pantrySlice = (set, get) => ({
  pantryRecords: [],
  pantryWeeklyReports: [],
  pantryMonthlyReports: [],
  pantryLoading: false,
  pantryError: null,

  fetchPantryRecords: async () => {
    set({ pantryLoading: true, pantryError: null });
    try {
      const res = await axios.get("/api/pantry");
      set({ pantryRecords: res.data, pantryLoading: false });
    } catch (err) {
      console.error("fetchPantryRecords error:", err);
      set({
        pantryError: "Failed to fetch pantry records",
        pantryLoading: false,
      });
    }
  },

  addPantryRecord: async (recordData) => {
    set({ pantryLoading: true, pantryError: null });
    try {
      const response = await axios.post("/api/pantry", recordData);
      set((state) => ({
        pantryRecords: [response.data, ...state.pantryRecords],
        pantryLoading: false,
      }));
    } catch (err) {
      console.error("addPantryRecord error:", err);
      if (err.response?.status === 409) {
        set({
          pantryError: `A record for ${recordData.week_date} already exists`,
          pantryLoading: false,
        });
      } else if (err.response?.status === 400) {
        set({ pantryError: err.response.data.message, pantryLoading: false });
      } else {
        set({
          pantryError: "Failed to add pantry record",
          pantryLoading: false,
        });
      }
    }
  },

  editPantryRecord: async (id, recordData) => {
    set({ pantryLoading: true, pantryError: null });
    try {
      const response = await axios.put(`/api/pantry/${id}`, recordData);
      set((state) => ({
        pantryRecords: state.pantryRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        pantryLoading: false,
      }));
    } catch (err) {
      console.error("editPantryRecord error:", err);
      if (err.response?.status === 404) {
        set({ pantryError: "Record not found", pantryLoading: false });
      } else if (err.response?.status === 400) {
        set({ pantryError: err.response.data.message, pantryLoading: false });
      } else {
        set({
          pantryError: "Failed to edit pantry record",
          pantryLoading: false,
        });
      }
    }
  },

  deletePantryRecord: async (id) => {
    set({ pantryLoading: true, pantryError: null });
    try {
      await axios.delete(`/api/pantry/${id}`);
      set((state) => ({
        pantryRecords: state.pantryRecords.filter((record) => record.id !== id),
        pantryLoading: false,
      }));
    } catch (err) {
      console.error("deletePantryRecord error:", err);
      if (err.response?.status === 404) {
        set({ pantryError: "Record not found", pantryLoading: false });
      } else {
        set({
          pantryError: "Failed to delete pantry record",
          pantryLoading: false,
        });
      }
    }
  },

  fetchPantryWeeklyReports: async () => {
    set({ pantryLoading: true, pantryError: null });
    try {
      const res = await axios.get("/api/pantry/reports/weekly");
      set({ pantryWeeklyReports: res.data, pantryLoading: false });
    } catch (err) {
      console.error("fetchPantryWeeklyReports error:", err);
      set({
        pantryError: "Failed to fetch weekly pantry reports",
        pantryLoading: false,
      });
    }
  },

  fetchPantryMonthlyReports: async () => {
    set({ pantryLoading: true, pantryError: null });
    try {
      const res = await axios.get("/api/pantry/reports/monthly");
      set({ pantryMonthlyReports: res.data, pantryLoading: false });
    } catch (err) {
      console.error("fetchPantryMonthlyReports error:", err);
      set({
        pantryError: "Failed to fetch monthly pantry reports",
        pantryLoading: false,
      });
    }
  },

  clearPantryError: () => set({ pantryError: null }),
});

export default pantrySlice;
