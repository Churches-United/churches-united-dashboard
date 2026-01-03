import axios from "axios";

const housingSlice = (set, get) => ({
  housingBuildings: [],
  housingRecords: [],
  loadingHousing: false,
  // Reports state
  housingMonthlyReport: [],
  housingMonthlySummary: [],
  loadingHousingReports: false,

  fetchHousingBuildings: async () => {
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
      // Find the building name from existing housingBuildings array
      const building = get().housingBuildings.find(
        (b) => b.id === res.data.housing_building_id
      );

      const recordWithBuildingName = {
        ...res.data,
        building_name: building?.name || "",
      };
      set((state) => ({
        housingRecords: [...state.housingRecords, recordWithBuildingName],
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
      const normalizedMonth = month.length === 7 ? month + "-01" : month;
      await axios.delete(`/api/housing/${buildingId}/${month}`);
      set((state) => ({
        housingRecords: state.housingRecords.filter(
          (record) =>
            !(
              record.housing_building_id === buildingId &&
              record.month_date.startsWith(normalizedMonth)
            )
        ),
      }));
    } catch (err) {
      console.error("Error deleting housing record:", err);
    } finally {
      set({ loadingHousing: false });
    }
  },

  fetchHousingMonthlyReport: async () => {
    set({ loadingHousingReports: true });
    try {
      const res = await axios.get("/api/housing/reports/monthly");
      set({ housingMonthlyReport: res.data });
    } catch (err) {
      console.error("Error fetching housing monthly reports:", err);
    } finally {
      set({ loadingHousingReports: false });
    }
  },
  fetchHousingMonthlySummary: async () => {
    set({ loadingHousingReports: true });
    try {
      const res = await axios.get("/api/housing/reports/monthly-summary");
      set({ housingMonthlySummary: res.data });
    } catch (err) {
      console.error("Error fetching housing monthly summary:", err);
    } finally {
      set({ loadingHousingReports: false });
    }
  },
});

export default housingSlice;
