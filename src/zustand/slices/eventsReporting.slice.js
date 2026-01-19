import axios from "axios";

const eventsReporting = (set, get) => ({
    upcomingEvents: [],
    eventsByVenue: [],
    loadingEventsReports: false,

fetchUpcomingEvents: async () => {
    set({ loadingEventsReports: true });
    try {
      const res = await axios.get("/api/development/events/reports/upcoming");
      set({ upcomingEvents: res.data });
    } catch (err) {
      console.error("Error fetching upcoming events:", err);
    } finally {
      set({ loadingEventsReports: false });
    }
  },

  fetchEventsByVenue: async () => {
    set({ loadingEventsReports: true });
    try {
      const res = await axios.get("/api/development/events/reports/venue");
      set({ eventsByVenue: res.data });
    } catch (err) {
      console.error("Error fetching events by venue:", err);
    } finally {
      set({ loadingEventsReports: false });
    }
  },

})

export default eventsReporting;