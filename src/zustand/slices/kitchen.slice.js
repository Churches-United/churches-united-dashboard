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
});

export default kitchenSlice;