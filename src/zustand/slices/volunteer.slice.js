import axios from "axios";

const volunteersSlice = (set, get) => ({
  volunteers: [],
  loadingVolunteers: false,
  errorVolunteers: null,

  fetchVolunteers: async () => {
    set({ loadingVolunteers: true, errorVolunteers: null });
    try {
      const res = await axios.get("/api/volunteers");
      set({ volunteers: res.data, loadingVolunteers: false });
    } catch (err) {
      console.error("fetchVolunteers error:", err);
      set({ errorVolunteers: "Failed to fetch volunteers", loadingVolunteers: false });
    }
  },

  addVolunteer: async (volunteer) => {
    set({ loadingVolunteers: true, errorVolunteers: null });
    try {
      await axios.post("/api/volunteers", volunteer);
      await get().fetchVolunteers(); // refresh list
      set({ loadingVolunteers: false });
    } catch (err) {
      console.error("addVolunteer error:", err);
      set({ errorVolunteers: "Failed to add volunteer", loadingVolunteers: false });
    }
  },

  editVolunteer: async (id, volunteer) => {
    set({ loadingVolunteers: true, errorVolunteers: null });
    try {
      await axios.put(`/api/volunteers/${id}`, volunteer);
      await get().fetchVolunteers(); // refresh list
      set({ loadingVolunteers: false });
    } catch (err) {
      console.error("editVolunteer error:", err);
      set({ errorVolunteers: "Failed to edit volunteer", loadingVolunteers: false });
    }
  },

  deleteVolunteer: async (id) => {
    set({ loadingVolunteers: true, errorVolunteers: null });
    try {
      await axios.delete(`/api/volunteers/${id}`);
      await get().fetchVolunteers(); // refresh list
      set({ loadingVolunteers: false });
    } catch (err) {
      console.error("deleteVolunteer error:", err);
      set({ errorVolunteers: "Failed to delete volunteer", loadingVolunteers: false });
    }
  },
});

export default volunteersSlice;
