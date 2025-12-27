import axios from "axios";

const kitchenSlice = (set, get) => ({
  kitchenRecords: [],
  loading: false,
  error: null,

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
      
      if (err.response?.status === 409) {
        set({ error: `A record for ${week_date} already exists`, loading: false });
      } else if (err.response?.status === 400) {
        set({ error: err.response.data.message, loading: false });
      } else {
        set({ error: "Failed to add kitchen record", loading: false });
      }
    }
  },

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
});

export default kitchenSlice;