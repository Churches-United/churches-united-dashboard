import axios from "axios";

const mediaSlice = (set, get) => ({
  mediaRecords: [],
  loadingMedia: false,

  // GET /api/media
  fetchMediaRecords: async () => {
    set({ loadingMedia: true });
    try {
      const res = await axios.get("/api/media");
      set({ mediaRecords: res.data });
    } catch (err) {
      console.error("Error fetching media records:", err);
    } finally {
      set({ loadingMedia: false });
    }
  },

  // POST /api/media
  addMediaRecord: async (newRecord) => {
    set({ loadingMedia: true });
    try {
      const res = await axios.post("/api/media", newRecord);
      set((state) => ({
        mediaRecords: [...state.mediaRecords, res.data],
      }));
    } catch (err) {
      console.error("Error adding media record:", err);
    } finally {
      set({ loadingMedia: false });
    }
  },

  // PUT /api/media/:platform/:month
  updateMediaRecord: async (platform, month, updates) => {
    set({ loadingMedia: true });
    try {
      const res = await axios.put(`/api/media/${platform}/${month}`, updates);

      set((state) => ({
        mediaRecords: state.mediaRecords.map((record) =>
          record.platform === platform &&
          record.month_date === res.data.month_date
            ? res.data
            : record
        ),
      }));
    } catch (err) {
      console.error("Error updating media record:", err);
    } finally {
      set({ loadingMedia: false });
    }
  },

  // DELETE /api/media/:platform/:month
  deleteMediaRecord: async (platform, month) => {
    set({ loadingMedia: true });
    try {
      const normalizedMonth = month.length === 7 ? `${month}-01` : month;

      await axios.delete(`/api/media/${platform}/${month}`);

      set((state) => ({
        mediaRecords: state.mediaRecords.filter(
          (record) =>
            !(
              record.platform === platform &&
              record.month_date.startsWith(normalizedMonth)
            )
        ),
      }));
    } catch (err) {
      console.error("Error deleting media record:", err);
    } finally {
      set({ loadingMedia: false });
    }
  },
});

export default mediaSlice;
