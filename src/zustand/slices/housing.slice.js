import axios from "axios";

const housingSlice = (set, get) => ({
  housingBuildings: [],
  housingRecords: [],
  loadingHousing: false,

  fetchingHousingBuildings: async () => {
    set({ loadingHousing: true });
    try {
      const res = await axios.get("/api/housing/buildings");
      set({ housingBuildings: res.data });
    } catch (err) {
      console.error("Error fetching housing buildings:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },

  fetchHousingRecords: async () => {
    set({ loadingHousing: true });
    try {
      const res = await axios.get("/api/housing");
      set({ housingRecords: res.data });
    } catch (err) {
      console.error("Error fetching housing records:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },

  addHousingRecord: async (newRecord) => {
    set({ loadingHousing: true });
    try {
      const res = await axios.post("/api/housing", newRecord);
      set((state) => ({
        housingRecords: [...state.housingRecords, res.data],
      }));
    } catch (err) {
      console.error("Error adding housing record:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },

  updateHousingRecord: async (buildingId, month, updates) => {
    set({ loadingHousing: true });
    try {
      const res = await axios.put(
        `/api/housing/${buildingId}/${month}`,
        updates
      );

      // Replace the updated record in state
      set((state) => ({
        housingRecords: state.housingRecords.map((record) =>
          record.housing_building_id === buildingId &&
          record.month_date === res.data.month_date
            ? res.data
            : record
        ),
      }));
    } catch (err) {
      console.error("Error updating housing record:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },
  
  updateHousingRecord: async (buildingId, month, updates) => {
    set({ loadingHousing: true });
    try {
      const res = await axios.put(
        `/api/housing/${buildingId}/${month}`,
        updates
      );

      // Replace the updated record in state
      set((state) => ({
        housingRecords: state.housingRecords.map((record) =>
          record.housing_building_id === buildingId &&
          record.month_date === res.data.month_date
            ? res.data
            : record
        ),
      }));
    } catch (err) {
      console.error("Error updating housing record:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },

  deleteHousingRecord: async (buildingId, month) => {
    set({ loadingHousing: true });
    try {
      await axios.delete(`/api/housing/${buildingId}/${month}`);
      set((state) => ({
        housingRecords: state.housingRecords.filter(
          (record) =>
            !(
              record.housing_building_id === buildingId &&
              record.month_date.startsWith(month)
            )
        ),
      }));
    } catch (err) {
      console.error("Error deleting housing record:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },
});

export default housingSlice;
