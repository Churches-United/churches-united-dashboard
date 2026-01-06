// src/zustand/slices/hrSlice.js
import axios from 'axios';

const createHRSlice = (set) => ({
  // get all the state 
  hrRecords: [],
  hrLoading: false,
  hrError: null,

  // Fetch all records
  fetchHRRecords: async () => {
    set({ hrLoading: true, hrError: null });
    try {
      const response = await axios.get('/api/hr');
      set({ hrRecords: response.data, hrLoading: false });
    } catch (error) {
      console.error('Error fetching HR records:', error);
      set({ hrError: error.message, hrLoading: false });
    }
  },

  // Add HR record to the dtabase
  addHRRecord: async (weekDate, totalPositions, openPositions, newHires, turnover, evaluations, notes) => {
    set({ hrLoading: true, hrError: null });
    try {
      const response = await axios.post('/api/hr', {
        week_date: weekDate,
        total_positions: totalPositions,
        open_positions: openPositions,
        new_hires_this_week: newHires,
        employee_turnover: turnover,
        evaluations_due: evaluations,
        notes: notes
      });
      
      set((state) => ({
        hrRecords: [...state.hrRecords, response.data],
        hrLoading: false
      }));
    } catch (error) {
      console.error('Error adding HR record:', error);
      set({ hrError: error.message, hrLoading: false });
    }
  },

  // Edit HR record or update
  editHRRecord: async (id, totalPositions, openPositions, newHires, turnover, evaluations, notes) => {
    set({ hrLoading: true, hrError: null });
    try {
      const response = await axios.put(`/api/hr/${id}`, {
        total_positions: totalPositions,
        open_positions: openPositions,
        new_hires_this_week: newHires,
        employee_turnover: turnover,
        evaluations_due: evaluations,
        notes: notes
      });
      
      set((state) => ({
        hrRecords: state.hrRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        hrLoading: false
      }));
    } catch (error) {
      console.error('Error updating HR record:', error);
      set({ hrError: error.message, hrLoading: false });
    }
  },

  // Delete HR record
  deleteHRRecord: async (id) => {
    set({ hrLoading: true, hrError: null });
    try {
      await axios.delete(`/api/hr/${id}`);
      
      set((state) => ({
        hrRecords: state.hrRecords.filter((record) => record.id !== id),
        hrLoading: false
      }));
    } catch (error) {
      console.error('Error deleting HR record:', error);
      set({ hrError: error.message, hrLoading: false });
    }
  }
});

export default createHRSlice;