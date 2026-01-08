import axios from "axios";

const mediaReportSlice = (set) => ({
  monthlyReport: [],
  newsletterReport: [],
  audienceGrowthReport: [],
  loadingMediaReports: false,
  mediaReportError: null,

  fetchMonthlyMediaReport: async () => {
    set({ loadingMediaReports: true });
    try {
      const res = await axios.get("/api/media/reports/monthly");
      set({ monthlyReport: res.data, mediaReportError: null });
    } catch (err) {
      console.error("Monthly media report error:", err);
      set({ mediaReportError: "Failed to load monthly media report" });
    } finally {
      set({ loadingMediaReports: false });
    }
  },

  fetchNewsletterReport: async () => {
    set({ loadingMediaReports: true });
    try {
      const res = await axios.get("/api/media/reports/newsletter");
      set({ newsletterReport: res.data, mediaReportError: null });
    } catch (err) {
      console.error("Newsletter report error:", err);
      set({ mediaReportError: "Failed to load newsletter report" });
    } finally {
      set({ loadingMediaReports: false });
    }
  },

  fetchAudienceGrowthReport: async () => {
    set({ loadingMediaReports: true });
    try {
      const res = await axios.get("/api/media/reports/audience-growth");
      set({ audienceGrowthReport: res.data, mediaReportError: null });
    } catch (err) {
      console.error("Audience growth report error:", err);
      set({ mediaReportError: "Failed to load audience growth report" });
    } finally {
      set({ loadingMediaReports: false });
    }
  },
});

export default mediaReportSlice;
