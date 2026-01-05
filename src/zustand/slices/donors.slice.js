import axios from "axios";

const donorsSlice = (set, get) => ({
  donors: [],
  loading: false,
  error: null,
  
 fetchDonors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/development/donors");
      set({ donors: res.data, loading: false });
    } catch (err) {
      console.error("fetchDonors error:", err);
      set({ error: "Failed to fetch donors", loading: false });
    }
  },
  // Add donor
  addDonor: async (name, type) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/api/development/donors", {
        name,
        type,
      });
      set((state) => ({
        donors: [...state.donors, response.data],
        loading: false,
      }));
    } catch (err) {
      console.error("addDonor error:", err);
      set({ error: "Failed to add donor", loading: false });
    }
  },

  // Edit donor
  editDonor: async (id, name, type) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/development/donors/${id}`, {
        name,
        type,
      });
      set((state) => ({
        donors: state.donors.map((donor) =>
          donor.id === id ? response.data : donor
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("editDonor error:", err);
      set({ error: "Failed to edit donor", loading: false });
    }
  },

  // Delete donor
  deleteDonor: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/development/donors/${id}`);
      set((state) => ({
        donors: state.donors.filter((donor) => donor.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("deleteDonor error:", err);
      set({ error: "Failed to delete donor", loading: false });
    }
  },
});

export default donorsSlice;
