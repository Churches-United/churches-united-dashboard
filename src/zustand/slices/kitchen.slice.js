// src/zustand/slices/kitchen.slice.js
import axios from 'axios';

const createKitchenSlice = (set) => ({
  // State
  kitchenRecords: [],
  kitchenWeeklyReports: [],      
  kitchenMonthlyReports: [],     
  kitchenLoading: false,
  kitchenError: null,

  // Fetch all records
  fetchKitchenRecords: async () => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      const response = await axios.get('/api/kitchen');
      set({ kitchenRecords: response.data, kitchenLoading: false });
    } catch (error) {
      console.error('Error fetching kitchen records:', error);
      set({ kitchenError: error.message, kitchenLoading: false });
    }
  },

  // Add kitchen record to the database
  addKitchenRecord: async (weekDate, totalMealsServed, notes) => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      const response = await axios.post('/api/kitchen', {
        week_date: weekDate,
        total_meals_served: totalMealsServed,
        notes: notes
      });
      
      set((state) => ({
        kitchenRecords: [...state.kitchenRecords, response.data],
        kitchenLoading: false
      }));
    } catch (error) {
      console.error('Error adding kitchen record:', error);
      set({ kitchenError: error.message, kitchenLoading: false });
    }
  },

  // Edit kitchen record or update
  editKitchenRecord: async (id, totalMealsServed, notes) => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      const response = await axios.put(`/api/kitchen/${id}`, {
        total_meals_served: totalMealsServed,
        notes: notes
      });
      
      set((state) => ({
        kitchenRecords: state.kitchenRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        kitchenLoading: false
      }));
    } catch (error) {
      console.error('Error updating kitchen record:', error);
      set({ kitchenError: error.message, kitchenLoading: false });
    }
  },

  // Delete kitchen record
  deleteKitchenRecord: async (id) => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      await axios.delete(`/api/kitchen/${id}`);
      
      set((state) => ({
        kitchenRecords: state.kitchenRecords.filter((record) => record.id !== id),
        kitchenLoading: false
      }));
    } catch (error) {
      console.error('Error deleting kitchen record:', error);
      set({ kitchenError: error.message, kitchenLoading: false });
    }
  },  

  // Fetch weekly kitchen reports
  fetchKitchenWeeklyReports: async () => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      const res = await axios.get('/api/kitchen/reports/weekly');
      set({ kitchenWeeklyReports: res.data, kitchenLoading: false });
    } catch (err) {
      console.error('fetchKitchenWeeklyReports error:', err);
      set({ kitchenError: 'Failed to fetch weekly kitchen reports', kitchenLoading: false });
    }
  },

  // Fetch monthly kitchen reports
  fetchKitchenMonthlyReports: async () => {
    set({ kitchenLoading: true, kitchenError: null });
    try {
      const res = await axios.get('/api/kitchen/reports/monthly');
      set({ kitchenMonthlyReports: res.data, kitchenLoading: false });
    } catch (err) {
      console.error('fetchKitchenMonthlyReports error:', err);
      set({ kitchenError: 'Failed to fetch monthly kitchen reports', kitchenLoading: false });
    }
  },

  // Clear error
  clearKitchenError: () => set({ kitchenError: null }),
});

export default createKitchenSlice;


