import axios from "axios";

const donationReporting = ((set, get) => ({
  weeklyReports: [],
  monthlyReports: [],
  byDonorReports: [],
  loadingReports: false,

  fetchWeeklyReports: async () => {
    set({ loadingReports: true });
    try {
      const res = await axios.get("/api/development/donations/reports/weekly");
      set({ weeklyReports: res.data });
    } catch (err) {
      console.error("Error fetching weekly reports:", err);
    } finally {
      set({ loadingReports: false });
    }
  },

  fetchMonthlyReports: async () => {
    set({ loadingReports: true });
    try {
      const res = await axios.get("/api/development/donations/reports/monthly");
      set({ monthlyReports: res.data });
    } catch (err) {
      console.error("Error fetching monthly reports:", err);
    } finally {
      set({ loadingReports: false });
    }
  },
  fetchByDonorReports: async () => {
    set({ loadingReports: true });
    try {
      const res = await axios.get(
        "/api/development/donations/reports/by-donor"
      );
      set({ byDonorReports: res.data });
    } catch (err) {
      console.error("Error fetching by-donor reports:", err);
    } finally {
      set({ loadingReports: false });
    }
  },
}));

export default donationReporting;
