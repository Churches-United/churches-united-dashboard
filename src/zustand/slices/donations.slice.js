import axios from "axios";

const donationsSlice = (set, get) => ({
  donations: [],
  loading: false,
  error: null,

  fetchDonations: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/development/donations");
      set({
        donations: res.data,
        loading: false,
      });
    } catch (err) {
      console.error("fetchDonations error:", err);
      set({
        error: "Failed to fetch donations",
        loading: false,
      });
    }
  },
  // Add donation
  addDonation: async (donation) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/api/development/donations", donation);

      set((state) => ({
        donations: [res.data, ...state.donations],
        loading: false,
      }));
    } catch (err) {
      console.error("addDonation error:", err);
      set({ error: "Failed to add donation", loading: false });
    }
  },
  // EDIT donation
  editDonation: async (id, donation) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/api/development/donations/${id}`, donation);

      set((state) => ({
        donations: state.donations.map((d) =>
          d.id === id ? { ...d, ...res.data } : d
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("editDonation error:", err);
      set({ error: "Failed to update donation", loading: false });
    }
  },
  // DELETE donation
  deleteDonation: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/development/donations/${id}`);

      set((state) => ({
        donations: state.donations.filter((d) => d.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("deleteDonation error:", err);
      set({ error: "Failed to delete donation", loading: false });
    }
  },
});

export default donationsSlice;
