import axios from "axios";

const pantrySlice = (set, get) => ({
  pantryRecords: [],
  loading: false,
  error: null,
  // get all records
  fetchPantryRecords: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/pantry");
      const data = await res.json();
      set({ pantryRecords: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


});

export default pantrySlice;
