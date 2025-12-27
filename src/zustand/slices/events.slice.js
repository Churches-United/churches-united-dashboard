import axios from "axios";

const eventsSlice = (set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/development/events");
      set({ events: res.data, loading: false });
    } catch (err) {
      console.error("fetchEvents error:", err);
      set({ error: "Failed to fetch events", loading: false });
    }
  },

  addEvent: async (event) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/api/development/events", {
        name: event.name,
        datetime: event.datetime,
        venue: event.venue,
        type: event.type,
        shelter_id: event.shelter_id || null,
        notes: event.notes || null,
      });

      set((state) => ({
        events: [...state.events, res.data],
        loading: false,
      }));
    } catch (err) {
      console.error("addEvent error:", err.response?.data || err);
      set({ error: "Failed to add event", loading: false });
    }
  },

  editEvent: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(`/api/development/events/${id}`, updates);
      set((state) => ({
        events: state.events.map((e) =>
          e.id === id ? { ...e, ...res.data } : e
        ),
        loading: false,
      }));
    } catch (err) {
      console.error("editEvent error:", err);
      set({ error: "Failed to update event", loading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/development/events/${id}`);
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.error("deleteEvent error:", err);
      set({ error: "Failed to delete event", loading: false });
    }
  },
});

export default eventsSlice;
