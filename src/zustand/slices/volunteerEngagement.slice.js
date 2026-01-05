import axios from "axios";

const volunteerEngagementsSlice = (set, get) => ({
  engagements: [],
  loadingEngagements: false,
  errorEngagements: null,

  fetchEngagements: async () => {
    set({ loadingEngagements: true, errorEngagements: null });
    try {
      const res = await axios.get("/api/volunteers/engagements");
      set({ engagements: res.data, loadingEngagements: false });
    } catch (err) {
      console.error("fetchEngagements error:", err);
      set({
        errorEngagements: "Failed to fetch engagements",
        loadingEngagements: false,
      });
    }
  },

  addEngagement: async (engagement) => {
    set({ loadingEngagements: true, errorEngagements: null });
    try {
      await axios.post("/api/volunteers/engagements", engagement);
      await get().fetchEngagements();
      set({ loadingEngagements: false });
    } catch (err) {
      console.error("addEngagement error:", err);
      set({
        errorEngagements: "Failed to add engagement",
        loadingEngagements: false,
      });
    }
  },

  editEngagement: async (id, engagement) => {
    set({ loadingEngagements: true, errorEngagements: null });
    try {
      await axios.put(`/api/volunteers/engagements/${id}`, engagement);
      await get().fetchEngagements(); 
      set({ loadingEngagements: false });
    } catch (err) {
      console.error("editEngagement error:", err);
      set({
        errorEngagements: "Failed to edit engagement",
        loadingEngagements: false,
      });
    }
  },

  deleteEngagement: async (id) => {
    set({ loadingEngagements: true, errorEngagements: null });
    try {
      await axios.delete(`/api/volunteers/engagements/${id}`);
      await get().fetchEngagements();
      set({ loadingEngagements: false });
    } catch (err) {
      console.error("deleteEngagement error:", err);
      set({
        errorEngagements: "Failed to delete engagement",
        loadingEngagements: false,
      });
    }
  },
});

export default volunteerEngagementsSlice;
