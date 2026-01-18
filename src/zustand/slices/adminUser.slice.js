import axios from "axios";

axios.defaults.withCredentials = true;

const createAdminUserSlice = (set, get) => ({
  users: [],        
  adminError: "",   

  // Fetch all users (admin-only)
  fetchUsers: async () => {
    try {
      const { data } = await axios.get("/api/admin/users");
      set({ users: data });
    } catch (err) {
      console.error("fetchUsers error:", err);
      set({ adminError: err.response?.status === 403 ? "Forbidden" : "Failed to fetch users" });
    }
  },

  // Add new user (admin-only)
  addUser: async (userData) => {
    try {
      const { data } = await axios.post("/api/admin/users", userData);
      set((state) => ({ users: [...state.users, data] }));
    } catch (err) {
      console.error("addUser error:", err);
      set({ adminError: "Failed to add user" });
    }
  },

  // Toggle active status for a user
  toggleUserActive: async (userId, active) => {
    try {
      const { data } = await axios.put(`/api/admin/users/${userId}/active`, { active });
      set((state) => ({
        users: state.users.map((u) => (u.id === data.id ? { ...u, active: data.active } : u)),
      }));
    } catch (err) {
      console.error("toggleUserActive error:", err);
      set({ adminError: "Failed to update user status" });
    }
  },

  // Delete user (admin-only)
  deleteUser: async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== userId),
      }));
    } catch (err) {
      console.error("deleteUser error:", err);
      set({ adminError: "Failed to delete user" });
    }
  },

  clearAdminError: () => set({ adminError: "" }),
});

export default createAdminUserSlice;
