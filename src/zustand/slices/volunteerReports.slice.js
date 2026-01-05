import axios from "axios";

const volunteerReportingSlice = (set, get) => ({
  volunteerWeeklyReports: [],
  volunteerMonthlyReports: [],
  volunteerByLocationReports: [],
  loadingVolunteerReports: false,
  errorVolunteerReports: null,

  fetchVolunteerWeeklyReports: async () => {
    set({ loadingVolunteerReports: true, errorVolunteerReports: null });
    try {
      const res = await axios.get("/api/volunteers/engagements/reports/weekly");
      set({ volunteerWeeklyReports: res.data });
    } catch (err) {
      console.error("Error fetching volunteer weekly reports:", err);
      set({ loadingVolunteerReports: false });
    }
  },

  fetchVolunteerMonthlyReports: async () => {
    set({ loadingVolunteerReports: true, errorVolunteerReports: null });
    try {
      const res = await axios.get(
        "/api/volunteers/engagements/reports/monthly"
      );
      set({ volunteerMonthlyReports: res.data });
    } catch (err) {
      console.error("Error fetching volunteer monthly reports:", err);
      set({
        errorVolunteerReports: "Failed to load monthly volunteer reports",
      });
    } finally {
      set({ loadingVolunteerReports: false });
    }
  },

  fetchVolunteerByLocationReports: async () => {
    set({ loadingVolunteerReports: true, errorVolunteerReports: null });
    try {
      const res = await axios.get(
        "/api/volunteers/engagements/reports/location"
      );
      set({ volunteerByLocationReports: res.data });
    } catch (err) {
      console.error("Error fetching volunteer location reports:", err);
      set({
        errorVolunteerReports: "Failed to load volunteer location reports",
      });
    } finally {
      set({ loadingVolunteerReports: false });
    }
  },
  fetchVolunteerMonthlyByLocationReports: async () => {
    set({ loadingVolunteerReports: true, errorVolunteerReports: null });
    try {
      const res = await axios.get(
        "/api/volunteers/engagements/reports/monthly-location"
      );
      set({ volunteerMonthlyByLocationReports: res.data });
    } catch (err) {
      console.error("Error fetching volunteer monthly-location reports:", err);
      set({
        errorVolunteerReports:
          "Failed to load volunteer monthly location reports",
      });
    } finally {
      set({ loadingVolunteerReports: false });
    }
  },
});

export default volunteerReportingSlice;