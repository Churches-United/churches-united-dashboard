import axios from "axios";

const donationReporting = (set, get) => ({
  donationWeeklyReports: [],
  donationMonthlyReports: [],
  donationByDonorReports: [],
  loadingDonationReports: false,
  errorDonationReports: null,

  fetchWeeklyDonationReports: async () => {
    set({ loadingDonationReports: true, errorDonationReports: null });
    try {
      const res = await axios.get(
        "/api/development/donations/reports/weekly"
      );
      set({ donationWeeklyReports: res.data });
    } catch (err) {
      console.error("Error fetching weekly donation reports:", err);
      set({ errorDonationReports: "Failed to load weekly donation reports" });
    } finally {
      set({ loadingDonationReports: false });
    }
  },

  fetchMonthlyDonationReports: async () => {
    set({ loadingDonationReports: true, errorDonationReports: null });
    try {
      const res = await axios.get(
        "/api/development/donations/reports/monthly"
      );
      set({ donationMonthlyReports: res.data });
    } catch (err) {
      console.error("Error fetching monthly donation reports:", err);
      set({ errorDonationReports: "Failed to load monthly donation reports" });
    } finally {
      set({ loadingDonationReports: false });
    }
  },

  fetchByDonorReports: async () => {
    set({ loadingDonationReports: true, errorDonationReports: null });
    try {
      const res = await axios.get(
        "/api/development/donations/reports/by-donor"
      );
      set({ donationByDonorReports: res.data });
    } catch (err) {
      console.error("Error fetching donation by-donor reports:", err);
      set({
        errorDonationReports: "Failed to load donation by-donor reports",
      });
    } finally {
      set({ loadingDonationReports: false });
    }
  },
});

export default donationReporting;
